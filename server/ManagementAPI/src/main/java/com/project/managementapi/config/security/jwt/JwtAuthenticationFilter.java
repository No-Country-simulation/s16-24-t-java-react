package com.project.managementapi.config.security.jwt;

import com.project.managementapi.dtos.responses.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String token = getTokenFromRequest(request);
        final String username;

        if (token == null) {
            // Si el token es nulo, se devuelve el mando a la cadena de filtros.
            filterChain.doFilter(request, response);
            return;
        }

        try {
            username = jwtService.getUsernameFromToken(token);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtService.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            // Token expirado
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .dateTime(LocalDateTime.now())
                    .message("JWT expired")
                    .build();

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"message\": \"" + errorResponse.getMessage() + "\", \"dateTime\": \"" + errorResponse.getDateTime() + "\", \"status\": " + HttpStatus.UNAUTHORIZED.value() + ", \"error\": \"Unauthorized\"}");
        }
    }


    private String getTokenFromRequest(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION); /*Busca en el encabezado la parte que contiene la autenticación.*/

        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")){
            return authHeader.substring(7); //Extrae y retorna el token.
        }

        return null;
    }

}

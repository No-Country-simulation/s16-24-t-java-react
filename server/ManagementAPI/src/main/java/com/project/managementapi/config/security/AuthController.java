package com.project.managementapi.config.security;

import com.project.managementapi.config.security.dtos.AuthResponse;
import com.project.managementapi.config.security.dtos.LoginRequest;
import com.project.managementapi.config.security.dtos.RegisterRequest;
import com.project.managementapi.entities.userEntity.UserEntity;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, BindingResult bindingResult) throws BadRequestException {
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
        }

        Optional<AuthResponse> response = authService.login(request);
        if(response.isEmpty()) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(response.get());
    }


}

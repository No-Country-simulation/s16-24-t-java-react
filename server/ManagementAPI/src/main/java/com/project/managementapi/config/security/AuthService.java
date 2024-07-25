package com.project.managementapi.config.security;

import com.project.managementapi.config.security.dtos.AuthResponse;
import com.project.managementapi.config.security.dtos.LoginRequest;
import com.project.managementapi.config.security.dtos.RegisterRequest;
import com.project.managementapi.config.security.jwt.JwtService;
import com.project.managementapi.entities.employee.EStaff;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import com.project.managementapi.entities.userEntity.EUserRole;
import com.project.managementapi.entities.userEntity.UserEntity;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.EmployeeRepository;
import com.project.managementapi.repositories.PersonalInfoRepository;
import com.project.managementapi.repositories.UserEntityRepository;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private PersonalInfoRepository personalInfoRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public Optional<AuthResponse> login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserEntity user = userEntityRepository.findByEmployeePersonalInfoEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        if(!user.getEmployee().getStatus())
            throw new IllegalStateException("User with email: " + request.getEmail() + " is inactive and cannot be authorized");

        String token = jwtService.getToken(user, user.getAuthorities());
        return Optional.of(AuthResponse.builder()
                .role(user.getRole().toString())
                .token(token)
                .build());
    }

}

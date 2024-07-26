package com.project.managementapi.services.impl;

import com.project.managementapi.config.security.jwt.JwtService;
import com.project.managementapi.dtos.requests.ChangePasswordRequest;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.entities.userEntity.EUserRole;
import com.project.managementapi.entities.userEntity.UserEntity;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.UserEntityRepository;
import com.project.managementapi.services.IUserEntityService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserEntityService implements IUserEntityService {

    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;


    @Override
    public void createUserEntity(Employee employee) {
        userEntityRepository.save(UserEntity
                .builder()
                .employee(employee)
                .role(EUserRole.USER)
                .password(passwordEncoder.encode(employee.getPersonalInfo().getDni()))
                .build());
    }

    @Override
    public void changePassword(ChangePasswordRequest passwordRequest, String authHeader) throws BadRequestException {

        String token = authHeader.replace("Bearer ", "").trim();
        String email = this.jwtService.getUsernameFromToken(token);

        Optional<UserEntity> opt = userEntityRepository.findByEmployeePersonalInfoEmail(email);

        if(opt.isEmpty()) throw new ResourceNotFoundException("User doesn't exists.");
        UserEntity user = opt.get();
        if(!passwordEncoder.matches(passwordRequest.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Incorrect old password");
        }

        user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        this.userEntityRepository.save(user);
    }
}

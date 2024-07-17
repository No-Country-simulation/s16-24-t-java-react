package com.project.managementapi.services.impl;

import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.entities.userEntity.EUserRole;
import com.project.managementapi.entities.userEntity.UserEntity;
import com.project.managementapi.repositories.UserEntityRepository;
import com.project.managementapi.services.IUserEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserEntityService implements IUserEntityService {

    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createUserEntity(Employee employee) {
        userEntityRepository.save(UserEntity
                .builder()
                .employee(employee)
                .role(EUserRole.USER)
                .password(passwordEncoder.encode(employee.getPersonalInfo().getDni()))
                .build());
    }

}

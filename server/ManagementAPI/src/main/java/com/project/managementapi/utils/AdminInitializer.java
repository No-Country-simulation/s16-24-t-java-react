package com.project.managementapi.utils;

import com.project.managementapi.entities.employee.EStaff;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import com.project.managementapi.entities.userEntity.EUserRole;
import com.project.managementapi.entities.userEntity.UserEntity;
import com.project.managementapi.repositories.EmployeeRepository;
import com.project.managementapi.repositories.PersonalInfoRepository;
import com.project.managementapi.repositories.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
public class AdminInitializer implements ApplicationRunner {
    @Autowired
    private PersonalInfoRepository personalInfoRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private UserEntityRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {

        if(userRepository.findByEmployeePersonalInfoEmail("admin@sportify.com").isEmpty()){
            PersonalInfo personalInfo = personalInfoRepository.save(PersonalInfo
                    .builder()
                    .email("admin@sportify.com")
                    .startDate(LocalDate.now())
                    .build());

            Employee employee = employeeRepository.save(Employee
                    .builder()
                    .eStaff(EStaff.ADMIN)
                    .status(true)
                    .personalInfo(personalInfo)
                    .build());

            UserEntity userEntity = userRepository.save(UserEntity
                    .builder()
                    .employee(employee)
                    .role(EUserRole.ADMIN)
                    .password(passwordEncoder.encode("admin"))
                    .build());
        }

    }
}

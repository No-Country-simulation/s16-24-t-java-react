package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.entities.employee.EStaff;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.repositories.EmployeeRepository;
import com.project.managementapi.repositories.UserEntityRepository;
import com.project.managementapi.services.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PersonalInfoService personalInfoService;
    @Autowired
    private UserEntityService userEntityService;

    @Override
    public Employee createEmploye(EmployeeDTO dto) {

        boolean isValidStaff = Arrays.stream(EStaff.values())
                .anyMatch(eStaff -> eStaff.name().equals(dto.getStaff()));

        if (!isValidStaff) {
            throw new IllegalArgumentException("Invalid staff type.");
        }

        Employee employee = employeeRepository.save(Employee
                .builder()
                .eStaff(EStaff.valueOf(dto.getStaff()))
                .status(true)
                .salary(dto.getSalary())
                .personalInfo(personalInfoService.createPersonalInfo(dto.getPersonalInfo()))
                .build());

        //Si el empleado es un recepcionista crea un usuario.
        if(employee.getEStaff() == EStaff.RECEPCIONIST) userEntityService.createUserEntity(employee);

        return employee;
    }


}

package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.entities.employee.EStaff;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.EmployeeRepository;
import com.project.managementapi.services.IEmployeeService;
import com.project.managementapi.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PersonalInfoService personalInfoService;
    @Autowired
    private UserEntityService userEntityService;

    @Override
    public EmployeeDTO createEmploye(EmployeeDTO dto) {

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
        if(employee.getEStaff() == EStaff.RECEPTIONIST) userEntityService.createUserEntity(employee);

        return Mapper.employeeToDTO(employee);
    }

    @Override
    public Page<EmployeeDTO> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Employee> employees = this.employeeRepository.findAll(pageable);
        if(employees.isEmpty()) throw new ResourceNotFoundException("Employees empty list");
        List<EmployeeDTO> employeeDTOS = new ArrayList<>();
        for(Employee e: employees){
            employeeDTOS.add(Mapper.employeeToDTO(e));
        }
        return new PageImpl<>(employeeDTOS);
    }
}

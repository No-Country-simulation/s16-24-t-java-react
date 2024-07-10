package com.project.managementapi.services;


import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.entities.employee.Employee;
import org.springframework.stereotype.Service;

@Service
public interface IEmployeeService {
    Employee createEmploye(EmployeeDTO dto);
}

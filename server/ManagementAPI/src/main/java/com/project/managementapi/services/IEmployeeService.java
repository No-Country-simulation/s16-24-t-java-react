package com.project.managementapi.services;


import com.project.managementapi.dtos.EmployeeDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IEmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO dto);

    Page<EmployeeDTO> findEmployees(String firstName, String lastName, String dni, Boolean status, String email, Pageable pageable);

    void updateEmployee(EmployeeDTO employeeDTO) throws BadRequestException;

    EmployeeDTO toggleStatus(String dni);
}

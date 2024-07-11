package com.project.managementapi.services;


import com.project.managementapi.dtos.EmployeeDTO;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface IEmployeeService {
    EmployeeDTO createEmploye(EmployeeDTO dto);

    Page<EmployeeDTO> findAll(int page, int size);
}

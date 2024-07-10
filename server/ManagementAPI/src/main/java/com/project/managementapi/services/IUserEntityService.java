package com.project.managementapi.services;

import com.project.managementapi.entities.employee.Employee;
import org.springframework.stereotype.Service;

@Service
public interface IUserEntityService {

    void createUserEntity(Employee employee);
}

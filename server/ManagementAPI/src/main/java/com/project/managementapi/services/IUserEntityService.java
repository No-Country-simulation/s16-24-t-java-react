package com.project.managementapi.services;

import com.project.managementapi.dtos.requests.ChangePasswordRequest;
import com.project.managementapi.entities.employee.Employee;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
public interface IUserEntityService {

    void createUserEntity(Employee employee);

    void changePassword(ChangePasswordRequest passwordRequest, String authHeader) throws BadRequestException;
}

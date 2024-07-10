package com.project.managementapi.controllers;

import com.project.managementapi.config.security.dtos.AuthResponse;
import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.services.impl.EmployeeServiceImpl;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    @Autowired
    private EmployeeServiceImpl employeeService;

    private final String url = "/api/v1/employees";

    // =====================================================================
    //                              POST
    // =====================================================================

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SuccessResponse> create(@Valid @RequestBody EmployeeDTO employeeDTO, BindingResult bindingResult) throws BadRequestException {
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
        }

        Employee response = employeeService.createEmploye(employeeDTO);
        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("200")
                .message("Successful request.")
                .object(response)
                .url(url+"/create")
                .build(), HttpStatus.CREATED);
    }

}

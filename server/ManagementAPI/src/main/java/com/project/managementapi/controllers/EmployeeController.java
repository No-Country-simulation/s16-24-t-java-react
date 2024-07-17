package com.project.managementapi.controllers;

import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.impl.EmployeeServiceImpl;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        EmployeeDTO response = employeeService.createEmploye(employeeDTO);
        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("201")
                .message("Successful request.")
                .object(response)
                .url(url+"/create")
                .build(), HttpStatus.CREATED);
    }

    // =====================================================================
    //                              GET
    // =====================================================================

    @GetMapping("/findAll")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<SuccessResponse> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        Page<EmployeeDTO> list = employeeService.findAll(page, size);

        Page<EmployeeDTO> response = employeeService.findAll(page, size);
        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("200")
                .message("Successful request.")
                .object(response)
                .url(url+"/findAll")
                .build(), HttpStatus.OK);
    }
}

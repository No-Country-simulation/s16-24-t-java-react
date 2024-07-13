package com.project.managementapi.controllers;

import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.impl.EmployeeServiceImpl;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

        EmployeeDTO response = employeeService.createEmployee(employeeDTO);
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
    public ResponseEntity<SuccessResponse> findAll(@RequestParam(required = false) String firstName,
                                                      @RequestParam(required = false) String lastName,
                                                      @RequestParam(required = false) String dni,
                                                      @RequestParam(required = false) Boolean status,
                                                      @RequestParam(required = false) String email,
                                                      @RequestBody(required = false) Pageable pageable){

        if (pageable == null) {
            pageable = PageRequest.of(0, 10);
        }

        Page<EmployeeDTO> response = employeeService.findEmployees(firstName, lastName, dni, status, email, pageable);
        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("200")
                .message("Successful request.")
                .object(response)
                .url(url+"/findAll")
                .build(), HttpStatus.OK);
    }

    // =====================================================================
    //                              PUT
    // =====================================================================
    @PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<SuccessResponse> updateEmployee(@Valid @RequestBody EmployeeDTO employeeDTO, BindingResult bindingResult) throws BadRequestException {

        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
        }

        this.employeeService.updateEmployee(employeeDTO);
        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("200")
                .message("Employee successfully updated.")
                .object(employeeDTO)
                .url(url+"/update")
                .build(), HttpStatus.OK);
    }

}

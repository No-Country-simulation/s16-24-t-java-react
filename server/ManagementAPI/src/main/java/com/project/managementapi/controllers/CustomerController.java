package com.project.managementapi.controllers;

import com.project.managementapi.dtos.CustomerDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    private final String url = "/api/v1/employees";

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SuccessResponse> createCustomer(@RequestBody CustomerDTO customerDTO) {

        CustomerDTO response = customerService.createCustomer(customerDTO);

        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("201")
                .message("Successful request.")
                .object(response)
                .url(url+"/create")
                .build(), HttpStatus.CREATED);
    }

}

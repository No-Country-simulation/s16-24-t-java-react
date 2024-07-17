package com.project.managementapi.controllers;

import com.project.managementapi.dtos.CustomerDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.ICustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    private final String url = "/api/v1/customers";

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SuccessResponse> createCustomer(@Valid @RequestBody CustomerDTO customerDTO) {

        CustomerDTO response = customerService.createCustomer(customerDTO);

        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("201")
                .message("Successful request.")
                .object(response)
                .url(url+"/create")
                .build(), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SuccessResponse> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);

        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("202")
                .message("Successful request.")
                .url(url+"/delete")
                .build(), HttpStatus.ACCEPTED);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SuccessResponse> updateCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        customerService.updateCustomer(customerDTO);

        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("200")
                .message("Customer successfully updated.")
                .object(customerDTO)
                .url(url+"/update")
                .build(), HttpStatus.OK);
    }

}

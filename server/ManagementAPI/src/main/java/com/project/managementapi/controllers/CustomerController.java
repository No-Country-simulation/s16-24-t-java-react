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

import java.util.List;

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

    @DeleteMapping("/delete/{dni}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SuccessResponse> deleteCustomer(@PathVariable String dni) {
        customerService.deleteCustomer(dni);

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

    @GetMapping("/findAll")
    public ResponseEntity<SuccessResponse> findAllCustomers() {
        List<CustomerDTO> customerDTOS = customerService.listCustomer();

        return new ResponseEntity<>(SuccessResponse.builder()
                .statusCode("200")
                .message("List of all customers")
                .object(customerDTOS)
                .url(url+"/findAll")
                .build(), HttpStatus.OK);
    }
}

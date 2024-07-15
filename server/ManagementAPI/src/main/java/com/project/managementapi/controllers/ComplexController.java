package com.project.managementapi.controllers;

import com.project.managementapi.dtos.ComplexDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.impl.ComplexServiceImpl;
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

@RestController
@RequestMapping("/api/v1/complexes")
public class ComplexController {

    @Autowired
    private ComplexServiceImpl complexService;
    private final String url = "/api/v1/complexes";

    // =====================================================================
    //                              POST
    // =====================================================================
    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<SuccessResponse> createComplex(@Valid @RequestBody ComplexDTO complexDTO, BindingResult bindingResult) throws BadRequestException {
        if(bindingResult.hasErrors())
            throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());

        ComplexDTO response = complexService.createComplex(complexDTO);
        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("201")
                .message("Successful request.")
                .object(response)
                .url(url+"/create")
                .build(), HttpStatus.CREATED);
    }
}

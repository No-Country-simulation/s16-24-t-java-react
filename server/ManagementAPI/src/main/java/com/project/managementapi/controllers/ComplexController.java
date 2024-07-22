package com.project.managementapi.controllers;

import com.project.managementapi.dtos.ComplexDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.impl.ComplexServiceImpl;
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

    // =====================================================================
    //                              GET
    // =====================================================================
    @GetMapping("/findAll")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<SuccessResponse> findAll(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String cuit,
            @RequestBody(required = false) Pageable pageable){
        if(pageable == null) pageable = PageRequest.of(0, 10);

        Page<ComplexDTO> response = this.complexService.findComplexes(cuit, title, pageable);

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
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<SuccessResponse> updateComplex(@Valid @RequestBody ComplexDTO complexDTO, BindingResult bindingResult) throws BadRequestException {

        if(bindingResult.hasErrors()) throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());


        this.complexService.updateComplex(complexDTO);

        return new ResponseEntity<>(SuccessResponse
                .builder()
                .statusCode("200")
                .message("Successful request.")
                .object(complexDTO)
                .url(url+"/findAll")
                .build(), HttpStatus.OK);
    }
}

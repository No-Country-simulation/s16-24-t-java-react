package com.project.managementapi.controllers;

import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.dtos.PersonalInfoDTO;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping
    public String demo(@Valid @RequestBody EmployeeDTO dto, WebRequest webRequest){
        return "Hola desde endpoint protegido";
    }
}

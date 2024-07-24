package com.project.managementapi.controllers;

import com.project.managementapi.dtos.requests.ChangePasswordRequest;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.impl.UserEntityService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserEntityController {

    @Autowired
    private UserEntityService userEntityService;


    @PostMapping("/change-password")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<SuccessResponse> changePassword(@RequestHeader("Authorization") String authHeader,
                                                          @Valid @RequestBody ChangePasswordRequest passwordRequest,
                                                          BindingResult bindingResult) throws BadRequestException {
        if(bindingResult.hasErrors()) throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());

        this.userEntityService.changePassword(passwordRequest, authHeader);

        return new ResponseEntity<>(SuccessResponse.builder().build(), HttpStatus.OK);
    }
}

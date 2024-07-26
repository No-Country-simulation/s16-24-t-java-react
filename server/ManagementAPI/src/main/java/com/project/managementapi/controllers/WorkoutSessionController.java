package com.project.managementapi.controllers;

import com.project.managementapi.dtos.WorkoutSessionDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.services.IWorkoutSessionService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/WorkoutSessions")
public class WorkoutSessionController {

    private String url = "/api/v1/WorkoutSessions";
    @Autowired
    private IWorkoutSessionService workoutSessionService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<SuccessResponse> createSession(@Valid @RequestBody WorkoutSessionDTO dto, BindingResult bindingResult) throws BadRequestException {

        if(bindingResult.hasErrors()) throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());

        WorkoutSessionDTO response = this.workoutSessionService.createWorkoutSession(dto);
        return new ResponseEntity<>(
                SuccessResponse
                        .builder()
                        .url(url+"/create")
                        .message("Success request.")
                        .object(response)
                        .statusCode("201")
                        .build(), HttpStatus.CREATED
        );
    }
}

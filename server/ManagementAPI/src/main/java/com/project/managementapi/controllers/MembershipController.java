package com.project.managementapi.controllers;

import com.project.managementapi.dtos.CustomerDTO;
import com.project.managementapi.dtos.MembershipDTO;
import com.project.managementapi.dtos.UpdateMembershipDTO;
import com.project.managementapi.dtos.responses.SuccessResponse;
import com.project.managementapi.entities.membership.EMembershipType;
import com.project.managementapi.entities.membership.Membership;
import com.project.managementapi.repositories.MembershipRepository;
import com.project.managementapi.services.IMembershipService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/memberships")
public class MembershipController {

    @Autowired
    private IMembershipService membershipService;

    private String url = "/api/v1/memberships";

    @GetMapping("/types")
    public ResponseEntity<List<String>> getMembershipsType() {
        List<String> memberships = Arrays.stream(EMembershipType.values())
                .map(EMembershipType::name)
                .collect(Collectors.toList());

        return ResponseEntity.ok(memberships);
    }

    @PostMapping("/new")
    public ResponseEntity<SuccessResponse> createMembership(@Valid @RequestBody UpdateMembershipDTO updateMembershipDTO) {
        membershipService.updateMembership(updateMembershipDTO.getDni(), updateMembershipDTO.getMembershipDTO());

        return new ResponseEntity<>(
                SuccessResponse
                        .builder()
                        .url(url+"/create")
                        .message("Success request.")
                        .statusCode("201")
                        .build(), HttpStatus.CREATED
        );
    }
}

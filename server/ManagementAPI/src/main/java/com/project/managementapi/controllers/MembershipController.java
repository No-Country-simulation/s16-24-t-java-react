package com.project.managementapi.controllers;

import com.project.managementapi.entities.membership.EMembershipType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/memberships")
public class MembershipController {

    @GetMapping("/types")
    public ResponseEntity<List<String>> getMembershipsType() {
        List<String> memberships = Arrays.stream(EMembershipType.values())
                .map(EMembershipType::name)
                .collect(Collectors.toList());

        return ResponseEntity.ok(memberships);
    }
}

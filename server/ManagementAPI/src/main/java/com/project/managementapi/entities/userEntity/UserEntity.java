package com.project.managementapi.entities.userEntity;

import jakarta.persistence.*;


public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @Enumerated(EnumType.STRING)
    private EUserRole role;
}

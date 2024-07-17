package com.project.managementapi.entities;

import com.project.managementapi.entities.personalInfo.PersonalInfo;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String country;
    private String city;
    private String state;
    private String postalCode;
    private String street;
    private String streetNumber;

    @OneToOne(mappedBy = "address")
    private PersonalInfo personalInfo;

    @OneToOne(mappedBy = "address")
    private Complex complex;
}

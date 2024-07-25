package com.project.managementapi.entities.personalInfo;

import com.project.managementapi.entities.Address;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.employee.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "personal_info")
public class PersonalInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    @Column(unique = true)
    private String dni;

    private LocalDate birthDate;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private ProfileImage image;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToOne(mappedBy = "personalInfo")
    private Employee employee;

    @OneToOne(mappedBy = "personalInfo")
    private Customer customer;
}

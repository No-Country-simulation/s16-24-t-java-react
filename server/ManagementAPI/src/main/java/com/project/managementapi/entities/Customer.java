package com.project.managementapi.entities;

import com.project.managementapi.entities.membership.Membership;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "customer")
    private Set<Membership> memberships;

    private Boolean status;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "personal_info_id")
    private PersonalInfo personalInfo;

    @OneToMany(mappedBy = "customer")
    private Set<Attendance> attendances;
}
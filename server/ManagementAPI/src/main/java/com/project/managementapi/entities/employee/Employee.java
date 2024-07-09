package com.project.managementapi.entities.employee;

import com.project.managementapi.entities.personalInfo.PersonalInfo;
import com.project.managementapi.entities.userEntity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean status;
    private Double salary;
    private EStaff eStaff;

    @OneToOne()
    @JoinColumn(name = "personal_info_id")
    private PersonalInfo personalInfo;

    @OneToOne(mappedBy = "employee")
    private UserEntity userEntity;
}

package com.project.managementapi.entities.personalInfo;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "profile_image")
public class ProfileImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String url;
    private String cloudinaryId;

    @OneToOne(mappedBy = "image")
    private PersonalInfo personalInfo;
}

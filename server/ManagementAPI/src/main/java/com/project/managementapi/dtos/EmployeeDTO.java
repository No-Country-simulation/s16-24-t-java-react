package com.project.managementapi.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDTO {
    @NotBlank(message = "Staff type is mandatory")
    private String staff;

    @NotNull(message = "Salary is mandatory")
    @Positive(message = "Salary must be positive")
    private Double salary;

    @Valid
    @NotNull(message = "Personal info is mandatory")
    private PersonalInfoDTO personalInfo;
}

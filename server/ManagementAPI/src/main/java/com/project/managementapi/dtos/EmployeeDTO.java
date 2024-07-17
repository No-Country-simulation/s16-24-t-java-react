package com.project.managementapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Data Transfer Object for employee details.")
public class EmployeeDTO {
    @Schema(description = "The staff type of the employee. Required and must not be blank.",
            example = "COACH", required = true)
    @NotBlank(message = "Staff type is mandatory")
    private String staff;

    @Schema(description = "The salary of the employee. Required, must be positive, and cannot be null.",
            example = "3500.00", required = true)
    @NotNull(message = "Salary is mandatory")
    @Positive(message = "Salary must be positive")
    private Double salary;

    @Schema(description = "The status of the employee. Optional field. Always true at creation",
            example = "true")
    private Boolean status;

    @Schema(description = "Personal information of the employee. Required and must not be null.",
            implementation = PersonalInfoDTO.class, required = true)
    @Valid
    @NotNull(message = "Personal info is mandatory")
    private PersonalInfoDTO personalInfo;
}

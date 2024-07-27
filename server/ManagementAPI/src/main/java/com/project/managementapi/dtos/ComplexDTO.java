package com.project.managementapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Data Transfer Object for complex details.")
public class ComplexDTO {
    @Schema(description = "Required and must not be blank.",
            example = "Sportify ONE")
    @NotBlank(message = "Title complex is mandatory")
    private String title;

    @Schema(description = "Must be exactly 11 digits.",
            example = "20567898655")
    private String cuit;
    @Schema(example = "2020-04-01")
    private LocalDate apertureDate;
    @Schema(description = "Must be exactly 10 digits.",
            example = "1234567890")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @Schema(description = "Required and must not be null.",
            implementation = AddressDTO.class)
    @Valid
    @NotNull(message = "Address is mandatory")
    private AddressDTO address;

    private List<WorkoutSessionDTO> activities;
}

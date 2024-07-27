package com.project.managementapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Data Transfer Object for personal information.")
public class PersonalInfoDTO {
    @Schema(description = "Required and must not be blank.",
            example = "Juan")
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Schema(description = "Required and must not be blank.",
            example = "Pérez")
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Schema(description = "Must be exactly 10 digits.",
            example = "1234567890")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @Schema(description = "Must be a valid email format.",
            example = "juan.perez@example.com")
    @Email(message = "Email should be valid")
    private String email;

    @Schema(description = "Required, must be between 7 and 8 characters.",
            example = "12345678")
    @NotBlank(message = "DNI is mandatory")
    @Size(min = 7, max = 8, message = "DNI must be between 7 and 8 characters")
    private String dni;

    @Schema(
            description = "The birth date of the ",
            example = "01-01-1990"
    )
    @NotNull(message = "Birth date is mandatory")
    private LocalDate birthDate;

    @Schema(description = "The address of the employee. Required and must not be null.",
            implementation = AddressDTO.class)
    @NotNull(message = "Address is mandatory")
    private AddressDTO address;

    private LocalDate startDate;
}

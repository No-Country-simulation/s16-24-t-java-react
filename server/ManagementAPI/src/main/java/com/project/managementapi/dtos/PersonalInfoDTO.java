package com.project.managementapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Data Transfer Object for personal information of an employee.")
public class PersonalInfoDTO {
    @Schema(description = "The first name of the employee. Required and must not be blank.",
            example = "Juan", required = true)
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Schema(description = "The last name of the employee. Required and must not be blank.",
            example = "Pérez", required = true)
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Schema(description = "The phone number of the employee. Must be exactly 10 digits.",
            example = "1234567890")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @Schema(description = "The email address of the employee. Must be a valid email format.",
            example = "juan.perez@example.com")
    @Email(message = "Email should be valid")
    private String email;

    @Schema(description = "The DNI of the employee. Required, must be between 7 and 8 characters.",
            example = "12345678", required = true)
    @NotBlank(message = "DNI is mandatory")
    @Size(min = 7, max = 8, message = "DNI must be between 7 and 8 characters")
    private String dni;

    @Schema(description = "The address of the employee. Required and must not be null.",
            implementation = AddressDTO.class, required = true)
    @NotNull(message = "Address is mandatory")
    private AddressDTO address;
}

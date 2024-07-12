package com.project.managementapi.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalInfoDTO {
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "DNI is mandatory")
    @Size(min = 7, max = 8, message = "DNI must be between 7 and 8 characters")
    private String dni;

    @NotNull(message = "Address is mandatory")
    private AddressDTO address;
}

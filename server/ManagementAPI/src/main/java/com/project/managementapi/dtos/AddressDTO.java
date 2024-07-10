package com.project.managementapi.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {
    @NotBlank(message = "Country is mandatory")
    private String country;
    @NotBlank(message = "State is mandatory")
    private String state;
    @NotBlank(message = "City is mandatory")
    private String city;
    @NotBlank(message = "Postal code is mandatory")
    private String postalCode;
    @NotBlank(message = "Street is mandatory")
    private String street;
    @NotBlank(message = "Street number is mandatory")
    private String streetNumber;
}

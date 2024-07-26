package com.project.managementapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Data Transfer Object for the address.")
public class AddressDTO {

    @Schema(description = "Required and must not be blank.",
            example = "Los Angeles", required = true)
    @NotBlank(message = "Country is mandatory")
    private String country;
    @NotBlank(message = "State is mandatory")
    private String state;
    @NotBlank(message = "City is mandatory")
    private String city;

    @Schema(description = "Postal code for the address. Required and must not be blank.",
            example = "90001", required = true)
    @NotBlank(message = "Postal code is mandatory")
    private String postalCode;

    @Schema(description = "Required and must not be blank.",
            example = "1234 Elm Street", required = true)
    @NotBlank(message = "Street is mandatory")
    private String street;
    @NotBlank(message = "Street number is mandatory")
    private String streetNumber;
}

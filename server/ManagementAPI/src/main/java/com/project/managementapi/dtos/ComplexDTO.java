package com.project.managementapi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComplexDTO {
    @NotBlank(message = "Title complex is mandatory")
    private String title;
    @NotNull(message = "Address is mandatory")
    private AddressDTO address;
}

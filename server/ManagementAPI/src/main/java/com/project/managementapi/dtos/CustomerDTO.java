package com.project.managementapi.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerDTO {
    @Valid
    @NotNull(message = "Personal info is mandatory")
    private PersonalInfoDTO personalInfoDTO;

    @NotNull
    private Boolean status;
}

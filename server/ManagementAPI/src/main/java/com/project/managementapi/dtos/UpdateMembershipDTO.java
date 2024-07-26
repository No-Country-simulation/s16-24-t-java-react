package com.project.managementapi.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateMembershipDTO {
    @NotBlank
    private String dni;
    @Valid
    private MembershipDTO membershipDTO;
}

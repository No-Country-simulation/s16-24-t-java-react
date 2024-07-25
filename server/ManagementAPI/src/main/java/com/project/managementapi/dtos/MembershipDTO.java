package com.project.managementapi.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MembershipDTO {

    @NotNull
    private String membershipType;

    private String endDate;
}

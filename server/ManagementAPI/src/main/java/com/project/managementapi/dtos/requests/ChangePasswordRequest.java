package com.project.managementapi.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {
    @NotBlank(message = "Please enter a valid password")
    @Size(min = 4, max = 20, message = "The old password must be between 4 and 20 characters.")
    private String oldPassword;
    @NotBlank(message = "Please enter a valid password")
    @Size(min = 4, max = 20, message = "The new password must be between 4 and 20 characters.")
    private String newPassword;
}

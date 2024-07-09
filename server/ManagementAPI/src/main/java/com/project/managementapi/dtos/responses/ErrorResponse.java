package com.project.managementapi.dtos.responses;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorResponse {
    private String statusCode;
    private String url;
    private String message;
}

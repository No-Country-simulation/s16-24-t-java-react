package com.project.managementapi.dtos.responses;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SuccessResponse {
    private String statusCode;
    private String url;
    private String message;
    private Object object;
}

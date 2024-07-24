package com.project.managementapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Data Transfer Object for the address.")
public class WorkoutSessionDTO {

    @Schema(description = "Must be exactly 11 digits.",
            example = "20567898655")
    private String gymCuit;

    @Schema(description = "Start time of the workout session in the format HH:mm. Required and must not be blank.",
            example = "08:00")
    @NotBlank(message = "Start time is mandatory")
    @Pattern(regexp = "^([01]\\d|2[0-3]):([0-5]\\d)$", message = "Start time must be in the format HH:mm")
    private String startTime;

    @Schema(description = "End time of the workout session in the format HH:mm. Required and must not be blank.",
            example = "09:00")
    @NotBlank(message = "End time is mandatory")
    @Pattern(regexp = "^([01]\\d|2[0-3]):([0-5]\\d)$", message = "End time must be in the format HH:mm")
    private String endTime;

    @Schema(description = "Name of the activity. Required and must not be blank.",
            example = "Yoga")
    @NotBlank(message = "Activity name is mandatory")
    private String activityName;

    @Schema(description = "Day of the week for the workout session. Required and must not be null.",
            example = "1")
    @NotNull(message = "Day of the week is mandatory")
    private Integer dayOfWeek;

    @Schema(description = "Color associated with the workout session in hexadecimal format. Required and must not be blank.",
            example = "#FF5733")
    @NotBlank(message = "Color is mandatory")
    @Pattern(regexp = "^#([A-Fa-f0-9]{6})$", message = "Color must be in hexadecimal format")
    private String color;
}

package com.project.managementapi.services;

import com.project.managementapi.dtos.WorkoutSessionDTO;
import org.apache.coyote.BadRequestException;

public interface IWorkoutSessionService {

    WorkoutSessionDTO createWorkoutSession(WorkoutSessionDTO dto) throws BadRequestException;
}

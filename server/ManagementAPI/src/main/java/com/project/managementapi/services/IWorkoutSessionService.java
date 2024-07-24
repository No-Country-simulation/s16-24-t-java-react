package com.project.managementapi.services;

import com.project.managementapi.dtos.WorkoutSessionDTO;

public interface IWorkoutSessionService {

    WorkoutSessionDTO createWorkoutSession(WorkoutSessionDTO dto);
}

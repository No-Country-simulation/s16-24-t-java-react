package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.WorkoutSessionDTO;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.entities.WorkoutSession;
import com.project.managementapi.repositories.WorkoutSessionRepository;
import com.project.managementapi.services.IComplexService;
import com.project.managementapi.services.IWorkoutSessionService;
import com.project.managementapi.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionServiceImpl implements IWorkoutSessionService {

    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;
    @Autowired
    private IComplexService complexService;


    @Override
    public WorkoutSessionDTO createWorkoutSession(WorkoutSessionDTO dto){

        Complex complex = complexService.findComplexByCuit(dto.getGymCuit());

        WorkoutSession workoutSession = workoutSessionRepository.save(
                WorkoutSession
                        .builder()
                        .activityName(dto.getActivityName())
                        .color(dto.getColor())
                        .endTime(dto.getEndTime())
                        .startTime(dto.getStartTime())
                        .dayOfWeek(dto.getDayOfWeek())
                        .complex(complex)
                        .build()
        );

        complexService.AddWorkoutSessionToComplex(complex, workoutSession);

        return Mapper.workoutSessionToDTO(workoutSession);
    }
}

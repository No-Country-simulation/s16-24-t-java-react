package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.WorkoutSessionDTO;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.entities.WorkoutSession;
import com.project.managementapi.repositories.WorkoutSessionRepository;
import com.project.managementapi.services.IWorkoutSessionService;
import com.project.managementapi.utils.Mapper;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WorkoutSessionServiceImpl implements IWorkoutSessionService {

    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;
    @Autowired
    private ComplexServiceImpl complexService;


    @Override
    public WorkoutSessionDTO createWorkoutSession(WorkoutSessionDTO dto) throws BadRequestException {
        Complex complex = complexService.findComplexByCuit(dto.getGymCuit());

        if(workoutSessionRepository.existsOverlappingSession(dto.getDayOfWeek(),dto.getStartTime(), dto.getEndTime(), dto.getGymCuit())) {
            throw new BadRequestException("Ya existe una clase en ese horario.");
        }

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

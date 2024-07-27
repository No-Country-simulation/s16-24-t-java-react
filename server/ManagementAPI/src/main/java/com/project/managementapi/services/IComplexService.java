package com.project.managementapi.services;

import com.project.managementapi.dtos.ComplexDTO;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.entities.WorkoutSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IComplexService {
    ComplexDTO createComplex(ComplexDTO complexDTO);

    Page<ComplexDTO> findComplexes(
            String cuit,
            String title,
            Pageable pageable
    );

    void updateComplex(ComplexDTO complexDTO);

    Complex findComplexByCuit(String cuit);

    void AddWorkoutSessionToComplex(Complex complex, WorkoutSession workoutSession);

}

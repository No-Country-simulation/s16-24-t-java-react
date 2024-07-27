package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.ComplexDTO;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.entities.WorkoutSession;
import com.project.managementapi.exceptions.ResourceAlreadyExistsException;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.ComplexRepository;
import com.project.managementapi.repositories.WorkoutSessionRepository;
import com.project.managementapi.services.IComplexService;
import com.project.managementapi.specifications.ComplexSpecification;
import com.project.managementapi.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ComplexServiceImpl implements IComplexService {

    @Autowired
    private ComplexRepository complexRepository;
    @Autowired
    private AddressService addressService;
    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;

    @Override
    public ComplexDTO createComplex(ComplexDTO complexDTO) {

        if(complexRepository.existsByCuit(complexDTO.getCuit())) throw new ResourceAlreadyExistsException("Complex cuit already exists.");

        Complex complex = complexRepository.save(Complex
                .builder()
                .title(complexDTO.getTitle())
                .cuit(complexDTO.getCuit())
                .apertureDate(complexDTO.getApertureDate())
                .phoneNumber(complexDTO.getPhoneNumber())
                .attendances(new HashSet<>())
                .address(addressService.createAddress(complexDTO.getAddress()))
                .workoutSessions(new HashSet<>())
                .build());


        List<WorkoutSession> workouts = this.workoutSessionRepository.findByComplexId(complex.getId());
        return Mapper.complexToDTO(complex, workouts);
    }


    @Override
    public Page<ComplexDTO> findComplexes(
            String cuit,
            String title,
            Pageable pageable
    ){
        Specification<Complex> spec = Specification
                .where(ComplexSpecification.hasTitle(title)
                .and(ComplexSpecification.hasCuit(cuit)));

        Page<Complex> complexes = complexRepository.findAll(spec, pageable);

        List<ComplexDTO> complexDTOs = new ArrayList<>();

        for(Complex c: complexes){
            List<WorkoutSession> workouts = this.workoutSessionRepository.findByComplexId(c.getId());
            complexDTOs.add(Mapper.complexToDTO(c, workouts));
        }

        return new PageImpl<>(complexDTOs, pageable, complexes.getTotalElements());
    }

    @Override
    public void updateComplex(ComplexDTO complexDTO) {
        Optional<Complex> opt = this.complexRepository.findByCuit(complexDTO.getCuit());

        if(opt.isEmpty()) throw new ResourceNotFoundException("Complex with cuit: " + complexDTO.getCuit() + " doesn't exists.");

        Complex complex = opt.get();

        complex.setTitle(complexDTO.getTitle());
        complex.setApertureDate(complexDTO.getApertureDate());
        complex.setPhoneNumber(complexDTO.getPhoneNumber());
        this.addressService.updateAddress(complexDTO.getAddress(), complex.getAddress().getId());
        this.complexRepository.save(complex);
    }

    @Override
    public Complex findComplexByCuit(String cuit) {
        Optional<Complex> complex = this.complexRepository.findByCuit(cuit);
        if(complex.isEmpty()) throw new ResourceNotFoundException("Complex with CUIT: " + cuit + " doesn't exists");

        return complex.get();
    }

    @Override
    public void AddWorkoutSessionToComplex(Complex complex, WorkoutSession workoutSession) {
        complex.getWorkoutSessions().add(workoutSession);
        this.complexRepository.save(complex);
    }

}

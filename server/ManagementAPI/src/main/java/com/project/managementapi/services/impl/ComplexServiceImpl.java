package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.ComplexDTO;
import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.exceptions.ResourceAlreadyExistsException;
import com.project.managementapi.repositories.ComplexRepository;
import com.project.managementapi.services.IComplexService;
import com.project.managementapi.specifications.ComplexSpecification;
import com.project.managementapi.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class ComplexServiceImpl implements IComplexService {

    @Autowired
    private ComplexRepository complexRepository;
    @Autowired
    private AddressService addressService;

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
                .build());

        return Mapper.complexToDTO(complex);
    }


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
            complexDTOs.add(Mapper.complexToDTO(c));
        }

        return new PageImpl<>(complexDTOs, pageable, complexes.getTotalElements());
    }
}

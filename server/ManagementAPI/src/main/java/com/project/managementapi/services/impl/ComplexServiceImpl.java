package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.ComplexDTO;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.repositories.ComplexRepository;
import com.project.managementapi.services.IComplexService;
import com.project.managementapi.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class ComplexServiceImpl implements IComplexService {

    @Autowired
    private ComplexRepository complexRepository;
    @Autowired
    private AddressService addressService;

    @Override
    public ComplexDTO createComplex(ComplexDTO complexDTO) {

        Complex complex = complexRepository.save(Complex
                .builder()
                .title(complexDTO.getTitle())
                .attendances(new HashSet<>())
                .address(addressService.createAddress(complexDTO.getAddress()))
                .build());

        return Mapper.complexToDTO(complex);
    }


}

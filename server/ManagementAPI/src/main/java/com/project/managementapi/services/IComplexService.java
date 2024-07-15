package com.project.managementapi.services;

import com.project.managementapi.dtos.ComplexDTO;
import org.springframework.stereotype.Service;

@Service
public interface IComplexService {
    ComplexDTO createComplex(ComplexDTO complexDTO);
}

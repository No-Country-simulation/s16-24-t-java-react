package com.project.managementapi.services;

import com.project.managementapi.dtos.ComplexDTO;
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
}

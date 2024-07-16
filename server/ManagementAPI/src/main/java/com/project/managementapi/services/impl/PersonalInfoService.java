package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.PersonalInfoDTO;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import com.project.managementapi.exceptions.ResourceAlreadyExistsException;
import com.project.managementapi.repositories.PersonalInfoRepository;
import com.project.managementapi.services.IPersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PersonalInfoService implements IPersonalInfoService {
    @Autowired
    private PersonalInfoRepository personalInfoRepository;
    @Autowired
    private AddressService addressService;


    @Override
    public PersonalInfo createPersonalInfo(PersonalInfoDTO dto) {
        if(personalInfoRepository.existsByDni(dto.getDni())) throw new ResourceAlreadyExistsException("DNI Already exists.");
        if(personalInfoRepository.existsByEmail(dto.getEmail())) throw new ResourceAlreadyExistsException("Email already exists.");


        return personalInfoRepository.save(PersonalInfo.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .phoneNumber(dto.getPhoneNumber())
                .email(dto.getEmail())
                .dni(dto.getDni())
                .address(addressService.createAddress(dto.getAddress()))
                .build());
    }

}

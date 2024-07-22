package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.PersonalInfoDTO;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import com.project.managementapi.exceptions.ResourceAlreadyExistsException;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.PersonalInfoRepository;
import com.project.managementapi.services.IPersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


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
                .birthDate(dto.getBirthDate())
                .email(dto.getEmail())
                .dni(dto.getDni())
                .address(addressService.createAddress(dto.getAddress()))
                .build());
    }


    @Override
    public void updatePersonalInfo(PersonalInfoDTO dto, Long personalInfoId){
        Optional<PersonalInfo> opt = this.personalInfoRepository.findById(personalInfoId);
        if(opt.isEmpty())throw new ResourceNotFoundException("Personal info doesn't exists.");

        PersonalInfo personalInfo = opt.get();

        personalInfo.setBirthDate(dto.getBirthDate());
        personalInfo.setFirstName(dto.getFirstName());
        personalInfo.setLastName(dto.getLastName());
        personalInfo.setPhoneNumber(dto.getPhoneNumber());
        personalInfo.setEmail(dto.getEmail());
        this.addressService.updateAddress(dto.getAddress(), personalInfo.getAddress().getId());
        this.personalInfoRepository.save(personalInfo);
    }
}

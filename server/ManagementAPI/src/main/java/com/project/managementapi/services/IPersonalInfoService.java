package com.project.managementapi.services;

import com.project.managementapi.dtos.PersonalInfoDTO;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import org.springframework.stereotype.Service;

@Service
public interface IPersonalInfoService {
    PersonalInfo createPersonalInfo(PersonalInfoDTO dto);
}

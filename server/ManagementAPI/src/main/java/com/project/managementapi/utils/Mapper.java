package com.project.managementapi.utils;

import com.project.managementapi.dtos.AddressDTO;
import com.project.managementapi.dtos.ComplexDTO;
import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.dtos.PersonalInfoDTO;
import com.project.managementapi.entities.Address;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.entities.personalInfo.PersonalInfo;

public class Mapper {

    public static AddressDTO addressToDTO(Address address){
        if(address == null) return null;
        return AddressDTO
                .builder()
                .country(address.getCountry())
                .state(address.getState())
                .city(address.getCity())
                .street(address.getStreet())
                .streetNumber(address.getStreetNumber())
                .postalCode(address.getPostalCode())
                .build();
    }

    public static PersonalInfoDTO personalInfoToDTO(PersonalInfo personalInfo){
        if(personalInfo == null) return null;
        return PersonalInfoDTO
                .builder()
                .dni(personalInfo.getDni())
                .email(personalInfo.getEmail())
                .firstName(personalInfo.getFirstName())
                .lastName(personalInfo.getLastName())
                .phoneNumber(personalInfo.getPhoneNumber())
                .address(addressToDTO(personalInfo.getAddress()))
                .build();
    }

    public static EmployeeDTO employeeToDTO(Employee employee){
        return EmployeeDTO
                .builder()
                .personalInfo(personalInfoToDTO(employee.getPersonalInfo()))
                .salary(employee.getSalary())
                .staff(employee.getEStaff().name())
                .build();
    }

    public static ComplexDTO complexToDTO(Complex complex){
        return ComplexDTO
                .builder()
                .title(complex.getTitle())
                .address(addressToDTO(complex.getAddress()))
                .build();
    }


}
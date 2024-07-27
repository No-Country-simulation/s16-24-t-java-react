package com.project.managementapi.utils;

import com.project.managementapi.dtos.*;
import com.project.managementapi.entities.Address;
import com.project.managementapi.entities.Complex;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.WorkoutSession;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.entities.membership.Membership;
import com.project.managementapi.entities.personalInfo.PersonalInfo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Mapper {

    public static AddressDTO addressToDTO(Address address){
        if(address == null) return null;
        return AddressDTO
                .builder()
                .city(address.getCity())
                .street(address.getStreet())
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
                .birthDate(personalInfo.getBirthDate())
                .phoneNumber(personalInfo.getPhoneNumber())
                .address(addressToDTO(personalInfo.getAddress()))
                .startDate(personalInfo.getStartDate())
                .build();
    }

    public static EmployeeDTO employeeToDTO(Employee employee){
        return EmployeeDTO
                .builder()
                .personalInfo(personalInfoToDTO(employee.getPersonalInfo()))
                .salary(employee.getSalary())
                .staff(employee.getEStaff().name())
                .status(employee.getStatus())
                .build();
    }

    public static ComplexDTO complexToDTO(Complex complex, List<WorkoutSession> sessions){

        List<WorkoutSessionDTO> list = new ArrayList<>();
        for(WorkoutSession w: sessions){
            list.add(workoutSessionToDTO(w));
        }

        return ComplexDTO
                .builder()
                .title(complex.getTitle())
                .cuit(complex.getCuit())
                .phoneNumber(complex.getPhoneNumber())
                .apertureDate(complex.getApertureDate())
                .address(addressToDTO(complex.getAddress()))
                .activities(list)
                .build();
    }


    public static CustomerDTO customerToDTO(Customer customer) {
        return CustomerDTO.builder()
                .personalInfoDTO(personalInfoToDTO(customer.getPersonalInfo()))
                .status(customer.getStatus())
                .sport(customer.getSports().name())
                .build();
    }

    public static CustomerDTO customerToDTOWithMembership(Customer customer, Membership membership) {
        return CustomerDTO.builder()
                .personalInfoDTO(personalInfoToDTO(customer.getPersonalInfo()))
                .status(customer.getStatus())
                .sport(customer.getSports().name())
                .membershipDTO(membershipToDTO(membership))
                .build();
    }

    public static WorkoutSessionDTO workoutSessionToDTO(WorkoutSession workoutSession) {
        return WorkoutSessionDTO
                .builder()
                .startTime(workoutSession.getStartTime())
                .endTime(workoutSession.getEndTime())
                .activityName(workoutSession.getActivityName())
                .color(workoutSession.getColor())
                .dayOfWeek(workoutSession.getDayOfWeek())
                .gymCuit(workoutSession.getComplex().getCuit())
                .build();
    }

    public static MembershipDTO membershipToDTO(Membership membership) {
        return MembershipDTO.builder()
                .endDate(String.valueOf(membership.getEndDate()))
                .membershipType(String.valueOf(membership.getMembershipType()))
                .build();
    }
}

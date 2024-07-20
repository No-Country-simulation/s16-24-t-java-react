package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.CustomerDTO;
import com.project.managementapi.dtos.MembershipDTO;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.CustomerRepository;
import com.project.managementapi.services.ICustomerService;
import com.project.managementapi.services.IMembershipService;
import com.project.managementapi.utils.Mapper;
import com.project.managementapi.utils.Sports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PersonalInfoService personalInfoService;

    @Autowired
    private IMembershipService membershipService;

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {

        Customer customer = customerRepository.save(Customer.builder()
                .personalInfo(personalInfoService.createPersonalInfo(customerDTO.getPersonalInfoDTO()))
                .status(true)
                .sports(Sports.valueOf(customerDTO.getSport()))
                .build());

        MembershipDTO membershipDTO = customerDTO.getMembershipDTO();
        membershipService.createMembership(customer, membershipDTO);

        return Mapper.customerToDTO(customer);
    }

    @Override
    public void updateCustomer(CustomerDTO customer) {
        Optional<Customer> customerOptional = customerRepository.findByPersonalInfoDni(customer.getPersonalInfoDTO().getDni());
        if (customerOptional.isEmpty()) {
            throw new ResourceNotFoundException("Customer with DNI: " + customer.getPersonalInfoDTO().getDni() + " not found");
        }

        Customer customerToUpdate = customerOptional.get();
        customerToUpdate.getPersonalInfo().setDni(customer.getPersonalInfoDTO().getDni());
        customerToUpdate.getPersonalInfo().setFirstName(customer.getPersonalInfoDTO().getFirstName());
        customerToUpdate.getPersonalInfo().setLastName(customer.getPersonalInfoDTO().getLastName());
        customerToUpdate.getPersonalInfo().setPhoneNumber(customer.getPersonalInfoDTO().getPhoneNumber());
        customerToUpdate.getPersonalInfo().setBirthDate(customer.getPersonalInfoDTO().getBirthDate());
        customerToUpdate.getPersonalInfo().getAddress().setCity(customer.getPersonalInfoDTO().getAddress().getCity());
        customerToUpdate.getPersonalInfo().getAddress().setStreet(customer.getPersonalInfoDTO().getAddress().getStreet());
        customerToUpdate.getPersonalInfo().getAddress().setPostalCode(customer.getPersonalInfoDTO().getAddress().getPostalCode());

        customerRepository.save(customerToUpdate);
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        customer.setStatus(false);
        customerRepository.save(customer);
    }
}

package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.CustomerDTO;
import com.project.managementapi.dtos.MembershipDTO;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.membership.Membership;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.CustomerRepository;
import com.project.managementapi.repositories.MembershipRepository;
import com.project.managementapi.services.ICustomerService;
import com.project.managementapi.services.IMembershipService;
import com.project.managementapi.utils.Mapper;
import com.project.managementapi.utils.Sports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PersonalInfoService personalInfoService;

    @Autowired
    private IMembershipService membershipService;

    @Autowired
    private MembershipRepository membershipRepository;

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
    public void updateCustomer(CustomerDTO customerDTO) {
        Optional<Customer> customerOptional = customerRepository.findByPersonalInfoDni(customerDTO.getPersonalInfoDTO().getDni());
        if (customerOptional.isEmpty()) {
            throw new ResourceNotFoundException("Customer with DNI: " + customerDTO.getPersonalInfoDTO().getDni() + " not found");
        }

        Customer customerToUpdate = customerOptional.get();
        personalInfoService.updatePersonalInfo(customerDTO.getPersonalInfoDTO(), customerToUpdate.getPersonalInfo().getId());
        customerRepository.save(customerToUpdate);
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        customer.setStatus(false);
        customerRepository.save(customer);
    }

    @Override
    public List<CustomerDTO> listCustomer() {
        List<Customer> customers = customerRepository.findAll();
        List<CustomerDTO> customerDTOS = new ArrayList<>();
        for (Customer customer : customers) {
            Membership membership = membershipRepository.findFirstByCustomerOrderByEndDateDesc(customer.getId());
            customerDTOS.add(
                    Mapper.customerToDTOWithMembership(customer, membership)
            );
        }
        return customerDTOS;
    }
}

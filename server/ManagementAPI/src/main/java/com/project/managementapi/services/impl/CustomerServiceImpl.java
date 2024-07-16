package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.CustomerDTO;
import com.project.managementapi.entities.Customer;
import com.project.managementapi.repositories.CustomerRepository;
import com.project.managementapi.services.ICustomerService;
import com.project.managementapi.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PersonalInfoService personalInfoService;

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {

        Customer customer = customerRepository.save(Customer.builder()
                .personalInfo(personalInfoService.createPersonalInfo(customerDTO.getPersonalInfoDTO()))
                .status(true)
                .build());

        return Mapper.customerToDTO(customer);
    }

    @Override
    public void updateCustomer(CustomerDTO customer) {

    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        customer.setStatus(false);
        customerRepository.save(customer);
    }
}

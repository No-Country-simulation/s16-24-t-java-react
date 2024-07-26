package com.project.managementapi.services;

import com.project.managementapi.dtos.CustomerDTO;

import java.util.List;

public interface ICustomerService {
    CustomerDTO createCustomer(CustomerDTO customer);

    void updateCustomer(CustomerDTO customer);

    void deleteCustomer(Long id);

    List<CustomerDTO> listCustomer();
}

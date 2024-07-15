package com.project.managementapi.services;

import com.project.managementapi.dtos.CustomerDTO;
import org.springframework.stereotype.Service;

public interface ICustomerService {
    CustomerDTO createCustomer(CustomerDTO customer);
}

package com.project.managementapi.services.impl;

import com.project.managementapi.dtos.EmployeeDTO;
import com.project.managementapi.entities.employee.EStaff;
import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.exceptions.ResourceNotFoundException;
import com.project.managementapi.repositories.EmployeeRepository;
import com.project.managementapi.services.IEmployeeService;
import com.project.managementapi.specifications.EmployeeSpecification;
import com.project.managementapi.utils.Mapper;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PersonalInfoService personalInfoService;
    @Autowired
    private UserEntityService userEntityService;

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO dto) {

        boolean isValidStaff = Arrays.stream(EStaff.values())
                .anyMatch(eStaff -> eStaff.name().equals(dto.getStaff()));

        if (!isValidStaff) {
            throw new IllegalArgumentException("Invalid staff type.");
        }

        Employee employee = employeeRepository.save(Employee
                .builder()
                .eStaff(EStaff.valueOf(dto.getStaff()))
                .status(true)
                .salary(dto.getSalary())
                .personalInfo(personalInfoService.createPersonalInfo(dto.getPersonalInfo()))
                .build());

        //Si el empleado es un recepcionista crea un usuario.
        if (employee.getEStaff() == EStaff.RECEPTIONIST) userEntityService.createUserEntity(employee);

        return Mapper.employeeToDTO(employee);
    }


    @Override
    public Page<EmployeeDTO> findEmployees(
                                            String firstName,
                                            String lastName,
                                            String dni,
                                            Boolean status,
                                            String email,
                                            Pageable pageable) {
        Specification<Employee> spec = Specification.where(EmployeeSpecification.hasFirstName(firstName))
                .and(EmployeeSpecification.hasLastName(lastName))
                .and(EmployeeSpecification.hasDni(dni))
                .and(EmployeeSpecification.hasStatus(status))
                .and(EmployeeSpecification.hasEmail(email));

        Page<Employee> employees = this.employeeRepository.findAll(spec, pageable);

        List<EmployeeDTO> employeeDTOS = new ArrayList<>();
        for (Employee e : employees) {
            employeeDTOS.add(Mapper.employeeToDTO(e));
        }

        return new PageImpl<>(employeeDTOS, pageable, employees.getTotalElements());
    }

    @Override
    public void updateEmployee(EmployeeDTO employeeDTO) throws BadRequestException {
        Optional<Employee> empOpt = employeeRepository.findByPersonalInfoDni(employeeDTO.getPersonalInfo().getDni());
        if(empOpt.isEmpty())
            throw new ResourceNotFoundException("Employee with " + employeeDTO.getPersonalInfo().getDni() + " dni doesn't exists.");


        Employee employee = empOpt.get();
        if (!employee.getEStaff().equals(EStaff.valueOf(employeeDTO.getStaff()))) {
            throw new IllegalArgumentException("Cannot change staff role. Existing role: " + employee.getEStaff() + ", Provided role: " + employeeDTO.getStaff());
        }
        employee.setSalary(employeeDTO.getSalary());
        this.personalInfoService.updatePersonalInfo(employeeDTO.getPersonalInfo(), employee.getPersonalInfo().getId());
        employeeRepository.save(employee);
    }

    @Override
    public EmployeeDTO toggleStatus(String dni) {
        Optional<Employee> empOpt= this.employeeRepository.findByPersonalInfoDni(dni);
        if(empOpt.isEmpty()) throw new ResourceNotFoundException("Employee with dni " + dni + " doesn't exists.");

        Employee saved = empOpt.get();
        saved.setStatus(!saved.getStatus());

        return Mapper.employeeToDTO(employeeRepository.save(saved));
    }
}

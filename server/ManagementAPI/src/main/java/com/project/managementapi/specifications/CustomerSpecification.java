package com.project.managementapi.specifications;

import com.project.managementapi.entities.Customer;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class CustomerSpecification {

    public static Specification<Customer> hasFirstName(String firstName) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            if (firstName == null || firstName.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            Join<Customer, PersonalInfo> customerPersonalInfoJoin = root.join("personalInfo", JoinType.INNER);
            return criteriaBuilder.like(criteriaBuilder.lower(customerPersonalInfoJoin.get("firstName")), "%" + firstName.toLowerCase() + "%");
        };
//
    }

    public static Specification<Customer> hasLastName(String lastName) {
        return ((root, query, criteriaBuilder) -> {
            if(lastName == null || lastName.isEmpty()) return criteriaBuilder.conjunction();

            Join<Customer, PersonalInfo> customerPersonalInfo = root.join("personalInfo", JoinType.INNER);
            return criteriaBuilder.like(criteriaBuilder.lower(customerPersonalInfo.get("lastName")), "%" + lastName.toLowerCase() + "%");
        });
    }

    public static Specification<Customer> hasDni(String dni) {
        return (root, query, criteriaBuilder) -> {
            if (dni == null || dni.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            Join<Customer, PersonalInfo> customerPersonalInfoJoin = root.join("personalInfo", JoinType.INNER);
            return criteriaBuilder.equal(customerPersonalInfoJoin.get("dni"), dni);
        };
    }

    public static Specification<Customer> hasStatus(Boolean status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }

}

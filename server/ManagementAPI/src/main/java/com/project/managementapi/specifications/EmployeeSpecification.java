package com.project.managementapi.specifications;

import com.project.managementapi.entities.employee.Employee;
import com.project.managementapi.entities.personalInfo.PersonalInfo;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecification {

    public static Specification<Employee> hasFirstName(String firstName) {
        return (root, query, criteriaBuilder) -> {
            if (firstName == null || firstName.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            Join<Employee, PersonalInfo> personalInfoJoin = root.join("personalInfo", JoinType.INNER);
            return criteriaBuilder.like(criteriaBuilder.lower(personalInfoJoin.get("firstName")), "%" + firstName.toLowerCase() + "%");
        };
    }

    public static Specification<Employee> hasLastName(String lastName){
        return ((root, query, criteriaBuilder) -> {
            if(lastName == null || lastName.isEmpty()) return criteriaBuilder.conjunction();

            Join<Employee, PersonalInfo> personalInfoJoin = root.join("personalInfo", JoinType.INNER);
            return criteriaBuilder.like(criteriaBuilder.lower(personalInfoJoin.get("lastName")), "%" + lastName.toLowerCase() + "%");
        });
    }

    public static Specification<Employee> hasDni(String dni) {
        return (root, query, criteriaBuilder) -> {
            if (dni == null || dni.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            Join<Employee, PersonalInfo> personalInfoJoin = root.join("personalInfo", JoinType.INNER);
            return criteriaBuilder.equal(personalInfoJoin.get("dni"), dni);
        };
    }

    public static Specification<Employee> hasStatus(Boolean status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }

    public static Specification<Employee> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            Join<Employee, PersonalInfo> personalInfoJoin = root.join("personalInfo", JoinType.INNER);
            return criteriaBuilder.like(criteriaBuilder.lower(personalInfoJoin.get("email")), "%" + email.toLowerCase() + "%");
        };
    }


}

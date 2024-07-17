package com.project.managementapi.specifications;

import com.project.managementapi.entities.Complex;
import org.springframework.data.jpa.domain.Specification;

public class ComplexSpecification {
    public static Specification<Complex> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> {
            if (title == null || title.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
        };
    }

    public static Specification<Complex> hasCuit(String cuit){
        return (root, query, criteriaBuilder) -> {
            if(cuit == null || cuit.isEmpty()) return criteriaBuilder.conjunction();
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("cuit")), "%" + cuit.toLowerCase() + "%");
        };
    }


}

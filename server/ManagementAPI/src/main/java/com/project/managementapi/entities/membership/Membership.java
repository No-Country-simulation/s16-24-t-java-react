package com.project.managementapi.entities.membership;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.project.managementapi.entities.Customer;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Calendar;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Memberships")
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private EMembershipType membershipType;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private Customer customer;

    @PrePersist
    public void prePersist() {
        this.startDate = LocalDate.now();
        updateEndDate();
    }

    @PreUpdate
    public void preUpdate() {
        this.startDate = LocalDate.now();
        updateEndDate();
    }

    private void updateEndDate () {
        this.endDate = startDate.plusMonths(1);
    }
}

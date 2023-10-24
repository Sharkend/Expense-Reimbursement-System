package com.sharkend.ersbackend.repository;

import com.sharkend.ersbackend.entity.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReimbursementRepository extends JpaRepository<Reimbursement, Long> {
    List<Reimbursement> findAllByEmployeeEmpId(long id);
}

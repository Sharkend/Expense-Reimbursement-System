package com.sharkend.ersbackend.repository;

import com.sharkend.ersbackend.entity.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReimbursementRepository extends JpaRepository<Reimbursement, Long> {
}

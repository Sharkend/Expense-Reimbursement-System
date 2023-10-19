package com.sharkend.ersbackend.service;

import com.sharkend.ersbackend.entity.Reimbursement;

import java.util.List;

public interface ReimbursementService {
    List<Reimbursement> getAllReimbursements();
    Reimbursement getReimbursementById(Long id);
    Reimbursement createReimbursement(Reimbursement reimbursement);
    Reimbursement updateReimbursement(Long id, Reimbursement reimbursement);
    void deleteReimbursement(Long id);
}

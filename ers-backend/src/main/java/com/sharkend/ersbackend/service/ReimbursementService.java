package com.sharkend.ersbackend.service;

import com.sharkend.ersbackend.entity.Reimbursement;

import java.util.List;

public interface ReimbursementService {
    List<Reimbursement> getAllReimbursementsByEmpId(long id);
    List<Reimbursement> getAllReimbursements();
    List<Reimbursement> getAllByStatusAndEmpId(boolean status, long id);
    List<Reimbursement> getAllByStatus(boolean status);
    Reimbursement getReimbursementById(Long id);
    Reimbursement createReimbursement(Reimbursement reimbursement);
    Reimbursement updateReimbursement(Long id, Reimbursement reimbursement);
    void deleteReimbursement(Long id);
}

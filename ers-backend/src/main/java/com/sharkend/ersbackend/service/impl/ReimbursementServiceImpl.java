package com.sharkend.ersbackend.service.impl;

import com.sharkend.ersbackend.entity.Employee;
import com.sharkend.ersbackend.entity.Reimbursement;
import com.sharkend.ersbackend.repository.EmployeeRepository;
import com.sharkend.ersbackend.repository.ReimbursementRepository;
import com.sharkend.ersbackend.service.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ReimbursementServiceImpl implements ReimbursementService {

    @Autowired
    private final ReimbursementRepository reimbursementRepository;
    @Autowired
    private final EmployeeRepository employeeRepository;

    public ReimbursementServiceImpl(ReimbursementRepository reimbursementRepository, EmployeeRepository employeeRepository) {
        this.reimbursementRepository = reimbursementRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Reimbursement> getAllReimbursementsByEmpId(long id) {
        return reimbursementRepository.findAllByEmployeeEmpId(id);
    }

    @Override
    public List<Reimbursement> getAllReimbursements() {
        return reimbursementRepository.findAll();
    }

    @Override
    public List<Reimbursement> getAllByStatusAndEmpId(boolean status, long id) {
        return reimbursementRepository.findAllByStatusAndEmployeeEmpId(status, id);
    }

    @Override
    public List<Reimbursement> getAllByStatus(boolean status) {
        return reimbursementRepository.findAllByStatus(status);
    }

    @Override
    public Reimbursement getReimbursementById(Long id) {
        return reimbursementRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Invalid ID"));
    }

    @Override
    public Reimbursement updateReimbursement(Long id, Reimbursement reimbursement) {
        Reimbursement _reimbursement = reimbursementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("This reimbursement does not exist"));
        _reimbursement.setAmount(reimbursement.getAmount());
        _reimbursement.setDescription(reimbursement.getDescription());
        _reimbursement.setStatus(reimbursement.isStatus());
        return reimbursementRepository.save(_reimbursement);
    }

    @Override
    public void deleteReimbursement(Long id) {
        reimbursementRepository.deleteById(id);
    }

    @Override
    public Reimbursement createReimbursement(Reimbursement reimbursement, long id) {
        Employee e = employeeRepository.findById(id).orElseThrow(()->new NoSuchElementException("Critical Error: Employee Does Not exist"));
        reimbursement.setEmployee(e);
        reimbursementRepository.save(reimbursement);
        return reimbursement;
    }
}

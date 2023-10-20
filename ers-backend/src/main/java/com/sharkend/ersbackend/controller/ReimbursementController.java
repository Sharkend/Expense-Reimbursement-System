package com.sharkend.ersbackend.controller;

import com.sharkend.ersbackend.entity.Reimbursement;
import com.sharkend.ersbackend.service.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/reimbursement")
@RestController
public class ReimbursementController {
    @Autowired
    private ReimbursementService reimbursementService;

    @PostMapping
    public ResponseEntity<Reimbursement> createReimbursement(@RequestBody Reimbursement reimbursement) {
        var data = reimbursementService.createReimbursement(reimbursement);
        return new ResponseEntity<>(data, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        var data = reimbursementService.getAllReimbursements();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reimbursement> updateReimbursement(@PathVariable("id") Long id,
                                                             @RequestBody Reimbursement reimbursement) {
        var data = reimbursementService.updateReimbursement(id, reimbursement);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReimbursement(@PathVariable("id") Long id) {
        reimbursementService.deleteReimbursement(id);
        return new ResponseEntity<>("Successfully deleted.", HttpStatus.OK);
    }

}

package com.sharkend.ersbackend.controller;

import com.sharkend.ersbackend.entity.Reimbursement;
import com.sharkend.ersbackend.service.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/reimbursement")
@RestController
public class ReimbursementController {
    @Autowired
    private ReimbursementService reimbursementService;

    @PostMapping("/{id}")
    public ResponseEntity<Reimbursement> createReimbursement(@RequestBody Reimbursement reimbursement, @PathVariable("id") long id) {
        var data = reimbursementService.createReimbursement(reimbursement, id);
        return new ResponseEntity<>(data, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        var data = reimbursementService.getAllReimbursements();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<List<Reimbursement>> getAllReimbursementsByEmpId(@PathVariable("id") long id) {
        var data = reimbursementService.getAllReimbursementsByEmpId(id);
//        System.out.println(data);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", params = "status")
    public ResponseEntity<List<Reimbursement>> getAllReimbursementsByStatusAndEmpId(
            @RequestParam boolean status, @PathVariable("id") long id
    ) {
        var data = reimbursementService.getAllByStatusAndEmpId(status, id);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping(value = "/employee", params = "status")
    public ResponseEntity<List<Reimbursement>> getAllReimbursementsByStatus(@RequestParam boolean status) {
        return new ResponseEntity<>(reimbursementService.getAllByStatus(status), HttpStatus.OK);
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

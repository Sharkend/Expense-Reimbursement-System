package com.sharkend.ersbackend.controller;

import com.sharkend.ersbackend.entity.Employee;
import com.sharkend.ersbackend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        var data = employeeService.createEmployee(employee);
        return new ResponseEntity<>(data, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Employee> loginEmployee(@RequestBody ObjHolder.TwoString obj){
        var data = employeeService.getEmployeeByEmailAndPassword(obj.one, obj.two);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    private static class ObjHolder{
        public static class TwoString {
            String one;
            String two;
        }
    }
}

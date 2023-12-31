package com.sharkend.ersbackend.controller;

import com.sharkend.ersbackend.entity.Employee;
import com.sharkend.ersbackend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    @GetMapping
    public ResponseEntity<List<Employee>> findAll() {
        return new ResponseEntity<>(employeeService.findAll(), HttpStatus.OK);
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
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employee) {
        var data = employeeService.updateEmployee(id, employee);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<Employee> loginEmployee(@RequestBody ObjHolder.LoginObj obj){
        var data = employeeService.getEmployeeByEmailAndPassword(obj.username, obj.password);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    //Class for holding custom RequestBodies
    private static class ObjHolder{
        public static class LoginObj {
            String username;
            String password;

            public LoginObj(String username, String password) {
                this.username = username;
                this.password = password;
            }
        }
    }
}

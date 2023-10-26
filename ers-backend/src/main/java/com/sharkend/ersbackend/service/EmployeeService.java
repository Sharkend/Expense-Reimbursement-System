package com.sharkend.ersbackend.service;

import com.sharkend.ersbackend.entity.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {
    Employee getEmployeeByEmailAndPassword(String id, String password);
    Employee updateEmployee(long id, Employee employee);
    void deleteEmployee(long id);
    Employee createEmployee(Employee employee);

    List<Employee> findAll();
}

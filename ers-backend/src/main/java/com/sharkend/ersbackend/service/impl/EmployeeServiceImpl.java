package com.sharkend.ersbackend.service.impl;

import com.sharkend.ersbackend.entity.Employee;
import com.sharkend.ersbackend.repository.EmployeeRepository;
import com.sharkend.ersbackend.service.EmployeeService;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee getEmployeeByEmailAndPassword(String email, String password) {
        return employeeRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public Employee updateEmployee(long id, Employee employee) {
        Employee old = employeeRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Resource not Found"));
        old.setEmail(employee.getEmail());
        old.setName(employee.getName());
        old.setPassword(employee.getPassword());
        return employeeRepository.save(old);
    }

    @Override
    public void deleteEmployee(long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
}

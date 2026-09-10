package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.DepartmentResponse;
import com.yourorg.appname.entity.Department;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DepartmentMapper;
import com.yourorg.appname.repository.DepartmentRepository;
import com.yourorg.appname.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, DepartmentMapper departmentMapper) {
        this.departmentRepository = departmentRepository;
        this.departmentMapper = departmentMapper;
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findByActiveTrue().stream()
                .map(departmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));
        return departmentMapper.toResponse(dept);
    }

    @Override
    public DepartmentResponse getDepartmentByCode(String code) {
        Department dept = departmentRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "code", code));
        return departmentMapper.toResponse(dept);
    }
}

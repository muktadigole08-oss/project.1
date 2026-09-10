package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.DepartmentResponse;
import java.util.List;

public interface DepartmentService {
    List<DepartmentResponse> getAllDepartments();
    DepartmentResponse getDepartmentById(Long id);
    DepartmentResponse getDepartmentByCode(String code);
}

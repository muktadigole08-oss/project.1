package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.DepartmentResponse;
import com.yourorg.appname.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DepartmentResponse>>> getAllDepartments() {
        List<DepartmentResponse> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(ApiResponse.ok(departments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentResponse>> getDepartmentById(@PathVariable Long id) {
        DepartmentResponse dept = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(ApiResponse.ok(dept));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ApiResponse<DepartmentResponse>> getDepartmentByCode(@PathVariable String code) {
        DepartmentResponse dept = departmentService.getDepartmentByCode(code);
        return ResponseEntity.ok(ApiResponse.ok(dept));
    }
}

package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.DoctorResponse;
import com.yourorg.appname.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> getAllDoctors(
            @RequestParam(required = false) Long departmentId) {
        List<DoctorResponse> doctors;
        if (departmentId != null) {
            doctors = doctorService.getDoctorsByDepartment(departmentId);
        } else {
            doctors = doctorService.getAllDoctors();
        }
        return ResponseEntity.ok(ApiResponse.ok(doctors));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorResponse>> getDoctorById(@PathVariable Long id) {
        DoctorResponse doc = doctorService.getDoctorById(id);
        return ResponseEntity.ok(ApiResponse.ok(doc));
    }
}

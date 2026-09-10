package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.LabReportResponse;
import com.yourorg.appname.service.LabReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-reports")
public class LabReportController {

    private final LabReportService labReportService;

    public LabReportController(LabReportService labReportService) {
        this.labReportService = labReportService;
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<LabReportResponse>>> getMyLabReports(Authentication authentication) {
        if (authentication == null) {
            return new ResponseEntity<>(ApiResponse.error("Authentication required"), HttpStatus.UNAUTHORIZED);
        }
        List<LabReportResponse> reports = labReportService.getReportsByUserEmail(authentication.getName());
        return ResponseEntity.ok(ApiResponse.ok(reports));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LabReportResponse>> getReportById(
            @PathVariable Long id,
            Authentication authentication) {
        if (authentication == null) {
            return new ResponseEntity<>(ApiResponse.error("Authentication required"), HttpStatus.UNAUTHORIZED);
        }
        LabReportResponse report = labReportService.getReportById(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.ok(report));
    }
}

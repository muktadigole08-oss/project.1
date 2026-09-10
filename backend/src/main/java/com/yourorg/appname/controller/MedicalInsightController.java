package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.MedicalInsightResponse;
import com.yourorg.appname.service.MedicalInsightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
public class MedicalInsightController {

    private final MedicalInsightService insightService;

    public MedicalInsightController(MedicalInsightService insightService) {
        this.insightService = insightService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MedicalInsightResponse>>> getAllInsights(
            @RequestParam(required = false) String category) {
        List<MedicalInsightResponse> insights;
        if (category != null && !category.isBlank()) {
            insights = insightService.getInsightsByCategory(category);
        } else {
            insights = insightService.getAllInsights();
        }
        return ResponseEntity.ok(ApiResponse.ok(insights));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicalInsightResponse>> getInsightById(@PathVariable Long id) {
        MedicalInsightResponse insight = insightService.getInsightById(id);
        return ResponseEntity.ok(ApiResponse.ok(insight));
    }
}

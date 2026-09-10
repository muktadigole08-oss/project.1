package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.MedicalInsightResponse;
import java.util.List;

public interface MedicalInsightService {
    List<MedicalInsightResponse> getAllInsights();
    MedicalInsightResponse getInsightById(Long id);
    List<MedicalInsightResponse> getInsightsByCategory(String category);
}

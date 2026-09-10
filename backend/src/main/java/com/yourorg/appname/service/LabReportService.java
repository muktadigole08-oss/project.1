package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.LabReportResponse;
import java.util.List;

public interface LabReportService {
    List<LabReportResponse> getReportsByUserEmail(String userEmail);
    LabReportResponse getReportById(Long id, String userEmail);
}

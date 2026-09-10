package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.LabReportResponse;
import com.yourorg.appname.entity.LabReport;
import org.springframework.stereotype.Component;

@Component
public class LabReportMapper {

    public LabReportResponse toResponse(LabReport report) {
        if (report == null) return null;
        return new LabReportResponse(
                report.getId(),
                report.getUser() != null ? report.getUser().getId() : null,
                report.getTestName(),
                report.getCategory(),
                report.getTestDate(),
                report.getDoctorName(),
                report.getStatus() != null ? report.getStatus().name() : null,
                report.getResultSummary(),
                report.getFileUrl(),
                report.getCreatedAt()
        );
    }
}

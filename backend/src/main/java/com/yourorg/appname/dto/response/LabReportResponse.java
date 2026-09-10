package com.yourorg.appname.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class LabReportResponse {

    private Long id;
    private Long userId;
    private String testName;
    private String category;
    private LocalDate testDate;
    private String doctorName;
    private String status;
    private String resultSummary;
    private String fileUrl;
    private LocalDateTime createdAt;

    public LabReportResponse() {}

    public LabReportResponse(Long id, Long userId, String testName, String category, LocalDate testDate,
                             String doctorName, String status, String resultSummary, String fileUrl, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.testName = testName;
        this.category = category;
        this.testDate = testDate;
        this.doctorName = doctorName;
        this.status = status;
        this.resultSummary = resultSummary;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getTestDate() {
        return testDate;
    }

    public void setTestDate(LocalDate testDate) {
        this.testDate = testDate;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResultSummary() {
        return resultSummary;
    }

    public void setResultSummary(String resultSummary) {
        this.resultSummary = resultSummary;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

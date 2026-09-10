package com.yourorg.appname.dto.response;

import java.math.BigDecimal;

public class DoctorResponse {

    private Long id;
    private String fullName;
    private String title;
    private Long departmentId;
    private String departmentName;
    private String qualifications;
    private Integer experienceYears;
    private BigDecimal rating;
    private Integer reviewCount;
    private BigDecimal consultationFee;
    private String avatarUrl;
    private String bio;
    private String availableDays;

    public DoctorResponse() {}

    public DoctorResponse(Long id, String fullName, String title, Long departmentId, String departmentName,
                          String qualifications, Integer experienceYears, BigDecimal rating, Integer reviewCount,
                          BigDecimal consultationFee, String avatarUrl, String bio, String availableDays) {
        this.id = id;
        this.fullName = fullName;
        this.title = title;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.qualifications = qualifications;
        this.experienceYears = experienceYears;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.consultationFee = consultationFee;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
        this.availableDays = availableDays;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getQualifications() {
        return qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public BigDecimal getConsultationFee() {
        return consultationFee;
    }

    public void setConsultationFee(BigDecimal consultationFee) {
        this.consultationFee = consultationFee;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvailableDays() {
        return availableDays;
    }

    public void setAvailableDays(String availableDays) {
        this.availableDays = availableDays;
    }
}

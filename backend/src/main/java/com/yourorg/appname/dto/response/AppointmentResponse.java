package com.yourorg.appname.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AppointmentResponse {

    private Long id;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private Long doctorId;
    private String doctorName;
    private Long departmentId;
    private String departmentName;
    private LocalDate appointmentDate;
    private String appointmentTime;
    private String consultType;
    private String status;
    private String symptomsNotes;
    private LocalDateTime createdAt;

    public AppointmentResponse() {}

    public AppointmentResponse(Long id, String patientName, String patientEmail, String patientPhone,
                               Long doctorId, String doctorName, Long departmentId, String departmentName,
                               LocalDate appointmentDate, String appointmentTime, String consultType,
                               String status, String symptomsNotes, LocalDateTime createdAt) {
        this.id = id;
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.patientPhone = patientPhone;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.consultType = consultType;
        this.status = status;
        this.symptomsNotes = symptomsNotes;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }

    public String getPatientPhone() {
        return patientPhone;
    }

    public void setPatientPhone(String patientPhone) {
        this.patientPhone = patientPhone;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
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

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getConsultType() {
        return consultType;
    }

    public void setConsultType(String consultType) {
        this.consultType = consultType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSymptomsNotes() {
        return symptomsNotes;
    }

    public void setSymptomsNotes(String symptomsNotes) {
        this.symptomsNotes = symptomsNotes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

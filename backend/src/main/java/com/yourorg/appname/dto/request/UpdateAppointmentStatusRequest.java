package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;

public class UpdateAppointmentStatusRequest {

    @NotBlank(message = "Status is required")
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED

    public UpdateAppointmentStatusRequest() {}

    public UpdateAppointmentStatusRequest(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.AppointmentRequest;
import com.yourorg.appname.dto.response.AppointmentResponse;
import java.util.List;

public interface AppointmentService {
    AppointmentResponse createAppointment(AppointmentRequest request, String userEmail);
    List<AppointmentResponse> getAppointmentsByUser(String userEmail);
    List<AppointmentResponse> getAllAppointments();
    AppointmentResponse getAppointmentById(Long id);
    AppointmentResponse updateAppointmentStatus(Long id, String status);
}

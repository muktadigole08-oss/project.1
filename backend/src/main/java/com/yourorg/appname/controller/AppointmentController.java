package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.AppointmentRequest;
import com.yourorg.appname.dto.request.UpdateAppointmentStatusRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.AppointmentResponse;
import com.yourorg.appname.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponse>> createAppointment(
            @Valid @RequestBody AppointmentRequest request,
            Authentication authentication) {

        String userEmail = authentication != null ? authentication.getName() : null;
        AppointmentResponse response = appointmentService.createAppointment(request, userEmail);
        return new ResponseEntity<>(ApiResponse.ok("Appointment booked successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getMyAppointments(Authentication authentication) {
        if (authentication == null) {
            return new ResponseEntity<>(ApiResponse.error("Authentication required"), HttpStatus.UNAUTHORIZED);
        }
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getAllAppointments() {
        List<AppointmentResponse> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(ApiResponse.ok(appointments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AppointmentResponse>> getAppointmentById(@PathVariable Long id) {
        AppointmentResponse response = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_DOCTOR')")
    public ResponseEntity<ApiResponse<AppointmentResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAppointmentStatusRequest request) {
        AppointmentResponse response = appointmentService.updateAppointmentStatus(id, request.getStatus());
        return ResponseEntity.ok(ApiResponse.ok("Appointment status updated", response));
    }
}

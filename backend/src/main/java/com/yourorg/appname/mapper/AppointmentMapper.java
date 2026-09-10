package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.AppointmentResponse;
import com.yourorg.appname.entity.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public AppointmentResponse toResponse(Appointment apt) {
        if (apt == null) return null;
        return new AppointmentResponse(
                apt.getId(),
                apt.getPatientName(),
                apt.getPatientEmail(),
                apt.getPatientPhone(),
                apt.getDoctor() != null ? apt.getDoctor().getId() : null,
                apt.getDoctor() != null ? apt.getDoctor().getFullName() : null,
                apt.getDepartment() != null ? apt.getDepartment().getId() : null,
                apt.getDepartment() != null ? apt.getDepartment().getName() : null,
                apt.getAppointmentDate(),
                apt.getAppointmentTime(),
                apt.getConsultType() != null ? apt.getConsultType().name() : null,
                apt.getStatus() != null ? apt.getStatus().name() : null,
                apt.getSymptomsNotes(),
                apt.getCreatedAt()
        );
    }
}

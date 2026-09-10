package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Appointment;
import com.yourorg.appname.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientEmailOrderByAppointmentDateDesc(String patientEmail);
    List<Appointment> findByUserIdOrderByAppointmentDateDesc(Long userId);
    List<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, LocalDate appointmentDate);
    List<Appointment> findByStatus(AppointmentStatus status);
}

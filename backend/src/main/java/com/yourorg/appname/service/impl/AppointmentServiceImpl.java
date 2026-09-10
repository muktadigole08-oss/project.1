package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.AppointmentRequest;
import com.yourorg.appname.dto.response.AppointmentResponse;
import com.yourorg.appname.entity.*;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.AppointmentMapper;
import com.yourorg.appname.repository.AppointmentRepository;
import com.yourorg.appname.repository.DepartmentRepository;
import com.yourorg.appname.repository.DoctorRepository;
import com.yourorg.appname.repository.UserRepository;
import com.yourorg.appname.service.AppointmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final AppointmentMapper appointmentMapper;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                  DoctorRepository doctorRepository,
                                  DepartmentRepository departmentRepository,
                                  UserRepository userRepository,
                                  AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.appointmentMapper = appointmentMapper;
    }

    @Override
    @Transactional
    public AppointmentResponse createAppointment(AppointmentRequest request, String userEmail) {
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", request.getDoctorId()));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", request.getDepartmentId()));

        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        } else if (request.getPatientEmail() != null) {
            user = userRepository.findByEmail(request.getPatientEmail()).orElse(null);
        }

        Appointment appointment = new Appointment();
        appointment.setPatientName(request.getPatientName());
        appointment.setPatientEmail(request.getPatientEmail());
        appointment.setPatientPhone(request.getPatientPhone());
        appointment.setUser(user);
        appointment.setDoctor(doctor);
        appointment.setDepartment(department);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());

        try {
            if (request.getConsultType() != null) {
                appointment.setConsultType(ConsultationType.valueOf(request.getConsultType().toUpperCase()));
            }
        } catch (IllegalArgumentException e) {
            appointment.setConsultType(ConsultationType.IN_PERSON);
        }

        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setSymptomsNotes(request.getSymptomsNotes());

        Appointment saved = appointmentRepository.save(appointment);
        return appointmentMapper.toResponse(saved);
    }

    @Override
    public List<AppointmentResponse> getAppointmentsByUser(String userEmail) {
        return appointmentRepository.findByPatientEmailOrderByAppointmentDateDesc(userEmail).stream()
                .map(appointmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(appointmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentResponse getAppointmentById(Long id) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        return appointmentMapper.toResponse(apt);
    }

    @Override
    @Transactional
    public AppointmentResponse updateAppointmentStatus(Long id, String status) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        try {
            apt.setStatus(AppointmentStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid appointment status: " + status);
        }

        Appointment updated = appointmentRepository.save(apt);
        return appointmentMapper.toResponse(updated);
    }
}

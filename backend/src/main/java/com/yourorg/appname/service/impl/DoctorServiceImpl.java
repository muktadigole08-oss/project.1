package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.DoctorResponse;
import com.yourorg.appname.entity.Doctor;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DoctorMapper;
import com.yourorg.appname.repository.DoctorRepository;
import com.yourorg.appname.service.DoctorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;

    public DoctorServiceImpl(DoctorRepository doctorRepository, DoctorMapper doctorMapper) {
        this.doctorRepository = doctorRepository;
        this.doctorMapper = doctorMapper;
    }

    @Override
    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(doctorMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorResponse getDoctorById(Long id) {
        Doctor doc = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        return doctorMapper.toResponse(doc);
    }

    @Override
    public List<DoctorResponse> getDoctorsByDepartment(Long departmentId) {
        return doctorRepository.findByDepartmentId(departmentId).stream()
                .map(doctorMapper::toResponse)
                .collect(Collectors.toList());
    }
}

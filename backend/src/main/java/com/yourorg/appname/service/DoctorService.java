package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.DoctorResponse;
import java.util.List;

public interface DoctorService {
    List<DoctorResponse> getAllDoctors();
    DoctorResponse getDoctorById(Long id);
    List<DoctorResponse> getDoctorsByDepartment(Long departmentId);
}

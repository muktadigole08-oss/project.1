package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.DoctorResponse;
import com.yourorg.appname.entity.Doctor;
import org.springframework.stereotype.Component;

@Component
public class DoctorMapper {

    public DoctorResponse toResponse(Doctor doc) {
        if (doc == null) return null;
        return new DoctorResponse(
                doc.getId(),
                doc.getFullName(),
                doc.getTitle(),
                doc.getDepartment() != null ? doc.getDepartment().getId() : null,
                doc.getDepartment() != null ? doc.getDepartment().getName() : null,
                doc.getQualifications(),
                doc.getExperienceYears(),
                doc.getRating(),
                doc.getReviewCount(),
                doc.getConsultationFee(),
                doc.getAvatarUrl(),
                doc.getBio(),
                doc.getAvailableDays()
        );
    }
}

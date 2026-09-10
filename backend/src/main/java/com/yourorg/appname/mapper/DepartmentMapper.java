package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.DepartmentResponse;
import com.yourorg.appname.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentMapper {

    public DepartmentResponse toResponse(Department dept) {
        if (dept == null) return null;
        return new DepartmentResponse(
                dept.getId(),
                dept.getName(),
                dept.getCode(),
                dept.getDescription(),
                dept.getIcon(),
                dept.getHeadDoctorName(),
                dept.getBedCount(),
                dept.getFloorNumber(),
                dept.getActive()
        );
    }
}

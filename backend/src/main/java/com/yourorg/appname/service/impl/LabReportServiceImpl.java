package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.LabReportResponse;
import com.yourorg.appname.entity.LabReport;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.LabReportMapper;
import com.yourorg.appname.repository.LabReportRepository;
import com.yourorg.appname.service.LabReportService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabReportServiceImpl implements LabReportService {

    private final LabReportRepository labReportRepository;
    private final LabReportMapper labReportMapper;

    public LabReportServiceImpl(LabReportRepository labReportRepository, LabReportMapper labReportMapper) {
        this.labReportRepository = labReportRepository;
        this.labReportMapper = labReportMapper;
    }

    @Override
    public List<LabReportResponse> getReportsByUserEmail(String userEmail) {
        return labReportRepository.findByUserEmailOrderByTestDateDesc(userEmail).stream()
                .map(labReportMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LabReportResponse getReportById(Long id, String userEmail) {
        LabReport report = labReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LabReport", "id", id));

        if (!report.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new ResourceNotFoundException("LabReport not accessible");
        }

        return labReportMapper.toResponse(report);
    }
}

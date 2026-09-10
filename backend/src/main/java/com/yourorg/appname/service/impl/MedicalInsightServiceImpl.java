package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.MedicalInsightResponse;
import com.yourorg.appname.entity.MedicalInsight;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.MedicalInsightMapper;
import com.yourorg.appname.repository.MedicalInsightRepository;
import com.yourorg.appname.service.MedicalInsightService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalInsightServiceImpl implements MedicalInsightService {

    private final MedicalInsightRepository medicalInsightRepository;
    private final MedicalInsightMapper medicalInsightMapper;

    public MedicalInsightServiceImpl(MedicalInsightRepository medicalInsightRepository, MedicalInsightMapper medicalInsightMapper) {
        this.medicalInsightRepository = medicalInsightRepository;
        this.medicalInsightMapper = medicalInsightMapper;
    }

    @Override
    public List<MedicalInsightResponse> getAllInsights() {
        return medicalInsightRepository.findAllByOrderByPublishDateDesc().stream()
                .map(medicalInsightMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalInsightResponse getInsightById(Long id) {
        MedicalInsight insight = medicalInsightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalInsight", "id", id));
        return medicalInsightMapper.toResponse(insight);
    }

    @Override
    public List<MedicalInsightResponse> getInsightsByCategory(String category) {
        return medicalInsightRepository.findByCategoryIgnoreCase(category).stream()
                .map(medicalInsightMapper::toResponse)
                .collect(Collectors.toList());
    }
}

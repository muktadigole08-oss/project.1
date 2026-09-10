package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.MedicalInsightResponse;
import com.yourorg.appname.entity.MedicalInsight;
import org.springframework.stereotype.Component;

@Component
public class MedicalInsightMapper {

    public MedicalInsightResponse toResponse(MedicalInsight insight) {
        if (insight == null) return null;
        return new MedicalInsightResponse(
                insight.getId(),
                insight.getTitle(),
                insight.getCategory(),
                insight.getSummary(),
                insight.getContent(),
                insight.getAuthorName(),
                insight.getAuthorRole(),
                insight.getReadTimeMinutes(),
                insight.getPublishDate(),
                insight.getImageUrl(),
                insight.getCreatedAt()
        );
    }
}

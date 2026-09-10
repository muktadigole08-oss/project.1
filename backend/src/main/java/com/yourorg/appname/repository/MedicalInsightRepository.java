package com.yourorg.appname.repository;

import com.yourorg.appname.entity.MedicalInsight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalInsightRepository extends JpaRepository<MedicalInsight, Long> {
    List<MedicalInsight> findByCategoryIgnoreCase(String category);
    List<MedicalInsight> findAllByOrderByPublishDateDesc();
}

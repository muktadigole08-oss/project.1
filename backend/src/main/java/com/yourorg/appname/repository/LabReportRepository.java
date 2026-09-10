package com.yourorg.appname.repository;

import com.yourorg.appname.entity.LabReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabReportRepository extends JpaRepository<LabReport, Long> {
    List<LabReport> findByUserIdOrderByTestDateDesc(Long userId);
    List<LabReport> findByUserEmailOrderByTestDateDesc(String email);
}

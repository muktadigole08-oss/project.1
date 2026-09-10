package com.yourorg.appname.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_insights")
public class MedicalInsight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 80)
    private String category;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String summary;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content;

    @Column(name = "author_name", nullable = false, length = 120)
    private String authorName;

    @Column(name = "author_role", length = 120)
    private String authorRole;

    @Column(name = "read_time_minutes")
    private Integer readTimeMinutes = 5;

    @Column(name = "publish_date", nullable = false)
    private LocalDate publishDate;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public MedicalInsight() {}

    public MedicalInsight(Long id, String title, String category, String summary, String content,
                          String authorName, String authorRole, Integer readTimeMinutes, LocalDate publishDate,
                          String imageUrl, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.content = content;
        this.authorName = authorName;
        this.authorRole = authorRole;
        this.readTimeMinutes = readTimeMinutes;
        this.publishDate = publishDate;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAuthorRole() {
        return authorRole;
    }

    public void setAuthorRole(String authorRole) {
        this.authorRole = authorRole;
    }

    public Integer getReadTimeMinutes() {
        return readTimeMinutes;
    }

    public void setReadTimeMinutes(Integer readTimeMinutes) {
        this.readTimeMinutes = readTimeMinutes;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

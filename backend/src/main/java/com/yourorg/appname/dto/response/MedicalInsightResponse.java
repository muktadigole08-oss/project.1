package com.yourorg.appname.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MedicalInsightResponse {

    private Long id;
    private String title;
    private String category;
    private String summary;
    private String content;
    private String authorName;
    private String authorRole;
    private Integer readTimeMinutes;
    private LocalDate publishDate;
    private String imageUrl;
    private LocalDateTime createdAt;

    public MedicalInsightResponse() {}

    public MedicalInsightResponse(Long id, String title, String category, String summary, String content,
                                  String authorName, String authorRole, Integer readTimeMinutes,
                                  LocalDate publishDate, String imageUrl, LocalDateTime createdAt) {
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
        this.createdAt = createdAt;
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

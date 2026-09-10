package com.yourorg.appname.dto.response;

public class DepartmentResponse {

    private Long id;
    private String name;
    private String code;
    private String description;
    private String icon;
    private String headDoctorName;
    private Integer bedCount;
    private String floorNumber;
    private Boolean active;

    public DepartmentResponse() {}

    public DepartmentResponse(Long id, String name, String code, String description, String icon,
                              String headDoctorName, Integer bedCount, String floorNumber, Boolean active) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.icon = icon;
        this.headDoctorName = headDoctorName;
        this.bedCount = bedCount;
        this.floorNumber = floorNumber;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getHeadDoctorName() {
        return headDoctorName;
    }

    public void setHeadDoctorName(String headDoctorName) {
        this.headDoctorName = headDoctorName;
    }

    public Integer getBedCount() {
        return bedCount;
    }

    public void setBedCount(Integer bedCount) {
        this.bedCount = bedCount;
    }

    public String getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(String floorNumber) {
        this.floorNumber = floorNumber;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}

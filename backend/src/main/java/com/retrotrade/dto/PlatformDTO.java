package com.retrotrade.dto;

public class PlatformDTO {
    private Long id;
    private String name;
    private String code;
    private String manufacturer;
    private Integer releaseYear;
    private Integer generation;

    public PlatformDTO() {
    }

    public PlatformDTO(Long id, String name, String code, String manufacturer, Integer releaseYear, Integer generation) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.manufacturer = manufacturer;
        this.releaseYear = releaseYear;
        this.generation = generation;
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

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Integer getGeneration() {
        return generation;
    }

    public void setGeneration(Integer generation) {
        this.generation = generation;
    }
}

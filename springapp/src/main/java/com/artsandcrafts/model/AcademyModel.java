package com.artsandcrafts.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class AcademyModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer academyId;
    private String academyEmail;
    private String academyName;

    public AcademyModel(Integer academyId, String academyEmail, String academyName, String academyLocation, String academyMobileNo, String academyImageUrl, String academyDescription, Integer rating) {
        this.academyId = academyId;
        this.academyEmail = academyEmail;
        this.academyName = academyName;
        this.academyLocation = academyLocation;
        this.academyMobileNo = academyMobileNo;
        this.academyImageUrl = academyImageUrl;
        this.academyDescription = academyDescription;
        this.rating = rating;
    }

    public Integer getAcademyId() {
        return academyId;
    }

    public void setAcademyId(Integer academyId) {
        this.academyId = academyId;
    }

    public String getAcademyEmail() {
        return academyEmail;
    }

    public void setAcademyEmail(String academyEmail) {
        this.academyEmail = academyEmail;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName;
    }

    public String getAcademyLocation() {
        return academyLocation;
    }

    public void setAcademyLocation(String academyLocation) {
        this.academyLocation = academyLocation;
    }

    public String getAcademyMobileNo() {
        return academyMobileNo;
    }

    public void setAcademyMobileNo(String academyMobileNo) {
        this.academyMobileNo = academyMobileNo;
    }

    public String getAcademyImageUrl() {
        return academyImageUrl;
    }

    public void setAcademyImageUrl(String academyImageUrl) {
        this.academyImageUrl = academyImageUrl;
    }

    public String getAcademyDescription() {
        return academyDescription;
    }

    public void setAcademyDescription(String academyDescription) {
        this.academyDescription = academyDescription;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    private String academyLocation;
    private String academyMobileNo;
    private String academyImageUrl;
    private String academyDescription;
    private Integer rating;







}
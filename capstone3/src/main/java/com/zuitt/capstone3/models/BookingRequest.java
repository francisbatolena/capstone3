package com.zuitt.capstone3.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookingRequests")
public class BookingRequest {

    @Id
    private String id;
    private String date;
    private String location;
    private String remarks;
    private String status;

    @DBRef
    private Account user;

    @DBRef
    private Service service;

    public BookingRequest(String date, String location, String remarks, String status, Service service) {
        this.date = date;
        this.location = location;
        this.remarks = remarks;
        this.status = status;
        this.service = service;
    }

    public String getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Account getUser() {
        return user;
    }

    public void setUser(Account user) {
        this.user = user;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

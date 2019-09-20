package com.zuitt.capstone3.controllers;

import com.zuitt.capstone3.models.BookingRequest;
import com.zuitt.capstone3.repositories.BookingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingRequestController {
    @Autowired
    BookingRequestRepository bookingRequestRepository;

    @GetMapping("/bookingRequest")
    public Iterable<BookingRequest> getBookingRequests() {
        return bookingRequestRepository.findAll();
    }

    @DeleteMapping("/bookingRequest/{id}")
    public void deleteBookingRequest(@PathVariable String id){
        bookingRequestRepository.deleteById(id);
    }

    @PutMapping("/bookingRequest")
    public BookingRequest editBookingStatus(@RequestBody BookingRequest bookingRequest) {
        bookingRequest.setStatus(bookingRequest.getStatus());
        return bookingRequestRepository.save(bookingRequest);
    }

}

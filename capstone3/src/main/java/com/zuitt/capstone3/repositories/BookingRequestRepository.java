package com.zuitt.capstone3.repositories;

import com.zuitt.capstone3.models.BookingRequest;
import com.zuitt.capstone3.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRequestRepository extends MongoRepository<BookingRequest, String> {
    List<BookingRequest> findByUserId(String id);
}

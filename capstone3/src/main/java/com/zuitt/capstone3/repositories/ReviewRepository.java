package com.zuitt.capstone3.repositories;

import com.zuitt.capstone3.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByUser_Id(String id);
    List<Review> findByService_Id(String id);
}

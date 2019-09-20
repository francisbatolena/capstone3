package com.zuitt.capstone3.controllers;

import com.zuitt.capstone3.models.Review;
import com.zuitt.capstone3.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    ReviewRepository reviewRepository;

    @GetMapping("/reviews")
    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    @DeleteMapping("/reviews/{id}")
    public void deleteReviews(@PathVariable String id) {
        reviewRepository.deleteById(id);
    }
}

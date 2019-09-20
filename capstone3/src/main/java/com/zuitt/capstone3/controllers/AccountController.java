package com.zuitt.capstone3.controllers;

import com.zuitt.capstone3.models.Account;
import com.zuitt.capstone3.models.BookingRequest;
import com.zuitt.capstone3.models.Review;
import com.zuitt.capstone3.models.Service;
import com.zuitt.capstone3.repositories.AccountRepository;
import com.zuitt.capstone3.repositories.BookingRequestRepository;
import com.zuitt.capstone3.repositories.ReviewRepository;
import com.zuitt.capstone3.repositories.ServiceRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    BookingRequestRepository bookingRequestRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @GetMapping("/accounts")
    public Iterable<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @Value("${jwt.secret}")
    private String secretKey;

    @PostMapping("/register")
    public String registerAccount(@RequestBody Account account) {
        Account foundAccount = accountRepository.findByUsername(account.getUsername());
        if(foundAccount==null) {
            String hashedpw = BCrypt.hashpw(account.getPassword(), BCrypt.gensalt());
            account.setPassword(hashedpw);
            accountRepository.save(account);
            return("registration successful");
        } else {
            return("username is already registered");
        }
    }

    @PostMapping("/login")
    public String loginAccount(@RequestBody Account account) {
        Account foundAccount = accountRepository.findByUsername(account.getUsername());

        if(BCrypt.checkpw(account.getPassword(), foundAccount.getPassword())) {
            Claims claims = Jwts.claims().setSubject(foundAccount.getId());
            return Jwts.builder()
                    .setClaims(claims)
                    .signWith(SignatureAlgorithm.HS512, secretKey)
                    .claim("account", foundAccount)
                    .compact();
        } else {
            return("It does not match");
        }
    }

    @PostMapping("/users/{id}/reviews")
    public Review addReview(@RequestBody Review review, @PathVariable String id) {
        Account user = accountRepository.findById(id).get();
        review.setUser(user);
        return reviewRepository.save(review);
    }

    @GetMapping("/users/{id}/reviews")
    public List<Review> findReviewByUser (@PathVariable String id) {
        return reviewRepository.findByUser_Id(id);
    }

    @PostMapping("/users/{user_id}/bookingRequest")
    public BookingRequest addBookingRequest(@RequestBody BookingRequest bookingRequest, @PathVariable String user_id) {

        Account user = accountRepository.findById(user_id).get();
        bookingRequest.setUser(user);

        Service service = serviceRepository.findById(bookingRequest.getService().getId()).get();
        bookingRequest.setService(service);

        return bookingRequestRepository.save(bookingRequest);
    }

    @GetMapping("/users/{id}/bookingRequest")
    public List<BookingRequest> findBookingRequestByUser (@PathVariable String id) {
        return bookingRequestRepository.findByUserId(id);
    }

}

package com.zuitt.capstone3.controllers;

import com.zuitt.capstone3.models.Account;
import com.zuitt.capstone3.models.Review;
import com.zuitt.capstone3.models.Service;
import com.zuitt.capstone3.repositories.AccountRepository;
import com.zuitt.capstone3.repositories.ReviewRepository;
import com.zuitt.capstone3.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {
    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/services")
    public Iterable<Service> getServices() {
        return serviceRepository.findAll();
    }

    @PostMapping("/services")
    public Service addService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }

    @PutMapping("/services")
    public Service editService(@RequestBody Service service) {
        service.setName(service.getName());
        return serviceRepository.save(service);
    }

    @PostMapping("/services/{service_id}/reviews")
    public Review addReview(@RequestBody Review review, @PathVariable String service_id) {

        Service foundService = serviceRepository.findById(service_id).get();
        review.setService(foundService);

        Account user = accountRepository.findById(review.getUser().getId()).get();
        review.setUser(user);

        return reviewRepository.save(review);
    }

    @GetMapping("/services/{service_id}/reviews")
    public List<Review> findReviewByService (@PathVariable String service_id) {
        return reviewRepository.findByService_Id(service_id);
    }


    private static String UPLOADED_FOLDER = "src/main/resources/static/images/";

    @PostMapping("/upload/{service_id}")
    public String singleFileUpload(@PathVariable String service_id, @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "error. no image uploaded.";
        }

        try {
            System.out.println(file.getOriginalFilename());
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            Service service = serviceRepository.findById(service_id).get();
            System.out.println(service.getName());
            service.setImage(file.getOriginalFilename());
            serviceRepository.save(service);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return file.getOriginalFilename();
    }
}

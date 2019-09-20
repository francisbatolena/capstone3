package com.zuitt.capstone3.repositories;

import com.zuitt.capstone3.models.Service;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceRepository extends MongoRepository<Service, String> {

}

package com.zuitt.capstone3.repositories;

import com.zuitt.capstone3.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByUsername(String username);
}

package com.zuitt.capstone3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude={ SecurityAutoConfiguration.class })
public class Capstone3Application {

	public static void main(String[] args) {
		SpringApplication.run(Capstone3Application.class, args);
	}

}

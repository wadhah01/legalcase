package com.legalpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LegalCaseManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(LegalCaseManagementApplication.class, args);
    }
}
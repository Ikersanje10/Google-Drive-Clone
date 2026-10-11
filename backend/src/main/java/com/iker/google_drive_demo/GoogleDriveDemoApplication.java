package com.iker.google_drive_demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class GoogleDriveDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(GoogleDriveDemoApplication.class, args);
    }

}

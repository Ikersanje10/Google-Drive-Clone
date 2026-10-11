package com.iker.google_drive_demo.auth;

import java.security.SecureRandom;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.iker.google_drive_demo.email.EmailService;

@Service
public class OtpService {

    private static final SecureRandom random = new SecureRandom();
    private final EmailService emailService;
    private final RedisTemplate<String, OtpData> redisTemplate;

    public OtpService(EmailService emailService, RedisTemplate<String, OtpData> redisTemplate) {
        this.emailService = emailService;
        this.redisTemplate = redisTemplate;
    }

    public static String generateOtpCode(int length) {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString();
    }

    @Async("otpExecutor")
    public void generateAndSendOtpCode(String email) {
        String otpCode = emailService.sendOtpEmail(email);
        OtpData data = new OtpData(otpCode, 3);
        redisTemplate.opsForValue().set(email, data);
    }
}

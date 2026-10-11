package com.iker.google_drive_demo.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.iker.google_drive_demo.auth.OtpService;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public String sendOtpEmail(String toEmail) {
        String otpCode = OtpService.generateOtpCode(6);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otpCode + "\nIt will expire in 5 minutes.");

        mailSender.send(message);

        return otpCode;
    }
}

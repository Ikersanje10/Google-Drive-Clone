package com.iker.google_drive_demo.auth;

import org.apache.catalina.connector.Response;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.iker.google_drive_demo.user.User;
import com.iker.google_drive_demo.user.UserRepository;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class authController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RedisTemplate<String, OtpData> redisTemplate;
    private final OtpService otpService;

    public authController(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, RedisTemplate<String, OtpData> redisTemplate,
            OtpService otpService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.redisTemplate = redisTemplate;
        this.otpService = otpService;
    }

    @PostMapping("api/v1/login")
    public int login(@RequestBody loginDTO payload) {
        Authentication authenticationRequest = new UsernamePasswordAuthenticationToken(payload.email(),
                payload.password());
        try {
            authenticationManager.authenticate(authenticationRequest);
        } catch (Exception e) {
            return Response.SC_UNAUTHORIZED;
        }

        otpService.generateAndSendOtpCode(payload.email());

        return Response.SC_OK;
    }

    @PostMapping("api/v1/login/otp")
    public int verifyOtp(@RequestBody OtpDTO payload, HttpServletRequest request) {
        OtpData data = redisTemplate.opsForValue().get(payload.email());

        if (data == null) {
            return Response.SC_NOT_FOUND;
        }

        if (!payload.otpCode().equals(data.otpCode())) {
            OtpData updated = new OtpData(data.otpCode(), data.attemptsLeft() - 1);
            redisTemplate.opsForValue().set(payload.email(), updated);

            if (updated.attemptsLeft() <= 0) {
                redisTemplate.delete(payload.email());
                return HttpStatus.LOCKED.value();
            }

            return Response.SC_UNAUTHORIZED;
        }

        redisTemplate.delete(payload.email());

        User user = userRepository.findByEmail(payload.email())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        Authentication authenticated = new UsernamePasswordAuthenticationToken(
                user, null, user.getAuthorities());

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authenticated);
        SecurityContextHolder.setContext(context);

        HttpSession session = request.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

        return Response.SC_OK;
    }

    @PostMapping("/api/v1/signup")
    public int signup(@RequestBody signupDTO payload) {
        User newUser = new User();
        newUser.setFullName(payload.fullName());
        newUser.setEmail(payload.email());
        newUser.setPassword(passwordEncoder.encode(payload.password()));

        try {
            userRepository.save(newUser);
        } catch (Exception e) {
            return Response.SC_CONFLICT;
        }

        return Response.SC_CREATED;
    }

    @PostMapping("/api/v1/login/resendOtp")
    public int resendOtp(@RequestBody String email) {
        try {
            otpService.generateAndSendOtpCode(email);
            return Response.SC_OK;
        } catch (Exception e) {
            return Response.SC_CONFLICT;
        }
    }
}

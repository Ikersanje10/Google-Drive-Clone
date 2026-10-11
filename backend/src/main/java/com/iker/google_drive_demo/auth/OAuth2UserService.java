package com.iker.google_drive_demo.auth;

import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.iker.google_drive_demo.user.User;
import com.iker.google_drive_demo.user.UserRepository;

@Service
public class OAuth2UserService extends OidcUserService {

    private final UserRepository userRepository;

    public OAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);

        String email = oidcUser.getEmail();

        userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(new User(oidcUser.getFullName(), email)));

        return oidcUser;
    }
}
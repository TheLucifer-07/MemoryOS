package com.memoryos.controller;

import com.memoryos.dto.AuthUserResponse;
import com.memoryos.security.SecurityUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @GetMapping("/me")
    public AuthUserResponse me() {
        return new AuthUserResponse(SecurityUtils.currentUserId());
    }
}

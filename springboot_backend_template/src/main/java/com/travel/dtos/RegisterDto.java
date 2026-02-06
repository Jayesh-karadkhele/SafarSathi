package com.travel.dtos;

import lombok.Data;

@Data
public class RegisterDto {

    private String name;
    private String email;
    private String password;

    // Must match enum values: CUSTOMER / VENDOR / ADMIN
    private String userRole;
}

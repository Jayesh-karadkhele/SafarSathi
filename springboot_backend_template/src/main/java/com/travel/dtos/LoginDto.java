package com.travel.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor  // ✅ Necessary for Jackson to create the object
@AllArgsConstructor // ✅ Good practice
public class LoginDto {
    private String email;
    private String password;
}
package com.psychology.dtos;

public record AuthDTO(String accessToken, String type, Integer id, String email, String role) {

}

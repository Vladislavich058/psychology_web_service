package com.psychology.services;

import com.psychology.dtos.AuthDTO;
import com.psychology.dtos.UserDTO;

public interface LoginService {
	AuthDTO logIn(UserDTO userDTO);
}

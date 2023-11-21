package com.psychology.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.psychology.dtos.AuthDTO;
import com.psychology.dtos.UserDTO;
import com.psychology.entities.User;
import com.psychology.jwt.JwtUtils;
import com.psychology.mappers.UserMapper;
import com.psychology.repositories.UserRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	UserMapper userMapper;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Override
	public AuthDTO logIn(UserDTO userDTO) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		User userDetails = (User) authentication.getPrincipal();
		String role = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).findFirst().get();
		return new AuthDTO(jwt, "Bearer", userDetails.getId(), userDetails.getEmail(), role);
	}
}

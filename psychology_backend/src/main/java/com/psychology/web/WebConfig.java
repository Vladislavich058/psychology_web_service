package com.psychology.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.psychology.entities.User;
import com.psychology.repositories.UserRepository;

@Component
public class WebConfig implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Override
	public void run(String... args) throws Exception {
		if (userRepository.findAll().isEmpty()) {
			userRepository.save(User.builder().email("anna@mail.ru").password(encoder.encode(("admin"))).name("Анна")
					.surname("Круглей").lastname("Александровна").phone("+375334567899").role("admin").build());
		}

	}

}

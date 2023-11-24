package com.psychology.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.psychology.dtos.ErrorDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionApiHandler {


	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ErrorDTO> usernameNotFoundException(UsernameNotFoundException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDTO(exception.getMessage()));
	}

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorDTO> notFoundException(NotFoundException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDTO(exception.getMessage()));
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorDTO> badCredentialsException(BadCredentialsException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDTO("Неверные данные!"));
	}
	
	@ExceptionHandler(SpecializationAlreadyExists.class)
	public ResponseEntity<ErrorDTO> specializationAlreadyExists(SpecializationAlreadyExists exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorDTO(exception.getMessage()));
	}
	
	@ExceptionHandler(NoAvailableOffice.class)
	public ResponseEntity<ErrorDTO> noAvailableOffice(NoAvailableOffice exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDTO(exception.getMessage()));
	}
	
	@ExceptionHandler(IncorrectDateTime.class)
	public ResponseEntity<ErrorDTO> incorrectDateTime(IncorrectDateTime exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorDTO(exception.getMessage()));
	}
	
	@ExceptionHandler(PsychologistAlreadyExists.class)
	public ResponseEntity<ErrorDTO> psychologistAlreadyExists(PsychologistAlreadyExists exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorDTO(exception.getMessage()));
	}

}

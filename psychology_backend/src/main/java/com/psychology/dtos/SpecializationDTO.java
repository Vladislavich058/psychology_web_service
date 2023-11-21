package com.psychology.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SpecializationDTO {
	
	Integer id;
	
	@NotBlank
	@Pattern(regexp = "^[A-Za-zА-Яа-яЁё\s]+$")
	String name;
}

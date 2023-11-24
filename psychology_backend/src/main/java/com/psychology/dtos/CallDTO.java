package com.psychology.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CallDTO {

	@NotBlank
	private String name;

	@NotBlank
	private String phone;
}

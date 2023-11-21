package com.psychology.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PhotoDTO {
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String uri;
	
	@NotNull
	private Long size;
}

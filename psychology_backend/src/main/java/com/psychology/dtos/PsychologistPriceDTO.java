package com.psychology.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class PsychologistPriceDTO {
	
	@NotNull
	private Integer price;
	
	@NotNull
	private SpecializationDTO specialization;
	
}

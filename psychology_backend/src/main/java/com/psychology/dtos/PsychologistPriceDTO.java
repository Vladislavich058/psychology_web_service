package com.psychology.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class PsychologistPriceDTO {
	
	private Integer id;
	
	@NotNull
	private Integer price;
	
	@NotNull
	private SpecializationDTO specialization;
	
	private PsychologistDTO psychologist;
	
}

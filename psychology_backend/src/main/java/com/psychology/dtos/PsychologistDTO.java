package com.psychology.dtos;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PsychologistDTO {
	
	private Integer id;

	@NotBlank
	@Pattern(regexp = "^[A-Za-zА-Яа-яЁё]+$")
	private String name;

	@NotBlank
	@Pattern(regexp = "^[A-Za-zА-Яа-яЁё]+$")
	private String surname;

	private String lastname;

	@NotBlank
	private String description;

	@NotNull
	private OfficeDTO office;
	
	@NotNull
	private ScheduleDTO schedule;

	@NotNull
	private List<PsychologistPriceDTO> psychologistPrices;
}

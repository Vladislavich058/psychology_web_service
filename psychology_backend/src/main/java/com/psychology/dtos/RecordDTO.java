package com.psychology.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RecordDTO {
	
	@NotBlank
	private String name;

	@NotBlank
	private String phone;

	@NotNull
	private LocalDate date;

	@NotNull
	private LocalTime time;
	
	@NotNull
	private LocalTime duration;
	
	@NotNull
	private Integer price;
	
	private PsychologistPriceDTO psychologistPrice;

	private OfficeDTO office;
}

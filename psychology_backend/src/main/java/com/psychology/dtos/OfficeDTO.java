package com.psychology.dtos;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OfficeDTO {
	
	@NotNull
	private Integer id;

	@NotNull
	private Integer number;

	@NotNull
	private Integer priceIndividual;

	@NotNull
	private Integer priceGroup;

	@NotNull
	private Integer priceIndividualLong;

	@NotNull
	private Integer priceGroupLong;

	@NotBlank
	private String description;

	@NotNull
	private Float square;

	@NotNull
	List<PhotoDTO> photos;
}

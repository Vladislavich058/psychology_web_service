package com.psychology.dtos;

import java.time.LocalTime;

import lombok.Data;

@Data
public class ScheduleDTO {
	
	private LocalTime mondayStartTime;

	private LocalTime mondayEndTime;

	private LocalTime tuesdayStartTime;

	private LocalTime tuesdayEndTime;

	private LocalTime wensdayStartTime;

	private LocalTime wensdayEndTime;

	private LocalTime thusdayStartTime;

	private LocalTime thusdayEndTime;

	private LocalTime fridayStartTime;

	private LocalTime fridayEndTime;

	private LocalTime saturdayStartTime;

	private LocalTime saturdayEndTime;
}

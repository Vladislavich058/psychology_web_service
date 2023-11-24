package com.psychology.entities;

import java.io.Serializable;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "schedules")
@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
public class Schedule implements Serializable {

	private static final long serialVersionUID = -4964616019544645557L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
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

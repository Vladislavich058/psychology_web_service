package com.psychology.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "records")
@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
public class Record implements Serializable {

	private static final long serialVersionUID = -8709801665022328912L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false)
	private LocalDate date;
	
	@Column(nullable = false)
	private LocalTime time;
	
	@Column(nullable = false)
	private LocalTime duration;
	
	@Column(nullable = false)
	private Integer price;

	@ManyToOne
	@JoinColumn(name = "psychologistPrice_id")
	private PsychologistPrice psychologistPrice;

	@ManyToOne
	@JoinColumn(name = "office_id")
	private Office office;
}

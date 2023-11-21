package com.psychology.entities;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
@Table(name = "psychologistPrices")
public class PsychologistPrice implements Serializable {

	private static final long serialVersionUID = -4196615084503322017L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private Integer price;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "psychologist_id", nullable = false)
	private Psychologist psychologist;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "specialization_id", nullable = false)
	private Specialization specialization;

}

package com.psychology.entities;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	
	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@Column(nullable = false)
	private Integer price;

	@JsonView(Views.PsychologistPriceView.class)
	@ManyToOne
	@JoinColumn(name = "psychologist_id", nullable = false)
	private Psychologist psychologist;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "specialization_id", nullable = false)
	private Specialization specialization;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "psychologistPrice")
	private List<Record> records;

}

package com.psychology.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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
import jakarta.persistence.OneToOne;
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
@Table(name = "psychologists")
public class Psychologist implements Serializable {

	private static final long serialVersionUID = -2536293872834013795L;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@Column(nullable = false)
	private String name;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@Column(nullable = false)
	private String surname;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	private String lastname;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@Column(nullable = false)
	private String description;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@OneToMany(cascade = CascadeType.ALL)
	private List<Photo> photos;

	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@ManyToOne
	@JoinColumn(name = "office_id")
	private Office office;
	
	@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
	@OneToOne(cascade = CascadeType.ALL)
	private Schedule schedule;

	@JsonView(Views.PsychologistView.class)
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "psychologist")
	private List<PsychologistPrice> psychologistPrices;

	public void addPsychologistPrice(PsychologistPrice psychologistPrice) {
		if (psychologistPrice != null) {
			if (psychologistPrices == null) {
				psychologistPrices = new ArrayList<>();
			}
			psychologistPrices.add(psychologistPrice);
			psychologistPrice.setPsychologist(this);
		}
	}
}

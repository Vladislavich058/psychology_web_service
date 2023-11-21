package com.psychology.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String surname;

	private String lastname;

	@Column(nullable = false)
	private String description;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Photo> photos;

	@ManyToOne
	@JoinColumn(name = "office_id")
	private Office office;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Schedule schedule;

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

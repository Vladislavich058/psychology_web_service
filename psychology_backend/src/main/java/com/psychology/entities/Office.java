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
@Table(name = "offices")
@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
public class Office implements Serializable {
	
	private static final long serialVersionUID = 1086420984132511954L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false)
	private Integer number;
	
	@Column(nullable = false)
	private Integer priceIndividual;
	
	@Column(nullable = false)
	private Integer priceGroup;
	
	@Column(nullable = false)
	private Integer priceIndividualLong;
	
	@Column(nullable = false)
	private Integer priceGroupLong;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private Float square;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Schedule schedule;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Photo> photos;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "office")
	private List<Record> records;
}

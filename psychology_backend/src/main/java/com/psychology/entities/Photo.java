package com.psychology.entities;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

import jakarta.persistence.Column;
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
@Table(name = "photos")
@JsonView({Views.PsychologistPriceView.class, Views.PsychologistView.class})
public class Photo implements Serializable {

	private static final long serialVersionUID = -1749210791429093654L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String uri;
	
	@Column(nullable = false)
	private Long size;
}

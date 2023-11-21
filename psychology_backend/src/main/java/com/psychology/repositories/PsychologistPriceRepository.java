package com.psychology.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entities.PsychologistPrice;

@RepositoryRestResource(exported = false)
public interface PsychologistPriceRepository extends JpaRepository<PsychologistPrice, Integer> {
	void deleteByPsychologistId(Integer id);
}

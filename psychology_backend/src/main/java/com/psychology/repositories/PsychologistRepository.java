package com.psychology.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entities.Psychologist;

@RepositoryRestResource(exported = false)
public interface PsychologistRepository extends JpaRepository<Psychologist, Integer> {
	Optional<Psychologist> findByNameAndSurnameAndLastname(String name, String surname, String lastname);
	Optional<Psychologist> findByNameAndSurnameAndLastnameAndIdNot(String name, String surname, String lastname, Integer id);
}

package com.psychology.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entities.Specialization;

@RepositoryRestResource(exported = false)
public interface SpecializationRepository extends JpaRepository<Specialization, Integer> {
	Optional<Specialization> findByName(String name);
}

package com.psychology.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entities.Call;

@RepositoryRestResource(exported = false)
public interface CallRepository extends JpaRepository<Call, Integer> {

}

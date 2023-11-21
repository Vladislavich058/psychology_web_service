package com.psychology.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.psychology.entities.Office;

public interface OfficeRepository extends JpaRepository<Office, Integer> {

}

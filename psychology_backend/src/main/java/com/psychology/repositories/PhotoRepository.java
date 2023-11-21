package com.psychology.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.psychology.entities.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Integer> {

}

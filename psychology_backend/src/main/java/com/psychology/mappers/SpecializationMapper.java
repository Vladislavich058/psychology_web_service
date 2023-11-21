package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.SpecializationDTO;
import com.psychology.entities.Specialization;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface SpecializationMapper {
	Specialization toSpecialization(SpecializationDTO specializationDTO);
}

package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.PsychologistDTO;
import com.psychology.entities.Psychologist;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD, uses = { SpecializationMapper.class,
		PsychologistPriceMapper.class, OfficeMapper.class, PhotoMapper.class, ScheduleMapper.class })
public interface PsychologistMapper {
	Psychologist toPsychologist(PsychologistDTO psychologistDTO);
}

package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.PsychologistPriceDTO;
import com.psychology.entities.PsychologistPrice;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD, uses = { SpecializationMapper.class })
public interface PsychologistPriceMapper {
	PsychologistPrice toPsychologistPrice(PsychologistPriceDTO psychologistPriceDTO);
}

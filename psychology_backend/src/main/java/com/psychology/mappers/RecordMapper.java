package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.entities.Record;
import com.psychology.dtos.RecordDTO;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD, uses = { PsychologistMapper.class,
		OfficeMapper.class })
public interface RecordMapper {
	Record toRecord(RecordDTO recordDTO);
}

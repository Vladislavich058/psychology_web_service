package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.OfficeDTO;
import com.psychology.entities.Office;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD, uses = { PhotoMapper.class,
		ScheduleMapper.class })
public interface OfficeMapper {
	Office toOffice(OfficeDTO officeDTO);
}

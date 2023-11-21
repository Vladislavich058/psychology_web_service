package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.ScheduleDTO;
import com.psychology.entities.Schedule;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface ScheduleMapper {
	Schedule toSchedule(ScheduleDTO scheduleDTO);
}

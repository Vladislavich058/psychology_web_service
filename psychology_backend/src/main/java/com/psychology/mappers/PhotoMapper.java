package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.PhotoDTO;
import com.psychology.entities.Photo;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface PhotoMapper {
	Photo toPhoto(PhotoDTO photoDTO);
}

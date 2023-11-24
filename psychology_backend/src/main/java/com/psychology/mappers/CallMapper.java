package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.CallDTO;
import com.psychology.entities.Call;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface CallMapper {
	Call toCall(CallDTO callDTO);
}

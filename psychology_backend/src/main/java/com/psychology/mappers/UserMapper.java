package com.psychology.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dtos.UserDTO;
import com.psychology.entities.User;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface UserMapper {
	User toUser(UserDTO userDTO);

	UserDTO toUserDTO(User user);
}

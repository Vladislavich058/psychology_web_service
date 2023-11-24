package com.psychology.services;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.psychology.dtos.AnaliticDTO;
import com.psychology.dtos.PsychologistDTO;
import com.psychology.dtos.SpecializationDTO;
import com.psychology.entities.Call;
import com.psychology.entities.Office;
import com.psychology.entities.Psychologist;
import com.psychology.entities.Record;
import com.psychology.entities.Specialization;
import com.psychology.exceptions.NotFoundException;
import com.psychology.exceptions.PsychologistAlreadyExists;
import com.psychology.exceptions.SpecializationAlreadyExists;

import jakarta.transaction.Transactional;

public interface AdminService {
	Iterable<Psychologist> getPsychologists();

	Iterable<Specialization> getSpecializations();

	Iterable<Office> getOffices();
	
	Iterable<Record> getRecords();
	
	Iterable<Call> getCalls();

	Integer deleteSpecialization(Integer id) throws NotFoundException;

	Specialization addSpecialization(SpecializationDTO specializationDTO) throws SpecializationAlreadyExists;

	@Transactional
	Psychologist addPsychologist(PsychologistDTO psychologistDTO, MultipartFile[] files) throws PsychologistAlreadyExists, IOException, NotFoundException;
	
	@Transactional
	Psychologist editPsychologist(PsychologistDTO psychologistDTO, MultipartFile[] files) throws PsychologistAlreadyExists, IOException, NotFoundException;
	
	Integer deletePsychologist(Integer id);
	
	Integer deleteRecord(Integer id);
	
	Integer callBack(Integer id) throws NotFoundException;
	
	Psychologist getPsychologistById(Integer id) throws NotFoundException;
	
	List<AnaliticDTO> getAnalitic(LocalDate date);
}

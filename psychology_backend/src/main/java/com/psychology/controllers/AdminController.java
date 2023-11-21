package com.psychology.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.psychology.dtos.PsychologistDTO;
import com.psychology.dtos.SpecializationDTO;
import com.psychology.entities.Office;
import com.psychology.entities.Psychologist;
import com.psychology.entities.Specialization;
import com.psychology.exceptions.NotFoundException;
import com.psychology.exceptions.PsychologistAlreadyExists;
import com.psychology.exceptions.SpecializationAlreadyExists;
import com.psychology.services.AdminService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	AdminService adminService;

	@GetMapping("/psychologists")
	public Iterable<Psychologist> getPsychologists() {
		return adminService.getPsychologists();
	}

	@GetMapping("/specializations")
	public Iterable<Specialization> getSpecializations() {
		return adminService.getSpecializations();
	}

	@GetMapping("/offices")
	public Iterable<Office> getOffices() {
		return adminService.getOffices();
	}

	@DeleteMapping("/specialization/{id}")
	public Integer deleteSpecialization(@PathVariable Integer id) throws NotFoundException {
		return adminService.deleteSpecialization(id);
	}

	@PostMapping("/addSpecialization")
	public Specialization addSpecialization(@Valid @RequestBody SpecializationDTO specializationDTO)
			throws SpecializationAlreadyExists {
		return adminService.addSpecialization(specializationDTO);
	}

	@PostMapping("/addPsychologist")
	public Psychologist addPsychologist(@Valid @RequestPart("psychologist") PsychologistDTO psychologistDTO,
			@RequestPart("photos") MultipartFile[] photos)
			throws PsychologistAlreadyExists, NotFoundException, IOException {
		return adminService.addPsychologist(psychologistDTO, photos);
	}

	@DeleteMapping("/psychologist/{id}")
	public Integer deletePsychologist(@PathVariable Integer id) throws NotFoundException {
		return adminService.deletePsychologist(id);
	}
	
	@GetMapping("/psychologist/{id}")
	public Psychologist getPsychologistById(@PathVariable Integer id) throws NotFoundException {
		return adminService.getPsychologistById(id);
	}
	
	@PatchMapping("/editPsychologist")
	public Psychologist editPsychologist(@Valid @RequestPart("psychologist") PsychologistDTO psychologistDTO,
			@RequestPart("photos") MultipartFile[] photos)
			throws PsychologistAlreadyExists, NotFoundException, IOException {
		return adminService.editPsychologist(psychologistDTO, photos);
	}
}

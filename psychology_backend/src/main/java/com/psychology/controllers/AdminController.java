package com.psychology.controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;
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
import com.psychology.services.AdminService;
import com.psychology.views.Views;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	AdminService adminService;

	@JsonView(Views.PsychologistView.class)
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
	
	@GetMapping("/calls")
	public Iterable<Call> getCalls() {
		return adminService.getCalls();
	}
	
	@JsonView(Views.PsychologistPriceView.class)
	@GetMapping("/records")
	public Iterable<Record> getRecords() {
		return adminService.getRecords();
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

	@JsonView(Views.PsychologistView.class)
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
	
	@DeleteMapping("/record/{id}")
	public Integer deleteRecord(@PathVariable Integer id) throws NotFoundException {
		return adminService.deleteRecord(id);
	}
	
	@GetMapping("/callBack/{id}")
	public Integer callBack(@PathVariable Integer id) throws NotFoundException {
		return adminService.callBack(id);
	}
	
	@JsonView(Views.PsychologistView.class)
	@GetMapping("/psychologist/{id}")
	public Psychologist getPsychologistById(@PathVariable Integer id) throws NotFoundException {
		return adminService.getPsychologistById(id);
	}
	
	@JsonView(Views.PsychologistView.class)
	@PatchMapping("/editPsychologist")
	public Psychologist editPsychologist(@Valid @RequestPart("psychologist") PsychologistDTO psychologistDTO,
			@RequestPart("photos") MultipartFile[] photos)
			throws PsychologistAlreadyExists, NotFoundException, IOException {
		return adminService.editPsychologist(psychologistDTO, photos);
	}
	
	@GetMapping("/analitic")
	public List<AnaliticDTO> getAnalitic(@RequestParam LocalDate date) {
		return adminService.getAnalitic(date);
	}
}

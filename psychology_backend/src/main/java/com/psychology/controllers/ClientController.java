package com.psychology.controllers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.dtos.CallDTO;
import com.psychology.dtos.RecordDTO;
import com.psychology.entities.Call;
import com.psychology.entities.Office;
import com.psychology.entities.Psychologist;
import com.psychology.entities.Record;
import com.psychology.exceptions.IncorrectDateTime;
import com.psychology.exceptions.NoAvailableOffice;
import com.psychology.exceptions.NotFoundException;
import com.psychology.services.ClientService;
import com.psychology.views.Views;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ClientController {

	@Autowired
	ClientService clientService;

	@JsonView(Views.PsychologistView.class)
	@GetMapping("/psychologists")
	public Iterable<Psychologist> getPsychologists() {
		return clientService.getPsychologists();
	}

	@GetMapping("/offices")
	public Iterable<Office> getOffices() {
		return clientService.getOffices();
	}

	@GetMapping("/times/{id}")
	public List<LocalTime> getFreeTimes(@RequestParam LocalDate date, @PathVariable Integer id)
			throws NotFoundException {
		return clientService.getFreePsychologistTime(id, date);
	}

	@GetMapping("/freeOffices")
	public List<Office> getFreeOffices(@RequestParam LocalDate date, @RequestParam LocalTime time,
			@RequestParam LocalTime duration) throws IncorrectDateTime {
		return clientService.getFreeOffices(date, time, duration);
	}

	@JsonView(Views.PsychologistPriceView.class)
	@PostMapping("/addRecord")
	public Record addRecord(@Valid @RequestBody RecordDTO recordDTO)
			throws NoAvailableOffice, IncorrectDateTime, NotFoundException {
		return clientService.addRecord(recordDTO);
	}

	@PostMapping("/addCall")
	public Call addCall(@Valid @RequestBody CallDTO callDTO) {
		return clientService.addCall(callDTO);
	}
}

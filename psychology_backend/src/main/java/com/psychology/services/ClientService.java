package com.psychology.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.psychology.dtos.CallDTO;
import com.psychology.dtos.RecordDTO;
import com.psychology.entities.Call;
import com.psychology.entities.Office;
import com.psychology.entities.Psychologist;
import com.psychology.entities.Record;
import com.psychology.exceptions.IncorrectDateTime;
import com.psychology.exceptions.NoAvailableOffice;
import com.psychology.exceptions.NotFoundException;

public interface ClientService {
	Iterable<Psychologist> getPsychologists();

	Iterable<Office> getOffices();
	
	List<LocalTime> getFreePsychologistTime(Integer psychologistId, LocalDate date) throws NotFoundException;
	
	List<Office> getFreeOffices(LocalDate date, LocalTime time, LocalTime duration) throws IncorrectDateTime;
	
	Record addRecord(RecordDTO recordDTO) throws NoAvailableOffice, IncorrectDateTime, NotFoundException;
	
	Call addCall(CallDTO callDTO);
}

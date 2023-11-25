package com.psychology.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.psychology.dtos.CallDTO;
import com.psychology.dtos.RecordDTO;
import com.psychology.entities.Call;
import com.psychology.entities.Office;
import com.psychology.entities.Psychologist;
import com.psychology.entities.PsychologistPrice;
import com.psychology.entities.Record;
import com.psychology.exceptions.IncorrectDateTime;
import com.psychology.exceptions.NoAvailableOffice;
import com.psychology.exceptions.NotFoundException;
import com.psychology.mappers.CallMapper;
import com.psychology.mappers.OfficeMapper;
import com.psychology.mappers.RecordMapper;
import com.psychology.repositories.CallRepository;
import com.psychology.repositories.OfficeRepository;
import com.psychology.repositories.PsychologistPriceRepository;
import com.psychology.repositories.PsychologistRepository;
import com.psychology.repositories.RecordRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ClientServiceImpl implements ClientService {

	@Autowired
	PsychologistRepository psychologistRepository;

	@Autowired
	OfficeRepository officeRepository;

	@Autowired
	RecordRepository recordRepository;

	@Autowired
	RecordMapper recordMapper;

	@Autowired
	OfficeMapper officeMapper;

	@Autowired
	PsychologistPriceRepository psychologistPriceRepository;

	@Autowired
	CallRepository callRepository;

	@Autowired
	CallMapper callMapper;

	@Override
	public Iterable<Psychologist> getPsychologists() {
		return psychologistRepository.findAll();
	}

	@Override
	public Iterable<Office> getOffices() {
		return officeRepository.findAll();
	}

	@Override
	public List<LocalTime> getFreePsychologistTime(Integer psychologistId, LocalDate date) throws NotFoundException {
		Psychologist psychologist = psychologistRepository.findById(psychologistId)
				.orElseThrow(() -> new NotFoundException("Psychologist with id " + psychologistId + " not found!"));
		List<Record> busyRecords = recordRepository.findByDateAndPsychologistPricePsychologistId(date, psychologistId);
		List<LocalTime> workTimes = getPsychologistWorkTime(psychologist, date);
		for (int k = 0; k < workTimes.size(); k++) {
			for (int i = 0; i < workTimes.size() - 1; i++) {
				for (int j = 0; j < busyRecords.size(); j++) {
					if (busyRecords.get(j).getTime().equals(workTimes.get(i))
							|| (busyRecords.get(j).getTime().isAfter(workTimes.get(i))
									&& busyRecords.get(j).getTime().isBefore(workTimes.get(i + 1)))
							|| (workTimes.get(i).isAfter(busyRecords.get(j).getTime()) && workTimes.get(i)
									.isBefore(busyRecords.get(j).getTime()
											.plusHours(busyRecords.get(j).getDuration().getHour())
											.plusMinutes(busyRecords.get(j).getDuration().getMinute())))) {
						workTimes.remove(i);
						break;
					}
				}
			}
		}
		if (date.equals(LocalDate.now())) {
			return workTimes.stream().filter(time -> time.isAfter(LocalTime.now())).collect(Collectors.toList());
		}
		return workTimes;
	}

	private List<LocalTime> getPsychologistWorkTime(Psychologist psychologist, LocalDate date) {
		LocalTime startTime;
		LocalTime endTime;
		switch (date.getDayOfWeek().getValue()) {
		case 1: {
			startTime = psychologist.getSchedule().getMondayStartTime();
			endTime = psychologist.getSchedule().getMondayEndTime();
			break;
		}
		case 2: {
			startTime = psychologist.getSchedule().getThusdayStartTime();
			endTime = psychologist.getSchedule().getThusdayEndTime();
			break;
		}
		case 3: {
			startTime = psychologist.getSchedule().getWensdayStartTime();
			endTime = psychologist.getSchedule().getWensdayEndTime();
			break;
		}
		case 4: {
			startTime = psychologist.getSchedule().getThusdayStartTime();
			endTime = psychologist.getSchedule().getThusdayEndTime();
			break;
		}
		case 5: {
			startTime = psychologist.getSchedule().getFridayStartTime();
			endTime = psychologist.getSchedule().getFridayEndTime();
			break;
		}
		case 6: {
			startTime = psychologist.getSchedule().getSaturdayStartTime();
			endTime = psychologist.getSchedule().getSaturdayEndTime();
			break;
		}
		default:
			throw new IllegalArgumentException("По воскресеньям не работаем!");
		}
		List<LocalTime> workTimes = new ArrayList<>();
		if (startTime == null) {
			return workTimes;
		}
		while (startTime.isBefore(endTime.minusHours(1))) {
			workTimes.add(startTime);
			startTime = startTime.plusHours(1);
		}
		return workTimes;
	}

	@Override
	public List<Office> getFreeOffices(LocalDate date, LocalTime time, LocalTime duration) throws IncorrectDateTime {
		validateDateTime(date, time, duration);
		List<Record> busyRecords = recordRepository.findByDate(date).stream().filter(r -> r.getTime().equals(time)
				|| (r.getTime().isAfter(time)
						&& r.getTime().isBefore(time.plusHours(duration.getHour()).plusMinutes(duration.getMinute())))
				|| (time.isAfter(r.getTime()) && time.isBefore(
						r.getTime().plusHours(r.getDuration().getHour()).plusMinutes(r.getDuration().getMinute()))))
				.collect(Collectors.toList());
		List<Office> offices = officeRepository.findAll().stream()
				.filter(o -> busyRecords.stream().map(r -> r.getOffice().getId()).noneMatch(id -> id.equals(o.getId())))
				.collect(Collectors.toList());
		return offices;
	}

	@Override
	public Record addRecord(RecordDTO recordDTO) throws NoAvailableOffice, IncorrectDateTime, NotFoundException {
		validateDateTime(recordDTO.getDate(), recordDTO.getTime());
		Record newRecord = recordMapper.toRecord(recordDTO);
		if (newRecord.getOffice() == null) {
			List<Office> offices = getFreeOffices(recordDTO.getDate(), recordDTO.getTime(), recordDTO.getDuration());
			if (offices.isEmpty()) {
				throw new NoAvailableOffice("На данную дату и время нет свободных офисов!");
			}
			PsychologistPrice psychologistPrice = psychologistPriceRepository
					.findById(recordDTO.getPsychologistPrice().getId()).orElseThrow(() -> new NotFoundException(
							"PsychologistPrice with id " + recordDTO.getPsychologistPrice().getId() + " not found!"));
			Office psychologistOffice = psychologistPrice.getPsychologist().getOffice();
			newRecord.setPsychologistPrice(psychologistPrice);
			if (offices.contains(psychologistOffice)) {
				newRecord.setOffice(psychologistOffice);
			} else {
				newRecord.setOffice(offices.get(0));
			}
		}
		return recordRepository.save(newRecord);
	}

	private void validateDateTime(LocalDate date, LocalTime time, LocalTime duration) throws IncorrectDateTime {
		if (date.isBefore(LocalDate.now()))
			throw new IncorrectDateTime("Дата не может быть раньше сегодняшней!");
		if (date.equals(LocalDate.now()) && time.isBefore(LocalTime.now()))
			throw new IncorrectDateTime("Время не может быть раньше текущего!");
		if (duration != null && LocalDateTime.of(date, time).plusHours(duration.getHour())
				.plusMinutes(duration.getMinute()).isAfter(LocalDateTime.of(date, LocalTime.of(21, 0))))
			throw new IncorrectDateTime("Офис работает до 21:00!");
	}

	private void validateDateTime(LocalDate date, LocalTime time) throws IncorrectDateTime {
		validateDateTime(date, time, null);
	}

	@Override
	public Call addCall(CallDTO callDTO) {
		Call newCall = callMapper.toCall(callDTO);
		newCall.setIsCallBack(false);
		log.info(newCall.toString());
		return callRepository.save(newCall);
	}

}

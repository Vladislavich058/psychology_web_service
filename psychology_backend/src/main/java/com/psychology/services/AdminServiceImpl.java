package com.psychology.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.psychology.dtos.PsychologistDTO;
import com.psychology.dtos.SpecializationDTO;
import com.psychology.entities.Office;
import com.psychology.entities.Photo;
import com.psychology.entities.Psychologist;
import com.psychology.entities.PsychologistPrice;
import com.psychology.entities.Specialization;
import com.psychology.exceptions.NotFoundException;
import com.psychology.exceptions.PsychologistAlreadyExists;
import com.psychology.exceptions.SpecializationAlreadyExists;
import com.psychology.mappers.PsychologistMapper;
import com.psychology.repositories.OfficeRepository;
import com.psychology.repositories.PsychologistPriceRepository;
import com.psychology.repositories.PsychologistRepository;
import com.psychology.repositories.SpecializationRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	PsychologistRepository psychologistRepository;

	@Autowired
	SpecializationRepository specializationRepository;

	@Autowired
	OfficeRepository officeRepository;

	@Autowired
	PhotoService photoService;

	@Autowired
	PsychologistMapper psychologistMapper;

	@Autowired
	PsychologistPriceRepository priceRepository;

	@Override
	public Iterable<Psychologist> getPsychologists() {
		return psychologistRepository.findAll();
	}

	@Override
	public Iterable<Specialization> getSpecializations() {
		return specializationRepository.findAll();
	}

	@Override
	public Integer deleteSpecialization(Integer id) throws NotFoundException {
		specializationRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Specialization with id " + id + " not found!"));
		specializationRepository.deleteById(id);
		return id;
	}

	@Override
	public Specialization addSpecialization(SpecializationDTO specializationDTO) throws SpecializationAlreadyExists {
		if (specializationRepository.findByName(specializationDTO.getName().toLowerCase()).isPresent()) {
			throw new SpecializationAlreadyExists(
					"Specialization with name " + specializationDTO.getName() + " already exists!");
		}
		return specializationRepository
				.save(Specialization.builder().name(specializationDTO.getName().toLowerCase()).build());
	}

	@Override
	public Iterable<Office> getOffices() {
		return officeRepository.findAll();
	}

	@Override
	public Psychologist addPsychologist(PsychologistDTO psychologistDTO, MultipartFile[] files)
			throws PsychologistAlreadyExists, IOException {
		if (psychologistRepository.findByNameAndSurnameAndLastname(psychologistDTO.getName(),
				psychologistDTO.getSurname(), psychologistDTO.getLastname()).isPresent()) {
			throw new PsychologistAlreadyExists("Psychologist " + psychologistDTO.getSurname() + " "
					+ psychologistDTO.getName() + " " + psychologistDTO.getLastname() + " already exists");
		}
		List<Photo> photosList = new ArrayList<>();
		for (MultipartFile file : files) {
			photosList.add(photoService.uploadFile(file));
		}
		Psychologist newPsychologist = psychologistMapper.toPsychologist(psychologistDTO);
		newPsychologist.setPhotos(photosList);
		List<PsychologistPrice> psychologistPrices = newPsychologist.getPsychologistPrices();
		newPsychologist.setPsychologistPrices(null);
		for (int i = 0; i < psychologistPrices.size(); i++) {
			newPsychologist.addPsychologistPrice(psychologistPrices.get(i));
		}
		return psychologistRepository.save(newPsychologist);
	}

	@Override
	public Integer deletePsychologist(Integer id) {
		if (psychologistRepository.findById(id).isEmpty()) {
			new NotFoundException("Psychologist with id " + id + " not found!");
		}
		psychologistRepository.deleteById(id);
		return id;
	}

	@Transactional
	@Override
	public Psychologist getPsychologistById(Integer id) throws NotFoundException {
		return psychologistRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Psychologist with id " + id + " not found!"));
	}

	@Transactional
	@Override
	public Psychologist editPsychologist(PsychologistDTO psychologistDTO, MultipartFile[] files)
			throws PsychologistAlreadyExists, IOException, NotFoundException {
		if (psychologistRepository.findByNameAndSurnameAndLastnameAndIdNot(psychologistDTO.getName(),
				psychologistDTO.getSurname(), psychologistDTO.getLastname(), psychologistDTO.getId()).isPresent()) {
			throw new PsychologistAlreadyExists("Psychologist " + psychologistDTO.getSurname() + " "
					+ psychologistDTO.getName() + " " + psychologistDTO.getLastname() + " already exists");
		}
		List<Photo> photosList = new ArrayList<>();
		for (MultipartFile file : files) {
			photosList.add(photoService.uploadFile(file));
		}
		Psychologist editPsychologist = psychologistMapper.toPsychologist(psychologistDTO);
		editPsychologist.setPhotos(photosList);
		List<PsychologistPrice> psychologistPrices = editPsychologist.getPsychologistPrices();
		editPsychologist.setPsychologistPrices(null);
		priceRepository.deleteByPsychologistId(psychologistDTO.getId());
		for (int i = 0; i < psychologistPrices.size(); i++) {
			editPsychologist.addPsychologistPrice(psychologistPrices.get(i));
		}
		return psychologistRepository.save(editPsychologist);
	}

}

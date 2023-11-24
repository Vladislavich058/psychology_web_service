package com.psychology.web;

import java.time.LocalTime;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.psychology.entities.Office;
import com.psychology.entities.Photo;
import com.psychology.entities.Psychologist;
import com.psychology.entities.PsychologistPrice;
import com.psychology.entities.Schedule;
import com.psychology.entities.Specialization;
import com.psychology.entities.User;
import com.psychology.exceptions.NotFoundException;
import com.psychology.mappers.PsychologistPriceMapper;
import com.psychology.repositories.OfficeRepository;
import com.psychology.repositories.PsychologistPriceRepository;
import com.psychology.repositories.PsychologistRepository;
import com.psychology.repositories.SpecializationRepository;
import com.psychology.repositories.UserRepository;
import com.psychology.services.ClientService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class WebConfig implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	OfficeRepository officeRepository;

	@Autowired
	SpecializationRepository specializationRepository;

	@Autowired
	PsychologistRepository psychologistRepository;

	@Autowired
	PsychologistPriceRepository psychologistPriceRepository;

	@Autowired
	ClientService clientService;

	@Autowired
	PsychologistPriceMapper psychologistPriceMapper;

	@Override
	public void run(String... args) throws Exception {
		if (userRepository.findAll().isEmpty()) {
			userRepository.save(
					User.builder().email("anna@mail.ru").password(encoder.encode(("admin"))).role("admin").build());
		}

		if (officeRepository.findAll().isEmpty()) {
			officeRepository.saveAll(Arrays.asList(
					Office.builder().number(1).priceIndividual(4500).priceIndividualLong(5500).priceGroup(8000)
							.priceGroupLong(10000).description("Уютный офис для занятий").square(45.4f)
							.photos(Arrays.asList(
									Photo.builder().size(10L).name("office1")
											.uri("http://localhost:8080/images/office1.jpeg").build(),
									Photo.builder().size(10L).name("office2")
											.uri("http://localhost:8080/images/office2.jpeg").build()))
							.schedule(Schedule.builder().mondayStartTime(LocalTime.of(9, 0))
									.mondayEndTime(LocalTime.of(21, 0)).tuesdayStartTime(LocalTime.of(9, 0))
									.tuesdayEndTime(LocalTime.of(21, 0)).wensdayStartTime(LocalTime.of(9, 0))
									.wensdayEndTime(LocalTime.of(21, 0)).thusdayStartTime(LocalTime.of(9, 0))
									.thusdayEndTime(LocalTime.of(21, 0)).fridayStartTime(LocalTime.of(9, 0))
									.fridayEndTime(LocalTime.of(21, 0)).saturdayStartTime(LocalTime.of(9, 0))
									.saturdayEndTime(LocalTime.of(21, 0)).build())
							.build(),
					Office.builder().number(2).priceIndividual(4500).priceIndividualLong(5500).priceGroup(8000)
							.priceGroupLong(10000).description("Уютный офис для занятий").square(45.4f)
							.photos(Arrays.asList(
									Photo.builder().name("office3").size(10L)
											.uri("http://localhost:8080/images/office3.jpeg").build(),
									Photo.builder().name("office4").size(10L)
											.uri("http://localhost:8080/images/office4.jpeg").build(),
									Photo.builder().name("office5").size(10L)
											.uri("http://localhost:8080/images/office5.jpeg").build()))
							.schedule(Schedule.builder().mondayStartTime(LocalTime.of(9, 0))
									.mondayEndTime(LocalTime.of(21, 0)).tuesdayStartTime(LocalTime.of(9, 0))
									.tuesdayEndTime(LocalTime.of(21, 0)).wensdayStartTime(LocalTime.of(9, 0))
									.wensdayEndTime(LocalTime.of(21, 0)).thusdayStartTime(LocalTime.of(9, 0))
									.thusdayEndTime(LocalTime.of(21, 0)).fridayStartTime(LocalTime.of(9, 0))
									.fridayEndTime(LocalTime.of(21, 0)).saturdayStartTime(LocalTime.of(9, 0))
									.saturdayEndTime(LocalTime.of(21, 0)).build())
							.build()));
		}

		if (specializationRepository.findAll().isEmpty()) {
			specializationRepository.saveAll(Arrays.asList(Specialization.builder().name("семейный психолог").build(),
					Specialization.builder().name("детский психолог").build(),
					Specialization.builder().name("групповой психолог").build(),
					Specialization.builder().name("индивидуальный психолог").build()));
		}

//		if (psychologistRepository.findAll().isEmpty()) {
//			psychologistRepository
//					.saveAll(Arrays.asList(
//							Psychologist.builder().name("Анна").surname("Круглей").lastname("Александровна")
//									.description("Крутой психолог со стажем 100 лет")
//									.office(officeRepository.findById(1)
//											.orElseThrow(() -> new NotFoundException("Office with id 1 not found!")))
//									.photos(Arrays.asList(Photo.builder().name("ann1")
//											.uri("http://localhost:8080/images/ann1.jpeg").size(10L).build()))
//									.psychologistPrices(Arrays.asList(
//											PsychologistPrice
//													.builder().price(1200)
//													.specialization(specializationRepository
//															.findById(1)
//															.orElseThrow(() -> new NotFoundException(
//																	"Specialization with id 1 not found!")))
//													.build(),
//											PsychologistPrice.builder().price(2200)
//													.specialization(specializationRepository.findById(2)
//															.orElseThrow(() -> new NotFoundException(
//																	"Specialization with id 2 not found!")))
//													.build()))
//									.build(),
//							Psychologist.builder().name("Елизавета").surname("Маршева").lastname("Александровна")
//									.description("Крутой психолог со стажем 200 лет")
//									.office(officeRepository.findById(2)
//											.orElseThrow(() -> new NotFoundException("Office with id 2 not found!")))
//									.photos(Arrays.asList(Photo.builder().name("liz1")
//											.uri("http://localhost:8080/images/liz1.jpeg").size(10L).build()))
//									.psychologistPrices(Arrays.asList(
//											PsychologistPrice.builder().price(2300)
//													.specialization(specializationRepository.findById(3)
//															.orElseThrow(() -> new NotFoundException(
//																	"Specialization with id 1 not found!")))
//													.build(),
//											PsychologistPrice.builder().price(3200)
//													.specialization(specializationRepository.findById(4)
//															.orElseThrow(() -> new NotFoundException(
//																	"Specialization with id 2 not found!")))
//													.build()))
//									.build()));
//		}

		if (psychologistRepository.findAll().isEmpty()) {
			psychologistRepository.saveAll(Arrays.asList(
					Psychologist.builder().name("Анна").surname("Круглей").lastname("Александровна")
							.description("Крутой психолог со стажем 100 лет")
							.office(officeRepository.findById(1)
									.orElseThrow(() -> new NotFoundException("Office with id 1 not found!")))
							.photos(Arrays.asList(Photo.builder().name("ann1")
									.uri("http://localhost:8080/images/ann1.jpeg").size(10L).build()))
							.schedule(Schedule.builder().mondayStartTime(LocalTime.of(8, 30))
									.mondayEndTime(LocalTime.of(16, 30)).tuesdayStartTime(LocalTime.of(9, 30))
									.tuesdayEndTime(LocalTime.of(15, 30)).wensdayStartTime(LocalTime.of(13, 00))
									.wensdayEndTime(LocalTime.of(20, 30)).thusdayStartTime(LocalTime.of(9, 30))
									.thusdayEndTime(LocalTime.of(17, 30)).fridayStartTime(LocalTime.of(11, 30))
									.fridayEndTime(LocalTime.of(17, 30)).saturdayStartTime(LocalTime.of(10, 30))
									.saturdayEndTime(LocalTime.of(17, 30)).build())
							.build(),
					Psychologist.builder().name("Елизавета").surname("Маршева").lastname("Александровна")
							.description("Крутой психолог со стажем 200 лет")
							.office(officeRepository.findById(2)
									.orElseThrow(() -> new NotFoundException("Office with id 2 not found!")))
							.photos(Arrays.asList(Photo.builder().name("liz1")
									.uri("http://localhost:8080/images/liz1.jpeg").size(10L).build()))
							.schedule(Schedule.builder().mondayStartTime(LocalTime.of(10, 30))
									.mondayEndTime(LocalTime.of(15, 30)).tuesdayStartTime(LocalTime.of(10, 30))
									.tuesdayEndTime(LocalTime.of(15, 30)).wensdayStartTime(LocalTime.of(10, 30))
									.wensdayEndTime(LocalTime.of(16, 30)).thusdayStartTime(LocalTime.of(10, 30))
									.thusdayEndTime(LocalTime.of(17, 30)).fridayStartTime(LocalTime.of(10, 30))
									.fridayEndTime(LocalTime.of(15, 30)).saturdayStartTime(LocalTime.of(10, 30))
									.saturdayEndTime(LocalTime.of(17, 30)).build())
							.build()));
			if (psychologistPriceRepository.findAll().isEmpty()) {
				psychologistPriceRepository
						.saveAll(
								Arrays.asList(
										PsychologistPrice.builder().price(1200)
												.psychologist(psychologistRepository.findById(1)
														.orElseThrow(() -> new NotFoundException(
																"Psychologist with id 1 not found!")))
												.specialization(specializationRepository.findById(1)
														.orElseThrow(() -> new NotFoundException(
																"Specialization with id 1 not found!")))
												.build(),
										PsychologistPrice.builder().price(2200)
												.psychologist(psychologistRepository.findById(1)
														.orElseThrow(() -> new NotFoundException(
																"Psychologist with id 1 not found!")))
												.specialization(specializationRepository.findById(2)
														.orElseThrow(() -> new NotFoundException(
																"Specialization with id 2 not found!")))
												.build(),
										PsychologistPrice.builder().price(2400)
												.psychologist(psychologistRepository.findById(2)
														.orElseThrow(() -> new NotFoundException(
																"Psychologist with id 2 not found!")))
												.specialization(specializationRepository.findById(3)
														.orElseThrow(() -> new NotFoundException(
																"Specialization with id 3 not found!")))
												.build(),
										PsychologistPrice.builder().price(2500)
												.psychologist(psychologistRepository.findById(2)
														.orElseThrow(() -> new NotFoundException(
																"Psychologist with id 2 not found!")))
												.specialization(
														specializationRepository.findById(4)
																.orElseThrow(() -> new NotFoundException(
																		"Specialization with id 4 not found!")))
												.build()));
			}
		}
	}

}

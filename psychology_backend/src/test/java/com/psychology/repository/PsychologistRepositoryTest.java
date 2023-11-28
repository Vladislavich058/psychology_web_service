package com.psychology.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.psychology.entities.Psychologist;
import com.psychology.repositories.PsychologistRepository;

@DataJpaTest
public class PsychologistRepositoryTest {

	@Autowired
	PsychologistRepository psychologistRepository;

	@Test
	void savePsychologistTest() {
		psychologistRepository.save(Psychologist.builder().name("TestPsychologistName")
				.surname("TestPsychologistSurname").lastname("TestPsychologistLastname").description("description")
				.office(null).photos(null).psychologistPrices(null).build());
		assertThat(psychologistRepository.findByNameAndSurnameAndLastname("TestPsychologistName",
				"TestPsychologistSurname", "TestPsychologistLastname").isPresent()).isTrue();
	}

	@Test
	void deletePsychologistTest() {
		psychologistRepository.deleteById(1);
		assertThat(psychologistRepository.findByNameAndSurnameAndLastname("TestPsychologistName",
				"TestPsychologistSurname", "TestPsychologistLastname").isEmpty()).isTrue();
	}

}

package com.psychology.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.psychology.entities.Office;
import com.psychology.repositories.OfficeRepository;

@DataJpaTest
public class OfficeRepositoryTest {

	@Autowired
	OfficeRepository officeRepository;

	@Test
	void saveOfficeTest() {
		officeRepository.save(Office.builder().description("descri[tion").number(1).photos(null).priceGroup(1200)
				.priceGroupLong(2500).square(14.5f).priceIndividual(1000).priceIndividualLong(2000).build());
		assertThat(officeRepository.findById(1).isPresent()).isTrue();
	}

	@Test
	void deleteOfficeTest() {
		officeRepository.deleteById(1);
		assertThat(officeRepository.findById(1).isPresent()).isFalse();
	}
}

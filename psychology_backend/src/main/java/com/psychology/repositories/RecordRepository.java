package com.psychology.repositories;

import java.time.LocalDate;
import java.util.List;

import com.psychology.dtos.AnaliticDTO;
import com.psychology.entities.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface RecordRepository extends JpaRepository<Record, Integer> {
	List<Record> findByDateAndPsychologistPricePsychologistId(LocalDate date, Integer id);

	List<Record> findByDate(LocalDate date);
	
	@Query(value = "SELECT count(*) as records, psychologists.name, psychologists.surname, psychologists.lastname\n"
			+ "	FROM public.records\n"
			+ "	inner join psychologist_prices on psychologist_prices.id=records.psychologist_price_id\n"
			+ "	inner join psychologists on psychologists.id=psychologist_prices.psychologist_id\n"
			+ "	where date = ?1\n"
			+ "	group by psychologists.id", nativeQuery = true)
	List<AnaliticDTO> getAnalitic(LocalDate date);
}

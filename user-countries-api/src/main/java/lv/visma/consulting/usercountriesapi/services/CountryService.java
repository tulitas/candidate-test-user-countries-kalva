package lv.visma.consulting.usercountriesapi.services;

import lv.visma.consulting.usercountriesapi.controllers.dto.CountryDto;
import lv.visma.consulting.usercountriesapi.db.entities.CountryEntity;
import lv.visma.consulting.usercountriesapi.db.repositories.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<CountryDto> getAllCountries() {
        return countryRepository.findAll()
                .stream()
                .map(country -> {
                    CountryDto dto = new CountryDto(country.getId(), country.getName(), country.getCode(), List.of());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

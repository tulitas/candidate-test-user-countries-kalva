package lv.visma.consulting.usercountriesapi.converters;

import lombok.experimental.UtilityClass;
import lv.visma.consulting.usercountriesapi.controllers.dto.CountryDto;
import lv.visma.consulting.usercountriesapi.db.entities.CountryEntity;
import lv.visma.consulting.usercountriesapi.web.client.dto.WebClientCountryDto;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class CountryConverter {

    public static CountryDto toDto(CountryEntity countryEntity) {
        if (countryEntity == null) {
            return null;
        }
        return CountryDto.builder()
                .name(countryEntity.getName())
                .code(countryEntity.getCode())
                .build();
    }

    public static CountryDto toDto(WebClientCountryDto webClientCountryDto) {
        if (webClientCountryDto == null) {
            return null;
        }
        return CountryDto.builder()
                .name(webClientCountryDto.getName().getOfficial())
                .code(webClientCountryDto.getCode())
                .capitals(webClientCountryDto.getCapitals())
                .build();
    }

    public static List<CountryDto> entityToDTOList(Collection<CountryEntity> countryEntities) {
        return countryEntities.stream()
                .map(CountryConverter::toDto)
                .collect(Collectors.toList());
    }

    public static List<CountryDto> webClientDtoToDTOList(Collection<WebClientCountryDto> webClientCountryDtos) {
        return webClientCountryDtos.stream()
                .map(CountryConverter::toDto)
                .collect(Collectors.toList());
    }
}

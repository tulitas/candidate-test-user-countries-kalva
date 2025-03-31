package lv.visma.consulting.usercountriesapi.controllers;

import lombok.RequiredArgsConstructor;
import lv.visma.consulting.usercountriesapi.controllers.dto.CountryDto;
import lv.visma.consulting.usercountriesapi.services.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/country")
public class CountryController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<List<CountryDto>> getAllCountries() {
        List<CountryDto> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }
}

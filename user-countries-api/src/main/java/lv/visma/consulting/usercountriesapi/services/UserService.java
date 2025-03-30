package lv.visma.consulting.usercountriesapi.services;

import lv.visma.consulting.usercountriesapi.controllers.dto.CountryDto;
import lv.visma.consulting.usercountriesapi.controllers.dto.UserDto;
import lv.visma.consulting.usercountriesapi.converters.CountryConverter;
import lv.visma.consulting.usercountriesapi.converters.UserConverter;
import lv.visma.consulting.usercountriesapi.db.entities.UserEntity;
import lv.visma.consulting.usercountriesapi.db.repositories.UserRepository;
import lv.visma.consulting.usercountriesapi.utilities.errors.UserNotFoundException;
import lv.visma.consulting.usercountriesapi.web.client.dto.WebClientCountryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final WebClient webClient;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public UserService(UserRepository userRepository, WebClient.Builder webClientBuilder) {
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.baseUrl("https://restcountries.com").build();
    }
    public List<UserDto> getAllUsers() {
        var entityUsers = userRepository.findAll();
        return UserConverter.toDTOList(entityUsers);
    }

    public List<CountryDto> getFavoriteCountries(Long userId) {
        var userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        var favoriteCountries = userEntity.getFavoriteCountries();

        return favoriteCountries.stream()
                .map(countryEntity -> {
                    var countryDetails = webClient.get()
                            .uri("/v3.1/alpha/" + countryEntity.getCode())
                            .retrieve()
                            .bodyToMono(new ParameterizedTypeReference<List<WebClientCountryDto>>() {})
                            .block();

                    if (countryDetails == null || countryDetails.isEmpty()) {
                        throw new RuntimeException("Country details not found for code: " + countryEntity.getCode());
                    }

                    return CountryConverter.toDto(countryDetails.get(0)); // Берем первый объект из массива
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteUserById(Long userId) throws UserNotFoundException {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new UserNotFoundException("User not found with id: " + userId);
        }
    }
    @Transactional
    public void addUser(UserDto newUser) {
        resetSequence();
        UserEntity user = new UserEntity();
        user.setUsername(newUser.getUsername());
        userRepository.save(user);
    }

    public void resetSequence() {
        jdbcTemplate.execute("ALTER TABLE users ALTER COLUMN id RESTART WITH (SELECT MAX(id) + 1 FROM users)");
    }
}

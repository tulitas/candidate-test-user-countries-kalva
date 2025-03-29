package lv.visma.consulting.usercountriesapi.controllers;

import lombok.RequiredArgsConstructor;
import lv.visma.consulting.usercountriesapi.controllers.dto.CountryDto;
import lv.visma.consulting.usercountriesapi.controllers.dto.UserDto;
import lv.visma.consulting.usercountriesapi.services.UserService;
import lv.visma.consulting.usercountriesapi.utilities.errors.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{userId}/favorite-countries")
    public ResponseEntity<List<CountryDto>> getFavoriteCountries(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getFavoriteCountries(userId));
    }

    @DeleteMapping("/{userId}/delete")
    public void deleteUser(@PathVariable Long userId) throws UserNotFoundException {
        userService.deleteUserById(userId);
    }
}

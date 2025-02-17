package lv.visma.consulting.usercountriesapi.services;

import lombok.AllArgsConstructor;
import lv.visma.consulting.usercountriesapi.controllers.dto.UserDto;
import lv.visma.consulting.usercountriesapi.converters.UserConverter;
import lv.visma.consulting.usercountriesapi.db.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        var entityUsers = userRepository.findAll();
        return UserConverter.toDTOList(entityUsers);
    }
}

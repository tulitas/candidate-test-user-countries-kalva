package lv.visma.consulting.usercountriesapi.converters;

import lombok.experimental.UtilityClass;
import lv.visma.consulting.usercountriesapi.controllers.dto.UserDto;
import lv.visma.consulting.usercountriesapi.db.entities.UserEntity;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class UserConverter {
    public UserDto toDto(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }
        return UserDto.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .build();

    }

    public List<UserDto> toDTOList(List<UserEntity> userEntities) {
        return userEntities.stream()
                .map(UserConverter::toDto)
                .collect(Collectors.toList());
    }
}

package lv.visma.consulting.usercountriesapi.controllers.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class UserDto {
    private Long id;
    private String username;
    private Set<Long> favoriteCountryIds;
}

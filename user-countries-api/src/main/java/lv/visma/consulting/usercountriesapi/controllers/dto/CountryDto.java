package lv.visma.consulting.usercountriesapi.controllers.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class CountryDto {
    private Long id;
    private String name;
    private String code;
    private List<String> capitals;
    public CountryDto(Long id, String name, String code, List<String> capitals) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.capitals = capitals;
    }
}

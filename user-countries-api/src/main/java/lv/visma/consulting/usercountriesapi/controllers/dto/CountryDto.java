package lv.visma.consulting.usercountriesapi.controllers.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class CountryDto {
    private String name;
    private String code;
    private List<String> capitals;
}

package lv.visma.consulting.usercountriesapi.web.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WebClientCountryDto {
    @JsonProperty("name")
    private Name name;

    @JsonProperty("cca2")
    private String code;

    @JsonProperty("capital")
    private List<String> capitals;

    @Getter
    @Setter
    public static class Name {

        @JsonProperty("common")
        private String common;

        @JsonProperty("official")
        private String official;
    }
}

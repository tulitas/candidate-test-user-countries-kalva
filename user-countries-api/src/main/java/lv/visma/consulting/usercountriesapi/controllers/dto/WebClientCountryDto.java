package lv.visma.consulting.usercountriesapi.controllers.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class WebClientCountryDto {
        private Name name;
        private String cca2;
        private List<String> capital;

        public static class Name {
            private String official;
        }
}

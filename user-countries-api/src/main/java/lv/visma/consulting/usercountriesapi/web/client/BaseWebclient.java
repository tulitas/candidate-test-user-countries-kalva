package lv.visma.consulting.usercountriesapi.web.client;

import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;

@RequiredArgsConstructor
abstract class BaseWebclient {
    protected final WebClient webClient;

    protected <T> ResponseEntity<T> get(String uri, Class<T> classType) throws WebClientResponseException {
        return webClient
                .get()
                .uri(createRequestUrl(uri))
                .retrieve()
                .toEntity(classType)
                .retryWhen(retryPolicyFor5xxAndTimeouts())
                .block();
    }

    protected <T> ResponseEntity<List<T>> getList(String uri, ParameterizedTypeReference<List<T>> responseType) throws WebClientResponseException {
        return webClient
                .get()
                .uri(createRequestUrl(uri))
                .retrieve()
                .toEntity(responseType)
                .retryWhen(retryPolicyFor5xxAndTimeouts())
                .block();
    }

    protected Retry retryPolicyFor5xxAndTimeouts() {
        final int attemptCount = 2;
        return Retry.fixedDelay(attemptCount, Duration.ofSeconds(2))
                .filter(e -> e instanceof WebClientResponseException &&
                        ((WebClientResponseException) e).getStatusCode().is5xxServerError());
    }

    private String createRequestUrl(String uri) {
        final String baseUrl = "https://restcountries.com/v3.1/";
        return baseUrl + uri;
    }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseWebclientService {
  protected apiUrl: string = environment.apiUrl;

  constructor(protected httpClient: HttpClient) {}

  protected get<T>(
    path: string,
    queryParams?: { [key: string]: string }
  ): Observable<T> {
    let params = new HttpParams();

    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        params = params.set(key, queryParams[key]);
      });
      return this.httpClient.get<T>(this.apiUrl.concat(path), { params });
    }

    return this.httpClient.get<T>(this.apiUrl.concat(path));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/alpha';

  constructor(private http: HttpClient) {}

  getCountryDetails(countryCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${countryCode}`);
  }
}

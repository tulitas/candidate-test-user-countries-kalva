import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {Country} from "../modules/country/models/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/alpha';
  private readonly URI: string = 'country';
  constructor(private http: HttpClient) {}

  getCountryDetails(countryCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${countryCode}`);
  }

  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}${this.URI}`);
  }
}

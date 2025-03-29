import { Injectable } from '@angular/core';
import { BaseWebclientService } from '../../shared/services/base-webclient.services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserWebclientService {
  private readonly URI: string = 'user';

  constructor(private httpClient: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    const url = `${environment.apiUrl}${this.URI}`;
    return this.httpClient.get<User[]>(`${environment.apiUrl}${this.URI}`);
  }

  getUserDetails(userId: number): Observable<any> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${userId}`);
  }

  getFavoriteCountries(userId: number): Observable<any> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}${this.URI}/${userId}/favorite-countries`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}${this.URI}/${userId}/delete`);
  }
}

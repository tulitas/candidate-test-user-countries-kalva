import { Component } from '@angular/core';
import {UserWebclientService} from "../users/services/user-webclient.service";
import {CountryService} from "../../services/country.service";
import {Country} from "../country/models/country";
import {finalize} from "rxjs";
import { NewUser } from '../add-user/models/new-user';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  username: string = '';
  favoriteCountryIds: number[] = [];
  countries: Country[] = [];
  isLoading: boolean = false;
  constructor(private userService: UserWebclientService, private countryService: CountryService ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  onSubmit(): void {
    const newUser: NewUser = {
      username: this.username,
      favoriteCountryIds: this.favoriteCountryIds,
    };
    this.userService.addUser(newUser).subscribe(
      () => {
        alert('User successfully added!');
        this.username = '';
        this.favoriteCountryIds = [];
      },
      (error) => {
        console.error('Error adding user:', error);
        alert('An error occurred while adding the user.');
      }
    );
  }

  private loadCountries(): void {
    this.isLoading = true;
    this.countryService.getAllCountries()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (data: any[]) => {
          this.countries = data.map((country) => ({
            id: country.id,
            code: country.code,
            name: country.name,
          }));
        },
        (error) => {
          console.error('Error loading countries:', error);
          alert('Failed to load countries. Please try again.');
        }
      );
  }
}

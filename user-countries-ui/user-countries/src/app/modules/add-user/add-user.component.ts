import { Component } from '@angular/core';
import {UserWebclientService} from "../users/services/user-webclient.service";
import {CountryService} from "../../services/country.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  username: string = '';
  favoriteCountryIds: number[] = [];
  countries: any[] = [];
  constructor(private userService: UserWebclientService, private countryService: CountryService ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  onSubmit(): void {
    const newUser = {
      username: this.username,
      favoriteCountryIds: this.favoriteCountryIds,
    };
    console.log('new user ', newUser);
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
    this.countryService.getAllCountries().subscribe(
      (data) => {
        this.countries = data.map((country) => ({
          id: country.id,
          code: country.code,
          name: country.name,
        }));
      },
      (error) => {
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {UserWebclientService} from "../users/services/user-webclient.service";
import {CountryService} from "../../services/country.service";
import {Country} from "../country/models/country";
import {finalize} from "rxjs";
import { NewUser } from '../add-user/models/new-user';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  username: string = '';
  favoriteCountryIds: number[] = [];
  countries: Country[] = [];
  isLoading: boolean = false;
  addUserForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserWebclientService,
    private countryService: CountryService
  ) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      favoriteCountryIds: [[]],
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const newUser: NewUser = this.addUserForm.value;
      this.isLoading = true;
      this.userService.addUser(newUser)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe(
          () => {
            alert('User successfully added!');
            this.addUserForm.reset();
          },
          (error) => {
            console.error('Error adding user:', error);
            alert('An error occurred while adding the user.');
          }
        );
    }
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

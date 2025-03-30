import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserWebclientService} from "../users/services/user-webclient.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId: number = 0;
  username!: string;
  favoriteCountries: any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserWebclientService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.username = params['username'];
      this.loadFavoriteCountries();
    });
  }

  loadFavoriteCountries(): void {
    this.userService.getFavoriteCountries(this.userId).subscribe(
      (countries) => {
        this.favoriteCountries = countries;
      },
      (error) => {
        console.error('Error fetching favorite countries:', error);
      }
    );
  }
}

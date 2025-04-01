import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserWebclientService} from "../services/user-webclient.service";
import {MatDialog} from "@angular/material/dialog";
import {CountryService} from "../../../services/country.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  expandedUserId: number | null = null;
  favoriteCountries: { [key: number]: any[] } = {};
  isLoading = true;
  hoveredCountry: any | null = null;
  tooltipX = 0;
  tooltipY = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private userWebclientService: UserWebclientService,
              private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userWebclientService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    );
  }

  toggleDetails(user: any): void {
    if (this.expandedUserId === user.id) {
      this.expandedUserId = null;
    } else {
      this.expandedUserId = user.id;

      if (!this.favoriteCountries[user.id]) {
        this.userWebclientService.getFavoriteCountries(user.id).subscribe(
          (countries) => {
            this.favoriteCountries[user.id] = countries;
          },
          (error) => {
            console.error(`Error loading favorite countries for user ${user.id}:`, error);
          }
        );
      }
    }
  }

  deleteUser(userId: number, event: Event): void {
    event.stopPropagation();
    this.userWebclientService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();

        if (this.expandedUserId === userId) {
          this.expandedUserId = null;
        }
      },
      (error) => {
        console.error(`Error deleting user with ID ${userId}:`, error);
        this.loadUsers();
      }
    );
  }

  loadCountryDetails(countryCode: string): void {
    this.countryService.getCountryDetails(countryCode).subscribe(
      (data) => {
        const country = data[0];
        this.hoveredCountry = {
          name: country.name.common,
          region: country.region,
          capital: country.capital?.[0] || 'N/A',
          population: country.population,
          area: country.area
        };
      },
      (error) => {
        console.error(`Error fetching details for country ${countryCode}:`, error);
      }
    );
  }

  hideCountryDetails(): void {
    this.hoveredCountry = null;
  }

  updateTooltipPosition(event: MouseEvent): void {
    this.tooltipX = event.clientX + 10;
    this.tooltipY = event.clientY - 200;
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}

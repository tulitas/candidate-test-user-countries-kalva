import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserWebclientService} from "../services/user-webclient.service";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private userWebclientService: UserWebclientService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    console.log('Load')
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
    event.stopPropagation(); // Останавливаем распространение события, чтобы не раскрывать детали
    this.userWebclientService.deleteUser(userId).subscribe(
      () => {
        // Перезагружаем список пользователей с сервера после удаления
        console.log('reload')
        this.loadUsers();

        // Если удаленный пользователь был раскрытым, скрываем детали
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







}

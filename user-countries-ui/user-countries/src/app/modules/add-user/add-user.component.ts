import { Component } from '@angular/core';
import {UserWebclientService} from "../users/services/user-webclient.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  username: string = '';

  constructor(private userService: UserWebclientService) {}

  onSubmit(): void {
    if (this.username.trim()) {
      const newUser = { username: this.username };

      this.userService.addUser(newUser).subscribe(
        (response) => {
          alert('User successfully added!');
          this.username = '';
        },
        (error) => {
          console.error('Error adding user:', error);
          alert('An error occurred while adding the user.');
        }
      );
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class AddUserModule { }

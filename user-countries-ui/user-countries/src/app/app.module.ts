import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { UserDetailsComponent } from './modules/user-details/user-details.component';

@NgModule({
  declarations: [AppComponent,
    HomeComponent,
    UserDetailsComponent],
  imports: [BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

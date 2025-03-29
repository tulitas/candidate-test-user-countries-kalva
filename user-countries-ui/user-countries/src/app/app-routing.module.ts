import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {UserDetailsComponent} from "./modules/user-details/user-details.component";

const routes: Routes = [
  { path: 'main', component: HomeComponent },
  { path: 'add-user', loadChildren: () => import('./modules/add-user/add-user.module').then(m => m.AddUserModule) },
  { path: '', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'user/:id/:username', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

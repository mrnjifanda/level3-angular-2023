import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Welcom back' },
  { path: 'register', component: RegisterComponent, title: 'Create new account' },
  { path: 'forget-password', component: ForgetPasswordComponent, title: 'Forget password' },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

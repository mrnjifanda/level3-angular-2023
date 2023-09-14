import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from '../auth/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  auth!: UserInterface;

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
  
    const auth = this.authService.auth();
    if (auth.error) {

      this.router.navigate(['login']);
    } else {

      this.auth = auth.data;
    }
  }
}

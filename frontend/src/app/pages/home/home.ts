import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../common/button/button';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  goTo(path: '/login' | '/register' | '/dashboard'): void {
    this.router.navigateByUrl(path);
  }
}

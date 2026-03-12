import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  submit(email: string, password: string): void {
    if (!email.trim() || !password.trim()) {
      this.error = 'Please enter email and password.';
      return;
    }

    this.auth.login();
    this.error = '';
    this.router.navigateByUrl('/dashboard');
  }
}

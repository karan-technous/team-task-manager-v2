import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  submit(name: string, email: string, password: string): void {
    if (!name.trim() || !email.trim() || !password.trim()) {
      this.error = 'Please fill all fields.';
      return;
    }

    this.auth.register();
    this.error = '';
    this.router.navigateByUrl('/dashboard');
  }
}

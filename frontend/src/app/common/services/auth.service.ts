import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'ttm_dummy_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly authenticated = signal<boolean>(this.hasStoredToken());

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  login(token: string = 'dummy-token'): void {
    if (this.isBrowser) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    this.authenticated.set(true);
  }

  register(): void {
    this.login('dummy-register-token');
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.authenticated.set(false);
  }

  private hasStoredToken(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    return !!localStorage.getItem(TOKEN_KEY);
  }
}

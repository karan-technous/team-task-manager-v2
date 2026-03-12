import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './common/services/auth.service';
import { Sidebar } from './common/sidebar/sidebar';
import { ToastContainerComponent } from './common/toast/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar,ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  protected readonly title = signal('team-task-manager');
  private readonly authPages = ['/login', '/register'];
  protected readonly currentPath = signal(this.router.url);
  protected readonly showShell = computed(
    () => this.auth.isAuthenticated() && !this.authPages.includes(this.currentPath()),
  );

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(event.urlAfterRedirects);
      }
    });
  }
}

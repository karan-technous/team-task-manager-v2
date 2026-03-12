import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IconButton } from '../icon-button/icon-button';
@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, IconButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  constructor(protected router: Router) {}
  changeTab(navigate: string) {
    this.router.navigate([`/${navigate}`]);
  }
}

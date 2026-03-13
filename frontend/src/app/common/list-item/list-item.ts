import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
})
export class ListItem {
  label = input<string>('');
  icon = input<string>('');
  variant = input<'default' | 'danger'>('default');
  disabled = input<boolean>(false);
  itemClick = output<void>();

  onClick() {
    if (this.disabled()) {
      return;
    }

    this.itemClick.emit();
  }
}


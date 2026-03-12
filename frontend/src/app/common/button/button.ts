import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input<string>('');
  type = input<'button' | 'submit'>('button');
  variant = input<'primary' | 'secondary'>('primary');
  fullWidth = input<boolean>(false);
  icon = input<string>('');
  disabled = input<boolean>(false);
  buttonClick = output<void>();

  onClick() {
    if (this.disabled()) {
      return;
    }
    this.buttonClick.emit();
  }
}

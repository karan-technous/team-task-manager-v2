import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
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
  buttonClick = output<void>();

  onClick() {
    this.buttonClick.emit();
  }
}

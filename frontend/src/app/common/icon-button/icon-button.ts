import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-button',
  imports: [MatIconModule],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButton {
  icon = input<string>('Button');
  type = input<'button' | 'submit'>('button');
  variant = input<'primary' | 'secondary'>('primary');
  active = input<boolean>(false);
  text = input<string>('');

  buttonClick = output<void>();

  onClick() {
    this.buttonClick.emit();
  }
}

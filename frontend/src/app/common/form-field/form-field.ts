import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  label = input<string>('');

  type = input<string>('text');

  placeholder = input<string>('');

  value = input<string>('');

  required = input<boolean>(false);

  change = output<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.change.emit(value);
  }
}

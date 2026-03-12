import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
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

  valueChange = output<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}

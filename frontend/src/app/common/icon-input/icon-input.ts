import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-input',
  imports: [MatIconModule],
  templateUrl: './icon-input.html',
  styleUrl: './icon-input.scss',
})
export class IconInput {
  icon = input<string>('dashboard');
  type = input<string>('text');
  placeHolder = input<string>('Search...');
  valueChange = output<string>();
  value = signal('');
  private timmer: any;
  destroyRef = inject(DestroyRef);
  constructor() {
    effect(() => {
      const v = this.value();
      clearTimeout(this.timmer);
      this.timmer = setTimeout(() => {
        this.valueChange.emit(v);
      }, 500);
    });

    this.destroyRef.onDestroy(() => {
      clearTimeout(this.timmer);
    });
  }

  changeInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    console.log('event=', value);
  }
}

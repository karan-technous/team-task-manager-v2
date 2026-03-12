import { Component, computed, inject, input, signal } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastPosition } from './toast.model';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

  position = input<ToastPosition>('top-right');

  hovered = signal(false);

  visibleToasts = computed(() => this.toastService.toasts().slice(0, 3));

  totalCount = computed(() => this.toastService.toasts().length);

  layout = computed<'stacked' | 'vertical'>(() => {
    const count = this.totalCount();
    if (this.hovered()) return 'vertical';
    if (count > 3) return 'stacked';
    return 'vertical';
  });

  positionClass = computed(() => `toast-container ${this.position()}`);
}

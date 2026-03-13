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

  hasToasts = computed(() => this.totalCount() > 0);

  layout = computed<'stacked' | 'vertical'>(() => {
    const count = this.totalCount();
    if (this.hovered()) return 'vertical';
    if (count > 3) return 'stacked';
    return 'vertical';
  });

  positionClass = computed(() => {
    const active = this.hasToasts() ? ' active' : '';
    return `toast-container ${this.position()}${active}`;
  });

  onMouseOut(event: MouseEvent) {
    const current = event.currentTarget as HTMLElement | null;
    const related = event.relatedTarget as Node | null;

    if (!current || !related || !current.contains(related)) {
      this.hovered.set(false);
    }
  }
}

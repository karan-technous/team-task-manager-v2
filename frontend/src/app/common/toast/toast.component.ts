import { Component, input, output, computed } from '@angular/core';
import { Toast } from './toast.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  imports:[MatIcon]
})
export class ToastComponent {
  toast = input.required<Toast>();

  index = input<number>(0);

  layout = input<'stacked' | 'vertical'>('vertical');

  close = output<void>();

  private readonly itemOffset = 72;
  private readonly stackOffset = 12;
  private readonly stackScaleStep = 0.05;

  offset = computed(() => {
    const stacked = this.layout() === 'stacked';

    // vertical layout (default + on hover)
    if (!stacked) {
      return this.index() * this.itemOffset;
    }

    // stacked layout
    return this.index() * this.stackOffset;
  });

  scale = computed(() => {
    const stacked = this.layout() === 'stacked';
    if (!stacked) return 1;

    return Math.max(0.85, 1 - this.index() * this.stackScaleStep);
  });

  zIndex = computed(() => 100 - this.index());

  icon = computed(() => {
    switch (this.toast().type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'pending':
        return 'hourglass_top';
      default:
        return 'check_circle';
    }
  });

  typeClass = computed(() => this.toast().type ?? 'success');
}

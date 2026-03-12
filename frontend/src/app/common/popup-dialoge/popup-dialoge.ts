import { Component, input, OnDestroy, output, signal } from '@angular/core';
import { IconButton } from '../icon-button/icon-button';

const ANIMATION_TIME = 250;

@Component({
  selector: 'app-popup-dialoge',
  imports: [IconButton],
  templateUrl: './popup-dialoge.html',
  styleUrl: './popup-dialoge.scss',
})
export class PopupDialoge implements OnDestroy {
  open = input<boolean>(false);
  close = output<void>();
  closing = signal(false);

  private timeoutId?: ReturnType<typeof setTimeout>;

  closeDialog() {
    if (this.closing()) {
      return;
    }

    this.closing.set(true);
    this.timeoutId = setTimeout(() => {
      this.closing.set(false);
      this.close.emit();
    }, ANIMATION_TIME);
  }

  backdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

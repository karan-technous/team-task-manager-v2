import { Injectable, signal } from '@angular/core';
import { Toast, ToastOptions } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private id = 0;
  private readonly exitMs = 300;

  toasts = signal<Toast[]>([]);

  show(toast: Omit<Toast, 'id'>) {
    const newToast: Toast = {
      id: ++this.id,
      removing: false,
      ...toast,
    };

    const duration = newToast.duration ?? 3000;
    newToast.duration = duration;

    this.toasts.update((list) => [newToast, ...list]);

    if (duration > 0) {
      setTimeout(() => this.remove(newToast.id), duration);
    }
  }

  remove(id: number) {
    let alreadyRemoving = false;

    this.toasts.update((list) =>
      list.map((t) => {
        if (t.id !== id) return t;
        if (t.removing) {
          alreadyRemoving = true;
          return t;
        }
        return { ...t, removing: true };
      }),
    );

    if (alreadyRemoving) return;

    setTimeout(() => {
      this.toasts.update((list) => list.filter((t) => t.id !== id));
    }, this.exitMs);
  }

  success(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('success', title, description, options);
  }

  error(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('error', title, description, options);
  }

  warning(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('warning', title, description, options);
  }

  pending(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('pending', title, description, options);
  }

  private createTyped(
    type: NonNullable<Toast['type']>,
    title: string,
    description?: string,
    options?: ToastOptions,
  ) {
    this.show({
      title,
      description: description ?? options?.description,
      duration: options?.duration,
      action: options?.action,
      type,
    });
  }
}

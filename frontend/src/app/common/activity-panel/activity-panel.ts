import { Component, computed, HostListener, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListItem } from '../list-item/list-item';

interface ProjectPanel {
  project: string;
  icon?: string;
  items: {
    id?: number;
    title: string;
    count?: number;
  }[];
}

interface EmmitData {
  id?: number;
  title: string;
  projectName: string;
}

interface ProjectActionEvent {
  action: 'addTask' | 'deleteProject';
  projectName: string;
}

interface TaskActionEvent {
  action: 'deleteTask';
  taskId?: number;
  title: string;
  projectName: string;
}

@Component({
  selector: 'app-activity-panel',
  standalone: true,
  imports: [MatIconModule, ListItem],
  templateUrl: './activity-panel.html',
  styleUrl: './activity-panel.scss',
})
export class ActivityPanel {
  icon = input<string>('folder');
  panels = input<ProjectPanel[]>([]);
  emmitActiveitem = output<EmmitData>();
  projectAction = output<ProjectActionEvent>();
  taskAction = output<TaskActionEvent>();

  readonly hasAnyTasks = computed(() => this.panels().some((panel) => panel.items.length > 0));

  openIndexes = signal<Set<number>>(new Set());
  activeItem = signal<string | null>(null);
  projectMenu = signal<{ x: number; y: number; projectName: string } | null>(null);
  taskMenu = signal<
    { x: number; y: number; taskId?: number; title: string; projectName: string } | null
  >(null);

  toggle(i: number) {
    const set = new Set(this.openIndexes());

    if (set.has(i)) {
      set.delete(i);
    } else {
      set.add(i);
    }

    this.openIndexes.set(set);
  }

  selectItem(title: string, projectName: string, id?: number) {
    this.activeItem.set(this.getItemKey(title, id));
    const emmitData = {
      id,
      title,
      projectName,
    };
    this.emmitActiveitem.emit(emmitData);
  }

  isActive(title: string, id?: number) {
    return this.activeItem() === this.getItemKey(title, id);
  }

  private getItemKey(title: string, id?: number) {
    return id != null ? `id:${id}` : title;
  }

  openProjectMenu(event: MouseEvent, projectName: string) {
    event.preventDefault();
    event.stopPropagation();

    this.taskMenu.set(null);

    const menuWidth = 220;
    const menuHeight = 112;
    const offset = 8;

    const maxX = Math.max(offset, window.innerWidth - menuWidth - offset);
    const maxY = Math.max(offset, window.innerHeight - menuHeight - offset);

    const x = Math.min(Math.max(event.clientX, offset), maxX);
    const y = Math.min(Math.max(event.clientY, offset), maxY);

    this.projectMenu.set({ x, y, projectName });
  }

  closeContextMenu() {
    this.projectMenu.set(null);
    this.taskMenu.set(null);
  }

  triggerProjectAction(action: ProjectActionEvent['action']) {
    const menu = this.projectMenu();
    if (!menu) {
      return;
    }

    this.projectAction.emit({ action, projectName: menu.projectName });
    this.closeContextMenu();
  }

  openTaskMenu(event: MouseEvent, item: { id?: number; title: string }, projectName: string) {
    event.preventDefault();
    event.stopPropagation();

    this.projectMenu.set(null);

    const menuWidth = 220;
    const menuHeight = 64;
    const offset = 8;

    const maxX = Math.max(offset, window.innerWidth - menuWidth - offset);
    const maxY = Math.max(offset, window.innerHeight - menuHeight - offset);

    const x = Math.min(Math.max(event.clientX, offset), maxX);
    const y = Math.min(Math.max(event.clientY, offset), maxY);

    this.taskMenu.set({ x, y, taskId: item.id, title: item.title, projectName });
  }

  triggerTaskAction(action: TaskActionEvent['action']) {
    const menu = this.taskMenu();
    if (!menu) {
      return;
    }

    this.taskAction.emit({
      action,
      taskId: menu.taskId,
      title: menu.title,
      projectName: menu.projectName,
    });
    this.closeContextMenu();
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return;
    }

    this.closeContextMenu();
  }
}

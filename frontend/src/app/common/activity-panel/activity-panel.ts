import { Component, HostListener, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListItem } from '../list-item/list-item';

interface ProjectPanel {
  project: string;
  icon?: string;
  items: {
    title: string;
    count?: number;
  }[];
}

interface EmmitData {
  title: string;
  projectName: string;
}

interface ProjectActionEvent {
  action: 'addTask' | 'deleteProject';
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

  openIndexes = signal<Set<number>>(new Set());
  activeItem = signal<string | null>(null);
  projectMenu = signal<{ x: number; y: number; projectName: string } | null>(null);

  toggle(i: number) {
    const set = new Set(this.openIndexes());

    if (set.has(i)) {
      set.delete(i);
    } else {
      set.add(i);
    }

    this.openIndexes.set(set);
  }

  selectItem(title: string, projectName: string) {
    this.activeItem.set(title);
    const emmitData = {
      title,
      projectName,
    };
    this.emmitActiveitem.emit(emmitData);
  }

  openProjectMenu(event: MouseEvent, projectName: string) {
    event.preventDefault();
    event.stopPropagation();

    const menuWidth = 220;
    const menuHeight = 112;
    const offset = 8;

    const maxX = Math.max(offset, window.innerWidth - menuWidth - offset);
    const maxY = Math.max(offset, window.innerHeight - menuHeight - offset);

    const x = Math.min(Math.max(event.clientX, offset), maxX);
    const y = Math.min(Math.max(event.clientY, offset), maxY);

    this.projectMenu.set({ x, y, projectName });
  }

  closeProjectMenu() {
    this.projectMenu.set(null);
  }

  triggerProjectAction(action: ProjectActionEvent['action']) {
    const menu = this.projectMenu();
    if (!menu) {
      return;
    }

    this.projectAction.emit({ action, projectName: menu.projectName });
    this.closeProjectMenu();
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return;
    }

    this.closeProjectMenu();
  }
}

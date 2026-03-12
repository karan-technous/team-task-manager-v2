import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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

@Component({
  selector: 'app-activity-panel',
  imports: [MatIconModule],
  templateUrl: './activity-panel.html',
  styleUrl: './activity-panel.scss',
})
export class ActivityPanel {
  icon = input<string>('folder');
  panels = input<ProjectPanel[]>([]);
  emmitActiveitem = output<EmmitData>();

  openIndexes = signal<Set<number>>(new Set());
  activeItem = signal<string | null>(null);

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
}

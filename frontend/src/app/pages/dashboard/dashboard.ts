import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../../common/button/button';
import { IconInput } from '../../common/icon-input/icon-input';
import { PopupDialoge } from '../../common/popup-dialoge/popup-dialoge';
import { ActivityPanel } from '../../common/activity-panel/activity-panel';
import { FormField } from '../../common/form-field/form-field';
import { ToastService } from '../../common/toast/toast.service';
import { ProjectService } from '../../common/services/project.service';
import { CreateProjectRequest } from '../../common/models/project.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    Button,
    IconInput,
    PopupDialoge,
    ActivityPanel,
    FormField,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly open = signal(false);
  readonly projectName = signal('');
  readonly projectDescription = signal('');
  readonly isSaving = signal(false);

  readonly isProjectValid = computed(
    () => this.projectName().trim().length > 0 && this.projectDescription().trim().length > 0,
  );

  readonly metrics = [
    { label: 'Active Projects', value: '4' },
    { label: 'Open Tasks', value: '28' },
    { label: 'Completed This Week', value: '16' },
    { label: 'Team Members Online', value: '9' },
  ];

  constructor(
    private toast: ToastService,
    private projectService: ProjectService,
  ) {}
  buttonClick() {
    console.log('button');
  }

  saveProject() {
    if (this.isSaving()) {
      return;
    }

    const payload: CreateProjectRequest = {
      projectName: this.projectName().trim(),
      description: this.projectDescription().trim(),
    };

    if (!payload.projectName || !payload.description) {
      this.toast.warning('Please fill in all required fields');
      return;
    }

    this.isSaving.set(true);
    this.projectService
      .createProject(payload)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Project saved successfully');
          this.projectName.set('');
          this.projectDescription.set('');
          this.open.set(false);
        },
        error: (err: unknown) => {
          console.log('err===', err);
          let message = 'Unable to save the project right now.';
          if (err instanceof HttpErrorResponse) {
            message = err.error?.message || err.message || message;
          } else if (err instanceof Error) {
            message = err.message;
          }
          this.toast.error('Save failed', message);
        },
      });
  }

  searchUsers(v: string) {
    console.log('the final value = ', v);
  }

  readonly upcoming = [
    { task: 'Sprint planning for mobile app', owner: 'Aisha', due: 'Today, 4:30 PM' },
    { task: 'QA review for billing module', owner: 'Ravi', due: 'Tomorrow, 11:00 AM' },
    { task: 'Design handoff: workspace settings', owner: 'Mina', due: 'Mar 11, 3:00 PM' },
  ];

  emmitDatas(data: any) {
    console.log('called====', data);
  }

  onProjectAction(event: { action: 'addTask' | 'deleteProject'; projectName: string }) {
    console.log('project action====', event);

    if (event.action === 'addTask') {
      this.toast.pending('Add task', `Project: ${event.projectName}`);
      return;
    }

    this.toast.warning('Delete project', `Project: ${event.projectName}`);
  }
}

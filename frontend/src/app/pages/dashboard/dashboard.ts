import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
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
import { CreateProjectRequest, Project } from '../../common/models/project.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from '../../common/services/task.service';
import { CreateTaskRequest, Task } from '../../common/models/task.model';
import { ActivityPanelPanel, DashboardService } from '../../common/services/dashboard.service';

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
export class Dashboard implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly open = signal(false);
  readonly projectName = signal('');
  readonly projectDescription = signal('');
  readonly isSaving = signal(false);

  readonly activityPanels = signal<ActivityPanelPanel[]>([]);
  readonly isPanelsLoading = signal(false);
  readonly projects = signal<Project[]>([]);
  readonly tasks = signal<Task[]>([]);

  readonly taskOpen = signal(false);
  readonly taskProjectName = signal('');
  readonly taskSummary = signal('');
  readonly taskDescription = signal('');
  readonly taskType = signal<'Task' | 'Bug' | 'Story'>('Task');
  readonly taskPriority = signal<'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest'>('Medium');
  readonly taskStatus = signal<'To Do' | 'In Progress' | 'In Review' | 'Done'>('To Do');
  readonly taskAssignee = signal('');
  readonly taskDueDate = signal('');
  readonly isTaskSaving = signal(false);

  readonly selectedTask = signal<Task | null>(null);
  readonly selectedTaskId = signal<number | null>(null);

  readonly isProjectValid = computed(
    () => this.projectName().trim().length > 0 && this.projectDescription().trim().length > 0,
  );

  readonly isTaskValid = computed(() => {
    return (
      this.taskProjectName().trim().length > 0 &&
      this.taskSummary().trim().length > 0 &&
      this.taskDescription().trim().length > 0 &&
      !!this.taskType() &&
      !!this.taskPriority() &&
      !!this.taskStatus() &&
      this.taskAssignee().trim().length > 0 &&
      this.taskDueDate().trim().length > 0
    );
  });

  readonly metrics = [
    { label: 'Active Projects', value: '4' },
    { label: 'Open Tasks', value: '28' },
    { label: 'Completed This Week', value: '16' },
    { label: 'Team Members Online', value: '9' },
  ];

  constructor(
    private toast: ToastService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadPanels();
  }

  loadPanels() {
    this.isPanelsLoading.set(true);
    this.dashboardService
      .getOverview()
      .pipe(finalize(() => this.isPanelsLoading.set(false)))
      .subscribe({
        next: (overview) => {
          const projects = overview.projects ?? [];
          const tasks = overview.tasks ?? [];
          this.activityPanels.set(overview.panels ?? []);
          this.projects.set(projects);
          this.tasks.set(tasks);

          const selectedId = this.selectedTaskId();
          if (selectedId == null) {
            return;
          }

          this.selectedTask.set(tasks.find((t) => t.id === selectedId) ?? null);
        },
        error: (err: unknown) => {
          console.log('dashboard overview error===', err);
          let message = 'Unable to load projects right now.';
          if (err instanceof HttpErrorResponse) {
            message = err.error?.message || err.message || message;
          } else if (err instanceof Error) {
            message = err.message;
          }
          this.toast.error('Load failed', message);
        },
      });
  }
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
          this.loadPanels();
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

  onTaskSelected(event: unknown) {
    if (!this.isTaskSelectEvent(event)) {
      return;
    }

    const tasks = this.tasks();

    let task: Task | undefined;
    if (event.id != null) {
      task = tasks.find((t) => t.id === event.id);
    }

    if (!task) {
      task = tasks.find((t) => t.projectName === event.projectName && t.summary === event.title);
    }

    if (!task) {
      this.selectedTaskId.set(null);
      this.selectedTask.set(null);
      this.toast.warning('Task not found');
      return;
    }

    this.selectedTaskId.set(task.id);
    this.selectedTask.set(task);
  }

  private isTaskSelectEvent(
    event: unknown,
  ): event is { id?: number; title: string; projectName: string } {
    if (!event || typeof event !== 'object') {
      return false;
    }

    const candidate = event as Partial<{ id: unknown; title: unknown; projectName: unknown }>;
    if (candidate.id != null && typeof candidate.id !== 'number') {
      return false;
    }

    return typeof candidate.title === 'string' && typeof candidate.projectName === 'string';
  }

  onProjectAction(event: unknown) {
    console.log('project action====', event);

    if (!this.isProjectActionEvent(event)) {
      return;
    }

    if (event.action === 'addTask') {
      this.openAddTaskDialog(event.projectName);
      return;
    }

    this.toast.warning('Delete project', `Project: ${event.projectName}`);
  }

  private isProjectActionEvent(
    event: unknown,
  ): event is { action: 'addTask' | 'deleteProject'; projectName: string } {
    if (!event || typeof event !== 'object') {
      return false;
    }

    const candidate = event as Partial<{ action: unknown; projectName: unknown }>;
    if (candidate.action !== 'addTask' && candidate.action !== 'deleteProject') {
      return false;
    }

    return typeof candidate.projectName === 'string';
  }

  openAddTaskDialog(projectName: string) {
    this.taskProjectName.set(projectName);
    this.taskSummary.set('');
    this.taskDescription.set('');
    this.taskType.set('Task');
    this.taskPriority.set('Medium');
    this.taskStatus.set('To Do');
    this.taskAssignee.set('');
    this.taskDueDate.set('');
    this.isTaskSaving.set(false);
    this.taskOpen.set(true);
  }

  closeTaskDialog() {
    this.taskOpen.set(false);
  }

  saveTask() {
    if (this.isTaskSaving()) {
      return;
    }

    const payload: CreateTaskRequest = {
      projectName: this.taskProjectName().trim(),
      summary: this.taskSummary().trim(),
      description: this.taskDescription().trim(),
      issueType: this.taskType(),
      priority: this.taskPriority(),
      status: this.taskStatus(),
      assignee: this.taskAssignee().trim(),
      dueDate: this.taskDueDate().trim(),
    };

    if (
      !payload.projectName ||
      !payload.summary ||
      !payload.description ||
      !payload.issueType ||
      !payload.priority ||
      !payload.status ||
      !payload.assignee ||
      !payload.dueDate
    ) {
      this.toast.warning('Please fill in all required fields');
      return;
    }

    this.isTaskSaving.set(true);
    this.taskService
      .createTask(payload)
      .pipe(finalize(() => this.isTaskSaving.set(false)))
      .subscribe({
        next: (task) => {
          this.toast.success('Task created', `${task.summary} - ${task.projectName}`);
          this.closeTaskDialog();
          this.loadPanels();
        },
        error: (err: unknown) => {
          console.log('task create error===', err);
          let message = 'Unable to create the task right now.';
          if (err instanceof HttpErrorResponse) {
            message = err.error?.message || err.message || message;
          } else if (err instanceof Error) {
            message = err.message;
          }
          this.toast.error('Task create failed', message);
        },
      });
  }
}

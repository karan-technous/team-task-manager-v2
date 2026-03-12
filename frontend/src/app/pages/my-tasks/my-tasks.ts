import { Component } from '@angular/core';

@Component({
  selector: 'app-my-tasks',
  imports: [],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.scss',
})
export class MyTasks {
  readonly tasks = [
    { title: 'Prepare sprint retrospective notes', priority: 'High', status: 'In Progress' },
    { title: 'Update API integration checklist', priority: 'Medium', status: 'To Do' },
    { title: 'Refine dashboard cards spacing', priority: 'Low', status: 'Done' },
    { title: 'Review PR #104: notification panel', priority: 'High', status: 'In Review' },
  ];
}

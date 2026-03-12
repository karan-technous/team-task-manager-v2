import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../../common/button/button';
import { IconInput } from '../../common/icon-input/icon-input';
import { PopupDialoge } from '../../common/popup-dialoge/popup-dialoge';
import { ActivityPanel } from '../../common/activity-panel/activity-panel';
import { FormField } from '../../common/form-field/form-field';
import { ToastService } from '../../common/toast/toast.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, Button, IconInput, PopupDialoge, ActivityPanel, FormField],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  open = false;
  readonly metrics = [
    { label: 'Active Projects', value: '4' },
    { label: 'Open Tasks', value: '28' },
    { label: 'Completed This Week', value: '16' },
    { label: 'Team Members Online', value: '9' },
  ];

  constructor(private toast: ToastService) {}
  buttonClick() {
    console.log('button');
  }

  saveProject() {
    this.toast.success('Event has been created');
    console.log('called toast');
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
}

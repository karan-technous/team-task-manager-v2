import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  readonly notifications = [
    { title: 'Sprint board updated', detail: 'Design team moved 3 cards to Done.', time: '5 min ago' },
    { title: 'Comment on Task #42', detail: 'Mina requested clarification on acceptance criteria.', time: '20 min ago' },
    { title: 'Deadline reminder', detail: 'QA review for billing module is due tomorrow.', time: '1 hour ago' },
  ];
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../tokens/api-base-url.token';
import { ApiResponse } from '../models/api-response.model';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';

export type ActivityPanelItem = {
  id?: number;
  title: string;
  count?: number;
};

export type ActivityPanelPanel = {
  project: string;
  icon?: string;
  items: ActivityPanelItem[];
};

export type DashboardOverview = {
  projects: Project[];
  tasks: Task[];
  panels: ActivityPanelPanel[];
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) apiBaseUrl: string,
  ) {
    this.baseUrl = apiBaseUrl.replace(/\/$/, '');
  }

  getOverview(): Observable<DashboardOverview> {
    return this.http
      .get<ApiResponse<DashboardOverview>>(`${this.baseUrl}/api/v1/dashboard/overview`)
      .pipe(
        map((response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to load dashboard data.');
          }
          return response.data;
        }),
      );
  }
}

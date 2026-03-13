import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../tokens/api-base-url.token';
import { ApiResponse } from '../models/api-response.model';
import { CreateTaskRequest, Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) apiBaseUrl: string,
  ) {
    this.baseUrl = apiBaseUrl.replace(/\/$/, '');
  }

  createTask(payload: CreateTaskRequest): Observable<Task> {
    return this.http
      .post<ApiResponse<Task>>(`${this.baseUrl}/api/v1/task/store`, payload)
      .pipe(
        map((response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to create task.');
          }
          return response.data;
        }),
      );
  }
}


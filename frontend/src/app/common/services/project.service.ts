import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../tokens/api-base-url.token';
import { ApiResponse } from '../models/api-response.model';
import { CreateProjectRequest, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) apiBaseUrl: string,
  ) {
    this.baseUrl = apiBaseUrl.replace(/\/$/, '');
  }

  createProject(payload: CreateProjectRequest): Observable<Project> {
    return this.http
      .post<ApiResponse<Project>>(`${this.baseUrl}/api/v1/project/store`, payload)
      .pipe(
        map((response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to save project.');
          }
          return response.data;
        }),
      );
  }
}

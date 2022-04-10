import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectsStore } from './project.store';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private projectsStore: ProjectsStore) {}

  loadProjects(userId: number) {
    this.http
      .get<Project[]>(`/projects?userId=${userId}`)
      .subscribe((projects) => {
        this.projectsStore.set(projects);
      });
  }

  createProject(title: string, userId: number) {
    const requestBody = { title, userId };
    this.http.post<Project>('/projects', requestBody).subscribe((project) => {
      this.projectsStore.add(project);
    });
  }

  changeProjectTitle(projectId: number, title: string) {
    this.http
      .patch<Project>(`/projects/${projectId}/change-title`, { title })
      .subscribe(() => {
        this.projectsStore.update(projectId, { title });
      });
  }

  removeProject(projectId: number) {
    this.http.delete<Project>(`/projects/${projectId}`).subscribe(() => {
      this.projectsStore.remove(projectId);
    });
  }
}

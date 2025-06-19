import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { Project } from "../models/project.model";
import { MOCK_PROJECTS } from "../mocks/project.mock";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;
  private useMocks = true; // Alternar entre dados mockados e API real

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return of(MOCK_PROJECTS);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(MOCK_PROJECTS.find((project) => project.id === id));
  }

  createProject(project: Partial<Project>): Observable<Project> {
    if (this.useMocks) {
      const newProject = {
        ...project,
        id: String(MOCK_PROJECTS.length + 1),
      } as Project;
      MOCK_PROJECTS.push(newProject);
      return of(newProject);
    }
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: string, project: Partial<Project>): Observable<Project> {
    if (this.useMocks) {
      const index = MOCK_PROJECTS.findIndex((p) => p.id === id);
      if (index !== -1) {
        MOCK_PROJECTS[index] = {
          ...MOCK_PROJECTS[index],
          ...project,
        };
        return of(MOCK_PROJECTS[index]);
      }
    }
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<void> {
    if (this.useMocks) {
      const index = MOCK_PROJECTS.findIndex((p) => p.id === id);
      if (index !== -1) {
        MOCK_PROJECTS.splice(index, 1);
      }
      return of(void 0);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

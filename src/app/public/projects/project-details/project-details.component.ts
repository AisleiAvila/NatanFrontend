import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Project } from "../../../core/models/project.model";
import { ProjectService } from "../../../core/services/project.service";

@Component({
  selector: "app-project-details",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
  ],
  template: `
    <div class="project-details-container" *ngIf="project">
      <h1>Detalhes do Projeto</h1>
      <h2>{{ project.title }}</h2>
      <p class="subtitle">
        Informações completas sobre o projeto e os serviços prestados.
      </p>
      <div class="project-info">
        <div class="info-group">
          <label>Cliente</label>
          <p>{{ project.client.name }}</p>
        </div>
        <div class="info-group">
          <label>Prestador</label>
          <p>{{ project.provider.name }}</p>
        </div>
        <div class="info-group">
          <label>Descrição</label>
          <p>{{ project.description }}</p>
        </div>
        <div class="info-group">
          <label>Período</label>
          <p>{{ project.startDate | date }} - {{ project.endDate | date }}</p>
        </div>
        <div class="info-group">
          <label>Orçamento</label>
          <p>{{ project.budget | currency : "BRL" }}</p>
        </div>
        <div class="info-group">
          <label>Status</label>
          <p [class]="'status-' + project.status">{{ project.status }}</p>
        </div>
      </div>
      <div
        class="services-list"
        *ngIf="project.services && project.services.length"
      >
        <h3>Serviços Prestados</h3>
        <table>
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Categoria</th>
              <th>Subcategoria</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>IVA</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let serv of project.services">
              <td>{{ serv.title }}</td>
              <td>{{ serv.category.name }}</td>
              <td>{{ serv.subcategory.name }}</td>
              <td>{{ serv.description }}</td>
              <td>{{ serv.valor | currency : "BRL" }}</td>
              <td>{{ serv.iva | currency : "BRL" }}</td>
            </tr>
          </tbody>
        </table>
        <div class="totals">
          <p>
            <strong>Total dos valores:</strong>
            {{ getTotalValor() | currency : "BRL" }}
          </p>
          <p>
            <strong>Total do IVA:</strong>
            {{ getTotalIva() | currency : "BRL" }}
          </p>
          <p>
            <strong>Total geral (orçamento):</strong>
            {{ project.budget | currency : "BRL" }}
          </p>
        </div>
      </div>
      <button mat-button routerLink="/projects">Voltar</button>
    </div>
    <div *ngIf="!project">
      <p>Projeto não encontrado.</p>
      <button mat-button routerLink="/projects">Voltar</button>
    </div>
  `,
  styles: [
    `
      .project-details-container {
        padding: 20px;
      }

      .project-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .info-group {
        label {
          display: block;
          font-weight: 500;
          color: #666;
          margin-bottom: 5px;
        }

        p {
          margin: 0;
          color: #2c3e50;
        }
      }

      .status-available {
        color: #2e7d32;
      }

      .status-busy {
        color: #ef6c00;
      }

      .status-unavailable {
        color: #c62828;
      }
    `,
  ],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.projectService.getProjectById(id).subscribe((proj) => {
        this.project = proj;
      });
    }
  }

  getTotalValor(): number {
    return this.project?.services?.reduce((sum, s) => sum + s.valor, 0) ?? 0;
  }

  getTotalIva(): number {
    return this.project?.services?.reduce((sum, s) => sum + s.iva, 0) ?? 0;
  }
}

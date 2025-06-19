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
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { Location } from "@angular/common";

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
    MatCardModule,
    MatDividerModule,
  ],
  template: `
    <div class="project-details-container" *ngIf="project">
      <mat-card class="main-card">
        <mat-card-header>
          <mat-card-title>
            <h1>Detalhes do Projeto</h1>
          </mat-card-title>
          <mat-card-subtitle>
            <h2>{{ project.title }}</h2>
            <p class="subtitle">
              Informações completas sobre o projeto e os serviços prestados.
            </p>
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="project-info-grid">
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
              <p>
                {{ project.startDate | date }} - {{ project.endDate | date }}
              </p>
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
            <table class="services-table">
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
              <mat-divider></mat-divider>
              <div class="totals-row">
                <span><strong>Total dos valores:</strong></span>
                <span>{{ getTotalValor() | currency : "BRL" }}</span>
              </div>
              <div class="totals-row">
                <span><strong>Total do IVA:</strong></span>
                <span>{{ getTotalIva() | currency : "BRL" }}</span>
              </div>
              <div class="totals-row total-orcamento">
                <span><strong>Total geral (orçamento):</strong></span>
                <span>{{ project.budget | currency : "BRL" }}</span>
              </div>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-stroked-button color="primary" (click)="goBack()">
            Voltar
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    <div *ngIf="!project">
      <p>Projeto não encontrado.</p>
      <button mat-button routerLink="/projects">Voltar</button>
    </div>
  `,
  styles: [
    `
      .main-card {
        max-width: 1200px;
        width: 100%;
        margin: 32px auto;
        padding: 0;
        box-sizing: border-box;
      }
      @media (max-width: 900px) {
        .main-card {
          margin: 16px;
          padding-left: 8px;
          padding-right: 8px;
        }
      }
      .project-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 24px;
        margin-bottom: 32px;
      }
      @media (max-width: 600px) {
        .project-info-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
      }
      .info-group label {
        font-weight: 600;
        color: #666;
        margin-bottom: 4px;
        display: block;
      }
      .info-group p {
        margin: 0;
        color: #2c3e50;
      }
      .services-list {
        margin-top: 32px;
      }
      .services-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 16px;
      }
      .services-table th,
      .services-table td {
        border: 1px solid #e0e0e0;
        padding: 8px 12px;
        text-align: left;
      }
      .services-table th {
        background: #f5f5f5;
        font-weight: 600;
      }
      .totals {
        margin-top: 16px;
      }
      .totals-row {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
      }
      .total-orcamento {
        font-size: 1.1em;
        font-weight: bold;
        color: #1976d2;
      }
      .subtitle {
        color: #888;
        margin-bottom: 16px;
      }
      h1 {
        margin-bottom: 0;
        font-size: 2.2em;
        color: #1976d2;
      }
      h2 {
        margin: 0 0 8px 0;
        font-size: 1.4em;
        color: #333;
      }
      h3 {
        margin-top: 24px;
        color: #1976d2;
      }
    `,
  ],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
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

  goBack() {
    this.location.back();
  }
}

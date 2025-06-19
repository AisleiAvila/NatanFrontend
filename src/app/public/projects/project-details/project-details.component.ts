import { Component, Inject } from "@angular/core";
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
    <div class="project-details-container">
      <h2 mat-dialog-title>{{ "projects.details.title" | translate }}</h2>

      <mat-dialog-content>
        <div class="project-info">
          <div class="info-group">
            <label>{{ "projects.details.category" | translate }}</label>
            <p>{{ data.category.name }}</p>
          </div>

          <div class="info-group">
            <label>{{ "projects.details.subcategory" | translate }}</label>
            <p>{{ data.subcategory.name }}</p>
          </div>

          <div class="info-group">
            <label>{{ "projects.details.client" | translate }}</label>
            <p>{{ data.client.name }}</p>
          </div>

          <div class="info-group">
            <label>{{ "projects.details.provider" | translate }}</label>
            <p>{{ data.provider.name }}</p>
          </div>

          <div class="info-group">
            <label>{{ "projects.details.region" | translate }}</label>
            <p>{{ data.region.name }}</p>
          </div>

          <div class="info-group">
            <label>{{ "projects.details.budget" | translate }}</label>
            <p>{{ data.budget | currency : "BRL" }}</p>
          </div>

          <div class="info-group">
            <label>{{ "projects.details.status" | translate }}</label>
            <p [class]="'status-' + data.status">
              {{ "projects.status." + data.status | translate }}
            </p>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onClose()">
          {{ "common.close" | translate }}
        </button>
      </mat-dialog-actions>
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
export class ProjectDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

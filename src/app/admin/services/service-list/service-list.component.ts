import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ServiceService } from "../../../core/services/service.service";
import { Service } from "../../../core/models/service.model";

@Component({
  selector: "app-service-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
  ],
  template: `
    <div class="service-list-container">
      <div class="header">
        <h1>{{ "admin.services.title" | translate }}</h1>
        <button mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon>
          {{ "admin.services.new" | translate }}
        </button>
      </div>

      <table mat-table [dataSource]="services" class="mat-elevation-z8">
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>
            {{ "admin.services.category" | translate }}
          </th>
          <td mat-cell *matCellDef="let service">
            {{ service.category.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="subcategory">
          <th mat-header-cell *matHeaderCellDef>
            {{ "admin.services.subcategory" | translate }}
          </th>
          <td mat-cell *matCellDef="let service">
            {{ service.subcategory.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="client">
          <th mat-header-cell *matHeaderCellDef>
            {{ "admin.services.client" | translate }}
          </th>
          <td mat-cell *matCellDef="let service">{{ service.client.name }}</td>
        </ng-container>

        <ng-container matColumnDef="provider">
          <th mat-header-cell *matHeaderCellDef>
            {{ "admin.services.provider" | translate }}
          </th>
          <td mat-cell *matCellDef="let service">
            {{ service.provider.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>
            {{ "admin.services.price" | translate }}
          </th>
          <td mat-cell *matCellDef="let service">
            {{ service.price | currency : "BRL" }}
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>
            {{ "admin.services.status" | translate }}
          </th>
          <td mat-cell *matCellDef="let service">
            <span [class]="'status-' + service.status">
              {{ "admin.services.status_" + service.status | translate }}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>
            {{ "admin.services.actions" | translate }}
          </th>
          <td mat-cell *matCellDef="let service">
            <button
              mat-icon-button
              [matTooltip]="'admin.services.edit' | translate"
              routerLink="{{ service.id }}"
            >
              <mat-icon>edit</mat-icon>
            </button>
            <button
              mat-icon-button
              color="warn"
              [matTooltip]="'admin.services.delete' | translate"
              (click)="deleteService(service)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .service-list-container {
        padding: 20px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h1 {
          margin: 0;
        }
      }

      table {
        width: 100%;
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
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  displayedColumns: string[] = [
    "category",
    "subcategory",
    "client",
    "provider",
    "price",
    "status",
    "actions",
  ];

  constructor(
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error("Error loading services:", error);
        this.showError("admin.services.error.loading");
      },
    });
  }

  deleteService(service: Service): void {
    if (confirm(this.translate.instant("admin.services.confirm_delete"))) {
      this.serviceService.deleteService(service.id).subscribe({
        next: () => {
          this.services = this.services.filter((s) => s.id !== service.id);
          this.showSuccess("admin.services.success.delete");
        },
        error: (error) => {
          console.error("Error deleting service:", error);
          this.showError("admin.services.error.delete");
        },
      });
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(
      this.translate.instant(message),
      this.translate.instant("common.close"),
      { duration: 3000 }
    );
  }

  private showError(message: string): void {
    this.snackBar.open(
      this.translate.instant(message),
      this.translate.instant("common.close"),
      { duration: 5000 }
    );
  }
}

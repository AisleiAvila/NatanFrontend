import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RegionService } from "../../../core/services/region.service";
import { Region } from "../../../core/models/region.model";

@Component({
  selector: "app-region-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  template: `
    <div class="region-list-container">
      <div class="header">
        <h1>{{ "regions.title" | translate }}</h1>
        <button mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon>
          {{ "regions.add" | translate }}
        </button>
      </div>

      <div class="content">
        <mat-card>
          <mat-card-content>
            <div class="loading-container" *ngIf="loading">
              <mat-spinner></mat-spinner>
              <p>{{ "common.loading" | translate }}</p>
            </div>

            <div class="regions-list" *ngIf="!loading">
              <div class="list-header">
                <div class="header-name">{{ "regions.name" | translate }}</div>
                <div class="header-actions">
                  {{ "common.actions" | translate }}
                </div>
              </div>

              <mat-list>
                <mat-list-item
                  *ngFor="let region of regions"
                  class="region-item"
                >
                  <div class="region-content">
                    <div class="region-name">{{ region.name }}</div>
                    <div class="region-actions">
                      <button
                        mat-icon-button
                        [routerLink]="[region.id, 'edit']"
                      >
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button
                        mat-icon-button
                        color="warn"
                        (click)="deleteRegion(region)"
                      >
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>
                </mat-list-item>
              </mat-list>

              <div class="no-regions" *ngIf="!regions.length">
                <p>{{ "regions.no_regions" | translate }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .region-list-container {
        padding: 2rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
          margin: 0;
        }
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;

        p {
          margin-top: 1rem;
        }
      }

      .list-header {
        display: grid;
        grid-template-columns: 1fr auto;
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin-bottom: 1rem;
        font-weight: 500;
      }

      .region-item {
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }
      }

      .region-content {
        display: grid;
        grid-template-columns: 1fr auto;
        width: 100%;
        align-items: center;
      }

      .region-actions {
        display: flex;
        gap: 0.5rem;
      }

      .no-regions {
        text-align: center;
        padding: 2rem;
        color: #666;
      }
    `,
  ],
})
export class RegionListComponent implements OnInit {
  regions: Region[] = [];
  loading = true;

  constructor(
    private regionService: RegionService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadRegions();
  }

  private loadRegions(): void {
    this.loading = true;
    this.regionService.getRegions().subscribe({
      next: (regions) => {
        this.regions = regions;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erro ao carregar regiões:", error);
        this.loading = false;
        this.showError("regions.error.loading");
      },
    });
  }

  deleteRegion(region: Region): void {
    if (confirm(this.translate.instant("regions.confirm_delete"))) {
      this.regionService.deleteRegion(region.id).subscribe({
        next: () => {
          this.regions = this.regions.filter((r) => r.id !== region.id);
          this.showSuccess("regions.success.delete");
        },
        error: (error) => {
          console.error("Erro ao deletar região:", error);
          this.showError("regions.error.delete");
        },
      });
    }
  }

  private showError(message: string): void {
    this.snackBar.open(
      this.translate.instant(message),
      this.translate.instant("common.close"),
      { duration: 5000 }
    );
  }

  private showSuccess(message: string): void {
    this.snackBar.open(
      this.translate.instant(message),
      this.translate.instant("common.close"),
      { duration: 5000 }
    );
  }
}

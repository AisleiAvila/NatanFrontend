import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CategoryService } from "../../../core/services/category.service";
import { Category } from "../../../core/models/category.model";

@Component({
  selector: "app-category-details",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  template: `
    <div class="category-details-container">
      <div class="header" *ngIf="!loading">
        <h1>{{ category?.name }}</h1>
        <p>{{ category?.description }}</p>
      </div>

      <div class="content" *ngIf="!loading">
        <mat-card class="subcategories-card">
          <mat-card-header>
            <mat-card-title>{{
              "categories.subcategories" | translate
            }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div
              class="subcategories-list"
              *ngIf="category?.subcategories?.length"
            >
              <div
                class="subcategory-item"
                *ngFor="let subcategory of category?.subcategories"
              >
                <h3>{{ subcategory.name }}</h3>
                <p>{{ subcategory.description }}</p>
              </div>
            </div>
            <div
              class="no-subcategories"
              *ngIf="!category?.subcategories?.length"
            >
              <p>{{ "categories.no_subcategories" | translate }}</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="services-card">
          <mat-card-header>
            <mat-card-title>{{
              "categories.services" | translate
            }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="services-list" *ngIf="category?.services?.length">
              <div
                class="service-item"
                *ngFor="let service of category?.services"
              >
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
                <div class="service-meta">
                  <span class="price">{{
                    service.price | currency : "BRL"
                  }}</span>
                  <span class="status" [class]="service.status">
                    {{ "services.status_" + service.status | translate }}
                  </span>
                </div>
              </div>
            </div>
            <div class="no-services" *ngIf="!category?.services?.length">
              <p>{{ "categories.no_services" | translate }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="loading-container" *ngIf="loading">
        <mat-spinner></mat-spinner>
        <p>{{ "common.loading" | translate }}</p>
      </div>

      <div class="error-container" *ngIf="error">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h3>{{ "categories.error.not_found" | translate }}</h3>
        <p>{{ "categories.error.not_found_message" | translate }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .category-details-container {
        padding: 2rem 0;
        background-color: #f8f9fa;
      }

      .header {
        text-align: center;
        margin-bottom: 2rem;
        padding: 0 1rem;

        h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
          color: #666;
          max-width: 800px;
          margin: 0 auto;
        }
      }

      .content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: grid;
        gap: 2rem;
      }

      .subcategories-card,
      .services-card {
        mat-card-header {
          margin-bottom: 1rem;
        }

        mat-card-title {
          font-size: 1.5rem;
          color: #2c3e50;
        }
      }

      .subcategories-list,
      .services-list {
        display: grid;
        gap: 1rem;
      }

      .subcategory-item,
      .service-item {
        padding: 1rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

        h3 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        p {
          color: #666;
          margin-bottom: 1rem;
        }
      }

      .service-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          font-weight: 600;
          color: #2196f3;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;

          &.available {
            background-color: #e8f5e9;
            color: #2e7d32;
          }

          &.busy {
            background-color: #fff3e0;
            color: #ef6c00;
          }

          &.unavailable {
            background-color: #ffebee;
            color: #c62828;
          }
        }
      }

      .no-subcategories,
      .no-services {
        text-align: center;
        padding: 2rem;
        color: #666;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;

        p {
          margin-top: 1rem;
          color: #666;
        }
      }

      .error-container {
        text-align: center;
        padding: 3rem;

        .error-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          color: #f44336;
          margin-bottom: 1rem;
        }

        h3 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        p {
          color: #666;
          margin-bottom: 1.5rem;
        }
      }
    `,
  ],
})
export class CategoryDetailsComponent implements OnInit {
  category: Category | null = null;
  loading = true;
  error = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.loadCategory(id);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  private loadCategory(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.category = category;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading category:", error);
        this.loading = false;
        this.error = true;
        this.showError("categories.error.loading");
      },
    });
  }

  private showError(message: string): void {
    this.snackBar.open(
      this.translate.instant(message),
      this.translate.instant("common.close"),
      { duration: 5000 }
    );
  }
}

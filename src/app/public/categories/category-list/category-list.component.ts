import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CategoryService } from "../../../core/services/category.service";
import { Category } from "../../../core/models/category.model";

@Component({
  selector: "app-category-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  template: `
    <div class="categories-container">
      <div class="header">
        <h1>{{ "categories.title" | translate }}</h1>
        <p>{{ "categories.subtitle" | translate }}</p>
      </div>

      <div class="categories-grid" *ngIf="!loading">
        <mat-card
          *ngFor="let category of categories"
          class="category-card"
          [routerLink]="[category.id]"
        >
          <mat-card-header>
            <mat-card-title>{{ category.name }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ category.description }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">
              {{ "categories.view_details" | translate }}
              <mat-icon>arrow_forward</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div class="loading-container" *ngIf="loading">
        <mat-spinner></mat-spinner>
        <p>{{ "common.loading" | translate }}</p>
      </div>

      <div class="no-results" *ngIf="!loading && categories.length === 0">
        <mat-icon class="no-results-icon">category</mat-icon>
        <h3>{{ "categories.no_results_title" | translate }}</h3>
        <p>{{ "categories.no_results_message" | translate }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .categories-container {
        padding: 2rem 0;
        background-color: #f8f9fa;
      }

      .header {
        text-align: center;
        margin-bottom: 2rem;

        h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
          color: #666;
        }
      }

      .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 0 1rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .category-card {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        mat-card-header {
          margin-bottom: 1rem;
        }

        mat-card-title {
          font-size: 1.5rem;
          color: #2c3e50;
        }

        mat-card-content {
          p {
            color: #666;
            margin-bottom: 1rem;
          }
        }

        mat-card-actions {
          display: flex;
          justify-content: flex-end;
          padding: 0.5rem;

          button {
            mat-icon {
              margin-left: 0.5rem;
            }
          }
        }
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

      .no-results {
        text-align: center;
        padding: 3rem;

        .no-results-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          color: #bdbdbd;
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
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error("Erro ao carregar categorias:", error);
        this.loading = false;
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

import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ServiceService } from "../../../core/services/service.service";
import { CategoryService } from "../../../core/services/category.service";
import { Service } from "../../../core/models/service.model";
import { Category } from "../../../core/models/category.model";

@Component({
  selector: "app-service-form",
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
    TranslateModule,
  ],
  template: `
    <div class="service-form-container">
      <h1>
        {{
          (isEditMode ? "admin.services.edit" : "admin.services.new")
            | translate
        }}
      </h1>

      <form [formGroup]="serviceForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.services.category" | translate }}</mat-label>
          <mat-select formControlName="categoryId">
            <mat-option
              *ngFor="let category of categories"
              [value]="category.id"
            >
              {{ category.name }}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="serviceForm.get('categoryId')?.hasError('required')"
          >
            {{ "admin.services.error.category_required" | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.services.subcategory" | translate }}</mat-label>
          <mat-select formControlName="subcategoryId">
            <mat-option
              *ngFor="let subcategory of subcategories"
              [value]="subcategory.id"
            >
              {{ subcategory.name }}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="serviceForm.get('subcategoryId')?.hasError('required')"
          >
            {{ "admin.services.error.subcategory_required" | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.services.client" | translate }}</mat-label>
          <mat-select formControlName="clientId">
            <mat-option *ngFor="let client of clients" [value]="client.id">
              {{ client.name }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="serviceForm.get('clientId')?.hasError('required')">
            {{ "admin.services.error.client_required" | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.services.provider" | translate }}</mat-label>
          <mat-select formControlName="providerId">
            <mat-option
              *ngFor="let provider of providers"
              [value]="provider.id"
            >
              {{ provider.name }}
            </mat-option>
          </mat-select>
          <mat-error
            *ngIf="serviceForm.get('providerId')?.hasError('required')"
          >
            {{ "admin.services.error.provider_required" | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.services.price" | translate }}</mat-label>
          <input
            matInput
            type="number"
            formControlName="price"
            min="0"
            step="0.01"
          />
          <mat-error *ngIf="serviceForm.get('price')?.hasError('required')">
            {{ "admin.services.error.price_required" | translate }}
          </mat-error>
          <mat-error *ngIf="serviceForm.get('price')?.hasError('min')">
            {{ "admin.services.error.price_min" | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.services.status" | translate }}</mat-label>
          <mat-select formControlName="status">
            <mat-option value="available">{{
              "admin.services.status_available" | translate
            }}</mat-option>
            <mat-option value="busy">{{
              "admin.services.status_busy" | translate
            }}</mat-option>
            <mat-option value="unavailable">{{
              "admin.services.status_unavailable" | translate
            }}</mat-option>
          </mat-select>
          <mat-error *ngIf="serviceForm.get('status')?.hasError('required')">
            {{ "admin.services.error.status_required" | translate }}
          </mat-error>
        </mat-form-field>

        <div class="form-actions">
          <button mat-button type="button" (click)="onCancel()">
            {{ "common.cancel" | translate }}
          </button>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="serviceForm.invalid"
          >
            {{ (isEditMode ? "common.save" : "common.create") | translate }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .service-form-container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;

        h1 {
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 16px;
        }
      }
    `,
  ],
})
export class ServiceFormComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode = false;
  categories: Category[] = [];
  subcategories: Category[] = [];
  clients: any[] = [];
  providers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.serviceForm = this.fb.group({
      categoryId: ["", Validators.required],
      subcategoryId: ["", Validators.required],
      clientId: ["", Validators.required],
      providerId: ["", Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      status: ["available", Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.loadService(id);
    }
    this.loadCategories();
    this.loadClients();
    this.loadProviders();
  }

  private loadService(id: string): void {
    this.serviceService.getServiceById(id).subscribe({
      next: (service) => {
        this.serviceForm.patchValue({
          categoryId: service.category.id,
          subcategoryId: service.subcategory.id,
          clientId: service.client.id,
          providerId: service.provider.id,
          price: service.price,
          status: service.status,
        });
      },
      error: (error) => {
        console.error("Error loading service:", error);
        this.showError("admin.services.error.loading");
        this.router.navigate(["/admin/services"]);
      },
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error("Error loading categories:", error);
        this.showError("admin.services.error.loading_categories");
      },
    });
  }

  private loadClients(): void {
    // TODO: Implement client service
    this.clients = [];
  }

  private loadProviders(): void {
    // TODO: Implement provider service
    this.providers = [];
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      const id = this.route.snapshot.paramMap.get("id");

      const request = id
        ? this.serviceService.updateService(id, serviceData)
        : this.serviceService.createService(serviceData);

      request.subscribe({
        next: () => {
          this.showSuccess(
            id
              ? "admin.services.success.update"
              : "admin.services.success.create"
          );
          this.router.navigate(["/admin/services"]);
        },
        error: (error) => {
          console.error("Error saving service:", error);
          this.showError(
            id ? "admin.services.error.update" : "admin.services.error.create"
          );
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(["/admin/services"]);
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

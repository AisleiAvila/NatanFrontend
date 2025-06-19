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
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RegionService } from "../../../core/services/region.service";
import { Region } from "../../../core/models/region.model";

@Component({
  selector: "app-region-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  template: `
    <div class="region-form-container">
      <h1>
        {{
          (isEditMode ? "admin.regions.edit" : "admin.regions.new") | translate
        }}
      </h1>

      <form [formGroup]="regionForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.regions.name" | translate }}</mat-label>
          <input matInput formControlName="name" required />
          <mat-error *ngIf="regionForm.get('name')?.hasError('required')">
            {{ "admin.regions.error.name_required" | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ "admin.regions.code" | translate }}</mat-label>
          <input matInput formControlName="code" required />
          <mat-error *ngIf="regionForm.get('code')?.hasError('required')">
            {{ "admin.regions.error.code_required" | translate }}
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
            [disabled]="regionForm.invalid"
          >
            {{ (isEditMode ? "common.save" : "common.create") | translate }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .region-form-container {
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
export class RegionFormComponent implements OnInit {
  regionForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private regionService: RegionService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.regionForm = this.fb.group({
      name: ["", Validators.required],
      code: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.loadRegion(id);
    }
  }

  private loadRegion(id: string): void {
    this.regionService.getRegionById(id).subscribe({
      next: (region) => {
        this.regionForm.patchValue({
          name: region.name,
          code: region.code,
        });
      },
      error: (error) => {
        console.error("Error loading region:", error);
        this.showError("admin.regions.error.loading");
        this.router.navigate(["/admin/regions"]);
      },
    });
  }

  onSubmit(): void {
    if (this.regionForm.valid) {
      const regionData = this.regionForm.value;
      const id = this.route.snapshot.paramMap.get("id");

      const request = id
        ? this.regionService.updateRegion(id, regionData)
        : this.regionService.createRegion(regionData);

      request.subscribe({
        next: () => {
          this.showSuccess(
            id ? "admin.regions.success.update" : "admin.regions.success.create"
          );
          this.router.navigate(["/admin/regions"]);
        },
        error: (error) => {
          console.error("Error saving region:", error);
          this.showError(
            id ? "admin.regions.error.update" : "admin.regions.error.create"
          );
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(["/admin/regions"]);
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

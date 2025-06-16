import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Subcategory } from "../../../core/models/subcategory.model";
import { Category } from "../../../core/models/category.model";
import { SubcategoryService } from "../../../core/services/subcategory.service";
import { CategoryService } from "../../../core/services/category.service";

@Component({
  selector: "app-subcategory-form",
  templateUrl: "./subcategory-form.component.html",
  styleUrls: ["./subcategory-form.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
})
export class SubcategoryFormComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  loading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubcategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subcategory,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: ["", [Validators.maxLength(500)]],
      categoryId: ["", Validators.required],
      isActive: [true],
    });

    if (data) {
      this.isEditMode = true;
      this.form.patchValue({
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        isActive: data.isActive,
      });
    }
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erro ao carregar categorias:", error);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const subcategoryData = this.form.value;

      const request = this.isEditMode
        ? this.subcategoryService.update(this.data.id!, subcategoryData)
        : this.subcategoryService.create(subcategoryData);

      request.subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error("Erro ao salvar subcategoria:", error);
          this.loading = false;
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

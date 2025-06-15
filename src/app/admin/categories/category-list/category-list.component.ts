import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Category } from "../../../core/models/category.model";
import { CategoryService } from "../../../core/services/category.service";
import { CategoryFormComponent } from "../category-form/category-form.component";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = [
    "name",
    "description",
    "status",
    "featured",
    "actions",
  ];
  loading = false;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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
        this.snackBar.open("Erro ao carregar categorias", "Fechar", {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  openCategoryForm(category?: Category): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: "600px",
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  toggleStatus(category: Category): void {
    this.categoryService
      .toggleStatus(category.id!, !category.isActive)
      .subscribe({
        next: () => {
          this.loadCategories();
          this.snackBar.open(
            `Categoria ${
              category.isActive ? "desativada" : "ativada"
            } com sucesso`,
            "Fechar",
            { duration: 3000 }
          );
        },
        error: (error) => {
          console.error("Erro ao alterar status:", error);
          this.snackBar.open("Erro ao alterar status da categoria", "Fechar", {
            duration: 3000,
          });
        },
      });
  }

  toggleFeatured(category: Category): void {
    const newFeaturedOrder = category.isFeatured ? undefined : 1;
    this.categoryService
      .updateFeaturedStatus(
        category.id!,
        !category.isFeatured,
        newFeaturedOrder
      )
      .subscribe({
        next: () => {
          this.loadCategories();
          this.snackBar.open(
            `Categoria ${
              category.isFeatured ? "removida do" : "adicionada ao"
            } destaque`,
            "Fechar",
            { duration: 3000 }
          );
        },
        error: (error) => {
          console.error("Erro ao alterar destaque:", error);
          this.snackBar.open(
            "Erro ao alterar destaque da categoria",
            "Fechar",
            { duration: 3000 }
          );
        },
      });
  }

  deleteCategory(category: Category): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmar exclusão",
        message: `Tem certeza que deseja excluir a categoria "${category.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.delete(category.id!).subscribe({
          next: () => {
            this.loadCategories();
            this.snackBar.open("Categoria excluída com sucesso", "Fechar", {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error("Erro ao excluir categoria:", error);
            this.snackBar.open("Erro ao excluir categoria", "Fechar", {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}

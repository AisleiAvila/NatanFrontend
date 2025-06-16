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
import { Subcategory } from "../../../core/models/subcategory.model";
import { SubcategoryService } from "../../../core/services/subcategory.service";
import { SubcategoryFormComponent } from "../subcategory-form/subcategory-form.component";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-subcategory-list",
  templateUrl: "./subcategory-list.component.html",
  styleUrls: ["./subcategory-list.component.scss"],
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
export class SubcategoryListComponent implements OnInit {
  subcategories: Subcategory[] = [];
  displayedColumns: string[] = [
    "name",
    "description",
    "category",
    "status",
    "actions",
  ];
  loading = false;

  constructor(
    private subcategoryService: SubcategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this.loading = true;
    this.subcategoryService.getAll().subscribe({
      next: (subcategories) => {
        this.subcategories = subcategories;
        this.loading = false;
      },
      error: (error) => {
        console.error("Erro ao carregar subcategorias:", error);
        this.snackBar.open("Erro ao carregar subcategorias", "Fechar", {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  openSubcategoryForm(subcategory?: Subcategory): void {
    const dialogRef = this.dialog.open(SubcategoryFormComponent, {
      width: "600px",
      data: subcategory,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSubcategories();
      }
    });
  }

  toggleStatus(subcategory: Subcategory): void {
    this.subcategoryService
      .toggleStatus(subcategory.id!, !subcategory.isActive)
      .subscribe({
        next: () => {
          this.loadSubcategories();
          this.snackBar.open(
            `Subcategoria ${
              subcategory.isActive ? "desativada" : "ativada"
            } com sucesso`,
            "Fechar",
            { duration: 3000 }
          );
        },
        error: (error) => {
          console.error("Erro ao alterar status:", error);
          this.snackBar.open(
            "Erro ao alterar status da subcategoria",
            "Fechar",
            {
              duration: 3000,
            }
          );
        },
      });
  }

  deleteSubcategory(subcategory: Subcategory): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmar exclusão",
        message: `Tem certeza que deseja excluir a subcategoria "${subcategory.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subcategoryService.delete(subcategory.id!).subscribe({
          next: () => {
            this.loadSubcategories();
            this.snackBar.open("Subcategoria excluída com sucesso", "Fechar", {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error("Erro ao excluir subcategoria:", error);
            this.snackBar.open("Erro ao excluir subcategoria", "Fechar", {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}

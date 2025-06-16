import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Category, CategoryFormData } from "../models/category.model";
import { environment } from "../../../environments/environment";
import { MOCK_CATEGORIES } from "./mock/category.mock";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;
  private mockData = [...MOCK_CATEGORIES];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    // Simulando delay da API
    return of(this.mockData);
  }

  getById(id: number): Observable<Category> {
    const category = this.mockData.find((c) => c.id === id);
    return of(category!);
  }

  create(category: CategoryFormData): Observable<Category> {
    const newCategory: Category = {
      id: this.mockData.length + 1,
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockData.push(newCategory);
    return of(newCategory);
  }

  update(id: number, category: CategoryFormData): Observable<Category> {
    const index = this.mockData.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Categoria não encontrada");
    }
    this.mockData[index] = {
      ...this.mockData[index],
      ...category,
      updatedAt: new Date(),
    };
    return of(this.mockData[index]);
  }

  delete(id: number): Observable<void> {
    const index = this.mockData.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Categoria não encontrada");
    }
    this.mockData.splice(index, 1);
    return of(void 0);
  }

  toggleStatus(id: number, isActive: boolean): Observable<Category> {
    const index = this.mockData.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Categoria não encontrada");
    }
    this.mockData[index] = {
      ...this.mockData[index],
      isActive,
      updatedAt: new Date(),
    };
    return of(this.mockData[index]);
  }

  updateFeaturedStatus(
    id: number,
    isFeatured: boolean,
    featuredOrder?: number
  ): Observable<Category> {
    const index = this.mockData.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Categoria não encontrada");
    }
    this.mockData[index] = {
      ...this.mockData[index],
      isFeatured,
      featuredOrder,
      updatedAt: new Date(),
    };
    return of(this.mockData[index]);
  }
}

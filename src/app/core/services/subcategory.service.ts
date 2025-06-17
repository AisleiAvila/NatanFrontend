import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { Subcategory, SubcategoryFormData } from "../models/subcategory.model";
import { MOCK_SUBCATEGORIES } from "../mocks/subcategories.mock";

@Injectable({
  providedIn: "root",
})
export class SubcategoryService {
  private apiUrl = `${environment.apiUrl}/subcategories`;
  private mockData = [...MOCK_SUBCATEGORIES];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Subcategory[]> {
    // Simulando delay da API
    return of(this.mockData);
  }

  getById(id: number): Observable<Subcategory> {
    const subcategory = this.mockData.find((s) => s.id === id);
    return of(subcategory!);
  }

  create(subcategory: SubcategoryFormData): Observable<Subcategory> {
    const newSubcategory: Subcategory = {
      id: this.mockData.length + 1,
      ...subcategory,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockData.push(newSubcategory);
    return of(newSubcategory);
  }

  update(
    id: number,
    subcategory: SubcategoryFormData
  ): Observable<Subcategory> {
    const index = this.mockData.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Subcategoria não encontrada");
    }
    this.mockData[index] = {
      ...this.mockData[index],
      ...subcategory,
      updatedAt: new Date(),
    };
    return of(this.mockData[index]);
  }

  delete(id: number): Observable<void> {
    const index = this.mockData.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Subcategoria não encontrada");
    }
    this.mockData.splice(index, 1);
    return of(void 0);
  }

  toggleStatus(id: number, isActive: boolean): Observable<Subcategory> {
    const index = this.mockData.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Subcategoria não encontrada");
    }
    this.mockData[index] = {
      ...this.mockData[index],
      isActive,
      updatedAt: new Date(),
    };
    return of(this.mockData[index]);
  }
}

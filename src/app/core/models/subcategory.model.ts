export interface Subcategory {
  id?: number;
  name: string;
  description?: string;
  isActive: boolean;
  categoryId: number;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubcategoryFormData {
  name: string;
  description?: string;
  isActive: boolean;
  categoryId: number;
}

import { Category } from "./category.model";

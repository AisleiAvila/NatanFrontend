export interface Category {
  id?: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  isActive: boolean;
}

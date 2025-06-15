export interface Category {
  id?: number;
  name: string;
  description?: string;
  isActive: boolean;
  isFeatured: boolean;
  featuredOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  isActive: boolean;
  isFeatured: boolean;
  featuredOrder?: number;
}

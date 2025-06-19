export interface Category {
  id?: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  subcategories?: Subcategory[];
  services?: Service[];
}

export interface Subcategory {
  id?: number;
  name: string;
  description?: string;
}

export interface Service {
  id?: number;
  title: string;
  description?: string;
  price: number;
  status: "available" | "busy" | "unavailable";
}

export interface CategoryFormData {
  name: string;
  description?: string;
  isActive: boolean;
}

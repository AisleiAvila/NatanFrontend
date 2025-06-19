import { Category } from "./category.model";
import { Subcategory } from "./subcategory.model";

export interface Client {
  id: string;
  name: string;
}

export interface Provider {
  id: string;
  name: string;
}

export interface ProjectServiceItem {
  id: string;
  title: string;
  category: Category;
  subcategory: Subcategory;
  description?: string;
  valor: number;
  iva: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  client: Client;
  provider: Provider;
  status: "available" | "busy" | "unavailable";
  startDate: string;
  endDate?: string;
  budget: number;
  services?: ProjectServiceItem[];
}

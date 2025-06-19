export interface Service {
  id: string;
  category: {
    id: string;
    name: string;
  };
  subcategory: {
    id: string;
    name: string;
  };
  client: {
    id: string;
    name: string;
  };
  provider: {
    id: string;
    name: string;
  };
  price: number;
  status: "available" | "busy" | "unavailable";
  createdAt: Date;
  updatedAt: Date;
}

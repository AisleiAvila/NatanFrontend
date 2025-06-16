import { Category } from "../../models/category.model";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Construção Civil",
    description: "Serviços relacionados à construção e reforma de edificações",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Elétrica",
    description: "Instalações e manutenção elétrica residencial e comercial",
    isActive: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: 3,
    name: "Hidráulica",
    description: "Instalações e reparos hidráulicos",
    isActive: true,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: 4,
    name: "Pintura",
    description: "Serviços de pintura interna e externa",
    isActive: false,
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
  {
    id: 5,
    name: "Acabamento",
    description: "Serviços de acabamento e revestimento",
    isActive: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
];

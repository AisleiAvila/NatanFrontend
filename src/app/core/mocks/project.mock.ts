import { Client, Provider, Project } from "../models/project.model";
import { Category } from "../models/category.model";
import { Subcategory } from "../models/subcategory.model";

export const MOCK_CLIENTS: Client[] = [
  { id: "1", name: "Empresa ABC Ltda" },
  { id: "2", name: "Construtora XYZ" },
  { id: "3", name: "Incorporadora 123" },
  { id: "4", name: "Empreendimentos Silva" },
  { id: "5", name: "Grupo Construções" },
];

export const MOCK_PROVIDERS: Provider[] = [
  { id: "1", name: "João Construções" },
  { id: "2", name: "Maria Engenharia" },
  { id: "3", name: "Pedro Arquitetura" },
  { id: "4", name: "Ana Projetos" },
  { id: "5", name: "Carlos Reformas" },
];

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Montagem", isActive: true },
  { id: 2, name: "Hidráulica", isActive: true },
];

const MOCK_SUBCATEGORIES: Subcategory[] = [
  {
    id: 1,
    name: "Montagem de Móveis",
    isActive: true,
    isFeatured: false,
    categoryId: 1,
  },
  {
    id: 2,
    name: "Conserto de Vazamento",
    isActive: true,
    isFeatured: false,
    categoryId: 2,
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Reforma Residencial",
    description: "Reforma completa de apartamento de 120m²",
    client: MOCK_CLIENTS[0],
    provider: MOCK_PROVIDERS[0],
    status: "available",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    budget: 75000,
    services: [
      {
        id: "1",
        title: "Montagem de móvel",
        category: MOCK_CATEGORIES[0],
        subcategory: MOCK_SUBCATEGORIES[0],
        description: "Montagem de armário planejado na sala.",
        valor: 500,
        iva: 115,
      },
      {
        id: "2",
        title: "Conserto de vazamento na pia",
        category: MOCK_CATEGORIES[1],
        subcategory: MOCK_SUBCATEGORIES[1],
        description: "Reparo no encanamento da pia da cozinha.",
        valor: 300,
        iva: 69,
      },
    ],
  },
  {
    id: "2",
    title: "Construção Comercial",
    description: "Construção de loja em shopping center",
    client: MOCK_CLIENTS[1],
    provider: MOCK_PROVIDERS[1],
    status: "busy",
    startDate: "2024-03-15",
    endDate: "2024-08-30",
    budget: 150000,
  },
  {
    id: "3",
    title: "Projeto Residencial",
    description: "Projeto arquitetônico para casa de alto padrão",
    client: MOCK_CLIENTS[2],
    provider: MOCK_PROVIDERS[2],
    status: "available",
    startDate: "2024-05-01",
    endDate: "2024-07-31",
    budget: 45000,
  },
  {
    id: "4",
    title: "Reforma Comercial",
    description: "Reforma de escritório corporativo",
    client: MOCK_CLIENTS[3],
    provider: MOCK_PROVIDERS[3],
    status: "unavailable",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    budget: 95000,
  },
];

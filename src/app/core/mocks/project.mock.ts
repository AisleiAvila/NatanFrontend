import { Client, Provider, Project } from "../models/project.model";

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

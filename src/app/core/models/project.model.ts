export interface Client {
  id: string;
  name: string;
}

export interface Provider {
  id: string;
  name: string;
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
}

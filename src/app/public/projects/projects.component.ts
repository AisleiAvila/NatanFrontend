import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { TranslateModule } from "@ngx-translate/core";
import { Project, Client, Provider } from "../../core/models/project.model";
import { ProjectService } from "../../core/services/project.service";

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
  ],
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Project>([]);
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  searchTerm = "";
  selectedStatus = "";
  selectedClient = "";
  selectedProvider = "";
  startDate: Date | null = null;
  endDate: Date | null = null;
  minBudget: number | null = null;
  maxBudget: number | null = null;

  clients: Client[] = [];
  providers: Provider[] = [];

  displayedColumns: string[] = [
    "title",
    "client",
    "status",
    "provider",
    "period",
    "budget",
    "actions",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private projectService: ProjectService) {
    console.log("ProjectsComponent constructor");
  }

  ngOnInit(): void {
    console.log("ProjectsComponent ngOnInit");
    this.loadProjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Configurar funções de ordenação personalizadas
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "title":
          return item.title.toLowerCase();
        case "client":
          return item.client.name.toLowerCase();
        case "provider":
          return item.provider.name.toLowerCase();
        case "period":
          return new Date(item.startDate).getTime();
        case "budget":
          return item.budget;
        default:
          return (item as any)[property];
      }
    };
  }

  private loadProjects(): void {
    console.log("Loading projects...");
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        console.log("Projects loaded:", projects);
        this.projects = projects;
        this.extractClientsAndProviders();
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error("Erro ao carregar projetos:", error);
        this.loading = false;
      },
    });
  }

  private extractClientsAndProviders(): void {
    // Extrair clientes únicos
    const clientsMap = new Map<string, Client>();
    this.projects.forEach((project) => {
      if (!clientsMap.has(project.client.id)) {
        clientsMap.set(project.client.id, project.client);
      }
    });
    this.clients = Array.from(clientsMap.values());

    // Extrair prestadores únicos
    const providersMap = new Map<string, Provider>();
    this.projects.forEach((project) => {
      if (!providersMap.has(project.provider.id)) {
        providersMap.set(project.provider.id, project.provider);
      }
    });
    this.providers = Array.from(providersMap.values());
  }

  applyFilters(): void {
    console.log("Applying filters...");
    let filtered = [...this.projects];

    // Filtro de texto
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search)
      );
    }

    // Filtro de status
    if (this.selectedStatus) {
      filtered = filtered.filter(
        (project) => project.status === this.selectedStatus
      );
    }

    // Filtro de cliente
    if (this.selectedClient) {
      filtered = filtered.filter(
        (project) => project.client.id === this.selectedClient
      );
    }

    // Filtro de prestador
    if (this.selectedProvider) {
      filtered = filtered.filter(
        (project) => project.provider.id === this.selectedProvider
      );
    }

    // Filtro de período
    if (this.startDate) {
      filtered = filtered.filter(
        (project) => new Date(project.startDate) >= new Date(this.startDate!)
      );
    }
    if (this.endDate) {
      filtered = filtered.filter(
        (project) =>
          !project.endDate ||
          new Date(project.endDate) <= new Date(this.endDate!)
      );
    }

    // Filtro de orçamento
    if (this.minBudget !== null) {
      filtered = filtered.filter(
        (project) => project.budget >= this.minBudget!
      );
    }
    if (this.maxBudget !== null) {
      filtered = filtered.filter(
        (project) => project.budget <= this.maxBudget!
      );
    }

    this.filteredProjects = filtered;
    this.dataSource.data = this.filteredProjects;
    console.log("Filtered projects:", this.filteredProjects);
  }

  clearFilters(): void {
    this.searchTerm = "";
    this.selectedStatus = "";
    this.selectedClient = "";
    this.selectedProvider = "";
    this.startDate = null;
    this.endDate = null;
    this.minBudget = null;
    this.maxBudget = null;
    this.applyFilters();
  }

  requestProject(project: Project): void {
    console.log("Solicitar projeto:", project);
  }
}

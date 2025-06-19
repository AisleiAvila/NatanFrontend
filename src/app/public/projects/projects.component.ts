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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AuthService } from "../../core/services/auth.service";

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

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {
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

  exportPDF(): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header - Primeira linha (3 blocos)
    const usuario =
      this.authService.getCurrentUser()?.name || "Usuário não identificado";
    const dataHora = new Date();
    const leftText = "Natan Construtora";
    const centerText = `Emitido por: ${usuario}`;
    const rightText = `Emitido em: ${dataHora.toLocaleString("pt-BR")}`;
    doc.setFontSize(11);
    // Esquerda
    doc.text(leftText, 14, 14, { align: "left" });
    // Centro
    const centerX = pageWidth / 2;
    doc.text(centerText, centerX, 14, { align: "center" });
    // Direita
    const rightX = pageWidth - 14;
    doc.text(rightText, rightX, 14, { align: "right" });

    // Header - Segunda linha (sublinhado)
    doc.setDrawColor(150);
    doc.setLineWidth(0.5);
    doc.line(10, 18, pageWidth - 10, 18);

    // Header - Terceira linha (título centralizado)
    doc.setFontSize(16);
    const title = "Projetos Disponíveis";
    const textWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - textWidth) / 2, 26);

    // Colunas
    const columns = [
      { header: "Nome", dataKey: "title" },
      { header: "Cliente", dataKey: "client" },
      { header: "Status", dataKey: "status" },
      { header: "Prestador", dataKey: "provider" },
      { header: "Região", dataKey: "region" },
      { header: "Período", dataKey: "period" },
      { header: "Orçamento", dataKey: "budget" },
      { header: "IVA", dataKey: "iva" },
    ];

    // Linhas
    const rows = this.filteredProjects.map((p) => ({
      title: p.title,
      client: p.client.name,
      status: p.status,
      provider: p.provider.name,
      region: "", // Adapte se houver campo região
      period: `${this.formatDate(p.startDate)}\n${
        p.endDate ? this.formatDate(p.endDate) : ""
      }`,
      budget: p.budget.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      }),
      iva: (p.services
        ? p.services.reduce((sum, s) => sum + (s.iva || 0), 0)
        : 0
      ).toLocaleString("pt-PT", { style: "currency", currency: "EUR" }),
    }));

    // Totais
    const totalOrcamento = this.filteredProjects.reduce(
      (sum, p) => sum + p.budget,
      0
    );
    const totalIva = this.filteredProjects.reduce(
      (sum, p) =>
        sum +
        (p.services
          ? p.services.reduce((s, serv) => s + (serv.iva || 0), 0)
          : 0),
      0
    );

    autoTable(doc, {
      columns,
      body: rows,
      startY: 32,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 118, 210] },
      foot: [
        [
          "Totais",
          "",
          "",
          "",
          "",
          "",
          totalOrcamento.toLocaleString("pt-PT", {
            style: "currency",
            currency: "EUR",
          }),
          totalIva.toLocaleString("pt-PT", {
            style: "currency",
            currency: "EUR",
          }),
        ],
      ],
      footStyles: { fillColor: [220, 220, 220], fontStyle: "bold" },
      didDrawPage: function (data) {
        const pageCount = doc.getNumberOfPages();
        const pageSize = doc.internal.pageSize;
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        // Footer - linha horizontal
        doc.setDrawColor(150);
        doc.setLineWidth(0.5);
        doc.line(10, pageHeight - 18, pageWidth - 10, pageHeight - 18);
        // Footer - paginação centralizada
        doc.setFontSize(9);
        const footerText = `Página ${
          doc.getCurrentPageInfo().pageNumber
        } / ${pageCount}`;
        const textWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - textWidth) / 2, pageHeight - 10);
      },
    });

    doc.save("projetos-disponiveis.pdf");
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR");
  }
}

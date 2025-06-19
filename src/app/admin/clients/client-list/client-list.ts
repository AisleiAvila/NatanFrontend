import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { Client } from "src/app/core/models/project.model";
import {
  MOCK_CLIENTS,
  MOCK_PROJECTS,
  MOCK_REGIONS,
} from "src/app/core/mocks/project.mock";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.html",
  styleUrl: "./client-list.scss",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class ClientList implements OnInit {
  displayedColumns: string[] = [
    "name",
    "email",
    "telefone",
    "region",
    "totalProjetos",
    "status",
    "actions",
  ];
  dataSource = new MatTableDataSource<any>([]);
  filterNome = "";
  filterEmail = "";
  filterRegion = "";
  filterStatus = "";
  regions = MOCK_REGIONS;
  statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadClients();
    this.dataSource.filterPredicate = (data, filter) => {
      const f = JSON.parse(filter);
      const nomeMatch =
        !f.nome || data.name.toLowerCase().includes(f.nome.toLowerCase());
      const emailMatch =
        !f.email ||
        (data.email &&
          data.email.toLowerCase().includes(f.email.toLowerCase()));
      const regionMatch =
        !f.region || (data.region && data.region.id === f.region);
      const statusMatch = !f.status || data.status === f.status;
      return nomeMatch && emailMatch && regionMatch && statusMatch;
    };
  }

  loadClients(): void {
    // Monta os dados com total de projetos
    const clientsWithProjects = MOCK_CLIENTS.map((client) => {
      const totalProjetos = MOCK_PROJECTS.filter(
        (p) => p.client.id === client.id
      ).length;
      return { ...client, totalProjetos };
    });
    this.dataSource.data = clientsWithProjects;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters() {
    const filter = {
      nome: this.filterNome,
      email: this.filterEmail,
      region: this.filterRegion,
      status: this.filterStatus,
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  editarCliente(cliente: Client) {
    // Implementar navegação para edição
  }

  excluirCliente(cliente: Client) {
    // Implementar exclusão
  }

  limparFiltros() {
    this.filterNome = "";
    this.filterEmail = "";
    this.filterRegion = "";
    this.filterStatus = "";
    this.applyFilters();
  }

  novoCliente() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}

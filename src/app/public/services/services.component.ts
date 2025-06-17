import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService, Service } from "../../core/services/data.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatListModule } from "@angular/material/list";
import { LanguageSelectorModule } from "../../shared/components/language-selector/language-selector.module";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatListModule,
    LanguageSelectorModule,
    TranslateModule,
    RouterModule,
  ],
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];
  loading = true;

  // Filter options
  selectedRegion = "";
  searchTerm = "";
  selectedCategory = "";

  regions = ["São Miguel", "Aveiro", "Coimbra"];
  categories: string[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang("pt");
    this.translateService.use(localStorage.getItem("natan_language") || "pt");
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.dataService.getServices().subscribe(
      (services) => {
        this.services = services;
        this.filteredServices = services;
        this.categories = [...new Set(services.map((s) => s.category))];
        this.loading = false;
      },
      (error) => {
        console.error("Error loading services:", error);
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredServices = this.services.filter((service) => {
      const matchesSearch =
        !this.searchTerm ||
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesRegion =
        !this.selectedRegion || service.regions.includes(this.selectedRegion);

      const matchesCategory =
        !this.selectedCategory || service.category === this.selectedCategory;

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }

  clearFilters(): void {
    this.selectedRegion = "";
    this.searchTerm = "";
    this.selectedCategory = "";
    this.filteredServices = this.services;
  }

  requestService(service: Service): void {
    this.router.navigate(["/client/request-service"], {
      queryParams: { serviceId: service.id },
    });
  }

  goToContact(): void {
    this.router.navigate(["/contact"]);
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslationService } from "@core/services/translation.service";
import { DataService, Service } from "@core/services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  featuredServices: Service[] = [];
  loading = true;

  // Company statistics
  stats = [
    { icon: "verified", value: "500+", key: "stats.projects_completed" },
    { icon: "stars", value: "4.9", key: "stats.avg_rating" },
    { icon: "schedule", value: "24/7", key: "stats.support" },
    { icon: "people", value: "50+", key: "stats.professionals" },
  ];

  // Service areas with custom styling
  serviceAreas = [
    {
      name: "São Miguel",
      icon: "location_city",
      description: "service_areas.sao_miguel_desc",
      color: "#1976d2",
    },
    {
      name: "Aveiro",
      icon: "apartment",
      description: "service_areas.aveiro_desc",
      color: "#388e3c",
    },
    {
      name: "Coimbra",
      icon: "domain",
      description: "service_areas.coimbra_desc",
      color: "#f57c00",
    },
  ];

  services: Service[] = [];

  constructor(
    private router: Router,
    public translate: TranslationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.translate.initTranslation();
    this.loadServices();
  }

  loadServices(): void {
    this.dataService.getServices().subscribe(
      (services) => {
        this.services = services;
        this.loading = false;
      },
      (error) => {
        console.error("Erro ao carregar serviços:", error);
        this.loading = false;
      }
    );
  }

  requestService(service?: Service): void {
    if (service) {
      this.router.navigate(["/client/request-service"], {
        queryParams: { serviceId: service.id },
      });
    } else {
      this.router.navigate(["/client/request-service"]);
    }
  }

  viewAllServices(): void {
    this.router.navigate(["/home/services"]);
  }

  openWhatsApp(): void {
    const phoneNumber = "+351912345678";
    const message = encodeURIComponent(
      "Olá! Gostaria de solicitar um orçamento."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }

  goToContact(): void {
    this.router.navigate(["/client/request-service"]);
  }

  scrollServices(direction: "left" | "right") {
    const carousel = document.querySelector(
      ".services-carousel"
    ) as HTMLElement;
    if (!carousel) return;
    const card = carousel.querySelector(".service-card") as HTMLElement;
    const scrollAmount = card ? card.offsetWidth + 24 : 320;
    if (direction === "left") {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }
}

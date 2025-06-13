import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslationService } from "./core/services/translation.service";
import { AuthService, User } from "./core/services/auth.service";
import { DataService, Service } from "./core/services/data.service";

interface ServiceArea {
  name: string;
  icon: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;
  currentLanguage = "pt";
  featuredServices: Service[] = [];
  serviceAreas: ServiceArea[] = [
    { name: "São Miguel", icon: "location-outline" },
    { name: "Aveiro", icon: "business-outline" },
    { name: "Coimbra", icon: "home-outline" }
  ];

  constructor(
    private titleService: Title,
    private translationService: TranslationService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {
    this.titleService.setTitle(
      "Natan Construtora - Serviços de Construção e Manutenção"
    );
    this.translationService.initTranslation();
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    this.loadFeaturedServices();
  }

  loadFeaturedServices() {
    this.dataService.getServices().subscribe(services => {
      this.featuredServices = services.slice(0, 6);
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === "pt" ? "en" : "pt";
    this.translationService.setLanguage(newLang);
  }

  showLogin() {
    this.router.navigate(["/auth/login"]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  showServiceRequest() {
    this.router.navigate(["/client/request-service"]);
  }

  requestService(serviceId: string) {
    this.router.navigate(["/client/request-service"], { queryParams: { service: serviceId } });
  }

  openWhatsApp() {
    const phoneNumber = "351234567890";
    const message = encodeURIComponent("Olá! Gostaria de solicitar um serviço da Natan Construtora.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }
}

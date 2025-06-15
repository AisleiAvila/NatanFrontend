import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthService, User } from "../../core/services/auth.service";
import { DataService, ServiceRequest } from "../../core/services/data.service";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LanguageSelectorModule } from "../../shared/components/language-selector/language-selector.module";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    TranslateModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    LanguageSelectorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientDashboardComponent implements OnInit {
  currentUser: User | null = null;
  serviceRequests: ServiceRequest[] = [];
  loading = true;

  // Dashboard statistics
  stats = {
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    activeQuotes: 0,
  };

  // Status colors for visual indication
  statusColors = {
    pending: "#ff9800",
    quoted: "#2196f3",
    approved: "#4caf50",
    in_progress: "#9c27b0",
    completed: "#4caf50",
    cancelled: "#f44336",
  };

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang("pt");
    this.translateService.use(localStorage.getItem("natan_language") || "pt");
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadServiceRequests();
  }

  loadServiceRequests(): void {
    this.loading = true;
    if (this.currentUser) {
      this.dataService
        .getServiceRequests(this.currentUser.id.toString(), "client")
        .subscribe(
          (requests) => {
            this.serviceRequests = requests;
            this.calculateStats();
            this.loading = false;
          },
          (error) => {
            console.error("Erro ao carregar pedidos:", error);
            this.loading = false;
            this.snackBar.open(
              this.translateService.instant("common.error_occurred"),
              this.translateService.instant("common.close"),
              { duration: 3000 }
            );
          }
        );
    }
  }

  calculateStats(): void {
    this.stats.totalRequests = this.serviceRequests.length;
    this.stats.pendingRequests = this.serviceRequests.filter(
      (r) => r.status === "pending"
    ).length;
    this.stats.completedRequests = this.serviceRequests.filter(
      (r) => r.status === "completed"
    ).length;
    this.stats.activeQuotes = this.serviceRequests.filter(
      (r) => r.status === "quoted"
    ).length;
  }

  requestNewService(): void {
    this.router.navigate(["/client/request-service"]);
  }

  viewRequestDetails(request: ServiceRequest): void {
    // Implementation for viewing request details
    console.log("View request details:", request);
  }

  approveQuote(request: ServiceRequest): void {
    this.dataService
      .updateServiceRequestStatus(request.id, "approved")
      .subscribe(
        (success) => {
          if (success) {
            this.snackBar.open(
              this.translateService.instant("client.quote_approved"),
              this.translateService.instant("common.close"),
              { duration: 3000 }
            );
            this.loadServiceRequests(); // Refresh data
          }
        },
        (error) => {
          console.error("Erro ao aprovar orçamento:", error);
          this.snackBar.open(
            this.translateService.instant("common.error_occurred"),
            this.translateService.instant("common.close"),
            { duration: 3000 }
          );
        }
      );
  }

  rejectQuote(request: ServiceRequest): void {
    this.dataService
      .updateServiceRequestStatus(request.id, "cancelled")
      .subscribe(
        (success) => {
          if (success) {
            this.snackBar.open(
              this.translateService.instant("client.quote_rejected"),
              this.translateService.instant("common.close"),
              { duration: 3000 }
            );
            this.loadServiceRequests(); // Refresh data
          }
        },
        (error) => {
          console.error("Erro ao rejeitar orçamento:", error);
          this.snackBar.open(
            this.translateService.instant("common.error_occurred"),
            this.translateService.instant("common.close"),
            { duration: 3000 }
          );
        }
      );
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      pending: "schedule",
      quoted: "receipt",
      approved: "check_circle",
      in_progress: "build",
      completed: "done_all",
      cancelled: "cancel",
    };
    return icons[status] || "help";
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  openWhatsApp(): void {
    const phoneNumber = "+351912345678";
    const message = encodeURIComponent(
      "Olá! Preciso de ajuda com o meu pedido de serviço."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }
}

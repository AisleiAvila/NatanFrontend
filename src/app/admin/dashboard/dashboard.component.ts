import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AuthService, User } from "../../core/services/auth.service";
import { DataService, ServiceRequest } from "../../core/services/data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslateModule,
  ],
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  loading = true;
  serviceRequests: ServiceRequest[] = [];

  metrics = {
    monthlyRevenue: 15420,
    revenueChange: 12,
    totalRequests: 89,
    pendingRequests: 12,
    activeProviders: 24,
    onlineProviders: 18,
    satisfactionRate: 94,
    newClients: 8,
  };

  recentActivities = [
    {
      icon: "assignment",
      type: "New Request",
      message: "Electrical service requested by João Silva",
      timestamp: new Date().toISOString(),
    },
    {
      icon: "person_add",
      type: "Provider Added",
      message: "New provider registered: Maria Santos",
      timestamp: new Date().toISOString(),
    },
    {
      icon: "done",
      type: "Service Completed",
      message: "Plumbing service completed successfully",
      timestamp: new Date().toISOString(),
    },
  ];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang("pt");
    this.translateService.use(localStorage.getItem("natan_language") || "pt");
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });

    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    this.dataService.getServiceRequests().subscribe({
      next: (requests) => {
        this.serviceRequests = requests;
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading dashboard data:", error);
        this.loading = false;
        this.snackBar.open(
          this.translateService.instant("common.error_occurred"),
          this.translateService.instant("common.close"),
          { duration: 3000 }
        );
      },
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}

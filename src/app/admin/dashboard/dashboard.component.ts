import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "../../core/services/auth.service";
import { DataService, ServiceRequest } from "../../core/services/data.service";
import { TranslationService } from "../../core/services/translation.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    standalone: false
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
    private translationService: TranslationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });

    this.loadDashboardData();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
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
        this.snackBar.open("Error loading dashboard data", "Close", {
          duration: 3000,
        });
      },
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}

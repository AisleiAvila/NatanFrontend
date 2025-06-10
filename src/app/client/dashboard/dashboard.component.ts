import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, User } from '../../core/services/auth.service';
import { DataService, ServiceRequest } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  serviceRequests: ServiceRequest[] = [];
  loading = true;
  
  // Dashboard statistics
  stats = {
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    activeQuotes: 0
  };

  // Status colors for visual indication
  statusColors = {
    'pending': '#ff9800',
    'quoted': '#2196f3',
    'approved': '#4caf50',
    'in_progress': '#9c27b0',
    'completed': '#4caf50',
    'cancelled': '#f44336'
  };

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private translationService: TranslationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadServiceRequests();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  loadServiceRequests(): void {
    if (this.currentUser) {
      this.dataService.getServiceRequests(this.currentUser.id, 'client').subscribe(
        requests => {
          this.serviceRequests = requests;
          this.calculateStats();
          this.loading = false;
        },
        error => {
          console.error('Error loading service requests:', error);
          this.loading = false;
          this.snackBar.open(
            this.translate('common.error_loading_data'),
            this.translate('common.close'),
            { duration: 5000 }
          );
        }
      );
    }
  }

  calculateStats(): void {
    this.stats.totalRequests = this.serviceRequests.length;
    this.stats.pendingRequests = this.serviceRequests.filter(r => r.status === 'pending').length;
    this.stats.completedRequests = this.serviceRequests.filter(r => r.status === 'completed').length;
    this.stats.activeQuotes = this.serviceRequests.filter(r => r.status === 'quoted').length;
  }

  requestNewService(): void {
    this.router.navigate(['/client/request-service']);
  }

  viewRequestDetails(request: ServiceRequest): void {
    // Implementation for viewing request details
    console.log('View request details:', request);
  }

  approveQuote(request: ServiceRequest): void {
    this.dataService.updateServiceRequestStatus(request.id, 'approved').subscribe(
      success => {
        if (success) {
          this.snackBar.open(
            this.translate('client.quote_approved'),
            this.translate('common.close'),
            { duration: 3000 }
          );
          this.loadServiceRequests(); // Refresh data
        }
      },
      error => {
        this.snackBar.open(
          this.translate('common.error_occurred'),
          this.translate('common.close'),
          { duration: 5000 }
        );
      }
    );
  }

  rejectQuote(request: ServiceRequest): void {
    this.dataService.updateServiceRequestStatus(request.id, 'cancelled').subscribe(
      success => {
        if (success) {
          this.snackBar.open(
            this.translate('client.quote_rejected'),
            this.translate('common.close'),
            { duration: 3000 }
          );
          this.loadServiceRequests(); // Refresh data
        }
      },
      error => {
        this.snackBar.open(
          this.translate('common.error_occurred'),
          this.translate('common.close'),
          { duration: 5000 }
        );
      }
    );
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'pending': 'schedule',
      'quoted': 'receipt',
      'approved': 'check_circle',
      'in_progress': 'build',
      'completed': 'done_all',
      'cancelled': 'cancel'
    };
    return icons[status] || 'help';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  openWhatsApp(): void {
    const phoneNumber = '+351912345678';
    const message = encodeURIComponent('Olá! Preciso de ajuda com o meu pedido de serviço.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}

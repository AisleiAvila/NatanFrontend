import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, User } from '../../core/services/auth.service';
import { DataService, ServiceRequest } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  assignedRequests: ServiceRequest[] = [];
  todaySchedule: ServiceRequest[] = [];
  loading = true;
  isAvailable = true;

  // Dashboard statistics
  stats = {
    totalAssigned: 0,
    completedToday: 0,
    pendingRequests: 0,
    avgRating: 4.8,
    totalEarnings: 2350
  };

  // Status colors
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
    this.loadProviderData();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  loadProviderData(): void {
    if (this.currentUser) {
      this.dataService.getServiceRequests(this.currentUser.id, 'provider').subscribe(
        requests => {
          this.assignedRequests = requests;
          this.filterTodaySchedule();
          this.calculateStats();
          this.loading = false;
        },
        error => {
          console.error('Error loading provider data:', error);
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

  filterTodaySchedule(): void {
    const today = new Date().toISOString().split('T')[0];
    this.todaySchedule = this.assignedRequests.filter(request => 
      request.preferredDates.some(date => date.startsWith(today)) &&
      ['approved', 'in_progress'].includes(request.status)
    );
  }

  calculateStats(): void {
    this.stats.totalAssigned = this.assignedRequests.length;
    this.stats.completedToday = this.assignedRequests.filter(r => 
      r.status === 'completed' && 
      new Date(r.updatedAt).toDateString() === new Date().toDateString()
    ).length;
    this.stats.pendingRequests = this.assignedRequests.filter(r => r.status === 'pending').length;
  }

  toggleAvailability(): void {
    this.isAvailable = !this.isAvailable;
    const message = this.isAvailable ? 
      this.translate('provider.availability_enabled') : 
      this.translate('provider.availability_disabled');
    
    this.snackBar.open(message, this.translate('common.close'), { duration: 3000 });
  }

  acceptRequest(request: ServiceRequest): void {
    this.dataService.updateServiceRequestStatus(request.id, 'approved').subscribe(
      success => {
        if (success) {
          this.snackBar.open(
            this.translate('provider.request_accepted'),
            this.translate('common.close'),
            { duration: 3000 }
          );
          this.loadProviderData(); // Refresh data
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

  declineRequest(request: ServiceRequest): void {
    this.dataService.updateServiceRequestStatus(request.id, 'cancelled').subscribe(
      success => {
        if (success) {
          this.snackBar.open(
            this.translate('provider.request_declined'),
            this.translate('common.close'),
            { duration: 3000 }
          );
          this.loadProviderData(); // Refresh data
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

  startService(request: ServiceRequest): void {
    this.dataService.updateServiceRequestStatus(request.id, 'in_progress').subscribe(
      success => {
        if (success) {
          this.snackBar.open(
            this.translate('provider.service_started'),
            this.translate('common.close'),
            { duration: 3000 }
          );
          this.loadProviderData(); // Refresh data
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

  completeService(request: ServiceRequest): void {
    this.dataService.updateServiceRequestStatus(request.id, 'completed').subscribe(
      success => {
        if (success) {
          this.snackBar.open(
            this.translate('provider.service_completed'),
            this.translate('common.close'),
            { duration: 3000 }
          );
          this.loadProviderData(); // Refresh data
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

  viewCalendar(): void {
    this.router.navigate(['/provider/calendar']);
  }

  openGoogleMaps(address: string): void {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
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

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

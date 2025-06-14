import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService, User } from "../../core/services/auth.service";
import { DataService, ServiceRequest } from "../../core/services/data.service";
import { TranslationService } from "../../core/services/translation.service";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  requests: ServiceRequest[];
}

interface CalendarWeek {
  days: CalendarDay[];
}

@Component({
    selector: "app-provider-calendar",
    templateUrl: "./calendar.component.html",
    styleUrls: ["./calendar.component.scss"],
    standalone: false
})
export class CalendarComponent implements OnInit {
  currentUser: User | null = null;
  currentDate = new Date();
  currentMonth = new Date();
  selectedDate: Date | null = null;
  selectedDayRequests: ServiceRequest[] = [];

  calendarWeeks: CalendarWeek[] = [];
  weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  allRequests: ServiceRequest[] = [];
  loading = true;
  viewMode: "month" | "week" = "month";

  // Status colors
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
    private translationService: TranslationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadProviderRequests();
    this.generateCalendar();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  loadProviderRequests(): void {
    if (this.currentUser) {
      this.dataService
        .getServiceRequests(this.currentUser.id.toString(), "provider")
        .subscribe(
          (requests) => {
            this.allRequests = requests;
            this.generateCalendar();
            this.loading = false;
          },
          (error) => {
            console.error("Error loading provider requests:", error);
            this.loading = false;
            this.snackBar.open(
              this.translate("common.error_loading_data"),
              this.translate("common.close"),
              { duration: 5000 }
            );
          }
        );
    }
  }

  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    // Get first day of the month and adjust for week start
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // Generate 6 weeks
    this.calendarWeeks = [];
    for (let week = 0; week < 6; week++) {
      const weekDays: CalendarDay[] = [];

      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + week * 7 + day);

        const dayRequests = this.getRequestsForDate(currentDate);

        weekDays.push({
          date: currentDate,
          isCurrentMonth: currentDate.getMonth() === month,
          isToday: this.isSameDay(currentDate, new Date()),
          requests: dayRequests,
        });
      }

      this.calendarWeeks.push({ days: weekDays });
    }
  }

  getRequestsForDate(date: Date): ServiceRequest[] {
    const dateString = date.toISOString().split("T")[0];
    return this.allRequests.filter(
      (request) =>
        request.preferredDates.some((prefDate) =>
          prefDate.startsWith(dateString)
        ) && ["approved", "in_progress"].includes(request.status)
    );
  }

  selectDate(day: CalendarDay): void {
    this.selectedDate = day.date;
    this.selectedDayRequests = day.requests;
  }

  previousMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  goToToday(): void {
    this.currentMonth = new Date();
    this.generateCalendar();
    this.selectedDate = new Date();
    this.selectedDayRequests = this.getRequestsForDate(new Date());
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === "month" ? "week" : "month";
  }

  public isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
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

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  openGoogleMaps(address: string): void {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  }

  startService(request: ServiceRequest): void {
    this.dataService
      .updateServiceRequestStatus(request.id, "in_progress")
      .subscribe(
        (success) => {
          if (success) {
            this.snackBar.open(
              this.translate("provider.service_started"),
              this.translate("common.close"),
              { duration: 3000 }
            );
            this.loadProviderRequests();
          }
        },
        (error) => {
          this.snackBar.open(
            this.translate("common.error_occurred"),
            this.translate("common.close"),
            { duration: 5000 }
          );
        }
      );
  }

  completeService(request: ServiceRequest): void {
    this.dataService
      .updateServiceRequestStatus(request.id, "completed")
      .subscribe(
        (success) => {
          if (success) {
            this.snackBar.open(
              this.translate("provider.service_completed"),
              this.translate("common.close"),
              { duration: 3000 }
            );
            this.loadProviderRequests();
          }
        },
        (error) => {
          this.snackBar.open(
            this.translate("common.error_occurred"),
            this.translate("common.close"),
            { duration: 5000 }
          );
        }
      );
  }
}

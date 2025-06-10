import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatStepper } from "@angular/material/stepper";
import { AuthService, User } from "../../core/services/auth.service";
import {
  DataService,
  Service,
  ServiceRequest,
} from "../../core/services/data.service";
import { TranslationService } from "../../core/services/translation.service";

@Component({
  selector: "app-request-service",
  templateUrl: "./request-service.component.html",
  styleUrls: ["./request-service.component.scss"],
})
export class RequestServiceComponent implements OnInit {
  currentUser: User | null = null;
  services: Service[] = [];
  selectedService: Service | null = null;

  // Stepper forms
  serviceSelectionForm: FormGroup;
  clientInfoForm: FormGroup;
  serviceDetailsForm: FormGroup;

  isSubmitting = false;
  isLinear = true;

  // Configuration options
  regions = ["São Miguel", "Aveiro", "Coimbra"];
  uploadedFiles: File[] = [];
  maxFiles = 3;
  maxFileSize = 5 * 1024 * 1024; // 5MB

  // Preferred dates
  preferredDates: string[] = [];
  minDate = new Date();
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private translationService: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.maxDate.setMonth(this.maxDate.getMonth() + 3); // 3 months ahead

    this.serviceSelectionForm = this.fb.group({
      serviceId: ["", Validators.required],
    });

    this.clientInfoForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      whatsapp: [""],
      nif: [""],
      includeNifInQuote: [false],
    });

    this.serviceDetailsForm = this.fb.group({
      region: ["", Validators.required],
      location: ["", [Validators.required, Validators.minLength(10)]],
      description: ["", [Validators.required, Validators.minLength(20)]],
      preferredDates: this.fb.array([], Validators.required),
      agreeToTerms: [false, [Validators.required, Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadServices();
    this.prefillClientInfo();
    this.checkPreselectedService();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  loadServices(): void {
    this.dataService.getServices().subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.error("Error loading services:", error);
        this.snackBar.open(
          this.translate("common.error_loading_data"),
          this.translate("common.close"),
          { duration: 5000 }
        );
      }
    );
  }

  prefillClientInfo(): void {
    if (this.currentUser) {
      this.clientInfoForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        whatsapp: this.currentUser.whatsapp,
      });
    }
  }

  checkPreselectedService(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["serviceId"]) {
        this.serviceSelectionForm.patchValue({
          serviceId: params["serviceId"],
        });
        this.onServiceSelected(params["serviceId"]);
      }
    });
  }

  onServiceSelected(serviceId: string): void {
    this.selectedService =
      this.services.find((s) => s.id === serviceId) || null;
  }

  get preferredDatesArray(): FormArray {
    return this.serviceDetailsForm.get("preferredDates") as FormArray;
  }

  addPreferredDate(date: Date): void {
    if (this.preferredDates.length < 3) {
      const dateString = date.toISOString().split("T")[0];
      if (!this.preferredDates.includes(dateString)) {
        this.preferredDates.push(dateString);
        this.preferredDatesArray.push(this.fb.control(dateString));
      }
    }
  }

  removePreferredDate(index: number): void {
    this.preferredDates.splice(index, 1);
    this.preferredDatesArray.removeAt(index);
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];

    for (const file of files) {
      if (this.uploadedFiles.length >= this.maxFiles) {
        this.snackBar.open(
          this.translate("service_request.max_files_error"),
          this.translate("common.close"),
          { duration: 3000 }
        );
        break;
      }

      if (file.size > this.maxFileSize) {
        this.snackBar.open(
          this.translate("service_request.file_size_error"),
          this.translate("common.close"),
          { duration: 3000 }
        );
        continue;
      }

      if (this.isValidFileType(file)) {
        this.uploadedFiles.push(file);
      } else {
        this.snackBar.open(
          this.translate("service_request.file_type_error"),
          this.translate("common.close"),
          { duration: 3000 }
        );
      }
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  private isValidFileType(file: File): boolean {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
    ];
    return validTypes.includes(file.type);
  }

  onSubmit(stepper: MatStepper): void {
    if (this.isAllFormsValid()) {
      this.isSubmitting = true;

      const requestData: Partial<ServiceRequest> = {
        clientId: this.currentUser?.id,
        serviceId: this.serviceSelectionForm.value.serviceId,
        serviceName: this.selectedService?.name,
        description: this.serviceDetailsForm.value.description,
        location: this.serviceDetailsForm.value.location,
        region: this.serviceDetailsForm.value.region,
        preferredDates: this.preferredDates,
        photos: this.uploadedFiles.map((file) => URL.createObjectURL(file)), // Mock photo URLs
        clientInfo: {
          ...this.clientInfoForm.value,
          nif: this.clientInfoForm.value.includeNifInQuote
            ? this.clientInfoForm.value.nif
            : undefined,
        },
      };

      this.dataService.createServiceRequest(requestData).subscribe(
        (success) => {
          this.isSubmitting = false;
          this.snackBar.open(
            this.translate("service_request.success_message"),
            this.translate("common.close"),
            { duration: 5000 }
          );
          this.router.navigate(["/client/dashboard"]);
        },
        (error) => {
          this.isSubmitting = false;
          this.snackBar.open(
            this.translate("service_request.error_message"),
            this.translate("common.close"),
            { duration: 5000 }
          );
        }
      );
    } else {
      this.markAllFormsAsTouched();
    }
  }

  private isAllFormsValid(): boolean {
    return (
      this.serviceSelectionForm.valid &&
      this.clientInfoForm.valid &&
      this.serviceDetailsForm.valid
    );
  }

  private markAllFormsAsTouched(): void {
    this.serviceSelectionForm.markAllAsTouched();
    this.clientInfoForm.markAllAsTouched();
    this.serviceDetailsForm.markAllAsTouched();
  }

  getFieldError(fieldName: string, form: FormGroup): string {
    const field = form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"]) {
        return this.translate("validation.required");
      }
      if (field.errors["email"]) {
        return this.translate("validation.email");
      }
      if (field.errors["minlength"]) {
        return this.translate("validation.minlength");
      }
      if (field.errors["requiredTrue"]) {
        return this.translate("validation.required");
      }
    }
    return "";
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return Math.round(bytes / 1024) + " KB";
    return Math.round(bytes / 1048576) + " MB";
  }

  goBack(): void {
    this.router.navigate(["/client/dashboard"]);
  }
}

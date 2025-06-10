import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, delay } from "rxjs/operators";

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  regions: string[];
  image: string;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  serviceId: string;
  serviceName: string;
  status:
    | "pending"
    | "quoted"
    | "approved"
    | "in_progress"
    | "completed"
    | "cancelled";
  description: string;
  location: string;
  region: string;
  preferredDates: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  providerId?: string;
  providerName?: string;
  quote?: {
    amount: number;
    description: string;
    includeVat: boolean;
    vatAmount?: number;
    totalAmount: number;
  };
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;
    nif?: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  private readonly placeholderImage = (text: string) =>
    `https://placehold.co/600x400/1976d2/ffffff?text=${encodeURIComponent(
      text
    )}`;

  private readonly stockPhotos = {
    construction: [
      this.placeholderImage("Hidráulica"),
      this.placeholderImage("Elétrica"),
      this.placeholderImage("Pintura"),
      this.placeholderImage("Construção"),
    ],
    renovation: [
      this.placeholderImage("Reforma 1"),
      this.placeholderImage("Reforma 2"),
      this.placeholderImage("Reforma 3"),
    ],
  };

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    const mockServices: Service[] = [
      {
        id: "1",
        name: "Plumbing Services",
        description: "Professional plumbing installation and repair services",
        category: "Plumbing",
        price: 50,
        duration: 120,
        regions: ["São Miguel", "Aveiro", "Coimbra"],
        image: this.placeholderImage("Hidráulica"),
      },
      {
        id: "2",
        name: "Electrical Work",
        description: "Complete electrical installation and maintenance",
        category: "Electrical",
        price: 60,
        duration: 150,
        regions: ["São Miguel", "Aveiro"],
        image: this.placeholderImage("Elétrica"),
      },
      {
        id: "3",
        name: "Home Renovation",
        description: "Complete home renovation and remodeling services",
        category: "Renovation",
        price: 200,
        duration: 480,
        regions: ["Aveiro", "Coimbra"],
        image: this.placeholderImage("Reforma"),
      },
      {
        id: "4",
        name: "Painting Services",
        description: "Interior and exterior painting services",
        category: "Painting",
        price: 35,
        duration: 240,
        regions: ["São Miguel", "Aveiro", "Coimbra"],
        image: this.placeholderImage("Pintura"),
      },
    ];

    return of(mockServices).pipe(delay(500));
  }

  getServiceRequests(
    userId?: string,
    role?: string
  ): Observable<ServiceRequest[]> {
    const mockRequests: ServiceRequest[] = [
      {
        id: "1",
        clientId: "1",
        serviceId: "1",
        serviceName: "Plumbing Services",
        status: "pending",
        description: "Kitchen sink is leaking and needs immediate repair",
        location: "Rua das Flores, 123, Aveiro",
        region: "Aveiro",
        preferredDates: ["2024-01-15", "2024-01-16", "2024-01-17"],
        photos: [this.stockPhotos.construction[0]],
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-01-10T10:00:00Z",
        clientInfo: {
          name: "João Silva",
          email: "joao@email.com",
          phone: "+351 912 345 678",
          whatsapp: "+351 912 345 678",
        },
      },
      {
        id: "2",
        clientId: "1",
        serviceId: "3",
        serviceName: "Home Renovation",
        status: "quoted",
        description: "Need to renovate bathroom completely",
        location: "Avenida Central, 456, Coimbra",
        region: "Coimbra",
        preferredDates: ["2024-01-20", "2024-01-21"],
        photos: [this.stockPhotos.renovation[0]],
        createdAt: "2024-01-08T14:30:00Z",
        updatedAt: "2024-01-12T09:15:00Z",
        providerId: "2",
        providerName: "Maria Santos",
        quote: {
          amount: 2500,
          description:
            "Complete bathroom renovation including tiles, fixtures, and plumbing",
          includeVat: true,
          vatAmount: 575,
          totalAmount: 3075,
        },
        clientInfo: {
          name: "João Silva",
          email: "joao@email.com",
          phone: "+351 912 345 678",
          whatsapp: "+351 912 345 678",
          nif: "123456789",
        },
      },
    ];

    return of(mockRequests).pipe(delay(500));
  }

  createServiceRequest(
    request: Partial<ServiceRequest>
  ): Observable<ServiceRequest> {
    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      clientId: request.clientId || "",
      serviceId: request.serviceId || "",
      serviceName: request.serviceName || "",
      status: "pending",
      description: request.description || "",
      location: request.location || "",
      region: request.region || "",
      preferredDates: request.preferredDates || [],
      photos: request.photos || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      clientInfo: request.clientInfo || {
        name: "",
        email: "",
        phone: "",
      },
    };

    return of(newRequest).pipe(delay(1000));
  }

  updateServiceRequestStatus(
    requestId: string,
    status: string
  ): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  getDashboardMetrics(): Observable<any> {
    const metrics = {
      totalRequests: 156,
      pendingRequests: 23,
      completedRequests: 98,
      activeProviders: 12,
      monthlyRevenue: 45680,
      satisfactionRate: 4.7,
    };

    return of(metrics).pipe(delay(300));
  }
}

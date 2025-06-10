import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

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
  status: 'pending' | 'quoted' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
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
  providedIn: 'root'
})
export class DataService {
  private readonly stockPhotos = {
    construction: [
      'https://pixabay.com/get/g7ea7abc73e93ac2da4c5c77eb788219c7422fef45ae190c0bdc6ba36a90a0958ddadee6c49fe4fe480464c98d6d7bd8cc32627cc329a71c6a1478ba15ff91807_1280.jpg',
      'https://pixabay.com/get/g78a87363d69ce69227598e8101129390a820e6bcfa725538650afdee9df8b2b898d36d4d6405b19122c4e194517043fd9d644437ab1acaa5277f69f289d1af69_1280.jpg',
      'https://pixabay.com/get/gc935d1db3d8620aa597c7c434e315e927e5c91bc9535f0fd8a9a9d20a80efa5addb9723dd9e6feda82ba8cda7819ea00d2d580bd2ce3c1058f156fcdf5a62176_1280.jpg',
      'https://pixabay.com/get/g8276d314683badc5d4d555cb385fa0b26760e424583dcdb95e0042157d6a8361e209693cc1839d6cbc5e50b0cfdcb523dd2db3432c1b59957af90c32d661d75b_1280.jpg'
    ],
    renovation: [
      'https://pixabay.com/get/gb1afda786a1497657eff571f9c520574297f8831d5a00d7da945d95550d6940c68c60aaa75a54a7aa2884e0ce852c90dc01d49896ecc146beb71f10c5d5cf537_1280.jpg',
      'https://pixabay.com/get/g01afefd0355527478d3ee3501a86beec2438f169d80bff74b3282564ac032d5822ecd440c937133afe70438a89de9d0a25aed19161d60053b35042eb57f7e51f_1280.jpg',
      'https://pixabay.com/get/g83ad86d5cefa8aff0d5d857e1be6299866eda597f735420a4be2ae0c7cd59f2057f52e03f94e4f45c48ba53fefaa8760de3311a617d97a0abfdea8258601e4b3_1280.jpg'
    ]
  };

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    const mockServices: Service[] = [
      {
        id: '1',
        name: 'Plumbing Services',
        description: 'Professional plumbing installation and repair services',
        category: 'Plumbing',
        price: 50,
        duration: 120,
        regions: ['São Miguel', 'Aveiro', 'Coimbra'],
        image: this.stockPhotos.construction[0]
      },
      {
        id: '2',
        name: 'Electrical Work',
        description: 'Complete electrical installation and maintenance',
        category: 'Electrical',
        price: 60,
        duration: 150,
        regions: ['São Miguel', 'Aveiro'],
        image: this.stockPhotos.construction[1]
      },
      {
        id: '3',
        name: 'Home Renovation',
        description: 'Complete home renovation and remodeling services',
        category: 'Renovation',
        price: 200,
        duration: 480,
        regions: ['Aveiro', 'Coimbra'],
        image: this.stockPhotos.renovation[0]
      },
      {
        id: '4',
        name: 'Painting Services',
        description: 'Interior and exterior painting services',
        category: 'Painting',
        price: 35,
        duration: 240,
        regions: ['São Miguel', 'Aveiro', 'Coimbra'],
        image: this.stockPhotos.construction[2]
      }
    ];

    return of(mockServices).pipe(delay(500));
  }

  getServiceRequests(userId?: string, role?: string): Observable<ServiceRequest[]> {
    const mockRequests: ServiceRequest[] = [
      {
        id: '1',
        clientId: '1',
        serviceId: '1',
        serviceName: 'Plumbing Services',
        status: 'pending',
        description: 'Kitchen sink is leaking and needs immediate repair',
        location: 'Rua das Flores, 123, Aveiro',
        region: 'Aveiro',
        preferredDates: ['2024-01-15', '2024-01-16', '2024-01-17'],
        photos: [this.stockPhotos.construction[0]],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z',
        clientInfo: {
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '+351 912 345 678',
          whatsapp: '+351 912 345 678'
        }
      },
      {
        id: '2',
        clientId: '1',
        serviceId: '3',
        serviceName: 'Home Renovation',
        status: 'quoted',
        description: 'Need to renovate bathroom completely',
        location: 'Avenida Central, 456, Coimbra',
        region: 'Coimbra',
        preferredDates: ['2024-01-20', '2024-01-21'],
        photos: [this.stockPhotos.renovation[0]],
        createdAt: '2024-01-08T14:30:00Z',
        updatedAt: '2024-01-12T09:15:00Z',
        providerId: '2',
        providerName: 'Maria Santos',
        quote: {
          amount: 2500,
          description: 'Complete bathroom renovation including tiles, fixtures, and plumbing',
          includeVat: true,
          vatAmount: 575,
          totalAmount: 3075
        },
        clientInfo: {
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '+351 912 345 678',
          whatsapp: '+351 912 345 678',
          nif: '123456789'
        }
      }
    ];

    return of(mockRequests).pipe(delay(500));
  }

  createServiceRequest(request: Partial<ServiceRequest>): Observable<ServiceRequest> {
    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      clientId: request.clientId || '',
      serviceId: request.serviceId || '',
      serviceName: request.serviceName || '',
      status: 'pending',
      description: request.description || '',
      location: request.location || '',
      region: request.region || '',
      preferredDates: request.preferredDates || [],
      photos: request.photos || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      clientInfo: request.clientInfo || {
        name: '',
        email: '',
        phone: ''
      }
    };

    return of(newRequest).pipe(delay(1000));
  }

  updateServiceRequestStatus(requestId: string, status: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  getDashboardMetrics(): Observable<any> {
    const metrics = {
      totalRequests: 156,
      pendingRequests: 23,
      completedRequests: 98,
      activeProviders: 12,
      monthlyRevenue: 45680,
      satisfactionRate: 4.7
    };

    return of(metrics).pipe(delay(300));
  }
}

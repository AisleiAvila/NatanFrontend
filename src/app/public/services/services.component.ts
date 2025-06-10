import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { DataService, Service } from '../../core/services/data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];
  loading = true;
  
  // Filter options
  selectedRegion = '';
  searchTerm = '';
  selectedCategory = '';
  
  regions = ['São Miguel', 'Aveiro', 'Coimbra'];
  categories: string[] = [];

  constructor(
    private translationService: TranslationService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  loadServices(): void {
    this.dataService.getServices().subscribe(
      services => {
        this.services = services;
        this.filteredServices = services;
        this.categories = [...new Set(services.map(s => s.category))];
        this.loading = false;
      },
      error => {
        console.error('Error loading services:', error);
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = !this.searchTerm || 
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRegion = !this.selectedRegion || 
        service.regions.includes(this.selectedRegion);
      
      const matchesCategory = !this.selectedCategory || 
        service.category === this.selectedCategory;
      
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }

  clearFilters(): void {
    this.selectedRegion = '';
    this.searchTerm = '';
    this.selectedCategory = '';
    this.filteredServices = this.services;
  }

  requestService(service: Service): void {
    this.router.navigate(['/client/request-service'], { 
      queryParams: { serviceId: service.id } 
    });
  }
}

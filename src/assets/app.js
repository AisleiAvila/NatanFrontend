// Natan Construtora - Sistema de Gestão de Serviços
class NatanApp {
    constructor() {
        this.currentUser = null;
        this.currentLanguage = 'pt';
        this.translations = {};
        this.services = [];
        this.requests = [];
        this.quotes = [];
        this.init();
    }

    init() {
        this.loadTranslations();
        this.loadMockData();
        this.setupEventListeners();
    }

    loadTranslations() {
        this.translations = {
            pt: {
                'nav.home': 'Início',
                'nav.services': 'Serviços',
                'nav.about': 'Sobre',
                'nav.contact': 'Contato',
                'nav.login': 'Login',
                'nav.areas': 'Áreas de Atendimento',
                'hero.title': 'Construindo o Futuro',
                'hero.subtitle': 'Plataforma completa para conectar clientes e prestadores de serviços de construção com qualidade e confiança.',
                'hero.request_service': 'Solicitar Serviço',
                'hero.quote': 'Solicitar Orçamento',
                'services.electrical': 'Serviços Elétricos',
                'services.plumbing': 'Encanamento',
                'services.construction': 'Construção',
                'services.painting': 'Pintura',
                'form.name': 'Nome',
                'form.email': 'E-mail',
                'form.phone': 'Telefone',
                'form.whatsapp': 'WhatsApp (opcional)',
                'form.location': 'Localidade',
                'form.service_type': 'Tipo de Serviço',
                'form.description': 'Descrição do Problema',
                'form.submit': 'Solicitar Orçamento',
                'status.pending': 'Pendente',
                'status.quoted': 'Orçamento Enviado',
                'status.approved': 'Aprovado',
                'status.in_progress': 'Em Andamento',
                'status.completed': 'Concluído',
                'status.cancelled': 'Cancelado'
            },
            en: {
                'nav.home': 'Home',
                'nav.services': 'Services',
                'nav.about': 'About',
                'nav.contact': 'Contact',
                'nav.login': 'Login',
                'nav.areas': 'Service Areas',
                'hero.title': 'Building the Future',
                'hero.subtitle': 'Complete platform to connect clients and construction service providers with quality and trust.',
                'hero.request_service': 'Request Service',
                'hero.quote': 'Request Quote',
                'services.electrical': 'Electrical Services',
                'services.plumbing': 'Plumbing',
                'services.construction': 'Construction',
                'services.painting': 'Painting',
                'form.name': 'Name',
                'form.email': 'Email',
                'form.phone': 'Phone',
                'form.whatsapp': 'WhatsApp (optional)',
                'form.location': 'Location',
                'form.service_type': 'Service Type',
                'form.description': 'Problem Description',
                'form.submit': 'Request Quote',
                'status.pending': 'Pending',
                'status.quoted': 'Quote Sent',
                'status.approved': 'Approved',
                'status.in_progress': 'In Progress',
                'status.completed': 'Completed',
                'status.cancelled': 'Cancelled'
            }
        };
    }

    loadMockData() {
        this.services = [
            {
                id: 1,
                name: 'Serviços Elétricos',
                nameEn: 'Electrical Services',
                price: 45,
                duration: 120,
                regions: ['São Miguel', 'Aveiro', 'Coimbra'],
                description: 'Instalação, manutenção e reparo de sistemas elétricos',
                icon: '⚡'
            },
            {
                id: 2,
                name: 'Encanamento',
                nameEn: 'Plumbing',
                price: 40,
                duration: 90,
                regions: ['São Miguel', 'Aveiro'],
                description: 'Instalação e reparo de tubulações e sistemas hidráulicos',
                icon: '🔧'
            },
            {
                id: 3,
                name: 'Construção',
                nameEn: 'Construction',
                price: 0,
                duration: 0,
                regions: ['São Miguel', 'Aveiro', 'Coimbra'],
                description: 'Obras de construção civil e reformas',
                icon: '🏠'
            },
            {
                id: 4,
                name: 'Pintura',
                nameEn: 'Painting',
                price: 35,
                duration: 240,
                regions: ['São Miguel', 'Aveiro', 'Coimbra'],
                description: 'Pintura interna e externa, texturização',
                icon: '🎨'
            }
        ];

        this.requests = [
            {
                id: 1,
                clientName: 'João Silva',
                email: 'joao@email.com',
                phone: '+351 912 345 678',
                whatsapp: '+351 912 345 678',
                location: 'São Miguel',
                serviceId: 1,
                serviceName: 'Serviços Elétricos',
                description: 'Preciso instalar tomadas na cozinha',
                status: 'pending',
                createdAt: '2025-06-08T10:00:00Z',
                preferredDates: ['2025-06-10T09:00:00Z', '2025-06-11T14:00:00Z'],
                photos: [],
                nifRequested: true,
                nif: '123456789'
            },
            {
                id: 2,
                clientName: 'Maria Santos',
                email: 'maria@email.com',
                phone: '+351 913 456 789',
                location: 'Aveiro',
                serviceId: 2,
                serviceName: 'Encanamento',
                description: 'Vazamento na torneira da cozinha',
                status: 'quoted',
                createdAt: '2025-06-07T15:30:00Z',
                preferredDates: ['2025-06-09T10:00:00Z'],
                photos: [],
                nifRequested: false
            }
        ];

        this.quotes = [
            {
                id: 1,
                requestId: 2,
                amount: 80.00,
                description: 'Reparo de torneira - mão de obra e peças',
                iva: 18.40,
                total: 98.40,
                validUntil: '2025-06-15T00:00:00Z',
                status: 'pending_approval',
                createdAt: '2025-06-08T09:00:00Z'
            }
        ];
    }

    setupEventListeners() {
        // Language toggle
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('language-toggle')) {
                this.toggleLanguage();
            }
        });
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';
        this.updateTranslations();
    }

    updateTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.translate(key);
        });
    }

    // Authentication Methods
    loginWithMagicLink(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = {
                    id: Math.random().toString(36).substr(2, 9),
                    email: email,
                    name: email.split('@')[0],
                    role: 'client',
                    loginMethod: 'magic_link'
                };
                this.currentUser = user;
                resolve(user);
            }, 1000);
        });
    }

    // Service Request Methods
    submitServiceRequest(formData) {
        const request = {
            id: this.requests.length + 1,
            ...formData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            photos: formData.photos || []
        };
        
        this.requests.push(request);
        return request;
    }

    getServiceRequests(filters = {}) {
        let filtered = [...this.requests];
        
        if (filters.status) {
            filtered = filtered.filter(req => req.status === filters.status);
        }
        
        if (filters.location) {
            filtered = filtered.filter(req => req.location === filters.location);
        }
        
        return filtered;
    }

    // Quote Management
    approveQuote(quoteId) {
        const quote = this.quotes.find(q => q.id === quoteId);
        if (quote) {
            quote.status = 'approved';
            const request = this.requests.find(r => r.id === quote.requestId);
            if (request) {
                request.status = 'approved';
            }
        }
        return quote;
    }

    rejectQuote(quoteId, reason = '') {
        const quote = this.quotes.find(q => q.id === quoteId);
        if (quote) {
            quote.status = 'rejected';
            quote.rejectionReason = reason;
            const request = this.requests.find(r => r.id === quote.requestId);
            if (request) {
                request.status = 'pending';
            }
        }
        return quote;
    }

    // Provider Methods
    updateProviderAvailability(providerId, isAvailable) {
        // Simulate provider availability update
        return { providerId, isAvailable, updatedAt: new Date().toISOString() };
    }

    uploadServicePhotos(requestId, photos) {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
            request.beforePhotos = photos.before || [];
            request.afterPhotos = photos.after || [];
        }
        return request;
    }

    completeService(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
            request.status = 'completed';
            request.completedAt = new Date().toISOString();
        }
        return request;
    }

    // Rating and Reviews
    submitRating(requestId, rating, comment = '') {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
            request.rating = {
                stars: rating,
                comment: comment,
                submittedAt: new Date().toISOString()
            };
        }
        return request;
    }

    // Utility Methods
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString(this.currentLanguage === 'pt' ? 'pt-PT' : 'en-US');
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat(this.currentLanguage === 'pt' ? 'pt-PT' : 'en-US', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    }

    getStatusColor(status) {
        const colors = {
            pending: '#ff9800',
            quoted: '#2196f3',
            approved: '#4caf50',
            in_progress: '#9c27b0',
            completed: '#4caf50',
            cancelled: '#f44336'
        };
        return colors[status] || '#666';
    }
}

// Initialize the app
window.natanApp = new NatanApp();
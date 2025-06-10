// Interações e funcionalidades específicas da plataforma

// Inicialização dos dashboards
function initializeDashboard(role) {
    if (role === 'client') {
        initializeClientDashboard();
    } else if (role === 'provider') {
        initializeProviderDashboard();
    } else if (role === 'admin') {
        initializeAdminDashboard();
    }
}

function initializeClientDashboard() {
    // Configurar filtros de solicitações
    window.filterRequests = function(status) {
        const items = document.querySelectorAll('.request-item');
        const buttons = document.querySelectorAll('.filter-btn');
        
        buttons.forEach(btn => {
            btn.style.background = 'white';
            btn.style.color = '#666';
        });
        
        const activeBtn = document.querySelector(`[data-filter="${status}"]`);
        if (activeBtn) {
            activeBtn.style.background = '#1976d2';
            activeBtn.style.color = 'white';
        }
        
        items.forEach(item => {
            if (status === 'all' || item.dataset.status === status) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // Ações de orçamentos
    window.approveQuote = function(quoteId) {
        showLoadingOverlay('Aprovando orçamento...');
        setTimeout(() => {
            hideLoadingOverlay();
            const quote = natanApp.approveQuote(quoteId);
            alert('Orçamento aprovado com sucesso!\nO prestador será notificado e o trabalho será agendado.');
            location.reload();
        }, 1500);
    };

    window.rejectQuote = function(quoteId) {
        const reason = prompt('Motivo da recusa (opcional):');
        showLoadingOverlay('Processando recusa...');
        setTimeout(() => {
            hideLoadingOverlay();
            natanApp.rejectQuote(quoteId, reason);
            alert('Orçamento recusado. Um novo orçamento será preparado.');
            location.reload();
        }, 1000);
    };

    window.requestRevision = function(quoteId) {
        const comments = prompt('Comentários para revisão:');
        if (comments) {
            showLoadingOverlay('Solicitando revisão...');
            setTimeout(() => {
                hideLoadingOverlay();
                alert('Solicitação de revisão enviada.\nEntraremos em contacto em breve.');
            }, 1000);
        }
    };

    window.rateService = function(requestId) {
        document.body.innerHTML = getRatingForm(requestId);
        initializeRatingForm(requestId);
    };

    window.viewDetails = function(requestId) {
        const request = natanApp.requests.find(r => r.id === requestId);
        if (request) {
            document.body.innerHTML = getRequestDetailsView(request);
        }
    };
}

function initializeProviderDashboard() {
    let isAvailable = true;
    
    window.toggleAvailability = function() {
        isAvailable = !isAvailable;
        const btn = document.getElementById('availabilityBtn');
        if (isAvailable) {
            btn.innerHTML = '🟢 Disponível';
            btn.style.background = '#4caf50';
        } else {
            btn.innerHTML = '🔴 Indisponível';
            btn.style.background = '#f44336';
        }
        natanApp.updateProviderAvailability(natanApp.currentUser.id, isAvailable);
    };

    window.selectDay = function(dayIndex) {
        alert(`Dia ${dayIndex + 1} selecionado. Funcionalidade de calendário detalhado em desenvolvimento.`);
    };

    window.viewNewRequests = function() {
        document.body.innerHTML = getNewRequestsView();
    };

    window.uploadPhotos = function() {
        document.body.innerHTML = getPhotoUploadView();
        initializePhotoUpload();
    };

    window.markCompleted = function() {
        document.body.innerHTML = getCompletionView();
    };

    window.viewAppointmentDetails = function() {
        alert('Detalhes do agendamento:\n• Cliente: João Silva\n• Serviço: Instalação elétrica\n• Local: Rua das Flores, 123\n• Horário: 09:00\n• Telefone: +351 912 345 678');
    };

    window.navigateToLocation = function() {
        alert('Abrindo Google Maps...\n(Integração com Google Maps API)');
    };
}

function initializeAdminDashboard() {
    window.filterAdminRequests = function(filter) {
        const items = document.querySelectorAll('.admin-request-item');
        const buttons = document.querySelectorAll('.admin-filter-btn');
        
        buttons.forEach(btn => {
            btn.style.background = 'white';
            btn.style.color = '#666';
        });
        
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.style.background = '#9c27b0';
            activeBtn.style.color = 'white';
        }
        
        items.forEach(item => {
            let show = false;
            if (filter === 'all') {
                show = true;
            } else if (filter === 'pending' && item.dataset.status === 'pending') {
                show = true;
            } else if (filter === 'urgent' && item.dataset.priority === 'urgent') {
                show = true;
            }
            item.style.display = show ? 'block' : 'none';
        });
    };

    window.exportReports = function() {
        showLoadingOverlay('Gerando relatórios...');
        setTimeout(() => {
            hideLoadingOverlay();
            alert('Relatório gerado com sucesso!\n• Solicitações: 156\n• Receita: €28,750\n• Satisfação: 4.7/5\n\nDownload iniciado...');
        }, 2000);
    };

    window.manageUsers = function() {
        document.body.innerHTML = getUserManagementView();
    };

    window.manageServices = function() {
        document.body.innerHTML = getServiceManagementView();
    };

    window.createQuote = function() {
        document.body.innerHTML = getQuoteCreationView();
        initializeQuoteForm();
    };

    window.assignProvider = function() {
        document.body.innerHTML = getProviderAssignmentView();
    };

    window.viewRequestDetails = function(requestId) {
        const request = natanApp.requests.find(r => r.id === requestId);
        if (request) {
            document.body.innerHTML = getAdminRequestDetailsView(request);
        }
    };

    window.assignProviderToRequest = function(requestId) {
        alert(`Atribuindo prestador à solicitação ${requestId}...\nSugestão inteligente: Maria Santos (4.8★)\nRazão: Especialista em elétrica, próxima da localização`);
    };

    window.createQuoteForRequest = function(requestId) {
        document.body.innerHTML = getQuoteCreationView(requestId);
        initializeQuoteForm(requestId);
    };
}

// Formulário de Serviço
function initializeServiceForm() {
    // Preencher dropdown de serviços
    const serviceSelect = document.getElementById('serviceSelect');
    natanApp.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.icon} ${service.name} - €${service.price}/h`;
        serviceSelect.appendChild(option);
    });

    // Configurar checkbox do NIF
    document.getElementById('nifCheckbox').addEventListener('change', function() {
        const nifField = document.getElementById('nifField');
        nifField.style.display = this.checked ? 'block' : 'none';
    });

    // Upload de mídia
    document.getElementById('mediaUpload').addEventListener('change', handleMediaUpload);

    // Submissão do formulário
    document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const requestData = {};
        
        for (let [key, value] of formData.entries()) {
            requestData[key] = value;
        }
        
        // Processar datas preferenciais
        const preferredDates = [];
        if (requestData.preferredDate1) preferredDates.push(requestData.preferredDate1);
        if (requestData.preferredDate2) preferredDates.push(requestData.preferredDate2);
        if (requestData.preferredDate3) preferredDates.push(requestData.preferredDate3);
        requestData.preferredDates = preferredDates;

        // Adicionar nome do serviço
        const service = natanApp.services.find(s => s.id == requestData.serviceId);
        requestData.serviceName = service ? service.name : 'Serviço não encontrado';
        
        showLoadingOverlay('Enviando solicitação...');
        
        setTimeout(() => {
            hideLoadingOverlay();
            const newRequest = natanApp.submitServiceRequest(requestData);
            
            document.body.innerHTML = getSuccessPage(newRequest);
        }, 2000);
    });
}

function handleMediaUpload(event) {
    const files = Array.from(event.target.files);
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = '';
    
    files.forEach((file, index) => {
        if (index < 5) { // Máximo 5 arquivos
            const item = document.createElement('div');
            item.style.cssText = 'position: relative; background: #f0f0f0; border-radius: 8px; padding: 10px; text-align: center;';
            
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.style.cssText = 'width: 100%; height: 80px; object-fit: cover; border-radius: 5px;';
                img.src = URL.createObjectURL(file);
                item.appendChild(img);
            } else {
                item.innerHTML = `<div style="font-size: 30px;">🎥</div><div style="font-size: 12px;">${file.name}</div>`;
            }
            
            preview.appendChild(item);
        }
    });
}

// Sistema de Avaliações
function getRatingForm(requestId) {
    const request = natanApp.requests.find(r => r.id === requestId);
    
    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto;">
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1976d2; margin-bottom: 10px;">⭐ Avaliar Serviço</h1>
                    <p style="color: #666;">Como foi a experiência com o serviço de ${request.serviceName}?</p>
                </div>

                <form id="ratingForm" style="display: grid; gap: 25px;">
                    <!-- Avaliação por estrelas -->
                    <div style="text-align: center;">
                        <label style="display: block; margin-bottom: 15px; font-weight: 600; color: #333;">Avaliação Geral</label>
                        <div id="starRating" style="font-size: 3rem; cursor: pointer;">
                            <span data-rating="1">☆</span>
                            <span data-rating="2">☆</span>
                            <span data-rating="3">☆</span>
                            <span data-rating="4">☆</span>
                            <span data-rating="5">☆</span>
                        </div>
                        <p id="ratingText" style="margin: 10px 0 0 0; color: #666; font-style: italic;">Clique nas estrelas para avaliar</p>
                    </div>

                    <!-- Comentário -->
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Comentário (opcional)</label>
                        <textarea name="comment" rows="4" placeholder="Conte-nos sobre sua experiência..."
                            style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px; resize: vertical;"></textarea>
                    </div>

                    <!-- Fotos do serviço -->
                    ${request.beforePhotos || request.afterPhotos ? `
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="margin: 0 0 15px 0; color: #333;">📸 Fotos do Serviço</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            ${request.beforePhotos ? `
                            <div>
                                <h4 style="margin: 0 0 10px 0; color: #666;">Antes</h4>
                                <div style="height: 150px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999;">
                                    Foto do estado inicial
                                </div>
                            </div>
                            ` : ''}
                            ${request.afterPhotos ? `
                            <div>
                                <h4 style="margin: 0 0 10px 0; color: #666;">Depois</h4>
                                <div style="height: 150px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999;">
                                    Foto do trabalho concluído
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Botões -->
                    <div style="display: flex; gap: 15px; justify-content: center; margin-top: 20px;">
                        <button type="button" onclick="goHome()" 
                            style="padding: 15px 30px; background: #666; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer;">
                            Cancelar
                        </button>
                        <button type="submit" 
                            style="padding: 15px 40px; background: #1976d2; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer; font-weight: 600;">
                            ⭐ Enviar Avaliação
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}

function initializeRatingForm(requestId) {
    let selectedRating = 0;
    const stars = document.querySelectorAll('#starRating span');
    const ratingText = document.getElementById('ratingText');
    
    const ratingTexts = {
        1: 'Muito insatisfeito',
        2: 'Insatisfeito',
        3: 'Neutro',
        4: 'Satisfeito',
        5: 'Muito satisfeito'
    };
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStars();
            ratingText.textContent = ratingTexts[selectedRating];
            ratingText.style.color = '#1976d2';
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });
    
    document.getElementById('starRating').addEventListener('mouseleave', function() {
        updateStars();
    });
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            star.textContent = index < rating ? '★' : '☆';
            star.style.color = index < rating ? '#ffa726' : '#ddd';
        });
    }
    
    function updateStars() {
        highlightStars(selectedRating);
    }
    
    // Submissão da avaliação
    document.getElementById('ratingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (selectedRating === 0) {
            alert('Por favor, selecione uma avaliação.');
            return;
        }
        
        const formData = new FormData(this);
        const comment = formData.get('comment');
        
        showLoadingOverlay('Enviando avaliação...');
        
        setTimeout(() => {
            hideLoadingOverlay();
            natanApp.submitRating(requestId, selectedRating, comment);
            
            alert(`Obrigado pela sua avaliação!\n⭐ ${selectedRating} estrelas\n\nSua opinião é muito importante para nós.`);
            
            // Voltar ao dashboard do cliente
            const user = natanApp.currentUser;
            document.body.innerHTML = getClientDashboard(user);
            initializeClientDashboard();
        }, 1500);
    });
}

// Páginas de sucesso e confirmação
function getSuccessPage(request) {
    return `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: white; border-radius: 20px; padding: 50px; text-align: center; max-width: 500px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
            <div style="font-size: 5rem; margin-bottom: 30px;">✅</div>
            <h1 style="color: #4caf50; margin-bottom: 20px;">Solicitação Enviada!</h1>
            <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                Sua solicitação de <strong>${request.serviceName}</strong> foi recebida com sucesso.
                Entraremos em contacto em até <strong>2 horas</strong> com um orçamento detalhado.
            </p>
            
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 30px; text-align: left;">
                <h3 style="margin: 0 0 15px 0; color: #333;">📋 Resumo da Solicitação</h3>
                <p style="margin: 5px 0; color: #666;"><strong>ID:</strong> #${request.id}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Serviço:</strong> ${request.serviceName}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Local:</strong> ${request.location}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Contacto:</strong> ${request.email}</p>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button onclick="showMagicLinkLogin()" style="background: #1976d2; color: white; border: none; padding: 15px 25px; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    👤 Acompanhar Pedido
                </button>
                <button onclick="goHome()" style="background: #666; color: white; border: none; padding: 15px 25px; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    🏠 Voltar ao Início
                </button>
            </div>
        </div>
    </div>
    `;
}

// Funcionalidades gerais
function openWhatsApp() {
    const message = encodeURIComponent('Olá! Gostaria de obter informações sobre os serviços da Natan Construtora.');
    window.open(`https://wa.me/351XXXXXXXXX?text=${message}`, '_blank');
}

function toggleLanguage() {
    natanApp.toggleLanguage();
    alert(`Idioma alterado para: ${natanApp.currentLanguage === 'pt' ? 'Português' : 'English'}`);
}

function goHome() {
    location.reload();
}
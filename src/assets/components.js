// Components para a plataforma Natan Construtora

function getServiceRequestForm() {
    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="background: white; border-radius: 15px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #1976d2; margin-bottom: 10px;">🏗️ Solicitar Serviço</h1>
                    <p style="color: #666;">Preencha o formulário para receber um orçamento personalizado</p>
                </div>

                <form id="serviceRequestForm" style="display: grid; gap: 20px;">
                    <!-- Dados Pessoais -->
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="color: #1976d2; margin-bottom: 15px;">📋 Dados Pessoais</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Nome *</label>
                                <input type="text" name="clientName" required 
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">E-mail *</label>
                                <input type="email" name="email" required 
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Telefone *</label>
                                <input type="tel" name="phone" required placeholder="+351 XXX XXX XXX"
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">WhatsApp (opcional)</label>
                                <input type="tel" name="whatsapp" placeholder="+351 XXX XXX XXX"
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                        </div>
                    </div>

                    <!-- Detalhes do Serviço -->
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="color: #1976d2; margin-bottom: 15px;">🔧 Detalhes do Serviço</h3>
                        <div style="display: grid; gap: 15px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Localidade *</label>
                                    <select name="location" required 
                                        style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                                        <option value="">Selecione a localidade</option>
                                        <option value="São Miguel">São Miguel</option>
                                        <option value="Aveiro">Aveiro</option>
                                        <option value="Coimbra">Coimbra</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Tipo de Serviço *</label>
                                    <select name="serviceId" required id="serviceSelect"
                                        style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                                        <option value="">Selecione o serviço</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Descrição do Problema *</label>
                                <textarea name="description" required rows="4" placeholder="Descreva detalhadamente o problema ou serviço necessário..."
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; resize: vertical;"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Datas Preferenciais -->
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="color: #1976d2; margin-bottom: 15px;">📅 Datas Preferenciais (até 3)</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">1ª Opção</label>
                                <input type="datetime-local" name="preferredDate1"
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">2ª Opção</label>
                                <input type="datetime-local" name="preferredDate2"
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">3ª Opção</label>
                                <input type="datetime-local" name="preferredDate3"
                                    style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                        </div>
                    </div>

                    <!-- Upload de Fotos/Vídeos -->
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="color: #1976d2; margin-bottom: 15px;">📸 Fotos/Vídeos (opcional)</h3>
                        <div style="border: 2px dashed #ccc; border-radius: 10px; padding: 30px; text-align: center; background: #f9f9f9;">
                            <input type="file" id="mediaUpload" multiple accept="image/*,video/*" style="display: none;">
                            <div onclick="document.getElementById('mediaUpload').click()" style="cursor: pointer;">
                                <div style="font-size: 48px; margin-bottom: 10px;">📷</div>
                                <p style="color: #666; margin: 0;">Clique para adicionar fotos ou vídeos</p>
                                <p style="color: #999; font-size: 14px; margin: 5px 0 0 0;">Máximo 5 arquivos, até 10MB cada</p>
                            </div>
                            <div id="uploadPreview" style="margin-top: 15px; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;"></div>
                        </div>
                    </div>

                    <!-- Consentimentos -->
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="color: #1976d2; margin-bottom: 15px;">✅ Consentimentos</h3>
                        <div style="display: grid; gap: 15px;">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" name="termsAccepted" required 
                                    style="width: 20px; height: 20px; accent-color: #1976d2;">
                                <span>Aceito os <a href="#" style="color: #1976d2;">Termos de Serviço</a> *</span>
                            </label>
                            
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" name="nifRequested" id="nifCheckbox"
                                    style="width: 20px; height: 20px; accent-color: #1976d2;">
                                <span>Solicitar inclusão do NIF no orçamento (para dedução fiscal)</span>
                            </label>
                            
                            <div id="nifField" style="display: none; margin-top: 10px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">NIF</label>
                                <input type="text" name="nif" pattern="[0-9]{9}" placeholder="123456789"
                                    style="width: 200px; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            </div>
                        </div>
                    </div>

                    <!-- Botões -->
                    <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                        <button type="button" onclick="goHome()" 
                            style="padding: 15px 30px; background: #666; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer;">
                            Cancelar
                        </button>
                        <button type="submit" 
                            style="padding: 15px 40px; background: #1976d2; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer; font-weight: 600;">
                            📨 Solicitar Orçamento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}

function getClientDashboard(user) {
    const requests = natanApp.getServiceRequests();
    const quotes = natanApp.quotes;
    
    return `
    <div style="min-height: 100vh; background: #f5f5f5;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; padding: 20px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 style="margin: 0; font-size: 1.8rem;">🏗️ Natan Construtora</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Olá, ${user.name}!</p>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <button onclick="showServiceRequestForm()" style="background: #ff5722; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer; font-weight: 600;">
                        + Novo Serviço
                    </button>
                    <button onclick="toggleLanguage()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 10px 15px; border-radius: 15px; cursor: pointer;">
                        🌐 PT/EN
                    </button>
                    <button onclick="goHome()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 10px 15px; border-radius: 15px; cursor: pointer;">
                        🚪 Sair
                    </button>
                </div>
            </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 30px 20px;">
            <!-- Estatísticas Rápidas -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 2.5rem; color: #ff9800; margin-bottom: 10px;">📋</div>
                    <h3 style="margin: 0; color: #333;">Solicitações Ativas</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #ff9800; margin: 10px 0 0 0;">${requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length}</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 2.5rem; color: #2196f3; margin-bottom: 10px;">💰</div>
                    <h3 style="margin: 0; color: #333;">Orçamentos Pendentes</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #2196f3; margin: 10px 0 0 0;">${quotes.filter(q => q.status === 'pending_approval').length}</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 2.5rem; color: #4caf50; margin-bottom: 10px;">✅</div>
                    <h3 style="margin: 0; color: #333;">Serviços Concluídos</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #4caf50; margin: 10px 0 0 0;">${requests.filter(r => r.status === 'completed').length}</p>
                </div>
            </div>

            <!-- Minhas Solicitações -->
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 30px;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 25px;">
                    <h2 style="margin: 0; color: #333;">📋 Minhas Solicitações</h2>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="filterRequests('all')" class="filter-btn active" data-filter="all" 
                            style="padding: 8px 15px; border: 1px solid #ddd; background: #1976d2; color: white; border-radius: 20px; cursor: pointer; font-size: 14px;">
                            Todas
                        </button>
                        <button onclick="filterRequests('pending')" class="filter-btn" data-filter="pending"
                            style="padding: 8px 15px; border: 1px solid #ddd; background: white; color: #666; border-radius: 20px; cursor: pointer; font-size: 14px;">
                            Pendentes
                        </button>
                        <button onclick="filterRequests('in_progress')" class="filter-btn" data-filter="in_progress"
                            style="padding: 8px 15px; border: 1px solid #ddd; background: white; color: #666; border-radius: 20px; cursor: pointer; font-size: 14px;">
                            Em Andamento
                        </button>
                    </div>
                </div>
                
                <div id="requestsList">
                    ${generateRequestsList(requests, quotes)}
                </div>
            </div>

            <!-- Ações Rápidas -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div onclick="showAreasOfService()" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); cursor: pointer; text-align: center; transition: transform 0.3s; border: 2px solid transparent;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🗺️</div>
                    <h3 style="margin: 0 0 10px 0; color: #333;">Áreas de Atendimento</h3>
                    <p style="color: #666; margin: 0;">Ver regiões cobertas</p>
                </div>
                
                <div onclick="showContactForm()" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); cursor: pointer; text-align: center; transition: transform 0.3s; border: 2px solid transparent;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📞</div>
                    <h3 style="margin: 0 0 10px 0; color: #333;">Contato</h3>
                    <p style="color: #666; margin: 0;">Fale conosco</p>
                </div>
                
                <div onclick="openWhatsApp()" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); cursor: pointer; text-align: center; transition: transform 0.3s; border: 2px solid transparent;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📱</div>
                    <h3 style="margin: 0 0 10px 0; color: #333;">WhatsApp</h3>
                    <p style="color: #666; margin: 0;">Atendimento direto</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function generateRequestsList(requests, quotes) {
    if (!requests.length) {
        return `
        <div style="text-align: center; padding: 40px; color: #666;">
            <div style="font-size: 4rem; margin-bottom: 20px;">📝</div>
            <h3>Nenhuma solicitação encontrada</h3>
            <p>Clique em "Novo Serviço" para solicitar seu primeiro orçamento</p>
        </div>
        `;
    }

    return requests.map(request => {
        const quote = quotes.find(q => q.requestId === request.id);
        const statusColor = natanApp.getStatusColor(request.status);
        
        return `
        <div class="request-item" data-status="${request.status}" style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; margin-bottom: 15px; transition: all 0.3s;">
            <div style="display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: start;">
                <div>
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <h3 style="margin: 0; color: #333;">${natanApp.services.find(s => s.id == request.serviceId)?.icon || '🔧'} ${request.serviceName}</h3>
                        <span style="background: ${statusColor}; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">
                            ${getStatusText(request.status)}
                        </span>
                    </div>
                    
                    <div style="color: #666; line-height: 1.6;">
                        <p style="margin: 5px 0;"><strong>Local:</strong> ${request.location}</p>
                        <p style="margin: 5px 0;"><strong>Data:</strong> ${natanApp.formatDate(request.createdAt)}</p>
                        <p style="margin: 5px 0;"><strong>Descrição:</strong> ${request.description}</p>
                        ${quote ? `<p style="margin: 5px 0;"><strong>Orçamento:</strong> ${natanApp.formatCurrency(quote.total)}</p>` : ''}
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 10px; min-width: 120px;">
                    ${getRequestActions(request, quote)}
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function getStatusText(status) {
    const statusTexts = {
        'pending': 'Pendente',
        'quoted': 'Orçamento Enviado',
        'approved': 'Aprovado',
        'in_progress': 'Em Andamento',
        'completed': 'Concluído',
        'cancelled': 'Cancelado'
    };
    return statusTexts[status] || status;
}

function getRequestActions(request, quote) {
    if (request.status === 'quoted' && quote && quote.status === 'pending_approval') {
        return `
        <button onclick="approveQuote(${quote.id})" style="background: #4caf50; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; width: 100%;">
            ✅ Aprovar
        </button>
        <button onclick="rejectQuote(${quote.id})" style="background: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; width: 100%;">
            ❌ Recusar
        </button>
        <button onclick="requestRevision(${quote.id})" style="background: #ff9800; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; width: 100%;">
            🔄 Revisar
        </button>
        `;
    }
    
    if (request.status === 'completed' && !request.rating) {
        return `
        <button onclick="rateService(${request.id})" style="background: #1976d2; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; width: 100%;">
            ⭐ Avaliar
        </button>
        `;
    }
    
    return `
    <button onclick="viewDetails(${request.id})" style="background: #666; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; width: 100%;">
        👁️ Ver Detalhes
    </button>
    `;
}

function getAreasOfServicePage() {
    return `
    <div style="min-height: 100vh; background: #f5f5f5;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; padding: 40px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 2.5rem;">🗺️ Áreas de Atendimento</h1>
                <p style="margin: 15px 0 0 0; font-size: 1.2rem; opacity: 0.9;">Cobrimos as principais regiões com excelência e qualidade</p>
            </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
            <!-- Regiões Cobertas -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-bottom: 50px;">
                <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; border: 3px solid #e3f2fd;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #1976d2, #1565c0); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem;">🏝️</div>
                    <h3 style="color: #1976d2; margin: 0 0 15px 0; font-size: 1.5rem;">São Miguel</h3>
                    <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">Cobertura completa da ilha de São Miguel, incluindo todas as freguesias e concelhos.</p>
                    <div style="background: #f8f9fa; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                        <p style="margin: 0; font-weight: 600; color: #333;">Principais localidades:</p>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Ponta Delgada, Ribeira Grande, Lagoa, Vila Franca do Campo</p>
                    </div>
                    <div style="color: #4caf50; font-weight: 600;">✅ Disponível 24/7</div>
                </div>

                <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; border: 3px solid #e8f5e8;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4caf50, #388e3c); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem;">🏘️</div>
                    <h3 style="color: #4caf50; margin: 0 0 15px 0; font-size: 1.5rem;">Aveiro</h3>
                    <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">Atendimento em Aveiro e região metropolitana com equipe especializada.</p>
                    <div style="background: #f8f9fa; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                        <p style="margin: 0; font-weight: 600; color: #333;">Principais localidades:</p>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Aveiro, Ílhavo, Águeda, Ovar, Estarreja</p>
                    </div>
                    <div style="color: #4caf50; font-weight: 600;">✅ Atendimento prioritário</div>
                </div>

                <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; border: 3px solid #fff3e0;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ff9800, #f57c00); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem;">🏛️</div>
                    <h3 style="color: #ff9800; margin: 0 0 15px 0; font-size: 1.5rem;">Coimbra</h3>
                    <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">Serviços em Coimbra e concelhos limítrofes com profissionais qualificados.</p>
                    <div style="background: #f8f9fa; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                        <p style="margin: 0; font-weight: 600; color: #333;">Principais localidades:</p>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Coimbra, Figueira da Foz, Cantanhede, Montemor-o-Velho</p>
                    </div>
                    <div style="color: #4caf50; font-weight: 600;">✅ Cobertura expandida</div>
                </div>
            </div>

            <!-- Mapa Visual Simples -->
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; margin-bottom: 40px;">
                <h2 style="color: #333; margin: 0 0 30px 0;">🗺️ Mapa de Cobertura</h2>
                <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 15px; padding: 40px; position: relative; min-height: 300px; display: flex; align-items: center; justify-content: center;">
                    <div style="position: relative; width: 100%; max-width: 600px;">
                        <!-- Simulação visual do mapa -->
                        <div style="position: absolute; top: 20px; left: 50px; background: #1976d2; color: white; padding: 10px 15px; border-radius: 20px; font-weight: 600;">🏝️ São Miguel</div>
                        <div style="position: absolute; bottom: 80px; right: 100px; background: #4caf50; color: white; padding: 10px 15px; border-radius: 20px; font-weight: 600;">🏘️ Aveiro</div>
                        <div style="position: absolute; bottom: 40px; right: 200px; background: #ff9800; color: white; padding: 10px 15px; border-radius: 20px; font-weight: 600;">🏛️ Coimbra</div>
                        
                        <div style="text-align: center; margin-top: 100px;">
                            <p style="color: #666; font-size: 18px;">Expansão contínua para novas regiões</p>
                            <p style="color: #1976d2; font-weight: 600;">+ 50 mil clientes atendidos</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contactos por Região -->
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 40px;">
                <h2 style="color: #333; margin: 0 0 30px 0; text-align: center;">📞 Contactos por Região</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
                    <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; text-align: center;">
                        <h4 style="color: #1976d2; margin: 0 0 15px 0;">São Miguel</h4>
                        <p style="margin: 5px 0; color: #666;">📞 +351 296 XXX XXX</p>
                        <p style="margin: 5px 0; color: #666;">📱 +351 91X XXX XXX</p>
                        <p style="margin: 5px 0; color: #666;">✉️ saomiguel@natan.pt</p>
                    </div>
                    <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; text-align: center;">
                        <h4 style="color: #4caf50; margin: 0 0 15px 0;">Aveiro</h4>
                        <p style="margin: 5px 0; color: #666;">📞 +351 234 XXX XXX</p>
                        <p style="margin: 5px 0; color: #666;">📱 +351 92X XXX XXX</p>
                        <p style="margin: 5px 0; color: #666;">✉️ aveiro@natan.pt</p>
                    </div>
                    <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; text-align: center;">
                        <h4 style="color: #ff9800; margin: 0 0 15px 0;">Coimbra</h4>
                        <p style="margin: 5px 0; color: #666;">📞 +351 239 XXX XXX</p>
                        <p style="margin: 5px 0; color: #666;">📱 +351 93X XXX XXX</p>
                        <p style="margin: 5px 0; color: #666;">✉️ coimbra@natan.pt</p>
                    </div>
                </div>
            </div>

            <!-- Botão Voltar -->
            <div style="text-align: center;">
                <button onclick="goHome()" style="background: #1976d2; color: white; border: none; padding: 15px 40px; border-radius: 25px; font-size: 16px; cursor: pointer; font-weight: 600;">
                    🏠 Voltar ao Início
                </button>
            </div>
        </div>
    </div>
    `;
}

function getServicesPage() {
    return `
    <div style="min-height: 100vh; background: #f5f5f5;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; padding: 40px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 2.5rem;">🛠️ Nossos Serviços</h1>
                <p style="margin: 15px 0 0 0; font-size: 1.2rem; opacity: 0.9;">Soluções completas em construção e manutenção</p>
            </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
            <!-- Filtros -->
            <div style="background: white; border-radius: 15px; padding: 25px; margin-bottom: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 20px 0; color: #333;">🔍 Filtrar Serviços</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 20px; align-items: end;">
                    <!-- Filtro por Nome -->
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Buscar por nome:</label>
                        <input type="text" id="serviceNameFilter" placeholder="Digite o nome do serviço..." onkeyup="filterServices()" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                    </div>
                    
                    <!-- Filtro por Região -->
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Região de atendimento:</label>
                        <select id="regionFilter" onchange="filterServices()" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            <option value="">Todas as regiões</option>
                            <option value="São Miguel">São Miguel</option>
                            <option value="Aveiro">Aveiro</option>
                            <option value="Coimbra">Coimbra</option>
                        </select>
                    </div>
                    
                    <!-- Botão Limpar -->
                    <div>
                        <button onclick="clearFilters()" style="background: #666; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            🗑️ Limpar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Lista de Serviços -->
            <div id="servicesList" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px;">
                ${generateServicesList()}
            </div>

            <!-- Botão Voltar -->
            <div style="text-align: center; margin-top: 40px;">
                <button onclick="goHome()" style="background: #1976d2; color: white; border: none; padding: 15px 40px; border-radius: 25px; font-size: 16px; cursor: pointer; font-weight: 600;">
                    🏠 Voltar ao Início
                </button>
            </div>
        </div>
    </div>
    `;
}

function generateServicesList() {
    const services = [
        {
            id: 1,
            name: 'Serviços Elétricos',
            icon: '⚡',
            description: 'Instalação, manutenção e reparação de sistemas elétricos',
            price: '€45/hora',
            regions: ['São Miguel', 'Aveiro', 'Coimbra'],
            specialties: ['Quadros elétricos', 'Iluminação', 'Tomadas e interruptores', 'Certificação elétrica'],
            rating: 4.8,
            reviews: 156
        },
        {
            id: 2,
            name: 'Encanamento',
            icon: '🔧',
            description: 'Instalação e reparação de canalizações e sistemas hidráulicos',
            price: '€40/hora',
            regions: ['São Miguel', 'Aveiro'],
            specialties: ['Canalização', 'Torneiras', 'Autoclismos', 'Fugas de água'],
            rating: 4.6,
            reviews: 98
        },
        {
            id: 3,
            name: 'Pintura',
            icon: '🎨',
            description: 'Pintura interior e exterior com materiais de qualidade',
            price: '€35/hora',
            regions: ['São Miguel', 'Aveiro', 'Coimbra'],
            specialties: ['Pintura interior', 'Pintura exterior', 'Preparação de superfícies', 'Texturizados'],
            rating: 4.7,
            reviews: 203
        },
        {
            id: 4,
            name: 'Construção Civil',
            icon: '🏗️',
            description: 'Obras de construção, ampliação e renovação',
            price: '€55/hora',
            regions: ['São Miguel', 'Coimbra'],
            specialties: ['Alvenaria', 'Betão armado', 'Coberturas', 'Extensões'],
            rating: 4.9,
            reviews: 87
        },
        {
            id: 5,
            name: 'Carpintaria',
            icon: '🪚',
            description: 'Móveis sob medida e reparações em madeira',
            price: '€42/hora',
            regions: ['São Miguel', 'Aveiro'],
            specialties: ['Móveis à medida', 'Portas e janelas', 'Armários', 'Reparações'],
            rating: 4.5,
            reviews: 74
        },
        {
            id: 6,
            name: 'Jardinagem',
            icon: '🌿',
            description: 'Manutenção e criação de espaços verdes',
            price: '€30/hora',
            regions: ['São Miguel', 'Aveiro', 'Coimbra'],
            specialties: ['Poda', 'Plantação', 'Irrigação', 'Design paisagístico'],
            rating: 4.4,
            reviews: 132
        }
    ];

    return services.map(service => `
    <div class="service-card" data-name="${service.name.toLowerCase()}" data-regions="${service.regions.join(',').toLowerCase()}" style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer;" onclick="requestServiceType(${service.id}, '${service.name}')">
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #1976d2, #42a5f5); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 2.5rem;">
                ${service.icon}
            </div>
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 1.3rem;">${service.name}</h3>
            <p style="margin: 0; color: #666; line-height: 1.5;">${service.description}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: 600; color: #1976d2; font-size: 1.1rem;">${service.price}</span>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <div style="color: #ffa726;">${'★'.repeat(Math.floor(service.rating))}${'☆'.repeat(5-Math.floor(service.rating))}</div>
                    <span style="color: #666; font-size: 14px;">(${service.reviews})</span>
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #333; font-size: 14px;">Regiões atendidas:</strong>
                <div style="display: flex; gap: 8px; margin-top: 5px; flex-wrap: wrap;">
                    ${service.regions.map(region => `
                    <span style="background: #e3f2fd; color: #1976d2; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                        ${region}
                    </span>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <strong style="color: #333; font-size: 14px;">Especialidades:</strong>
                <div style="margin-top: 8px;">
                    ${service.specialties.slice(0, 2).map(spec => `
                    <div style="color: #666; font-size: 13px; margin: 2px 0;">• ${spec}</div>
                    `).join('')}
                    ${service.specialties.length > 2 ? `<div style="color: #1976d2; font-size: 13px; font-style: italic;">+ ${service.specialties.length - 2} mais...</div>` : ''}
                </div>
            </div>
        </div>

        <button onclick="event.stopPropagation(); requestServiceType(${service.id}, '${service.name}')" style="width: 100%; background: #1976d2; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 600; transition: background 0.3s;">
            📋 Solicitar Orçamento
        </button>
    </div>
    `).join('');
}

function filterServices() {
    const nameFilter = document.getElementById('serviceNameFilter').value.toLowerCase();
    const regionFilter = document.getElementById('regionFilter').value.toLowerCase();
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceName = card.dataset.name;
        const serviceRegions = card.dataset.regions;
        
        const nameMatch = !nameFilter || serviceName.includes(nameFilter);
        const regionMatch = !regionFilter || serviceRegions.includes(regionFilter);
        
        if (nameMatch && regionMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function clearFilters() {
    document.getElementById('serviceNameFilter').value = '';
    document.getElementById('regionFilter').value = '';
    filterServices();
}

function requestServiceType(serviceId, serviceName) {
    // Vai para o formulário de solicitação com serviço pré-selecionado
    document.body.innerHTML = getServiceRequestForm();
    initializeServiceForm();
    
    // Pré-selecionar o serviço
    setTimeout(() => {
        const serviceSelect = document.getElementById('serviceSelect');
        if (serviceSelect) {
            serviceSelect.value = serviceId;
        }
    }, 100);
}

function getContactPage() {
    return `
    <div style="min-height: 100vh; background: #f5f5f5;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; padding: 40px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 2.5rem;">📞 Contacto</h1>
                <p style="margin: 15px 0 0 0; font-size: 1.2rem; opacity: 0.9;">Entre em contacto connosco - estamos aqui para ajudar</p>
            </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                <!-- Formulário de Contacto -->
                <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin: 0 0 30px 0;">✉️ Envie-nos uma mensagem</h2>
                    
                    <form id="contactForm" style="display: grid; gap: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Nome *</label>
                            <input type="text" name="name" required style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">E-mail *</label>
                            <input type="email" name="email" required style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Telefone</label>
                            <input type="tel" name="phone" style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Assunto *</label>
                            <select name="subject" required style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                                <option value="">Selecione o assunto</option>
                                <option value="orcamento">Solicitação de Orçamento</option>
                                <option value="duvida">Dúvida sobre Serviços</option>
                                <option value="reclamacao">Reclamação</option>
                                <option value="sugestao">Sugestão</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Mensagem *</label>
                            <textarea name="message" required rows="5" style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; resize: vertical;" placeholder="Descreva sua mensagem aqui..."></textarea>
                        </div>
                        
                        <button type="submit" style="background: #1976d2; color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; cursor: pointer; font-weight: 600; justify-self: start;">
                            📨 Enviar Mensagem
                        </button>
                    </form>
                </div>

                <!-- Informações de Contacto -->
                <div>
                    <!-- Contactos Diretos -->
                    <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px;">
                        <h3 style="color: #333; margin: 0 0 25px 0;">📱 Contactos Diretos</h3>
                        
                        <div style="display: grid; gap: 20px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                                <div style="width: 50px; height: 50px; background: #1976d2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">📞</div>
                                <div>
                                    <p style="margin: 0; font-weight: 600; color: #333;">Telefone Principal</p>
                                    <p style="margin: 0; color: #666;">+351 XXX XXX XXX</p>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                                <div style="width: 50px; height: 50px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">📱</div>
                                <div>
                                    <p style="margin: 0; font-weight: 600; color: #333;">WhatsApp Business</p>
                                    <p style="margin: 0; color: #666;">+351 XXX XXX XXX</p>
                                    <button onclick="openWhatsApp()" style="background: #25d366; color: white; border: none; padding: 5px 15px; border-radius: 15px; font-size: 12px; cursor: pointer; margin-top: 5px;">Abrir Chat</button>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                                <div style="width: 50px; height: 50px; background: #ff5722; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">✉️</div>
                                <div>
                                    <p style="margin: 0; font-weight: 600; color: #333;">E-mail Geral</p>
                                    <p style="margin: 0; color: #666;">info@natanconstrutora.pt</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Horários de Atendimento -->
                    <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px;">
                        <h3 style="color: #333; margin: 0 0 25px 0;">🕒 Horários de Atendimento</h3>
                        
                        <div style="display: grid; gap: 15px;">
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                                <span style="font-weight: 600; color: #333;">Segunda a Sexta</span>
                                <span style="color: #666;">08:00 - 18:00</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                                <span style="font-weight: 600; color: #333;">Sábado</span>
                                <span style="color: #666;">09:00 - 13:00</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                                <span style="font-weight: 600; color: #333;">Domingo</span>
                                <span style="color: #f44336;">Fechado</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                                <span style="font-weight: 600; color: #333;">Emergências</span>
                                <span style="color: #4caf50;">24/7</span>
                            </div>
                        </div>
                    </div>

                    <!-- Localização -->
                    <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                        <h3 style="color: #333; margin: 0 0 25px 0;">📍 Sede Principal</h3>
                        
                        <div style="background: #f8f9fa; border-radius: 10px; padding: 20px;">
                            <p style="margin: 0 0 10px 0; font-weight: 600; color: #333;">Natan Construtora Lda.</p>
                            <p style="margin: 0 0 5px 0; color: #666;">Rua Principal, nº 123</p>
                            <p style="margin: 0 0 5px 0; color: #666;">9500-XXX Ponta Delgada</p>
                            <p style="margin: 0 0 15px 0; color: #666;">São Miguel, Açores</p>
                            
                            <button style="background: #1976d2; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 14px;">
                                🗺️ Ver no Google Maps
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botão Voltar -->
            <div style="text-align: center; margin-top: 40px;">
                <button onclick="goHome()" style="background: #666; color: white; border: none; padding: 15px 40px; border-radius: 25px; font-size: 16px; cursor: pointer; font-weight: 600;">
                    🏠 Voltar ao Início
                </button>
            </div>
        </div>
    </div>
    `;
}
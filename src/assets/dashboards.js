// Dashboards específicos para cada tipo de usuário

function getProviderDashboard(user) {
    return `
    <div style="min-height: 100vh; background: #f5f5f5;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); color: white; padding: 20px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 style="margin: 0; font-size: 1.8rem;">🔧 Painel do Prestador</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Olá, ${user.name}!</p>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <button onclick="toggleAvailability()" id="availabilityBtn" style="background: #ff5722; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer; font-weight: 600;">
                        🟢 Disponível
                    </button>
                    <button onclick="goHome()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 10px 15px; border-radius: 15px; cursor: pointer;">
                        🚪 Sair
                    </button>
                </div>
            </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding: 30px 20px;">
            <!-- Estatísticas -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 2.5rem; color: #2196f3; margin-bottom: 10px;">📅</div>
                    <h3 style="margin: 0; color: #333;">Hoje</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #2196f3; margin: 10px 0 0 0;">3</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 2.5rem; color: #ff9800; margin-bottom: 10px;">📋</div>
                    <h3 style="margin: 0; color: #333;">Esta Semana</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #ff9800; margin: 10px 0 0 0;">8</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 2.5rem; color: #4caf50; margin-bottom: 10px;">💰</div>
                    <h3 style="margin: 0; color: #333;">Faturamento Mensal</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #4caf50; margin: 10px 0 0 0;">€2,450</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                    <div style="font-size: 2.5rem; color: #9c27b0; margin-bottom: 10px;">⭐</div>
                    <h3 style="margin: 0; color: #333;">Avaliação Média</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #9c27b0; margin: 10px 0 0 0;">4.8</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <!-- Calendário/Agenda -->
                <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h2 style="margin: 0 0 25px 0; color: #333;">📅 Agenda da Semana</h2>
                    
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-bottom: 20px;">
                        ${generateWeekCalendar()}
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <h3 style="color: #333; margin: 0 0 20px 0;">Próximos Agendamentos</h3>
                        ${generateUpcomingAppointments()}
                    </div>
                </div>

                <!-- Ações Rápidas -->
                <div>
                    <div style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 20px;">
                        <h3 style="margin: 0 0 20px 0; color: #333;">⚡ Ações Rápidas</h3>
                        <div style="display: grid; gap: 15px;">
                            <button onclick="viewNewRequests()" style="background: #1976d2; color: white; border: none; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 20px;">📝</span>
                                <span>Novas Solicitações</span>
                            </button>
                            <button onclick="uploadPhotos()" style="background: #ff5722; color: white; border: none; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 20px;">📸</span>
                                <span>Upload de Fotos</span>
                            </button>
                            <button onclick="markCompleted()" style="background: #4caf50; color: white; border: none; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 20px;">✅</span>
                                <span>Marcar Concluído</span>
                            </button>
                        </div>
                    </div>

                    <!-- Avaliações Recentes -->
                    <div style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 20px 0; color: #333;">⭐ Avaliações Recentes</h3>
                        ${generateRecentRatings()}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getAdminDashboard(user) {
    return `
    <div style="min-height: 100vh; background: #f5f5f5;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%); color: white; padding: 20px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 style="margin: 0; font-size: 1.8rem;">⚙️ Painel Administrativo</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Bem-vindo, ${user.name}!</p>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <button onclick="exportReports()" style="background: #ff5722; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer; font-weight: 600;">
                        📊 Relatórios
                    </button>
                    <button onclick="goHome()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 10px 15px; border-radius: 15px; cursor: pointer;">
                        🚪 Sair
                    </button>
                </div>
            </div>
        </div>

        <div style="max-width: 1400px; margin: 0 auto; padding: 30px 20px;">
            <!-- Métricas Principais -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; border-left: 5px solid #1976d2;">
                    <div style="font-size: 2.5rem; color: #1976d2; margin-bottom: 10px;">👥</div>
                    <h3 style="margin: 0; color: #333;">Usuários Ativos</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #1976d2; margin: 10px 0 0 0;">847</p>
                    <p style="font-size: 12px; color: #4caf50; margin: 5px 0 0 0;">+12% este mês</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; border-left: 5px solid #4caf50;">
                    <div style="font-size: 2.5rem; color: #4caf50; margin-bottom: 10px;">📊</div>
                    <h3 style="margin: 0; color: #333;">Receita Mensal</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #4caf50; margin: 10px 0 0 0;">€28,750</p>
                    <p style="font-size: 12px; color: #4caf50; margin: 5px 0 0 0;">+18% este mês</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; border-left: 5px solid #ff9800;">
                    <div style="font-size: 2.5rem; color: #ff9800; margin-bottom: 10px;">📋</div>
                    <h3 style="margin: 0; color: #333;">Solicitações Hoje</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #ff9800; margin: 10px 0 0 0;">23</p>
                    <p style="font-size: 12px; color: #ff9800; margin: 5px 0 0 0;">15 pendentes</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; border-left: 5px solid #9c27b0;">
                    <div style="font-size: 2.5rem; color: #9c27b0; margin-bottom: 10px;">⭐</div>
                    <h3 style="margin: 0; color: #333;">Satisfação Geral</h3>
                    <p style="font-size: 2rem; font-weight: 600; color: #9c27b0; margin: 10px 0 0 0;">4.7</p>
                    <p style="font-size: 12px; color: #4caf50; margin: 5px 0 0 0;">+0.2 este mês</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px; margin-bottom: 30px;">
                <!-- Gráfico de Solicitações -->
                <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h2 style="margin: 0 0 25px 0; color: #333;">📈 Solicitações dos Últimos 7 Dias</h2>
                    <div style="height: 300px; background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%); background-size: 20px 20px; border-radius: 10px; display: flex; align-items: end; justify-content: space-around; padding: 20px;">
                        ${generateSimpleChart()}
                    </div>
                </div>

                <!-- Ações Administrativas -->
                <div style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h3 style="margin: 0 0 20px 0; color: #333;">⚙️ Gestão</h3>
                    <div style="display: grid; gap: 15px;">
                        <button onclick="manageUsers()" style="background: #1976d2; color: white; border: none; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">👥</span>
                            <span>Gerir Utilizadores</span>
                        </button>
                        <button onclick="manageServices()" style="background: #4caf50; color: white; border: none; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">🛠️</span>
                            <span>Gerir Serviços</span>
                        </button>
                        <button onclick="createQuote()" style="background: #ff9800; color: white; border: none; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">💰</span>
                            <span>Criar Orçamento</span>
                        </button>
                        <button onclick="assignProvider()" style="background: #9c27b0; color: white; border: none; padding: 15px; border-radius: 10px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">👷</span>
                            <span>Atribuir Prestador</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Solicitações Recentes -->
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <h2 style="margin: 0; color: #333;">📋 Solicitações Recentes</h2>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="filterAdminRequests('all')" class="admin-filter-btn active" data-filter="all"
                            style="padding: 8px 15px; border: 1px solid #ddd; background: #9c27b0; color: white; border-radius: 20px; cursor: pointer; font-size: 14px;">
                            Todas
                        </button>
                        <button onclick="filterAdminRequests('pending')" class="admin-filter-btn" data-filter="pending"
                            style="padding: 8px 15px; border: 1px solid #ddd; background: white; color: #666; border-radius: 20px; cursor: pointer; font-size: 14px;">
                            Pendentes
                        </button>
                        <button onclick="filterAdminRequests('urgent')" class="admin-filter-btn" data-filter="urgent"
                            style="padding: 8px 15px; border: 1px solid #ddd; background: white; color: #666; border-radius: 20px; cursor: pointer; font-size: 14px;">
                            Urgentes
                        </button>
                    </div>
                </div>
                
                <div id="adminRequestsList">
                    ${generateAdminRequestsList()}
                </div>
            </div>
        </div>
    </div>
    `;
}

function generateWeekCalendar() {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const today = new Date();
    
    return days.map((day, index) => {
        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() - today.getDay() + 1 + index);
        const isToday = dayDate.toDateString() === today.toDateString();
        const hasAppointments = index < 5; // Simular alguns agendamentos
        
        return `
        <div style="text-align: center; padding: 15px; border-radius: 10px; ${isToday ? 'background: #1976d2; color: white;' : 'background: #f8f9fa;'} cursor: pointer;" onclick="selectDay(${index})">
            <div style="font-weight: 600; margin-bottom: 5px;">${day}</div>
            <div style="font-size: 18px; margin-bottom: 5px;">${dayDate.getDate()}</div>
            ${hasAppointments ? `<div style="width: 8px; height: 8px; background: #ff5722; border-radius: 50%; margin: 0 auto;"></div>` : ''}
        </div>
        `;
    }).join('');
}

function generateUpcomingAppointments() {
    const appointments = [
        { time: '09:00', client: 'João Silva', service: 'Elétrica', location: 'São Miguel', status: 'confirmed' },
        { time: '11:30', client: 'Maria Santos', service: 'Encanamento', location: 'Aveiro', status: 'pending' },
        { time: '14:00', client: 'Carlos Pereira', service: 'Pintura', location: 'Coimbra', status: 'confirmed' }
    ];
    
    return appointments.map(apt => `
    <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
            <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${apt.time} - ${apt.client}</div>
            <div style="color: #666; font-size: 14px;">${apt.service} • ${apt.location}</div>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="viewAppointmentDetails()" style="background: #1976d2; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">Ver</button>
            <button onclick="navigateToLocation()" style="background: #4caf50; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">🗺️</button>
        </div>
    </div>
    `).join('');
}

function generateRecentRatings() {
    const ratings = [
        { client: 'Ana Costa', rating: 5, comment: 'Excelente trabalho!' },
        { client: 'Pedro Lima', rating: 4, comment: 'Muito profissional.' },
        { client: 'Sofia Reis', rating: 5, comment: 'Recomendo!' }
    ];
    
    return ratings.map(rating => `
    <div style="border-bottom: 1px solid #eee; padding: 15px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <span style="font-weight: 600; color: #333;">${rating.client}</span>
            <div style="color: #ffa726;">${'★'.repeat(rating.rating)}${'☆'.repeat(5-rating.rating)}</div>
        </div>
        <p style="margin: 0; color: #666; font-size: 14px; font-style: italic;">"${rating.comment}"</p>
    </div>
    `).join('');
}

function generateSimpleChart() {
    const data = [12, 19, 15, 25, 22, 18, 24];
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    
    return data.map((value, index) => `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="width: 40px; height: ${value * 8}px; background: linear-gradient(to top, #1976d2, #42a5f5); border-radius: 5px 5px 0 0; display: flex; align-items: start; justify-content: center; padding-top: 5px; color: white; font-size: 12px; font-weight: 600;">${value}</div>
        <span style="font-size: 12px; color: #666;">${days[index]}</span>
    </div>
    `).join('');
}

function generateAdminRequestsList() {
    const adminRequests = [
        { id: 1, client: 'João Silva', service: 'Elétrica', location: 'São Miguel', status: 'pending', priority: 'normal', created: '2025-06-08T10:00:00Z' },
        { id: 2, client: 'Maria Santos', service: 'Encanamento', location: 'Aveiro', status: 'quoted', priority: 'urgent', created: '2025-06-07T15:30:00Z' },
        { id: 3, client: 'Carlos Pereira', service: 'Construção', location: 'Coimbra', status: 'approved', priority: 'high', created: '2025-06-07T09:15:00Z' }
    ];
    
    return adminRequests.map(request => `
    <div class="admin-request-item" data-status="${request.status}" data-priority="${request.priority}" style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; margin-bottom: 15px; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center;">
        <div>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                <h4 style="margin: 0; color: #333;">ID: ${request.id} - ${request.client}</h4>
                <span style="background: ${natanApp.getStatusColor(request.status)}; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">
                    ${getStatusText(request.status)}
                </span>
                ${request.priority === 'urgent' ? '<span style="background: #f44336; color: white; padding: 4px 8px; border-radius: 10px; font-size: 11px;">URGENTE</span>' : ''}
            </div>
            <div style="color: #666; font-size: 14px;">
                <span style="margin-right: 20px;"><strong>Serviço:</strong> ${request.service}</span>
                <span style="margin-right: 20px;"><strong>Local:</strong> ${request.location}</span>
                <span><strong>Data:</strong> ${natanApp.formatDate(request.created)}</span>
            </div>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="viewRequestDetails(${request.id})" style="background: #1976d2; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px;">Ver</button>
            <button onclick="assignProviderToRequest(${request.id})" style="background: #4caf50; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px;">Atribuir</button>
            <button onclick="createQuoteForRequest(${request.id})" style="background: #ff9800; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px;">Orçamento</button>
        </div>
    </div>
    `).join('');
}
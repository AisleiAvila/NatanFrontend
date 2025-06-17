// Visualizações específicas para prestadores

function getNewRequestsView() {
    const availableRequests = [
        {
            id: 4,
            clientName: 'Pedro Lima',
            serviceName: 'Serviços Elétricos',
            location: 'São Miguel',
            description: 'Instalação de quadro elétrico novo',
            preferredDates: ['2025-06-10T09:00:00Z', '2025-06-11T14:00:00Z'],
            distance: '2.3 km',
            urgency: 'normal',
            estimatedDuration: '3-4 horas',
            clientRating: 4.2
        },
        {
            id: 5,
            clientName: 'Sofia Reis',
            serviceName: 'Serviços Elétricos',
            location: 'São Miguel',
            description: 'Reparação de tomadas e interruptores',
            preferredDates: ['2025-06-12T10:00:00Z'],
            distance: '5.1 km',
            urgency: 'urgent',
            estimatedDuration: '2-3 horas',
            clientRating: 4.8
        }
    ];

    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 1000px; margin: 0 auto;">
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <div>
                        <h1 style="margin: 0; color: #333;">📝 Novas Solicitações</h1>
                        <p style="margin: 5px 0 0 0; color: #666;">Solicitações disponíveis na sua área de especialidade</p>
                    </div>
                    <button onclick="goBackToProviderDashboard()" style="background: #666; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer;">Voltar</button>
                </div>

                <div style="display: grid; gap: 20px;">
                    ${availableRequests.map(request => `
                    <div style="border: 2px solid ${request.urgency === 'urgent' ? '#f44336' : '#e0e0e0'}; border-radius: 15px; padding: 25px; ${request.urgency === 'urgent' ? 'background: #ffebee;' : 'background: white;'}">
                        <div style="display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: start;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                                    <h3 style="margin: 0; color: #333;">${request.serviceName}</h3>
                                    ${request.urgency === 'urgent' ? '<span style="background: #f44336; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">URGENTE</span>' : ''}
                                    <div style="display: flex; align-items: center; gap: 5px; color: #ff9800;">
                                        <span>${'★'.repeat(Math.floor(request.clientRating))}${'☆'.repeat(5-Math.floor(request.clientRating))}</span>
                                        <span style="font-size: 14px;">(${request.clientRating})</span>
                                    </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                                    <div style="color: #666;">
                                        <strong>Cliente:</strong> ${request.clientName}
                                    </div>
                                    <div style="color: #666;">
                                        <strong>Local:</strong> ${request.location}
                                    </div>
                                    <div style="color: #666;">
                                        <strong>Distância:</strong> ${request.distance}
                                    </div>
                                    <div style="color: #666;">
                                        <strong>Duração estimada:</strong> ${request.estimatedDuration}
                                    </div>
                                </div>
                                
                                <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                                    <strong style="color: #333;">Descrição:</strong>
                                    <p style="margin: 8px 0 0 0; color: #666; line-height: 1.5;">${request.description}</p>
                                </div>
                                
                                <div style="margin-bottom: 15px;">
                                    <strong style="color: #333;">Datas preferenciais:</strong>
                                    <div style="display: flex; gap: 10px; margin-top: 8px;">
                                        ${request.preferredDates.map(date => `
                                        <span style="background: #e3f2fd; color: #1976d2; padding: 6px 12px; border-radius: 15px; font-size: 14px;">
                                            ${new Date(date).toLocaleString('pt-PT', { 
                                                day: '2-digit', 
                                                month: '2-digit', 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; gap: 10px; min-width: 120px;">
                                <button onclick="acceptRequest(${request.id})" style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer; font-weight: 600;">
                                    ✅ Aceitar
                                </button>
                                <button onclick="viewRequestMap(${request.id})" style="background: #1976d2; color: white; border: none; padding: 10px 20px; border-radius: 15px; cursor: pointer; font-size: 14px;">
                                    🗺️ Ver Local
                                </button>
                                <button onclick="contactClient(${request.id})" style="background: #ff9800; color: white; border: none; padding: 10px 20px; border-radius: 15px; cursor: pointer; font-size: 14px;">
                                    📞 Contactar
                                </button>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                
                ${availableRequests.length === 0 ? `
                <div style="text-align: center; padding: 60px 20px; color: #666;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">📋</div>
                    <h3>Nenhuma solicitação disponível</h3>
                    <p>Não há novas solicitações na sua área no momento. Verifique novamente mais tarde.</p>
                </div>
                ` : ''}
            </div>
        </div>
    </div>
    `;
}

function getPhotoUploadView() {
    const activeJobs = [
        {
            id: 1,
            clientName: 'João Silva',
            serviceName: 'Serviços Elétricos',
            location: 'Rua das Flores, 123',
            scheduledDate: '2025-06-09T09:00:00Z',
            status: 'in_progress',
            hasBeforePhoto: false,
            hasAfterPhoto: false
        },
        {
            id: 2,
            clientName: 'Maria Santos',
            serviceName: 'Encanamento',
            location: 'Av. Central, 456',
            scheduledDate: '2025-06-08T14:00:00Z',
            status: 'in_progress',
            hasBeforePhoto: true,
            hasAfterPhoto: false
        }
    ];

    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 900px; margin: 0 auto;">
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <div>
                        <h1 style="margin: 0; color: #333;">📸 Upload de Fotos</h1>
                        <p style="margin: 5px 0 0 0; color: #666;">Documentação fotográfica obrigatória dos serviços</p>
                    </div>
                    <button onclick="goBackToProviderDashboard()" style="background: #666; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer;">Voltar</button>
                </div>

                <div style="display: grid; gap: 25px;">
                    ${activeJobs.map(job => `
                    <div style="border: 2px solid #e0e0e0; border-radius: 15px; padding: 25px;">
                        <div style="margin-bottom: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333;">${job.serviceName} - ${job.clientName}</h3>
                            <div style="color: #666; font-size: 14px;">
                                <p style="margin: 0;"><strong>Local:</strong> ${job.location}</p>
                                <p style="margin: 5px 0 0 0;"><strong>Data:</strong> ${new Date(job.scheduledDate).toLocaleString('pt-PT')}</p>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                            <!-- Foto Antes -->
                            <div style="text-align: center;">
                                <h4 style="margin: 0 0 15px 0; color: #333;">📷 Foto ANTES</h4>
                                <div id="beforePhoto${job.id}" style="width: 100%; height: 200px; border: 2px dashed ${job.hasBeforePhoto ? '#4caf50' : '#ccc'}; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: ${job.hasBeforePhoto ? '#e8f5e8' : '#f9f9f9'}; cursor: pointer; position: relative;" onclick="uploadBeforePhoto(${job.id})">
                                    ${job.hasBeforePhoto ? 
                                    `<div style="text-align: center; color: #4caf50;">
                                        <div style="font-size: 48px;">✅</div>
                                        <p style="margin: 10px 0 0 0; font-weight: 600;">Foto carregada</p>
                                    </div>` :
                                    `<div style="text-align: center; color: #666;">
                                        <div style="font-size: 48px;">📷</div>
                                        <p style="margin: 10px 0 0 0;">Clique para adicionar foto</p>
                                        <p style="margin: 5px 0 0 0; font-size: 12px;">Obrigatório antes de iniciar</p>
                                    </div>`}
                                    <input type="file" accept="image/*" style="display: none;" onchange="handlePhotoUpload(this, ${job.id}, 'before')">
                                </div>
                                ${job.hasBeforePhoto ? 
                                `<button onclick="replacePhoto(${job.id}, 'before')" style="background: #ff9800; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer; font-size: 12px; margin-top: 10px;">Substituir</button>` : 
                                `<p style="color: #f44336; font-size: 12px; margin: 10px 0 0 0; font-weight: 600;">Obrigatório</p>`}
                            </div>

                            <!-- Foto Depois -->
                            <div style="text-align: center;">
                                <h4 style="margin: 0 0 15px 0; color: #333;">📷 Foto DEPOIS</h4>
                                <div id="afterPhoto${job.id}" style="width: 100%; height: 200px; border: 2px dashed ${job.hasAfterPhoto ? '#4caf50' : '#ccc'}; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: ${job.hasAfterPhoto ? '#e8f5e8' : '#f9f9f9'}; cursor: pointer; position: relative;" onclick="uploadAfterPhoto(${job.id})">
                                    ${job.hasAfterPhoto ? 
                                    `<div style="text-align: center; color: #4caf50;">
                                        <div style="font-size: 48px;">✅</div>
                                        <p style="margin: 10px 0 0 0; font-weight: 600;">Foto carregada</p>
                                    </div>` :
                                    `<div style="text-align: center; color: #666;">
                                        <div style="font-size: 48px;">📷</div>
                                        <p style="margin: 10px 0 0 0;">Clique para adicionar foto</p>
                                        <p style="margin: 5px 0 0 0; font-size: 12px;">Obrigatório para concluir</p>
                                    </div>`}
                                    <input type="file" accept="image/*" style="display: none;" onchange="handlePhotoUpload(this, ${job.id}, 'after')">
                                </div>
                                ${job.hasAfterPhoto ? 
                                `<button onclick="replacePhoto(${job.id}, 'after')" style="background: #ff9800; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer; font-size: 12px; margin-top: 10px;">Substituir</button>` : 
                                `<p style="color: #f44336; font-size: 12px; margin: 10px 0 0 0; font-weight: 600;">Obrigatório</p>`}
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 20px;">
                            <button onclick="markJobCompleted(${job.id})" ${!(job.hasBeforePhoto && job.hasAfterPhoto) ? 'disabled' : ''} style="background: ${job.hasBeforePhoto && job.hasAfterPhoto ? '#4caf50' : '#ccc'}; color: white; border: none; padding: 15px 30px; border-radius: 25px; cursor: ${job.hasBeforePhoto && job.hasAfterPhoto ? 'pointer' : 'not-allowed'}; font-weight: 600; opacity: ${job.hasBeforePhoto && job.hasAfterPhoto ? '1' : '0.6'};">
                                ✅ Marcar como Concluído
                            </button>
                        </div>
                    </div>
                    `).join('')}
                </div>

                ${activeJobs.length === 0 ? `
                <div style="text-align: center; padding: 60px 20px; color: #666;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">📸</div>
                    <h3>Nenhum trabalho em andamento</h3>
                    <p>Não há trabalhos ativos que necessitem de documentação fotográfica.</p>
                </div>
                ` : ''}
            </div>
        </div>
    </div>
    `;
}

function getCompletionView() {
    const completableJobs = [
        {
            id: 1,
            clientName: 'João Silva',
            serviceName: 'Serviços Elétricos',
            location: 'Rua das Flores, 123',
            scheduledDate: '2025-06-09T09:00:00Z',
            hasPhotos: true,
            duration: '3h 30min',
            notes: 'Quadro elétrico instalado conforme solicitado'
        },
        {
            id: 2,
            clientName: 'Maria Santos',
            serviceName: 'Encanamento',
            location: 'Av. Central, 456',
            scheduledDate: '2025-06-08T14:00:00Z',
            hasPhotos: false,
            duration: '2h 15min',
            notes: ''
        }
    ];

    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <div>
                        <h1 style="margin: 0; color: #333;">✅ Finalizar Serviços</h1>
                        <p style="margin: 5px 0 0 0; color: #666;">Marque os serviços como concluídos</p>
                    </div>
                    <button onclick="goBackToProviderDashboard()" style="background: #666; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer;">Voltar</button>
                </div>

                <div style="display: grid; gap: 20px;">
                    ${completableJobs.map(job => `
                    <div style="border: 2px solid ${job.hasPhotos ? '#4caf50' : '#ff9800'}; border-radius: 15px; padding: 25px; background: ${job.hasPhotos ? '#f8fff8' : '#fff8e1'};">
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                <div>
                                    <h3 style="margin: 0 0 5px 0; color: #333;">${job.serviceName}</h3>
                                    <p style="margin: 0; color: #666; font-size: 14px;">Cliente: ${job.clientName}</p>
                                </div>
                                <span style="background: ${job.hasPhotos ? '#4caf50' : '#ff9800'}; color: white; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">
                                    ${job.hasPhotos ? 'Pronto para finalizar' : 'Aguardando fotos'}
                                </span>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px; color: #666; font-size: 14px;">
                                <div><strong>Local:</strong> ${job.location}</div>
                                <div><strong>Data:</strong> ${new Date(job.scheduledDate).toLocaleDateString('pt-PT')}</div>
                                <div><strong>Duração:</strong> ${job.duration}</div>
                            </div>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Observações do serviço:</label>
                            <textarea id="notes${job.id}" placeholder="Descreva o trabalho realizado, materiais utilizados, observações importantes..." rows="3" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; resize: vertical;">${job.notes}</textarea>
                        </div>

                        <div style="display: flex; gap: 15px; justify-content: center;">
                            ${!job.hasPhotos ? `
                            <button onclick="goToPhotoUpload(${job.id})" style="background: #ff9800; color: white; border: none; padding: 12px 25px; border-radius: 20px; cursor: pointer; font-weight: 600;">
                                📸 Adicionar Fotos
                            </button>
                            ` : ''}
                            <button onclick="completeJob(${job.id})" ${!job.hasPhotos ? 'disabled' : ''} style="background: ${job.hasPhotos ? '#4caf50' : '#ccc'}; color: white; border: none; padding: 12px 30px; border-radius: 20px; cursor: ${job.hasPhotos ? 'pointer' : 'not-allowed'}; font-weight: 600; opacity: ${job.hasPhotos ? '1' : '0.6'};">
                                ✅ Finalizar Serviço
                            </button>
                        </div>
                    </div>
                    `).join('')}
                </div>

                ${completableJobs.length === 0 ? `
                <div style="text-align: center; padding: 60px 20px; color: #666;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
                    <h3>Nenhum serviço para finalizar</h3>
                    <p>Todos os seus serviços ativos foram concluídos.</p>
                </div>
                ` : ''}
            </div>
        </div>
    </div>
    `;
}

// Funções de interação para prestadores
function goBackToProviderDashboard() {
    const user = natanApp.currentUser;
    document.body.innerHTML = getProviderDashboard(user);
    initializeProviderDashboard();
}

function acceptRequest(requestId) {
    showLoadingOverlay('Aceitando solicitação...');
    setTimeout(() => {
        hideLoadingOverlay();
        alert(`Solicitação #${requestId} aceita com sucesso!\n\nO cliente será notificado e você receberá os detalhes de contacto.\nVerifique sua agenda para confirmar o horário.`);
        goBackToProviderDashboard();
    }, 1500);
}

function viewRequestMap(requestId) {
    alert('Abrindo localização no Google Maps...\n\n📍 Endereço: Rua das Flores, 123\n🗺️ Distância: 2.3 km\n⏱️ Tempo estimado: 8 minutos de carro');
}

function contactClient(requestId) {
    const options = prompt('Como deseja contactar o cliente?\n\n1 - Telefonar\n2 - WhatsApp\n3 - E-mail\n\nDigite o número da opção:');
    
    if (options === '1') {
        alert('Ligando para +351 912 345 678...');
    } else if (options === '2') {
        alert('Abrindo WhatsApp...\nMensagem pré-definida: "Olá! Sou o prestador da Natan Construtora. Aceite a sua solicitação de serviço elétrico."');
    } else if (options === '3') {
        alert('Abrindo e-mail...\nPara: cliente@email.com\nAssunto: Solicitação de Serviço Aceita');
    }
}

function uploadBeforePhoto(jobId) {
    const input = document.querySelector(`#beforePhoto${jobId} input[type="file"]`);
    input.click();
}

function uploadAfterPhoto(jobId) {
    const input = document.querySelector(`#afterPhoto${jobId} input[type="file"]`);
    input.click();
}

function handlePhotoUpload(input, jobId, type) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Verificar tamanho (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('Arquivo muito grande! Máximo permitido: 10MB');
            return;
        }
        
        showLoadingOverlay('Carregando foto...');
        
        setTimeout(() => {
            hideLoadingOverlay();
            
            // Atualizar interface
            const container = document.getElementById(`${type}Photo${jobId}`);
            container.style.border = '2px dashed #4caf50';
            container.style.background = '#e8f5e8';
            container.innerHTML = `
                <div style="text-align: center; color: #4caf50;">
                    <div style="font-size: 48px;">✅</div>
                    <p style="margin: 10px 0 0 0; font-weight: 600;">Foto carregada</p>
                </div>
            `;
            
            // Atualizar dados no sistema
            natanApp.uploadServicePhotos(jobId, { [type]: [file] });
            
            alert(`Foto ${type === 'before' ? 'ANTES' : 'DEPOIS'} carregada com sucesso!`);
            
            // Recarregar a view para atualizar botões
            setTimeout(() => {
                document.body.innerHTML = getPhotoUploadView();
                initializePhotoUpload();
            }, 1000);
        }, 2000);
    }
}

function initializePhotoUpload() {
    // Configurar eventos de upload
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            const jobId = this.onchange.toString().match(/\d+/)[0];
            const type = this.onchange.toString().includes('before') ? 'before' : 'after';
            handlePhotoUpload(this, parseInt(jobId), type);
        });
    });
}

function replacePhoto(jobId, type) {
    if (confirm(`Deseja substituir a foto ${type === 'before' ? 'ANTES' : 'DEPOIS'}?`)) {
        const input = document.querySelector(`#${type}Photo${jobId} input[type="file"]`);
        input.click();
    }
}

function markJobCompleted(jobId) {
    showLoadingOverlay('Finalizando serviço...');
    setTimeout(() => {
        hideLoadingOverlay();
        natanApp.completeService(jobId);
        alert('Serviço marcado como concluído!\n\n✅ Fotos documentadas\n📧 Cliente notificado\n⭐ Aguardando avaliação do cliente');
        goBackToProviderDashboard();
    }, 1500);
}

function goToPhotoUpload(jobId) {
    document.body.innerHTML = getPhotoUploadView();
    initializePhotoUpload();
}

function completeJob(jobId) {
    const notes = document.getElementById(`notes${jobId}`).value;
    
    if (!notes.trim()) {
        alert('Por favor, adicione observações sobre o serviço realizado.');
        return;
    }
    
    showLoadingOverlay('Finalizando serviço...');
    setTimeout(() => {
        hideLoadingOverlay();
        natanApp.completeService(jobId);
        alert(`Serviço finalizado com sucesso!\n\n✅ Documentação completa\n📝 Observações registradas\n📧 Cliente notificado\n💰 Pagamento será processado`);
        goBackToProviderDashboard();
    }, 2000);
}
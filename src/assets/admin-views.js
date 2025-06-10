// Visualizações administrativas específicas

function getQuoteCreationView(requestId = null) {
    const request = requestId ? natanApp.requests.find(r => r.id === requestId) : null;
    
    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 900px; margin: 0 auto;">
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #9c27b0; margin-bottom: 10px;">💰 Criar Orçamento</h1>
                    <p style="color: #666;">Geração de orçamento com cálculo automático de IVA</p>
                </div>

                <form id="quoteForm" style="display: grid; gap: 25px;">
                    <!-- Seleção de Solicitação -->
                    ${!requestId ? `
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="color: #333; margin: 0 0 15px 0;">📋 Solicitação</h3>
                        <select name="requestId" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                            <option value="">Selecione a solicitação</option>
                            ${natanApp.requests.filter(r => r.status === 'pending').map(r => 
                                `<option value="${r.id}">#${r.id} - ${r.clientName} (${r.serviceName})</option>`
                            ).join('')}
                        </select>
                    </div>
                    ` : `
                    <div style="border: 2px solid #e3f2fd; border-radius: 10px; padding: 20px; background: #f8f9fa;">
                        <h3 style="color: #1976d2; margin: 0 0 15px 0;">📋 Solicitação Selecionada</h3>
                        <p style="margin: 0; color: #666;"><strong>Cliente:</strong> ${request.clientName}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Serviço:</strong> ${request.serviceName}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Local:</strong> ${request.location}</p>
                        <input type="hidden" name="requestId" value="${requestId}">
                    </div>
                    `}

                    <!-- Itens do Orçamento -->
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3 style="color: #333; margin: 0;">🛠️ Itens do Orçamento</h3>
                            <button type="button" onclick="addQuoteItem()" style="background: #4caf50; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer; font-size: 14px;">+ Adicionar Item</button>
                        </div>
                        
                        <div id="quoteItems">
                            <div class="quote-item" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 15px; align-items: center; margin-bottom: 15px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
                                <input type="text" name="description[]" placeholder="Descrição do item" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;">
                                <input type="number" name="quantity[]" placeholder="Qtd" min="1" value="1" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;">
                                <input type="number" name="unitPrice[]" placeholder="Preço unitário" min="0" step="0.01" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;" onchange="calculateItemTotal(this)">
                                <input type="number" name="itemTotal[]" placeholder="Total" readonly style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; background: #f5f5f5;">
                                <button type="button" onclick="removeQuoteItem(this)" style="background: #f44336; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">🗑️</button>
                            </div>
                        </div>
                    </div>

                    <!-- Cálculos Finais -->
                    <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                        <h3 style="color: #333; margin: 0 0 20px 0;">💶 Cálculos</h3>
                        
                        <div style="display: grid; gap: 15px;">
                            <div style="display: grid; grid-template-columns: 1fr 150px; gap: 15px; align-items: center;">
                                <label style="font-weight: 600; color: #333;">Subtotal (sem IVA):</label>
                                <input type="number" id="subtotal" name="subtotal" readonly style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; background: #f5f5f5; text-align: right; font-weight: 600;">
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 100px 150px; gap: 15px; align-items: center;">
                                <label style="font-weight: 600; color: #333;">Taxa de IVA:</label>
                                <select name="ivaRate" id="ivaRate" onchange="calculateTotals()" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                                    <option value="23">23%</option>
                                    <option value="13">13%</option>
                                    <option value="6">6%</option>
                                    <option value="0">0%</option>
                                </select>
                                <input type="number" id="ivaAmount" name="ivaAmount" readonly style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; background: #f5f5f5; text-align: right; font-weight: 600;">
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 150px; gap: 15px; align-items: center; border-top: 2px solid #ddd; padding-top: 15px;">
                                <label style="font-weight: 700; color: #333; font-size: 18px;">TOTAL (com IVA):</label>
                                <input type="number" id="totalAmount" name="totalAmount" readonly style="padding: 12px; border: 2px solid #1976d2; border-radius: 5px; background: #e3f2fd; text-align: right; font-weight: 700; font-size: 18px; color: #1976d2;">
                            </div>
                        </div>
                    </div>

                    <!-- Validade e Observações -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Válido até:</label>
                            <input type="date" name="validUntil" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Prazo de execução (dias):</label>
                            <input type="number" name="executionDays" min="1" value="5" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                        </div>
                    </div>

                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Observações:</label>
                        <textarea name="observations" rows="3" placeholder="Condições especiais, garantias, etc..." style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; resize: vertical;"></textarea>
                    </div>

                    <!-- Botões -->
                    <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                        <button type="button" onclick="goBack()" style="padding: 15px 30px; background: #666; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer;">Cancelar</button>
                        <button type="button" onclick="previewQuote()" style="padding: 15px 30px; background: #ff9800; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer;">👁️ Pré-visualizar</button>
                        <button type="submit" style="padding: 15px 40px; background: #9c27b0; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer; font-weight: 600;">💾 Criar Orçamento</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}

function initializeQuoteForm(requestId = null) {
    // Configurar data padrão (15 dias a partir de hoje)
    const validUntilField = document.querySelector('input[name="validUntil"]');
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 15);
    validUntilField.value = defaultDate.toISOString().split('T')[0];

    // Configurar eventos de cálculo
    document.addEventListener('input', function(e) {
        if (e.target.name === 'quantity[]' || e.target.name === 'unitPrice[]') {
            calculateItemTotal(e.target);
        }
    });

    // Submissão do formulário
    document.getElementById('quoteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitQuote();
    });

    // Calcular totais iniciais
    calculateTotals();
}

function addQuoteItem() {
    const container = document.getElementById('quoteItems');
    const newItem = document.createElement('div');
    newItem.className = 'quote-item';
    newItem.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 15px; align-items: center; margin-bottom: 15px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;';
    
    newItem.innerHTML = `
        <input type="text" name="description[]" placeholder="Descrição do item" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;">
        <input type="number" name="quantity[]" placeholder="Qtd" min="1" value="1" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;">
        <input type="number" name="unitPrice[]" placeholder="Preço unitário" min="0" step="0.01" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;" onchange="calculateItemTotal(this)">
        <input type="number" name="itemTotal[]" placeholder="Total" readonly style="padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; background: #f5f5f5;">
        <button type="button" onclick="removeQuoteItem(this)" style="background: #f44336; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">🗑️</button>
    `;
    
    container.appendChild(newItem);
}

function removeQuoteItem(button) {
    const items = document.querySelectorAll('.quote-item');
    if (items.length > 1) {
        button.closest('.quote-item').remove();
        calculateTotals();
    } else {
        alert('É necessário ter pelo menos um item no orçamento.');
    }
}

function calculateItemTotal(input) {
    const row = input.closest('.quote-item');
    const quantity = parseFloat(row.querySelector('input[name="quantity[]"]').value) || 0;
    const unitPrice = parseFloat(row.querySelector('input[name="unitPrice[]"]').value) || 0;
    const total = quantity * unitPrice;
    
    row.querySelector('input[name="itemTotal[]"]').value = total.toFixed(2);
    calculateTotals();
}

function calculateTotals() {
    const itemTotals = document.querySelectorAll('input[name="itemTotal[]"]');
    let subtotal = 0;
    
    itemTotals.forEach(input => {
        subtotal += parseFloat(input.value) || 0;
    });
    
    const ivaRate = parseFloat(document.getElementById('ivaRate').value) / 100;
    const ivaAmount = subtotal * ivaRate;
    const totalAmount = subtotal + ivaAmount;
    
    document.getElementById('subtotal').value = subtotal.toFixed(2);
    document.getElementById('ivaAmount').value = ivaAmount.toFixed(2);
    document.getElementById('totalAmount').value = totalAmount.toFixed(2);
}

function previewQuote() {
    const formData = new FormData(document.getElementById('quoteForm'));
    const quoteData = generateQuoteData(formData);
    
    document.body.innerHTML = getQuotePreview(quoteData);
}

function submitQuote() {
    const formData = new FormData(document.getElementById('quoteForm'));
    const quoteData = generateQuoteData(formData);
    
    showLoadingOverlay('Criando orçamento...');
    
    setTimeout(() => {
        hideLoadingOverlay();
        
        // Adicionar à lista de orçamentos
        const newQuote = {
            id: natanApp.quotes.length + 1,
            ...quoteData,
            status: 'pending_approval',
            createdAt: new Date().toISOString()
        };
        
        natanApp.quotes.push(newQuote);
        
        // Atualizar status da solicitação
        const request = natanApp.requests.find(r => r.id == quoteData.requestId);
        if (request) {
            request.status = 'quoted';
        }
        
        alert('Orçamento criado com sucesso!\nO cliente será notificado por e-mail.');
        goBack();
    }, 2000);
}

function generateQuoteData(formData) {
    const descriptions = formData.getAll('description[]');
    const quantities = formData.getAll('quantity[]');
    const unitPrices = formData.getAll('unitPrice[]');
    const itemTotals = formData.getAll('itemTotal[]');
    
    const items = descriptions.map((desc, index) => ({
        description: desc,
        quantity: parseFloat(quantities[index]),
        unitPrice: parseFloat(unitPrices[index]),
        total: parseFloat(itemTotals[index])
    }));
    
    return {
        requestId: parseInt(formData.get('requestId')),
        items: items,
        subtotal: parseFloat(formData.get('subtotal')),
        ivaRate: parseFloat(formData.get('ivaRate')),
        ivaAmount: parseFloat(formData.get('ivaAmount')),
        totalAmount: parseFloat(formData.get('totalAmount')),
        validUntil: formData.get('validUntil'),
        executionDays: parseInt(formData.get('executionDays')),
        observations: formData.get('observations')
    };
}

function getQuotePreview(quoteData) {
    const request = natanApp.requests.find(r => r.id === quoteData.requestId);
    
    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="background: white; border-radius: 15px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <!-- Header da Empresa -->
                <div style="text-align: center; border-bottom: 2px solid #1976d2; padding-bottom: 30px; margin-bottom: 30px;">
                    <h1 style="color: #1976d2; margin: 0; font-size: 2rem;">🏗️ NATAN CONSTRUTORA</h1>
                    <p style="margin: 10px 0 0 0; color: #666;">Construindo o futuro com qualidade e confiança</p>
                </div>

                <!-- Dados do Orçamento -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                    <div>
                        <h3 style="color: #333; margin: 0 0 15px 0;">📋 Dados do Cliente</h3>
                        <p style="margin: 5px 0; color: #666;"><strong>Nome:</strong> ${request.clientName}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>E-mail:</strong> ${request.email}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Telefone:</strong> ${request.phone}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Local:</strong> ${request.location}</p>
                    </div>
                    
                    <div>
                        <h3 style="color: #333; margin: 0 0 15px 0;">📄 Dados do Orçamento</h3>
                        <p style="margin: 5px 0; color: #666;"><strong>Data:</strong> ${new Date().toLocaleDateString('pt-PT')}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Válido até:</strong> ${new Date(quoteData.validUntil).toLocaleDateString('pt-PT')}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Prazo:</strong> ${quoteData.executionDays} dias</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Serviço:</strong> ${request.serviceName}</p>
                    </div>
                </div>

                <!-- Itens do Orçamento -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #333; margin: 0 0 20px 0;">📝 Itens do Orçamento</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                                <th style="padding: 12px; text-align: left; color: #333;">Descrição</th>
                                <th style="padding: 12px; text-align: center; color: #333;">Qtd</th>
                                <th style="padding: 12px; text-align: right; color: #333;">Preço Unit.</th>
                                <th style="padding: 12px; text-align: right; color: #333;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${quoteData.items.map(item => `
                            <tr style="border-bottom: 1px solid #dee2e6;">
                                <td style="padding: 12px; color: #666;">${item.description}</td>
                                <td style="padding: 12px; text-align: center; color: #666;">${item.quantity}</td>
                                <td style="padding: 12px; text-align: right; color: #666;">€${item.unitPrice.toFixed(2)}</td>
                                <td style="padding: 12px; text-align: right; color: #666; font-weight: 600;">€${item.total.toFixed(2)}</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Totais -->
                <div style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                    <div style="display: grid; gap: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">Subtotal (sem IVA):</span>
                            <span style="font-weight: 600;">€${quoteData.subtotal.toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">IVA (${quoteData.ivaRate}%):</span>
                            <span style="font-weight: 600;">€${quoteData.ivaAmount.toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-top: 2px solid #ddd; padding-top: 10px; font-size: 1.2rem;">
                            <span style="color: #333; font-weight: 700;">TOTAL:</span>
                            <span style="color: #1976d2; font-weight: 700;">€${quoteData.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                ${quoteData.observations ? `
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #333; margin: 0 0 15px 0;">📝 Observações</h3>
                    <p style="color: #666; line-height: 1.6; background: #f8f9fa; padding: 15px; border-radius: 8px;">${quoteData.observations}</p>
                </div>
                ` : ''}

                <!-- Botões -->
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="editQuote()" style="background: #ff9800; color: white; border: none; padding: 15px 25px; border-radius: 25px; cursor: pointer;">✏️ Editar</button>
                    <button onclick="downloadQuotePDF()" style="background: #4caf50; color: white; border: none; padding: 15px 25px; border-radius: 25px; cursor: pointer;">📄 Download PDF</button>
                    <button onclick="confirmQuote()" style="background: #1976d2; color: white; border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; font-weight: 600;">✅ Confirmar e Enviar</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getUserManagementView() {
    return `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <h1 style="margin: 0; color: #333;">👥 Gestão de Utilizadores</h1>
                    <div style="display: flex; gap: 15px;">
                        <button onclick="addNewUser()" style="background: #4caf50; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer;">+ Novo Utilizador</button>
                        <button onclick="goBack()" style="background: #666; color: white; border: none; padding: 12px 20px; border-radius: 20px; cursor: pointer;">Voltar</button>
                    </div>
                </div>

                <!-- Filtros -->
                <div style="display: flex; gap: 15px; margin-bottom: 25px;">
                    <button onclick="filterUsers('all')" class="user-filter active" style="background: #1976d2; color: white; border: none; padding: 10px 20px; border-radius: 15px; cursor: pointer;">Todos</button>
                    <button onclick="filterUsers('client')" class="user-filter" style="background: white; color: #666; border: 1px solid #ddd; padding: 10px 20px; border-radius: 15px; cursor: pointer;">Clientes</button>
                    <button onclick="filterUsers('provider')" class="user-filter" style="background: white; color: #666; border: 1px solid #ddd; padding: 10px 20px; border-radius: 15px; cursor: pointer;">Prestadores</button>
                    <button onclick="filterUsers('admin')" class="user-filter" style="background: white; color: #666; border: 1px solid #ddd; padding: 10px 20px; border-radius: 15px; cursor: pointer;">Administradores</button>
                </div>

                <!-- Lista de Utilizadores -->
                <div id="usersList">
                    ${generateUsersList()}
                </div>
            </div>
        </div>
    </div>
    `;
}

function generateUsersList() {
    const users = [
        { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'client', status: 'active', lastLogin: '2025-06-08', requests: 5 },
        { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'provider', status: 'active', lastLogin: '2025-06-08', rating: 4.8, services: 23 },
        { id: 3, name: 'Carlos Pereira', email: 'carlos@email.com', role: 'client', status: 'inactive', lastLogin: '2025-06-05', requests: 2 },
        { id: 4, name: 'Ana Costa', email: 'ana@email.com', role: 'provider', status: 'active', lastLogin: '2025-06-07', rating: 4.9, services: 45 },
        { id: 5, name: 'Admin Natan', email: 'admin@natan.com', role: 'admin', status: 'active', lastLogin: '2025-06-08' }
    ];

    return users.map(user => `
    <div class="user-item" data-role="${user.role}" style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; margin-bottom: 15px; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center;">
        <div>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                <div style="width: 50px; height: 50px; background: ${getRoleColor(user.role)}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                    ${getRoleIcon(user.role)}
                </div>
                <div>
                    <h3 style="margin: 0; color: #333;">${user.name}</h3>
                    <p style="margin: 0; color: #666; font-size: 14px;">${user.email}</p>
                </div>
                <span style="background: ${user.status === 'active' ? '#4caf50' : '#f44336'}; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">
                    ${user.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
            </div>
            
            <div style="display: flex; gap: 30px; color: #666; font-size: 14px;">
                <span><strong>Tipo:</strong> ${getRoleText(user.role)}</span>
                <span><strong>Último acesso:</strong> ${new Date(user.lastLogin).toLocaleDateString('pt-PT')}</span>
                ${user.role === 'client' ? `<span><strong>Solicitações:</strong> ${user.requests}</span>` : ''}
                ${user.role === 'provider' ? `<span><strong>Serviços:</strong> ${user.services}</span><span><strong>Avaliação:</strong> ${user.rating}★</span>` : ''}
            </div>
        </div>
        
        <div style="display: flex; gap: 10px;">
            <button onclick="viewUser(${user.id})" style="background: #1976d2; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px;">Ver</button>
            <button onclick="editUser(${user.id})" style="background: #ff9800; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px;">Editar</button>
            <button onclick="toggleUserStatus(${user.id})" style="background: ${user.status === 'active' ? '#f44336' : '#4caf50'}; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 12px;">
                ${user.status === 'active' ? 'Desativar' : 'Ativar'}
            </button>
        </div>
    </div>
    `).join('');
}

function getRoleColor(role) {
    const colors = {
        'client': '#1976d2',
        'provider': '#4caf50',
        'admin': '#9c27b0'
    };
    return colors[role] || '#666';
}

function getRoleIcon(role) {
    const icons = {
        'client': '👤',
        'provider': '🔧',
        'admin': '⚙️'
    };
    return icons[role] || '👤';
}

function getRoleText(role) {
    const texts = {
        'client': 'Cliente',
        'provider': 'Prestador',
        'admin': 'Administrador'
    };
    return texts[role] || role;
}

// Funções auxiliares
function goBack() {
    const user = natanApp.currentUser;
    if (user.role === 'admin') {
        document.body.innerHTML = getAdminDashboard(user);
        initializeAdminDashboard();
    }
}

function editQuote() {
    history.back();
}

function downloadQuotePDF() {
    alert('Download do PDF iniciado...\n(Integração com biblioteca de geração de PDF)');
}

function confirmQuote() {
    alert('Orçamento confirmado e enviado por e-mail!\nO cliente receberá uma notificação.');
    goBack();
}
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('negotiation-chat');
    const startBtn = document.getElementById('start-negotiation');
    const emergencyBtn = document.getElementById('trigger-emergency');
    const controls = document.getElementById('negotiation-controls');

    if (!chatContainer) return;

    let negotiationActive = false;

    const messages = [
        { role: 'farmer', text: "Protocol Initialized. Agent #402 broadcasting Premium Basmati listing to Global Nodes (London, Dubai, Singapore, Tokyo)." },
        { role: 'buyer', text: "AI-Dealer #77 (Dubai Hub) responding. Demand high in MENA region. We offer ₹66,500/ton for immediate containerized transport." },
        { role: 'farmer', text: "Counter-offer: ₹69,800/ton. Quality analysis confirms ISO-22000 compliance. Analyzing competing bid from Singapore node (₹67,200)..." },
        { role: 'buyer', text: "Dubai Hub matching Singapore bid and adding +₹1,500 premium for long-term partnership. Final offer: ₹68,700/ton." },
        { role: 'farmer', text: "Optimal deal identified. Settle at ₹68,700/ton. Executing Global Smart Contract #GSC-992. Logistics agent notified for international shipping." },
        { role: 'buyer', text: "Agreement finalized. Payment escrowed in international node. Commencing cross-border logistics protocol." }
    ];

    async function typeMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}-message`;
        msgDiv.style.cssText = `
            padding: 12px 18px;
            border-radius: 15px;
            max-width: 85%;
            font-size: 0.9rem;
            line-height: 1.4;
            margin-bottom: 5px;
            align-self: ${role === 'farmer' ? 'flex-start' : 'flex-end'};
            background: ${role === 'farmer' ? 'rgba(0, 242, 96, 0.1)' : 'rgba(247, 151, 30, 0.1)'};
            border: 1px solid ${role === 'farmer' ? 'var(--accent-farmer)' : 'var(--accent-buyer)'};
            animation: fadeIn 0.5s ease forwards;
        `;

        const label = document.createElement('div');
        label.style.cssText = 'font-size: 0.7rem; text-transform: uppercase; margin-bottom: 5px; opacity: 0.7;';
        label.innerText = role.toUpperCase() + ' AGENT';
        msgDiv.appendChild(label);

        const content = document.createElement('div');
        msgDiv.appendChild(content);
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        for (let i = 0; i < text.length; i++) {
            content.innerText += text[i];
            await new Promise(r => setTimeout(r, 15));
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        updateAIInsights(role, text);
    }

    function updateAIInsights(role, text) {
        const insights = document.getElementById('ai-insights');
        if (!insights) return;
        if (role === 'farmer') {
            insights.innerHTML = `<span style="color: var(--accent-farmer);">ANALYSIS:</span> Farmer is emphasizing quality metrics to justify premium pricing.`;
        } else if (role === 'buyer') {
            insights.innerHTML = `<span style="color: var(--accent-buyer);">ANALYSIS:</span> Buyer is anchoring price while prioritizing logistics speed.`;
        } else if (role === 'user') {
            insights.innerHTML = `<span style="color: var(--accent-primary);">ANALYSIS:</span> Human intervention detected. Hybrid model active.`;
        }
    }

    if (startBtn) {
        startBtn.addEventListener('click', async () => {
            if (negotiationActive) return;
            negotiationActive = true;
            chatContainer.innerHTML = '';
            startBtn.disabled = true;
            startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Discovery In Progress...';
            
            for (const msg of messages) {
                await typeMessage(msg.role, msg.text);
                await new Promise(r => setTimeout(r, 1200));
            }

            if (controls) controls.style.display = 'block';
            startBtn.innerHTML = '<i class="fas fa-check"></i> Negotiation Finalized';
            startBtn.style.background = 'var(--accent-farmer)';
            addTransactionToHistory('Rice (Premium)', '₹68,475/T');
        });
    }

    function addTransactionToHistory(item, price) {
        const historyContainer = document.querySelector('.history-log');
        if (!historyContainer) return;
        const entry = document.createElement('div');
        entry.style.cssText = 'font-size: 0.8rem; padding: 8px; border-bottom: 1px solid var(--glass-border); display: flex; justify-content: space-between; animation: fadeIn 0.5s ease;';
        entry.innerHTML = `<span>${item}</span><span style="color: var(--accent-farmer); font-weight: 600;">${price}</span>`;
        historyContainer.prepend(entry);
    }

    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', () => {
            const logisticsCard = document.querySelector('.agent-logistics');
            if (logisticsCard) {
                logisticsCard.style.borderColor = 'var(--accent-logistics)';
                logisticsCard.style.boxShadow = '0 0 30px rgba(255, 0, 128, 0.4)';
            }
            
            typeMessage('logistics', "⚠️ EMERGENCY ALERT: Road blockage detected. Rerouting Shipment #RF-402 via Expressway 7. ETA: +14 mins.");
            
            emergencyBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i> Rerouting...';
            emergencyBtn.style.opacity = '0.5';
            
            setTimeout(() => {
                emergencyBtn.innerHTML = '<i class="fas fa-route"></i> Route Optimized';
                emergencyBtn.style.opacity = '1';
                emergencyBtn.style.background = 'var(--accent-primary)';
                emergencyBtn.style.color = 'white';
            }, 3000);
        });
    }

    if (controls) {
        const overrideInput = controls.querySelector('input');
        const overrideBtn = controls.querySelector('button');

        if (overrideBtn && overrideInput) {
            overrideBtn.addEventListener('click', () => {
                const text = overrideInput.value.trim();
                if (text) {
                    typeMessage('user', text);
                    overrideInput.value = '';
                    setTimeout(() => {
                        typeMessage('buyer', "User override detected. Recalculating proposal...");
                    }, 1500);
                }
            });
            overrideInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') overrideBtn.click();
            });
        }
    }

    function updateMarketSentiment() {
        const bars = document.querySelectorAll('.market-bar');
        bars.forEach(bar => {
            const height = Math.floor(Math.random() * 60) + 30;
            bar.style.height = height + '%';
        });
    }

    setInterval(updateMarketSentiment, 3000);
});

// Helper for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .farmer-message { border-left: 4px solid var(--accent-farmer) !important; }
    .buyer-message { border-right: 4px solid var(--accent-buyer) !important; }
    .user-message { 
        align-self: center !important; 
        background: rgba(255, 255, 255, 0.05) !important; 
        border: 1px dashed var(--accent-primary) !important;
        font-style: italic;
    }
    .logistics-message { 
        align-self: center !important; 
        background: rgba(255, 0, 128, 0.1) !important; 
        border-color: var(--accent-logistics) !important; 
        width: 90%;
        text-align: center;
    }
`;
document.head.appendChild(style);

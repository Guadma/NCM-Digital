/**
 * chatbot.js
 * NCM Digital — Chatbot logic connected to n8n via Railway webhook
 */

const N8N_WEBHOOK_URL = 'https://primary-production-2d11.up.railway.app/webhook/webhook/ncm-chat';

let chatOpen = false;
let isFirstOpen = true;
let isBotTyping = false;
let sessionId = localStorage.getItem('ncm_session') || `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
localStorage.setItem('ncm_session', sessionId);

function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatWindow');
  const icon = document.getElementById('chat-icon');
  win.classList.toggle('open', chatOpen);
  icon.textContent = chatOpen ? '✕' : '💬';

  if (chatOpen && isFirstOpen) {
    isFirstOpen = false;
    setTimeout(() => sendToN8N('', true), 400);
  }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || isBotTyping) return;
  input.value = '';
  addUserMessage(text);
  sendToN8N(text, false);
}

function sendQuick(text) {
  if (isBotTyping) return;
  addUserMessage(text);
  document.getElementById('quickReplies').style.display = 'none';
  sendToN8N(text, false);
}

async function sendToN8N(message, isFirstMessage) {
  setTyping(true);

  const payload = {
    sessionId: sessionId,
    message: message,
    isFirstMessage: isFirstMessage,
    userName: localStorage.getItem('ncm_username') || 'Visitante',
    userEmail: localStorage.getItem('ncm_email') || '',
    userPhone: localStorage.getItem('ncm_phone') || '',
    pageUrl: window.location.href,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const botText = data.response || data.botResponse || data[0]?.response || data[0]?.botResponse || (Array.isArray(data) && data[0]?.json?.botResponse) || null;

    if (!botText) {
      addErrorMessage('Oops, hubo un enredo en los cables. Intenta de nuevo.');
      return;
    }
    setTyping(false);
    addBotMessage(botText);

    if (data.sessionId) {
      sessionId = data.sessionId;
      localStorage.setItem('ncm_session', sessionId);
    }

  } catch (err) {
    setTyping(false);
    addErrorMessage('No hay conexión con la base central. Intenta en breves momentos.');
    console.error('n8n webhook error:', err);
  }
}

function addUserMessage(text) {
  document.getElementById('quickReplies').style.display = 'none';
  const msgs = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'msg user';
  msg.textContent = text;
  msgs.appendChild(msg);
  scrollBottom();
}

function addBotMessage(text) {
  const msgs = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'msg bot';
  msg.textContent = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
  msgs.appendChild(msg);
  scrollBottom();
}

function addErrorMessage(text) {
  const msgs = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'msg error';
  msg.textContent = '⚠️ ' + text;
  msgs.appendChild(msg);
  scrollBottom();
}

function setTyping(active) {
  isBotTyping = active;
  const input = document.getElementById('chatInput');
  const btn = document.getElementById('sendBtn');
  const msgs = document.getElementById('chatMessages');
  const statusText = document.getElementById('statusText');

  input.disabled = active;
  btn.disabled = active;
  statusText.textContent = active ? 'Procesando...' : 'En línea ahora';

  const prev = document.getElementById('typingIndicator');
  if (prev) prev.remove();

  if (active) {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    msgs.appendChild(typing);
    scrollBottom();
  }
}

function scrollBottom() {
  const msgs = document.getElementById('chatMessages');
  msgs.scrollTop = msgs.scrollHeight;
}

async function handleContact() {
  const emailInput = document.getElementById('email-input');
  const btn = document.querySelector('.contact-btn');
  const msg = document.getElementById('contact-msg');
  const email = emailInput.value.trim();

  if (!email || !email.includes('@')) return;

  // Visual feedback — loading state
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  msg.style.display = 'none';

  const payload = {
    isContactForm: true,
    userEmail: email,
    sessionId: sessionId,
    pageUrl: window.location.href,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Success
    localStorage.setItem('ncm_email', email);
    emailInput.value = '';
    msg.style.display = 'block';
    msg.style.color = 'var(--brand-blue)';
    msg.textContent = '¡Listo! Te enviaremos un ping pronto 🚀';

  } catch (err) {
    msg.style.display = 'block';
    msg.style.color = '#e11d48';
    msg.textContent = '⚠️ Hubo un problema. Intenta de nuevo en un momento.';
    console.error('Contact form error:', err);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Subir a la Nube →';
  }
}

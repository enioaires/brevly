interface WaitlistNotificationData {
  email: string;
  projectDetails: string;
  phoneNumber?: string;
  companyName?: string;
  createdAt: Date;
}

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Formata a data para exibição no email
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  }).format(date);
}

/**
 * Escapa caracteres HTML para prevenir injeção (versão server-side)
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Cria o template HTML para notificação de nova inscrição na waitlist
 */
function createHtmlTemplate(data: WaitlistNotificationData): string {
  const formattedDate = formatDate(data.createdAt);
  const escapedEmail = escapeHtml(data.email);
  const escapedProjectDetails = escapeHtml(data.projectDetails);
  const escapedPhoneNumber = data.phoneNumber ? escapeHtml(data.phoneNumber) : null;
  const escapedCompanyName = data.companyName ? escapeHtml(data.companyName) : null;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Inscrição na Waitlist</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .container {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      border-bottom: 2px solid #007bff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #007bff;
      margin: 0;
      font-size: 24px;
    }
    .field {
      margin-bottom: 20px;
    }
    .field-label {
      font-weight: 600;
      color: #555;
      margin-bottom: 5px;
    }
    .field-value {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      border-left: 3px solid #007bff;
    }
    .email-highlight {
      background-color: #e3f2fd;
      border-left-color: #2196f3;
      font-weight: 500;
    }
    .project-details {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
    .timestamp {
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Nova Inscrição na Waitlist</h1>
    </div>
    
    <div class="field">
      <div class="field-label">📧 Email do Interessado:</div>
      <div class="field-value email-highlight">${escapedEmail}</div>
    </div>
    
    <div class="field">
      <div class="field-label">📋 Detalhes do Projeto:</div>
      <div class="field-value project-details">${escapedProjectDetails}</div>
    </div>
    
    ${escapedPhoneNumber ? `
    <div class="field">
      <div class="field-label">📞 Telefone:</div>
      <div class="field-value">${escapedPhoneNumber}</div>
    </div>
    ` : ''}
    
    ${escapedCompanyName ? `
    <div class="field">
      <div class="field-label">🏢 Empresa:</div>
      <div class="field-value">${escapedCompanyName}</div>
    </div>
    ` : ''}
    
    <div class="field">
      <div class="field-label">🕒 Data de Registro:</div>
      <div class="field-value timestamp">${formattedDate}</div>
    </div>
    
    <div class="footer">
      <p>Esta é uma notificação automática do sistema de waitlist da Brevly Digital.</p>
      <p>Para responder ao interessado, utilize o email: <strong>${escapedEmail}</strong></p>
    </div>
  </div>
</body>
</html>`.trim();
}

/**
 * Cria o template de texto simples para notificação de nova inscrição na waitlist
 */
function createTextTemplate(data: WaitlistNotificationData): string {
  const formattedDate = formatDate(data.createdAt);
  
  let textContent = `
NOVA INSCRIÇÃO NA WAITLIST
==========================

Email do Interessado: ${data.email}

Detalhes do Projeto:
${data.projectDetails}
`;

  if (data.phoneNumber) {
    textContent += `\nTelefone: ${data.phoneNumber}`;
  }

  if (data.companyName) {
    textContent += `\nEmpresa: ${data.companyName}`;
  }

  textContent += `\nData de Registro: ${formattedDate}`;
  
  textContent += `

---
Esta é uma notificação automática do sistema de waitlist da Brevly Digital.
Para responder ao interessado, utilize o email: ${data.email}
`;

  return textContent.trim();
}

/**
 * Cria o template completo de email para notificação de waitlist
 */
export function createWaitlistNotificationTemplate(data: WaitlistNotificationData): EmailTemplate {
  return {
    subject: `Nova inscrição na waitlist - ${data.email}`,
    html: createHtmlTemplate(data),
    text: createTextTemplate(data)
  };
}

/**
 * Tipo exportado para uso em outros módulos
 */
export type { WaitlistNotificationData, EmailTemplate };
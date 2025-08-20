# Design Document

## Overview

A funcionalidade de waitlist expandida será implementada seguindo a arquitetura existente do projeto, utilizando Prisma para persistência, Elysia para API endpoints, e Next.js para as páginas frontend. O sistema agora captura informações mais detalhadas dos interessados, incluindo detalhes do projeto (obrigatório), telefone e empresa (opcionais), com formulários disponíveis tanto na hero section quanto na seção de contato.

## Architecture

### Database Layer
- **Prisma**: Gerenciamento do modelo `Waitlist` expandido com campos obrigatórios (email, detalhes do projeto) e opcionais (telefone, empresa)
- **PostgreSQL**: Base de dados existente será atualizada com migração para adicionar novos campos

### API Layer  
- **Elysia**: Endpoints RESTful atualizados para operações CRUD da waitlist expandida
- **Autenticação**: Reutilização do sistema Clerk existente para proteger rotas administrativas
- **Validação**: Validação expandida usando schemas TypeBox para todos os novos campos

### Frontend Layer
- **Next.js**: Páginas atualizadas para inscrição pública ("/") e administração ("/admin")
- **Componentes**: Componentes de formulário para hero section e seção de contato
- **Middleware**: Extensão do middleware existente para proteger rota admin

## Components and Interfaces

### Database Model
```prisma
model Waitlist {
  id             String   @id @default(cuid())
  email          String   @unique
  projectDetails String   // Campo obrigatório para detalhes do projeto
  phoneNumber    String?  // Campo opcional para telefone
  companyName    String?  // Campo opcional para empresa
  createdAt      DateTime @default(now())
  
  @@map("waitlist")
  @@index([createdAt])
}
```

### API Endpoints

#### POST /api/waitlist
- **Público**: Aceita inscrições de qualquer visitante
- **Input**: `{ email: string, projectDetails: string, phoneNumber?: string, companyName?: string }`
- **Output**: Confirmação de sucesso ou erro (email duplicado, validação)
- **Validação**: Email válido e único, detalhes do projeto obrigatórios

#### GET /api/waitlist  
- **Protegido**: Apenas usuários autenticados via Clerk
- **Output**: Lista completa de inscrições com todos os campos e timestamps
- **Ordenação**: Por data de criação (mais recentes primeiro)

### Frontend Components

#### WaitlistForm Components
- **HeroWaitlistForm**: Formulário simplificado para hero section (email + detalhes do projeto)
- **ContactWaitlistForm**: Formulário completo para seção de contato (todos os campos)
- Estados de loading, sucesso e erro para ambos
- Validação client-side expandida
- Localizados em `features/waitlist/components/`

#### WaitlistAdmin Component  
- Lista completa de inscrições com todos os campos (email, projeto, telefone, empresa, data)
- Visualização organizada e responsiva dos dados expandidos
- Paginação simples se necessário
- Localizado em `features/waitlist/components/waitlist-admin.tsx`

### Pages

#### Homepage ("/")
- Hero section com formulário simplificado de inscrição
- Seção de contato com formulário completo de inscrição
- Atualização dos componentes existentes na `app/page.tsx`
- Design focado na conversão com múltiplas oportunidades de inscrição

#### Admin Page ("/admin")
- Página protegida para visualizar inscrições
- Nova página em `app/admin/page.tsx`
- Requer autenticação via middleware

## Data Models

### Waitlist Entry
```typescript
interface WaitlistEntry {
  id: string
  email: string
  projectDetails: string
  phoneNumber?: string
  companyName?: string
  createdAt: Date
}
```

### API Responses
```typescript
// POST /api/waitlist - Input
interface WaitlistCreateInput {
  email: string
  projectDetails: string
  phoneNumber?: string
  companyName?: string
}

// POST /api/waitlist - Success
interface WaitlistCreateResponse {
  success: true
  data: WaitlistEntry
}

// POST /api/waitlist - Error  
interface WaitlistCreateError {
  success: false
  error: {
    code: string
    message: string
  }
}

// GET /api/waitlist - Success
interface WaitlistListResponse {
  success: true
  data: WaitlistEntry[]
  count: number
}
```

## Error Handling

### Client-Side Errors
- **Email inválido**: Validação em tempo real no formulário
- **Detalhes do projeto vazios**: Validação obrigatória com feedback claro
- **Email duplicado**: Mensagem amigável informando que já está inscrito
- **Erro de rede**: Retry automático com feedback visual

### Server-Side Errors
- **Validação**: Retorno de erros específicos com códigos
- **Duplicação**: Tratamento especial para constraint unique
- **Autenticação**: Redirecionamento para login quando não autenticado
- **Rate limiting**: Proteção básica contra spam (futuro)

### Error Codes
```typescript
const WAITLIST_ERRORS = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  MISSING_PROJECT_DETAILS: 'MISSING_PROJECT_DETAILS',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL', 
  UNAUTHORIZED: 'UNAUTHORIZED',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
}
```

## Testing Strategy

### Manual Testing Focus
- **Fluxo de inscrição**: Teste completo dos formulários (hero e contato)
- **Validação expandida**: Testes com todos os campos obrigatórios e opcionais
- **Duplicação**: Tentativa de inscrição com email existente
- **Campos opcionais**: Teste com e sem telefone/empresa
- **Autenticação**: Acesso à área admin com e sem login
- **Responsividade**: Teste em diferentes dispositivos

### Integration Testing
- **API endpoints**: Teste manual via Swagger/Postman
- **Database**: Verificação de persistência e constraints
- **Middleware**: Teste de proteção de rotas

### Browser Testing
- **Formulário**: Submissão e feedback visual
- **Estados**: Loading, sucesso, erro
- **Navegação**: Fluxo entre páginas públicas e protegidas

## Security Considerations

### Input Validation
- Sanitização de todos os campos de entrada no servidor
- Validação obrigatória de detalhes do projeto
- Rate limiting por IP (implementação futura)
- Validação de formato de email rigorosa
- Validação opcional de formato de telefone

### Authentication
- Reutilização do sistema Clerk existente
- Proteção de rotas administrativas via middleware
- Verificação de token em todas as requisições protegidas

### Data Protection
- Todos os dados pessoais armazenados de forma segura
- Sem exposição de dados sensíveis em logs
- Compliance básico com LGPD (coleta apenas de dados necessários)
- Campos opcionais claramente identificados

## Performance Considerations

### Database
- Índice na coluna `createdAt` para ordenação eficiente
- Constraint unique no email para evitar duplicatas
- Paginação futura se volume crescer

### Frontend
- Componentes leves sem dependências pesadas
- Loading states para melhor UX
- Validação client-side para reduzir requisições desnecessárias

### API
- Responses mínimas com apenas dados necessários
- Caching futuro se necessário
- Compressão automática via Next.js
# Design Document

## Overview

A funcionalidade de waitlist será implementada seguindo a arquitetura existente do projeto, utilizando Prisma para persistência, Elysia para API endpoints, e Next.js para as páginas frontend. O sistema será simples e focado na funcionalidade essencial de captura de emails e visualização administrativa.

## Architecture

### Database Layer
- **Prisma**: Gerenciamento do modelo `Waitlist` com campos essenciais (email, data de criação)
- **PostgreSQL**: Base de dados existente será estendida com a nova tabela

### API Layer  
- **Elysia**: Endpoints RESTful para operações CRUD da waitlist
- **Autenticação**: Reutilização do sistema Clerk existente para proteger rotas administrativas
- **Validação**: Validação de email usando schemas TypeBox

### Frontend Layer
- **Next.js**: Páginas para inscrição pública ("/") e administração ("/admin")
- **Componentes**: Componente reutilizável para formulário de waitlist
- **Middleware**: Extensão do middleware existente para proteger rota admin

## Components and Interfaces

### Database Model
```prisma
model Waitlist {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  
  @@map("waitlist")
  @@index([createdAt])
}
```

### API Endpoints

#### POST /api/waitlist
- **Público**: Aceita inscrições de qualquer visitante
- **Input**: `{ email: string }`
- **Output**: Confirmação de sucesso ou erro (email duplicado)
- **Validação**: Email válido e único

#### GET /api/waitlist  
- **Protegido**: Apenas usuários autenticados via Clerk
- **Output**: Lista completa de emails com timestamps
- **Ordenação**: Por data de criação (mais recentes primeiro)

### Frontend Components

#### WaitlistForm Component
- Formulário simples com input de email e botão submit
- Estados de loading, sucesso e erro
- Validação client-side básica
- Localizado em `features/waitlist/components/waitlist-form.tsx`

#### WaitlistAdmin Component  
- Lista de emails inscritos com data/hora
- Paginação simples se necessário
- Localizado em `features/waitlist/components/waitlist-admin.tsx`

### Pages

#### Homepage ("/")
- Página pública com formulário de inscrição
- Substitui conteúdo atual da `app/page.tsx`
- Design minimalista focado na conversão

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
  createdAt: Date
}
```

### API Responses
```typescript
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
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL', 
  UNAUTHORIZED: 'UNAUTHORIZED',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
}
```

## Testing Strategy

### Manual Testing Focus
- **Fluxo de inscrição**: Teste completo do formulário público
- **Validação de email**: Testes com emails válidos e inválidos  
- **Duplicação**: Tentativa de inscrição com email existente
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
- Sanitização de email no servidor
- Rate limiting por IP (implementação futura)
- Validação de formato de email rigorosa

### Authentication
- Reutilização do sistema Clerk existente
- Proteção de rotas administrativas via middleware
- Verificação de token em todas as requisições protegidas

### Data Protection
- Emails armazenados de forma segura
- Sem exposição de dados sensíveis em logs
- Compliance básico com LGPD (dados mínimos necessários)

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
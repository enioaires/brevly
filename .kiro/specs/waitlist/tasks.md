# Implementation Plan

- [x] 1. Criar modelo Waitlist no Prisma






  - Adicionar modelo Waitlist ao schema.prisma com campos id, email e createdAt
  - Configurar constraint unique no email e índice na data de criação
  - Gerar e executar migration para criar a tabela no banco
  - _Requirements: 1.3, 2.3, 3.1_

- [x] 2. Implementar endpoints da API waitlist





  - Criar arquivo de rotas waitlist em app/api/routes/waitlist.ts
  - Implementar endpoint POST /api/waitlist para inscrições públicas com validação de email
  - Implementar endpoint GET /api/waitlist protegido por autenticação para listar inscrições
  - Adicionar tratamento de erros específicos (email duplicado, validação, autorização)
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Integrar rotas waitlist no app principal
  - Importar e registrar as rotas waitlist no arquivo app/api/[[...slugs]]/route.ts
  - Verificar se a integração está funcionando corretamente
  - _Requirements: 3.1, 3.2_

- [x] 4. Criar queries e mutations para waitlist





  - Implementar queries React Query em features/waitlist/queries.ts
  - Criar useCreateWaitlistEntry mutation para inscrições
  - Criar useGetWaitlistEntries query para listar inscrições (protegida)
  - Usar o padrão do cliente Elysia existente
  - _Requirements: 1.2, 1.4, 2.1, 3.1, 3.2_

- [x] 5. Criar componente de formulário de waitlist









  - Implementar WaitlistForm em features/waitlist/components/waitlist-form.tsx
  - Usar useCreateWaitlistEntry mutation para submissão
  - Adicionar validação client-side de email e estados de loading/sucesso/erro
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [x] 6. Atualizar página inicial com formulário de waitlist





  - Modificar app/page.tsx para incluir o formulário de waitlist
  - Manter design simples focado na conversão
  - _Requirements: 1.1_

- [x] 7. Criar componente administrativo da waitlist





  - Implementar WaitlistAdmin em features/waitlist/components/waitlist-admin.tsx
  - Usar useGetWaitlistEntries query para buscar dados
  - Exibir lista de emails com data de inscrição ordenada por data
  - Tratar estado vazio quando não há inscrições
  - _Requirements: 2.1, 2.3, 2.4_

- [x] 8. Criar página administrativa




  - Implementar app/admin/page.tsx com o componente WaitlistAdmin
  - Garantir que apenas usuários autenticados possam acessar
  - _Requirements: 2.1, 2.2_

- [x] 9. Configurar middleware para proteger rota admin





  - Modificar middleware.ts para proteger a rota /admin
  - Redirecionar usuários não autenticados para login
  - _Requirements: 2.2, 4.1, 4.2, 4.3_
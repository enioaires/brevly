# Implementation Plan

- [x] 1. Atualizar modelo Waitlist no Prisma






  - Adicionar campos projectDetails (obrigatório), phoneNumber e companyName (opcionais) ao schema.prisma
  - Manter constraint unique no email e índice na data de criação
  - Gerar e executar migration para adicionar os novos campos
  - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [x] 2. Atualizar endpoints da API waitlist






  - Modificar endpoint POST /api/waitlist para aceitar os novos campos (projectDetails obrigatório, phoneNumber e companyName opcionais)
  - Atualizar validação para incluir obrigatoriedade de projectDetails
  - Modificar endpoint GET /api/waitlist para retornar todos os campos
  - Atualizar tratamento de erros para incluir validação de projectDetails
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Atualizar queries e mutations para waitlist





  - Modificar interfaces TypeScript em features/waitlist/queries.ts para incluir novos campos
  - Atualizar useCreateWaitlistEntry mutation para aceitar projectDetails, phoneNumber e companyName
  - Atualizar useGetWaitlistEntries query para retornar todos os campos
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 4. Criar componente de formulário para hero section








  - Implementar HeroWaitlistForm em features/waitlist/components/hero-waitlist-form.tsx
  - Incluir apenas campos essenciais: email e projectDetails
  - Usar useCreateWaitlistEntry mutation atualizada
  - Adicionar validação client-side para campos obrigatórios
  - Prestar atencao pois ja existe o waitlist-form.tsx
  - _Requirements: 1.1, 1.3, 1.4, 1.7, 5.1, 5.4_

- [x] 5. Criar componente de formulário para seção de contato






  - Implementar ContactWaitlistForm em features/waitlist/components/contact-waitlist-form.tsx
  - Incluir todos os campos: email, projectDetails (obrigatórios) e phoneNumber, companyName (opcionais)
  - Usar useCreateWaitlistEntry mutation atualizada
  - Adicionar validação client-side expandida
  - _Requirements: 1.2, 1.3, 1.4, 1.8, 5.2, 5.5_

- [x] 6. Atualizar hero section na página inicial






  - Modificar components/hero-section.tsx para incluir HeroWaitlistForm
  - Integrar o formulário no design existente da hero section
  - _Requirements: 5.1, 5.4_

- [x] 7. Atualizar seção de contato na página inicial






  - Modificar components/contact-section.tsx para incluir ContactWaitlistForm
  - Integrar o formulário completo no design existente da seção de contato
  - _Requirements: 5.2, 5.5_

- [x] 8. Atualizar componente administrativo da waitlist





  - Modificar WaitlistAdmin em features/waitlist/components/waitlist-admin.tsx
  - Exibir todos os campos: email, projectDetails, phoneNumber, companyName e data
  - Organizar visualização de forma clara e responsiva
  - Tratar campos opcionais que podem estar vazios
  - _Requirements: 2.1, 2.3, 2.5_


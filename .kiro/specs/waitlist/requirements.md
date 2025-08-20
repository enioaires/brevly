# Requirements Document

## Introduction

Esta funcionalidade implementa um sistema de waitlist expandido onde visitantes podem se inscrever fornecendo informações sobre seu projeto, dados de contato e detalhes opcionais da empresa. O sistema inclui formulários tanto na hero section quanto na seção de contato, além de uma área administrativa para visualizar os inscritos.

## Requirements

### Requirement 1

**User Story:** Como um visitante do site, eu quero me inscrever na waitlist fornecendo meu email e detalhes do meu projeto, para que eu possa ser notificado e contatado quando o produto estiver disponível.

#### Acceptance Criteria

1. WHEN um visitante acessa a página inicial ("/") THEN o sistema SHALL exibir um formulário de inscrição na hero section
2. WHEN um visitante acessa a seção de contato THEN o sistema SHALL exibir um formulário de inscrição expandido
3. WHEN um visitante preenche email válido e detalhes do projeto THEN o sistema SHALL aceitar a inscrição
4. WHEN um visitante submete o formulário com dados válidos THEN o sistema SHALL salvar as informações na base de dados
5. WHEN um visitante submete o formulário com sucesso THEN o sistema SHALL exibir uma mensagem de confirmação
6. WHEN um visitante tenta se inscrever com um email já cadastrado THEN o sistema SHALL exibir uma mensagem informando que o email já está na waitlist
7. WHEN um visitante não preenche os detalhes do projeto THEN o sistema SHALL exibir erro de validação
8. WHEN um visitante preenche telefone ou empresa THEN o sistema SHALL aceitar esses dados como opcionais

### Requirement 2

**User Story:** Como administrador do sistema, eu quero visualizar todas as inscrições da waitlist com informações completas, para que eu possa acompanhar o interesse no produto e contactar os interessados de forma personalizada.

#### Acceptance Criteria

1. WHEN um usuário autenticado acessa a página admin ("/admin") THEN o sistema SHALL exibir uma lista completa das inscrições da waitlist
2. WHEN um usuário não autenticado tenta acessar "/admin" THEN o sistema SHALL redirecionar para a página de login
3. WHEN a lista de waitlist é exibida THEN o sistema SHALL mostrar email, detalhes do projeto, telefone (se fornecido), empresa (se fornecida) e data de inscrição
4. WHEN não há inscrições na waitlist THEN o sistema SHALL exibir uma mensagem indicando que a lista está vazia
5. WHEN há muitas inscrições THEN o sistema SHALL organizar os dados de forma clara e legível

### Requirement 3

**User Story:** Como desenvolvedor do sistema, eu quero ter endpoints API atualizados para gerenciar a waitlist expandida, para que o frontend possa interagir com os novos campos de dados.

#### Acceptance Criteria

1. WHEN uma requisição POST é feita para "/api/waitlist" com email e detalhes do projeto THEN o sistema SHALL criar uma nova entrada na waitlist
2. WHEN uma requisição POST inclui telefone e/ou empresa THEN o sistema SHALL salvar esses campos opcionais
3. WHEN uma requisição GET é feita para "/api/waitlist" por um usuário autenticado THEN o sistema SHALL retornar todas as entradas com todos os campos
4. WHEN uma requisição é feita sem detalhes do projeto THEN o sistema SHALL retornar erro de validação
5. WHEN uma requisição é feita com dados inválidos THEN o sistema SHALL retornar um erro apropriado
6. WHEN uma requisição GET é feita para "/api/waitlist" por um usuário não autenticado THEN o sistema SHALL retornar erro de autorização

### Requirement 4

**User Story:** Como administrador do sistema, eu quero que apenas usuários autenticados possam acessar a área administrativa, para que os dados da waitlist permaneçam seguros.

#### Acceptance Criteria

1. WHEN o middleware de autenticação é executado para rotas admin THEN o sistema SHALL verificar se o usuário está logado via Clerk
2. WHEN um usuário não autenticado tenta acessar uma rota protegida THEN o sistema SHALL redirecionar para a página de login
3. WHEN um usuário autenticado acessa uma rota protegida THEN o sistema SHALL permitir o acesso
### Re
quirement 5

**User Story:** Como visitante do site, eu quero ter acesso a formulários de inscrição tanto na hero section quanto na seção de contato, para que eu possa me inscrever no momento mais conveniente da minha navegação.

#### Acceptance Criteria

1. WHEN um visitante visualiza a hero section THEN o sistema SHALL exibir um formulário simplificado com campos essenciais
2. WHEN um visitante visualiza a seção de contato THEN o sistema SHALL exibir um formulário completo com todos os campos disponíveis
3. WHEN um visitante submete qualquer um dos formulários THEN o sistema SHALL processar a inscrição da mesma forma
4. WHEN um visitante usa o formulário da hero section THEN o sistema SHALL aceitar apenas email e detalhes do projeto como obrigatórios
5. WHEN um visitante usa o formulário da seção de contato THEN o sistema SHALL permitir preenchimento de todos os campos disponíveis

### Requirement 6

**User Story:** Como desenvolvedor do sistema, eu quero que o schema do banco de dados seja atualizado para suportar os novos campos, para que as informações expandidas sejam persistidas corretamente.

#### Acceptance Criteria

1. WHEN o schema é atualizado THEN o sistema SHALL incluir campo obrigatório para detalhes do projeto
2. WHEN o schema é atualizado THEN o sistema SHALL incluir campos opcionais para telefone e empresa
3. WHEN uma migração é executada THEN o sistema SHALL preservar dados existentes da waitlist
4. WHEN novos registros são criados THEN o sistema SHALL validar a obrigatoriedade dos detalhes do projeto
5. WHEN campos opcionais não são fornecidos THEN o sistema SHALL aceitar valores nulos para telefone e empresa
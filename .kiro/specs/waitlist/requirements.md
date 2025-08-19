# Requirements Document

## Introduction

Esta funcionalidade implementa um sistema de waitlist simples onde visitantes podem se inscrever para receber notificações sobre o lançamento do produto. O sistema inclui uma página pública para inscrições e uma área administrativa para visualizar os inscritos.

## Requirements

### Requirement 1

**User Story:** Como um visitante do site, eu quero me inscrever na waitlist fornecendo meu email, para que eu possa ser notificado quando o produto estiver disponível.

#### Acceptance Criteria

1. WHEN um visitante acessa a página inicial ("/") THEN o sistema SHALL exibir um formulário de inscrição na waitlist
2. WHEN um visitante insere um email válido no formulário THEN o sistema SHALL aceitar a inscrição
3. WHEN um visitante submete o formulário com email válido THEN o sistema SHALL salvar o email na base de dados
4. WHEN um visitante submete o formulário com sucesso THEN o sistema SHALL exibir uma mensagem de confirmação
5. WHEN um visitante tenta se inscrever com um email já cadastrado THEN o sistema SHALL exibir uma mensagem informando que o email já está na waitlist

### Requirement 2

**User Story:** Como administrador do sistema, eu quero visualizar todos os emails inscritos na waitlist, para que eu possa acompanhar o interesse no produto e contactar os interessados quando necessário.

#### Acceptance Criteria

1. WHEN um usuário autenticado acessa a página admin ("/admin") THEN o sistema SHALL exibir uma lista de todos os emails da waitlist
2. WHEN um usuário não autenticado tenta acessar "/admin" THEN o sistema SHALL redirecionar para a página de login
3. WHEN a lista de waitlist é exibida THEN o sistema SHALL mostrar o email e a data de inscrição de cada entrada
4. WHEN não há inscrições na waitlist THEN o sistema SHALL exibir uma mensagem indicando que a lista está vazia

### Requirement 3

**User Story:** Como desenvolvedor do sistema, eu quero ter endpoints API para gerenciar a waitlist, para que o frontend possa interagir com os dados de forma consistente.

#### Acceptance Criteria

1. WHEN uma requisição POST é feita para "/api/waitlist" com um email válido THEN o sistema SHALL criar uma nova entrada na waitlist
2. WHEN uma requisição GET é feita para "/api/waitlist" por um usuário autenticado THEN o sistema SHALL retornar todas as entradas da waitlist
3. WHEN uma requisição é feita com dados inválidos THEN o sistema SHALL retornar um erro apropriado
4. WHEN uma requisição GET é feita para "/api/waitlist" por um usuário não autenticado THEN o sistema SHALL retornar erro de autorização

### Requirement 4

**User Story:** Como administrador do sistema, eu quero que apenas usuários autenticados possam acessar a área administrativa, para que os dados da waitlist permaneçam seguros.

#### Acceptance Criteria

1. WHEN o middleware de autenticação é executado para rotas admin THEN o sistema SHALL verificar se o usuário está logado via Clerk
2. WHEN um usuário não autenticado tenta acessar uma rota protegida THEN o sistema SHALL redirecionar para a página de login
3. WHEN um usuário autenticado acessa uma rota protegida THEN o sistema SHALL permitir o acesso
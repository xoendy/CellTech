# CellTech

Sistema web acadêmico para venda e gerenciamento de celulares. Projeto desenvolvido com HTML, CSS, JavaScript, Node.js, Express e SQLite.

## Como executar

1. Abra a pasta `CellTech` no VS Code.
2. Instale o Node.js caso ainda não esteja instalado.
3. No terminal, execute `npm install`.
4. Execute `npm start`.
5. Acesse `http://localhost:3000`.
6. Para testar o login, use qualquer usuário/e-mail e senha com pelo menos 4 caracteres.

O sistema cria automaticamente o arquivo `celltech.db` na primeira execução. Esse arquivo contém as tabelas de produtos, clientes e vendas. O frontend também mantém um fallback em `localStorage` caso o `index.html` seja aberto diretamente sem iniciar o servidor.

## Estrutura

```text
CellTech/
├── index.html          # Interface principal e modal de login
├── css/
│   └── styles.css      # Estilos, responsividade e tema visual
├── js/
│   └── app.js          # Estado, navegação, CRUD e regras de vendas
├── server.js           # API Express e servidor local
├── db.js               # Criação, seed e operações do SQLite
├── package.json        # Dependências e comandos do projeto
├── assets/             # Espaço para imagens reais dos produtos
└── manus-routes.json   # Manifesto de rota do projeto
```

## Funcionalidades

- Vitrine pública da loja com banner, catálogo, busca e produtos disponíveis.
- Carrinho de compras com ajuste de quantidades e finalização de pedido demonstrativa.
- Pedidos realizados pela loja online entram no histórico de vendas e baixam o estoque automaticamente.
- Login demonstrativo no navegador.
- Dashboard com indicadores, alertas e vendas recentes.
- Cadastro, edição, exclusão e pesquisa de celulares.
- Cadastro, edição, exclusão e pesquisa de clientes.
- Registro de vendas com cálculo automático, pagamento e baixa no estoque.
- Movimentação de entrada e saída de estoque.
- Relatórios de vendas, produtos mais vendidos e estoque atual.
- Persistência principal em SQLite por meio da API Express, com fallback para `localStorage`.

## Integração com banco de dados

O backend possui as rotas `GET /api/state`, `POST /api/state` e `GET /api/health`. As funções de leitura e gravação do frontend usam essas rotas e continuam centralizadas em `js/app.js`. Em uma evolução futura, as rotas podem ser separadas por recurso (`/api/produtos`, `/api/clientes` e `/api/vendas`).

## Credenciais de demonstração

O login é apenas visual para apresentação. Informe qualquer usuário/e-mail e uma senha com 4 ou mais caracteres.

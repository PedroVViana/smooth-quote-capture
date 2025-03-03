# Smooth Quote Capture

Formulário intuitivo, organizado e persuasivo para captação de leads qualificados e solicitação de orçamentos.

## Características

- Formulário multi-step para melhor experiência do usuário
- Design responsivo e mobile-first
- Validação de campos em tempo real
- Armazenamento dos dados em planilha do Google Sheets
- Feedback visual para o usuário durante todo o processo

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Framer Motion
- SheetMonkey para armazenamento de dados

## Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173` no seu navegador

## Deploy na Netlify

### Opção 1: Deploy via Interface da Netlify

1. Crie uma conta na [Netlify](https://www.netlify.com/) caso ainda não tenha
2. Faça login na sua conta Netlify
3. Clique em "New site from Git"
4. Selecione o provedor Git onde seu projeto está hospedado (GitHub, GitLab, Bitbucket)
5. Autorize a Netlify a acessar seus repositórios
6. Selecione o repositório deste projeto
7. Configure as opções de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
8. Clique em "Deploy site"

### Opção 2: Deploy via Netlify CLI

1. Instale a Netlify CLI globalmente:
   ```bash
   npm install netlify-cli -g
   ```
2. Faça login na sua conta Netlify:
   ```bash
   netlify login
   ```
3. Inicialize o projeto para deploy:
   ```bash
   netlify init
   ```
4. Siga as instruções para configurar o projeto
5. Faça o deploy:
   ```bash
   netlify deploy --prod
   ```

### Opção 3: Deploy Manual (Drag and Drop)

1. Construa o projeto localmente:
   ```bash
   npm run build
   ```
2. Acesse o [Dashboard da Netlify](https://app.netlify.com/)
3. Arraste e solte a pasta `dist` gerada na área de upload da Netlify

## Configurações Adicionais na Netlify

### Configuração de Formulários (Opcional)

Se você quiser usar o serviço de formulários da Netlify em vez do SheetMonkey:

1. No Dashboard da Netlify, vá para "Site settings" > "Forms"
2. Ative o serviço de formulários
3. Modifique o componente de formulário para usar o atributo `data-netlify="true"`

### Configuração de Domínio Personalizado

1. No Dashboard da Netlify, vá para "Site settings" > "Domain management"
2. Clique em "Add custom domain"
3. Siga as instruções para configurar seu domínio personalizado

## Configuração do SheetMonkey para Armazenamento de Dados

Este projeto utiliza o SheetMonkey para armazenar os dados do formulário em uma planilha do Google Sheets:

1. Os dados do formulário são enviados para o SheetMonkey através da API
2. O SheetMonkey armazena os dados em uma planilha do Google Sheets
3. Você pode acessar e gerenciar os dados diretamente na planilha

Para mais detalhes sobre a configuração do SheetMonkey, consulte o arquivo [SHEETMONKEY_SETUP.md](./SHEETMONKEY_SETUP.md).

## Suporte

Para suporte, entre em contato através do email: pedro.vviana@hotmail.com

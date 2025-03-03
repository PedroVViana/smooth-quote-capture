# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4e94b4f0-4ee6-45a2-afff-ae3cfcb5fb2f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4e94b4f0-4ee6-45a2-afff-ae3cfcb5fb2f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4e94b4f0-4ee6-45a2-afff-ae3cfcb5fb2f) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# Smooth Quote Capture

Formulário intuitivo, organizado e persuasivo para captação de leads qualificados e solicitação de orçamentos.

## Características

- Formulário multi-step para melhor experiência do usuário
- Design responsivo e mobile-first
- Validação de campos em tempo real
- Envio automático de email com os dados do formulário
- Feedback visual para o usuário durante todo o processo

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Framer Motion
- FormSubmit para envio de emails

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

Se você quiser usar o serviço de formulários da Netlify em vez do FormSubmit:

1. No Dashboard da Netlify, vá para "Site settings" > "Forms"
2. Ative o serviço de formulários
3. Modifique o componente de formulário para usar o atributo `data-netlify="true"`

### Configuração de Domínio Personalizado

1. No Dashboard da Netlify, vá para "Site settings" > "Domain management"
2. Clique em "Add custom domain"
3. Siga as instruções para configurar seu domínio personalizado

## Suporte

Para suporte, entre em contato através do email: pedro.vviana@hotmail.com

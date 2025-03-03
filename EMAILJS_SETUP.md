# Configuração do EmailJS para o Formulário de Orçamentos

Este guia explica como configurar o EmailJS para o envio automático de emails a partir do formulário de orçamentos.

## Passo 1: Criar uma conta no EmailJS

1. Acesse [EmailJS](https://www.emailjs.com/) e crie uma conta gratuita
2. Faça login na sua conta

## Passo 2: Configurar um serviço de email

1. No dashboard do EmailJS, clique em "Email Services" no menu lateral
2. Clique em "Add New Service"
3. Escolha o provedor de email que você usa (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta de email
5. Dê um nome ao serviço (por exemplo, "service_orcamentos")
6. Anote o Service ID que será gerado (algo como "service_xxxxxxx")

## Passo 3: Criar um template de email

1. No dashboard do EmailJS, clique em "Email Templates" no menu lateral
2. Clique em "Create New Template"
3. Dê um nome ao template (por exemplo, "template_orcamentos")
4. Configure o assunto do email como: `{{subject}}` (isso permitirá que o assunto seja dinâmico)
5. No corpo do email, você pode usar o seguinte template HTML:

```html
<h2>Nova solicitação de orçamento</h2>
<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Empresa:</strong> {{company}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Telefone:</strong> {{phone}}</p>
<p><strong>Tipo de serviço:</strong> {{service_type}}</p>
<p><strong>Objetivo do projeto:</strong> {{objective}}</p>
<p><strong>Funcionalidades essenciais:</strong> {{features}}</p>
<p><strong>Referências:</strong> {{references}}</p>
<p><strong>Já possui domínio:</strong> {{has_domain}}</p>
<p><strong>Orçamento:</strong> {{budget}}</p>
<p><strong>Prazo:</strong> {{deadline}}</p>
<p><strong>Data da solicitação:</strong> {{request_date}}</p>
```

6. Clique em "Save" para salvar o template
7. Anote o Template ID que será gerado (algo como "template_xxxxxxx")

## Passo 4: Obter sua Public Key

1. No dashboard do EmailJS, clique em "Account" no menu lateral
2. Na seção "API Keys", você encontrará sua Public Key
3. Anote essa chave

## Passo 5: Atualizar o código da aplicação

1. Abra o arquivo `src/services/emailService.ts`
2. Substitua as constantes no início do arquivo pelos valores que você anotou:

```typescript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Substitua pelo seu Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Substitua pelo seu Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxxxxxxx'; // Substitua pela sua Public Key
```

3. Abra o arquivo `src/lib/emailjs-init.ts`
4. Substitua a chave pública na função init:

```typescript
init('xxxxxxxxxxxxxxxxxxxx'); // Substitua pela sua Public Key
```

## Passo 6: Testar o envio de email

1. Execute a aplicação localmente
2. Preencha o formulário de orçamento
3. Envie o formulário
4. Verifique se o email foi enviado corretamente

## Limites da conta gratuita do EmailJS

A conta gratuita do EmailJS permite:
- 200 emails por mês
- 2 serviços de email
- Suporte por email

Se você precisar de mais recursos, considere fazer upgrade para um plano pago.

## Solução de problemas

Se o envio de email não estiver funcionando:

1. Verifique no console do navegador se há erros
2. Confirme se os IDs e a chave pública estão corretos
3. Verifique se o serviço de email está configurado corretamente
4. Verifique se o template de email está configurado corretamente
5. Verifique se você não excedeu o limite de emails da conta gratuita 
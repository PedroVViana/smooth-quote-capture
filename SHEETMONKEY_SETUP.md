# Configuração do SheetMonkey para o Formulário de Orçamentos

Este guia explica como o SheetMonkey está configurado para receber os dados do formulário de orçamentos e armazená-los em uma planilha do Google Sheets.

## O que é o SheetMonkey?

SheetMonkey é um serviço que permite enviar dados de formulários diretamente para planilhas do Google Sheets. É uma alternativa simples e eficaz para armazenar e gerenciar dados de formulários sem a necessidade de um backend complexo.

## Como funciona?

1. O formulário envia os dados para a API do SheetMonkey
2. O SheetMonkey processa os dados e os insere em uma planilha do Google Sheets
3. Você pode acessar e gerenciar esses dados diretamente na planilha

## Configuração atual

O formulário está configurado para enviar os seguintes campos para o SheetMonkey:

- **Nome**: Nome do cliente
- **Empresa**: Nome da empresa (se aplicável)
- **Email**: Email de contato
- **Telefone**: Telefone de contato
- **Tipo_de_Servico**: Tipo de serviço solicitado
- **Objetivo**: Objetivo principal do projeto
- **Funcionalidades**: Funcionalidades essenciais
- **Referencias**: Referências ou inspirações
- **Possui_Dominio**: Se já possui domínio/servidor
- **Orcamento**: Faixa de orçamento
- **Prazo**: Prazo ideal para entrega
- **Data_Solicitacao**: Data e hora da solicitação
- **Assunto**: Assunto para referência (formato: "Orçamento de projeto da [nome]")

## URL da API

A URL da API do SheetMonkey configurada é:
```
https://api.sheetmonkey.io/form/9BT1GKhAAMchuXQCQPuy5p
```

## Acessando os dados

Para acessar os dados enviados pelo formulário:

1. Acesse a planilha do Google Sheets associada à sua conta do SheetMonkey
2. Os novos envios aparecerão automaticamente como novas linhas na planilha
3. Você pode ordenar, filtrar e analisar os dados diretamente no Google Sheets

## Modificando a configuração

Se você precisar modificar a configuração do SheetMonkey:

1. Acesse sua conta no [SheetMonkey](https://sheetmonkey.io/)
2. Localize o formulário associado a este projeto
3. Faça as alterações necessárias (adicionar/remover campos, mudar a planilha de destino, etc.)
4. Se você mudar a URL da API, atualize-a no arquivo `src/services/emailService.ts`

## Limitações da conta gratuita

A conta gratuita do SheetMonkey tem algumas limitações:
- Número limitado de envios por mês
- Recursos básicos de personalização
- Sem suporte a notificações avançadas

Se você precisar de mais recursos, considere fazer upgrade para um plano pago. 
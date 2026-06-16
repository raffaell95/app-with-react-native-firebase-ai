# MotivIA

Aplicação mobile desenvolvida com React Native e Expo que utiliza Inteligência Artificial Generativa para criar mensagens motivacionais contextualizadas a partir de imagens obtidas da API da Pexels.

O fluxo da aplicação combina busca de imagens, análise visual e geração de texto utilizando modelos de IA integrados através do Firebase AI.

---

# Arquitetura

```text
┌─────────────────┐
│    React Native │
│      (Expo)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Pexels API    │
│ Busca Imagens   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Seleção da URL  │
│ da Imagem       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Firebase AI     │
│ Análise Visual  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Prompt Builder  │
│ Contextual      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Gemini Model    │
│ Geração Texto   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Interface Expo  │
│ Exibição Final  │
└─────────────────┘
````

---

# Funcionalidades

## Geração Dinâmica de Imagens

A aplicação consome a API da Pexels para obter imagens aleatórias.

### Características

* Consulta remota de imagens
* Suporte a múltiplas resoluções
* Carregamento otimizado
* Atualização dinâmica do conteúdo

---

## Análise Inteligente de Imagens

Após obter uma imagem, sua URL é enviada para o Firebase AI.

A IA identifica elementos relevantes da cena:

* Pessoas
* Objetos
* Cenários
* Emoções visuais
* Contexto geral da imagem

---

## Geração de Mensagens Motivacionais

Com base na descrição retornada pela IA, um prompt estruturado é enviado ao modelo generativo.

### Exemplo

```text
Crie uma mensagem motivacional inspiradora com no máximo 120 caracteres baseada na seguinte descrição:

"Pessoa caminhando em uma trilha durante o nascer do sol cercada por montanhas."
```

### Resposta esperada

```text
Cada passo dado hoje te aproxima da versão que você deseja se tornar.
```

---

# Stack Tecnológica

## Frontend Mobile

* React Native
* Expo SDK
* TypeScript

## Inteligência Artificial

* Firebase AI
* Gemini Models

## APIs Externas

* Pexels API

## Ferramentas

* EAS Build
* Expo CLI
* ESLint
* Prettier

---

## 2. Análise da Imagem

```typescript
const analysis = await firebaseAI.analyzeImage(
  image.src.large
);
```

### Retorno

```typescript
{
  description: string;
}
```

---

## 3. Construção do Prompt

```typescript
const prompt = buildMotivationalPrompt(
  analysis.description
);
```

---

## 4. Geração da Mensagem

```typescript
const message = await firebaseAI.generateText(
  prompt
);
```

---

# Variáveis de Ambiente

Crie um arquivo `.env`.

```env
EXPO_PUBLIC_PEXELS_API_KEY=
```

---

# Instalação

## Clone

```bash
git clone https://github.com/raffaell95/motivia.git

cd motivia
```

## Dependências

```bash
npm install
```

ou

```bash
yarn
```

---

# Executando Localmente

### Iniciar Metro Bundler

```bash
npx expo start
```

### Android

```bash
npx expo run:android
```

### iOS

```bash
npx expo run:ios
```

### Web

```bash
npx expo start --web
```

---

# Build Android (APK)

## Configurar EAS

```bash
eas build:configure
```

---

## Gerar APK

```bash
eas build \
  --platform android \
  --profile preview
```

---

## Gerar AAB (Google Play)

```bash
eas build \
  --platform android \
  --profile production
```

---

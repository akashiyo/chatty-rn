# Chatty

Chatty est une application Expo/React Native permettant de discuter avec un assistant IA depuis un écran unique.

## Installation

```bash
npm install
npm start
```

Ouvre l’application dans Expo Go, un émulateur Android, un simulateur iOS ou ton navigateur.

## Mode mock

Le mode mock est actif par défaut. Il ne nécessite aucune clé API et simule une réponse après un court délai.

## Mode API

Crée un fichier `.env.local` à la racine :

```env
EXPO_PUBLIC_AI_MODE=api
EXPO_PUBLIC_AI_API_URL=https://api.groq.com/openai/v1/chat/completions
EXPO_PUBLIC_AI_API_KEY=ta_clef_locale
EXPO_PUBLIC_AI_MODEL=openai/gpt-oss-20b
```

Puis relance Expo. L’intégration utilise une API compatible avec le format chat OpenAI via `fetch`.

Redémarre Expo avec le cache vidé après toute modification du fichier `.env` :

```bash
npx expo start --clear
```

Les variables `EXPO_PUBLIC_*` sont incluses dans le bundle JavaScript. Ne mets pas de secret réservé à un serveur dans cette application. Pour une utilisation réelle, passe l’appel IA par une API backend servant de proxy.

## Commandes

- `npm start` : lance le serveur Expo.
- `npm run android` : lance Android.
- `npm run ios` : lance iOS.
- `npm run web` : lance la version web.
- `npm run lint` : lance ESLint.
- `npx tsc --noEmit` : vérifie les types.

import type { ChatMessage } from '@/types/chat';

export const SYSTEM_PROMPT =
  'Tu es Chatty, un assistant IA bienveillant, concis et utile. Réponds en français sauf demande contraire.';

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

function mockReply(message: string): string {
  if (/bonjour|salut|hello|coucou/i.test(message)) {
    return 'Bonjour ! Je suis prêt à t’aider. Sur quel sujet veux-tu travailler ?';
  }
  if (/merci/i.test(message)) {
    return 'Avec plaisir ! N’hésite pas si tu as une autre question.';
  }
  if (/\?$/.test(message.trim())) {
    return `C’est une bonne question. Voici une piste pour « ${message.trim()} » : commence par décomposer le sujet en étapes, puis vérifie chaque hypothèse avec un exemple concret.`;
  }
  return `J’ai bien reçu ton message : « ${message} ». En mode démo, je peux discuter sans clé API. Configure EXPO_PUBLIC_AI_API_KEY pour activer une réponse réelle.`;
}

export async function sendChatMessage(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  const mode = process.env.EXPO_PUBLIC_AI_MODE ?? 'mock';

  if (mode !== 'api') {
    await wait(700);
    return mockReply(userMessage);
  }

  const apiUrl =
    process.env.EXPO_PUBLIC_AI_API_URL ??
    'https://api.openai.com/v1/chat/completions';
  const apiKey = process.env.EXPO_PUBLIC_AI_API_KEY;
  const model = process.env.EXPO_PUBLIC_AI_MODEL ?? 'gpt-4o-mini';

  if (!apiKey) {
    throw new Error(
      'Clé API manquante. Ajoute EXPO_PUBLIC_AI_API_KEY dans ton fichier .env.local.'
    );
  }

  const conversation = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history
      .filter((message) => message.id !== 'welcome')
      .map((message) => ({ role: message.role, content: message.content })),
    { role: 'user', content: userMessage },
  ];

  let response: Response;
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages: conversation }),
    });
  } catch {
    throw new Error('Impossible de joindre le service IA. Vérifie ta connexion.');
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Clé API invalide.');
    }
    if (response.status === 429) {
      throw new Error('Quota dépassé ou trop de requêtes. Réessaie plus tard.');
    }
    throw new Error(`Le service IA a retourné une erreur (${response.status}).`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error('Le service IA n’a retourné aucune réponse.');
  }
  return reply;
}

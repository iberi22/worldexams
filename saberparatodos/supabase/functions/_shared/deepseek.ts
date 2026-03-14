export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export async function askDeepSeek(messages: ChatMessage[], apiKey: string, temperature = 0.7) {
  if (!apiKey) {
    console.error('DEEPSEEK_API_KEY is not set');
    return "Error: Configuración de IA incompleta.";
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: temperature,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API Error:', errorText);
      return "Lo siento, estoy teniendo problemas para pensar en este momento. Intenta de nuevo más tarde.";
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (e) {
    console.error('DeepSeek Network Error:', e);
    return "Error de conexión con el cerebro de la IA.";
  }
}

export async function getTutorResponse(userMessage: string, apiKey: string, context?: string) {
  const systemPrompt: ChatMessage = {
    role: 'system',
    content: `Eres "SaberBot", un tutor experto en las pruebas Saber 11 de Colombia (ICFES).
    Tu objetivo es ayudar a los estudiantes a prepararse para el examen.

    Reglas:
    1. Sé amable, motivador y usa un lenguaje cercano (puedes usar "parcero" ocasionalmente si el contexto es informal, pero mantén el profesionalismo).
    2. Tus respuestas deben ser pedagógicas. No solo des la respuesta, explica el porqué.
    3. Si te preguntan sobre temas ajenos al examen, redirige suavemente al estudio.
    4. Sé conciso. En Telegram los textos largos son difíciles de leer.

    ${context ? `Contexto adicional: ${context}` : ''}`
  };

  const messages: ChatMessage[] = [
    systemPrompt,
    { role: 'user', content: userMessage }
  ];

  return await askDeepSeek(messages, apiKey);
}

export type IntentCategory =
  | 'SYSTEM_CONTROL'
  | 'FILE_MANAGEMENT'
  | 'WEB_SEARCH'
  | 'COMMUNICATION'
  | 'CONTENT_CREATION'
  | 'GENERAL_CONVERSATION'
  | 'WEATHER'
  | 'REMINDER'
  | 'TRANSLATION'
  | 'JOKE';

export interface ParsedIntent {
  category: IntentCategory;
  confidence: number;
  keywords: string[];
}

const intentPatterns: Record<IntentCategory, { patterns: RegExp[]; keywords: string[] }> = {
  SYSTEM_CONTROL: {
    patterns: [
      /\b(open|launch|start|run|close|quit|exit|kill)\b.*\b(app|application|program|software|browser|chrome|firefox|photoshop|word|excel|notepad|terminal|cmd)\b/i,
      /\b(volume|brightness|screen|display|wifi|bluetooth|airplane mode|battery|shutdown|restart|sleep|lock)\b/i,
      /\b(screenshot|screen capture|take a photo of screen)\b/i,
      /\b(open|launch|start)\s+\w+/i,
    ],
    keywords: ['open', 'launch', 'volume', 'brightness', 'screenshot', 'shutdown', 'restart', 'close', 'quit'],
  },
  FILE_MANAGEMENT: {
    patterns: [
      /\b(find|search|locate|look for)\b.*\b(file|folder|document|photo|image|video|music|pdf)\b/i,
      /\b(create|make|new|delete|remove|move|copy|rename)\b.*\b(file|folder|directory)\b/i,
      /\b(list|show|display)\b.*\b(files|folders|documents)\b/i,
    ],
    keywords: ['file', 'folder', 'document', 'directory', 'search files', 'find file', 'create folder'],
  },
  WEB_SEARCH: {
    patterns: [
      /\b(search|google|look up|find|browse|check)\b.*\b(web|internet|online|for)\b/i,
      /\bsearch (for|the web for|online for)\b/i,
      /\bwhat is\b|\bwho is\b|\bhow to\b|\bwhere is\b|\bwhen did\b|\bwhy does\b/i,
      /\blatest news\b|\bcurrent events\b|\btoday's\b/i,
    ],
    keywords: ['search', 'google', 'look up', 'browse', 'what is', 'who is', 'how to', 'news'],
  },
  COMMUNICATION: {
    patterns: [
      /\b(send|write|compose|draft|reply|forward)\b.*\b(email|mail|message|text|sms)\b/i,
      /\b(call|phone|contact|reach out to)\b/i,
      /\b(read|check|open)\b.*\b(email|inbox|messages)\b/i,
    ],
    keywords: ['email', 'send', 'message', 'call', 'contact', 'inbox', 'reply'],
  },
  CONTENT_CREATION: {
    patterns: [
      /\b(write|create|generate|make|build|code|program|develop)\b.*\b(code|script|program|function|class|app|website|html|css|javascript|python)\b/i,
      /\b(create|make|design|generate)\b.*\b(presentation|slide|poster|image|graphic|logo)\b/i,
      /\b(write|draft|compose|create)\b.*\b(essay|article|blog|report|summary|story|poem)\b/i,
      /\b(generate|create|make)\b.*\b(image|picture|photo|artwork|design)\b/i,
    ],
    keywords: ['code', 'write', 'create', 'generate', 'design', 'presentation', 'script', 'program'],
  },
  WEATHER: {
    patterns: [
      /\b(weather|temperature|forecast|rain|sunny|cloudy|humidity|wind)\b/i,
      /\bwhat('s| is) the weather\b/i,
      /\bwill it rain\b|\bwill it snow\b/i,
    ],
    keywords: ['weather', 'temperature', 'forecast', 'rain', 'sunny', 'cloudy'],
  },
  REMINDER: {
    patterns: [
      /\b(remind|reminder|set alarm|alarm|schedule|calendar|appointment|meeting)\b/i,
      /\bremind me (to|about|at)\b/i,
      /\bset a reminder\b|\badd to calendar\b/i,
    ],
    keywords: ['remind', 'reminder', 'alarm', 'schedule', 'appointment', 'meeting'],
  },
  TRANSLATION: {
    patterns: [
      /\b(translate|translation|convert)\b.*\b(to|into|from)\b/i,
      /\bhow do you say\b/i,
      /\bwhat does .+ mean in\b/i,
    ],
    keywords: ['translate', 'translation', 'language', 'convert', 'say in'],
  },
  JOKE: {
    patterns: [
      /\b(tell|say|give me)\b.*\b(joke|funny|humor|laugh|pun)\b/i,
      /\bmake me laugh\b|\bsomething funny\b/i,
    ],
    keywords: ['joke', 'funny', 'humor', 'laugh', 'pun'],
  },
  GENERAL_CONVERSATION: {
    patterns: [/.*/],
    keywords: [],
  },
};

export function parseIntent(input: string): ParsedIntent {
  const lowerInput = input.toLowerCase().trim();

  const categories: IntentCategory[] = [
    'SYSTEM_CONTROL',
    'FILE_MANAGEMENT',
    'WEB_SEARCH',
    'COMMUNICATION',
    'CONTENT_CREATION',
    'WEATHER',
    'REMINDER',
    'TRANSLATION',
    'JOKE',
  ];

  for (const category of categories) {
    const { patterns, keywords } = intentPatterns[category];
    const matchedKeywords: string[] = [];

    for (const pattern of patterns) {
      if (pattern.test(lowerInput)) {
        const matched = keywords.filter(kw => lowerInput.includes(kw.toLowerCase()));
        matchedKeywords.push(...matched);
        return { category, confidence: 0.85, keywords: matchedKeywords };
      }
    }
  }

  return { category: 'GENERAL_CONVERSATION', confidence: 0.5, keywords: [] };
}

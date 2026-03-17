import { useState, useCallback } from 'react';
import { parseIntent, IntentCategory } from '../utils/intentParser';
import { generateResponse, GeneratedResponse } from '../utils/responseGenerator';
import { useSaveMessage } from './useQueries';
import { Message } from '../backend';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'friday';
  timestamp: number;
  intent?: IntentCategory;
  response?: GeneratedResponse;
}

let messageIdCounter = Date.now();

function generateId(): string {
  return `msg_${++messageIdCounter}`;
}

export function useChat(onNewFridayMessage?: (text: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const saveMessageMutation = useSaveMessage();

  const addHistoryMessages = useCallback((backendMessages: Message[]) => {
    const chatMessages: ChatMessage[] = backendMessages.map(msg => ({
      id: `history_${msg.id.toString()}`,
      content: msg.content,
      sender: msg.sender === 'user' ? 'user' : 'friday',
      timestamp: Number(msg.timestamp) / 1_000_000,
    }));
    setMessages(chatMessages);
  }, []);

  const sendMessage = useCallback(async (text: string, isWakeWord: boolean = false) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      content: text,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    // Save user message to backend
    const backendUserMsg: Message = {
      id: BigInt(messageIdCounter),
      content: text,
      sender: 'user',
      timestamp: BigInt(Date.now() * 1_000_000),
    };
    saveMessageMutation.mutate(backendUserMsg);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    let fridayText: string;
    let intent: IntentCategory;
    let response: GeneratedResponse;

    if (isWakeWord) {
      fridayText = "Hello! I'm FRIDAY, your personal AI assistant. I'm fully operational and ready to assist you. You can ask me to search the web, write code, send emails, control your system, or just have a conversation. What can I do for you?";
      intent = 'GENERAL_CONVERSATION';
      response = { text: fridayText, type: 'text' };
    } else {
      const parsed = parseIntent(text);
      intent = parsed.category;
      response = generateResponse(text, intent);
      fridayText = response.text;
    }

    const fridayMsg: ChatMessage = {
      id: generateId(),
      content: fridayText,
      sender: 'friday',
      timestamp: Date.now(),
      intent,
      response,
    };

    setMessages(prev => [...prev, fridayMsg]);
    setIsThinking(false);

    // Save FRIDAY message to backend
    const backendFridayMsg: Message = {
      id: BigInt(messageIdCounter),
      content: fridayText,
      sender: 'friday',
      timestamp: BigInt(Date.now() * 1_000_000),
    };
    saveMessageMutation.mutate(backendFridayMsg);

    if (onNewFridayMessage) {
      onNewFridayMessage(fridayText);
    }
  }, [saveMessageMutation, onNewFridayMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isThinking, sendMessage, addHistoryMessages, clearMessages };
}

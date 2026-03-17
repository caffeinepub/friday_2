export interface CommandTemplate {
  id: string;
  label: string;
  icon: string;
  template: string;
  category: string;
}

export const commandTemplates: CommandTemplate[] = [
  {
    id: 'search-web',
    label: 'Search Web',
    icon: 'Search',
    template: 'Search the web for ',
    category: 'WEB_SEARCH',
  },
  {
    id: 'write-email',
    label: 'Write Email',
    icon: 'Mail',
    template: 'Write an email to [recipient] about [subject]',
    category: 'COMMUNICATION',
  },
  {
    id: 'write-code',
    label: 'Write Code',
    icon: 'Code',
    template: 'Write a Python script that ',
    category: 'CONTENT_CREATION',
  },
  {
    id: 'system-info',
    label: 'System Info',
    icon: 'Monitor',
    template: 'Show me system information and current status',
    category: 'SYSTEM_CONTROL',
  },
  {
    id: 'translate',
    label: 'Translate',
    icon: 'Globe',
    template: 'Translate "[text]" to Hindi',
    category: 'TRANSLATION',
  },
  {
    id: 'set-reminder',
    label: 'Set Reminder',
    icon: 'Bell',
    template: 'Remind me to [task] at [time]',
    category: 'REMINDER',
  },
  {
    id: 'tell-joke',
    label: 'Tell a Joke',
    icon: 'Smile',
    template: 'Tell me a funny joke',
    category: 'JOKE',
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: 'Cloud',
    template: "What's the weather like today?",
    category: 'WEATHER',
  },
  {
    id: 'open-app',
    label: 'Open App',
    icon: 'AppWindow',
    template: 'Open ',
    category: 'SYSTEM_CONTROL',
  },
  {
    id: 'create-presentation',
    label: 'Create Presentation',
    icon: 'Presentation',
    template: 'Create a presentation about ',
    category: 'CONTENT_CREATION',
  },
];

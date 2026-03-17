export type Language = 'en' | 'te' | 'hi';

export interface Translations {
  inputPlaceholder: string;
  send: string;
  listening: string;
  voiceOutput: string;
  language: string;
  settings: string;
  clearHistory: string;
  clearHistoryConfirm: string;
  displayName: string;
  displayNamePlaceholder: string;
  about: string;
  version: string;
  capabilities: string;
  logout: string;
  yourPrincipal: string;
  voiceSpeed: string;
  voicePitch: string;
  wakeGreeting: string;
  micDenied: string;
  historyLoading: string;
  noHistory: string;
  commandPalette: string;
  searchWeb: string;
  writeEmail: string;
  writeCode: string;
  systemInfo: string;
  translate: string;
  setReminder: string;
  tellJoke: string;
  weather: string;
  saving: string;
  saved: string;
  authenticate: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  supportedLanguages: string;
  profileSetupTitle: string;
  profileSetupSubtitle: string;
  profileNamePlaceholder: string;
  profileSave: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    inputPlaceholder: 'Ask FRIDAY anything... or type / for commands',
    send: 'Send',
    listening: 'Listening...',
    voiceOutput: 'Voice Output',
    language: 'Language',
    settings: 'Settings',
    clearHistory: 'Clear History',
    clearHistoryConfirm: 'Are you sure you want to clear all conversation history?',
    displayName: 'Display Name',
    displayNamePlaceholder: 'Enter your name',
    about: 'About FRIDAY',
    version: 'Version',
    capabilities: 'Capabilities',
    logout: 'Logout',
    yourPrincipal: 'Your Principal',
    voiceSpeed: 'Voice Speed',
    voicePitch: 'Voice Pitch',
    wakeGreeting: "Hello! I'm FRIDAY, your personal AI assistant. How can I help you today?",
    micDenied: 'Microphone access denied. Please allow microphone permissions.',
    historyLoading: 'Loading conversation history...',
    noHistory: 'No previous conversations. Start chatting!',
    commandPalette: 'Command Palette',
    searchWeb: 'Search Web',
    writeEmail: 'Write Email',
    writeCode: 'Write Code',
    systemInfo: 'System Info',
    translate: 'Translate',
    setReminder: 'Set Reminder',
    tellJoke: 'Tell a Joke',
    weather: 'Weather',
    saving: 'Saving...',
    saved: 'Saved',
    authenticate: 'Authenticate with Internet Identity',
    welcomeTitle: 'FRIDAY',
    welcomeSubtitle: 'Your Advanced AI Personal Assistant',
    supportedLanguages: 'English · Telugu · Hindi',
    profileSetupTitle: 'Welcome to FRIDAY',
    profileSetupSubtitle: "I'm FRIDAY, your personal AI assistant. What should I call you?",
    profileNamePlaceholder: 'Enter your name',
    profileSave: 'Get Started',
  },
  te: {
    inputPlaceholder: 'FRIDAY ని ఏదైనా అడగండి... లేదా కమాండ్‌ల కోసం / టైప్ చేయండి',
    send: 'పంపు',
    listening: 'వింటున్నాను...',
    voiceOutput: 'వాయిస్ అవుట్‌పుట్',
    language: 'భాష',
    settings: 'సెట్టింగ్‌లు',
    clearHistory: 'చరిత్ర తొలగించు',
    clearHistoryConfirm: 'మీరు నిజంగా అన్ని సంభాషణ చరిత్రను తొలగించాలనుకుంటున్నారా?',
    displayName: 'ప్రదర్శన పేరు',
    displayNamePlaceholder: 'మీ పేరు నమోదు చేయండి',
    about: 'FRIDAY గురించి',
    version: 'వెర్షన్',
    capabilities: 'సామర్థ్యాలు',
    logout: 'లాగ్ అవుట్',
    yourPrincipal: 'మీ ప్రిన్సిపల్',
    voiceSpeed: 'వాయిస్ వేగం',
    voicePitch: 'వాయిస్ పిచ్',
    wakeGreeting: 'నమస్కారం! నేను FRIDAY, మీ వ్యక్తిగత AI సహాయకుడు. నేను మీకు ఎలా సహాయం చేయగలను?',
    micDenied: 'మైక్రోఫోన్ యాక్సెస్ నిరాకరించబడింది. దయచేసి మైక్రోఫోన్ అనుమతులను అనుమతించండి.',
    historyLoading: 'సంభాషణ చరిత్ర లోడ్ అవుతోంది...',
    noHistory: 'మునుపటి సంభాషణలు లేవు. చాటింగ్ ప్రారంభించండి!',
    commandPalette: 'కమాండ్ ప్యాలెట్',
    searchWeb: 'వెబ్ శోధన',
    writeEmail: 'ఇమెయిల్ రాయండి',
    writeCode: 'కోడ్ రాయండి',
    systemInfo: 'సిస్టమ్ సమాచారం',
    translate: 'అనువదించు',
    setReminder: 'రిమైండర్ సెట్ చేయండి',
    tellJoke: 'జోక్ చెప్పు',
    weather: 'వాతావరణం',
    saving: 'సేవ్ అవుతోంది...',
    saved: 'సేవ్ అయింది',
    authenticate: 'ఇంటర్నెట్ ఐడెంటిటీతో ప్రమాణీకరించండి',
    welcomeTitle: 'FRIDAY',
    welcomeSubtitle: 'మీ అధునాతన AI వ్యక్తిగత సహాయకుడు',
    supportedLanguages: 'ఇంగ్లీష్ · తెలుగు · హిందీ',
    profileSetupTitle: 'FRIDAY కి స్వాగతం',
    profileSetupSubtitle: 'నేను FRIDAY, మీ వ్యక్తిగత AI సహాయకుడు. నేను మిమ్మల్ని ఏమని పిలవాలి?',
    profileNamePlaceholder: 'మీ పేరు నమోదు చేయండి',
    profileSave: 'ప్రారంభించండి',
  },
  hi: {
    inputPlaceholder: 'FRIDAY से कुछ भी पूछें... या कमांड के लिए / टाइप करें',
    send: 'भेजें',
    listening: 'सुन रहा हूं...',
    voiceOutput: 'वॉयस आउटपुट',
    language: 'भाषा',
    settings: 'सेटिंग्स',
    clearHistory: 'इतिहास साफ़ करें',
    clearHistoryConfirm: 'क्या आप वाकई सभी बातचीत का इतिहास साफ़ करना चाहते हैं?',
    displayName: 'प्रदर्शन नाम',
    displayNamePlaceholder: 'अपना नाम दर्ज करें',
    about: 'FRIDAY के बारे में',
    version: 'संस्करण',
    capabilities: 'क्षमताएं',
    logout: 'लॉग आउट',
    yourPrincipal: 'आपका प्रिंसिपल',
    voiceSpeed: 'वॉयस स्पीड',
    voicePitch: 'वॉयस पिच',
    wakeGreeting: 'नमस्ते! मैं FRIDAY हूं, आपका व्यक्तिगत AI सहायक। मैं आपकी कैसे मदद कर सकता हूं?',
    micDenied: 'माइक्रोफ़ोन एक्सेस अस्वीकृत। कृपया माइक्रोफ़ोन अनुमतियां दें।',
    historyLoading: 'बातचीत का इतिहास लोड हो रहा है...',
    noHistory: 'कोई पिछली बातचीत नहीं। चैटिंग शुरू करें!',
    commandPalette: 'कमांड पैलेट',
    searchWeb: 'वेब खोजें',
    writeEmail: 'ईमेल लिखें',
    writeCode: 'कोड लिखें',
    systemInfo: 'सिस्टम जानकारी',
    translate: 'अनुवाद करें',
    setReminder: 'रिमाइंडर सेट करें',
    tellJoke: 'चुटकुला सुनाएं',
    weather: 'मौसम',
    saving: 'सहेज रहा है...',
    saved: 'सहेजा गया',
    authenticate: 'इंटरनेट आइडेंटिटी से प्रमाणित करें',
    welcomeTitle: 'FRIDAY',
    welcomeSubtitle: 'आपका उन्नत AI व्यक्तिगत सहायक',
    supportedLanguages: 'अंग्रेज़ी · तेलुगु · हिंदी',
    profileSetupTitle: 'FRIDAY में आपका स्वागत है',
    profileSetupSubtitle: 'मैं FRIDAY हूं, आपका व्यक्तिगत AI सहायक। मुझे आपको क्या कहना चाहिए?',
    profileNamePlaceholder: 'अपना नाम दर्ज करें',
    profileSave: 'शुरू करें',
  }
};

# Specification

## Summary
**Goal:** Build FRIDAY, a JARVIS-inspired AI personal assistant web app on the Internet Computer with a futuristic dark UI, voice interaction, simulated AI responses, and persistent user data via a Motoko backend.

**Planned changes:**

### Frontend
- Dark/charcoal theme with amber/gold accents, futuristic HUD aesthetic, responsive two-panel layout (sidebar + main chat area)
- Animated pulsing orb: dimmed when idle, glowing/animated when active; circular audio visualizer while FRIDAY speaks
- Full chat interface: right-aligned user messages, left-aligned FRIDAY responses with avatar, typing/thinking animation, auto-scroll
- Text input with Send button (Enter key support), microphone button for voice input toggle
- Web Speech API integration: SpeechRecognition for voice-to-text, SpeechSynthesis for text-to-speech with visual waveform indicator; voice output toggle
- Wake word detection via text matching ("Hey Friday") — activates FRIDAY from idle state with greeting
- Multilingual support (English, Telugu, Hindi): UI labels, input placeholders, and SpeechSynthesis voice update per selection; persisted in localStorage; language badge shown
- Client-side command parser with keyword/pattern matching mapping input to 6+ intent categories (System Control, File Management, Web Search, Communication, Content Creation, General Conversation); intent badge shown on each FRIDAY response card
- Structured response templates per intent: code blocks with syntax highlighting, email draft cards, simulated system/web search feedback
- Settings sidebar (gear icon): language selector, voice output toggle, speed/pitch sliders, display name input, conversation history viewer with Clear History button, About FRIDAY section
- Quick-action command palette: opens on "/" prefix or toolbar button, 8+ shortcut tiles (Search Web, Write Email, Write Code, System Info, Translate, Set Reminder, Tell a Joke, Weather), clicking pre-fills input; dismissed via Escape or outside click
- FRIDAY branded login screen with logo and "Authenticate with Internet Identity" button; chat inaccessible until authenticated
- Display user principal ID in settings sidebar; logout button to end session

### Backend (Motoko)
- Single actor (`backend/main.mo`) with stable storage (HashMap/Trie keyed by caller principal)
- `saveMessage(role, content, timestamp)` — stores a message for the caller
- `getHistory(limit)` — returns last N messages for the caller
- `savePreferences(prefs)` — persists language, voice settings, display name
- `getPreferences()` — retrieves stored preferences
- `clearHistory()` — removes all messages for the caller
- State survives canister upgrades via stable variables

### Auth Integration
- Internet Identity authentication gates access to the chat
- On login, fetch last 50 messages from backend and render with timestamps
- Every new message (user + FRIDAY) saved to backend in real time via update calls
- All backend functions are principal-scoped

**User-visible outcome:** Users authenticate with Internet Identity, land on the FRIDAY chat interface, interact via text or voice (English/Telugu/Hindi), receive simulated structured AI responses with intent badges, manage settings and conversation history via a sidebar, and use a command palette for quick actions — all with a sleek JARVIS-style dark gold UI.

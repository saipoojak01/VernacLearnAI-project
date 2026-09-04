# VernacLearn AI

VernacLearn AI is a mother-tongue primary education platform designed to make classroom learning more accessible through regional-language support, AI-assisted lesson adaptation, and offline-friendly learning tools.

## What the project does

The platform brings together teacher and school workflows with multilingual learning support. It can translate learner input, adapt lesson topics into locally relatable explanations and activities, and provide language-aware learning content for primary students.

### Key features

- **Multilingual learning support** for Santhali, Gondi, Bhojpuri, Maithili, Odia, and Marathi.
- **AI-assisted translation** with native-script output, transliteration, child-friendly explanations, and vocabulary support.
- **Pedagogical adaptation** that turns teacher-provided topics into locally relatable, village-context learning material.
- **Lesson-note conversion** to help bridge classroom notes and mother-tongue learning.
- **Role-based dashboards** for different school users, including staff and administration workflows.
- **Offline-first learning support** with local client-side storage and an offline mode for low-resource environments.
- **Voice support** using the browser Web Speech API, including script-aware handling for vernacular text.
- **Interactive UI** with responsive components, animations, learning cards, progress views, assessments, and classroom-oriented workflows.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Building the user interface and interactive learning screens |
| **TypeScript** | Typed application development |
| **Tailwind CSS** | Utility-first styling and responsive UI |
| **Node.js + Express** | Server runtime and API layer |
| **Google Gemini** | Translation, contextualization, explanations, and content generation |
| **Vite** | Frontend development and production build tooling |
| **IndexedDB / LocalStorage** | Client-side storage for local and offline data |
| **Web Speech API** | Voice input and text-to-speech support |

## Project Structure

```text
.
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/            # Learning and application data
│   ├── layouts/         # Application layouts
│   ├── pages/            # Main application pages/screens
│   └── utils/            # Translation, speech and supporting utilities
├── server.ts            # Express server and Gemini API routes
├── index.html           # Application entry HTML
├── vite.config.ts       # Vite configuration
├── package.json         # Dependencies and scripts
└── .env.example         # Environment variable template
```

## Getting Started

### Prerequisites

- Node.js installed on your system
- A Gemini API key for the AI-powered features

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the Gemini API key

Create a `.env` file in the project root and add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Keep the API key private and do not commit it to Git.

### 3. Run the project locally

```bash
npm run dev
```

The development server runs on the local machine and serves the application through the Express server.

## Production Build

Create a production build with:

```bash
npm run build
```

Then start the production server with:

```bash
npm start
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the Vite frontend and bundles the Express server |
| `npm start` | Starts the production server |
| `npm run preview` | Previews the Vite production build |
| `npm run lint` | Runs the TypeScript type check |

## AI Integration

Google Gemini is used through the server-side API layer. The application sends requests to backend routes for translation, pedagogical adaptation, and lesson-note processing, keeping the API key on the server rather than exposing it in the frontend.

## Offline-First Approach

VernacLearn AI includes client-side storage and an offline mode intended for learning environments where internet connectivity may be limited. Local data can support classroom workflows even when a live AI connection is unavailable.

## Project Goal

The goal of VernacLearn AI is to reduce language barriers in primary education by connecting curriculum concepts with the languages, vocabulary, and everyday contexts that students already understand.

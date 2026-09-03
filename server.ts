import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '30mb' }));

  // Lazy Gemini client initialization
  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  }

  // API routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  // Dynamic Translation API: Translates ANY English (or source) input into the target mother tongue
  app.post('/api/translate', async (req, res) => {
    try {
      const { text, targetLanguage, sourceLanguage = 'en' } = req.body;
      if (!text || typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: 'Text input is required' });
      }

      const ai = getAI();
      if (!ai) {
        return res.status(503).json({ error: 'GEMINI_API_KEY is not configured' });
      }

      const isToEnglish = targetLanguage === 'en' || targetLanguage === 'english';
      const prompt = isToEnglish
        ? `You are an expert bilingual linguist and primary school teacher specializing in Indian regional and tribal languages (Santhali in Ol Chiki script ᱚᱞ ᱪᱤᱠᱤ, Gondi in Devanagari, Bhojpuri, Maithili, Odia, Marathi).
The primary student has entered text in their native mother tongue (${sourceLanguage}):
"${text.trim()}"

Translate this native mother tongue text into clear, natural, and student-friendly English.

Required JSON fields:
- "script": The accurate, grammatically correct English translation of the mother tongue text.
- "transliteration": Original phonetic reading/transliteration of the student's mother tongue text in Latin characters.
- "childFriendly": A simple, friendly English explanation of what this sentence means, suitable for a Grade 1-5 student.
- "pedagogicNote": 1-2 sentence note explaining the meaning of the mother tongue words and cultural context in English.
- "vocabularyTerms": Array of 2 to 5 specific vocabulary words from the mother tongue input with:
  - "term": the word in the student's native script (with Latin pronunciation in parentheses)
  - "meaning": English translation of this word
  - "pronunciation": phonetic pronunciation guide

Return strictly a single JSON object.`
        : `You are an expert bilingual linguist and primary school teacher specializing in Indian regional and tribal languages:
- Santhali (Santali): MUST be written in genuine Ol Chiki script (ᱚᱞ ᱪᱤᱠᱤ, Unicode U+1C50 to U+1C7F) with Latin transliteration.
- Gondi: written in Devanagari script with Latin transliteration.
- Bhojpuri: written in authentic Bhojpuri in Devanagari script with Latin transliteration.
- Maithili: written in authentic Maithili in Devanagari script with Latin transliteration.
- Odia: written in Odia script (ଓଡ଼ିଆ) with Latin transliteration.
- Marathi: written in Marathi in Devanagari script with Latin transliteration.

Translate this user's input text from ${sourceLanguage} into ${targetLanguage}:
"${text.trim()}"

CRITICAL INSTRUCTION:
You MUST translate the EXACT text provided by the user above. Do NOT output generic demo text or unrequested botany/photosynthesis sentences unless the user explicitly asked for that.

Required JSON fields:
- "script": The accurate, grammatically correct translation of the input text in the specified native script.
- "transliteration": Phonetic Latin transcription of the translated sentence for non-native teachers to pronounce correctly.
- "childFriendly": A warm, simplified rephrasing or explanation of this specific sentence in the target language (in native script) suitable for grade 1-5 students using familiar rural village metaphors.
- "pedagogicNote": 1-2 sentence instructional note in English explaining key vernacular nuances or root meanings for this sentence.
- "vocabularyTerms": Array of 2 to 5 specific vocabulary words extracted directly from this input text with:
  - "term": word in target language script (with Latin pronunciation in parentheses)
  - "meaning": English meaning
  - "pronunciation": phonetic reading

Return strictly a single JSON object.`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
      } catch (e1) {
        console.warn('Fallback to gemini-flash-latest for translate:', e1);
        response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
      }

      const jsonStr = response.text || '{}';
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed.childFriendly !== 'string') {
        parsed.childFriendly = typeof parsed.childFriendly === 'boolean' ? (parsed.script || text.trim()) : String(parsed.childFriendly || parsed.script || '');
      }
      return res.json(parsed);
    } catch (err: any) {
      console.error('Translation API error:', err);
      return res.status(500).json({ error: err.message || 'Failed to translate' });
    }
  });

  // Dynamic Pedagogic Adaptation API: Adapts any teacher topic into localized village metaphors
  app.post('/api/adapt', async (req, res) => {
    try {
      const {
        topic,
        level = 'Grade 3-5 (Primary)',
        style = 'Village Story-telling & Metaphor',
        context = 'Rural Agricultural Village',
        format = 'Classroom Activity & Discussion',
        targetLanguage = 'santhali',
      } = req.body;

      if (!topic || typeof topic !== 'string' || !topic.trim()) {
        return res.status(400).json({ error: 'Topic input is required' });
      }

      const ai = getAI();
      if (!ai) {
        return res.status(503).json({ error: 'GEMINI_API_KEY is not configured' });
      }

      const prompt = `You are a curriculum contextualizer for Indian primary schools under NEP 2020 FLN guidelines.
Adapt the following lesson topic for classroom teaching:
Topic: "${topic.trim()}"
Grade Level: ${level}
Pedagogic Style: ${style}
Local Context: ${context}
Format: ${format}
Target Mother Tongue: ${targetLanguage} (if Santhali, write in Ol Chiki script; if Odia, in Odia script; if Gondi, Bhojpuri, Maithili, Marathi, in Devanagari).

CRITICAL INSTRUCTION:
You MUST create an adaptation specifically for the user's provided topic "${topic.trim()}". Do NOT default to unrelated topics.

Required JSON fields:
- "title": An engaging lesson title with target language script and English translation.
- "contentMt": The core lesson explanation in the target language's native script. It must explain this EXACT topic "${topic.trim()}" using concrete, relatable metaphors from the "${context}" setting.
- "contentEn": Clear English teacher guide explaining the concept and how to bridge mother-tongue vocabulary with formal curriculum terms.
- "activityPrompt": A practical, low-cost activity or exploration task for students exploring "${topic.trim()}" in their village/school environment.

Return strictly a single JSON object.`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
      } catch (e2) {
        console.warn('Fallback to gemini-flash-latest for adapt:', e2);
        response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
      }

      const jsonStr = response.text || '{}';
      const parsed = JSON.parse(jsonStr);
      return res.json(parsed);
    } catch (err: any) {
      console.error('Adaptation API error:', err);
      return res.status(500).json({ error: err.message || 'Failed to adapt lesson' });
    }
  });

  // Convert English Lesson Notes (PDF or Text) into Student's Mother Tongue
  app.post('/api/convert-lesson-notes', async (req, res) => {
    try {
      const {
        pdfBase64,
        text,
        fileName = 'Lesson_Notes.pdf',
        targetLanguage = 'santhali',
        sourceLanguage = 'en',
        gradeLevel = 'Class 3',
        context = 'Village / Rural School',
      } = req.body;

      if (!pdfBase64 && (!text || !text.trim())) {
        return res.status(400).json({ error: 'Please upload an English PDF or provide lesson notes text' });
      }

      const ai = getAI();
      if (!ai) {
        return res.status(503).json({ error: 'GEMINI_API_KEY is not configured' });
      }

      const prompt = `You are a bilingual primary school education specialist under India's NEP 2020 Mother Tongue / FLN (Foundational Literacy and Numeracy) guidelines.
The attached document contains teacher lesson notes written in English.
Your goal is to extract the concepts and translate & adapt the ENTIRE lesson note into the primary students' mother tongue: ${targetLanguage}.

TARGET MOTHER TONGUE SPECIFICATIONS:
- santhali (Santali): MUST be written in genuine Ol Chiki script (ᱚᱞ ᱪᱤᱠᱤ, Unicode U+1C50 to U+1C7F) with accurate Latin phonetic transliteration.
- gondi: written in Devanagari script with Latin transliteration.
- bhojpuri: written in authentic Bhojpuri in Devanagari script with Latin transliteration.
- maithili: written in authentic Maithili in Devanagari script with Latin transliteration.
- odia: written in authentic Odia script (ଓଡ଼ᱤଆ) with Latin transliteration.
- marathi: written in authentic Marathi in Devanagari script with Latin transliteration.

PEDAGOGICAL INSTRUCTIONS:
1. Target Audience: Primary school students (${gradeLevel}) studying in ${context} settings.
2. Read the full lesson notes thoroughly. Extract the subject matter, key learning outcomes, explanations, examples, and terminology.
3. Translate the concepts into natural, child-friendly mother tongue using familiar rural village metaphors (e.g., trees, village pond, farming, domestic animals, seasonal changes, local clay/pots) rather than foreign urban concepts.
4. Provide structured sections corresponding to the topics covered in the notes.
5. Provide bilingual key vocabulary so non-native teachers can read and pronounce the words with children.

Return strictly a single JSON object with this exact structure:
{
  "title": {
    "english": "Extracted or clean English Title",
    "motherTongue": "Lesson Title in Native Mother Tongue Script",
    "transliteration": "Phonetic pronunciation guide in Latin letters"
  },
  "extractedEnglishText": "Clean extracted English summary of the lesson notes (approx 2-4 paragraphs)",
  "overviewMt": "Engaging introduction to the lesson in the student's mother tongue script",
  "overviewEn": "Teacher English overview of what the lesson covers",
  "transliterationOverview": "Latin phonetic pronunciation of overviewMt",
  "sections": [
    {
      "headingEn": "English section heading",
      "headingMt": "Mother tongue heading in native script",
      "contentMt": "Comprehensive lesson explanation in mother tongue script (child-friendly)",
      "contentEn": "Corresponding English explanation",
      "transliteration": "Phonetic Latin guide for pronouncing contentMt",
      "childExplanation": "Simple 1-2 sentence real-world village metaphor for young learners"
    }
  ],
  "keyVocabulary": [
    {
      "englishTerm": "Term in English",
      "motherTongueTerm": "Term in Native Mother Tongue Script",
      "transliteration": "Pronunciation in Latin",
      "meaning": "Simple child-friendly meaning",
      "villageExample": "Real-world connection in village life"
    }
  ],
  "classroomActivities": [
    "Practical mother-tongue activity 1 for teacher and students",
    "Practical mother-tongue activity 2"
  ],
  "pedagogicBridgingTip": "Key tip for bridging student mother-tongue intuition to state/national curriculum vocabulary"
}

Return strictly valid JSON only.`;

      let contents: any;
      if (pdfBase64 && typeof pdfBase64 === 'string') {
        const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '').trim();
        contents = [
          {
            inlineData: {
              mimeType: 'application/pdf',
              data: cleanBase64,
            },
          },
          { text: prompt },
        ];
      } else {
        contents = `${prompt}\n\nUploaded English Lesson Notes Content:\n"""\n${(text || '').trim()}\n"""`;
      }

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            responseMimeType: 'application/json',
          },
        });
      } catch (e1) {
        console.warn('Fallback to gemini-flash-latest for lesson notes conversion:', e1);
        response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents,
          config: {
            responseMimeType: 'application/json',
          },
        });
      }

      const jsonStr = response.text || '{}';
      const parsed = JSON.parse(jsonStr);
      parsed.fileName = fileName;
      parsed.targetLanguage = targetLanguage;
      return res.json(parsed);
    } catch (err: any) {
      console.error('Convert lesson notes API error:', err);
      return res.status(500).json({ error: err.message || 'Failed to convert lesson notes' });
    }
  });

  // Production vs Development serving
  const currentDir = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
  const cwdDist = path.join(process.cwd(), 'dist');
  const localDist = path.join(currentDir, 'index.html');
  const distPath = fs.existsSync(path.join(cwdDist, 'index.html'))
    ? cwdDist
    : fs.existsSync(localDist)
    ? currentDir
    : cwdDist;
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));
  const isProduction = process.env.NODE_ENV === 'production' || hasDist;

  if (isProduction) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Not Found');
      }
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server internal error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

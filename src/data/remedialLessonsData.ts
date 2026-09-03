import { LanguageCode } from '../types';

export interface RemedialLessonConfig {
  id: string;
  lessonKey: string;
  titleEn: string;
  badge: string;
  iconName: 'Flame' | 'Droplets' | 'Sparkles' | 'Filter' | 'PieChart' | 'Flower2';
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
  gameType:
    | 'kitchen_fire'
    | 'thirsty_roots'
    | 'living_growth'
    | 'clay_filter'
    | 'equal_shares'
    | 'butterfly_pollinator';
  languages: Record<
    LanguageCode,
    {
      storyTitle: string;
      storyTitleMt: string;
      simplerExplanationMt: string;
      simplerExplanationEn: string;
      metaphorTitle: string;
      metaphorDescriptionMt: string;
      gamePromptMt: string;
      gameTargetTerm: string;
      gameSourceTerm: string;
      practiceQuestion: {
        id: string;
        questionTextMt: string;
        questionTextEn: string;
        options: Array<{
          id: string;
          textMt: string;
          textEn: string;
          isCorrect: boolean;
        }>;
        explanationMt: string;
      };
    }
  >;
}

export const REMEDIAL_LESSONS_MAP: Record<string, RemedialLessonConfig> = {
  plants_needs: {
    id: 'plants_needs',
    lessonKey: 'l1',
    titleEn: 'Plants & Their Living Needs',
    badge: 'Kitchen Fire Story',
    iconName: 'Flame',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-900',
      accent: 'bg-amber-500',
    },
    gameType: 'kitchen_fire',
    languages: {
      santhali: {
        storyTitle: 'Kitchen Fire Story (The Secret Leaf Kitchen)',
        storyTitleMt: 'ᱥᱟᱠᱟᱢ ᱨᱮᱱᱟᱜ ᱪᱩᱞᱦᱟᱹ (The Secret Leaf Kitchen)',
        simplerExplanationMt:
          'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱫᱚ ᱢᱤᱫᱴᱟᱝ ᱪᱩᱞᱦᱟᱹ ᱞᱮᱠᱟ ᱠᱟᱱᱟ᱾ ᱥᱤᱛᱩᱝ ᱨᱮᱱᱟᱜ ᱫᱟᱲᱮ ᱛᱮ ᱥᱟᱠᱟᱢ ᱫᱟᱨᱮ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
        simplerExplanationEn:
          'Imagine a plant in your garden. The leaf is the plant cooking room. Sunlight is the fuel energy that cooks sweet nutrition for the roots and stems.',
        metaphorTitle: 'ᱟᱭᱳᱣᱟᱜ ᱪᱩᱞᱦᱟᱹ ᱵᱤᱨᱩᱫᱷ ᱨᱮ ᱫᱟᱨᱮ ᱥᱟᱠᱟᱢ (Kitchen Hearth Metaphor)',
        metaphorDescriptionMt:
          'ᱡᱮᱞᱮᱠᱟ ᱟᱭᱳ ᱪᱩᱞᱦᱟᱹ ᱨᱮ ᱥᱮᱸᱜᱮᱞ ᱡᱩᱞ ᱠᱟᱛᱮ ᱫᱟᱠᱟ ᱤᱥᱤᱱᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱥᱤᱛᱩᱝ ᱫᱟᱲᱮ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
        gamePromptMt: 'ᱥᱤᱛᱩᱝ ᱢᱟᱨᱥᱟᱞ ᱮᱢ ᱢᱮ ᱟᱨ ᱥᱟᱠᱟᱢ ᱪᱩᱞᱦᱟᱹ ᱨᱮ ᱡᱚᱢᱟᱜ ᱤᱥᱤᱱ ᱧᱮᱞ ᱢᱮ',
        gameSourceTerm: 'ᱥᱤᱛᱩᱝ (Sunlight)',
        gameTargetTerm: 'ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ (Green Leaf)',
        practiceQuestion: {
          id: 'rem_q_plant1',
          questionTextMt: 'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱥᱤᱛᱩᱝ ᱵᱮᱵᱷᱟᱨ ᱠᱟᱛᱮ ᱪᱮᱫ ᱮ ᱛᱮᱭᱟᱨᱟ?',
          questionTextEn: 'What does the green leaf create using bright sunlight?',
          options: [
            {
              id: 'A',
              textMt: 'ᱫᱟᱨᱮ ᱞᱟᱹᱜᱤᱫ ᱦᱮᱲᱮᱢ ᱡᱚᱢᱟᱜ',
              textEn: 'Sweet food & energy for the tree',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ᱥᱩᱢᱩᱝ ᱩᱢᱩᱞ ᱟᱨ ᱡᱟᱹᱯᱤᱫ',
              textEn: 'Only shade and sleep',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ᱫᱷᱤᱨᱤ ᱟᱨ ᱦᱟᱥᱟ',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ: ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱫᱚ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱪᱩᱞᱦᱟᱹ ᱠᱟᱱᱟ! ᱥᱤᱛᱩᱝ ᱫᱟᱲᱮ ᱛᱮ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
        },
      },
      gondi: {
        storyTitle: 'Kitchen Fire Story (मरांग ता आक रांदना)',
        storyTitleMt: 'मरांग ता आक रांदना (The Leaf Kitchen)',
        simplerExplanationMt:
          'मरांग ता हड़िया आक एक रांदना (चूल्हा) लेकन आंद। पोद्दु नोर ते आक मरांग काजे तींदल वंडतूर।',
        simplerExplanationEn:
          'The leaf is the plant kitchen stove. Sunlight provides the cooking heat to prepare tree nutrition.',
        metaphorTitle: 'आय्या ता चूल्हा अनि मरांग ता आक',
        metaphorDescriptionMt:
          'जेलेक आय्या चूल्हा ते किस्क लावी की गाटा वंडता, अन्नेच हड़िया आक पोद्दु नोर ते तींदल तय्यार कींतूर!',
        gamePromptMt: 'पोद्दु नोर सीम अनि आक ते तींदल बनते तो चुटपुट चुटकी चूल वंडुट',
        gameSourceTerm: 'पोद्दु (Sunlight)',
        gameTargetTerm: 'हड़िया आक (Green Leaf)',
        practiceQuestion: {
          id: 'rem_q_plant1',
          questionTextMt: 'मरांग ता हड़िया आक पोद्दु नोर खींची की बत तय्यार कींतूर?',
          questionTextEn: 'What does the green leaf create using bright sunlight?',
          options: [
            {
              id: 'A',
              textMt: 'मरांग काजे मीठ गाटा (तींदल)',
              textEn: 'Sweet food & energy for the tree',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'फक्त छांव अनि सुतुक',
              textEn: 'Only shade and sleep',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'गिट्टी अनि माटी',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सच्चो उत्तर: हड़िया आक मरांग ता रांदना आंद! पोद्दु नोर ते आक तींदल वंडतूर।',
        },
      },
      bhojpuri: {
        storyTitle: 'Kitchen Fire Story (रसोई आ चूल्हा कथा)',
        storyTitleMt: 'पेड़ के रसोई आ चूल्हा (Leaf Kitchen Story)',
        simplerExplanationMt:
          'पेड़ के हरियर पतई एगो रसोई (चूल्हा) जइसन हवे। घाम के धूप से पतई पेड़ खातिर भोजन पकावेला।',
        simplerExplanationEn:
          'The green leaf is like a home kitchen stove. Sunshine provides the heat to cook sweet sap for the whole tree.',
        metaphorTitle: 'माई के चूल्हा अउरी पेड़ के पतई',
        metaphorDescriptionMt:
          'जइसे माई चूल्हा पर आगी जला के खाना पकावेली, ओइसहीं हरियर पतई घाम के धूप से पेड़ खातिर भोजन बनावेला!',
        gamePromptMt: 'सुरुज के घाम दीं आ पतई के चूल्हा में भोजन बनते देखीं',
        gameSourceTerm: 'सुरुज / घाम (Sunlight)',
        gameTargetTerm: 'हरियर पतई (Green Leaf)',
        practiceQuestion: {
          id: 'rem_q_plant1',
          questionTextMt: 'पेड़ के हरियर पतई घाम के धूप से का बनावेला?',
          questionTextEn: 'What does the green leaf create using bright sunlight?',
          options: [
            {
              id: 'A',
              textMt: 'पेड़ खातिर मीठ भोजन',
              textEn: 'Sweet food & energy for the tree',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'खाली छँइहा आ नींद',
              textEn: 'Only shade and sleep',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ढोंका अउरी माटी',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: हरियर पतई पेड़ के रसोई हवे! घाम के धूप से पतई पेड़ खातिर भोजन पकावेला।',
        },
      },
      maithili: {
        storyTitle: 'Kitchen Fire Story (मायक चुलहा आ पात)',
        storyTitleMt: 'पात केर भानस घर (The Leaf Kitchen)',
        simplerExplanationMt:
          'गाछक हरियर पात एकटा भानस घर (चुलहा) जकाँ अछि। रौदक शक्ति सं पात गाछक लेल भोजन बनबैत अछि।',
        simplerExplanationEn:
          'The green leaf acts as the cooking hearth. Sunlight delivers the thermal energy to synthesize food.',
        metaphorTitle: 'मायक चुलहा आ गाछक पात',
        metaphorDescriptionMt:
          'जहिना माय चुलहा पर आगि प्रज्वलित कऽ भोजन पकाबैत छथि, तहिना हरियर पात रौदक शक्ति सं गाछ लेल भोजन बनबैत अछि!',
        gamePromptMt: 'रौदक प्रकाश दिअ आ पात केर चुलहा मे भोजन बनैत देखू',
        gameSourceTerm: 'रौद / सूर्य (Sunlight)',
        gameTargetTerm: 'हरियर पात (Green Leaf)',
        practiceQuestion: {
          id: 'rem_q_plant1',
          questionTextMt: 'गाछक हरियर पात रौदक शक्ति सं की बनबैत अछि?',
          questionTextEn: 'What does the green leaf create using bright sunlight?',
          options: [
            {
              id: 'A',
              textMt: 'गाछ लेल मीठ भोजन',
              textEn: 'Sweet food & energy for the tree',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'मात्र छहारी आ निन्न',
              textEn: 'Only shade and sleep',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'पाथर आ माटि',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: हरियर पात गाछक भानस घर थीक! रौद सं पात गाछक लेल भोजन बनबैत अछि।',
        },
      },
      odia: {
        storyTitle: 'Kitchen Fire Story (ଚୁଲି ଓ ସବୁଜ ପତ୍ର କଥା)',
        storyTitleMt: 'ସବୁଜ ପତ୍ରର ଚୁଲି (The Leaf Kitchen)',
        simplerExplanationMt:
          'ଗଛର ସବୁଜ ପତ୍ର ଏକ ରୋଷେଇଶାଳା (ଚୁଲି) ପରି ଅଟେ। ଖରାର ଶକ୍ତିରେ ପତ୍ର ଗଛ ପାଇଁ ମିଠା ଖାଦ୍ୟ ତିଆରି କରେ।',
        simplerExplanationEn:
          'The leaf is the plant cooking hearth. Golden sunshine delivers the energy to prepare food.',
        metaphorTitle: 'ବୋଉର ଚୁଲି ଓ ଗଛର ପତ୍ର',
        metaphorDescriptionMt:
          'ଯେପରି ବୋଉ ଚୁଲିରେ ନିଆଁ ଲଗାଇ ରୋଷେଇ କରେ, ସେହିପରି ସବୁଜ ପତ୍ର ଖରାର ଶକ୍ତିରେ ଗଛ ପାଇଁ ଖାଦ୍ୟ ରାନ୍ଧେ!',
        gamePromptMt: 'ସୂର୍ଯ୍ୟଙ୍କ ଖରା ଦିଅନ୍ତୁ ଏବଂ ପତ୍ର ଚୁଲିରେ ଖାଦ୍ୟ ତିଆରି ଦେଖନ୍ତୁ',
        gameSourceTerm: 'ସୂର୍ଯ୍ୟ କିରଣ (Sunlight)',
        gameTargetTerm: 'ସବୁଜ ପତ୍ର (Green Leaf)',
        practiceQuestion: {
          id: 'rem_q_plant1',
          questionTextMt: 'ଗଛର ସବୁଜ ପତ୍ର ଖରାର ଶକ୍ତି ବ୍ୟବହାର କରି କ’ଣ ତିଆରି କରେ?',
          questionTextEn: 'What does the green leaf create using bright sunlight?',
          options: [
            {
              id: 'A',
              textMt: 'ଗଛ ପାଇଁ ମିଠା ଖାଦ୍ୟ',
              textEn: 'Sweet food & energy for the tree',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'କେବଳ ଛାଇ ଏବଂ ନିଦ',
              textEn: 'Only shade and sleep',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ପଥର ଏବଂ ମାଟି',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ସଠିକ୍ ଉତ୍ତର: ସବୁଜ ପତ୍ର ହେଉଛି ଗଛର ରୋଷେଇଶାଳା! ଖରାର ଶକ୍ତିରେ ପତ୍ର ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ କରେ।',
        },
      },
      marathi: {
        storyTitle: 'Kitchen Fire Story (आईची चूल आणि झाडाचे पान)',
        storyTitleMt: 'हिरव्या पानाची चूल (The Leaf Kitchen)',
        simplerExplanationMt:
          'झाडाचे हिरवे पान हे एका स्वयंपाकघरासारखे (चुलीसारखे) आहे. सूर्यप्रकाशाच्या ऊर्जेने पान झाडासाठी गोड अन्न तयार करते.',
        simplerExplanationEn:
          'The leaf is the plant kitchen hearth. Sunlight provides the cooking fuel to nourish stems and roots.',
        metaphorTitle: 'आईची चूल आणि झाडाचे पान',
        metaphorDescriptionMt:
          'जशी आई चुलीवर जाळ पेटवून जेवण शिजवते, तसेच हिरवे पान सूर्यप्रकाशाच्या ऊर्जेने झाडासाठी अन्न शिजवते!',
        gamePromptMt: 'सूर्यप्रकाश द्या आणि पाण्याच्या पानात अन्न तयार होताना पहा',
        gameSourceTerm: 'सूर्यप्रकाश (Sunlight)',
        gameTargetTerm: 'हिरवे पान (Green Leaf)',
        practiceQuestion: {
          id: 'rem_q_plant1',
          questionTextMt: 'झाडाचे हिरवे पान सूर्यप्रकाशाचा वापर करून काय तयार करते?',
          questionTextEn: 'What does the green leaf create using bright sunlight?',
          options: [
            {
              id: 'A',
              textMt: 'झाडासाठी गोड अन्न',
              textEn: 'Sweet food & energy for the tree',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'फक्त सावली आणि झोप',
              textEn: 'Only shade and sleep',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'दगड आणि माती',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
          ],
          explanationMt:
            'अचूक उत्तर: हिरवे पान हे झाडाचे स्वयंपाकघर आहे! सूर्यप्रकाशाच्या मदतीने पान अन्न शिजवते.',
        },
      },
    },
  },

  plant_roots: {
    id: 'plant_roots',
    lessonKey: 'plant_roots',
    titleEn: 'Parts of a Plant & Underground Roots',
    badge: 'Thirsty Bamboo Straw Story',
    iconName: 'Droplets',
    themeColor: {
      bg: 'bg-sky-50',
      border: 'border-sky-300',
      text: 'text-sky-900',
      accent: 'bg-sky-500',
    },
    gameType: 'thirsty_roots',
    languages: {
      santhali: {
        storyTitle: 'Thirsty Bamboo Straw Story (The Root Pipes)',
        storyTitleMt: 'ᱫᱟᱜ ᱧᱩ ᱨᱮᱦᱮᱫ ᱪᱚᱸᱜᱟ (Roots as Thirsty Straws)',
        simplerExplanationMt:
          'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱦᱩᱰᱤᱧ ᱪᱚᱸᱜᱟ (ᱱᱚᱞ) ᱞᱮᱠᱟ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱦᱟᱥᱟ ᱨᱮᱱᱟᱜ ᱫᱟᱜ ᱧᱩ ᱠᱟᱛᱮ ᱪᱮᱛᱟᱱ ᱰᱟᱹᱨ ᱟᱨ ᱵᱟᱦᱟ ᱨᱮ ᱨᱟᱠᱟᱵᱟ᱾',
        simplerExplanationEn:
          'Roots act like thirsty hollow bamboo straws spreading deep into the damp earth. They drink moisture and cool minerals to pump up into the stems and blooming flowers.',
        metaphorTitle: 'ᱦᱟᱥᱟ ᱴᱩᱠᱩᱡ ᱠᱷᱚᱱ ᱪᱚᱸᱜᱟ ᱛᱮ ᱫᱟᱜ ᱧᱩ (Bamboo Straw Metaphor)',
        metaphorDescriptionMt:
          'ᱡᱮᱞᱮᱠᱟ ᱜᱤᱫᱽᱨᱟᱹ ᱴᱩᱠᱩᱡ ᱠᱷᱚᱱ ᱦᱩᱰᱤᱧ ᱪᱚᱸᱜᱟ ᱛᱮ ᱨᱮᱭᱟᱲ ᱫᱟᱜ ᱮ ᱧᱩᱭᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱫᱟᱨᱮ ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱪᱩᱦᱩᱸ ᱠᱟᱛᱮ ᱪᱮᱛᱟᱱ ᱮ ᱯᱟᱨᱚᱢᱟ!',
        gamePromptMt: 'ᱫᱟᱜ ᱡᱟᱹᱲᱤ ᱮᱢ ᱢᱮ ᱟᱨ ᱨᱮᱦᱮᱫ ᱛᱮ ᱫᱟᱜ ᱧᱩ ᱠᱟᱛᱮ ᱵᱟᱦᱟ ᱯᱷᱩᱴᱟᱹᱣ ᱧᱮᱞ ᱢᱮ',
        gameSourceTerm: 'ᱫᱟᱜ ᱡᱟᱹᱲᱤ (Raindrop / Well)',
        gameTargetTerm: 'ᱯᱷᱩᱴᱟᱹᱣ ᱵᱟᱦᱟ (Blooming Flower)',
        practiceQuestion: {
          id: 'rem_q_roots',
          questionTextMt: 'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱠᱷᱚᱱ ᱪᱮᱫ ᱮ ᱧᱩᱭᱟ?',
          questionTextEn: 'What do plant roots drink from deep underground soil?',
          options: [
            {
              id: 'A',
              textMt: 'ᱫᱟᱜ ᱟᱨ ᱡᱤᱣᱤ ᱢᱤᱱᱟᱨᱟᱞ',
              textEn: 'Water and essential minerals',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ᱥᱩᱢᱩᱝ ᱨᱚᱦᱚᱲ ᱫᱷᱩᱲᱤ',
              textEn: 'Only dry dust',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ᱨᱚᱝ ᱟᱨ ᱠᱟᱜᱚᱡᱽ',
              textEn: 'Paint and paper',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ: ᱨᱮᱦᱮᱫ ᱫᱚ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱪᱚᱸᱜᱟ ᱠᱟᱱᱟ! ᱦᱟᱥᱟ ᱨᱮᱱᱟᱜ ᱫᱟᱜ ᱧᱩ ᱠᱟᱛᱮ ᱫᱟᱨᱮ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ ᱵᱟᱦᱟᱜ-ᱟ᱾',
        },
      },
      gondi: {
        storyTitle: 'Thirsty Bamboo Straw Story (मरांग ता रोड़ा अनि नली)',
        storyTitleMt: 'मरांग ता रोड़ा अनि बांबू नली',
        simplerExplanationMt:
          'मरांग ता रोड़ा (जड़) एक बांबू नली लेकन आंद। माटी ता लोपा येर खींची की पयकी आक अनि पूंगार काजे रोंगतूर।',
        simplerExplanationEn:
          'Roots are like long bamboo straws reaching into deep soil, drinking cool moisture to nourish thirsty leaves and flowers.',
        metaphorTitle: 'मटका ते नली लावी की येर उंदना',
        metaphorDescriptionMt:
          'जेलेक पिला मटका ते बांबू नली लावी की ठंडा येर उंदतूर, अन्नेच रोड़ा माटी ता येर खींची की मरांग तुन हरियर कींतूर!',
        gamePromptMt: 'येर सीम अनि रोड़ा ते येर खींची की पूंगार खिली की सूड़',
        gameSourceTerm: 'येर (Rainwater)',
        gameTargetTerm: 'पूंगार (Blossom)',
        practiceQuestion: {
          id: 'rem_q_roots',
          questionTextMt: 'मरांग ता रोड़ा माटी ता लोपा बत खींतूर?',
          questionTextEn: 'What do underground roots suck up from the soil?',
          options: [
            {
              id: 'A',
              textMt: 'येर अनि खनिज (Water & Minerals)',
              textEn: 'Water & Minerals',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'सुक्का धूरा (Dry Dust)',
              textEn: 'Only dry dust',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'गिट्टी अनि प्लास्टिक',
              textEn: 'Stones and plastic',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सच्चो उत्तर: रोड़ा मरांग ता बांबू नली आंद! येर खींची की मरांग ता पूंगार खिलीतूर।',
        },
      },
      bhojpuri: {
        storyTitle: 'Thirsty Bamboo Straw Story (नरकट आ जड़ के सोर)',
        storyTitleMt: 'प्यास बुझावे वाला सोर (Root Drinking Straw)',
        simplerExplanationMt:
          'पेड़ के जड़ एगो खोखिला नरकट (पाइप) जइसन हवे। माटी के भीतर से पानी चूस के ऊपर पतई आ फूल तक पहुँचावेला।',
        simplerExplanationEn:
          'Roots act like drinking straws spread beneath the garden. They drink water from the soil to pump up into thirsty flowers.',
        metaphorTitle: 'घइला में नली डाल के पानी पियल',
        metaphorDescriptionMt:
          'जइसे लइका घइला में खोखिला नरकट डाल के ठंडा पानी पिएला, ओइसहीं पेड़ के जड़ माटी के पानी चूस के पूरा पेड़ में भेज देवेला!',
        gamePromptMt: 'पानी बरसाईं आ जड़ से पानी खिंचवा के मुरझाइल फूल खिलाईं',
        gameSourceTerm: 'बरखा के पानी (Raindrops)',
        gameTargetTerm: 'खिलल फूल (Blooming Flower)',
        practiceQuestion: {
          id: 'rem_q_roots',
          questionTextMt: 'पेड़ के जड़ माटी के भीतर से का चूसेला?',
          questionTextEn: 'What do roots suck from beneath the soil?',
          options: [
            {
              id: 'A',
              textMt: 'पानी अउरी खनिज लवण',
              textEn: 'Water and essential minerals',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'खाली सूजी आ बालू',
              textEn: 'Dry sand only',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'लोहा आ काँच',
              textEn: 'Iron and glass',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: जड़ पेड़ के पाइप हवे! माटी के पानी चूस के पेड़ के हरा-भरा राखेला।',
        },
      },
      maithili: {
        storyTitle: 'Thirsty Bamboo Straw Story (प्यास बुझाबय बला जड़ि)',
        storyTitleMt: 'गाछक जड़ि आ बाँसक पोंगा (Root Straw Story)',
        simplerExplanationMt:
          'गाछक जड़ि एकटा बाँसक पोंगा (पाइप) जकाँ अछि। माटिक भीतर सं पानि चूषि कऽ उपर पात आ फूल धरि पहुँचाबैत अछि।',
        simplerExplanationEn:
          'Plant roots spread through moist earth like drinking tubes, taking up cool water and minerals to keep leaves and flowers fresh.',
        metaphorTitle: 'घैल सं पोंगा द्वारा पानि पीबय केर कथा',
        metaphorDescriptionMt:
          'जहिना बच्चा घैल सं बाँसक पोंगा द्वारा शीतल पानि पीबैत अछि, तहिना गाछक जड़ि माटिक पानि चूषि कऽ गाछ के जीवन दैत अछि!',
        gamePromptMt: 'पानि बरसाउ आ जड़ि सं पानि पम्प कऽ मुरझाएल फूल फुलाउ',
        gameSourceTerm: 'पानि (Rainwater)',
        gameTargetTerm: 'फुलाइल फूल (Blossoming Flower)',
        practiceQuestion: {
          id: 'rem_q_roots',
          questionTextMt: 'गाछक जड़ि माटि केर भीतर सं की पीबैत अछि?',
          questionTextEn: 'What do tree roots absorb from inside the soil?',
          options: [
            {
              id: 'A',
              textMt: 'शीतल पानि आ खनिज पोषक',
              textEn: 'Cool water and soil nutrients',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'मात्र सुखाएल धूलि',
              textEn: 'Dry dust only',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'प्लास्टिक केर कचरा',
              textEn: 'Plastic trash',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: जड़ि गाछक पोंगा थीक! पानि खींचि कऽ गाछ के ताजगी प्रदान करैत अछि।',
        },
      },
      odia: {
        storyTitle: 'Thirsty Bamboo Straw Story (ତୃଷାର୍ତ୍ତ ଚେର ଓ ନଳୀ କଥା)',
        storyTitleMt: 'ଗଛର ଚେର ଓ ପାଣି ପାଇପ୍ (Roots Water Straw)',
        simplerExplanationMt:
          'ଗଛର ଚେର ଏକ ନଳୀ (ଷ୍ଟ୍ର) ପରି ଅଟେ। ମାଟି ତଳୁ ପାଣି ଶୋଷି ଡାଳ ଓ ଫୁଲକୁ ପଠାଏ ଏବଂ ଗଛକୁ ମାଟିରେ ଦୃଢ଼ କରି ଧରି ରଖେ।',
        simplerExplanationEn:
          'Underground roots act like drinking straws. They absorb moisture from deep soil and pump it upward to feed tall stems and colorful petals.',
        metaphorTitle: 'ମାଠିଆରୁ ନଳୀ ଦେଇ ପାଣି ପିଇବା ରୂପକ',
        metaphorDescriptionMt:
          'ଯେପରି ପିଲାମାନେ ମାଠିଆରୁ ନଳୀ ସାହାଯ୍ୟରେ ଥଣ୍ଡା ପାଣି ପିଅନ୍ତି, ସେହିପରି ଚେର ମାଟି ତଳୁ ପାଣି ଶୋଷି ଶୁଖିଲା ଫୁଲକୁ ଫୁଟାଏ!',
        gamePromptMt: 'ବର୍ଷା ପାଣି ଦିଅନ୍ତୁ ଏବଂ ଚେର ଦ୍ୱାରା ପାଣି ଟାଣି ଫୁଲ ଫୁଟିବା ଦେଖନ୍ତୁ',
        gameSourceTerm: 'ବର୍ଷା ଜଳ (Raindrop)',
        gameTargetTerm: 'ଫୁଟିଲା ଫୁଲ (Blooming Sunflower)',
        practiceQuestion: {
          id: 'rem_q_roots',
          questionTextMt: 'ଗଛର ଚେର ମାଟି ତଳୁ କ’ଣ ଶୋଷି ନିଏ?',
          questionTextEn: 'What do plant roots drink from the soil?',
          options: [
            {
              id: 'A',
              textMt: 'ପାଣି ଓ ଖଣିଜ ଲବଣ',
              textEn: 'Water & minerals',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'କେବଳ ଶୁଖିଲା ଧୂଳି',
              textEn: 'Only dry dust',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ଭଙ୍ଗା କାଚ ଓ କଣ୍ଟା',
              textEn: 'Broken glass and thorns',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ସଠିକ୍ ଉତ୍ତର: ଚେର ହେଉଛି ଗଛର ପାଇପ୍! ମାଟିରୁ ପାଣି ଶୋଷି ଗଛକୁ ଜୀବନ୍ତ ରଖେ।',
        },
      },
      marathi: {
        storyTitle: 'Thirsty Bamboo Straw Story (तहानलेली मुळे आणि नळी)',
        storyTitleMt: 'झाडाची मुळे आणि स्ट्रॉ (Roots Straw Story)',
        simplerExplanationMt:
          'झाडाची मुळे ही बांबूच्या नळीसारखी (स्ट्रॉसारखी) असतात. मातीतील ओलावा शोषून खोड व फुलांपर्यंत पाणी पोहोचवतात.',
        simplerExplanationEn:
          'Roots act like underground drinking straws. They absorb water from damp soil and pump it upward to hydrate leaves and flowers.',
        metaphorTitle: 'मातीच्या माठातून नळीने पाणी पिणे',
        metaphorDescriptionMt:
          'जसे मूल माठातून नळीने थंडगार पाणी पिते, तसेच झाडाची मुळे मातीतील पाणी शोषून सुकून गेलेल्या फुलाला टवटवीत फुलवतात!',
        gamePromptMt: 'पावसाचे थेंब द्या आणि मुळांनी पाणी शोषून फूल फुलताना पहा',
        gameSourceTerm: 'पाणी (Water Droplet)',
        gameTargetTerm: 'टवटवीत फूल (Blossoming Flower)',
        practiceQuestion: {
          id: 'rem_q_roots',
          questionTextMt: 'झाडाची मुळे मातीतून काय शोषून घेतात?',
          questionTextEn: 'What do tree roots absorb from beneath the ground?',
          options: [
            {
              id: 'A',
              textMt: 'पाणी आणि पोषक खनिजे',
              textEn: 'Water and soil minerals',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'फक्त कोरडी धूळ',
              textEn: 'Only dry dust',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'दगड आणि खिळे',
              textEn: 'Stones and nails',
              isCorrect: false,
            },
          ],
          explanationMt:
            'अचूक उत्तर: मुळे ही झाडाची नळी आहेत! जमिनीतील पाणी शोषून झाडाला जीवन देतात.',
        },
      },
    },
  },

  living_things: {
    id: 'living_things',
    lessonKey: 'living_things',
    titleEn: 'Living vs Non-Living Things',
    badge: 'Sprouting Seed & River Pebble',
    iconName: 'Sparkles',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-900',
      accent: 'bg-emerald-600',
    },
    gameType: 'living_growth',
    languages: {
      santhali: {
        storyTitle: 'Sprouting Seed & River Pebble Story',
        storyTitleMt: 'ᱡᱤᱣᱤᱭᱟᱱ ᱡᱟᱝ ᱟᱨ ᱜᱟᱰᱟ ᱫᱷᱤᱨᱤ (Seed vs Pebble)',
        simplerExplanationMt:
          'ᱡᱤᱣᱤᱭᱟᱱ ᱡᱤᱱᱤᱥ (ᱡᱮᱞᱮᱠᱟ ᱫᱟᱨᱮ, ᱪᱮᱬᱮ, ᱦᱚᱲ) ᱥᱟᱦᱮᱫ ᱠᱚ ᱦᱟᱛᱟᱣᱟ, ᱫᱟᱜ ᱠᱚ ᱧᱩᱭᱟ ᱟᱨ ᱦᱟᱨᱟᱜ-ᱟ᱾ ᱵᱤᱱ-ᱡᱤᱣᱤᱭᱟᱱ (ᱫᱷᱤᱨᱤ, ᱦᱟᱥᱟ ᱴᱩᱠᱩᱡ) ᱫᱚ ᱛᱤᱥ ᱦᱚᱸ ᱵᱟᱝ ᱦᱟᱨᱟᱜ-ᱟ᱾',
        simplerExplanationEn:
          'Living things breathe air, drink water, grow bigger, and produce young ones. Non-living things (stones, clay pots, wooden plows) never breathe or grow.',
        metaphorTitle: 'ᱜᱟᱰᱟ ᱫᱷᱤᱨᱤ ᱟᱨ ᱦᱩᱲᱩ ᱡᱟᱝ ᱨᱮᱱᱟᱜ ᱠᱟᱛᱷᱟ',
        metaphorDescriptionMt:
          'ᱦᱟᱲᱟᱢ ᱵᱟᱵᱟ ᱢᱤᱫᱴᱟᱝ ᱜᱟᱰᱟ ᱫᱷᱤᱨᱤ ᱟᱨ ᱢᱤᱫᱴᱟᱝ ᱦᱩᱲᱩ ᱡᱟᱝ ᱦᱟᱥᱟ ᱨᱮ ᱫᱚᱦᱚ ᱠᱮᱫᱟ᱾ ᱫᱟᱜ ᱡᱟᱹᱲᱤ ᱛᱟᱭᱚᱢ ᱫᱷᱤᱨᱤ ᱫᱚ ᱚᱱᱠᱟ ᱜᱮ ᱛᱟᱦᱮᱸᱭᱮᱱᱟ, ᱢᱮᱱᱠᱷᱟᱱ ᱡᱤᱣᱤᱭᱟᱱ ᱡᱟᱝ ᱫᱚ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱰᱟᱹᱨ ᱦᱟᱨᱟ ᱠᱮᱫᱟ!',
        gamePromptMt: 'ᱫᱟᱜ ᱟᱨ ᱦᱚᱭ ᱮᱢ ᱢᱮ: ᱧᱮᱞ ᱢᱮ ᱡᱤᱣᱤᱭᱟᱱ ᱡᱟᱝ ᱦᱟᱨᱟᱜ-ᱟ ᱟᱨ ᱫᱷᱤᱨᱤ ᱛᱷᱤᱨ ᱛᱟᱦᱮᱸᱱᱟ',
        gameSourceTerm: 'ᱫᱟᱜ ᱟᱨ ᱦᱚᱭ (Water & Air)',
        gameTargetTerm: 'ᱡᱤᱣᱤᱭᱟᱱ ᱡᱟᱝ (Sprouting Seed)',
        practiceQuestion: {
          id: 'rem_q_living',
          questionTextMt: 'ᱱᱚᱣᱟ ᱠᱚ ᱢᱩᱫᱽ ᱨᱮ ᱚᱠᱟᱴᱟᱜ ᱫᱚ ᱡᱤᱣᱤᱭᱟᱱ ᱡᱤᱱᱤᱥ ᱠᱟᱱᱟ ᱡᱟᱦᱟᱸ ᱥᱟᱦᱮᱫ ᱦᱟᱛᱟᱣᱟ?',
          questionTextEn: 'Which of the following is a living thing that breathes and grows?',
          options: [
            {
              id: 'A',
              textMt: 'ᱦᱟᱨᱟᱜ ᱠᱟᱱ ᱪᱮᱬᱮ ᱟᱨ ᱫᱟᱨᱮ ᱡᱟᱝ',
              textEn: 'Growing baby bird and plant sprout',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ᱜᱟᱰᱟ ᱨᱮᱱᱟᱜ ᱪᱟᱴᱟᱱ ᱫᱷᱤᱨᱤ',
              textEn: 'Solid river pebble',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ᱦᱟᱥᱟ ᱨᱮᱱᱟᱜ ᱴᱩᱠᱩᱡ',
              textEn: 'Baked clay cooking pot',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ: ᱫᱟᱨᱮ ᱟᱨ ᱪᱮᱬᱮ ᱨᱮ ᱡᱤᱣᱤ ᱢᱮᱱᱟᱜ-ᱟ! ᱩᱱᱠᱩ ᱥᱟᱦᱮᱫ ᱠᱚ ᱦᱟᱛᱟᱣᱟ ᱟᱨ ᱦᱟᱨᱟᱜ-ᱟ᱾',
        },
      },
      gondi: {
        storyTitle: 'Sprouting Seed & River Pebble Story (जीवी मंता अनि धोंडा)',
        storyTitleMt: 'जीवी मंता आक-बीज अनि गिट्टी',
        simplerExplanationMt:
          'जीवी मंता तींदल तींतूर, येर उंदतूर अनि वाढ़तूर। गिट्टी अनि माटी ता मटका कदीम वाढ़ो अनि सांस नहियो कीतो!',
        simplerExplanationEn:
          'Living beings breathe, take nourishment, and grow tall. Non-living objects like river stones stay unchanged forever.',
        metaphorTitle: 'गिट्टी अनि चोली बीज ता बात',
        metaphorDescriptionMt:
          'दादी एक गिट्टी अनि एक बीज माटी ते वासी कीतूर। पिर्रा पावे गिट्टी अन्नेच मंता, पर बीज फूटकी की पयकी वाढ़तूर!',
        gamePromptMt: 'येर अनि हवा सीम अनि बीज वाढ़ते तो सूड़',
        gameSourceTerm: 'हवा अनि येर (Air & Water)',
        gameTargetTerm: 'जीवी बीज (Living Seed)',
        practiceQuestion: {
          id: 'rem_q_living',
          questionTextMt: 'इव ते बत जीवी मंता आंद जे सांस कींतूर?',
          questionTextEn: 'Which of these is a living thing that breathes?',
          options: [
            {
              id: 'A',
              textMt: 'हड़िया मरांग अनि चने (Plant & Chick)',
              textEn: 'Green plant & baby chick',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'नदी ता गिट्टी (River stone)',
              textEn: 'River stone',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'माटी ता घड़ा (Clay pot)',
              textEn: 'Clay pot',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सच्चो उत्तर: मरांग अनि जीव-जंतु सांस कींतूर अनि वाढ़तूर!',
        },
      },
      bhojpuri: {
        storyTitle: 'Sprouting Seed & River Pebble Story (सजीव बीया आ नदी के ढोंका)',
        storyTitleMt: 'सजीव बीया आ नदी के ढोंका (Seed vs Stone)',
        simplerExplanationMt:
          'सजीव चीज (पेड़, चिरई, लइका) सांस लेवेला, पानी पिएला आ बढ़ेला। निर्जीव (ढोंका, घइला, हल) कबो ना सांस लेवेला ना बढ़ेला।',
        simplerExplanationEn:
          'Living things breathe air, drink water, and grow. Non-living things like rocks and earthenware never grow or eat.',
        metaphorTitle: 'नदी के ढोंका अउरी चना के बीया',
        metaphorDescriptionMt:
          'बाबा माटी में एगो नदी के ढोंका आ एगो चना के बीया गाड़ दिहलें। बरखा भइला पर ढोंका ओइसहीं रहल, बाकिर बीया अंकुर फेंक के बढ़ गइल!',
        gamePromptMt: 'पानी आ हवा दीं: देखीं सजीव बीया अंकुर फेंक के बढ़ी आ ढोंका शांत रही',
        gameSourceTerm: 'पानी आ हवा (Water & Air)',
        gameTargetTerm: 'सजीव बीया (Sprouting Seed)',
        practiceQuestion: {
          id: 'rem_q_living',
          questionTextMt: 'एह में से कवन सजीव हवे जे सांस लेवेला आ बढ़ेला?',
          questionTextEn: 'Which of these is a living thing that breathes and grows?',
          options: [
            {
              id: 'A',
              textMt: 'चना के पौधा अउरी चिरई के बच्चा',
              textEn: 'Chickpea sprout and baby bird',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'नदी के गोल ढोंका',
              textEn: 'Round river pebble',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'माटी के दिया आ घइला',
              textEn: 'Earthen clay lamp',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: पौधा आ चिरई सजीव हवें! ई लोग सांस लेवेला आ बढ़ेला।',
        },
      },
      maithili: {
        storyTitle: 'Sprouting Seed & River Pebble Story (सजीव बीया आ पाथर)',
        storyTitleMt: 'सजीव बीया आ पाथरक कथा (Living Seed vs Stone)',
        simplerExplanationMt:
          'सजीव वस्तु सांस लैत अछि, पानि पीबैत अछि आ बढ़ैत अछि। निर्जीव (पाथर, माटिक घैल) कहियो नहि बढ़ैत अछि।',
        simplerExplanationEn:
          'Living beings breathe, drink water, and grow. Non-living objects stay unchanged without breathing.',
        metaphorTitle: 'नदीक पाथर आ चना केर बीया',
        metaphorDescriptionMt:
          'बाबा माटि मे एकटा पाथर आ एकटा चना केर बीया रखलनि। पानि पड़ला पर पाथर ओहिना रहल, मुदा बीया अंकुरित भऽ गाछ बनि गेल!',
        gamePromptMt: 'पानि आ हवा दिअ: देखू सजीव बीया अंकुरित भऽ बढ़ैत अछि',
        gameSourceTerm: 'पानि आ हवा (Water & Air)',
        gameTargetTerm: 'अंकुरित बीया (Sprouting Seed)',
        practiceQuestion: {
          id: 'rem_q_living',
          questionTextMt: 'एहि मे सं कोन सजीव अछि जे सांस लैत अछि आ बढ़ैत अछि?',
          questionTextEn: 'Which of these is a living organism?',
          options: [
            {
              id: 'A',
              textMt: 'अंकुरित पौधा आ चिरैय',
              textEn: 'Sprouting plant and sparrow',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'नदीक चिकनक पाथर',
              textEn: 'Smooth river pebble',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'माटिक घैल',
              textEn: 'Clay water pot',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: गाछ-बिरिछ आ जीव-जंतु मे प्राण होइत अछि, ओ सांस लैत छथि!',
        },
      },
      odia: {
        storyTitle: 'Sprouting Seed & River Pebble Story (ସଜୀବ ମଞ୍ଜି ଓ ନଦୀ ପଥର)',
        storyTitleMt: 'ସଜୀବ ମଞ୍ଜି ଓ ନଦୀ ପଥର କଥା',
        simplerExplanationMt:
          'ସଜୀବ ଜିନିଷ ଶ୍ୱାସ ନିଏ, ପାଣି ପିଏ ଓ ବଢ଼େ। ନିର୍ଜୀବ (ପଥର, ମାଟି ପାତ୍ର, କାଠ ଲଙ୍ଗଳ) କେବେ ବଢ଼େ ନାହିଁ କି ଶ୍ୱାସ ନିଏ ନାହିଁ।',
        simplerExplanationEn:
          'Living things breathe air, drink water, and grow bigger. Non-living things like rocks stay the same.',
        metaphorTitle: 'ନଦୀ ପଥର ଓ ଚଣା ମଞ୍ଜିର ଉଦାହରଣ',
        metaphorDescriptionMt:
          'ଜେଜେବାପା ମାଟିରେ ଗୋଟିଏ ପଥର ଓ ଗୋଟିଏ ଚଣା ମଞ୍ଜି ପୋତିଲେ। ବର୍ଷା ପରେ ପଥର ସେମିତି ରହିଲା, କିନ୍ତୁ ମଞ୍ଜି ଗଜା ହୋଇ ସବୁଜ ଗଛ ହେଲା!',
        gamePromptMt: 'ପାଣି ଓ ପବନ ଦିଅନ୍ତୁ: ଦେଖନ୍ତୁ ସଜୀବ ମଞ୍ଜି ଗଜା ହୋଇ ବଢ଼ୁଛି',
        gameSourceTerm: 'ପାଣି ଓ ପବନ (Water & Air)',
        gameTargetTerm: 'ସଜୀବ ଗଜା (Sprouting Seedling)',
        practiceQuestion: {
          id: 'rem_q_living',
          questionTextMt: 'ଏହା ମଧ୍ୟରୁ କେଉଁଟି ଏକ ସଜୀବ ଯାହା ଶ୍ୱାସ ନିଏ ଓ ବଢ଼େ?',
          questionTextEn: 'Which of the following is living and breathes?',
          options: [
            {
              id: 'A',
              textMt: 'ଗଛର ଚାରା ଓ ଛୋଟ ଚଢ଼େଇ',
              textEn: 'Plant sapling & baby bird',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ନଦୀର ଗୋଲ ପଥର',
              textEn: 'Smooth river stone',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ମାଟିର ପିଠା ଓ ପାତ୍ର',
              textEn: 'Baked clay vessel',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ସଠିକ୍ ଉତ୍ତର: ଚାରା ଓ ଚଢ଼େଇ ସଜୀବ ଅଟନ୍ତି! ସେମାନେ ନିଃଶ୍ୱାସ ନିଅନ୍ତି ଓ ବଢ଼ନ୍ତି।',
        },
      },
      marathi: {
        storyTitle: 'Sprouting Seed & River Pebble Story (सजीव बी आणि नदीचा दगड)',
        storyTitleMt: 'सजीव बी आणि नदीचा दगड (Seed vs Stone)',
        simplerExplanationMt:
          'सजीव वस्तू श्वास घेतात, पाणी पितात आणि वाढतात. निर्जीव वस्तू (दगड, मातीचे भांडे) कधीही श्वास घेत नाहीत किंवा वाढत नाहीत.',
        simplerExplanationEn:
          'Living things breathe air, drink water, and grow. Non-living objects like river pebbles never breathe or grow.',
        metaphorTitle: 'नदीतील गोटा आणि हरभऱ्याचे बी',
        metaphorDescriptionMt:
          'आजोबांनी मातीत एक दगड आणि एक हरभऱ्याचे बी पेरले. पावसाळ्यानंतर दगड तसाच राहिला, पण सजीव बी अंकुरून त्याचे सुंदर रोपटे झाले!',
        gamePromptMt: 'पाणी व हवा द्या: सजीव बी अंकुरून मोठे होताना पहा',
        gameSourceTerm: 'पाणी व हवा (Water & Air)',
        gameTargetTerm: 'सजीव अंकुर (Sprouting Seed)',
        practiceQuestion: {
          id: 'rem_q_living',
          questionTextMt: 'यापैकी कोणती वस्तू सजीव आहे जी श्वास घेते व वाढते?',
          questionTextEn: 'Which of these is a living thing that grows?',
          options: [
            {
              id: 'A',
              textMt: 'हिरवे रोपटे आणि पिल्लू',
              textEn: 'Green plant sprout & puppy/chick',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'नदीतील गुळगुळीत दगड',
              textEn: 'Smooth river pebble',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'मातीची पणती व मडके',
              textEn: 'Earthen clay vessel',
              isCorrect: false,
            },
          ],
          explanationMt:
            'अचूक उत्तर: रोपटे व पिल्लू सजीव आहेत! त्यांना जगण्यासाठी हवा व पाणी लागते.',
        },
      },
    },
  },

  water_wells: {
    id: 'water_wells',
    lessonKey: 'l2',
    titleEn: 'Water Conservation in Village Wells',
    badge: 'Three-Pot Clay Filter Story',
    iconName: 'Filter',
    themeColor: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-300',
      text: 'text-cyan-900',
      accent: 'bg-cyan-600',
    },
    gameType: 'clay_filter',
    languages: {
      santhali: {
        storyTitle: 'Three-Pot Clay Filter Story (Purifying Monsoon Water)',
        storyTitleMt: 'ᱯᱮ-ᱴᱩᱠᱩᱡ ᱥᱟᱯᱷᱟ ᱫᱟᱜ (Three-Pot Clay Filter)',
        simplerExplanationMt:
          'ᱫᱟᱜ ᱫᱚ ᱡᱤᱣᱤ ᱠᱟᱱᱟ᱾ ᱦᱟᱥᱟ ᱴᱩᱠᱩᱡ ᱨᱮ ᱵᱟᱹᱞᱤ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱛᱟᱞᱟ ᱛᱮ ᱢᱟᱹᱭᱞᱟᱹ ᱫᱟᱜ ᱪᱷᱟᱹᱱᱤ ᱞᱮᱠᱷᱟᱱ ᱥᱟᱯᱷᱟ ᱟᱨ ᱱᱤᱨᱚᱲ ᱫᱟᱜ ᱧᱟᱢᱚᱜ-ᱟ᱾',
        simplerExplanationEn:
          'Clean water protects village families. Pouring cloudy rain or well water through layers of river sand and wood charcoal filters out impurities.',
        metaphorTitle: 'ᱵᱩᱰᱷᱤ ᱟᱭᱳᱣᱟᱜ ᱯᱮ-ᱴᱩᱠᱩᱡ ᱫᱟᱜ ᱪᱷᱟᱹᱱᱤ',
        metaphorDescriptionMt:
          'ᱡᱮᱞᱮᱠᱟ ᱟᱭᱳ ᱯᱮᱭᱟ ᱦᱟᱥᱟ ᱴᱩᱠᱩᱡ ᱨᱮ ᱵᱟᱹᱞᱤ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱫᱚᱦᱚ ᱠᱟᱛᱮ ᱜᱟᱹᱰᱤ ᱫᱟᱜ ᱪᱷᱟᱹᱱᱤ ᱠᱟᱛᱮ ᱱᱤᱨᱚᱲ ᱮ ᱵᱮᱱᱟᱣᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱟᱵᱚ ᱠᱩᱸᱭ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱫᱚᱦᱚ ᱞᱟᱹᱠᱛᱤᱭᱟ!',
        gamePromptMt: 'ᱢᱟᱹᱭᱞᱟᱹ ᱫᱟᱜ ᱮᱢ ᱢᱮ ᱟᱨ ᱵᱟᱹᱞᱤ-ᱠᱩᱭᱞᱟᱹ ᱪᱷᱟᱹᱱᱤ ᱛᱮ ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱧᱮᱞ ᱢᱮ',
        gameSourceTerm: 'ᱡᱟᱹᱲᱤ ᱫᱟᱜ (Cloudy Rainwater)',
        gameTargetTerm: 'ᱥᱟᱯᱷᱟ ᱧᱩ ᱫᱟᱜ (Pure Glass of Water)',
        practiceQuestion: {
          id: 'rem_q_water',
          questionTextMt: 'ᱦᱟᱥᱟ ᱴᱩᱠᱩᱡ ᱪᱷᱟᱹᱱᱤ ᱨᱮ ᱢᱟᱹᱭᱞᱟᱹ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱠᱚ ᱫᱚᱦᱚᱭᱟ?',
          questionTextEn: 'What cleans cloudy rainwater in traditional clay pot filters?',
          options: [
            {
              id: 'A',
              textMt: 'ᱥᱟᱯᱷᱟ ᱵᱟᱹᱞᱤ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱛᱷᱟᱨ',
              textEn: 'Layers of clean river sand and charcoal',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ᱥᱩᱢᱩᱝ ᱜᱩᱲ ᱟᱨ ᱪᱤᱱᱤ',
              textEn: 'Only jaggery and sugar',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ᱯᱞᱟᱥᱴᱤᱠ ᱟᱨ ᱦᱟᱥᱟ',
              textEn: 'Plastic and loose mud',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ: ᱵᱟᱹᱞᱤ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱢᱟᱹᱭᱞᱟᱹ ᱠᱚ ᱟᱴᱠᱟᱣᱟ ᱟᱨ ᱫᱟᱜ ᱱᱤᱨᱚᱲ ᱠᱟᱛᱮ ᱧᱩ ᱞᱟᱹᱜᱤᱫ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
        },
      },
      gondi: {
        storyTitle: 'Three-Pot Clay Filter Story (चोखो येर अनि मटका)',
        storyTitleMt: 'तीन मटका ता चोखो येर (Clay Filter)',
        simplerExplanationMt:
          'चोखो येर रोगा ता काजे बेस आंद। मटका ते रेती अनि कोयला ता रोंगा ते मयली येर छानी की चोखो येर पुतूर।',
        simplerExplanationEn:
          'Filtered clean water prevents illness. Filtering water through clay pots lined with sand and charcoal traps all impurities.',
        metaphorTitle: 'दादी ता तीन मटका फिल्टर',
        metaphorDescriptionMt:
          'दादी तीन मटका लावी की मयली येर तुन रेती अनि कोयला ते छानी की अमृत लेकन चोखो येर तय्यार कींतूर!',
        gamePromptMt: 'पिर्रा येर वासी कीम अनि मटका फिल्टर ते चोखो येर पुटते तो सूड़',
        gameSourceTerm: 'पिर्रा येर (Rainwater)',
        gameTargetTerm: 'चोखो येर (Pure Water)',
        practiceQuestion: {
          id: 'rem_q_water',
          questionTextMt: 'मटका ता छानी ते मयली येर बत साफ़ कींतूर?',
          questionTextEn: 'What purifies the water inside the clay filter?',
          options: [
            {
              id: 'A',
              textMt: 'रेती अनि कोयला (Sand and Charcoal)',
              textEn: 'Sand and Charcoal layers',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'गुड़ अनि मीठ',
              textEn: 'Jaggery and sweets',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'काँच ता टुकड़ा',
              textEn: 'Broken glass pieces',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सच्चो उत्तर: रेती अनि कोयला मयली तुन खींची की येर तुन चोखो कींतूर।',
        },
      },
      bhojpuri: {
        storyTitle: 'Three-Pot Clay Filter Story (तीन घइला के बालू-कोयला छाननी)',
        storyTitleMt: 'तीन घइला के छाननी कथा (Clay Pot Filter)',
        simplerExplanationMt:
          'साफ़ पानी पिए से लइका लोग बेमार ना पड़ेला। घइला में बालू अउरी कोयला डाल के पानी छानला से गंदा पानी एकदम निर्मल हो जाला।',
        simplerExplanationEn:
          'Drinking pure water keeps children healthy. Filtering cloudy well water through charcoal and fine sand leaves it crisp and clean.',
        metaphorTitle: 'दादी के तीन घइला वाला देसी फिल्टर',
        metaphorDescriptionMt:
          'जइसे दादी तीन गो घइला में बालू आ काठ के कोयला सजा के बरसात के पानी के मोती जइसन निर्मल बना देवेली, ओइसहीं कुआँ के पानी साफ़ राखल जरूरी बा!',
        gamePromptMt: 'घइला में पानी डालीं आ बालू-कोयला से छना के साफ़ पानी गिरते देखीं',
        gameSourceTerm: 'बरसात के पानी (Cloudy Water)',
        gameTargetTerm: 'निर्मल साफ़ पानी (Pure Water Cup)',
        practiceQuestion: {
          id: 'rem_q_water',
          questionTextMt: 'घइला के देसी छाननी में पानी के के साफ़ करेला?',
          questionTextEn: 'What filters out dirt in grandmother’s clay filter?',
          options: [
            {
              id: 'A',
              textMt: 'नदी के महीन बालू अउरी कोयला',
              textEn: 'Fine river sand and wood charcoal',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'खाली हल्दी आ मसाला',
              textEn: 'Only turmeric & spices',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'लोहा के तार',
              textEn: 'Iron wire',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: बालू अउरी कोयला गंदगी छान लेवेला आ पानी एकदम निर्मल हो जाला!',
        },
      },
      maithili: {
        storyTitle: 'Three-Pot Clay Filter Story (तीन घैलक पानि छाननी)',
        storyTitleMt: 'तीन घैलक निर्मल पानि (Three Pot Filter)',
        simplerExplanationMt:
          'निर्मल जल पीबय सं बच्चा सब निरोग रहैत अछि। माटिक घैल मे बालू आ कोइला द्वारा पानि छानय सं पानि स्वच्छ भऽ जाइत अछि।',
        simplerExplanationEn:
          'Safe water prevents illness. Filtering water through earthen pots layered with sand and charcoal cleanses all particulate matter.',
        metaphorTitle: 'दादी केर पारंपरिक तीन घैलक जल शोधक',
        metaphorDescriptionMt:
          'जहिना दादी तीन घैल मे नदीक बालू आ काठक कोइला राखि कऽ बरसात केर पानि केँ अमृत जकाँ निर्मल बनाबैत छथि!',
        gamePromptMt: 'घैल मे पानि राखू आ बालू-कोइला सं छना कऽ स्वच्छ पानि बनैत देखू',
        gameSourceTerm: 'बरसाती पानि (Rainwater)',
        gameTargetTerm: 'निर्मल जल (Pure Water Glass)',
        practiceQuestion: {
          id: 'rem_q_water',
          questionTextMt: 'माटिक घैल मे पानि केँ कोन वस्तु स्वच्छ करैत अछि?',
          questionTextEn: 'What makes water clean in traditional pot filtration?',
          options: [
            {
              id: 'A',
              textMt: 'महीन बालू आ काठक कोइला',
              textEn: 'Fine sand and wood charcoal layers',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'मात्र चीनी आ नमक',
              textEn: 'Sugar and salt only',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'पाथरक ढोंका',
              textEn: 'Heavy rocks',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: बालू आ कोइला मैल केँ सोखि लैत अछि आ पानि निर्मल भऽ जाइत अछि।',
        },
      },
      odia: {
        storyTitle: 'Three-Pot Clay Filter Story (ତିନି ମାଠିଆର ପରିଷ୍କାର ଜଳ)',
        storyTitleMt: 'ତିନି ମାଠିଆର ପାଣି ଛାଣି (Three-Pot Filter)',
        simplerExplanationMt:
          'ପରିଷ୍କାର ଜଳ ଶରୀରକୁ ସୁସ୍ଥ ରଖେ। ମାଟି ପାତ୍ରରେ ବାଲି ଓ କୋଇଲା ମାଧ୍ୟମରେ ଛାଣିଲେ ମଇଳା ପାଣି ନିର୍ମଳ ହୁଏ।',
        simplerExplanationEn:
          'Clean drinking water keeps bodies energized. Filtering through sand and charcoal removes all sediment.',
        metaphorTitle: 'ଜେଜେମାଙ୍କ ପାରମ୍ପରିକ ମାଟି ମାଠିଆ ଫିଲ୍ଟର୍',
        metaphorDescriptionMt:
          'ଯେପରି ଜେଜେମା ତିନୋଟି ମାଠିଆରେ ନଦୀ ବାଲି ଓ କାଠ କୋଇଲା ରଖି ବର୍ଷା ପାଣିକୁ ସ୍ୱଚ୍ଛ କରନ୍ତି, ସେହିପରି କୂଅ ପାଣି ସଫା ରଖିବା ଜରୁରୀ!',
        gamePromptMt: 'ମଇଳା ପାଣି ଢାଳନ୍ତୁ ଏବଂ ବାଲି-କୋଇଲା ଦେଇ ସ୍ୱଚ୍ଛ ପାଣି ବାହାରିବା ଦେଖନ୍ତୁ',
        gameSourceTerm: 'ଗୋଳିଆ ପାଣି (Cloudy Water)',
        gameTargetTerm: 'ସ୍ୱଚ୍ଛ ପିଇବା ପାଣି (Clean Glass)',
        practiceQuestion: {
          id: 'rem_q_water',
          questionTextMt: 'ମାଟି ମାଠିଆ ଛାଣିରେ ପାଣିକୁ କିଏ ପରିଷ୍କାର କରେ?',
          questionTextEn: 'What purifies water in the layered pot filter?',
          options: [
            {
              id: 'A',
              textMt: 'ନଦୀ ବାଲି ଓ କାଠ କୋଇଲା',
              textEn: 'River sand and charcoal layers',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'କେବଳ ଚିନି ଓ ଗୁଡ଼',
              textEn: 'Only sugar and jaggery',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ଭଙ୍ଗା ଇଟା',
              textEn: 'Broken bricks',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ସଠିକ୍ ଉତ୍ତର: ବାଲି ଓ କୋଇଲା ମଇଳାକୁ ଅଟକାଇ ପାଣିକୁ ନିର୍ମଳ କରେ।',
        },
      },
      marathi: {
        storyTitle: 'Three-Pot Clay Filter Story (तीन मडक्यांची गाळणी)',
        storyTitleMt: 'तीन मडक्यांची पाणी गाळणी (Three Pot Filter)',
        simplerExplanationMt:
          'स्वच्छ पाण्यामुळे गावातील मुले निरोगी राहतात. मातीच्या मडक्यात वाळू व कोळशातून पाणी गाळल्याने गढूळ पाणी स्वच्छ बनते.',
        simplerExplanationEn:
          'Safe water prevents illness. Filtering water through clay pots filled with sand and charcoal turns muddy water into drinking water.',
        metaphorTitle: 'आजीची पारंपरिक तीन मडक्यांची गाळणी',
        metaphorDescriptionMt:
          'जशी आजी तीन मडक्यांमध्ये वाळू व लाकडी कोळसा ठेवून गढूळ पावसाचे पाणी मोत्यासारखे स्वच्छ गाळून घेते, तसेच विहिरीचे पाणी स्वच्छ ठेवले पाहिजे!',
        gamePromptMt: 'गढूळ पाणी ओता आणि वाळू-कोळशातून स्वच्छ पाण्याचे थेंब पडताना पहा',
        gameSourceTerm: 'गढूळ पाणी (Cloudy Water)',
        gameTargetTerm: 'स्वच्छ पिण्याचे पाणी (Pure Water Glass)',
        practiceQuestion: {
          id: 'rem_q_water',
          questionTextMt: 'मातीच्या मडक्यांच्या गाळणीत पाणी कशामुळे स्वच्छ होते?',
          questionTextEn: 'What makes water pure in grandmother’s clay filter?',
          options: [
            {
              id: 'A',
              textMt: 'नदीची वाळू आणि लाकडी कोळसा',
              textEn: 'River sand and wood charcoal',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'फक्त साखर आणि गूळ',
              textEn: 'Only sugar & jaggery',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'प्लास्टिकच्या पिशव्या',
              textEn: 'Plastic bags',
              isCorrect: false,
            },
          ],
          explanationMt:
            'अचूक उत्तर: वाळू व कोळसा कचरा अडवून पाणी स्वच्छ व पिण्यायोग्य बनवतात.',
        },
      },
    },
  },

  haat_counting: {
    id: 'haat_counting',
    lessonKey: 'l3',
    titleEn: 'Counting Village Haat Goods & Equal Sharing',
    badge: 'Two Sisters Equal Sharing Story',
    iconName: 'PieChart',
    themeColor: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-900',
      accent: 'bg-orange-600',
    },
    gameType: 'equal_shares',
    languages: {
      santhali: {
        storyTitle: 'Two Sisters Equal Sharing Story (Fractions & Halves)',
        storyTitleMt: 'ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱛᱷᱟ (Equal Papaya Sharing)',
        simplerExplanationMt:
          'ᱢᱤᱫᱴᱟᱝ ᱡᱚ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱴᱩᱠᱨᱟᱹ ᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟᱱ ᱚᱱᱟ ᱫᱚ ᱛᱟᱞᱟ (᱑/᱒) ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾ ᱯᱩᱱ ᱥᱚᱢᱟᱱ ᱴᱩᱠᱨᱟᱹ ᱞᱮᱠᱷᱟᱱ ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ (᱑/᱔) ᱦᱩᱭᱩᱜ-ᱟ᱾',
        simplerExplanationEn:
          'When one fruit is divided into two identical pieces, each piece is one-half (1/2). When cut into four equal pieces, each piece is one-fourth (1/4).',
        metaphorTitle: 'ᱦᱟᱴ ᱠᱷᱚᱱ ᱟᱹᱜᱩ ᱟᱠᱟᱱ ᱵᱮᱞᱮ ᱟᱢᱨᱩᱛ ᱦᱟᱹᱴᱤᱧ',
        metaphorDescriptionMt:
          'ᱵᱟᱨ ᱵᱚᱭᱦᱟ ᱦᱟᱴ ᱠᱷᱚᱱ ᱢᱤᱫᱴᱟᱝ ᱵᱮᱞᱮ ᱟᱢᱨᱩᱛ (ᱯᱟᱯᱟᱭᱟ) ᱠᱤᱱ ᱟᱹᱜᱩ ᱠᱮᱫᱟ᱾ ᱟᱭᱳ ᱛᱟᱞᱟ ᱨᱮ ᱜᱮᱫ ᱠᱟᱛᱮ ᱵᱟᱱᱟᱨ ᱠᱤᱱ ᱥᱚᱢᱟᱱ (᱑/᱒) ᱮᱢᱟᱫ ᱠᱤᱱᱟ, ᱡᱟᱦᱟᱸᱭ ᱦᱚᱸ ᱵᱟᱝ ᱠᱤᱱ ᱨᱟᱜ ᱞᱮᱫᱟ!',
        gamePromptMt: 'ᱟᱢᱨᱩᱛ ᱜᱮᱫ ᱢᱮ: ᱒ ᱵᱟᱨ ᱦᱟᱹᱴᱤᱧ (᱑/᱒) ᱟᱨ ᱔ ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ (᱑/᱔) ᱥᱚᱢᱟᱱ ᱮᱢ ᱢᱮ',
        gameSourceTerm: 'ᱵᱮᱞᱮ ᱟᱢᱨᱩᱛ (Whole Fruit)',
        gameTargetTerm: 'ᱥᱚᱢᱟᱱ ᱴᱩᱠᱨᱟᱹ (Equal Shares 1/2 & 1/4)',
        practiceQuestion: {
          id: 'rem_q_shares',
          questionTextMt: 'ᱡᱩᱫᱤ ᱢᱤᱫᱴᱟᱝ ᱯᱩᱨᱟᱹ ᱡᱚ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱵᱷᱟᱜᱽ ᱨᱮ ᱜᱮᱫ ᱦᱩᱭᱩᱜ-ᱟ, ᱛᱚᱵᱮ ᱢᱤᱫ ᱵᱷᱟᱜᱽ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?',
          questionTextEn: 'When one whole fruit is cut into two equal pieces, what is each piece called?',
          options: [
            {
              id: 'A',
              textMt: 'ᱛᱟᱞᱟ ᱥᱟᱦᱟ (᱑/᱒ Half)',
              textEn: 'One-half (1/2)',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ᱜᱚᱴᱟ ᱡᱚ (Whole)',
              textEn: 'The whole fruit',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ᱥᱩᱢᱩᱝ ᱪᱚᱠᱟᱜ (Only the skin)',
              textEn: 'Only the rind',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ: ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱴᱩᱠᱨᱟᱹ ᱨᱮ ᱢᱤᱫᱴᱟᱝ ᱫᱚ ᱛᱟᱞᱟ (᱑/᱒) ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾',
        },
      },
      gondi: {
        storyTitle: 'Two Sisters Equal Sharing Story (फळ ता बरोबर वाट)',
        storyTitleMt: 'रोंड बायेन ता बरोबर वाट (Equal Sharing)',
        simplerExplanationMt:
          'एक फळ तुन रोंड बरोबर वाट कीतूर तो आधा (1/2) आंद। चार बरोबर वाट कीतूर तो पाव (1/4) आंद।',
        simplerExplanationEn:
          'Dividing a fruit into two equal shares makes two halves (1/2). Dividing into four equal shares gives quarters (1/4).',
        metaphorTitle: 'हाट ता पपीता अनि रोंड बायेन',
        metaphorDescriptionMt:
          'रोंड बायेन हाट ते पपीता ततूर। आय्या बरोबर बीच ते कापी की रोंडो जन काजे आधा-आधा (1/2) सीतूर!',
        gamePromptMt: 'पपीता कापा अनि रोंडो पिला काजे आधा अनि चार पिला काजे पाव सीम',
        gameSourceTerm: 'अक्खो फळ (Whole Fruit)',
        gameTargetTerm: 'बरोबर हिस्सा (1/2 अनि 1/4)',
        practiceQuestion: {
          id: 'rem_q_shares',
          questionTextMt: 'एक फळ तुन रोंड बरोबर हिस्सा ते कापीतूर तो एक हिस्सा तुन बत इंतूर?',
          questionTextEn: 'If a fruit is cut into two equal pieces, what is each piece called?',
          options: [
            {
              id: 'A',
              textMt: 'आधा (1/2 Half)',
              textEn: 'One-half (1/2)',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'अक्खो (Whole)',
              textEn: 'Whole',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'शून्य (Zero)',
              textEn: 'Zero',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सच्चो उत्तर: रोंड बरोबर वाट ते एक हिस्सा आधा (1/2) आंद!',
        },
      },
      bhojpuri: {
        storyTitle: 'Two Sisters Equal Sharing Story (हाट के पपीता आ बराबर बँटवारा)',
        storyTitleMt: 'दू बहिन के बराबर बँटवारा (Papaya Sharing)',
        simplerExplanationMt:
          'जब कवनो फल के दु बराबर भाग में बाँटल जाला, त ओकरा के आधा (1/2) कहल जाला। चार बराबर भाग में बाँटला पर एक-चौथाई (1/4) कहल जाला।',
        simplerExplanationEn:
          'When an item is divided into two equal shares, each share is one-half (1/2). Four equal shares give quarters (1/4).',
        metaphorTitle: 'हाट से आइल मीठ पपीता के बँटवारा',
        metaphorDescriptionMt:
          'दू बहिन हाट से एगो मीठ पपीता ले अइली। माई बीच से चाकू चला के दुन्नो के बराबर-बराबर आधा (1/2) दे दिहली, कवनो रोवाई-धोवाई ना भइल!',
        gamePromptMt: 'पपीता काटीं: २ जना में आधा (१/२) आ ४ जना में एक-चौथाई (१/४) बराबर बाँटीं',
        gameSourceTerm: 'पूरा पपीता (Whole Papaya)',
        gameTargetTerm: 'बराबर हिस्सा (1/2 आ 1/4)',
        practiceQuestion: {
          id: 'rem_q_shares',
          questionTextMt: 'जब एगो पूरा फल के दू बराबर टुकड़ा में काटल जाला, त एगो टुकड़ा के का कहल जाला?',
          questionTextEn: 'When a whole fruit is cut into two equal pieces, what is each piece called?',
          options: [
            {
              id: 'A',
              textMt: 'आधा (1/2)',
              textEn: 'One-half (1/2)',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'पूरा फल',
              textEn: 'Whole fruit',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'खाली छिलका',
              textEn: 'Only rind',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: दू बराबर टुकड़ा में से हर टुकड़ा के आधा (1/2) कहल जाला!',
        },
      },
      maithili: {
        storyTitle: 'Two Sisters Equal Sharing Story (हाटक पपीता आ बराबर हिस्सा)',
        storyTitleMt: 'दू बहिनक सम-विभाजन कथा (Equal Sharing)',
        simplerExplanationMt:
          'जखन कोनो फल कऽ दू बराबर भाग मे बाँटल जाइत अछि तऽ ओकरा आधा (1/2) कहल जाइत अछि। चारि बराबर भाग मे बाँटला पर एक-चौथाई (1/4) भऽ जाइत अछि।',
        simplerExplanationEn:
          'Cutting a fruit down the center produces two equal halves (1/2). Four equal slices make quarters (1/4).',
        metaphorTitle: 'हाट सं आनल पपीता केर सम बँटवारा',
        metaphorDescriptionMt:
          'दू बहिन हाट सं एकटा पाकल पपीता अनलनि। माय बीच सं काटी कऽ दुनू बहिन कऽ बराबर आधा-आधा (1/2) देलथिन!',
        gamePromptMt: 'पपीता काटू: २ गोटे लेल आधा (१/२) आ ४ गोटे लेल पाव (१/४) बाँटू',
        gameSourceTerm: 'गोष्ट पपीता (Whole Fruit)',
        gameTargetTerm: 'बराबर भाग (1/2 आ 1/4)',
        practiceQuestion: {
          id: 'rem_q_shares',
          questionTextMt: 'जखन एकटा फल कऽ दू बराबर भाग मे काटल जाइत अछि, तऽ प्रत्येक भाग केँ की कहब?',
          questionTextEn: 'What is one piece called when divided equally in two?',
          options: [
            {
              id: 'A',
              textMt: 'आधा (1/2)',
              textEn: 'One-half (1/2)',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'पूर्ण फल',
              textEn: 'Whole fruit',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'मात्र बीया',
              textEn: 'Seeds only',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: दू बराबर भाग मे सं एक भाग केँ आधा (1/2) कहल जाइत अछि।',
        },
      },
      odia: {
        storyTitle: 'Two Sisters Equal Sharing Story (ହାଟର ଅମୃତଭଣ୍ଡା ଓ ସମାନ ଭାଗ)',
        storyTitleMt: 'ଅମୃତଭଣ୍ଡାର ସମାନ ଭାଗ (Equal Sharing)',
        simplerExplanationMt:
          'ଗୋଟିଏ ଫଳକୁ ଦୁଇ ସମାନ ଭାଗ କଲେ ତାହାକୁ ଅଧା (୧/୨) କୁହାଯାଏ। ଚାରି ସମାନ ଭାଗ କଲେ ଏକ-ଚତୁର୍ଥାଂଶ (୧/୪) କୁହାଯାଏ।',
        simplerExplanationEn:
          'Dividing an object into two equal parts creates halves (1/2). Dividing into four equal parts creates fourths (1/4).',
        metaphorTitle: 'ହାଟରୁ ଅଣାଯାଇଥିବା ପାଚିଲା ଅମୃତଭଣ୍ଡା ବଣ୍ଟା',
        metaphorDescriptionMt:
          'ଦୁଇ ଭଉଣୀ ହାଟରୁ ପାଚିଲା ଅମୃତଭଣ୍ଡା ଆଣିଲେ। ବୋଉ ମଝିରୁ କାଟି ଉଭୟଙ୍କୁ ସମାନ ଅଧା (୧/୨) ଦେଲେ, କେହି କାନ୍ଦିଲେ ନାହିଁ!',
        gamePromptMt: 'ଅମୃତଭଣ୍ଡା କାଟନ୍ତୁ: ୨ ଜଣଙ୍କ ପାଇଁ ଅଧା (୧/୨) ଓ ୪ ଜଣଙ୍କ ପାଇଁ ଚାରିଭାଗ (୧/୪) ବାଣ୍ଟନ୍ତୁ',
        gameSourceTerm: 'ସମ୍ପୂର୍ଣ୍ଣ ଫଳ (Whole Papaya)',
        gameTargetTerm: 'ସମାନ ଅଂଶ (1/2 ଓ 1/4)',
        practiceQuestion: {
          id: 'rem_q_shares',
          questionTextMt: 'ଗୋଟିଏ ଫଳକୁ ଦୁଇଟି ସମାନ ଖଣ୍ଡ କଲେ ପ୍ରତ୍ୟେକ ଖଣ୍ଡକୁ କ’ଣ କୁହାଯାଏ?',
          questionTextEn: 'What is each part called when a whole is divided equally in two?',
          options: [
            {
              id: 'A',
              textMt: 'ଅଧା (୧/୨ Half)',
              textEn: 'One-half (1/2)',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ପୂରା ଫଳ (Whole)',
              textEn: 'Whole',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ଶୂନ (Zero)',
              textEn: 'Zero',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ସଠିକ୍ ଉତ୍ତର: ଦୁଇଟି ସମାନ ଭାଗର ଗୋଟିଏ ଭାଗକୁ ଅଧା (୧/୨) କୁହାଯାଏ।',
        },
      },
      marathi: {
        storyTitle: 'Two Sisters Equal Sharing Story (दोन बहिणी आणि पपईचे समान तुकडे)',
        storyTitleMt: 'पपईचे समान वाटप (Equal Sharing Story)',
        simplerExplanationMt:
          'एका फळाचे दोन समान भाग केले तर त्याला अर्धा (१/२) म्हणतात. चार समान भाग केले तर त्याला पाव (१/४) म्हणतात.',
        simplerExplanationEn:
          'Cutting a fruit into two equal portions creates halves (1/2). Four equal slices give quarters (1/4).',
        metaphorTitle: 'आठवडी बाजारातील गोड पपईचे वाटप',
        metaphorDescriptionMt:
          'दोन बहिणींनी बाजारातून एक पपई आणली. आईने मधोमध कापून दोघींना समान अर्धा (१/२) भाग दिला, दोघीही आनंदात हसल्या!',
        gamePromptMt: 'पपई कापा: २ मुलांसाठी अर्धा (१/२) आणि ४ मुलांसाठी पाव (१/४) समान वाटा',
        gameSourceTerm: 'संपूर्ण फळ (Whole Papaya)',
        gameTargetTerm: 'समान भाग (1/2 व 1/4)',
        practiceQuestion: {
          id: 'rem_q_shares',
          questionTextMt: 'एका फळाचे दोन समान तुकडे केले तर प्रत्येक तुकड्याला काय म्हणतात?',
          questionTextEn: 'When a fruit is divided into two equal parts, what is each called?',
          options: [
            {
              id: 'A',
              textMt: 'अर्धा (१/२)',
              textEn: 'One-half (1/2)',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'संपूर्ण फळ',
              textEn: 'Whole fruit',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'फक्त बी',
              textEn: 'Only seed',
              isCorrect: false,
            },
          ],
          explanationMt:
            'अचूक उत्तर: दोन समान भागांपैकी एका भागाला अर्धा (१/२) म्हणतात.',
        },
      },
    },
  },

  pollinators: {
    id: 'pollinators',
    lessonKey: 'l4',
    titleEn: 'Birds & Seasonal Pollinators',
    badge: 'Golden Butterfly Messenger Story',
    iconName: 'Flower2',
    themeColor: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      text: 'text-rose-900',
      accent: 'bg-rose-600',
    },
    gameType: 'butterfly_pollinator',
    languages: {
      santhali: {
        storyTitle: 'Golden Butterfly Messenger Story (The Pollen Carriers)',
        storyTitleMt: 'ᱥᱟᱥᱟᱝ ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ ᱟᱨ ᱵᱟᱦᱟ (Butterfly Pollinator)',
        simplerExplanationMt:
          'ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ ᱟᱨ ᱧᱮᱞᱮ (ᱢᱟᱹᱪᱷᱤ) ᱵᱟᱦᱟ ᱠᱷᱚᱱ ᱥᱟᱥᱟᱝ ᱫᱷᱩᱲᱤ (ᱯᱳᱞᱮᱱ) ᱤᱫᱤ ᱠᱟᱛᱮ ᱮᱴᱟᱜ ᱵᱟᱦᱟ ᱨᱮ ᱠᱚ ᱫᱚᱦᱚᱭᱟ᱾ ᱱᱚᱣᱟ ᱛᱮ ᱫᱟᱨᱮ ᱨᱮ ᱱᱟᱯᱟᱭ ᱡᱚ ᱦᱟᱨᱟᱜ-ᱟ᱾',
        simplerExplanationEn:
          'Butterflies and honeybees carry golden yellow pollen dust from one blossom to another. This pollination allows flowers to transform into sweet fruits and big pumpkins.',
        metaphorTitle: 'ᱵᱟᱦᱟ ᱠᱷᱚᱱ ᱵᱟᱦᱟ ᱨᱮ ᱥᱟᱥᱟᱝ ᱫᱷᱩᱲᱤ ᱤᱫᱤ',
        metaphorDescriptionMt:
          'ᱡᱮᱞᱮᱠᱟ ᱰᱟᱠᱯᱤᱭᱚᱱ ᱪᱤᱴᱷᱤ ᱤᱫᱤᱭᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱥᱟᱥᱟᱝ ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ ᱵᱟᱦᱟ ᱨᱮᱱᱟᱜ ᱥᱟᱥᱟᱝ ᱫᱷᱩᱲᱤ ᱮᱴᱟᱜ ᱵᱟᱦᱟ ᱨᱮ ᱥᱮᱴᱮᱨᱟ, ᱟᱨ ᱵᱟᱹᱲᱤ ᱨᱮ ᱦᱟᱨᱟᱜ ᱦᱟᱹᱛᱤ ᱠᱚᱦᱸᱰᱟ ᱡᱚ ᱵᱮᱱᱟᱣᱟ!',
        gamePromptMt: 'ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ ᱵᱟᱦᱟ ᱨᱮ ᱩᱰᱟᱹᱣ ᱢᱮ ᱟᱨ ᱯᱳᱞᱮᱱ ᱤᱫᱤ ᱠᱟᱛᱮ ᱡᱚ ᱦᱟᱨᱟ ᱧᱮᱞ ᱢᱮ',
        gameSourceTerm: 'ᱥᱟᱥᱟᱝ ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ (Butterfly)',
        gameTargetTerm: 'ᱦᱟᱨᱟᱜ ᱡᱚ (Ripening Pumpkin)',
        practiceQuestion: {
          id: 'rem_q_pollin',
          questionTextMt: 'ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ ᱟᱨ ᱧᱮᱞᱮ ᱵᱟᱦᱟ ᱠᱷᱚᱱ ᱪᱮᱫ ᱠᱚ ᱤᱫᱤᱭᱟ ᱡᱟᱦᱟᱸ ᱛᱮ ᱡᱚ ᱵᱮᱱᱟᱣᱟ?',
          questionTextEn: 'What do butterflies carry between flowers so that fruits can grow?',
          options: [
            {
              id: 'A',
              textMt: 'ᱥᱟᱥᱟᱝ ᱯᱳᱞᱮᱱ ᱫᱷᱩᱲᱤ (Pollen dust)',
              textEn: 'Golden pollen dust',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ᱥᱩᱢᱩᱝ ᱫᱷᱤᱨᱤ ᱟᱨ ᱦᱟᱥᱟ',
              textEn: 'Stones and soil',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ᱨᱚᱦᱚᱲ ᱥᱟᱠᱟᱢ',
              textEn: 'Dry brown leaves',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ: ᱯᱳᱞᱮᱱ ᱫᱷᱩᱲᱤ ᱢᱤᱫ ᱵᱟᱦᱟ ᱠᱷᱚᱱ ᱮᱴᱟᱜ ᱵᱟᱦᱟ ᱨᱮ ᱥᱮᱴᱮᱨ ᱞᱮᱠᱷᱟᱱ ᱱᱟᱯᱟᱭ ᱡᱚ ᱦᱟᱨᱟᱜ-ᱟ᱾',
        },
      },
      gondi: {
        storyTitle: 'Golden Butterfly Messenger Story (तितली अनि पूंगार)',
        storyTitleMt: 'पियरी तितली अनि पूंगार ता धूरा',
        simplerExplanationMt:
          'तितली अनि नेना पूंगार ता पियरी धूरा तुन दोसरे पूंगार ते रोंगतूर। इदना वजे ते फळ वाढ़तूर।',
        simplerExplanationEn:
          'Butterflies and bees carry pollen from flower to flower, helping blooms grow into sweet fruits.',
        metaphorTitle: 'जंगल ता संदेशवाहक तितली',
        metaphorDescriptionMt:
          'जेलेक डाकिया चिट्ठी रोंगतूर, अन्नेच पियरी तितली पूंगार ता धूरा दोसरे पूंगार ते लावी की बाड़ी ते मीठ फळ फरी कींतूर!',
        gamePromptMt: 'तितली तुन पूंगार ते उड़ा कीम अनि धूरा लावी की फळ बनते तो सूड़',
        gameSourceTerm: 'पियरी तितली (Butterfly)',
        gameTargetTerm: 'मीठ फळ (Ripening Fruit)',
        practiceQuestion: {
          id: 'rem_q_pollin',
          questionTextMt: 'तितली पूंगार ते बत खींची की दोसरे पूंगार ते रोंगतूर?',
          questionTextEn: 'What does the butterfly carry between blossoms?',
          options: [
            {
              id: 'A',
              textMt: 'पियरी पराग धूरा (Golden Pollen)',
              textEn: 'Golden pollen dust',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'गिट्टी अनि माटी',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'सुक्का पाला',
              textEn: 'Dry straw',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सच्चो उत्तर: पराग धूरा दोसरे पूंगार ते रोंगीतूर तो फळ वाढ़तूर।',
        },
      },
      bhojpuri: {
        storyTitle: 'Golden Butterfly Messenger Story (तितली आ पीयर पराग के कथा)',
        storyTitleMt: 'पीयर तितली आ पराग के खेल (Butterfly Pollinator)',
        simplerExplanationMt:
          'तितली आ मधुमक्खी फूल के पीयर पराग एक फूल से दोसरा फूल पर पहुँचावेली। एहसे बगइचा में मीठ फल आ कोहँड़ा फरेला।',
        simplerExplanationEn:
          'Butterflies and bees transport golden pollen powder from blossom to blossom, causing flowers to grow into sweet fruits.',
        metaphorTitle: 'डाकिया जइसन तितली के संदेशा',
        metaphorDescriptionMt:
          'जइसे डाकिया चिट्ठी पहुँचावेला, ओइसहीं सुंदर तितली फूलन के पीयर पराग एक दोसरा पर पहुँचा के बगइचा में कोहँड़ा आ फल फरावेली!',
        gamePromptMt: 'तितली के फूल पर उड़ाईं आ पराग पहुँचा के फल फराते देखीं',
        gameSourceTerm: 'पीयर तितली (Yellow Butterfly)',
        gameTargetTerm: 'फरल कोहँड़ा (Ripe Pumpkin)',
        practiceQuestion: {
          id: 'rem_q_pollin',
          questionTextMt: 'तितली एक फूल से दोसरा फूल पर का पहुँचावेली जेहसे फल फरेला?',
          questionTextEn: 'What do butterflies carry from blossom to blossom?',
          options: [
            {
              id: 'A',
              textMt: 'पीयर पराग कण (Golden Pollen)',
              textEn: 'Golden pollen dust',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'माटी के ढोंका',
              textEn: 'Clay chunks',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'लोहा के तार',
              textEn: 'Iron wire',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: पराग कण एक फूल से दोसरा फूल पर गइला से ही फल बनेला!',
        },
      },
      maithili: {
        storyTitle: 'Golden Butterfly Messenger Story (पियर तितली आ परागकण)',
        storyTitleMt: 'तितली आ फूलक परागकण (Butterfly Pollen Story)',
        simplerExplanationMt:
          'तितली आ मौमखी फूलक पियर परागकण एक फूल सं दोसर फूल धरि पहुँचाबैत अछि। एहि सं गाछ मे फल फड़ैत अछि।',
        simplerExplanationEn:
          'Butterflies and bees carry pollen grains between flowers, fertilizing blossoms so vegetables and fruits swell.',
        metaphorTitle: 'डाकिया जकाँ तितली केर परागकण संदेश',
        metaphorDescriptionMt:
          'जहिना डाकिया एक गाम सं दोसर गाम चिट्ठी दैत छथि, तहिना तितली फूलक परागकण पहुँचा कऽ बगइचा मे कदीमा आ फल फराबैत अछि!',
        gamePromptMt: 'तितली केँ फूल पर उड़ाउ आ पराग सं फल बनैत देखू',
        gameSourceTerm: 'तितली (Butterfly)',
        gameTargetTerm: 'पाकल कदीमा (Ripened Pumpkin)',
        practiceQuestion: {
          id: 'rem_q_pollin',
          questionTextMt: 'तितली एक फूल सं दोसर फूल धरि की पहुँचाबैत अछि?',
          questionTextEn: 'What do bees and butterflies carry between flowers?',
          options: [
            {
              id: 'A',
              textMt: 'पियर परागकण (Pollen grains)',
              textEn: 'Pollen grains',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'माटिक पाथर',
              textEn: 'Stones',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'सूखल पात',
              textEn: 'Dry leaves',
              isCorrect: false,
            },
          ],
          explanationMt:
            'सही उत्तर: परागकण द्वारा परागण होइत अछि आ फूल सं फल बनैत अछि।',
        },
      },
      odia: {
        storyTitle: 'Golden Butterfly Messenger Story (ହଳଦିଆ ପ୍ରଜାପତି ଓ ପରାଗ)',
        storyTitleMt: 'ପ୍ରଜାପତି ଓ ହଳଦିଆ ପରାଗ ରେଣୁ',
        simplerExplanationMt:
          'ପ୍ରଜାପତି ଏବଂ ମହୁମାଛି ଫୁଲର ହଳଦିଆ ପରାଗ ରେଣୁ ବହନ କରି ଅନ୍ୟ ଫୁଲରେ ଲଗାନ୍ତି। ଏହାଦ୍ୱାରା ଫଳ ଉତ୍ପନ୍ନ ହୁଏ।',
        simplerExplanationEn:
          'Butterflies and honeybees transport yellow pollen dust across blooms, allowing sweet fruits to grow.',
        metaphorTitle: 'ପ୍ରଜାପତି ଡାକବାଲା ପରି ସନ୍ଦେଶ ନେବା',
        metaphorDescriptionMt:
          'ଯେପରି ଡାକବାଲା ଗୋଟିଏ ଘରୁ ଅନ୍ୟ ଘରକୁ ଚିଠି ପହଞ୍ଚାନ୍ତି, ସେହିପରି ପ୍ରଜାପତି ପରାଗ ନେଇ ବାଡ଼ିରେ କଖାରୁ ଫଳାଏ!',
        gamePromptMt: 'ପ୍ରଜାପତିଙ୍କୁ ଫୁଲ ଉପରେ ଉଡ଼ାନ୍ତୁ ଏବଂ ଫଳ ବଢ଼ିବା ଦେଖନ୍ତୁ',
        gameSourceTerm: 'ପ୍ରଜାପତି (Butterfly)',
        gameTargetTerm: 'ପାଚିଲା କଖାରୁ (Ripe Pumpkin)',
        practiceQuestion: {
          id: 'rem_q_pollin',
          questionTextMt: 'ପ୍ରଜାପତି ଫୁଲରୁ କ’ଣ ନେଇ ଅନ୍ୟ ଫୁଲରେ ଦିଅନ୍ତି ଯାହାଫଳରେ ଫଳ ହୁଏ?',
          questionTextEn: 'What do butterflies move between blooms to create fruit?',
          options: [
            {
              id: 'A',
              textMt: 'ହଳଦିଆ ପରାଗ ରେଣୁ (Golden Pollen)',
              textEn: 'Golden pollen dust',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'ମାଟି ଓ ଗୋଡ଼ି',
              textEn: 'Mud and pebbles',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'ଶୁଖିଲା କାଠି',
              textEn: 'Dry twigs',
              isCorrect: false,
            },
          ],
          explanationMt:
            'ସଠିକ୍ ଉତ୍ତର: ପରାଗ ସଂଯୋଗ ହେବା ଦ୍ୱାରା ଫୁଲରୁ ମିଠା ଫଳ ଉତ୍ପନ୍ନ ହୁଏ।',
        },
      },
      marathi: {
        storyTitle: 'Golden Butterfly Messenger Story (फुलपाखरू आणि पिवळे परागकण)',
        storyTitleMt: 'फुलपाखराचा पराग संदेश (Butterfly Pollinator)',
        simplerExplanationMt:
          'फुलपाखरे व मधमाश्या फुलांमधील पिवळे परागकण एका फुलावरून दुसऱ्या फुलावर नेतात. त्यामुळे फुलांचे रूपांतर फळांमध्ये होते.',
        simplerExplanationEn:
          'Butterflies and bees carry pollen grains between blossoms, helping plants bear sweet pumpkins and fruits.',
        metaphorTitle: 'डाक्यासारखे फुलपाखराचे काम',
        metaphorDescriptionMt:
          'जसा पोस्टमन पत्र पोहोचवतो, तसेच फुलपाखरू फुलांमधील पिवळे परागकण एका फुलावरून दुसऱ्या फुलावर नेऊन बागेत भोपळे व फळे फुलवते!',
        gamePromptMt: 'फुलपाखराला फुलांवर बसवा आणि परागकणांमुळे फळ वाढताना पहा',
        gameSourceTerm: 'फुलपाखरू (Butterfly)',
        gameTargetTerm: 'पिकलेला भोपळा (Ripe Pumpkin)',
        practiceQuestion: {
          id: 'rem_q_pollin',
          questionTextMt: 'फुलपाखरे फुलांवरून काय वाहून नेतात ज्यामुळे फळ तयार होते?',
          questionTextEn: 'What do butterflies carry from one flower to another?',
          options: [
            {
              id: 'A',
              textMt: 'पिवळे परागकण (Golden Pollen)',
              textEn: 'Golden pollen dust',
              isCorrect: true,
            },
            {
              id: 'B',
              textMt: 'दगड आणि माती',
              textEn: 'Stones and mud',
              isCorrect: false,
            },
            {
              id: 'C',
              textMt: 'कोरडी लाकडे',
              textEn: 'Dry sticks',
              isCorrect: false,
            },
          ],
          explanationMt:
            'अचूक उत्तर: परागकणांचे परागीभवन झाल्यामुळेच फुलाचे रूपांतर फळात होते.',
        },
      },
    },
  },
};

export const DEFAULT_REMEDIAL_LESSON_ID = 'plants_needs';

export function getRemedialLesson(lessonId?: string): RemedialLessonConfig {
  if (!lessonId) return REMEDIAL_LESSONS_MAP.plants_needs;

  // Exact match
  if (REMEDIAL_LESSONS_MAP[lessonId]) {
    return REMEDIAL_LESSONS_MAP[lessonId];
  }

  // Alias lookup
  if (lessonId === 'l1' || lessonId.toLowerCase().includes('plant')) {
    return REMEDIAL_LESSONS_MAP.plants_needs;
  }
  if (lessonId === 'l2' || lessonId.toLowerCase().includes('water') || lessonId.toLowerCase().includes('well')) {
    return REMEDIAL_LESSONS_MAP.water_wells;
  }
  if (lessonId === 'l3' || lessonId.toLowerCase().includes('haat') || lessonId.toLowerCase().includes('count') || lessonId.toLowerCase().includes('fraction')) {
    return REMEDIAL_LESSONS_MAP.haat_counting;
  }
  if (lessonId === 'l4' || lessonId.toLowerCase().includes('pollin') || lessonId.toLowerCase().includes('bird') || lessonId.toLowerCase().includes('bee')) {
    return REMEDIAL_LESSONS_MAP.pollinators;
  }
  if (lessonId.toLowerCase().includes('root')) {
    return REMEDIAL_LESSONS_MAP.plant_roots;
  }
  if (lessonId.toLowerCase().includes('living')) {
    return REMEDIAL_LESSONS_MAP.living_things;
  }

  // Default fallback
  return REMEDIAL_LESSONS_MAP.plants_needs;
}

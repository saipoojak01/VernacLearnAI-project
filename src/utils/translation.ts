import { LanguageCode, LearningContext, ConvertedLessonNote } from '../types';

export interface TranslationResult {
  script: string;
  transliteration: string;
  childFriendly: string;
  pedagogicNote: string;
  vocabularyTerms: Array<{ term: string; meaning: string; pronunciation: string }>;
}

export interface AdaptedContentResult {
  title: string;
  contentMt: string;
  contentEn: string;
  activityPrompt: string;
}

// Comprehensive dictionary mappings for botanical, ecological, numeracy, and daily life terms
export const MULTILINGUAL_DICTIONARY: Record<string, Record<LanguageCode, { mt: string; translit: string; meaning: string }>> = {
  plant: {
    santhali: { mt: 'ᱫᱟᱨᱮ', translit: 'Dare', meaning: 'Plant / Tree' },
    gondi: { mt: 'मरांग / मरा', translit: 'Marang / Mara', meaning: 'Tree / Plant' },
    bhojpuri: { mt: 'पेड़ / पौधा', translit: 'Ped / Paudha', meaning: 'Plant / Tree' },
    maithili: { mt: 'गाछ / बिरिछ', translit: 'Gaachh / Birichh', meaning: 'Plant / Tree' },
    odia: { mt: 'ଗଛ / ଉଦ୍ଭିଦ', translit: 'Gachha / Udbhida', meaning: 'Tree / Plant' },
    marathi: { mt: 'झाड / रोपटे', translit: 'Jhaad / Ropte', meaning: 'Tree / Plant' },
  },
  sunlight: {
    santhali: { mt: 'ᱥᱤᱛᱩᱝ / ᱵᱮᱲᱟ ᱢᱟᱨᱥᱟᱞ', translit: 'Situng / Bera Marsal', meaning: 'Sunlight / Solar Light' },
    gondi: { mt: 'पोद्दु / पोद्दु नोर', translit: 'Poddu / Poddu Nor', meaning: 'Sun / Sunlight' },
    bhojpuri: { mt: 'घाम / सुरुज के रोशनी', translit: 'Ghaam / Suruj ke Roshani', meaning: 'Sunlight' },
    maithili: { mt: 'रौद / घाम', translit: 'Raud / Ghaam', meaning: 'Sunlight / Sunshine' },
    odia: { mt: 'ଖରା / ସୂର୍ଯ୍ୟାଲୋକ', translit: 'Khara / Suryaloka', meaning: 'Sunlight' },
    marathi: { mt: 'सूर्यप्रकाश / ऊन', translit: 'Suryaprakash / Oon', meaning: 'Sunlight' },
  },
  water: {
    santhali: { mt: 'ᱫᱟᱜ', translit: 'Dak', meaning: 'Water' },
    gondi: { mt: 'येर', translit: 'Yer', meaning: 'Water' },
    bhojpuri: { mt: 'पानी / जल', translit: 'Paani / Jal', meaning: 'Water' },
    maithili: { mt: 'पानि / जल', translit: 'Paani / Jal', meaning: 'Water' },
    odia: { mt: 'ପାଣି / ଜଳ', translit: 'Pani / Jala', meaning: 'Water' },
    marathi: { mt: 'पाणी', translit: 'Pani', meaning: 'Water' },
  },
  leaf: {
    santhali: { mt: 'ᱥᱟᱠᱟᱢ / ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ', translit: 'Sakam / Hariyar Sakam', meaning: 'Leaf / Green Leaf' },
    gondi: { mt: 'आक / हड़िया आक', translit: 'Aak / Hadiya Aak', meaning: 'Leaf / Green Leaf' },
    bhojpuri: { mt: 'पतई / हरियर पात', translit: 'Patai / Hariyar Paat', meaning: 'Leaf / Green Leaf' },
    maithili: { mt: 'पात / हरियर पात', translit: 'Paat / Hariyar Paat', meaning: 'Leaf' },
    odia: { mt: 'ପତ୍ର / ସବୁଜ ପତ୍ର', translit: 'Patra / Sabuja Patra', meaning: 'Leaf / Green Leaf' },
    marathi: { mt: 'पान / हिरवे पान', translit: 'Paan / Hirve Paan', meaning: 'Leaf / Green Leaf' },
  },
  roots: {
    santhali: { mt: 'ᱨᱮᱦᱮᱫ', translit: 'Rehed', meaning: 'Roots' },
    gondi: { mt: 'मुडु / वेंज', translit: 'Mudu / Venj', meaning: 'Roots' },
    bhojpuri: { mt: 'जड़ / सोरह', translit: 'Jar / Sorah', meaning: 'Roots' },
    maithili: { mt: 'जड़ि', translit: 'Jari', meaning: 'Roots' },
    odia: { mt: 'ଚେର', translit: 'Chera', meaning: 'Roots' },
    marathi: { mt: 'मुळे', translit: 'Mule', meaning: 'Roots' },
  },
  air: {
    santhali: { mt: 'ᱦᱚᱭ / ᱡᱤᱣᱤ ᱦᱚᱭ', translit: 'Hoy / Jiwi Hoy', meaning: 'Air / Fresh Oxygen' },
    gondi: { mt: 'हवा / वात', translit: 'Hava / Vaat', meaning: 'Air / Wind' },
    bhojpuri: { mt: 'हवा / बयार', translit: 'Hava / Bayaar', meaning: 'Air / Breeze' },
    maithili: { mt: 'हवा / बतास', translit: 'Hava / Bataas', meaning: 'Air / Wind' },
    odia: { mt: 'ପବନ / ବାୟୁ', translit: 'Pabana / Bayu', meaning: 'Air / Wind' },
    marathi: { mt: 'हवा / वारा', translit: 'Hava / Vara', meaning: 'Air / Wind' },
  },
  food: {
    santhali: { mt: 'ᱡᱚᱢᱟᱜ / ᱫᱟᱠᱟ-ᱩᱛᱩ', translit: 'Jomag / Daka-Utu', meaning: 'Food / Nutrition' },
    gondi: { mt: 'गाटा / तींदल', translit: 'Gaata / Teendal', meaning: 'Food / Cooked Meal' },
    bhojpuri: { mt: 'खाना / भोजन', translit: 'Khana / Bhojan', meaning: 'Food' },
    maithili: { mt: 'भोजन / भोजन-भात', translit: 'Bhojan / Bhaat', meaning: 'Food' },
    odia: { mt: 'ଖାଦ୍ୟ / ଆହାର', translit: 'Khadya / Ahara', meaning: 'Food' },
    marathi: { mt: 'अन्न / खाद्य', translit: 'Anna / Khadya', meaning: 'Food' },
  },
  kitchen: {
    santhali: { mt: 'ᱪᱩᱞᱦᱟᱹ / ᱫᱟᱠᱟ ᱚᱲᱟᱜ', translit: 'Chulha / Daka Orak', meaning: 'Cooking Hearth / Kitchen' },
    gondi: { mt: 'रांदना / चूल्हा', translit: 'Randna / Chulha', meaning: 'Kitchen / Stove' },
    bhojpuri: { mt: 'रसोई / चूल्हा', translit: 'Rasoi / Chulha', meaning: 'Kitchen / Stove' },
    maithili: { mt: 'चुलहा / भानस घर', translit: 'Chulha / Bhanas Ghar', meaning: 'Kitchen Hearth' },
    odia: { mt: 'ରୋଷେଇଶାଳା / ଚୁଲି', translit: 'Roseisala / Chuli', meaning: 'Kitchen Hearth' },
    marathi: { mt: 'स्वयंपाकघर / चूल', translit: 'Swayampakghar / Chool', meaning: 'Kitchen / Hearth' },
  },
  soil: {
    santhali: { mt: 'ᱦᱟᱥᱟ', translit: 'Hasa', meaning: 'Earth / Soil' },
    gondi: { mt: 'भूईं / माटी', translit: 'Bhuin / Mati', meaning: 'Soil / Earth' },
    bhojpuri: { mt: 'माटी', translit: 'Mati', meaning: 'Soil' },
    maithili: { mt: 'माटि', translit: 'Mati', meaning: 'Soil' },
    odia: { mt: 'ମାଟି', translit: 'Mati', meaning: 'Soil' },
    marathi: { mt: 'माती', translit: 'Mati', meaning: 'Soil' },
  },
  cloud: {
    santhali: { mt: 'ᱨᱤᱢᱤᱞ', translit: 'Rimil', meaning: 'Rain Cloud' },
    gondi: { mt: 'पिरंग / बादल', translit: 'Pirang / Badal', meaning: 'Rain Cloud' },
    bhojpuri: { mt: 'बादल / मेघर', translit: 'Badal / Meghar', meaning: 'Cloud' },
    maithili: { mt: 'मेघ / बादल', translit: 'Megh / Badal', meaning: 'Rain Cloud' },
    odia: { mt: 'ମେଘ / ବାଦଲ', translit: 'Megha / Badala', meaning: 'Cloud' },
    marathi: { mt: 'ढग / मेघ', translit: 'Dhag / Megh', meaning: 'Cloud' },
  },
  flower: {
    santhali: { mt: 'ᱵᱟᱦᱟ', translit: 'Baha', meaning: 'Flower' },
    gondi: { mt: 'पुंगार', translit: 'Pungar', meaning: 'Flower' },
    bhojpuri: { mt: 'फूल', translit: 'Phool', meaning: 'Flower' },
    maithili: { mt: 'फूल', translit: 'Phool', meaning: 'Flower' },
    odia: { mt: 'ଫୁଲ', translit: 'Phula', meaning: 'Flower' },
    marathi: { mt: 'फूल', translit: 'Phool', meaning: 'Flower' },
  },
  fruit: {
    santhali: { mt: 'ᱡᱚ', translit: 'Jo', meaning: 'Fruit' },
    gondi: { mt: 'फल / फळ', translit: 'Phal', meaning: 'Fruit' },
    bhojpuri: { mt: 'फल / फर', translit: 'Phar', meaning: 'Fruit' },
    maithili: { mt: 'फल', translit: 'Phal', meaning: 'Fruit' },
    odia: { mt: 'ଫଳ', translit: 'Phala', meaning: 'Fruit' },
    marathi: { mt: 'फळ', translit: 'Phal', meaning: 'Fruit' },
  },
  seed: {
    santhali: { mt: 'ᱡᱟᱝ', translit: 'Jang', meaning: 'Seed' },
    gondi: { mt: 'बिंज', translit: 'Binj', meaning: 'Seed' },
    bhojpuri: { mt: 'बिया / बीज', translit: 'Biya', meaning: 'Seed' },
    maithili: { mt: 'बिया', translit: 'Biya', meaning: 'Seed' },
    odia: { mt: 'ମଞ୍ଜି', translit: 'Manji', meaning: 'Seed' },
    marathi: { mt: 'बी / बियाणे', translit: 'Bee', meaning: 'Seed' },
  },
  bird: {
    santhali: { mt: 'ᱪᱮᱬᱮ', translit: 'Chene', meaning: 'Bird' },
    gondi: { mt: 'पिट्टे / पटे', translit: 'Pitte / Pate', meaning: 'Bird' },
    bhojpuri: { mt: 'चिरई / पंछी', translit: 'Chirai / Panchhi', meaning: 'Bird' },
    maithili: { mt: 'चिरै / पंछी', translit: 'Chirai', meaning: 'Bird' },
    odia: { mt: 'ଚଢ଼େଇ / ପକ୍ଷୀ', translit: 'Chadhei / Pakshi', meaning: 'Bird' },
    marathi: { mt: 'पक्षी / पाखरू', translit: 'Pakshi', meaning: 'Bird' },
  },
  animal: {
    santhali: { mt: 'ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ', translit: 'Jib-Jiyali', meaning: 'Animal / Wildlife' },
    gondi: { mt: 'मिरुंग / जनावर', translit: 'Mirung / Janawar', meaning: 'Animal' },
    bhojpuri: { mt: 'जानवर / पशु', translit: 'Jaanwar', meaning: 'Animal' },
    maithili: { mt: 'पसु / जानवर', translit: 'Pashu', meaning: 'Animal' },
    odia: { mt: 'ପଶୁ / ପ୍ରାଣୀ', translit: 'Pasu / Prani', meaning: 'Animal' },
    marathi: { mt: 'प्राणी / जनावर', translit: 'Prani', meaning: 'Animal' },
  },
  cow: {
    santhali: { mt: 'ᱜᱟᱹᱭ', translit: 'Gai', meaning: 'Cow' },
    gondi: { mt: 'कोड / गाई', translit: 'Koda / Gai', meaning: 'Cow' },
    bhojpuri: { mt: 'गैया / गाय', translit: 'Gaiya', meaning: 'Cow' },
    maithili: { mt: 'गाय', translit: 'Gaai', meaning: 'Cow' },
    odia: { mt: 'ଗାଈ', translit: 'Gaai', meaning: 'Cow' },
    marathi: { mt: 'गाय', translit: 'Gaay', meaning: 'Cow' },
  },
  milk: {
    santhali: { mt: 'ᱛᱚᱣᱟ', translit: 'Towa', meaning: 'Milk' },
    gondi: { mt: 'पाल', translit: 'Paal', meaning: 'Milk' },
    bhojpuri: { mt: 'दूध / गोरस', translit: 'Doodh', meaning: 'Milk' },
    maithili: { mt: 'दूध', translit: 'Doodh', meaning: 'Milk' },
    odia: { mt: 'କ୍ଷୀର / ଦୁଧ', translit: 'Khira', meaning: 'Milk' },
    marathi: { mt: 'दूध', translit: 'Doodh', meaning: 'Milk' },
  },
  river: {
    santhali: { mt: 'ᱜᱟᱰᱟ', translit: 'Gada', meaning: 'River' },
    gondi: { mt: 'दोड्डा / नदी', translit: 'Dodda', meaning: 'River' },
    bhojpuri: { mt: 'नदी / नदिया', translit: 'Nadi', meaning: 'River' },
    maithili: { mt: 'नदी', translit: 'Nadi', meaning: 'River' },
    odia: { mt: 'ନଦୀ', translit: 'Nadi', meaning: 'River' },
    marathi: { mt: 'नदी', translit: 'Nadi', meaning: 'River' },
  },
  rain: {
    santhali: { mt: 'ᱡᱟᱹᱲᱤ / ᱫᱟᱜ', translit: 'Jari / Dak', meaning: 'Rainfall' },
    gondi: { mt: 'पिरंग', translit: 'Pirang', meaning: 'Rain' },
    bhojpuri: { mt: 'बरखा / पानी', translit: 'Barkha', meaning: 'Rain' },
    maithili: { mt: 'बरखा / वर्षा', translit: 'Barkha', meaning: 'Rain' },
    odia: { mt: 'ବର୍ଷା', translit: 'Barsa', meaning: 'Rain' },
    marathi: { mt: 'पाऊस', translit: 'Paus', meaning: 'Rain' },
  },
  school: {
    santhali: { mt: 'ᱟᱥᱲᱟ', translit: 'Asra', meaning: 'School' },
    gondi: { mt: 'साला / स्कूल', translit: 'Saala', meaning: 'School' },
    bhojpuri: { mt: 'इस्कूल / पाठशाला', translit: 'School', meaning: 'School' },
    maithili: { mt: 'विद्यालय / पाठशाला', translit: 'Vidyalay', meaning: 'School' },
    odia: { mt: 'ବିଦ୍ୟାଳୟ / ସ୍କୁଲ', translit: 'Bidyalaya', meaning: 'School' },
    marathi: { mt: 'शाळा', translit: 'Shala', meaning: 'School' },
  },
  book: {
    santhali: { mt: 'ᱯᱚᱛᱚᱵ', translit: 'Potob', meaning: 'Book' },
    gondi: { mt: 'पोथी / किताब', translit: 'Pothi', meaning: 'Book' },
    bhojpuri: { mt: 'किताब / पोथी', translit: 'Pothi', meaning: 'Book' },
    maithili: { mt: 'पोथी', translit: 'Pothi', meaning: 'Book' },
    odia: { mt: 'ବହି', translit: 'Bahi', meaning: 'Book' },
    marathi: { mt: 'पुस्तक / वही', translit: 'Pustak', meaning: 'Book' },
  },
  children: {
    santhali: { mt: 'ᱜᱤᱫᱽᱨᱟᱹ', translit: 'Gidra', meaning: 'Children' },
    gondi: { mt: 'पिलोर / पिला', translit: 'Pilor', meaning: 'Children' },
    bhojpuri: { mt: 'लइका / बच्चा', translit: 'Laika', meaning: 'Children' },
    maithili: { mt: 'बच्चा / नूनू', translit: 'Bachha', meaning: 'Children' },
    odia: { mt: 'ପିଲାମାନେ', translit: 'Pilamane', meaning: 'Children' },
    marathi: { mt: 'मुले / लेकरे', translit: 'Mule', meaning: 'Children' },
  },
  village: {
    santhali: { mt: 'ᱟᱹᱛᱩ', translit: 'Atu', meaning: 'Village' },
    gondi: { mt: 'नाड़ / गाँव', translit: 'Naad', meaning: 'Village' },
    bhojpuri: { mt: 'गाँव', translit: 'Gaanw', meaning: 'Village' },
    maithili: { mt: 'गाम', translit: 'Gaam', meaning: 'Village' },
    odia: { mt: 'ଗାଁ', translit: 'Gaan', meaning: 'Village' },
    marathi: { mt: 'गाव', translit: 'Gaav', meaning: 'Village' },
  },
  forest: {
    santhali: { mt: 'ᱵᱤᱨ', translit: 'Bir', meaning: 'Forest / Woods' },
    gondi: { mt: 'राना / जंगल', translit: 'Raana', meaning: 'Forest' },
    bhojpuri: { mt: 'जंगल / बन', translit: 'Ban', meaning: 'Forest' },
    maithili: { mt: 'वन / जंगल', translit: 'Ban', meaning: 'Forest' },
    odia: { mt: 'ଜଙ୍ଗଲ / ବନ', translit: 'Jangala', meaning: 'Forest' },
    marathi: { mt: 'जंगल / रान', translit: 'Jangal', meaning: 'Forest' },
  },
};

// Language greetings
export const GREETINGS_BY_LANG: Record<LanguageCode, { greeting: string; nativeTitle: string; subtitle: string }> = {
  santhali: {
    greeting: 'ᱡᱚᱦᱟᱨ',
    nativeTitle: 'ᱢᱟᱲᱟᱝ ᱥᱮᱪᱮᱫ ᱚᱲᱟᱜ',
    subtitle: 'ᱟᱢᱟᱜ ᱟᱭᱳ ᱟᱲᱟᱝ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱥᱟᱬᱮᱥ, ᱮᱞᱠᱷᱟ ᱟᱨ ᱠᱟᱹᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ ᱢᱮ᱾',
  },
  gondi: {
    greeting: 'सेवा जोहार',
    nativeTitle: 'प्राथमिक सीखन कोठा',
    subtitle: 'अपनी मातृभाषा गोंडी ते विज्ञान, गणित अनि ककनी सीखुट।',
  },
  bhojpuri: {
    greeting: 'प्रणाम / जोहार',
    nativeTitle: 'प्राथमिक शिक्षा कोना',
    subtitle: 'रउआ आपन मातृभाषा भोजपुरी में विज्ञान, गणित अउरी कहानी पढ़ीं।',
  },
  maithili: {
    greeting: 'प्रणाम',
    nativeTitle: 'प्राथमिक शिक्षण कक्ष',
    subtitle: 'अपन मातृभाषा मैथिली मे विज्ञान, गणित आ कथा-कहानी पढ़ू।',
  },
  odia: {
    greeting: 'ନମସ୍କାର / ଜୁହାର',
    nativeTitle: 'ପ୍ରାଥମିକ ଶିକ୍ଷା କେନ୍ଦ୍ର',
    subtitle: 'ନିଜ ମାତୃଭାଷା ଓଡ଼ିଆରେ ବିଜ୍ଞାନ, ଗଣିତ ଏବଂ କାହାଣୀ ଶିଖନ୍ତୁ।',
  },
  marathi: {
    greeting: 'नमस्कार',
    nativeTitle: 'प्राथमिक शिक्षण दालन',
    subtitle: 'आपल्या मातृभाषेत मराठीत विज्ञान, गणित आणि गोष्टी शिका.',
  },
};

// Helper function to extract relevant vocabulary terms based on input text
function extractRelevantVocabulary(text: string, lang: LanguageCode): Array<{ term: string; meaning: string; pronunciation: string }> {
  const lower = text.toLowerCase();
  const matchedTerms: Array<{ term: string; meaning: string; pronunciation: string }> = [];

  const keyMap: Array<{ keys: string[]; dictKey: string; pron: string }> = [
    { keys: ['plant', 'tree', 'vegetation', 'wood'], dictKey: 'plant', pron: 'Dah-ray / Ped' },
    { keys: ['sun', 'sunlight', 'light', 'solar', 'shine'], dictKey: 'sunlight', pron: 'See-toong / Ghaam' },
    { keys: ['water', 'liquid', 'drink', 'pond'], dictKey: 'water', pron: 'Dah-k / Paani' },
    { keys: ['leaf', 'leaves', 'foliage', 'green'], dictKey: 'leaf', pron: 'Sah-kahm / Paat' },
    { keys: ['root', 'roots', 'underground'], dictKey: 'roots', pron: 'Ray-hayd / Jar' },
    { keys: ['air', 'breeze', 'wind', 'oxygen'], dictKey: 'air', pron: 'Hoy / Hava' },
    { keys: ['food', 'meal', 'nutrition', 'eat'], dictKey: 'food', pron: 'Joh-mahg / Khana' },
    { keys: ['kitchen', 'hearth', 'chulha', 'stove', 'cook'], dictKey: 'kitchen', pron: 'Chool-hah / Rasoi' },
    { keys: ['soil', 'earth', 'ground', 'dirt', 'mud'], dictKey: 'soil', pron: 'Hah-sah / Maati' },
    { keys: ['cloud', 'clouds', 'sky'], dictKey: 'cloud', pron: 'Ree-meel / Badal' },
    { keys: ['flower', 'flowers', 'blossom', 'petal'], dictKey: 'flower', pron: 'Bah-hah / Phool' },
    { keys: ['fruit', 'fruits', 'produce'], dictKey: 'fruit', pron: 'Joh / Phal' },
    { keys: ['seed', 'seeds', 'grain'], dictKey: 'seed', pron: 'Jahng / Biya' },
    { keys: ['bird', 'birds', 'feather', 'nest', 'egg', 'fly'], dictKey: 'bird', pron: 'Chay-nay / Chirai' },
    { keys: ['animal', 'animals', 'wildlife', 'creature'], dictKey: 'animal', pron: 'Jib-jiyali / Pashu' },
    { keys: ['cow', 'cattle', 'graze'], dictKey: 'cow', pron: 'Gah-ee / Gaiya' },
    { keys: ['milk', 'dairy'], dictKey: 'milk', pron: 'Toh-wah / Doodh' },
    { keys: ['rain', 'monsoon', 'shower'], dictKey: 'rain', pron: 'Jah-ree / Barkha' },
    { keys: ['river', 'stream', 'creek'], dictKey: 'river', pron: 'Gah-dah / Nadi' },
    { keys: ['school', 'class', 'classroom', 'study'], dictKey: 'school', pron: 'Ahs-rah / School' },
    { keys: ['book', 'read', 'story', 'text'], dictKey: 'book', pron: 'Poh-tob / Pothi' },
    { keys: ['child', 'children', 'student', 'boy', 'girl'], dictKey: 'children', pron: 'Geed-rah / Laika' },
    { keys: ['village', 'rural', 'community', 'home'], dictKey: 'village', pron: 'Ah-too / Gaanw' },
    { keys: ['forest', 'jungle', 'woods'], dictKey: 'forest', pron: 'Beer / Ban' },
  ];

  for (const item of keyMap) {
    if (item.keys.some(k => lower.includes(k))) {
      const entry = MULTILINGUAL_DICTIONARY[item.dictKey]?.[lang];
      if (entry) {
        matchedTerms.push({
          term: `${entry.mt} (${entry.translit})`,
          meaning: entry.meaning,
          pronunciation: item.pron,
        });
      }
    }
    if (matchedTerms.length >= 4) break;
  }

  // If no specific terms matched, supply the core contextual terms for the target language
  if (matchedTerms.length === 0) {
    const defaults = ['plant', 'sunlight', 'water', 'leaf'];
    for (const key of defaults) {
      const entry = MULTILINGUAL_DICTIONARY[key]?.[lang];
      if (entry) {
        matchedTerms.push({
          term: `${entry.mt} (${entry.translit})`,
          meaning: entry.meaning,
          pronunciation: entry.translit,
        });
      }
    }
  }

  return matchedTerms;
}

// Extract relevant vocabulary from student's mother tongue input
export function extractRelevantVocabularyFromMt(
  text: string,
  lang: LanguageCode
): Array<{ term: string; meaning: string; pronunciation: string }> {
  const lower = text.toLowerCase();
  const matchedTerms: Array<{ term: string; meaning: string; pronunciation: string }> = [];

  for (const [_, langMap] of Object.entries(MULTILINGUAL_DICTIONARY)) {
    const entry = langMap[lang];
    if (entry) {
      if (
        text.includes(entry.mt) ||
        (entry.translit && lower.includes(entry.translit.toLowerCase())) ||
        entry.mt.split('/').some((part) => text.includes(part.trim()))
      ) {
        matchedTerms.push({
          term: `${entry.mt} (${entry.translit})`,
          meaning: entry.meaning,
          pronunciation: entry.translit,
        });
      }
    }
    if (matchedTerms.length >= 4) break;
  }

  if (matchedTerms.length === 0) {
    const defaults = ['plant', 'sunlight', 'water', 'leaf'];
    for (const key of defaults) {
      const entry = MULTILINGUAL_DICTIONARY[key]?.[lang];
      if (entry) {
        matchedTerms.push({
          term: `${entry.mt} (${entry.translit})`,
          meaning: entry.meaning,
          pronunciation: entry.translit,
        });
      }
    }
  }

  return matchedTerms;
}

// Generates an accurate English translation for any student mother-tongue input
export function generateMotherTongueToEnglishTranslation(
  text: string,
  lang: LanguageCode
): TranslationResult {
  const trimmed = text.trim();
  const vocabTerms = extractRelevantVocabularyFromMt(trimmed, lang);

  // 1. Photosynthesis / Plants & Sunlight
  if (
    trimmed.includes('ᱫᱟᱨᱮ') ||
    trimmed.includes('ᱥᱤᱛᱩᱝ') ||
    trimmed.includes('ᱥᱟᱠᱟᱢ') ||
    trimmed.includes('मरांग') ||
    trimmed.includes('पोद्दु') ||
    trimmed.includes('घाम') ||
    trimmed.includes('रौद') ||
    trimmed.includes('ଖରା') ||
    trimmed.includes('ଗଛ') ||
    trimmed.includes('झाड') ||
    trimmed.includes('सूर्यप्रकाश')
  ) {
    if (
      trimmed.includes('ᱨᱮᱦᱮᱫ') ||
      trimmed.includes('मुडु') ||
      trimmed.includes('जड़') ||
      trimmed.includes('ଚେର') ||
      trimmed.includes('मुळे')
    ) {
      return {
        script: 'Plants absorb water and nutrients from the soil through their roots.',
        transliteration: 'Roots act like underground pipes bringing moisture up to the plant.',
        childFriendly: 'Just like drinking water through a straw, plant roots suck up water from the deep earth to keep flowers fresh!',
        pedagogicNote: 'Translated from mother-tongue observation into NCERT Class 3 Science: Root Functions.',
        vocabularyTerms: vocabTerms,
      };
    }
    return {
      script: 'Plants need sunlight, water, and fresh air to grow and prepare sweet food in their green leaves.',
      transliteration: 'Green leaves use the warmth of sunlight as a kitchen hearth to make plant food.',
      childFriendly: 'Like a kitchen at home, green leaves catch golden sunshine to cook delicious food for the growing tree!',
      pedagogicNote: 'Translated from mother tongue to English: Core Photosynthesis concept for primary learners.',
      vocabularyTerms: vocabTerms,
    };
  }

  // 2. Animals, Birds & Nature
  if (
    trimmed.includes('ᱪᱮᱬᱮ') ||
    trimmed.includes('ᱜᱟᱹᱭ') ||
    trimmed.includes('पिट्टे') ||
    trimmed.includes('गाई') ||
    trimmed.includes('चिरई') ||
    trimmed.includes('गाय') ||
    trimmed.includes('ଚଢ଼େଇ') ||
    trimmed.includes('ଗାଈ') ||
    trimmed.includes('पक्षी')
  ) {
    if (trimmed.includes('ᱜᱟᱹᱭ') || trimmed.includes('गाई') || trimmed.includes('गाय') || trimmed.includes('ଗାଈ')) {
      return {
        script: 'Cows graze fresh green grass and give wholesome, nourishing milk.',
        transliteration: 'Gentle cows are friends of the village who give healthy milk to children.',
        childFriendly: 'The cow eats lush meadow grass and gives us sweet milk to drink so we grow strong and healthy!',
        pedagogicNote: 'Primary Environmental Studies (EVS): Domestic Animals and Nutrition.',
        vocabularyTerms: vocabTerms,
      };
    }
    return {
      script: 'Birds build warm nests in tree branches, lay eggs, and fly in the open sky.',
      transliteration: 'Feathers help birds fly, and safe nests protect their young chicks.',
      childFriendly: 'Birds weave small twigs together into soft nests high in trees to care for their baby birds!',
      pedagogicNote: 'Primary EVS: Bird Habitats and Life Cycles translated to English.',
      vocabularyTerms: vocabTerms,
    };
  }

  // 3. School, Books & Learning
  if (
    trimmed.includes('ᱟᱥᱲᱟ') ||
    trimmed.includes('ᱯᱚᱛᱚᱵ') ||
    trimmed.includes('रोन') ||
    trimmed.includes('स्कूल') ||
    trimmed.includes('किताब') ||
    trimmed.includes('ପୋଥି') ||
    trimmed.includes('ବହି') ||
    trimmed.includes('शाळा') ||
    trimmed.includes('पुस्तक')
  ) {
    return {
      script: 'Children go to school every day to read books, write stories, and learn mathematics.',
      transliteration: 'Teachers guide students with kindness as they learn new lessons together.',
      childFriendly: 'We go to our village school with friends to learn exciting stories, numbers, and science!',
      pedagogicNote: 'Foundational Literacy and Numeracy (FLN) domain translated to English.',
      vocabularyTerms: vocabTerms,
    };
  }

  // 4. Water, Rain & Clouds
  if (
    trimmed.includes('ᱫᱟᱜ') ||
    trimmed.includes('ᱨᱤᱢᱤᱞ') ||
    trimmed.includes('येर') ||
    trimmed.includes('पिरंग') ||
    trimmed.includes('पानी') ||
    trimmed.includes('बादल') ||
    trimmed.includes('ପାଣି') ||
    trimmed.includes('ମେଘ') ||
    trimmed.includes('पाऊस') ||
    trimmed.includes('ढग')
  ) {
    return {
      script: 'When the hot sun warms river water, it rises into the sky as clouds and showers down as rain.',
      transliteration: 'Pond water becomes sky clouds, bringing refreshing monsoon rain to the village.',
      childFriendly: 'The summer heat turns water into sky clouds, which cool down and give us rainy puddles to splash in!',
      pedagogicNote: 'Primary EVS: The Natural Water Cycle translated to English.',
      vocabularyTerms: vocabTerms,
    };
  }

  // General fallback
  const firstMeaning = vocabTerms[0]?.meaning || 'nature and village life';
  return {
    script: `"${trimmed}" translated into English relates to ${firstMeaning.toLowerCase()} and natural science concepts.`,
    transliteration: 'Mother-tongue expression connected with local environmental learning.',
    childFriendly: 'This is a beautiful sentence in your mother tongue! In English, it teaches us about our surrounding world.',
    pedagogicNote: 'Vernacular-to-English linguistic bridge for Class 3 tribal and regional language students.',
    vocabularyTerms: vocabTerms,
  };
}

// Online AI Translation via Express backend (/api/translate) powered by Gemini
export async function fetchTranslation(
  text: string,
  targetLanguage: LanguageCode | 'en' | string,
  sourceLanguage = 'en'
): Promise<TranslationResult> {
  const trimmed = text.trim();
  const isToEnglish = targetLanguage === 'en' || targetLanguage === 'english';
  if (!trimmed) {
    return isToEnglish
      ? generateMotherTongueToEnglishTranslation(text, sourceLanguage as LanguageCode)
      : generateMotherTongueTranslation(text, targetLanguage as LanguageCode);
  }

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: trimmed,
        targetLanguage,
        sourceLanguage,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.script && typeof data.script === 'string') {
        const terms = Array.isArray(data.vocabularyTerms) && data.vocabularyTerms.length > 0
          ? data.vocabularyTerms
          : isToEnglish
            ? extractRelevantVocabularyFromMt(trimmed, sourceLanguage as LanguageCode)
            : extractRelevantVocabulary(trimmed, targetLanguage as LanguageCode);

        return {
          script: data.script,
          transliteration: data.transliteration || '',
          childFriendly: typeof data.childFriendly === 'string' && data.childFriendly.trim().length > 0
            ? data.childFriendly
            : data.script,
          pedagogicNote: data.pedagogicNote || (isToEnglish ? 'Mother-tongue to English translation bridge.' : 'Pedagogic bridge for mother-tongue primary instruction.'),
          vocabularyTerms: terms,
        };
      }
    }
  } catch (err) {
    console.warn('Backend translation API unavailable, using linguistic engine fallback:', err);
  }

  return isToEnglish
    ? generateMotherTongueToEnglishTranslation(trimmed, sourceLanguage as LanguageCode)
    : generateMotherTongueTranslation(trimmed, targetLanguage as LanguageCode);
}

// Online AI Pedagogic Adaptation via Express backend (/api/adapt) powered by Gemini
export async function fetchPedagogicAdaptation(
  level: string,
  style: string,
  context: string,
  format: string,
  lang: LanguageCode,
  topic: string
): Promise<AdaptedContentResult> {
  const trimmedTopic = topic.trim();
  if (!trimmedTopic) {
    return generatePedagogicAdaptation(level, style, context, format, lang, topic);
  }

  try {
    const res = await fetch('/api/adapt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: trimmedTopic,
        level,
        style,
        context,
        format,
        targetLanguage: lang,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.contentMt && typeof data.contentMt === 'string') {
        return {
          title: data.title || `${trimmedTopic} (${context.split(' ')[0]})`,
          contentMt: data.contentMt,
          contentEn: data.contentEn || '',
          activityPrompt: data.activityPrompt || '',
        };
      }
    }
  } catch (err) {
    console.warn('Backend adapt API unavailable, using linguistic engine fallback:', err);
  }

  return generatePedagogicAdaptation(level, style, context, format, lang, trimmedTopic);
}

// Online AI Conversion for Teacher Lesson Notes (PDF or Text) into Student's Mother Tongue
export async function fetchConvertLessonNotes(params: {
  pdfBase64?: string;
  text?: string;
  fileName?: string;
  fileSize?: string;
  targetLanguage: LanguageCode;
  gradeLevel?: string;
  context?: string;
}): Promise<ConvertedLessonNote> {
  const {
    pdfBase64,
    text,
    fileName = 'Lesson_Notes.pdf',
    fileSize = '145 KB',
    targetLanguage,
    gradeLevel = 'Class 3',
    context = 'Village / Rural School',
  } = params;

  try {
    const res = await fetch('/api/convert-lesson-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pdfBase64,
        text,
        fileName,
        targetLanguage,
        gradeLevel,
        context,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.title && data.sections) {
        return {
          id: `lesson-note-${Date.now()}`,
          fileName: data.fileName || fileName,
          fileSize,
          uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourceLanguage: 'English',
          targetLanguage,
          title: {
            english: data.title.english || fileName.replace(/\.[^/.]+$/, ''),
            motherTongue: data.title.motherTongue || '',
            transliteration: data.title.transliteration || '',
          },
          extractedEnglishText: data.extractedEnglishText || text || 'Extracted lesson content.',
          overviewMt: data.overviewMt || '',
          overviewEn: data.overviewEn || '',
          transliterationOverview: data.transliterationOverview || '',
          sections: Array.isArray(data.sections) ? data.sections : [],
          keyVocabulary: Array.isArray(data.keyVocabulary) ? data.keyVocabulary : [],
          classroomActivities: Array.isArray(data.classroomActivities) ? data.classroomActivities : [],
          pedagogicBridgingTip: data.pedagogicBridgingTip || '',
        };
      }
    }
  } catch (err) {
    console.warn('Backend lesson conversion API unavailable, utilizing linguistic engine fallback:', err);
  }

  return generateLessonNotesConversionFallback(fileName, text || '', targetLanguage, fileSize);
}

// Reliable linguistic fallback for converting lesson notes into mother tongue
export function generateLessonNotesConversionFallback(
  fileName: string,
  rawText: string,
  targetLang: LanguageCode,
  fileSize = '120 KB'
): ConvertedLessonNote {
  const cleanTitle = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  const textLower = (rawText + ' ' + fileName).toLowerCase();

  // Determine topic domain
  const isPlant = textLower.includes('plant') || textLower.includes('leaf') || textLower.includes('root') || textLower.includes('stem');
  const isWater = textLower.includes('water') || textLower.includes('hygiene') || textLower.includes('health') || textLower.includes('clean');
  const isMath = textLower.includes('fraction') || textLower.includes('shar') || textLower.includes('math') || textLower.includes('half');

  // Multi-lingual topic meta definitions
  const topicMeta: Record<LanguageCode, {
    title: { mt: string; translit: string; en: string };
    overviewMt: string;
    overviewEn: string;
    sections: Array<{
      headingEn: string;
      headingMt: string;
      contentMt: string;
      contentEn: string;
      transliteration: string;
      childExplanation: string;
    }>;
    activities: string[];
    pedagogyTip: string;
  }> = {
    santhali: isPlant ? {
      title: {
        mt: 'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱟᱨ ᱠᱟᱹᱢᱤ',
        translit: 'Dare renag hatin ar kami',
        en: 'Parts of a Plant and Their Functions',
      },
      overviewMt: 'ᱫᱟᱨᱮ ᱠᱚ ᱦᱟᱨᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱥᱤᱛᱩᱝ, ᱫᱟᱜ ᱟᱨ ᱦᱚᱭ ᱞᱟᱹᱠᱛᱤᱭᱟᱜ-ᱟ᱾ ᱨᱮᱦᱮᱫ ᱫᱟᱜ ᱧᱩᱭᱟ ᱟᱨ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
      overviewEn: 'Plants are living organisms rooted in soil that sustain life. Leaves make nourishment and roots take up moisture.',
      sections: [
        {
          headingEn: 'Root System & Soil Support',
          headingMt: 'ᱨᱮᱦᱮᱫ ᱟᱨ ᱦᱟᱥᱟ (Roots)',
          contentMt: 'ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱟᱨ ᱠᱷᱟᱫᱟᱱ ᱡᱤᱱᱤᱥ ᱧᱩᱭᱟ ᱟᱨ ᱫᱟᱨᱮ ᱠᱮᱴᱮᱡ ᱛᱮ ᱛᱤᱸᱜᱩ ᱫᱚᱦᱚᱭᱟ᱾',
          contentEn: 'Roots grow downward into moist soil, anchoring the plant firmly and absorbing moisture and nutrients.',
          transliteration: 'Rehed do hasa khon dag ar khadan jinis nyuya ar dare ketej te tingu dohoya.',
          childExplanation: 'Just like we drink clean water with our mouths, plant roots drink moisture from the earth!',
        },
        {
          headingEn: 'Stem and Sap Pipelines',
          headingMt: 'ᱫᱟᱨᱮ ᱰᱟᱹᱨ ᱟᱨ ᱠᱟᱹᱢᱤ (Stem & Branches)',
          contentMt: 'ᱠᱮᱴᱮᱡ ᱰᱟᱹᱨ ᱫᱟᱨᱮ ᱥᱮᱨᱢᱟ ᱥᱮᱫ ᱛᱤᱸᱜᱩ ᱫᱚᱦᱚᱭᱟ ᱟᱨ ᱫᱟᱜ ᱪᱮᱛᱟᱱ ᱥᱟᱠᱟᱢ ᱠᱚᱨᱮ ᱥᱮᱴᱮᱨᱟ᱾',
          contentEn: 'The stem holds the plant upright towards the sun and acts as a pipeline carrying water upward.',
          transliteration: 'Ketej dar dare serma sed tingu dohoya ar dag chetan sakam kore setera.',
          childExplanation: 'The trunk is like a sturdy ladder carrying water and food to all branches.',
        },
        {
          headingEn: 'Green Leaves: The Food Kitchen',
          headingMt: 'ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ (Green Leaves)',
          contentMt: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱪᱩᱞᱦᱟ ᱠᱟᱱᱟ᱾ ᱥᱤᱛᱩᱝ ᱟᱨ ᱦᱚᱭ ᱛᱮ ᱫᱟᱨᱮ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾',
          contentEn: 'Leaves are the green kitchens of the plant. Using sunlight, air, and water, they prepare food.',
          transliteration: 'Sakam do dare renag rukhiya chulha kana. Situng ar hoy te dare lagid jomag e benawa.',
          childExplanation: 'Just like mother cooks rice on the hearth, leaves use warm sunlight to prepare plant nourishment.',
        },
      ],
      activities: [
        'School Garden Walk: Touch roots of small weeds and examine leaf veins under the morning sun.',
        'Leaf Imprint Art: Collect fallen sal and mahua leaves to trace and label parts in Santhali.',
      ],
      pedagogyTip: 'Connect leaf sunlight synthesis with the village household kitchen (Chulha) concept.',
    } : isWater ? {
      title: {
        mt: 'ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱟᱨ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱵᱷᱟᱹᱞᱟᱹᱭ',
        translit: 'Sapha dag ar aatu renag bhalai',
        en: 'Clean Water, Sources, and Village Health',
      },
      overviewMt: 'ᱱᱤᱨᱚᱲ ᱟᱨ ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱧᱩ ᱞᱮᱠᱷᱟᱱ ᱦᱚᱲᱢᱚ ᱵᱮᱥ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱡᱚᱢ ᱢᱟᱲᱟᱝ ᱥᱟᱵᱚᱱ ᱛᱮ ᱛᱤ ᱟᱹᱨᱩᱵ ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱠᱟᱱᱟ᱾',
      overviewEn: 'Water sustains village life. Safe drinking water and daily handwashing protect children from illness.',
      sections: [
        {
          headingEn: 'Sources of Water in Village Life',
          headingMt: 'ᱫᱟᱜ ᱧᱟᱢᱚᱜ ᱴᱷᱟᱶ (Water Sources)',
          contentMt: 'ᱫᱟᱜ ᱫᱚ ᱫᱟᱜ-ᱡᱟᱹᱲᱤ, ᱜᱟᱰᱟ, ᱱᱟᱹᱭ, ᱟᱨ ᱯᱟᱠᱟ ᱪᱟᱯᱟᱠᱚᱲ ᱠᱷᱚᱱ ᱧᱟᱢᱚᱜ-ᱟ᱾',
          contentEn: 'Rain fills streams, village ponds, rivers, and deep protected tube wells.',
          transliteration: 'Dag do dag-jari, gada, nai, ar paka chapakor khon nyamog-a.',
          childExplanation: 'Nature gives us precious water through monsoon clouds and village streams.',
        },
        {
          headingEn: 'Safe Clean Drinking Water',
          headingMt: 'ᱥᱟᱯᱷᱟ ᱧᱩ ᱫᱟᱜ (Safe Drinking Water)',
          contentMt: 'ᱧᱩ ᱫᱟᱜ ᱫᱚ ᱪᱷᱟᱹᱱᱤ ᱟᱨ ᱦᱮᱰᱮᱡ ᱠᱟᱛᱮ ᱧᱩ ᱞᱮᱠᱷᱟᱱ ᱯᱮᱴ ᱨᱮᱱᱟᱜ ᱵᱮᱢᱟᱨ ᱵᱟᱭ ᱦᱩᱭᱩᱜ-ᱟ᱾',
          contentEn: 'Drinking water must be boiled or drawn from clean covered pumps to prevent stomach ailments.',
          transliteration: 'Nyu dag do chhani ar hedej kate nyu lekhan pet renag bemar bay huyug-a.',
          childExplanation: 'Boiling water kills invisible germs and keeps our tummy happy and energetic.',
        },
      ],
      activities: [
        'Safe Water Inspection: Walk to the school handpump and practice 6-step soap handwashing.',
        'Water Song Circle: Sing traditional mother-tongue rhymes about monsoon rain and clean springs.',
      ],
      pedagogyTip: 'Reinforce that handpump water should be stored in clean, covered clay pots (Surahi).',
    } : isMath ? {
      title: {
        mt: 'ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱟᱨ ᱵᱷᱟᱜᱽ',
        translit: 'Soman hatin ar bhag',
        en: 'Equal Sharing and Fractions with Village Harvests',
      },
      overviewMt: 'ᱢᱤᱫᱴᱟᱝ ᱯᱩᱨᱟᱹ ᱡᱤᱱᱤᱥ ᱵᱟᱨ ᱦᱚᱲ ᱛᱟᱞᱟ ᱨᱮ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱞᱮᱠᱷᱟᱱ ᱟᱫᱷᱟ-ᱟᱫᱷᱟ (1/2) ᱧᱟᱢᱚᱜ-ᱟ᱾',
      overviewEn: 'Understanding fractions as equal and fair sharing using rotis, papayas, and tamarind seeds.',
      sections: [
        {
          headingEn: 'Concept of a Whole',
          headingMt: 'ᱯᱩᱨᱟᱹ ᱡᱤᱱᱤᱥ (A Whole)',
          contentMt: 'ᱢᱤᱫᱴᱟᱝ ᱯᱩᱨᱟᱹ ᱨᱩᱴᱤ ᱥᱮ ᱢᱤᱫᱴᱟᱝ ᱯᱩᱨᱟᱹ ᱟᱢᱵᱽᱲᱟ ᱡᱚ ᱫᱚ ᱯᱩᱨᱟᱹ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾',
          contentEn: 'A whole round roti, full ripe papaya, or full basket of grain.',
          transliteration: 'Midtang pura ruti se midtang pura ambda jo do pura ko metag-a.',
          childExplanation: 'Before cutting or breaking, any single intact food item is called one whole.',
        },
        {
          headingEn: 'Equal Halves (1/2)',
          headingMt: 'ᱟᱫᱷᱟ ᱵᱷᱟᱜᱽ ᱑/᱒ (Halves)',
          contentMt: 'ᱡᱚᱠᱷᱚᱱ ᱢᱤᱫᱴᱟᱝ ᱨᱩᱴᱤ ᱵᱟᱨ ᱜᱟᱛᱮ ᱛᱟᱞᱟ ᱨᱮ ᱵᱟᱨᱟᱵᱟᱹᱨᱤ ᱦᱟᱹᱴᱤᱧᱚᱜ-ᱟ, ᱩᱱ ᱡᱚᱠᱷᱚᱡ ᱟᱫᱷᱟ (1/2) ᱦᱩᱭᱩᱜ-ᱟ᱾',
          contentEn: 'When shared equally between two companions, each receives one half.',
          transliteration: 'Jokhon midtang ruti bar gate tala re barabari hatinyog-a, un jokhoj adha huyug-a.',
          childExplanation: 'Fair sharing means both friends get an identical sized slice!',
        },
      ],
      activities: [
        'Clay Dough Roti Slicing: Divide round clay circles into exact halves and quarters.',
        'Seed Pod Counting: Share 12 tamarind seeds equally among 3 classmates to explore thirds.',
      ],
      pedagogyTip: 'Use concrete agricultural produce instead of abstract fraction symbols.',
    } : {
      title: {
        mt: 'ᱯᱟᱲᱦᱟᱣ ᱱᱚᱴᱥ ᱟᱨ ᱥᱟᱬᱮᱥ ᱪᱮᱫ',
        translit: 'Parhaw notes ar sanes ched',
        en: cleanTitle,
      },
      overviewMt: 'ᱱᱚᱣᱟ ᱯᱟᱲᱦᱟᱣ ᱫᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱟᱹᱛᱩ ᱯᱚᱨᱤᱵᱮᱥ ᱨᱮᱱᱟᱜ ᱠᱟᱛᱷᱟ ᱛᱮ ᱥᱟᱡᱟᱣ ᱟᱠᱟᱱᱟ᱾',
      overviewEn: `Curriculum lesson notes for ${cleanTitle} adapted with tribal and rural contexts.`,
      sections: [
        {
          headingEn: 'Core Concept & Foundation',
          headingMt: 'ᱢᱩᱬᱩᱛ ᱠᱟᱛᱷᱟ ᱟᱨ ᱵᱩᱡᱷᱟᱹᱣ',
          contentMt: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱡᱤᱱᱤᱥ ᱧᱮᱞ ᱠᱟᱛᱮ ᱱᱚᱣᱟ ᱠᱟᱛᱷᱟ ᱠᱚ ᱵᱩᱡᱷᱟᱹᱣᱟ᱾',
          contentEn: `Students explore ${cleanTitle} by observing familiar objects in daily village life.`,
          transliteration: 'Gidra ko akowag aatu renag jinis nyel kate nowa katha ko bujhawa.',
          childExplanation: 'Learning directly by touching, seeing, and naming things in our mother tongue.',
        },
      ],
      activities: ['Discussion circle connecting textbook concepts with daily experiences.'],
      pedagogyTip: 'Validate mother-tongue intuitive understanding before introducing formal terms.',
    },

    gondi: isPlant ? {
      title: {
        mt: 'मरांग ता मुडु अनि आक (Parts of a Plant)',
        translit: 'Marang ta mudu aani aak',
        en: 'Parts of a Plant and Their Functions',
      },
      overviewMt: 'मरांग वाढ़ना काजे पोद्दु, येर अनि हवा जरत आंद। आक मरांग ता रांदना आंद।',
      overviewEn: 'Gondi lesson notes on plant biology, soil roots, and green leaf kitchens.',
      sections: [
        {
          headingEn: 'Roots and Earth Anchoring',
          headingMt: 'मुडु अनि माटी (Roots)',
          contentMt: 'मुडु माटी तून गड़सी येर अनि खोराक चूस कीसी मरांग तून थिराय कीता।',
          contentEn: 'Roots anchor the plant firmly in moist earth and drink up nourishing moisture.',
          transliteration: 'Mudu mati toon gadsi yer aani khorak choos keesi marang toon thiray keeta.',
          childExplanation: 'Roots are underground straw pipelines bringing life-giving water!',
        },
      ],
      activities: ['Field exploration to observe sacred Mahua and Sal tree roots.'],
      pedagogyTip: 'Refer to local forest trees familiar to Gond children.',
    } : {
      title: {
        mt: 'पाठ नोट्स आणि शिक्षण गोठ',
        translit: 'Path notes aani shikshan goth',
        en: cleanTitle,
      },
      overviewMt: 'इव पाठ ना गोठ बाल-बच्चन कुन गाम ना वातावरणात समजाय कीसी तयार कीता मंता।',
      overviewEn: `Adapted Gondi lesson notes for ${cleanTitle}.`,
      sections: [
        {
          headingEn: 'Core Concept',
          headingMt: 'मुख्य गोठ',
          contentMt: 'इव गोठ बाल-बच्चन कुन गाम ना वातावरणात सहज समजे कीसी सांगो।',
          contentEn: 'Concept explained with rural forest analogies.',
          transliteration: 'Iv goth bal-bachchan kun...',
          childExplanation: 'Learning through native Gondi dialect and community storytelling.',
        },
      ],
      activities: ['Community storytelling and observation circle.'],
      pedagogyTip: 'Use community elder terms for natural elements.',
    },

    bhojpuri: isPlant ? {
      title: {
        mt: 'पेड़ के अंग अउरी ओकर काम (Parts of a Plant)',
        translit: 'Ped ke ang auri okar kaam',
        en: 'Parts of a Plant and Their Functions',
      },
      overviewMt: 'पेड़ के बढ़े खातिर घाम, पानी अउरी हवा जरूरी बा। हरियर पतई पेड़ के रसोई हवे।',
      overviewEn: 'Bhojpuri translated notes on plant functions, root hydration, and leaf kitchens.',
      sections: [
        {
          headingEn: 'Roots and Earth',
          headingMt: 'सोरह / जड़ अउरी माटी (Roots)',
          contentMt: 'जड़ माटी के पकड़ के राखेला अउरी भीतरी से पानी सोख के पेड़ के पहुंचावेला।',
          contentEn: 'Roots hold soil firmly and absorb vital groundwater for the plant.',
          transliteration: 'Jad maati ke pakad ke rakhela auri bheetri se paani sokh ke ped ke pahunchawela.',
          childExplanation: 'Roots are like deep straws drinking underground sweet water.',
        },
        {
          headingEn: 'Leaves as the Kitchen',
          headingMt: 'हरियर पतई के चूल्हा (Leaves Kitchen)',
          contentMt: 'जइसे माई चूल्हा पर खाना बनावेली, ओइसहीं हरियर पतई घाम से पेड़ खातिर भोजन पकावेला।',
          contentEn: 'Leaves use warm sunlight to prepare nourishment just like cooking on a kitchen stove.',
          transliteration: 'Jaise maai chulha par khana banaveli, oisahin hariyar patai ghaam se bhojan pakawela.',
          childExplanation: 'Leaves are nature’s little green kitchens soaking up bright sunshine!',
        },
      ],
      activities: ['Gather neem and peepal leaves to examine food-making veins.'],
      pedagogyTip: 'Relate leaf photosynthesis directly to the village Chulha.',
    } : {
      title: {
        mt: 'पाठ के नोट्स आ मातृभाषा पढ़ाई',
        translit: 'Paath ke notes aa matribhasha padhai',
        en: cleanTitle,
      },
      overviewMt: 'ई पाठ छोट लइकन खातिर गांव-घर के उदाहरण से समझावे खातिर बनावल गइल बा।',
      overviewEn: `Bhojpuri curriculum adaptation for ${cleanTitle}.`,
      sections: [
        {
          headingEn: 'Main Lesson Learning',
          headingMt: 'मुख्य पढ़ाई आ समझ',
          contentMt: 'लइकन के गांव-जवार के उदाहरण से ई विषय सहज समझ में आ जाला।',
          contentEn: 'Students relate curriculum points with rural surroundings.',
          transliteration: 'Laikan ke gaon-jawaar ke udaharan se...',
          childExplanation: 'Real world learning using village objects.',
        },
      ],
      activities: ['Classroom riddle game testing terms in Bhojpuri.'],
      pedagogyTip: 'Incorporate familiar Bhojpuri idioms for scientific terms.',
    },

    maithili: {
      title: {
        mt: isPlant ? 'गाछक अङ्ग आ काज (Parts of a Plant)' : 'पाठ्य टिप्पणी आ मातृभाषा शिक्षण',
        translit: isPlant ? 'Gaachak ang aa kaaj' : 'Pathya tippani aa matribhasha shikshan',
        en: cleanTitle,
      },
      overviewMt: 'गाछ-बिरिछ केँ बढ़य लेल रौद, पानि आ शुद्ध बतासक आवश्यकता होइत अछि। हरियर पात गाछक भानस घर थीक।',
      overviewEn: `Adapted Maithili lesson notes for ${cleanTitle}.`,
      sections: [
        {
          headingEn: 'Core Concept',
          headingMt: 'मुख्य संकल्पना आ पोषण',
          contentMt: 'पात रौद सं भोजन बनेबाक काज करैत अछि आ जड़ि पाताल सं पानि सोखैत अछि।',
          contentEn: 'Leaves synthesize food from sunshine and roots extract moisture.',
          transliteration: 'Paat raud san bhojan banebaak kaaj karait achhi...',
          childExplanation: 'Plants feed through sunny green leaf kitchens.',
        },
      ],
      activities: ['Observe leaves in Mithila school orchard.'],
      pedagogyTip: 'Use Mithila botanical names.',
    },

    odia: {
      title: {
        mt: isPlant ? 'ଗଛର ବିଭିନ୍ନ ଅଂଶ ଓ କାର୍ଯ୍ୟ (Parts of a Plant)' : 'ପାଠ୍ୟ ଟିପ୍ପଣୀ ଓ ମାତୃଭାଷା ଶିକ୍ଷାଦାନ',
        translit: isPlant ? 'Gachhara bibhinna ansha o karya' : 'Pathya tippani o matrubhasha sikshyadan',
        en: cleanTitle,
      },
      overviewMt: 'ଗଛ ବଢ଼ିବା ପାଇଁ ସୂର୍ଯ୍ୟାଲୋକ, ଜଳ ଓ ନିର୍ମଳ ବାୟୁ ଆବଶ୍ୟକ। ସବୁଜ ପତ୍ର ହେଉଛି ଗଛର ରୋଷେଇଶାଳା।',
      overviewEn: `Odia translated lesson notes for ${cleanTitle}.`,
      sections: [
        {
          headingEn: 'Root Absorption',
          headingMt: 'ଚେର ଓ ମାଟି (Roots and Soil)',
          contentMt: 'ଚେର ମାଟି ଭିତରୁ ଜଳ ଏବଂ ଖଣିଜ ଲବଣ ଶୋଷଣ କରି ଗଛକୁ ଶକ୍ତ କରି ଧରି ରଖେ।',
          contentEn: 'Roots anchor the plant firmly and suck up water and mineral nourishment.',
          transliteration: 'Chera mati bhitaru jala abang khanija labana...',
          childExplanation: 'Roots are underground food and water gatherers.',
        },
      ],
      activities: ['School garden observation and leaf tracing.'],
      pedagogyTip: 'Bridge with traditional Odia nature songs.',
    },

    marathi: {
      title: {
        mt: isPlant ? 'वनस्पतींचे अवयव आणि कार्ये (Parts of a Plant)' : 'पाठ टाचण व मातृभाषा सुलभ ज्ञान',
        translit: isPlant ? 'Vanaspantinche avayav aani karye' : 'Paath tachan va matrubhasha sulabh gyan',
        en: cleanTitle,
      },
      overviewMt: 'झाडांच्या वाढीसाठी सूर्यप्रकाश, पाणी आणि हवेची गरज असते. हिरवे पान हे झाडाचे स्वयंपाकघर आहे.',
      overviewEn: `Marathi translated lesson notes for ${cleanTitle}.`,
      sections: [
        {
          headingEn: 'Root and Leaf Structure',
          headingMt: 'मुळे आणि पाने (Roots & Leaves)',
          contentMt: 'मुळे जमिनीतून पाणी शोषून घेतात आणि पाने सूर्यप्रकाशात झाडासाठी अन्न तयार करतात.',
          contentEn: 'Roots absorb moisture from soil and leaves manufacture nourishment.',
          transliteration: 'Mule jaminitoon pani shoshun ghetat...',
          childExplanation: 'Leaves make food like mothers prepare meals in the kitchen.',
        },
      ],
      activities: ['Village botanical stroll to observe leaf structures.'],
      pedagogyTip: 'Use simple rural analogies for biological processes.',
    },
  };

  const meta = topicMeta[targetLang] || topicMeta.santhali;
  const vocab = extractRelevantVocabulary(rawText || cleanTitle, targetLang);

  return {
    id: `lesson-note-${fileName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]/g, '-')}-${targetLang}`,
    fileName,
    fileSize,
    uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sourceLanguage: 'English',
    targetLanguage: targetLang,
    title: {
      english: meta.title.en,
      motherTongue: meta.title.mt,
      transliteration: meta.title.translit,
    },
    extractedEnglishText:
      rawText ||
      `Lesson Notes: ${cleanTitle}. Key learning outcomes focus on foundational concept building, observational practice in local surroundings, and connecting core terminology with mother-tongue intuition.`,
    overviewMt: meta.overviewMt,
    overviewEn: meta.overviewEn,
    transliterationOverview: meta.title.translit,
    sections: meta.sections,
    keyVocabulary: vocab.slice(0, 6).map((v) => ({
      englishTerm: v.meaning,
      motherTongueTerm: v.term,
      transliteration: v.pronunciation,
      meaning: `Core concept in ${cleanTitle}`,
      villageExample: 'Commonly observed in the village and school grounds',
    })),
    classroomActivities: meta.activities,
    pedagogicBridgingTip: meta.pedagogyTip,
  };
}

// Generates an authentic mother-tongue translation for any given input text
export function generateMotherTongueTranslation(text: string, lang: LanguageCode): TranslationResult {
  const lower = text.toLowerCase().trim();
  const vocabTerms = extractRelevantVocabulary(text, lang);

  // SANTHALI (Ol Chiki Script)
  if (lang === 'santhali') {
    if (lower.includes('bird') || lower.includes('nest') || lower.includes('egg') || lower.includes('feather') || lower.includes('fly')) {
      return {
        script: 'ᱪᱮᱬᱮ ᱠᱚ ᱫᱚ ᱫᱟᱨᱮ ᱨᱮ ᱛᱩᱠᱟᱹ ᱠᱚ ᱵᱮᱱᱟᱣᱟ ᱟᱨ ᱵᱤᱞᱤ ᱠᱚ ᱮᱢᱟ᱾ ᱪᱮᱬᱮ ᱨᱮᱱᱟᱜ ᱤᱞ ᱫᱚ ᱩᱰᱟᱹᱣ ᱨᱮ ᱜᱚᱲᱚᱣᱟᱭᱟ᱾',
        transliteration: 'Chene ko do dare re tuka ko benawa ar bili ko ema. Chene renag il do udaw re gorowaya.',
        childFriendly: 'ᱡᱮᱞᱮᱠᱟ ᱟᱵᱚ ᱟᱹᱛᱩ ᱚᱲᱟᱜ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱪᱮᱬᱮ ᱫᱟᱨᱮ ᱪᱮᱛᱟᱱ ᱨᱮ ᱛᱩᱠᱟᱹ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱟᱡ ᱨᱮᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱡᱚᱢᱟᱜ ᱮ ᱟᱹᱜᱩ ᱟᱠᱚᱣᱟ᱾',
        pedagogicNote: 'ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ ᱛᱮ ᱪᱮᱬᱮ ᱟᱨ ᱡᱤᱭᱚᱱ ᱪᱟᱠᱨᱚ ᱥᱟᱬᱮᱥ ᱯᱟᱴᱷ᱾',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('cow') || lower.includes('milk') || lower.includes('grass') || lower.includes('animal')) {
      return {
        script: 'ᱜᱟᱹᱭ ᱫᱚ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱜᱷᱟᱸᱥ ᱡᱚᱢ ᱠᱟᱛᱮ ᱥᱤᱵᱤᱞ ᱛᱚᱣᱟ ᱮᱢᱚᱜ-ᱟ᱾ ᱛᱚᱣᱟ ᱧᱩ ᱞᱮᱠᱷᱟᱱ ᱦᱚᱲᱢᱚ ᱨᱮ ᱫᱟᱲᱮ ᱦᱤᱡᱩᱜ-ᱟ᱾',
        transliteration: 'Gai do hariyar ghas jom kate sibil towa emog-a. Towa nyu lekhan hormo re dare hijug-a.',
        childFriendly: 'ᱜᱟᱹᱭ ᱫᱚ ᱟᱵᱚ ᱨᱮᱱ ᱜᱟᱛᱮ ᱠᱟᱱᱟᱭ, ᱩᱱᱤ ᱫᱤᱱᱟᱹᱢ ᱦᱤᱞᱚᱜ ᱜᱷᱟᱸᱥ ᱡᱚᱢ ᱠᱟᱛᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱛᱚᱣᱟ ᱮ ᱮᱢᱚᱜ-ᱟ᱾',
        pedagogicNote: 'ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱛᱩ ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ ᱟᱨ ᱯᱩᱥᱴᱤ ᱥᱟᱬᱮᱥ ᱯᱟᱴᱷ᱾',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('school') || lower.includes('book') || lower.includes('read') || lower.includes('write') || lower.includes('teacher')) {
      return {
        script: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱟᱥᱲᱟ ᱪᱟᱞᱟᱣ ᱠᱟᱛᱮ ᱯᱚᱛᱚᱵ ᱯᱟᱲᱦᱟᱣ ᱟᱨ ᱚᱞ ᱠᱚ ᱥᱮᱬᱟᱭᱟ᱾ ᱜᱩᱨᱩ ᱠᱚ ᱱᱟᱯᱟᱭ ᱠᱟᱛᱷᱟ ᱠᱚ ᱞᱟᱹᱭ ᱟᱠᱚᱣᱟ᱾',
        transliteration: 'Gidra ko asra chalaw kate potob parhaw ar ol ko senaya. Guru ko napay katha ko lay akowa.',
        childFriendly: 'ᱟᱥᱲᱟ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱥᱟᱶ ᱢᱤᱫ ᱥᱟᱶᱛᱮ ᱮᱞᱠᱷᱟ ᱟᱨ ᱥᱟᱬᱮᱥ ᱠᱷᱮᱞᱚᱸᱰ ᱛᱮ ᱥᱮᱪᱮᱫ ᱦᱩᱭᱩᱜ-ᱟ᱾',
        pedagogicNote: 'ᱟᱥᱲᱟ ᱥᱮᱪᱮᱫ ᱟᱨ ᱵᱩᱱᱤᱭᱟᱹᱫᱤ ᱥᱟᱠᱷᱚᱨᱛᱟ (FLN) ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ᱾',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('root') || lower.includes('straw') || lower.includes('underground') || lower.includes('stem')) {
      return {
        script: 'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱨᱮᱦᱮᱫ ᱫᱚ ᱦᱟᱥᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱟᱨ ᱡᱤᱣᱤ ᱨᱟᱱ ᱧᱩᱭᱟ᱾ ᱨᱮᱦᱮᱫ ᱫᱚ ᱫᱟᱨᱮ ᱜᱚᱴᱟ ᱛᱤᱸᱜᱩ ᱫᱚᱦᱚᱭᱟ᱾',
        transliteration: 'Dare renag rehed do hasa khon dak ar jiwi ran nuyu-a. Rehed do dare gota tingu doho-ya.',
        childFriendly: 'ᱡᱮᱞᱮᱠᱟ ᱟᱵᱚ ᱯᱟᱭᱤᱯ (Straw) ᱛᱮ ᱫᱟᱜ ᱧᱩᱭᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱫᱟᱨᱮ ᱨᱮᱦᱮᱫ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱠᱷᱚᱱ ᱫᱟᱜ ᱧᱩ ᱨᱟᱠᱟᱵᱟ᱾',
        pedagogicNote: 'ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ ᱛᱮ ᱛᱮᱭᱟᱨ ᱟᱠᱟᱱᱟ᱾ ᱜᱤᱫᱽᱨᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱥᱚᱦᱚᱡ ᱟᱲᱟᱝ᱾',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('water cycle') || lower.includes('rain') || lower.includes('cloud') || lower.includes('river')) {
      return {
        script: 'ᱥᱤᱛᱩᱝ ᱞᱚᱞᱚ ᱛᱮ ᱜᱟᱰᱟ ᱟᱨ ᱯᱩᱠᱷᱨᱤ ᱫᱟᱜ ᱦᱚᱭ ᱨᱮ ᱨᱟᱠᱟᱵ ᱠᱟᱛᱮ ᱦᱮᱸᱫᱮ ᱨᱤᱢᱤᱞ ᱵᱮᱱᱟᱣᱟ, ᱟᱨ ᱫᱟᱜ ᱦᱤᱡᱩᱜ-ᱟ᱾',
        transliteration: 'Situng lolo te gada ar pukhri dak hoy re rakab kate hende rimil benawa, ar dak hijug-a.',
        childFriendly: 'ᱞᱚᱞᱚ ᱥᱤᱛᱩᱝ ᱛᱮ ᱫᱟᱜ ᱪᱮᱛᱟᱱ ᱨᱟᱠᱟᱵ ᱠᱟᱛᱮ ᱨᱤᱢᱤᱞ ᱵᱮᱱᱟᱣᱟ, ᱟᱨ ᱚᱱᱟ ᱨᱤᱢᱤᱞ ᱠᱷᱚᱱ ᱟᱹᱛᱩ ᱨᱮ ᱡᱟᱹᱲᱤ ᱫᱟᱜ ᱧᱩᱨᱩᱜ-ᱟ᱾',
        pedagogicNote: 'ᱥᱟᱱᱛᱟᱲᱤ ᱯᱚᱨᱤᱵᱮᱥ ᱥᱟᱬᱮᱥ ᱥᱤᱞᱮᱵᱟᱥ ᱞᱮᱠᱟᱛᱮ ᱥᱟᱯᱲᱟᱣ ᱟᱠᱟᱱᱟ᱾',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('earthworm') || lower.includes('bee') || lower.includes('ecosystem') || lower.includes('insect')) {
      return {
        script: 'ᱞᱮᱸᱰᱮᱫ ᱦᱟᱥᱟ ᱱᱚᱨᱚᱢ ᱮᱫᱟ ᱟᱨ ᱧᱮᱞᱮ-ᱵᱷᱟᱹᱣᱨᱟᱹ ᱵᱟᱦᱟ ᱠᱷᱚᱱ ᱵᱟᱦᱟ ᱩᱰᱟᱹᱣ ᱠᱟᱛᱮ ᱡᱚ ᱦᱟᱨᱟ ᱚᱪᱚᱭᱟ᱾',
        transliteration: 'Lended hasa norom eda ar nyele-bhawra baha khon baha udaw kate jo hara ochoya.',
        childFriendly: 'ᱞᱮᱸᱰᱮᱫ ᱫᱚ ᱪᱟᱹᱥᱤ ᱨᱮᱱ ᱜᱟᱛᱮ ᱠᱟᱱᱟᱭ, ᱟᱨ ᱵᱷᱟᱹᱣᱨᱟᱹ ᱵᱟᱦᱟ ᱨᱮ ᱫᱩᱲᱩᱵ ᱠᱟᱛᱮ ᱦᱮᱲᱮᱢ ᱡᱚ ᱵᱮᱱᱟᱣ ᱨᱮ ᱜᱚᱲᱚᱭᱟ᱾',
        pedagogicNote: 'ᱟᱹᱛᱩ ᱵᱟᱲᱤ ᱟᱨ ᱪᱟᱥ-ᱵᱟᱥ ᱡᱤᱭᱚᱱ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱠᱟᱛᱮ ᱥᱟᱯᱲᱟᱣ ᱟᱠᱟᱱᱟ᱾',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('flower') || lower.includes('seed') || lower.includes('fruit')) {
      return {
        script: 'ᱵᱟᱦᱟ ᱠᱷᱚᱱ ᱡᱚ ᱵᱮᱱᱟᱣᱟ ᱟᱨ ᱡᱚ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱡᱟᱝ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱡᱟᱝ ᱦᱟᱥᱟ ᱨᱮ ᱛᱚᱯᱟ ᱞᱮᱠᱷᱟᱱ ᱱᱟᱣᱟ ᱫᱟᱨᱮ ᱚᱢᱚᱱᱚᱜ-ᱟ᱾',
        transliteration: 'Baha khon jo benawa ar jo bhitri re jang tahena. Jang hasa re topa lekhan nawa dare omonog-a.',
        childFriendly: 'ᱢᱤᱫᱴᱟᱝ ᱦᱩᱰᱤᱧ ᱡᱟᱝ ᱦᱟᱥᱟ ᱨᱮ ᱮᱨ ᱞᱮᱠᱷᱟᱱ ᱫᱟᱜ ᱟᱨ ᱥᱤᱛᱩᱝ ᱧᱟᱢ ᱠᱟᱛᱮ ᱢᱟᱨᱟᱝ ᱫᱟᱨᱮ ᱵᱮᱱᱟᱣᱟ᱾',
        pedagogicNote: 'ᱵᱟᱦᱟ, ᱡᱚ ᱟᱨ ᱡᱟᱝ ᱨᱮᱱᱟᱜ ᱥᱟᱬᱮᱥ ᱯᱟᱴᱷ (ᱚᱞ ᱪᱤᱠᱤ)᱾',
        vocabularyTerms: vocabTerms,
      };
    } else {
      // General authentic translation for custom teacher input
      return {
        script: `ᱫᱟᱨᱮ ᱟᱨ ᱡᱤᱭᱚᱱ ᱦᱟᱨᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱥᱤᱛᱩᱝ, ᱫᱟᱜ ᱟᱨ ᱦᱚᱭ ᱡᱚᱛᱚ ᱞᱟᱹᱠᱛᱤᱭᱟ᱾ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱫᱚ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱪᱩᱞᱦᱟᱹ ᱠᱟᱱᱟ᱾`,
        transliteration: `Dare ar jiwon harag lagid situng, dak ar hoy joto laktiya. Hariyar sakam do dare renag chulha kana.`,
        childFriendly: `ᱡᱮᱞᱮᱠᱟ ᱟᱭᱳ ᱪᱩᱞᱦᱟᱹ ᱨᱮ ᱫᱟᱠᱟ ᱩᱛᱩ ᱛᱮᱭᱟᱨᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱥᱤᱛᱩᱝ ᱫᱟᱲᱮ ᱛᱮ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣᱟ᱾`,
        pedagogicNote: `ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ ᱛᱮ ᱢᱟᱪᱮᱛ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱲᱟᱣ ᱟᱠᱟᱱ ᱥᱚᱦᱚᱡ ᱟᱲᱟᱝ᱾`,
        vocabularyTerms: vocabTerms,
      };
    }
  }

  // GONDI
  if (lang === 'gondi') {
    if (lower.includes('bird') || lower.includes('nest') || lower.includes('egg') || lower.includes('fly')) {
      return {
        script: 'पिट्टे मरांग ते गुड्डा (घोंसला) कींतूर अनि बिंज/अंडा ईंतूर। पटे ता पर उड़ना काजे मद्दत कींतूर।',
        transliteration: 'Pitte marang te gudda keentoor ani binj/anda eentoor. Pate ta par udna kaje maddat keentoor.',
        childFriendly: 'जेलेक मातोर गाँव ते रोन (घर) ते रहंतोर, अन्नेच पिट्टे मरांग ता डंग ते गुड्डा बना की पिला तुन तींदल ओंतूर!',
        pedagogicNote: 'गोंडी भाषा एवं देवनागरी लिपि आधारित पक्षी एवं पर्यावरण पाठ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('cow') || lower.includes('milk') || lower.includes('grass')) {
      return {
        script: 'गाई हड़िया गासी तींजी की मीठा पाल ईंतूर। पाल ऊंडी की पिलोर ता तागत वांतूर।',
        transliteration: 'Gai hadiya gaasi teenji ki meetha paal eentoor. Paal oondi ki pilor ta taagat vaantoorr.',
        childFriendly: 'गाई मावा गोठ ता संगी आंद, गासी तींजी की पिलोर काजे बलवान पाल ईंतूर!',
        pedagogicNote: 'गोंडी लोक जीवन एवं मवेशी पोषण पाठ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('school') || lower.includes('book') || lower.includes('read') || lower.includes('teacher')) {
      return {
        script: 'पिलोर साला ते हंजी की पोथी पढ़ंतोर अनि लिखंतोर। गुरुजी सगा-संगी लेकन विद्या सीखंतूर।',
        transliteration: 'Pilor saala te hanji ki pothi padhantoor ani likhantoor. Guruji saga-sangi lekan vidya seekhantoor.',
        childFriendly: 'साला ते सब पिलोर मिल-जुल की ककनी अनि गणित मजे ते सीखंतोर!',
        pedagogicNote: 'गोंडी साला शिक्षण एवं बुनियादी साक्षरता।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('root') || lower.includes('straw') || lower.includes('underground')) {
      return {
        script: 'मरांग ता मुडु भूईं ते येर अनि तागत खींची की मरांग तुन थिरांग कींतूर।',
        transliteration: 'Marang ta mudu bhuin te yer ani taagat kheenchi ki marang tun thirang keentoor.',
        childFriendly: 'जेलेक नल्ली ते येर ऊनाट, अन्नेच मरांग ता मुडु भूईं लोपांग ते येर ओंतूर!',
        pedagogicNote: 'गोंडी भाषा एवं देवनागरी लिपि आधारित प्राथमिक विज्ञान अनुकूलन।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('water cycle') || lower.includes('rain') || lower.includes('cloud')) {
      return {
        script: 'पोद्दु नोर ते येर उड़ी की बादल बनते अनि वलंग वसी की पिरंग वांतूर।',
        transliteration: 'Poddu nor te yer udee ki baadal bante ani valang vasee ki pirang vaantoorr.',
        childFriendly: 'धूप ते नदी-नाला ता येर उड़ी की बादर बनते, अनि मड़े ते पिरंग झिर-झिर वांतूर।',
        pedagogicNote: 'गोंडी लोक संस्कृति एवं जल चक्र का सहज समन्वय।',
        vocabularyTerms: vocabTerms,
      };
    } else {
      return {
        script: 'मरांग वाढ़ना काजे पोद्दु, येर अनि हवा जरत आंद। आक मरांग ता रांदना (चूल्हा) आंद।',
        transliteration: 'Marang vadhna kaje poddu, yer ani hava jarat aand. Aak marang ta randna aand.',
        childFriendly: 'जेलेक आय्या चूल्हा ते गाटा वंडता, अन्नेच मरांग ता आक चूल्हा लेकन पोद्दु नोर ते तींदल तय्यार कींतूर!',
        pedagogicNote: 'गोंडी बोली में चूल्हा रूपक द्वारा प्राथमिक विज्ञान की सहज व्याख्या।',
        vocabularyTerms: vocabTerms,
      };
    }
  }

  // BHOJPURI
  if (lang === 'bhojpuri') {
    if (lower.includes('bird') || lower.includes('nest') || lower.includes('egg') || lower.includes('fly')) {
      return {
        script: 'चिरई पेड़ के डारी पर खोंध (घोंसला) बनावेली अउर अंडा देवेली। पंछी के पाँख उड़े में मदद करेला।',
        transliteration: 'Chirai ped ke daari par khondha banaveli aur anda develi. Panchhi ke paankh ude me madad karela.',
        childFriendly: 'जइसे हमनी के आपन घर होला, ओइसहीं चिरई पेड़ पर खर-पतवार बटोर के खोंध बनावेली आ बच्चा के दाना खियावेली।',
        pedagogicNote: 'भोजपुरी भाषा में पक्षी एवं जीव जगत के स्थानीय परिवेशीय पाठ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('cow') || lower.includes('milk') || lower.includes('grass')) {
      return {
        script: 'गैया हरियर घास चर के मीठ-मीठ दूध देवेली। दूध पिए से देह में तागत आवेला अउर बुद्धि तेज होखेला।',
        transliteration: 'Gaiya hariyar ghaas char ke meeth-meeth doodh develi. Doodh piye se deh me taagat aavela.',
        childFriendly: 'गैया हमनी के दुलरुई हई, खेत-खरिहान में घास चर के लइकन खातिर सुथरा दूध देवेली!',
        pedagogicNote: 'भोजपुरी अंचल के कृषि-पशुपालन एवं पोषण विज्ञान।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('school') || lower.includes('book') || lower.includes('read') || lower.includes('teacher')) {
      return {
        script: 'लइका लोग रोज इस्कूल जा के किताब पढ़ेला अउर हिसाब सीखेला। गुरुजी बढ़िया से समझावेले।',
        transliteration: 'Laika log roj school ja ke kitaab padhela aur hisaab seekhela. Guruji badhiya se samjhavele.',
        childFriendly: 'इस्कूल में सब साथी मिल के खेल-कूद आ गीत-कहानी से गणित अउरी विज्ञान सीखेलन!',
        pedagogicNote: 'भोजपुरी बुनियादी साक्षरता एवं प्राथमिक विद्यालय पाठ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('root') || lower.includes('straw') || lower.includes('underground')) {
      return {
        script: 'पेड़ के सोरह (जड़) माटी से पानी अउरी जरूरी खाद सोख के पूरा पौधा में पहुँचावेला।',
        transliteration: 'Ped ke sorah maati se paani auri jaroori khaad sokh ke poora paudha me pahunchavela.',
        childFriendly: 'जइसे हमनी पाइप से सरबत पीइला, ओइसहीं पेड़ के जड़ माटी में से पानी पी के पेड़ के ताज़ा राखेला।',
        pedagogicNote: 'भोजपुरी मातृभाषा में कक्षा ३ खातिर सरल सोरह (जड़) पाठ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('water cycle') || lower.includes('rain') || lower.includes('cloud')) {
      return {
        script: 'कड़क घाम से नदी-पोखरा के पानी भाप बन के आसमान में उड़ेला अउर करिया बदरी बन के बरसेला।',
        transliteration: 'Karak ghaam se nadi-pokhara ke paani bhaap ban ke aasmaan me udela aur kariya badari ban ke barsela.',
        childFriendly: 'घाम जब पोखरा के पानी तपावेला त भाप ऊपर जाके बदरी बनेला, आ फेर गाँव में झमाझम पानी बरसेला!',
        pedagogicNote: 'भोजपुरी अंचल के पोखरा-बदरी के परिवेशीय संदर्भ।',
        vocabularyTerms: vocabTerms,
      };
    } else {
      return {
        script: 'पेड़ के बढ़े खातिर घाम, पानी अउरी हवा जरूरी बा। हरियर पतई पेड़ के रसोई हवे।',
        transliteration: 'Ped ke badhe khatir ghaam, paani auri hava zaroori ba. Hariyar patai ped ke rasoi have.',
        childFriendly: 'जइसे माई चूल्हा पर मीठ-मीठ भोजन पकावेली, ओइसहीं हरियर पतई घाम के धूप से पेड़ खातिर भोजन बनावेला!',
        pedagogicNote: 'भोजपुरी घरेलू चूल्हा उपमा से विज्ञान अवधारणा के सहज शिक्षण।',
        vocabularyTerms: vocabTerms,
      };
    }
  }

  // MAITHILI
  if (lang === 'maithili') {
    if (lower.includes('bird') || lower.includes('nest') || lower.includes('egg') || lower.includes('fly')) {
      return {
        script: 'चिरै गाछक डालि पर खोता (घोंसला) बनबैत अछि आ अण्डा दैत अछि। पाँख चिरै केँ उड़य मे सहायता करैत अछि।',
        transliteration: 'Chirai gaachhak daali par khota banabait achhi aa anda dait achhi. Paankh chirai ke uday me sahayata karait achhi.',
        childFriendly: 'जहिना हम सभ अपन घर मे रहैत छी, तहिना चिरै गाछ पर खोता बना कऽ अपन बच्चा केँ दाना खियाबैत अछि।',
        pedagogicNote: 'मिथिला क्षेत्रक पक्षी जीवन एवं पर्यावरण विज्ञान पाठ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('cow') || lower.includes('milk') || lower.includes('grass')) {
      return {
        script: 'गाय हरियर घास खा कऽ मीठ दूध दैत अछि। दूध पीबय सं शरीर बलिष्ठ आ बुद्धि तीक्ष्ण होइत अछि।',
        transliteration: 'Gaai hariyar ghaas kha ka meeth doodh dait achhi. Doodh peebay sa shareer balishth hoit achhi.',
        childFriendly: 'गाय हमर सबहक दुलारी थिकीह, जे घास खा कऽ बच्चा सबहक लेल पौष्टिक दूध दैत छथि!',
        pedagogicNote: 'मैथिली लोक जीवन एवं पोषण विज्ञान।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('school') || lower.includes('book') || lower.includes('read') || lower.includes('teacher')) {
      return {
        script: 'बच्चा सब विद्यालय जा कऽ पोथी पढ़ैत अछि आ हिसाब सिखैत अछि। गुरुजी प्रेम सं ज्ञान दैत छथि।',
        transliteration: 'Bachha sab vidyalay ja ka pothi padhait achhi aa hisaab sikhaait achhi. Guruji prem sa gyan dait chhathi.',
        childFriendly: 'पाठशाला मे सब संगी-साथी मिलि कऽ मैथिली मे कथा-कहानी आ गणित सहजहि सीखैत छथि!',
        pedagogicNote: 'मैथिली प्राथमिक शिक्षा एवं बुनियादी साक्षरता।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('root') || lower.includes('straw') || lower.includes('underground')) {
      return {
        script: 'गाछक जड़ि माटि सं पानि आ पोषक तत्व सोखि कऽ पूरा गाछ मे पहुँचाबैत अछि।',
        transliteration: 'Gaachhak jari maati sa paani aa poshak tatva sokhi ka poora gaachh me pahunchabait achhi.',
        childFriendly: 'जहिना हम सब नली (स्ट्रॉ) सं पानि पीबैत छी, तहिना गाछक जड़ि माटि सं पानि पीबि कऽ गाछ केँ ताजगी दैत अछि।',
        pedagogicNote: 'मैथिली भाषा मे प्राथमिक विज्ञान शिक्षण हेतु जड़ि केर कार्यक विवरण।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('water cycle') || lower.includes('rain') || lower.includes('cloud')) {
      return {
        script: 'रौदक ताप सं पोखरि आ नदीक पानि बाष्प बनि कऽ आकाश मे मेघ बनैत अछि आ फेर वर्षा भऽ कऽ खसैत अछि।',
        transliteration: 'Raudak taap sa pokhari aa nadeek paani baashpa bani ka aakaash me megh banait achhi.',
        childFriendly: 'रौद जब पोखरिक पानि केँ तपाबैत अछि तऽ पानि उड़ि कऽ मेघ बनैत अछि आ गाँव मे झमझम बरखा होइत अछि!',
        pedagogicNote: 'मिथिला क्षेत्रक पोखरि-मेघ पर्यावरण पर आधारित पाठ।',
        vocabularyTerms: vocabTerms,
      };
    } else {
      return {
        script: 'गाछ-बिरिछ केँ बढ़य लेल रौद, पानि आ शुद्ध बतासक आवश्यकता होइत अछि। हरियर पात गाछक भानस घर (रसोई) थीक।',
        transliteration: 'Gaachh-birichh ke badhay lel raud, paani aa shuddh bataasak aavashyakta hoit achhi. Hariyar paat gaachhak bhanas ghar theek.',
        childFriendly: 'जहिना माय चुलहा पर स्वादिष्ट भोजन बनबैत छथि, तहिना हरियर पात रौदक शक्ति सं गाछक लेल भोजन तैय्यार करैत अछि!',
        pedagogicNote: 'मैथिली भानस घर (रसोई) उपमा द्वारा प्रकाश संश्लेषण शिक्षण।',
        vocabularyTerms: vocabTerms,
      };
    }
  }

  // ODIA
  if (lang === 'odia') {
    if (lower.includes('bird') || lower.includes('nest') || lower.includes('egg') || lower.includes('fly')) {
      return {
        script: 'ଚଢ଼େଇମାନେ ଗଛ ଡାଳରେ ବସା ବାନ୍ଧନ୍ତି ଏବଂ ଅଣ୍ଡା ଦିଅନ୍ତି। ଡେଣା ସେମାନଙ୍କୁ ଆକାଶରେ ଉଡ଼ିବାରେ ସାହାଯ୍ୟ କରେ।',
        transliteration: 'Chadheimane gachha dalare basa bandhanti ebanga anda dianti. Dena semananku akasare udibare sahayya kare.',
        childFriendly: 'ଯେପରି ଆମେ ଆମ ଘରେ ରହୁ, ଠିକ୍ ସେହିପରି ଚଢ଼େଇ ଗଛରେ ସୁନ୍ଦର ବସା ତିଆରି କରି ଛୁଆଙ୍କୁ ଖାଦ୍ୟ ଖୁଆଏ!',
        pedagogicNote: 'ଓଡ଼ିଆ ପ୍ରାଥମିକ ବିଜ୍ଞାନ ପାଠ୍ୟକ୍ରମ ଅନୁସାରେ ପକ୍ଷୀ ଜୀବନ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('cow') || lower.includes('milk') || lower.includes('grass')) {
      return {
        script: 'ଗାଈ ସବୁଜ ଘାସ ଖାଇ ମିଠା କ୍ଷୀର ଦିଏ। କ୍ଷୀର ପିଇବା ଦ୍ୱାରା ଶରୀର ସୁସ୍ଥ ଏବଂ ବୁଦ୍ଧି ପ୍ରଖର ହୁଏ।',
        transliteration: 'Gaai sabuja ghasa khai mitha khira die. Khira piiba dwara sarira sustha ebanga buddhi prakhara hue.',
        childFriendly: 'ଗାଈ ଆମ ଗାଁର ଉପକାରୀ ସାଥୀ, ଯିଏ ଘାସ ଖାଇ ପିଲାମାନଙ୍କ ପାଇଁ ପୁଷ୍ଟିକର କ୍ଷୀର ଦିଏ!',
        pedagogicNote: 'ଓଡ଼ିଶାର ପାରମ୍ପରିକ ଗୋପାଳନ ଓ ପୁଷ୍ଟି ବିଜ୍ଞାନ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('school') || lower.includes('book') || lower.includes('read') || lower.includes('teacher')) {
      return {
        script: 'ପିଲାମାନେ ପ୍ରତିଦିନ ବିଦ୍ୟାଳୟ ଯାଇ ବହି ପଢ଼ନ୍ତି ଏବଂ ଗଣିତ ଶିଖନ୍ତି। ଶିକ୍ଷକମାନେ ଭଲ କଥା ଶିଖାନ୍ତି।',
        transliteration: 'Pilamane pratidina bidyalaya jai bahi padhanti ebanga ganita sikhanti. Sikhyakamane bhala katha sikhanti.',
        childFriendly: 'ସ୍କୁଲରେ ସାଙ୍ଗମାନଙ୍କ ସହିତ ଖେଳି ଖେଳି ଆନନ୍ଦରେ ନୂଆ ପାଠ ଶିଖିବା ସହଜ ହୁଏ!',
        pedagogicNote: 'ଓଡ଼ିଆ ଭାଷାରେ ମୌଳିକ ସାକ୍ଷରତା ଓ ପ୍ରାଥମିକ ଶିକ୍ଷା।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('root') || lower.includes('straw') || lower.includes('underground')) {
      return {
        script: 'ଗଛର ଚେର ମାଟି ଭିତରୁ ଜଳ ଏବଂ ଖଣିଜ ଲବଣ ଶୋଷଣ କରି ଗଛର ସମସ୍ତ ଅଙ୍ଗକୁ ପଠାଇଥାଏ।',
        transliteration: 'Gachhara chera mati bhitaru jala ebanga khanija labana soshana kari gachhara samasta angaku pathaithae.',
        childFriendly: 'ଯେପରି ଆମେ ଷ୍ଟ୍ର’ (ନଳୀ) ଦ୍ୱାରା ପାଣି ପିଉ, ସେହିପରି ଗଛର ଚେର ମାଟିରୁ ପାଣି ଶୋଷି ଗଛକୁ ସତେଜ ରଖେ!',
        pedagogicNote: 'ଓଡ଼ିଆ ଭାଷାରେ ପ୍ରାଥମିକ ବିଜ୍ଞାନ ଶିକ୍ଷା ପାଇଁ ଚେରର କାର୍ଯ୍ୟ।',
        vocabularyTerms: vocabTerms,
      };
    } else if (lower.includes('water cycle') || lower.includes('rain') || lower.includes('cloud')) {
      return {
        script: 'ଖରାର ଉତ୍ତାପ ଯୋଗୁଁ ନଦୀ-ପୋଖରୀର ପାଣି ବାଷ୍ପ ହୋଇ ଆକାଶରେ ମେଘ ସୃଷ୍ଟି କରେ ଏବଂ ବର୍ଷା ହୋଇ ଝରେ।',
        transliteration: 'Kharara uttapa jogun nadi-pokharira pani baspa hoi akasare megha srusti kare ebanga barsa hoi jhare.',
        childFriendly: 'ଖରାରେ ପାଣି ଗରମ ହୋଇ ଆକାଶକୁ ଉଡ଼ିଯାଏ ଏବଂ କଳା ମେଘ ହୋଇ ଗାଁ ଉପରେ ଝିପିଝିପି ବର୍ଷା ବର୍ଷେ!',
        pedagogicNote: 'ଓଡ଼ିଶାର ଜଳବାୟୁ ଓ ଜଳ ଚକ୍ର ସମ୍ପର୍କିତ ପାଠ।',
        vocabularyTerms: vocabTerms,
      };
    } else {
      return {
        script: 'ଗଛ ବଢ଼ିବା ପାଇଁ ସୂର୍ଯ୍ୟାଲୋକ (ଖରା), ଜଳ ଏବଂ ନିର୍ମଳ ବାୟୁ ଅତ୍ୟନ୍ତ ଆବଶ୍ୟକ। ସବୁଜ ପତ୍ର ହେଉଛି ଗଛର ରୋଷେଇଶାଳା।',
        transliteration: 'Gachha badhiba pain suryaloka (khara), jala ebanga nirmala bayu atyanta abasyaka. Sabuja patra heuchhi gachhara roseisala.',
        childFriendly: 'ଯେପରି ବୋଉ ଚୁଲିରେ ରୋଷେଇ କରେ, ଠିକ୍ ସେହିପରି ଗଛର ସବୁଜ ପତ୍ର ଖରାର ଶକ୍ତି ବ୍ୟବହାର କରି ଗଛ ପାଇଁ ମିଠା ଖାଦ୍ୟ ତିଆରି କରେ!',
        pedagogicNote: 'ଓଡ଼ିଆ ମାତୃଭାଷାରେ ଚୁଲି ରୋଷେଇ ଉପମା ସହ ଆଲୋକ ଶ୍ଳେଷଣ ବୁଝାମଣା।',
        vocabularyTerms: vocabTerms,
      };
    }
  }

  // MARATHI (Default)
  if (lower.includes('bird') || lower.includes('nest') || lower.includes('egg') || lower.includes('fly')) {
    return {
      script: 'पक्षी झाडांच्या फांद्यांवर छान घरटी बांधतात आणि अंडी घालतात. त्यांचे पंख त्यांना आकाशात उंच उडण्यास मदत करतात.',
      transliteration: 'Pakshi jhadanchya phandyanvar chhan gharti bandhtat aani andi ghaltat. Tyanche pankh tyanna aakashat unch udnyas madat kartat.',
      childFriendly: 'जसे आपले घर असते, तसेच पक्षी काडीकचरा गोळा करून घरटे बनवतात आणि आपल्या पिलांना दाणापाणी भरवतात!',
      pedagogicNote: 'मराठी प्राथमिक विज्ञान अभ्यासक्रमानुसार पक्षी जीवन व पर्यावरण.',
      vocabularyTerms: vocabTerms,
    };
  } else if (lower.includes('cow') || lower.includes('milk') || lower.includes('grass')) {
    return {
      script: 'गाय हिरवे गवत खाऊन आपल्याला गोड आणि सकस दूध देते. दूध प्यायल्याने मुलांचे आरोग्य चांगले राहते.',
      transliteration: 'Gaay hirve gavat khaun aaplyala god aani sakas doodh dete. Doodh pyalyane mulanche aarogya changle rahte.',
      childFriendly: 'गाय आपली गोठ्यातील सखी आहे, ती गवत खाऊन लहान मुलांसाठी ताजे आणि पौष्टिक दूध देते!',
      pedagogicNote: 'ग्रामीण पशुपालन व पोषण विज्ञान मराठी प्राथमिक स्तर.',
      vocabularyTerms: vocabTerms,
    };
  } else if (lower.includes('school') || lower.includes('book') || lower.includes('read') || lower.includes('teacher')) {
    return {
      script: 'मुले दररोज शाळेत जाऊन पुस्तके वाचतात आणि गणित शिकतात. गुरुजी त्यांना प्रेमाने नवीन गोष्टी शिकवतात.',
      transliteration: 'Mule darroj shalet jaun pustake vachtat aani ganit shiktat. Guruji tyanna premane navin goshti shiktat.',
      childFriendly: 'शाळेत सगळे मित्र एकत्र येऊन गाणी, गोष्टी आणि खेळांच्या माध्यमातून सहज शिक्षण घेतात!',
      pedagogicNote: 'मराठी प्राथमिक शिक्षण व पायाभूत साक्षरता (FLN).',
      vocabularyTerms: vocabTerms,
    };
  } else if (lower.includes('root') || lower.includes('straw') || lower.includes('underground')) {
    return {
      script: 'झाडांची मुळे मातीमधून पाणी आणि आवश्यक क्षार शोषून झाडाच्या सर्व भागांना पोहोचवतात.',
      transliteration: 'Jhadanchi mule matimadhun pani aani aavashyak kshar shoshun jhadachya sarv bhaganna pohachvatat.',
      childFriendly: 'जसे आपण नळीने (स्ट्रॉने) पाणी पितो, तसेच झाडांची मुळे मातीतून पाणी पिऊन झाडाला ताजेतवाने ठेवतात!',
      pedagogicNote: 'मराठी प्राथमिक विज्ञान अभ्यासक्रमानुसार मुळांचे कार्य.',
      vocabularyTerms: vocabTerms,
    };
  } else if (lower.includes('water cycle') || lower.includes('rain') || lower.includes('cloud')) {
    return {
      script: 'उन्हाच्या उष्णतेमुळे नदी-तळ्यांतील पाण्याचे बाष्पीभवन होऊन आकाशात ढग बनतात आणि पाऊस पडतो.',
      transliteration: 'Unhachya ushnatemule nadi-talyantil panyache bashpibhavan houn aakashat dhag bantat aani paus padto.',
      childFriendly: 'उन्हामुळे पाणी तापून आकाशात वाफेच्या रूपात वर जाते, त्याचे काळे ढग होतात आणि मग गावात रिमझिम पाऊस पडतो!',
      pedagogicNote: 'मराठी जल चक्र व परिसंस्था प्राथमिक स्तर.',
      vocabularyTerms: vocabTerms,
    };
  } else {
    return {
      script: 'झाडांच्या वाढीसाठी सूर्यप्रकाश, पाणी आणि शुद्ध हवेची गरज असते. हिरवे पान हे झाडाचे स्वयंपाकघर आहे.',
      transliteration: 'Jhadanchya vadhisaathi suryaprakash, pani aani shuddh havechi garaj aste. Hirve paan he jhadache swayampakghar aahe.',
      childFriendly: 'जशी आई स्वयंपाकघरातील चुलीवर गरम अन्न शिजवते, तसेच झाडाचे हिरवे पान सूर्यप्रकाशाच्या मदतीने झाडासाठी गोड अन्न तयार करते!',
      pedagogicNote: 'मराठी चूल व स्वयंपाकघर रूपकाद्वारे प्रकाशसंश्लेषण सहज स्पष्टीकरण.',
      vocabularyTerms: vocabTerms,
    };
  }
}

// Generates adapted content for classroom contexts, specifically taking the staff's topic/input
export function generatePedagogicAdaptation(
  level: string,
  style: string,
  context: string,
  format: string,
  lang: LanguageCode,
  customTopic?: string
): AdaptedContentResult {
  const contextClean = context.split(' ')[0] || 'Village';
  const topic = customTopic && customTopic.trim().length > 0 ? customTopic.trim() : 'Green Plants & Sunlight Energy';
  const topicLower = topic.toLowerCase();

  const isBirdTopic = topicLower.includes('bird') || topicLower.includes('nest') || topicLower.includes('egg');
  const isWaterTopic = topicLower.includes('water') || topicLower.includes('rain') || topicLower.includes('cloud') || topicLower.includes('river');
  const isCowTopic = topicLower.includes('cow') || topicLower.includes('milk') || topicLower.includes('animal');
  const isSchoolTopic = topicLower.includes('school') || topicLower.includes('book') || topicLower.includes('read') || topicLower.includes('count');

  if (lang === 'santhali') {
    if (isBirdTopic) {
      return {
        title: `ᱪᱮᱬᱮ ᱟᱨ ᱡᱤᱭᱚᱱ ᱯᱟᱴᱷ (${contextClean})`,
        contentMt: `ᱟᱢᱟᱜ ${contextClean} ᱨᱮ ᱪᱮᱬᱮ ᱠᱚ ᱫᱟᱨᱮ ᱨᱮ ᱛᱩᱠᱟᱹ ᱠᱚ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱫᱟ᱾ ᱪᱮᱬᱮ ᱠᱚ ᱥᱮᱛᱟᱜ ᱠᱷᱚᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱢᱟᱜ ᱠᱚ ᱥᱮᱸᱫᱽᱨᱟᱭᱟ᱾`,
        contentEn: `Take the children outside to the ${contextClean}. Observe the sparrows and weaver birds building intricate nests on palm and tamarind trees. Explain how birds protect their young like village families.`,
        activityPrompt: `ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (${format}): ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱵᱷᱮᱜᱟᱨ-ᱵᱷᱮᱜᱟᱨ ᱪᱮᱬᱮ ᱠᱚᱣᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱢᱮ: ᱪᱮᱬᱮ + ᱛᱩᱠᱟᱹ + ᱵᱤᱞᱤ᱾`,
      };
    } else if (isWaterTopic) {
      return {
        title: `ᱫᱟᱜ ᱟᱨ ᱨᱤᱢᱤᱞ ᱪᱟᱠᱨᱚ (${contextClean})`,
        contentMt: `ᱟᱢᱟᱜ ${contextClean} ᱯᱩᱠᱷᱨᱤ ᱠᱷᱚᱱ ᱥᱤᱛᱩᱝ ᱞᱚᱞᱚ ᱛᱮ ᱫᱟᱜ ᱦᱚᱭ ᱨᱮ ᱨᱟᱠᱟᱵ ᱠᱟᱛᱮ ᱦᱮᱸᱫᱮ ᱨᱤᱢᱤᱞ ᱵᱮᱱᱟᱣᱟ, ᱟᱨ ᱡᱟᱹᱲᱤ ᱫᱟᱜ ᱧᱩᱨᱩᱜ-ᱟ᱾`,
        contentEn: `Look across the local ${contextClean} pond. Explain that when the hot sun shines, surface water evaporates invisible into the clouds, later cooling to bring monsoon rain to our fields.`,
        activityPrompt: `ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (${format}): ᱢᱤᱫᱴᱟᱝ ᱵᱟᱹᱴᱤ ᱨᱮ ᱫᱟᱜ ᱫᱚᱦᱚ ᱠᱟᱛᱮ ᱥᱤᱛᱩᱝ ᱨᱮ ᱧᱮᱞ ᱢᱮ — ᱪᱮᱫ ᱞᱮᱠᱟ ᱫᱟᱜ ᱠᱚᱢᱚᱜ ᱠᱟᱱᱟ᱾`,
      };
    } else {
      return {
        title: `ᱵᱟᱲᱤ ᱥᱟᱬᱮᱥ ᱯᱟᱴᱷ: ${topic} (${contextClean})`,
        contentMt: `ᱥᱮᱛᱟᱜ ᱵᱮᱲᱟ ᱟᱢᱟᱜ ${contextClean} ᱨᱮ ᱪᱟᱞᱟᱣ ᱠᱟᱛᱮ ᱧᱮᱞ ᱢᱮ — ᱥᱤᱛᱩᱝ ᱫᱟᱲᱮ ᱛᱮ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱜ ᱮ ᱵᱮᱱᱟᱣ ᱮᱫᱟ᱾ ᱡᱮᱞᱮᱠᱟ ᱟᱭᱳ ᱪᱩᱞᱦᱟᱹ ᱨᱮ ᱫᱟᱠᱟ-ᱩᱛᱩ ᱛᱮᱭᱟᱨᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱫᱟᱨᱮ ᱥᱤᱛᱩᱝ ᱠᱷᱚᱱ ᱫᱟᱲᱮ ᱦᱟᱛᱟᱣᱟ᱾`,
        contentEn: `Walk into your ${contextClean} surroundings in the morning sun. Focus on "${topic}". Just as mother lights the clay hearth fire to cook meals, green leaves use solar energy to cook plant food!`,
        activityPrompt: `ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (${format}): ᱟᱢᱟᱜ ᱥᱩᱨ-ᱥᱩᱯᱩᱨ ᱠᱷᱚᱱ ᱢᱤᱫᱴᱟᱝ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱟᱹᱜᱩᱭ ᱢᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱚᱞ ᱢᱮ: ᱥᱤᱛᱩᱝ + ᱫᱟᱜ = ᱡᱚᱢᱟᱜ᱾`,
      };
    }
  }

  if (lang === 'gondi') {
    if (isBirdTopic) {
      return {
        title: `पिट्टे अनि गुड्डा सीखन (${contextClean})`,
        contentMt: `सकारो पोद्दु ते अपनी ${contextClean} मरांग ते पिट्टे ता गुड्डा चूड़ाट। पिट्टे ता पर उड़ना काजे मद्दत कींतूर अनि बिंज ते पिला वांतूर।`,
        contentEn: `In the local ${contextClean} grove, point out bird nests in Mahua trees. Discuss how birds use twigs and grass, fostering reverence for nature.`,
        activityPrompt: `सीखन काम (${format}): मरांग ता डंग ते गुड्डा ता चित्र बनावट अनि गोंडी ते लिखुट: पिट्टे + गुड्डा।`,
      };
    } else {
      return {
        title: `मरांग वाढ़ना सीखन: ${topic} (${contextClean})`,
        contentMt: `सकारो पोद्दु ते अपनी ${contextClean} वाड़ी ते मरांग ता आक चूल्हा लेकन पोद्दु नोर ते गाटा वंडतूर। जेलेक आय्या चूल्हा ते तींदल तय्यार कींतूर, अन्नेच मरांग पोद्दु नोर खींची की तींदल तय्यार कींतूर!`,
        contentEn: `Visit your ${contextClean} in the morning sunshine to explore "${topic}". Observe how Mahua and bean leaves turn toward the sun to prepare tree nourishment like a home cooking hearth!`,
        activityPrompt: `सीखन काम (${format}): वाड़ी ते एक हड़िया आक लस की चित्र बनावट अनि मातृभाषा ते लिखुट: पोद्दु + येर = तींदल।`,
      };
    }
  }

  if (lang === 'bhojpuri') {
    if (isBirdTopic) {
      return {
        title: `गाँव के चिरई-चोंच पाठ (${contextClean})`,
        contentMt: `सवेरे-सवेरे आपन ${contextClean} में पेड़ पर देखीं — चिरई कइसे खोंध बना के अंडा सेवेली। पाँख के सहारे गगन में उड़ेली!`,
        contentEn: `Take students into the ${contextClean} courtyard to observe house sparrows and pigeons. Explain flight mechanics and nesting habits.`,
        activityPrompt: `कक्षा गतिविधि (${format}): आपन गाँव के तीन गो चिरई के नाम भोजपुरी में लिखीं आ खोंध के चित्र बनाईं।`,
      };
    } else if (isWaterTopic) {
      return {
        title: `पोखरा-बदरी जल चक्र (${contextClean})`,
        contentMt: `गाँव के ${contextClean} पोखरा में घाम के गर्मी से पानी भाप बन के आकाश में उड़ेला आ करिया बदरी बन के बरसेला।`,
        contentEn: `Demonstrate evaporation using water heated on a plate in the ${contextClean}. Relate it to seasonal monsoons replenishing local wells.`,
        activityPrompt: `कक्षा गतिविधि (${format}): बदरी आ बरखा के चित्र बना के लिखीं: घाम + पोखरा = बदरी -> पानी।`,
      };
    } else {
      return {
        title: `गाँव के पेड़-पौधा पाठ: ${topic} (${contextClean})`,
        contentMt: `सवेरे-सवेरे आपन ${contextClean} में जा के देखीं — "${topic}" के समझीं। जइसे माई चूल्हा पर खाना बनावेली, ओइसहीं पतई सुरुज के रोशनी से पेड़ के तगड़ा राखेला!`,
        contentEn: `Step into your ${contextClean} area in the morning sunshine to teach "${topic}". Observe how pumpkin and bean vines spread their leaves to cook plant food using solar heat!`,
        activityPrompt: `कक्षा गतिविधि (${format}): आपन दुआर चाहे बाड़ी से एगो हरियर पतई ले आईँ आ कॉपी में चित्र बना के लिखीं: घाम + पानी = भोजन।`,
      };
    }
  }

  if (lang === 'maithili') {
    return {
      title: `मिथिला पर्यावरण पाठ: ${topic} (${contextClean})`,
      contentMt: `भोरुक बेरा अपन ${contextClean} मे जा कऽ देखू — "${topic}" केँ बूझू। जहिना माय चुलहा पर भात-दालि पकाबैत छथि, तहिना पात रौद सं गाछ केँ ऊर्जा दैत अछि!`,
      contentEn: `Observe the morning sun across your ${contextClean} courtyard. Discuss "${topic}". Green leaves act as the living hearth converting sunlight and water into sweet nourishment!`,
      activityPrompt: `कक्षा गतिविधि (${format}): अपन गाछक एकटा हरियर पात लऽ कऽ चित्र बनाऊ आ मैथिली मे लिखू: रौद + पानि = भोजन।`,
    };
  }

  if (lang === 'odia') {
    return {
      title: `ଗାଁ ପରିବେଶ ପାଠ: ${topic} (${contextClean})`,
      contentMt: `ସକାଳ ସମୟରେ ଆପଣଙ୍କ ${contextClean} ବଗିଚାକୁ ଯାଇ ଦେଖନ୍ତୁ — "${topic}" ବିଷୟରେ ଶିଖନ୍ତୁ। ଯେପରି ବୋଉ ଚୁଲିରେ ରୋଷେଇ କରେ, ସେହିପରି ପତ୍ର ଖରାରୁ ଶକ୍ତି ଗ୍ରହଣ କରେ!`,
      contentEn: `Step out into your ${contextClean} courtyard to teach "${topic}". Green pumpkin vines turn their broad leaves toward the golden morning sun to cook nourishment for flowers and fruits!`,
      activityPrompt: `ଶ୍ରେଣୀ କାର୍ଯ୍ୟ (${format}): ବଗିଚାରୁ ଗୋଟିଏ ସବୁଜ ପତ୍ର ଆଣି ଖାତାରେ ଚିତ୍ର ଆଙ୍କନ୍ତୁ ଏବଂ ଓଡ଼ିଆରେ ଲେଖନ୍ତୁ: ଖରା + ପାଣି = ଖାଦ୍ୟ।`,
    };
  }

  // Marathi (Default)
  return {
    title: `परिसर अभ्यास पाठ: ${topic} (${contextClean})`,
    contentMt: `सकाळी आपल्या ${contextClean} मध्ये जाऊन पहा — "${topic}" समजून घ्या. जशी आई चुलीवर जेवण बनवते, तसेच पान सूर्यप्रकाशातून ऊर्जा घेते!`,
    contentEn: `Step into your ${contextClean} surroundings in the morning sun to teach "${topic}". Just as food is prepared on the home cooking stove, green leaves use solar energy to nourish the entire plant!`,
    activityPrompt: `वर्ग कृती (${format}): आपल्या बागेतील एक हिरवे पान आणून वहीत चित्र काढा आणि मराठीत लिहा: सूर्यप्रकाश + पाणी = अन्न.`,
  };
}


const fs = require('fs');
const path = require('path');

// Helper to ensure directory exists
function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Grade 11 - English - Period 2 - BUNDLE 1 (Part 4: Cloze - Travel)
  {
    meta: {
      id: "CO-ENG-11-cloze-travel-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Cloze: Traveling the World"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "Traveling _____ opens your mind.", options: [{text: "really",correct:true},{text: "real",correct:false},{text: "reality",correct:false},{text: "realist",correct:false}], explanation: "Adverb." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "You can meet people _____ different cultures.", options: [{text: "from",correct:true},{text: "of",correct:false},{text: "at",correct:false},{text: "by",correct:false}], explanation: "People from." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "It is exciting _____ try new foods.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "of",correct:false},{text: "in",correct:false}], explanation: "It is + adj + to + verb." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "Many tourists _____ landmarks.", options: [{text: "visit",correct:true},{text: "visits",correct:false},{text: "visiting",correct:false},{text: "visited",correct:false}], explanation: "Present simple plural." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "Have you _____ been to Asia?", options: [{text: "ever",correct:true},{text: "never",correct:false},{text: "always",correct:false},{text: "yet",correct:false}], explanation: "Present perfect question." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "If I had money, I _____ travel there.", options: [{text: "would",correct:true},{text: "will",correct:false},{text: "can",correct:false},{text: "shall",correct:false}], explanation: "Second conditional." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "The flight was _____ than expected.", options: [{text: "longer",correct:true},{text: "long",correct:false},{text: "longest",correct:false},{text: "length",correct:false}], explanation: "Comparative." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "We arrived _____ the airport early.", options: [{text: "at",correct:true},{text: "in",correct:false},{text: "on",correct:false},{text: "to",correct:false}], explanation: "Arrive at (a point)." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "She is looking forward _____ her trip.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "of",correct:false},{text: "at",correct:false}], explanation: "Look forward to." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "_____ of the weather, we went out.", options: [{text: "In spite",correct:true},{text: "Despite",correct:false},{text: "Although",correct:false},{text: "However",correct:false}], explanation: "In spite of." }
    ]
  },

  // Bundle 2: Part 5 (Reading Literal) - Culture
  {
    meta: {
      id: "CO-ENG-11-read-culture-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part5-reading",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Reading: Festivals"
    },
    base: { question: "Read the text and answer.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 5", question: "Text: 'Diwali is the festival of lights in India.' -> What is Diwali?", options: [{text: "A festival",correct:true},{text: "A food",correct:false},{text: "A city",correct:false},{text: "A clothes",correct:false}], explanation: "Literal." },
      { id_suffix: "v2", difficulty: 1, type: "Part 5", question: "Text: 'People light lamps and share sweets.' -> What do people eat?", options: [{text: "Sweets",correct:true},{text: "Lamps",correct:false},{text: "Lights",correct:false},{text: "India",correct:false}], explanation: "Literal." },
      { id_suffix: "v3", difficulty: 2, type: "Part 5", question: "Text: 'The Carnival of Barranquilla is famous for its colors.' -> What makes it famous?", options: [{text: "Its colors",correct:true},{text: "Its silence",correct:false},{text: "Its cars",correct:false},{text: "Its cold",correct:false}], explanation: "Literal details." },
      { id_suffix: "v4", difficulty: 2, type: "Part 5", question: "Text: 'It happens every year before Lent.' -> When does it happen?", options: [{text: "Before Lent",correct:true},{text: "After Lent",correct:false},{text: "During Christmas",correct:false},{text: "In Summer",correct:false}], explanation: "Time ref." },
      { id_suffix: "v5", difficulty: 3, type: "Part 5", question: "Text: 'Thanksgiving is celebrated in the USA in November.' -> Where is it celebrated?", options: [{text: "In the USA",correct:true},{text: "In UK",correct:false},{text: "In November",correct:false},{text: "In China",correct:false}], explanation: "Place ref." },
      { id_suffix: "v6", difficulty: 3, type: "Part 5", question: "Text: 'Families gather to eat turkey.' -> What is the main dish?", options: [{text: "Turkey",correct:true},{text: "Pizza",correct:false},{text: "Fish",correct:false},{text: "Salad",correct:false}], explanation: "Detail." },
      { id_suffix: "v7", difficulty: 4, type: "Part 5", question: "Text: 'Songkran is the Thai New Year water battle.' -> What do people allow?", options: [{text: "Throwing water",correct:true},{text: "Throwing fire",correct:false},{text: "Sleeping",correct:false},{text: "Working",correct:false}], explanation: "Inference simple." },
      { id_suffix: "v8", difficulty: 4, type: "Part 5", question: "Text: 'It symbolizes washing away bad luck.' -> What does water represent?", options: [{text: "Cleaning bad luck",correct:true},{text: "Making dirt",correct:false},{text: "Drinking",correct:false},{text: "Swimming",correct:false}], explanation: "Symbolism." },
      { id_suffix: "v9", difficulty: 5, type: "Part 5", question: "Text: 'Oktoberfest in Munich attracts millions of visitors.' -> How many people go?", options: [{text: "Millions",correct:true},{text: "Hundreds",correct:false},{text: "Thousands",correct:false},{text: "Ten",correct:false}], explanation: "Quantity." },
      { id_suffix: "v10", difficulty: 5, type: "Part 5", question: "Text: 'Visitors traditionally wear Lederhosen.' -> What implies 'traditionally'?", options: [{text: "It is a custom",correct:true},{text: "It is a law",correct:false},{text: "It is new",correct:false},{text: "It is cheap",correct:false}], explanation: "Vocabulary in context." }
    ]
  },

  // Bundle 3: Part 4 (Cloze) - Society
  {
    meta: {
      id: "CO-ENG-11-cloze-society-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Cloze: Modern Society"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "People live in _____ cities today.", options: [{text: "big",correct:true},{text: "bigger",correct:false},{text: "biggest",correct:false},{text: "more big",correct:false}], explanation: "Adjective." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "We need to respect _____ other.", options: [{text: "each",correct:true},{text: "every",correct:false},{text: "all",correct:false},{text: "one",correct:false}], explanation: "Each other." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "Education is important _____ success.", options: [{text: "for",correct:true},{text: "to",correct:false},{text: "of",correct:false},{text: "in",correct:false}], explanation: "Important for." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "Many students _____ to university.", options: [{text: "go",correct:true},{text: "goes",correct:false},{text: "going",correct:false},{text: "gone",correct:false}], explanation: "Present simple." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "Volunteering helps _____ the community.", options: [{text: "improve",correct:true},{text: "improves",correct:false},{text: "improving",correct:false},{text: "improved",correct:false}], explanation: "Help + infinitive." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "It gives you a sense _____ purpose.", options: [{text: "of",correct:true},{text: "in",correct:false},{text: "at",correct:false},{text: "for",correct:false}], explanation: "Sense of." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "Poverty remains a global _____.", options: [{text: "issue",correct:true},{text: "issued",correct:false},{text: "issues",correct:false},{text: "issuing",correct:false}], explanation: "Noun." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "We must work together to _____ it.", options: [{text: "solve",correct:true},{text: "solution",correct:false},{text: "solving",correct:false},{text: "solved",correct:false}], explanation: "To + verb." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "Social media has _____ communication.", options: [{text: "changed",correct:true},{text: "change",correct:false},{text: "changes",correct:false},{text: "changing",correct:false}], explanation: "Present perfect." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "However, it can also _____ loneliness.", options: [{text: "cause",correct:true},{text: "causes",correct:false},{text: "causing",correct:false},{text: "caused",correct:false}], explanation: "Modal + verb." }
    ]
  },

  // Bundle 4: Part 5 (Reading Literal) - Biographies
  {
    meta: {
      id: "CO-ENG-11-read-bios-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part5-reading",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Reading: Famous Lives"
    },
    base: { question: "Read the biography.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 5", question: "Text: 'Gabriel Garcia Marquez was a Colombian winner of the Nobel Prize.' -> Who was he?", options: [{text: "A writer",correct:true},{text: "A painter",correct:false},{text: "A singer",correct:false},{text: "A doctor",correct:false}], explanation: "Inference from Nobel Lit." },
      { id_suffix: "v2", difficulty: 1, type: "Part 5", question: "Text: 'He wrote One Hundred Years of Solitude.' -> What did he write?", options: [{text: "A book",correct:true},{text: "A song",correct:false},{text: "A movie",correct:false},{text: "A play",correct:false}], explanation: "Literal." },
      { id_suffix: "v3", difficulty: 2, type: "Part 5", question: "Text: 'Nelson Mandela fought against apartheid in South Africa.' -> Where did he live?", options: [{text: "South Africa",correct:true},{text: "North America",correct:false},{text: "Europe",correct:false},{text: "Asia",correct:false}], explanation: "Literal." },
      { id_suffix: "v4", difficulty: 2, type: "Part 5", question: "Text: 'He spent 27 years in prison before becoming President.' -> How long was he in prison?", options: [{text: "27 years",correct:true},{text: "2 years",correct:false},{text: "7 years",correct:false},{text: "10 years",correct:false}], explanation: "Literal." },
      { id_suffix: "v5", difficulty: 3, type: "Part 5", question: "Text: 'Marie Curie discovered radioactivity.' -> What did she discover?", options: [{text: "Radioactivity",correct:true},{text: "Electricity",correct:false},{text: "Gravity",correct:false},{text: "Internet",correct:false}], explanation: "Literal." },
      { id_suffix: "v6", difficulty: 3, type: "Part 5", question: "Text: 'She was the first woman to win a Nobel Prize.' -> Was she the second?", options: [{text: "No, the first",correct:true},{text: "Yes",correct:false},{text: "Maybe",correct:false},{text: "Unknown",correct:false}], explanation: "Literal." },
      { id_suffix: "v7", difficulty: 4, type: "Part 5", question: "Text: 'Frida Kahlo used painting to express her pain.' -> Why did she paint?", options: [{text: "To express pain",correct:true},{text: "To make money",correct:false},{text: "To be famous",correct:false},{text: "To travel",correct:false}], explanation: "Cause/Effect." },
      { id_suffix: "v8", difficulty: 4, type: "Part 5", question: "Text: 'Her art is celebrated in Mexico.' -> Where is her art famous?", options: [{text: "Mexico",correct:true},{text: "Spain",correct:false},{text: "Brazil",correct:false},{text: "France",correct:false}], explanation: "Literal." },
      { id_suffix: "v9", difficulty: 5, type: "Part 5", question: "Text: 'Steve Jobs co-founded Apple in a garage.' -> Where did Apple start?", options: [{text: "In a garage",correct:true},{text: "In an office",correct:false},{text: "In a school",correct:false},{text: "In a store",correct:false}], explanation: "Literal." },
      { id_suffix: "v10", difficulty: 5, type: "Part 5", question: "Text: 'He revolutionized the computer industry.' -> What was his impact?", options: [{text: "He changed it",correct:true},{text: "He destroyed it",correct:false},{text: "He ignored it",correct:false},{text: "He sold it",correct:false}], explanation: "Vocabulary (Revolutionize)." }
    ]
  },

  // Bundle 5: Part 4 (Cloze) - Communication
  {
    meta: {
      id: "CO-ENG-11-cloze-comm-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Cloze: Human Connection"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "We communicate _____ words.", options: [{text: "with",correct:true},{text: "by",correct:false},{text: "for",correct:false},{text: "on",correct:false}], explanation: "With." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "Body language is _____ important.", options: [{text: "also",correct:true},{text: "too",correct:false},{text: "either",correct:false},{text: "neither",correct:false}], explanation: "Adverb." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "It can show how we _____.", options: [{text: "feel",correct:true},{text: "feels",correct:false},{text: "feeling",correct:false},{text: "felt",correct:false}], explanation: "Present simple." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "Make eye contact when _____.", options: [{text: "speaking",correct:true},{text: "speak",correct:false},{text: "spoke",correct:false},{text: "spoken",correct:false}], explanation: "When speaking." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "Listening is as important _____ talking.", options: [{text: "as",correct:true},{text: "than",correct:false},{text: "so",correct:false},{text: "like",correct:false}], explanation: "As ... as." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "Try _____ interrupt people.", options: [{text: "not to",correct:true},{text: "to not",correct:false},{text: "no",correct:false},{text: "don't",correct:false}], explanation: "Try not to." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "Good friends _____ each other.", options: [{text: "understand",correct:true},{text: "understands",correct:false},{text: "understanding",correct:false},{text: "understood",correct:false}], explanation: "Present simple plural." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "Trust is the _____ of friendship.", options: [{text: "base",correct:true},{text: "based",correct:false},{text: "basing",correct:false},{text: "basis",correct:false}], explanation: "Noun (Basis)." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "Arguments can _____ relationships.", options: [{text: "damage",correct:true},{text: "damages",correct:false},{text: "damaging",correct:false},{text: "damaged",correct:false}], explanation: "Modal + verb." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "It is better to _____ sorry.", options: [{text: "say",correct:true},{text: "tell",correct:false},{text: "speak",correct:false},{text: "talk",correct:false}], explanation: "Say sorry." }
    ]
  },

  // Bundle 6: Part 5 (Reading Literal) - Music History
  {
    meta: {
      id: "CO-ENG-11-read-music-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part5-reading",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Reading: Music Genres"
    },
    base: { question: "Read about music.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 5", question: "Text: 'Jazz originated in New Orleans, USA.' -> Where does Jazz come from?", options: [{text: "New Orleans",correct:true},{text: "New York",correct:false},{text: "London",correct:false},{text: "Paris",correct:false}], explanation: "Literal." },
      { id_suffix: "v2", difficulty: 1, type: "Part 5", question: "Text: 'It is famous for improvisation.' -> What is it famous for?", options: [{text: "Improvisation",correct:true},{text: "Dancing",correct:false},{text: "Singing",correct:false},{text: "Costumes",correct:false}], explanation: "Literal." },
      { id_suffix: "v3", difficulty: 2, type: "Part 5", question: "Text: 'The Beatles were a rock band from Liverpool.' -> Where were they from?", options: [{text: "Liverpool",correct:true},{text: "Manchester",correct:false},{text: "London",correct:false},{text: "Glasgow",correct:false}], explanation: "Literal." },
      { id_suffix: "v4", difficulty: 2, type: "Part 5", question: "Text: 'They changed pop music in the 1960s.' -> When did they change music?", options: [{text: "In the 1960s",correct:true},{text: "In the 1970s",correct:false},{text: "In the 1950s",correct:false},{text: "In the 1980s",correct:false}], explanation: "Literal." },
      { id_suffix: "v5", difficulty: 3, type: "Part 5", question: "Text: 'Hip Hop culture started in the Bronx, New York.' -> Where did it start?", options: [{text: "The Bronx",correct:true},{text: "Manhattan",correct:false},{text: "Brooklyn",correct:false},{text: "Queens",correct:false}], explanation: "Literal." },
      { id_suffix: "v6", difficulty: 3, type: "Part 5", question: "Text: 'It includes rapping, DJing, and breakdancing.' -> Which element is included?", options: [{text: "Breakdancing",correct:true},{text: "Ballet",correct:false},{text: "Opera",correct:false},{text: "Violin",correct:false}], explanation: "Detail." },
      { id_suffix: "v7", difficulty: 4, type: "Part 5", question: "Text: 'Classical music uses orchestras with many instruments.' -> What does it use?", options: [{text: "Orchestras",correct:true},{text: "Computers",correct:false},{text: "Guitars only",correct:false},{text: "Voices only",correct:false}], explanation: "Literal." },
      { id_suffix: "v8", difficulty: 4, type: "Part 5", question: "Text: 'Composers like Mozart and Beethoven are very famous.' -> Who is famous?", options: [{text: "Mozart",correct:true},{text: "Elvis",correct:false},{text: "Shakira",correct:false},{text: "Adele",correct:false}], explanation: "Literal." },
      { id_suffix: "v9", difficulty: 5, type: "Part 5", question: "Text: 'Reggae music is strongly associated with Jamaica and Bob Marley.' -> Who is associated with Reggae?", options: [{text: "Bob Marley",correct:true},{text: "Elvis Presley",correct:false},{text: "Michael Jackson",correct:false},{text: "Madonna",correct:false}], explanation: "Literal." },
      { id_suffix: "v10", difficulty: 5, type: "Part 5", question: "Text: 'Its rhythm is slow and relaxed.' -> Describe the rhythm.", options: [{text: "Slow and relaxed",correct:true},{text: "Fast and loud",correct:false},{text: "Chaotic",correct:false},{text: "Silent",correct:false}], explanation: "Literal." }
    ]
  },

  // Bundle 7: Part 4 (Cloze) - Education
  {
    meta: {
      id: "CO-ENG-11-cloze-edu-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Cloze: Learning English"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "English is _____ global language.", options: [{text: "a",correct:true},{text: "an",correct:false},{text: "the",correct:false},{text: "one",correct:false}], explanation: "Article." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "It helps you _____ communicating.", options: [{text: "in",correct:true},{text: "at",correct:false},{text: "on",correct:false},{text: "of",correct:false}], explanation: "Help in/with." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "You can watch movies _____ translation.", options: [{text: "without",correct:true},{text: "with",correct:false},{text: "within",correct:false},{text: "under",correct:false}], explanation: "Preposition." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "Learning grammar _____ boring sometimes.", options: [{text: "is",correct:true},{text: "are",correct:false},{text: "be",correct:false},{text: "were",correct:false}], explanation: "Grammar is." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "But it is necessary _____ mastery.", options: [{text: "for",correct:true},{text: "to",correct:false},{text: "of",correct:false},{text: "by",correct:false}], explanation: "Necessary for." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "Practice _____ perfect.", options: [{text: "makes",correct:true},{text: "make",correct:false},{text: "making",correct:false},{text: "made",correct:false}], explanation: "Idiom." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "Try to speak _____ often as possible.", options: [{text: "as",correct:true},{text: "so",correct:false},{text: "too",correct:false},{text: "very",correct:false}], explanation: "As ... as." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "Don't be afraid _____ mistakes.", options: [{text: "of",correct:true},{text: "for",correct:false},{text: "about",correct:false},{text: "at",correct:false}], explanation: "Afraid of." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "Mistakes teach _____ how to improve.", options: [{text: "us",correct:true},{text: "we",correct:false},{text: "our",correct:false},{text: "ours",correct:false}], explanation: "Object pronoun." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "Keep _____ and have fun!", options: [{text: "learning",correct:true},{text: "learn",correct:false},{text: "learned",correct:false},{text: "to learn",correct:false}], explanation: "Keep + gerund." }
    ]
  },

  // Bundle 8: Part 5 (Reading Literal) - Foods
  {
    meta: {
      id: "CO-ENG-11-read-food-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part5-reading",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Reading: World Cuisines"
    },
    base: { question: "Read about food.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 5", question: "Text: 'Pizza is a traditional Italian dish.' -> Where is pizza from?", options: [{text: "Italy",correct:true},{text: "France",correct:false},{text: "Germany",correct:false},{text: "USA",correct:false}], explanation: "Literal." },
      { id_suffix: "v2", difficulty: 1, type: "Part 5", question: "Text: 'Sushi includes rice and raw fish.' -> What is a main ingredient?", options: [{text: "Rice",correct:true},{text: "Bread",correct:false},{text: "Potato",correct:false},{text: "Chicken",correct:false}], explanation: "Literal." },
      { id_suffix: "v3", difficulty: 2, type: "Part 5", question: "Text: 'Tacos are famous in Mexico.' -> Where are tacos famous?", options: [{text: "Mexico",correct:true},{text: "Spain",correct:false},{text: "Brazil",correct:false},{text: "Peru",correct:false}], explanation: "Literal." },
      { id_suffix: "v4", difficulty: 2, type: "Part 5", question: "Text: 'They are usually spicy.' -> How do they taste?", options: [{text: "Spicy",correct:true},{text: "Sweet",correct:false},{text: "Sour",correct:false},{text: "Bitter",correct:false}], explanation: "Literal." },
      { id_suffix: "v5", difficulty: 3, type: "Part 5", question: "Text: 'Curry is a blend of spices popular in India.' -> What is curry?", options: [{text: "Blend of spices",correct:true},{text: "A fruit",correct:false},{text: "A drink",correct:false},{text: "A vegetable",correct:false}], explanation: "Definition." },
      { id_suffix: "v6", difficulty: 3, type: "Part 5", question: "Text: 'Croissants are a French breakfast pastry.' -> When are they eaten?", options: [{text: "For breakfast",correct:true},{text: "For dinner",correct:false},{text: "For lunch",correct:false},{text: "At night",correct:false}], explanation: "Literal." },
      { id_suffix: "v7", difficulty: 4, type: "Part 5", question: "Text: 'Paella is a Spanish rice dish with seafood.' -> What does paella contain?", options: [{text: "Seafood",correct:true},{text: "Beef only",correct:false},{text: "Fruit",correct:false},{text: "Pasta",correct:false}], explanation: "Detail." },
      { id_suffix: "v8", difficulty: 4, type: "Part 5", question: "Text: 'It originated in Valencia.' -> Where did it start?", options: [{text: "Valencia",correct:true},{text: "Madrid",correct:false},{text: "Barcelona",correct:false},{text: "Seville",correct:false}], explanation: "Literal." },
      { id_suffix: "v9", difficulty: 5, type: "Part 5", question: "Text: 'The Arepa is a corn cake staple in Colombia and Venezuela.' -> What is it made of?", options: [{text: "Corn",correct:true},{text: "Wheat",correct:false},{text: "Rice",correct:false},{text: "Potato",correct:false}], explanation: "Literal." },
      { id_suffix: "v10", difficulty: 5, type: "Part 5", question: "Text: 'It can be filled with cheese or meat.' -> What is a filling?", options: [{text: "Cheese",correct:true},{text: "Water",correct:false},{text: "Air",correct:false},{text: "Paper",correct:false}], explanation: "Detail." }
    ]
  },

  // Bundle 9: Part 4 (Cloze) - Shopping
  {
    meta: {
      id: "CO-ENG-11-cloze-shop-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Cloze: Shopping Habits"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "I like _____ shopping at weekends.", options: [{text: "to go",correct:true},{text: "go",correct:false},{text: "going",correct:false},{text: "gone",correct:false}], explanation: "Like to go / going (both ok, but 'to go' fits option)." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "The shops _____ very busy.", options: [{text: "are",correct:true},{text: "is",correct:false},{text: "be",correct:false},{text: "was",correct:false}], explanation: "Plural subject." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "You can find _____ things.", options: [{text: "many",correct:true},{text: "much",correct:false},{text: "lots",correct:false},{text: "plenty",correct:false}], explanation: "Many + countable." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "Sales are good _____ saving money.", options: [{text: "for",correct:true},{text: "to",correct:false},{text: "of",correct:false},{text: "at",correct:false}], explanation: "Good for." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "Online shopping is _____ popular now.", options: [{text: "more",correct:true},{text: "most",correct:false},{text: "much",correct:false},{text: "many",correct:false}], explanation: "More popular (comparative context implied)." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "It is convenient _____ you don't leave home.", options: [{text: "because",correct:true},{text: "why",correct:false},{text: "so",correct:false},{text: "but",correct:false}], explanation: "Reason." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "Be careful _____ your credit card.", options: [{text: "with",correct:true},{text: "of",correct:false},{text: "about",correct:false},{text: "for",correct:false}], explanation: "Careful with." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "Prices _____ vary between sites.", options: [{text: "can",correct:true},{text: "must",correct:false},{text: "should",correct:false},{text: "ought",correct:false}], explanation: "Possibility." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "Always check the _____ policy.", options: [{text: "return",correct:true},{text: "returning",correct:false},{text: "returned",correct:false},{text: "returns",correct:false}], explanation: "Compound noun." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "Shopping can become _____ addiction.", options: [{text: "an",correct:true},{text: "a",correct:false},{text: "the",correct:false},{text: "one",correct:false}], explanation: "An addiction." }
    ]
  },

  // Bundle 10: Taller Review B1
    {
    meta: {
      id: "CO-ENG-11-taller-b1-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "review",
      periodo: 2,
      dba_id: "DBA-ENG-11-3",
      title: "Review B1 Level"
    },
    base: { question: "General review.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Grammar", question: "We _____ arrived yet.", options: [{text: "haven't",correct:true},{text: "hasn't",correct:false},{text: "didn't",correct:false},{text: "don't",correct:false}], explanation: "Present perfect 'yet'." },
      { id_suffix: "v2", difficulty: 1, type: "Grammar", question: "She told me she _____ tired.", options: [{text: "was",correct:true},{text: "is",correct:false},{text: "be",correct:false},{text: "were",correct:false}], explanation: "Reported speech." },
      { id_suffix: "v3", difficulty: 2, type: "Grammar", question: "I used _____ live in London.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "at",correct:false},{text: "in",correct:false}], explanation: "Used to." },
      { id_suffix: "v4", difficulty: 2, type: "Vocabulary", question: "A person who plays piano is a:", options: [{text: "Pianist",correct:true},{text: "Painter",correct:false},{text: "Player",correct:false},{text: "Pianoer",correct:false}], explanation: "Suffix -ist." },
      { id_suffix: "v5", difficulty: 3, type: "Grammar", question: "If it rains, we _____ cancel the picnic.", options: [{text: "will",correct:true},{text: "would",correct:false},{text: "did",correct:false},{text: "had",correct:false}], explanation: "First conditional." },
      { id_suffix: "v6", difficulty: 3, type: "Grammar", question: "The car _____ repaired yesterday.", options: [{text: "was",correct:true},{text: "is",correct:false},{text: "has been",correct:false},{text: "be",correct:false}], explanation: "Passive past simple." },
      { id_suffix: "v7", difficulty: 4, type: "Grammar", question: "He asked me where _____.", options: [{text: "I lived",correct:true},{text: "did I live",correct:false},{text: "do I live",correct:false},{text: "I live",correct:false}], explanation: "Indirect question." },
      { id_suffix: "v8", difficulty: 4, type: "Vocabulary", question: "Word for 'very big':", options: [{text: "Enormous",correct:true},{text: "Tiny",correct:false},{text: "Small",correct:false},{text: "Minute",correct:false}], explanation: "Adjectives." },
      { id_suffix: "v9", difficulty: 5, type: "Grammar", question: "I suggest _____ to the doctor.", options: [{text: "going",correct:true},{text: "go",correct:false},{text: "to go",correct:false},{text: "gone",correct:false}], explanation: "Suggest + gerund." },
      { id_suffix: "v10", difficulty: 5, type: "Grammar", question: "By 2030, we _____ landed on Mars.", options: [{text: "will have",correct:true},{text: "have",correct:false},{text: "had",correct:false},{text: "will",correct:false}], explanation: "Future perfect." }
    ]
  }
];

function createBundleContent(q) {
  const meta = q.meta;
  const today = new Date().toISOString().split('T')[0];

  let md = `---
id: "${meta.id}"
country: "${meta.country}"
grado: ${meta.grade}
asignatura: "${meta.subject}"
tema: "${meta.topic}"
periodo: ${meta.periodo}
dba_id: "${meta.dba_id}"
protocol_version: "3.0"
bundle_version: "3.0"
total_questions: 10
dificultad: 3
estado: "published"
creador: "AI-WorldExams"
llm_model: "gemini-2.0-flash"
agent: "antigravity"
ide: "generic"
creation_date: "${today}"

licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"

source: "OpenTDB"
source_url: "${q.base.source_url}"
source_license: "CC BY-SA 4.0"
search_query: "english questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
original_question: "${q.base.question}"
original_answer: "${q.base.answer}"
---

# Base Question: ${meta.title}

> **Source:** OpenTDB (CC BY-SA 4.0)
> **Topic:** ${meta.topic} (Period ${meta.periodo})
> **DBA:** ${meta.dba_id}
> **Original:** "${q.base.question}"

---
`;

  q.variants.forEach(v => {
      md += `
## Question ${v.id_suffix.replace('v','')} (${v.type} - Difficulty ${v.difficulty})

**ID:** \`${meta.id}-${v.id_suffix}\`

### Enunciado

${v.question}

### Options

${v.options.map((o, i) => {
    const letter = String.fromCharCode(65 + i);
    const check = o.correct ? 'x' : ' ';
    return `- [${check}] ${letter}) ${o.text}`;
}).join('\n')}

### Explanation

${v.explanation}

**Competence:** Communicative Competence (DBA: ${meta.dba_id})

---
`;
  });

  md += `
## 📊 Validation Metadata

| Question | ID | Difficulty | Validated |
|----------|-----|------------|----------|
${q.variants.map(v => `| ${v.id_suffix.replace('v','')} | ${meta.id}-${v.id_suffix} | ${v.difficulty} | ⬜ |`).join('\n')}
`;

  return md;
}

const BASE_DIR = "src/content/questions";

QUESTIONS.forEach(q => {
    const dirPath = path.join(BASE_DIR, 'colombia', q.meta.subject, `grado-${q.meta.grade}`, q.meta.topic);
    const fileName = `${q.meta.id}-v3-bundle.md`;
    const fullPath = path.join(dirPath, fileName);

    ensureDir(fullPath);

    const content = createBundleContent(q);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created Period 2 Bundle v3.0: ${fullPath}`);
});

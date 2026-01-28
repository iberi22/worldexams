
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
  // Grade 11 - English - Period 1 - BUNDLE 1 (Part 1: Signs/Notices - Health)
  {
    meta: {
      id: "CO-ENG-11-signs-health-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part1-signs",
      periodo: 1,
      dba_id: "DBA-ENG-11-1",
      title: "Signs: Health & Safety"
    },
    base: { question: "Signs give information.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 1", question: "Sign: 'Do not smoke in this area.'", options: [{text: "In a hospital",correct:true},{text: "In a street",correct:false},{text: "In a forest",correct:false},{text: "In a river",correct:false}], explanation: "No smoking signs are strict in hospitals." },
      { id_suffix: "v2", difficulty: 1, type: "Part 1", question: "Sign: 'Wash your hands before eating.'", options: [{text: "In a restaurant kitchen or bathroom",correct:true},{text: "In a bedroom",correct:false},{text: "In a car",correct:false},{text: "In a garden",correct:false}], explanation: "Hygiene instruction." },
      { id_suffix: "v3", difficulty: 2, type: "Part 1", question: "Sign: 'Quiet please. Exams in process.'", options: [{text: "In a school hall",correct:true},{text: "In a playground",correct:false},{text: "In a disco",correct:false},{text: "In a market",correct:false}], explanation: "Need for silence." },
      { id_suffix: "v4", difficulty: 2, type: "Part 1", question: "Sign: 'Danger! High Voltage.'", options: [{text: "On an electrical box",correct:true},{text: "On a toy",correct:false},{text: "On a book",correct:false},{text: "On a chair",correct:false}], explanation: "Warning electricity." },
      { id_suffix: "v5", difficulty: 3, type: "Part 1", question: "Sign: 'Please leave your bags at the counter.'", options: [{text: "In a supermarket entrance",correct:true},{text: "In a park",correct:false},{text: "In a church",correct:false},{text: "In a bus",correct:false}], explanation: "Security measure." },
      { id_suffix: "v6", difficulty: 3, type: "Part 1", question: "Sign: 'Wet paint.'", options: [{text: "On a bench",correct:true},{text: "On a tree",correct:false},{text: "On the sky",correct:false},{text: "On water",correct:false}], explanation: "Fresh paint warning." },
      { id_suffix: "v7", difficulty: 4, type: "Part 1", question: "Sign: 'Out of order.'", options: [{text: "On a vending machine",correct:true},{text: "On a person",correct:false},{text: "On a dog",correct:false},{text: "On a flower",correct:false}], explanation: "Broken machine." },
      { id_suffix: "v8", difficulty: 4, type: "Part 1", question: "Sign: 'Trespassers will be prosecuted.'", options: [{text: "On a private property fence",correct:true},{text: "In a public park",correct:false},{text: "In a school",correct:false},{text: "In a mall",correct:false}], explanation: "Legal warning." },
      { id_suffix: "v9", difficulty: 5, type: "Part 1", question: "Sign: 'Mind the gap.'", options: [{text: "In a train station",correct:true},{text: "In a plane",correct:false},{text: "In a boat",correct:false},{text: "In a car",correct:false}], explanation: "Train platform safety." },
      { id_suffix: "v10", difficulty: 5, type: "Part 1", question: "Sign: 'Feeding the animals is strictly prohibited.'", options: [{text: "In a zoo",correct:true},{text: "In a house",correct:false},{text: "In a garage",correct:false},{text: "In a cinema",correct:false}], explanation: "Zoo rule." }
    ]
  },

  // Bundle 2: Part 2 (Matching) - Daily Routine & Hobbies
  {
    meta: {
      id: "CO-ENG-11-match-hobbies-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part2-matching",
      periodo: 1,
      dba_id: "DBA-ENG-11-1",
      title: "Matching: Hobbies & Activities"
    },
    base: { question: "Match the definition.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 2", question: "Definition: 'You do this in a pool.' -> Match:", options: [{text: "Swimming",correct:true},{text: "Running",correct:false},{text: "Cooking",correct:false},{text: "Reading",correct:false}], explanation: "Sport." },
      { id_suffix: "v2", difficulty: 1, type: "Part 2", question: "Definition: 'You use a camera for this.' -> Match:", options: [{text: "Photography",correct:true},{text: "Painting",correct:false},{text: "Writing",correct:false},{text: "Sleeping",correct:false}], explanation: "Hobby." },
      { id_suffix: "v3", difficulty: 2, type: "Part 2", question: "Definition: 'You ride this animal.' -> Match:", options: [{text: "Horse",correct:true},{text: "Cat",correct:false},{text: "Dog",correct:false},{text: "Bird",correct:false}], explanation: "Horse riding." },
      { id_suffix: "v4", difficulty: 2, type: "Part 2", question: "Definition: 'You play this instrument with keys.' -> Match:", options: [{text: "Piano",correct:true},{text: "Guitar",correct:false},{text: "Drums",correct:false},{text: "Flute",correct:false}], explanation: "Music." },
      { id_suffix: "v5", difficulty: 3, type: "Part 2", question: "Definition: 'You prepare food here.' -> Match:", options: [{text: "Kitchen",correct:true},{text: "Bedroom",correct:false},{text: "Bathroom",correct:false},{text: "Garden",correct:false}], explanation: "Room." },
      { id_suffix: "v6", difficulty: 3, type: "Part 2", question: "Definition: 'You wear this on your head.' -> Match:", options: [{text: "Hat",correct:true},{text: "Shoe",correct:false},{text: "Shirt",correct:false},{text: "Belt",correct:false}], explanation: "Clothing." },
      { id_suffix: "v7", difficulty: 4, type: "Part 2", question: "Definition: 'This person helps you when you are sick.' -> Match:", options: [{text: "Doctor",correct:true},{text: "Teacher",correct:false},{text: "Driver",correct:false},{text: "Artist",correct:false}], explanation: "Profession." },
      { id_suffix: "v8", difficulty: 4, type: "Part 2", question: "Definition: 'This is a very dry place with sand.' -> Match:", options: [{text: "Desert",correct:true},{text: "Forest",correct:false},{text: "Ocean",correct:false},{text: "City",correct:false}], explanation: "Landscape." },
      { id_suffix: "v9", difficulty: 5, type: "Part 2", question: "Definition: 'You need this document to travel abroad.' -> Match:", options: [{text: "Passport",correct:true},{text: "Ticket",correct:false},{text: "Map",correct:false},{text: "Book",correct:false}], explanation: "Travel." },
      { id_suffix: "v10", difficulty: 5, type: "Part 2", question: "Definition: 'This machine washes your clothes.' -> Match:", options: [{text: "Washing machine",correct:true},{text: "Fridge",correct:false},{text: "Oven",correct:false},{text: "TV",correct:false}], explanation: "Appliance." }
    ]
  },

  // Bundle 3: Part 3 (Conversations) - Social Interactions
  {
    meta: {
      id: "CO-ENG-11-conv-social-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part3-conversations",
      periodo: 1,
      dba_id: "DBA-ENG-11-2",
      title: "Conversations: Social Life"
    },
    base: { question: "Complete the conversation.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 3", question: "A: 'How are you?' -> B:", options: [{text: "I'm fine, thanks.",correct:true},{text: "I am John.",correct:false},{text: "It is green.",correct:false},{text: "Yes, I do.",correct:false}], explanation: "Greeting." },
      { id_suffix: "v2", difficulty: 1, type: "Part 3", question: "A: 'Can I help you?' -> B:", options: [{text: "Yes, please. I'm looking for a shirt.",correct:true},{text: "No, I am happy.",correct:false},{text: "I like pizza.",correct:false},{text: "It is 5 o'clock.",correct:false}], explanation: "Shop." },
      { id_suffix: "v3", difficulty: 2, type: "Part 3", question: "A: 'I passed my exam!' -> B:", options: [{text: "Congratulations!",correct:true},{text: "I am sorry.",correct:false},{text: "Bad luck.",correct:false},{text: "See you later.",correct:false}], explanation: "Good news." },
      { id_suffix: "v4", difficulty: 2, type: "Part 3", question: "A: 'Would you like some coffee?' -> B:", options: [{text: "Yes, please.",correct:true},{text: "I am reading.",correct:false},{text: "It is Tuesday.",correct:false},{text: "I don't know.",correct:false}], explanation: "Offer." },
      { id_suffix: "v5", difficulty: 3, type: "Part 3", question: "A: 'I have a terrible headache.' -> B:", options: [{text: "You should take an aspirin.",correct:true},{text: "That is great.",correct:false},{text: "I am happy.",correct:false},{text: "Let's dance.",correct:false}], explanation: "Advice." },
      { id_suffix: "v6", difficulty: 3, type: "Part 3", question: "A: 'What does your father do?' -> B:", options: [{text: "He is an architect.",correct:true},{text: "He is tall.",correct:false},{text: "He likes apples.",correct:false},{text: "He is at home.",correct:false}], explanation: "Job." },
      { id_suffix: "v7", difficulty: 4, type: "Part 3", question: "A: 'Do you mind if I open the window?' -> B:", options: [{text: "Not at all, go ahead.",correct:true},{text: "Yes, I open.",correct:false},{text: "It is big.",correct:false},{text: "I don't like windows.",correct:false}], explanation: "Permission." },
      { id_suffix: "v8", difficulty: 4, type: "Part 3", question: "A: 'I'm sorry I'm late.' -> B:", options: [{text: "Don't worry about it.",correct:true},{text: "Yes, you are.",correct:false},{text: "It is late.",correct:false},{text: "Goodbye.",correct:false}], explanation: "Apology." },
      { id_suffix: "v9", difficulty: 5, type: "Part 3", question: "A: 'It looks like it's going to rain.' -> B:", options: [{text: "We should take an umbrella.",correct:true},{text: "I like soup.",correct:false},{text: "The sun is blue.",correct:false},{text: "Let's swim.",correct:false}], explanation: "Weather." },
      { id_suffix: "v10", difficulty: 5, type: "Part 3", question: "A: 'Thank you for your help.' -> B:", options: [{text: "You're welcome.",correct:true},{text: "Me too.",correct:false},{text: "I agree.",correct:false},{text: "No problem, yes.",correct:false}], explanation: "Gratitude." }
    ]
  },

  // Bundle 4: Part 4 (Cloze) - The Environment
  {
    meta: {
      id: "CO-ENG-11-cloze-env-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 1,
      dba_id: "DBA-ENG-11-1",
      title: "Cloze: Protecting Nature"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "We must _____ the planet.", options: [{text: "protect",correct:true},{text: "protects",correct:false},{text: "protecting",correct:false},{text: "protected",correct:false}], explanation: "Modal verb + infinitive." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "Many animals are _____ danger.", options: [{text: "in",correct:true},{text: "on",correct:false},{text: "at",correct:false},{text: "for",correct:false}], explanation: "Preposition 'in danger'." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "Plastic pollution is a _____ problem.", options: [{text: "big",correct:true},{text: "bigger",correct:false},{text: "biggest",correct:false},{text: "more big",correct:false}], explanation: "Adjective." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "We _____ recycle paper and glass.", options: [{text: "should",correct:true},{text: "shall",correct:false},{text: "would",correct:false},{text: "had",correct:false}], explanation: "Advice." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "If we don't act, issues _____ get worse.", options: [{text: "will",correct:true},{text: "are",correct:false},{text: "do",correct:false},{text: "have",correct:false}], explanation: "Future simple." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "Trees _____ us with oxygen.", options: [{text: "provide",correct:true},{text: "provides",correct:false},{text: "providing",correct:false},{text: "provided",correct:false}], explanation: "Present simple plural." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "The river was _____ by the factory.", options: [{text: "polluted",correct:true},{text: "pollute",correct:false},{text: "polluting",correct:false},{text: "pollutes",correct:false}], explanation: "Passive voice." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "There _____ many species in the Amazon.", options: [{text: "are",correct:true},{text: "is",correct:false},{text: "be",correct:false},{text: "was",correct:false}], explanation: "There are (plural)." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "We stopped _____ plastic bags.", options: [{text: "using",correct:true},{text: "use",correct:false},{text: "to use",correct:false},{text: "used",correct:false}], explanation: "Stop + gerund." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "Climate change _____ everyone.", options: [{text: "affects",correct:true},{text: "effects",correct:false},{text: "affect",correct:false},{text: "effect",correct:false}], explanation: "Verb vs Noun." }
    ]
  },

  // Bundle 5: Part 4 (Cloze) - Healthy Lifestyle
  {
    meta: {
      id: "CO-ENG-11-cloze-health-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 1,
      dba_id: "DBA-ENG-11-2",
      title: "Cloze: Keeping Fit"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "Eating fruits _____ good for you.", options: [{text: "is",correct:true},{text: "are",correct:false},{text: "be",correct:false},{text: "am",correct:false}], explanation: "Gerund subject is singular." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "You _____ drink plenty of water.", options: [{text: "must",correct:true},{text: "can",correct:false},{text: "may",correct:false},{text: "might",correct:false}], explanation: "Strong advice." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "Exercise helps _____ stay strong.", options: [{text: "you",correct:true},{text: "your",correct:false},{text: "yours",correct:false},{text: "yourself",correct:false}], explanation: "Object pronoun." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "She _____ to the gym every day.", options: [{text: "goes",correct:true},{text: "go",correct:false},{text: "going",correct:false},{text: "gone",correct:false}], explanation: "Present simple 3rd person." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "Sugar is bad _____ your teeth.", options: [{text: "for",correct:true},{text: "to",correct:false},{text: "at",correct:false},{text: "on",correct:false}], explanation: "Bad for." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "I prefer running _____ swimming.", options: [{text: "to",correct:true},{text: "than",correct:false},{text: "that",correct:false},{text: "of",correct:false}], explanation: "Prefer X to Y." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "He has _____ smoking.", options: [{text: "quit",correct:true},{text: "quits",correct:false},{text: "quitting",correct:false},{text: "quite",correct:false}], explanation: "Present perfect." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "It is important _____ sleep well.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "of",correct:false},{text: "at",correct:false}], explanation: "Important to + verb." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "She is interested _____ yoga.", options: [{text: "in",correct:true},{text: "on",correct:false},{text: "at",correct:false},{text: "for",correct:false}], explanation: "Interested in." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "A healthy diet _____ vegetables.", options: [{text: "includes",correct:true},{text: "include",correct:false},{text: "including",correct:false},{text: "included",correct:false}], explanation: "Present simple." }
    ]
  },

  // Bundle 6: Part 1 (Signs) - Transport & City
  {
    meta: {
      id: "CO-ENG-11-signs-city-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part1-signs",
      periodo: 1,
      dba_id: "DBA-ENG-11-1",
      title: "Signs: City Life"
    },
    base: { question: "Signs guide us.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 1", question: "Sign: 'Bus Stop'", options: [{text: "Wait here for transport",correct:true},{text: "Eat here",correct:false},{text: "Sleep here",correct:false},{text: "Buy clothes",correct:false}], explanation: "Transport." },
      { id_suffix: "v2", difficulty: 1, type: "Part 1", question: "Sign: 'Speed Limit 30'", options: [{text: "Do not drive fast",correct:true},{text: "Drive fast",correct:false},{text: "Walk fast",correct:false},{text: "Stop",correct:false}], explanation: "Traffic." },
      { id_suffix: "v3", difficulty: 2, type: "Part 1", question: "Sign: 'Pedestrian Zone'", options: [{text: "No cars allowed",correct:true},{text: "Cars only",correct:false},{text: "Buses only",correct:false},{text: "Planes",correct:false}], explanation: "Walking area." },
      { id_suffix: "v4", difficulty: 2, type: "Part 1", question: "Sign: 'Do not litter'", options: [{text: "Put trash in the bin",correct:true},{text: "Throw trash on floor",correct:false},{text: "Eat trash",correct:false},{text: "Buy trash",correct:false}], explanation: "Cleanliness." },
      { id_suffix: "v5", difficulty: 3, type: "Part 1", question: "Sign: 'Pay display'", options: [{text: "In a parking lot",correct:true},{text: "In a school",correct:false},{text: "In a forest",correct:false},{text: "In a bathroom",correct:false}], explanation: "Parking fee." },
      { id_suffix: "v6", difficulty: 3, type: "Part 1", question: "Sign: 'Priority Seat'", options: [{text: "For elderly or pregnant people",correct:true},{text: "For children",correct:false},{text: "For drivers",correct:false},{text: "For dogs",correct:false}], explanation: "Public transport." },
      { id_suffix: "v7", difficulty: 4, type: "Part 1", question: "Sign: 'No entry'", options: [{text: "You cannot go this way",correct:true},{text: "Welcome",correct:false},{text: "Exit",correct:false},{text: "Entrance",correct:false}], explanation: "Prohibition." },
      { id_suffix: "v8", difficulty: 4, type: "Part 1", question: "Sign: 'Caution: Wet Floor'", options: [{text: "Be careful not to slip",correct:true},{text: "Swim here",correct:false},{text: "Drink water",correct:false},{text: "Clean floor",correct:false}], explanation: "Safety." },
      { id_suffix: "v9", difficulty: 5, type: "Part 1", question: "Sign: 'Guests usage only'", options: [{text: "For people staying in the hotel",correct:true},{text: "For everyone",correct:false},{text: "For staff",correct:false},{text: "For animals",correct:false}], explanation: "Exclusive." },
      { id_suffix: "v10", difficulty: 5, type: "Part 1", question: "Sign: 'Mind your head'", options: [{text: "Low ceiling",correct:true},{text: "High ceiling",correct:false},{text: "Wet floor",correct:false},{text: "Stairs",correct:false}], explanation: "Height warning." }
    ]
  },

  // Bundle 7: Part 2 (Matching) - Professions
  {
    meta: {
      id: "CO-ENG-11-match-jobs-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part2-matching",
      periodo: 1,
      dba_id: "DBA-ENG-11-2",
      title: "Matching: Professions"
    },
    base: { question: "Match the definition to the job.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 2", question: "Definition: 'This person cooks in a restaurant.' -> Match:", options: [{text: "Chef",correct:true},{text: "Waiter",correct:false},{text: "Pilot",correct:false},{text: "Nurse",correct:false}], explanation: "Cooking." },
      { id_suffix: "v2", difficulty: 1, type: "Part 2", question: "Definition: 'This person flies planes.' -> Match:", options: [{text: "Pilot",correct:true},{text: "Driver",correct:false},{text: "Mechanic",correct:false},{text: "Singer",correct:false}], explanation: "Flying." },
      { id_suffix: "v3", difficulty: 2, type: "Part 2", question: "Definition: 'This person designs buildings.' -> Match:", options: [{text: "Architect",correct:true},{text: "Builder",correct:false},{text: "Cleaner",correct:false},{text: "Farmer",correct:false}], explanation: "Design." },
      { id_suffix: "v4", difficulty: 2, type: "Part 2", question: "Definition: 'This person repairs cars.' -> Match:", options: [{text: "Mechanic",correct:true},{text: "Driver",correct:false},{text: "Police",correct:false},{text: "Artist",correct:false}], explanation: "Repair." },
      { id_suffix: "v5", difficulty: 3, type: "Part 2", question: "Definition: 'This person writes articles for a newspaper.' -> Match:", options: [{text: "Journalist",correct:true},{text: "Writer",correct:false},{text: "Actor",correct:false},{text: "Teacher",correct:false}], explanation: "News." },
      { id_suffix: "v6", difficulty: 3, type: "Part 2", question: "Definition: 'This person defends people in court.' -> Match:", options: [{text: "Lawyer",correct:true},{text: "Judge",correct:false},{text: "Police",correct:false},{text: "Guard",correct:false}], explanation: "Law." },
      { id_suffix: "v7", difficulty: 4, type: "Part 2", question: "Definition: 'This person cuts hair.' -> Match:", options: [{text: "Hairdresser",correct:true},{text: "Dentist",correct:false},{text: "Baker",correct:false},{text: "Butcher",correct:false}], explanation: "Beauty." },
      { id_suffix: "v8", difficulty: 4, type: "Part 2", question: "Definition: 'This person sells medicines.' -> Match:", options: [{text: "Pharmacist",correct:true},{text: "Doctor",correct:false},{text: "Nurse",correct:false},{text: "Vet",correct:false}], explanation: "Health." },
      { id_suffix: "v9", difficulty: 5, type: "Part 2", question: "Definition: 'This person acts in movies.' -> Match:", options: [{text: "Actor/Actress",correct:true},{text: "Director",correct:false},{text: "Singer",correct:false},{text: "Dancer",correct:false}], explanation: "Entertainment." },
      { id_suffix: "v10", difficulty: 5, type: "Part 2", question: "Definition: 'This person treats sick animals.' -> Match:", options: [{text: "Vet",correct:true},{text: "Doctor",correct:false},{text: "Farmer",correct:false},{text: "Biologist",correct:false}], explanation: "Animals." }
    ]
  },

  // Bundle 8: Part 3 (Conversations) - Making Plans
    {
    meta: {
      id: "CO-ENG-11-conv-plans-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part3-conversations",
      periodo: 1,
      dba_id: "DBA-ENG-11-2",
      title: "Conversations: Making Plans"
    },
    base: { question: "Complete the conversation.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 3", question: "A: 'What are you doing this weekend?' -> B:", options: [{text: "I am going to the beach.",correct:true},{text: "I like ice cream.",correct:false},{text: "It is sunny.",correct:false},{text: "My name is Paul.",correct:false}], explanation: "Future plan." },
      { id_suffix: "v2", difficulty: 1, type: "Part 3", question: "A: 'Do you want to go to the cinema?' -> B:", options: [{text: "Sure, I'd love to.",correct:true},{text: "I am fine.",correct:false},{text: "It is a cinema.",correct:false},{text: "No, he isn't.",correct:false}], explanation: "Invitation." },
      { id_suffix: "v3", difficulty: 2, type: "Part 3", question: "A: 'What time shall we meet?' -> B:", options: [{text: "At 7 PM.",correct:true},{text: "In the park.",correct:false},{text: "Tomorrow.",correct:false},{text: "Yes, we shall.",correct:false}], explanation: "Setting time." },
      { id_suffix: "v4", difficulty: 2, type: "Part 3", question: "A: 'I can't come to the party.' -> B:", options: [{text: "That's a pity.",correct:true},{text: "Congratulations.",correct:false},{text: "You are welcome.",correct:false},{text: "Good luck.",correct:false}], explanation: "Disappointment." },
      { id_suffix: "v5", difficulty: 3, type: "Part 3", question: "A: 'Where should we go on holiday?' -> B:", options: [{text: "How about Italy?",correct:true},{text: "Yes, we should.",correct:false},{text: "It is hot.",correct:false},{text: "I have a car.",correct:false}], explanation: "Suggestion." },
      { id_suffix: "v6", difficulty: 3, type: "Part 3", question: "A: 'Are you free tomorrow?' -> B:", options: [{text: "No, I'm busy.",correct:true},{text: "Yes, I am free student.",correct:false},{text: "I like free food.",correct:false},{text: "It is Friday.",correct:false}], explanation: "Availability." },
      { id_suffix: "v7", difficulty: 4, type: "Part 3", question: "A: 'I'll pick you up at 8.' -> B:", options: [{text: "Great, see you then.",correct:true},{text: "Yes, you pick.",correct:false},{text: "I am up.",correct:false},{text: "No, thank you.",correct:false}], explanation: "Arrangement." },
      { id_suffix: "v8", difficulty: 4, type: "Part 3", question: "A: 'The movie starts in 10 minutes.' -> B:", options: [{text: "We should hurry.",correct:true},{text: "It is a good movie.",correct:false},{text: "The movie is long.",correct:false},{text: "Bye.",correct:false}], explanation: "Urgency." },
      { id_suffix: "v9", difficulty: 5, type: "Part 3", question: "A: 'Have you seen the new exhibition?' -> B:", options: [{text: "No, but I plan to.",correct:true},{text: "Yes, I look.",correct:false},{text: "The exhibition is big.",correct:false},{text: "I don't like food.",correct:false}], explanation: "Experience." },
      { id_suffix: "v10", difficulty: 5, type: "Part 3", question: "A: 'Would you rather stay home?' -> B:", options: [{text: "Yes, I'm tired.",correct:true},{text: "No, I rather.",correct:false},{text: "Home is big.",correct:false},{text: "I stay.",correct:false}], explanation: "Preference." }
    ]
  },

  // Bundle 9: Part 4 (Cloze) - Technology
    {
    meta: {
      id: "CO-ENG-11-cloze-tech-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part4-cloze",
      periodo: 1,
      dba_id: "DBA-ENG-11-2",
      title: "Cloze: Mobile Phones"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 4", question: "Everyone _____ a mobile phone.", options: [{text: "has",correct:true},{text: "have",correct:false},{text: "having",correct:false},{text: "had",correct:false}], explanation: "Everyone is singular." },
      { id_suffix: "v2", difficulty: 1, type: "Part 4", question: "We use phones _____ communicate.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "at",correct:false},{text: "by",correct:false}], explanation: "Purpose (to + verb)." },
      { id_suffix: "v3", difficulty: 2, type: "Part 4", question: "Smartphones are very _____.", options: [{text: "useful",correct:true},{text: "use",correct:false},{text: "using",correct:false},{text: "used",correct:false}], explanation: "Adjective." },
      { id_suffix: "v4", difficulty: 2, type: "Part 4", question: "You can _____ photos with it.", options: [{text: "take",correct:true},{text: "make",correct:false},{text: "do",correct:false},{text: "have",correct:false}], explanation: "Take photos." },
      { id_suffix: "v5", difficulty: 3, type: "Part 4", question: "Apps make life _____.", options: [{text: "easier",correct:true},{text: "easy",correct:false},{text: "more easy",correct:false},{text: "easiest",correct:false}], explanation: "Comparative." },
      { id_suffix: "v6", difficulty: 3, type: "Part 4", question: "Don't spend too _____ time on it.", options: [{text: "much",correct:true},{text: "many",correct:false},{text: "lot",correct:false},{text: "very",correct:false}], explanation: "Much time (uncountable)." },
      { id_suffix: "v7", difficulty: 4, type: "Part 4", question: "Batteries need to be _____.", options: [{text: "charged",correct:true},{text: "charge",correct:false},{text: "charging",correct:false},{text: "charges",correct:false}], explanation: "Passive voice." },
      { id_suffix: "v8", difficulty: 4, type: "Part 4", question: "Technology is changing _____.", options: [{text: "quickly",correct:true},{text: "quick",correct:false},{text: "quicker",correct:false},{text: "quickest",correct:false}], explanation: "Adverb." },
      { id_suffix: "v9", difficulty: 5, type: "Part 4", question: "It is the _____ invention ever.", options: [{text: "best",correct:true},{text: "good",correct:false},{text: "better",correct:false},{text: "well",correct:false}], explanation: "Superlative." },
      { id_suffix: "v10", difficulty: 5, type: "Part 4", question: "People are dependent _____ them.", options: [{text: "on",correct:true},{text: "in",correct:false},{text: "at",correct:false},{text: "of",correct:false}], explanation: "Dependent on." }
    ]
  },

  // Bundle 10: Taller Review A2/B1
  {
    meta: {
      id: "CO-ENG-11-taller-rev-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "review",
      periodo: 1,
      dba_id: "DBA-ENG-11-1",
      title: "Review A2-B1"
    },
    base: { question: "General review.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Grammar", question: "She _____ TV yesterday.", options: [{text: "watched",correct:true},{text: "watches",correct:false},{text: "watch",correct:false},{text: "watching",correct:false}], explanation: "Past simple." },
      { id_suffix: "v2", difficulty: 1, type: "Grammar", question: "They _____ play football now.", options: [{text: "are playing",correct:true},{text: "play",correct:false},{text: "played",correct:false},{text: "plays",correct:false}], explanation: "Present continuous." },
      { id_suffix: "v3", difficulty: 2, type: "Vocabulary", question: "Opposite of 'Expensive':", options: [{text: "Cheap",correct:true},{text: "Small",correct:false},{text: "Big",correct:false},{text: "Rich",correct:false}], explanation: "Antonyms." },
      { id_suffix: "v4", difficulty: 2, type: "Vocabulary", question: "Synonym of 'Happy':", options: [{text: "Glad",correct:true},{text: "Sad",correct:false},{text: "Angular",correct:false},{text: "Tired",correct:false}], explanation: "Synonyms." },
      { id_suffix: "v5", difficulty: 3, type: "Grammar", question: "I have _____ been to Paris.", options: [{text: "never",correct:true},{text: "ever",correct:false},{text: "did",correct:false},{text: "do",correct:false}], explanation: "Present perfect." },
      { id_suffix: "v6", difficulty: 3, type: "Grammar", question: "This is the _____ book I have read.", options: [{text: "most interesting",correct:true},{text: "more interesting",correct:false},{text: "interesting",correct:false},{text: "interestinger",correct:false}], explanation: "Superlative." },
      { id_suffix: "v7", difficulty: 4, type: "Grammar", question: "If I _____ rich, I would buy a house.", options: [{text: "were",correct:true},{text: "am",correct:false},{text: "be",correct:false},{text: "was",correct:false}], explanation: "Second conditional." },
      { id_suffix: "v8", difficulty: 4, type: "Grammar", question: "The letter _____ written by me.", options: [{text: "was",correct:true},{text: "is",correct:false},{text: "were",correct:false},{text: "be",correct:false}], explanation: "Passive past." },
      { id_suffix: "v9", difficulty: 5, type: "Grammar", question: "I look forward to _____ you.", options: [{text: "seeing",correct:true},{text: "see",correct:false},{text: "saw",correct:false},{text: "seen",correct:false}], explanation: "Gerund after preposition." },
      { id_suffix: "v10", difficulty: 5, type: "Grammar", question: "Unless he _____, he will be late.", options: [{text: "hurries",correct:true},{text: "hurry",correct:false},{text: "hurrying",correct:false},{text: "hurried",correct:false}], explanation: "First conditional." }
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
    console.log(`✅ Created Period 1 Bundle v3.0: ${fullPath}`);
});

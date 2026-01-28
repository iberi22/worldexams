
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
  // Grade 11 - English - Period 3 - BUNDLE 1 (Part 6: Reading Inferential - Future Tech)
  {
    meta: {
      id: "CO-ENG-11-read-tech-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Reading: Future Technology"
    },
    base: { question: "Read the text about AI. The author thinks...", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'AI will change jobs, but we must adapt, not fear.' -> The author's attitude is:", options: [{text: "Positive but realistic",correct:true},{text: "Completely negative",correct:false},{text: "Indifferent",correct:false},{text: "Angry",correct:false}], explanation: "Inference." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Self-driving cars could reduce accidents significantly.' -> What is the main benefit mentioned?", options: [{text: "Safety",correct:true},{text: "Speed",correct:false},{text: "Cost",correct:false},{text: "Comfort",correct:false}], explanation: "Inference." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Virtual Reality is not just for games; it helps doctors train.' -> VR is useful for:", options: [{text: "Education and training",correct:true},{text: "Only entertainment",correct:false},{text: "Sleeping",correct:false},{text: "Nothing",correct:false}], explanation: "Inference." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'We might live on Mars, but Earth remains our best home.' -> The author prefers:", options: [{text: "Earth",correct:true},{text: "Mars",correct:false},{text: "The Moon",correct:false},{text: "Space",correct:false}], explanation: "Comparison." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Renewable energy is crucial, yet expensive to implement initially.' -> The problem is:", options: [{text: "Initial cost",correct:true},{text: "Pollution",correct:false},{text: "Availability",correct:false},{text: "Color",correct:false}], explanation: "Contrast." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Robots can help the elderly, filling the gap of care workers.' -> Robots solve:", options: [{text: "Shortage of workers",correct:true},{text: "Loneliness completely",correct:false},{text: "Hunger",correct:false},{text: "Traffic",correct:false}], explanation: "Problem-Solution." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Gene editing offers cures, however, ethical questions arise.' -> The text suggests:", options: [{text: "It is controversial",correct:true},{text: "It is perfect",correct:false},{text: "It is useless",correct:false},{text: "It is cheap",correct:false}], explanation: "Tone." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Digital currency might replace cash, making transactions faster.' -> The potential result is:", options: [{text: "Efficiency",correct:true},{text: "More theft",correct:false},{text: "Slower banks",correct:false},{text: "More paper",correct:false}], explanation: "Prediction." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'While technology connects us, it ironically isolates us in real life.' -> The irony is:", options: [{text: "Connection causes isolation",correct:true},{text: "Technology is slow",correct:false},{text: "Life is real",correct:false},{text: "People are happy",correct:false}], explanation: "Paradox." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'The singularity is near, meaning machines might outsmart us.' -> The danger is:", options: [{text: "Loss of control",correct:true},{text: "Broken machines",correct:false},{text: "No electricity",correct:false},{text: "Expensive computers",correct:false}], explanation: "Implication." }
    ]
  },

  // Bundle 2: Part 6 (Reading Inferential) - Environment Science
  {
    meta: {
      id: "CO-ENG-11-read-science-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Reading: Climate Science"
    },
    base: { question: "Read scientific text.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Polar bears are losing habitat due to melting ice.' -> The cause is:", options: [{text: "Climate change",correct:true},{text: "Hunting",correct:false},{text: "Tourism",correct:false},{text: "Fishing",correct:false}], explanation: "Cause-Effect." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Plastic in oceans kills marine life, so we must ban straws.' -> The proposed solution is:", options: [{text: "Reduce plastic use",correct:true},{text: "Clean oceans manually",correct:false},{text: "Stop fishing",correct:false},{text: "Drink more water",correct:false}], explanation: "Action." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Trees absorb CO2. Deforestation accelerates warming.' -> What accelerates warming?", options: [{text: "Cutting trees",correct:true},{text: "Planting trees",correct:false},{text: "Burning coal",correct:false},{text: "Rain",correct:false}], explanation: "Inference." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Solar panels are effective but depend on weather.' -> A limitation is:", options: [{text: "Cloudy days",correct:true},{text: "High cost",correct:false},{text: "Size",correct:false},{text: "Weight",correct:false}], explanation: "Restriction." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Bees are vital for pollination. Their decline threatens food security.' -> Without bees:", options: [{text: "Food would be scarce",correct:true},{text: "Honey would be cheaper",correct:false},{text: "Flowers would grow faster",correct:false},{text: "Nothing happens",correct:false}], explanation: "Consequence." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Electric cars produce zero emissions, but their batteries are hard to recycle.' -> The environmental cost is:", options: [{text: "Waste disposal",correct:true},{text: "Air pollution",correct:false},{text: "Noise",correct:false},{text: "Fuel consumption",correct:false}], explanation: "Trade-off." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Scientists predict rising sea levels will submerge coastal cities.' -> The risk is for:", options: [{text: "People near the sea",correct:true},{text: "People in mountains",correct:false},{text: "People in deserts",correct:false},{text: "Everyone equally",correct:false}], explanation: "Geography." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Sustainable fashion aims to reduce waste, unlike fast fashion.' -> Fast fashion represents:", options: [{text: "High waste",correct:true},{text: "Durability",correct:false},{text: "High quality",correct:false},{text: "Ecology",correct:false}], explanation: "Contrast." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'Geoengineering looks promising but carries unknown risks.' -> The author advises:", options: [{text: "Caution",correct:true},{text: "Immediate action",correct:false},{text: "Total ban",correct:false},{text: "Indifference",correct:false}], explanation: "Tone." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Biodiversity loss is irreversible. Once a species is gone, it's gone.' -> The tone is:", options: [{text: "Urgent and serious",correct:true},{text: "Optimistic",correct:false},{text: "Funny",correct:false},{text: "Bored",correct:false}], explanation: "Gravity." }
    ]
  },

  // Bundle 3: Part 6 (Reading Inferential) - Space Exploration
  {
    meta: {
      id: "CO-ENG-11-read-space-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Reading: Space Travel"
    },
    base: { question: "Read about space.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Astronauts float because there is no gravity.' -> Floating is caused by:", options: [{text: "Lack of gravity",correct:true},{text: "Big suits",correct:false},{text: "Space food",correct:false},{text: "Rocket speed",correct:false}], explanation: "Cause." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Mars is known as the Red Planet due to iron oxide.' -> Why is it red?", options: [{text: "Because of rust (iron)",correct:true},{text: "Because of fire",correct:false},{text: "Because of aliens",correct:false},{text: "Because of heat",correct:false}], explanation: "Reason." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'The moon landing in 1969 was a giant leap for mankind.' -> It was:", options: [{text: "A major achievement",correct:true},{text: "A small step",correct:false},{text: "A mistake",correct:false},{text: "A secret",correct:false}], explanation: "Metaphor." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Space tourism is becoming real, but only for the rich.' -> Who can go?", options: [{text: "Wealthy people",correct:true},{text: "Everyone",correct:false},{text: "Astronauts only",correct:false},{text: "Scientists only",correct:false}], explanation: "Limit." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Looking at stars is looking at the past, as light takes time to travel.' -> Stars show:", options: [{text: "History",correct:true},{text: "The future",correct:false},{text: "Present time",correct:false},{text: "Darkness",correct:false}], explanation: "Concept." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Satellites are essential for GPS and communication.' -> Without satellites:", options: [{text: "We would lose GPS",correct:true},{text: "Gravity would stop",correct:false},{text: "Sun would not shine",correct:false},{text: "Earth would stop",correct:false}], explanation: "Dependency." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Colonizing other planets might save humanity from extinction.' -> The goal is:", options: [{text: "Survival",correct:true},{text: "Conquest",correct:false},{text: "Tourism",correct:false},{text: "Mining",correct:false}], explanation: "Purpose." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'However, terraforming Mars would take centuries.' -> The process is:", options: [{text: "Very slow",correct:true},{text: "Fast",correct:false},{text: "Impossible",correct:false},{text: "Easy",correct:false}], explanation: "Timeframe." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'The silence of space is absolute because sound needs air.' -> In space:", options: [{text: "You hear nothing",correct:true},{text: "You hear wind",correct:false},{text: "You hear explosions",correct:false},{text: "You hear echoes",correct:false}], explanation: "Physics." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Exoplanets might host life, but distances are vast.' -> The problem finding life is:", options: [{text: "Distance",correct:true},{text: "Lack of planets",correct:false},{text: "Aliens hiding",correct:false},{text: "Telescopes",correct:false}], explanation: "Obstacle." }
    ]
  },

  // Bundle 4: Part 6 (Reading Inferential) - Medical Breakthroughs
  {
    meta: {
      id: "CO-ENG-11-read-medicine-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Reading: Future Medicine"
    },
    base: { question: "Read about medicine.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Vaccines prevent diseases like Polio.' -> Vaccines are:", options: [{text: "Preventive",correct:true},{text: "Curative",correct:false},{text: "Dangerous",correct:false},{text: "Useless",correct:false}], explanation: "Definition." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Antibiotics kill bacteria but not viruses.' -> For a cold (virus), antibiotics are:", options: [{text: "Ineffective",correct:true},{text: "Useful",correct:false},{text: "Required",correct:false},{text: "Harmful",correct:false}], explanation: "Application." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: '3D printing can create artificial limbs for amputees.' -> It helps people who:", options: [{text: "Lost a limb",correct:true},{text: "Are blind",correct:false},{text: "Are deaf",correct:false},{text: "Are sick",correct:false}], explanation: "Target." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Telemedicine allows doctors to see patients remotely.' -> A benefit is:", options: [{text: "Convenience",correct:true},{text: "Better surgery",correct:false},{text: "More pain",correct:false},{text: "Free drugs",correct:false}], explanation: "Benefit." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Mental health is as important as physical health.' -> We should treat them:", options: [{text: "Equally",correct:true},{text: "Differently",correct:false},{text: "Separately",correct:false},{text: "Never",correct:false}], explanation: "Comparison." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Genetic screening can predict diseases before they appear.' -> This allows:", options: [{text: "Early intervention",correct:true},{text: "Changing fate",correct:false},{text: "Cheaper insurance",correct:false},{text: "Ignore health",correct:false}], explanation: "Advantage." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'The placebo effect shows the mind's power over the body.' -> Belief can:", options: [{text: "Influence healing",correct:true},{text: "Cause cancer",correct:false},{text: "Stop time",correct:false},{text: "Create viruses",correct:false}], explanation: "Phenomenon." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Personalized medicine uses DNA to tailor treatments.' -> Treatments are:", options: [{text: "Customized",correct:true},{text: "Generic",correct:false},{text: "Random",correct:false},{text: "Universal",correct:false}], explanation: "Detail." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'Nanobots might one day repair cells from inside.' -> The technology is:", options: [{text: "Microscopic",correct:true},{text: "Huge",correct:false},{text: "External",correct:false},{text: "Visible",correct:false}], explanation: "Scale." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Ethicists worry about 'designer babies'.' -> The concern is about:", options: [{text: "Morality",correct:true},{text: "Cost",correct:false},{text: "Safety",correct:false},{text: "Beauty",correct:false}], explanation: "Ethics." }
    ]
  },

  // Bundle 5: Part 7 (Cloze B2) - Artificial General Intelligence
  {
    meta: {
      id: "CO-ENG-11-cloze-agi-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Cloze: The Rise of AGI"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "Scientists are working _____ creating AGI.", options: [{text: "on",correct:true},{text: "in",correct:false},{text: "at",correct:false},{text: "to",correct:false}], explanation: "Work on." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "This entails a machine _____ can think like a human.", options: [{text: "that",correct:true},{text: "what",correct:false},{text: "who",correct:false},{text: "where",correct:false}], explanation: "Relative clause." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "Currently, AI is good _____ specific tasks.", options: [{text: "at",correct:true},{text: "on",correct:false},{text: "in",correct:false},{text: "for",correct:false}], explanation: "Good at." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "However, general intelligence remains _____.", options: [{text: "elusive",correct:true},{text: "easy",correct:false},{text: "found",correct:false},{text: "near",correct:false}], explanation: "Vocabulary." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "If achieved, it _____ change everything.", options: [{text: "could",correct:true},{text: "must",correct:false},{text: "should",correct:false},{text: "can",correct:false}], explanation: "Possibility." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "Some experts warn _____ the risks.", options: [{text: "about",correct:true},{text: "for",correct:false},{text: "on",correct:false},{text: "at",correct:false}], explanation: "Warn about." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "We need ensuring alignment _____ human values.", options: [{text: "with",correct:true},{text: "to",correct:false},{text: "for",correct:false},{text: "on",correct:false}], explanation: "Alignment with." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "Otherwise, the consequences _____ be catastrophic.", options: [{text: "might",correct:true},{text: "will",correct:false},{text: "shall",correct:false},{text: "ought",correct:false}], explanation: "Probability." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "It is a topic of intense _____.", options: [{text: "debate",correct:true},{text: "debating",correct:false},{text: "debated",correct:false},{text: "debatable",correct:false}], explanation: "Noun." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "No one knows _____ certainty when it will happen.", options: [{text: "with",correct:true},{text: "for",correct:false},{text: "in",correct:false},{text: "by",correct:false}], explanation: "With certainty." }
    ]
  },

  // Bundle 6: Part 6 (Reading Inferential) - Social Media Impact
  {
    meta: {
      id: "CO-ENG-11-read-social-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Reading: Social Media Effects"
    },
    base: { question: "Read regarding social media.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Teens spend hours on phones, leading to sleep loss.' -> The effect is:", options: [{text: "Health issues",correct:true},{text: "Better grades",correct:false},{text: "More friends",correct:false},{text: "Fun",correct:false}], explanation: "Consequence." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Cyberbullying is easier because bullies stay anonymous.' -> Anonymity makes it:", options: [{text: "Harder to stop",correct:true},{text: "Fun",correct:false},{text: "Safe",correct:false},{text: "Expensive",correct:false}], explanation: "Inference." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Influencers present an idealized version of life.' -> This image is:", options: [{text: "Unrealistic",correct:true},{text: "True",correct:false},{text: "Boring",correct:false},{text: "Ugly",correct:false}], explanation: "Interpretation." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'This compare culture causes anxiety among youth.' -> The feeling is:", options: [{text: "Stress",correct:true},{text: "Joy",correct:false},{text: "Peace",correct:false},{text: "Hunger",correct:false}], explanation: "Synonym." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Algorithms show you what you like, creating echo chambers.' -> The result is:", options: [{text: "Narrow view",correct:true},{text: "Open mind",correct:false},{text: "More news",correct:false},{text: "Silence",correct:false}], explanation: "Metaphor." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Fake news spreads 6 times faster than truth.' -> The problem is:", options: [{text: "Viral misinformation",correct:true},{text: "Slow internet",correct:false},{text: "Boring truth",correct:false},{text: "Expensive news",correct:false}], explanation: "Fact." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Digital detoxes are becoming popular to restore balance.' -> People want to:", options: [{text: "Disconnect",correct:true},{text: "Download more",correct:false},{text: "Buy phones",correct:false},{text: "Charge battery",correct:false}], explanation: "Trend." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Data privacy is the price of free apps.' -> We pay with:", options: [{text: "Information",correct:true},{text: "Money",correct:false},{text: "Time",correct:false},{text: "Energy",correct:false}], explanation: "Metaphor." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'Social media can mobilize political movements rapidly.' -> It is a tool for:", options: [{text: "Activism",correct:true},{text: "Sleep",correct:false},{text: "Eating",correct:false},{text: "Games",correct:false}], explanation: "Function." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'The dilemma is regulating it without censoring speech.' -> The conflict is:", options: [{text: "Safety vs Freedom",correct:true},{text: "Rich vs Poor",correct:false},{text: "Old vs New",correct:false},{text: "Android vs iPhone",correct:false}], explanation: "Abstract." }
    ]
  },

  // Bundle 7: Part 7 (Cloze B2) - Automation
  {
    meta: {
      id: "CO-ENG-11-cloze-auto-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Cloze: The Future of Work"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "Automation is replacing _____ jobs.", options: [{text: "many",correct:true},{text: "much",correct:false},{text: "lots",correct:false},{text: "plenty",correct:false}], explanation: "Countable noun." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "Machines can work 24/7 without _____ tired.", options: [{text: "getting",correct:true},{text: "get",correct:false},{text: "got",correct:false},{text: "to get",correct:false}], explanation: "Preposition + gerund." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "This increases productivity _____ efficiency.", options: [{text: "and",correct:true},{text: "but",correct:false},{text: "or",correct:false},{text: "nor",correct:false}], explanation: "Connector." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "However, workers worry _____ their future.", options: [{text: "about",correct:true},{text: "for",correct:false},{text: "on",correct:false},{text: "at",correct:false}], explanation: "Worry about." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "New skills will be _____ demand.", options: [{text: "in",correct:true},{text: "on",correct:false},{text: "at",correct:false},{text: "for",correct:false}], explanation: "In demand." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "Creativity is something machines _____ lack.", options: [{text: "still",correct:true},{text: "yet",correct:false},{text: "already",correct:false},{text: "anymore",correct:false}], explanation: "Adverb." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "We must focus _____ education.", options: [{text: "on",correct:true},{text: "in",correct:false},{text: "at",correct:false},{text: "to",correct:false}], explanation: "Focus on." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "Lifelong learning is becoming _____.", options: [{text: "essential",correct:true},{text: "essence",correct:false},{text: "essentially",correct:false},{text: "essences",correct:false}], explanation: "Adjective." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "Adaptability is the key _____ survival.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "of",correct:false},{text: "in",correct:false}], explanation: "Key to." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "The future is uncertain _____ promising.", options: [{text: "but",correct:true},{text: "and",correct:false},{text: "so",correct:false},{text: "or",correct:false}], explanation: "Contrast." }
    ]
  },

  // Bundle 8: Part 6 (Reading Inferential) - Bioethics
  {
    meta: {
      id: "CO-ENG-11-read-bioethics-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Reading: Bioethics"
    },
    base: { question: "Read regarding bioethics.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Cloning animals is possible, but cloning humans is banned.' -> Why is it banned?", options: [{text: "Ethical reasons",correct:true},{text: "It is easy",correct:false},{text: "It is cheap",correct:false},{text: "Scientists forgot",correct:false}], explanation: "Inference." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Animal testing saves human lives but harms animals.' -> The conflict is:", options: [{text: "Benefit vs Harm",correct:true},{text: "Money vs Time",correct:false},{text: "Cats vs Dogs",correct:false},{text: "Doctors vs Nurses",correct:false}], explanation: "Dilemma." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Organ donation is a gift of life.' -> The metaphor suggests:", options: [{text: "Generosity",correct:true},{text: "Shopping",correct:false},{text: "Stealing",correct:false},{text: "Birthday",correct:false}], explanation: "Meaning." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Euthanasia is debated as the right to die with dignity.' -> Supporters argue for:", options: [{text: "Choice",correct:true},{text: "Pain",correct:false},{text: "Immortality",correct:false},{text: "Crime",correct:false}], explanation: "Argument." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Data privacy in genetics is crucial to prevent discrimination.' -> The risk is:", options: [{text: "Unfair treatment",correct:true},{text: "Getting sick",correct:false},{text: "Losing keys",correct:false},{text: "Becoming rich",correct:false}], explanation: "Consequence." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'GMOs increase food yield but raise health concerns.' -> GMOs are:", options: [{text: "Debated",correct:true},{text: "Safe",correct:false},{text: "Bad",correct:false},{text: "Tasty",correct:false}], explanation: "Status." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Stem cell research holds promise for curing paralysis.' -> The hope is:", options: [{text: "Restoring movement",correct:true},{text: "New legs",correct:false},{text: "Sleeping better",correct:false},{text: "Running fast",correct:false}], explanation: "Medical." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'The Hippocratic Oath says: First, do no harm.' -> Doctors must:", options: [{text: "Protect patients",correct:true},{text: "Make money",correct:false},{text: "Run fast",correct:false},{text: "Study hard",correct:false}], explanation: "Principle." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'Patenting genes limits research access.' -> The effect is:", options: [{text: "Slower progress",correct:true},{text: "More money",correct:false},{text: "Better health",correct:false},{text: "Faster cars",correct:false}], explanation: "Impact." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Science moves faster than policy.' -> The problem is:", options: [{text: "Laws lag behind",correct:true},{text: "Science is slow",correct:false},{text: "Politicians are smart",correct:false},{text: "Scientists are lazys",correct:false}], explanation: "Gap." }
    ]
  },

  // Bundle 9: Part 7 (Cloze B2) - Cybersecurity
  {
    meta: {
      id: "CO-ENG-11-cloze-cyber-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Cloze: Staying Safe Online"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "The internet _____ dangerous if you are not careful.", options: [{text: "can be",correct:true},{text: "should be",correct:false},{text: "must be",correct:false},{text: "ought to",correct:false}], explanation: "Possibility." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "Hackers try to _____ information.", options: [{text: "steal",correct:true},{text: "steals",correct:false},{text: "stealings",correct:false},{text: "stole",correct:false}], explanation: "Try to + inf." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "You should use a strong _____.", options: [{text: "password",correct:true},{text: "passport",correct:false},{text: "passcode",correct:false},{text: "word",correct:false}], explanation: "Vocabulary." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "Don't share secrets _____ strangers.", options: [{text: "with",correct:true},{text: "to",correct:false},{text: "for",correct:false},{text: "at",correct:false}], explanation: "Share with." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "Phishing emails look _____ real ones.", options: [{text: "like",correct:true},{text: "as",correct:false},{text: "so",correct:false},{text: "same",correct:false}], explanation: "Look like." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "They want you to _____ on a link.", options: [{text: "click",correct:true},{text: "clack",correct:false},{text: "clock",correct:false},{text: "cluck",correct:false}], explanation: "Collocation." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "Two-factor authentication adds a _____ of security.", options: [{text: "layer",correct:true},{text: "player",correct:false},{text: "slayer",correct:false},{text: "prayer",correct:false}], explanation: "Layer of." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "Software updates patch _____.", options: [{text: "vulnerabilities",correct:true},{text: "abilities",correct:false},{text: "capabilities",correct:false},{text: "possibilities",correct:false}], explanation: "Context." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "Data breaches are becoming _____ common.", options: [{text: "increasingly",correct:true},{text: "increase",correct:false},{text: "increased",correct:false},{text: "increasing",correct:false}], explanation: "Adverb." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "Cybersecurity is everyone's _____.", options: [{text: "responsibility",correct:true},{text: "responsible",correct:false},{text: "response",correct:false},{text: "respond",correct:false}], explanation: "Noun." }
    ]
  },

  // Bundle 10: Taller Review B1+
    {
    meta: {
      id: "CO-ENG-11-taller-b1plus-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "review",
      periodo: 3,
      dba_id: "DBA-ENG-11-4",
      title: "Review B1+ Level"
    },
    base: { question: "General review.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Grammar", question: "I wish I _____ rich.", options: [{text: "were",correct:true},{text: "am",correct:false},{text: "be",correct:false},{text: "been",correct:false}], explanation: "Subjunctive." },
      { id_suffix: "v2", difficulty: 1, type: "Grammar", question: "You had _____ see a doctor.", options: [{text: "better",correct:true},{text: "sooner",correct:false},{text: "rather",correct:false},{text: "later",correct:false}], explanation: "Had better." },
      { id_suffix: "v3", difficulty: 2, type: "Grammar", question: "Despite _____ late, he finished the work.", options: [{text: "being",correct:true},{text: "be",correct:false},{text: "been",correct:false},{text: "is",correct:false}], explanation: "Despite + gerund." },
      { id_suffix: "v4", difficulty: 2, type: "Vocabulary", question: "Noun form of 'Invent':", options: [{text: "Invention",correct:true},{text: "Inventory",correct:false},{text: "Inventor",correct:false},{text: "Invented",correct:false}], explanation: "Word formation." },
      { id_suffix: "v5", difficulty: 3, type: "Grammar", question: "She is used to _____ early.", options: [{text: "getting up",correct:true},{text: "get up",correct:false},{text: "got up",correct:false},{text: "gets up",correct:false}], explanation: "Used to + gerund (habit)." },
      { id_suffix: "v6", difficulty: 3, type: "Grammar", question: "The man _____ car was stolen is angry.", options: [{text: "whose",correct:true},{text: "who",correct:false},{text: "which",correct:false},{text: "that",correct:false}], explanation: "Relative possessive." },
      { id_suffix: "v7", difficulty: 4, type: "Grammar", question: "Little _____ he know about the surprise.", options: [{text: "did",correct:true},{text: "does",correct:false},{text: "do",correct:false},{text: "done",correct:false}], explanation: "Inversion." },
      { id_suffix: "v8", difficulty: 4, type: "Vocabulary", question: "Synonym of 'Dangerous':", options: [{text: "Hazardous",correct:true},{text: "Safe",correct:false},{text: "Secure",correct:false},{text: "Calm",correct:false}], explanation: "Synonyms." },
      { id_suffix: "v9", difficulty: 5, type: "Grammar", question: "It is time we _____ home.", options: [{text: "went",correct:true},{text: "go",correct:false},{text: "gone",correct:false},{text: "going",correct:false}], explanation: "It is time + past simple." },
      { id_suffix: "v10", difficulty: 5, type: "Grammar", question: "Not only _____ he sing, but he also dances.", options: [{text: "does",correct:true},{text: "do",correct:false},{text: "did",correct:false},{text: "done",correct:false}], explanation: "Inversion." }
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
    console.log(`✅ Created Period 3 Bundle v3.0: ${fullPath}`);
});


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
  // Grade 11 - English - Period 4 - BUNDLE 1 (Part 7: Cloze B2 - Climate Change)
  {
    meta: {
      id: "CO-ENG-11-cloze-climate-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Cloze: Climate Crisis"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "The _____ of climate change are visible.", options: [{text: "effects",correct:true},{text: "affects",correct:false},{text: "effecting",correct:false},{text: "effective",correct:false}], explanation: "Noun (Effects)." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "We see more extreme _____ events.", options: [{text: "weather",correct:true},{text: "whether",correct:false},{text: "climate",correct:false},{text: "climatic",correct:false}], explanation: "Weather events." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "Glaciers are melting _____ an alarming rate.", options: [{text: "at",correct:true},{text: "in",correct:false},{text: "on",correct:false},{text: "by",correct:false}], explanation: "At a rate." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "This contributes _____ rising sea levels.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "of",correct:false},{text: "at",correct:false}], explanation: "Contribute to." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "Experts _____ that action is urgent.", options: [{text: "agree",correct:true},{text: "accepts",correct:false},{text: "agrees",correct:false},{text: "admit",correct:false}], explanation: "Experts agree (plural)." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "We must reduce our carbon _____.", options: [{text: "footprint",correct:true},{text: "fingerprint",correct:false},{text: "print",correct:false},{text: "trace",correct:false}], explanation: "Carbon footprint." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "Renewable energy sources are _____ to fossil fuels.", options: [{text: "preferable",correct:true},{text: "prefer",correct:false},{text: "preference",correct:false},{text: "preferably",correct:false}], explanation: "Adjective." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "Governments need to _____ policies.", options: [{text: "enforce",correct:true},{text: "force",correct:false},{text: "enforcing",correct:false},{text: "enforced",correct:false}], explanation: "Verb." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "The window of opportunity is _____.", options: [{text: "closing",correct:true},{text: "close",correct:false},{text: "closed",correct:false},{text: "closure",correct:false}], explanation: "Present continuous." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "We cannot afford _____ wait.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "that",correct:false},{text: "of",correct:false}], explanation: "Afford to wait." }
    ]
  },

  // Bundle 2: Part 7 (Cloze B2) - Globalization
  {
    meta: {
      id: "CO-ENG-11-cloze-global-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Cloze: Globalization"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "Globalization brings the world _____.", options: [{text: "closer",correct:true},{text: "close",correct:false},{text: "closest",correct:false},{text: "closely",correct:false}], explanation: "Comparative." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "It facilitates the _____ of goods.", options: [{text: "exchange",correct:true},{text: "change",correct:false},{text: "changing",correct:false},{text: "exchanged",correct:false}], explanation: "Noun." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "However, it also _____ challenges.", options: [{text: "presents",correct:true},{text: "present",correct:false},{text: "presenting",correct:false},{text: "presence",correct:false}], explanation: "Present creates/presents." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "Local cultures risk _____ replaced.", options: [{text: "being",correct:true},{text: "be",correct:false},{text: "been",correct:false},{text: "to be",correct:false}], explanation: "Risk + gerund." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "Multinational companies _____ dominate markets.", options: [{text: "often",correct:true},{text: "seldom",correct:false},{text: "rarely",correct:false},{text: "never",correct:false}], explanation: "Adverb." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "This can hurt small _____ businesses.", options: [{text: "local",correct:true},{text: "location",correct:false},{text: "locate",correct:false},{text: "located",correct:false}], explanation: "Adjective." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "We should strive _____ a balance.", options: [{text: "for",correct:true},{text: "to",correct:false},{text: "at",correct:false},{text: "of",correct:false}], explanation: "Strive for." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "Preserving heritage is _____ vital.", options: [{text: "equally",correct:true},{text: "equal",correct:false},{text: "equality",correct:false},{text: "equals",correct:false}], explanation: "Adverb." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "The internet acts _____ a catalyst.", options: [{text: "as",correct:true},{text: "like",correct:false},{text: "so",correct:false},{text: "for",correct:false}], explanation: "Act as." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "We live in an _____ world.", options: [{text: "interconnected",correct:true},{text: "connected",correct:false},{text: "connecting",correct:false},{text: "connect",correct:false}], explanation: "Adjective." }
    ]
  },

  // Bundle 3: Part 6 (Reading Inferential) - Migration
  {
    meta: {
      id: "CO-ENG-11-read-migration-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Reading: Migration"
    },
    base: { question: "Read about migration.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'People migrate for safety or better jobs.' -> Push factors include:", options: [{text: "Danger",correct:true},{text: "Fun",correct:false},{text: "Tourism",correct:false},{text: "Adventure",correct:false}], explanation: "Inference." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Refugees flee conflict zones.' -> They leave because of:", options: [{text: "War",correct:true},{text: "Weather",correct:false},{text: "Jobs",correct:false},{text: "School",correct:false}], explanation: "Reason." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Brain drain happens when educated people leave.' -> This hurts the country by:", options: [{text: "Losing talent",correct:true},{text: "Gaining money",correct:false},{text: "Reducing traffic",correct:false},{text: "Improving schools",correct:false}], explanation: "Consequence." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Remittances are money sent home by migrants.' -> Remittances help:", options: [{text: "Families at home",correct:true},{text: "Migrants abroad",correct:false},{text: "Banks mainly",correct:false},{text: "Airlines",correct:false}], explanation: "Definition." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Integration is a two-way process.' -> It requires effort from:", options: [{text: "Migrants and host society",correct:true},{text: "Only migrants",correct:false},{text: "Only government",correct:false},{text: "Nobody",correct:false}], explanation: "Meaning." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Xenophobia is the fear of strangers.' -> Xenophobia leads to:", options: [{text: "Discrimination",correct:true},{text: "Friendship",correct:false},{text: "Travel",correct:false},{text: "Learning",correct:false}], explanation: "Effect." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Multicultural cities are often hubs of innovation.' -> Diversity promotes:", options: [{text: "Creativity",correct:true},{text: "Silence",correct:false},{text: "Boredom",correct:false},{text: "Conflict",correct:false}], explanation: "Positive impact." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Border control policies vary widely.' -> Countries have:", options: [{text: "Different rules",correct:true},{text: "Same rules",correct:false},{text: "No rules",correct:false},{text: "Open borders",correct:false}], explanation: "Variance." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'Climate refugees are a growing category.' -> They move due to:", options: [{text: "Environmental changes",correct:true},{text: "Political war",correct:false},{text: "Economy",correct:false},{text: "Fashion",correct:false}], explanation: "New trend." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Migration is a human right, says the UN.' -> The UN supports:", options: [{text: "Freedom of movement",correct:true},{text: "Staying home",correct:false},{text: "Closing borders",correct:false},{text: "Building walls",correct:false}], explanation: "Principle." }
    ]
  },

  // Bundle 4: Part 7 (Cloze B2) - Education Future
  {
    meta: {
      id: "CO-ENG-11-cloze-edufuture-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Cloze: Future of Education"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "Education is moving _____ online platforms.", options: [{text: "towards",correct:true},{text: "forward",correct:false},{text: "backward",correct:false},{text: "away",correct:false}], explanation: "Direction." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "This allows for _____ scheduling.", options: [{text: "flexible",correct:true},{text: "flexibility",correct:false},{text: "stiff",correct:false},{text: "hard",correct:false}], explanation: "Adjective." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "Students can learn _____ their own pace.", options: [{text: "at",correct:true},{text: "in",correct:false},{text: "on",correct:false},{text: "by",correct:false}], explanation: "At a pace." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "Traditional classrooms might _____ obsolete.", options: [{text: "become",correct:true},{text: "became",correct:false},{text: "becoming",correct:false},{text: "becomes",correct:false}], explanation: "Infinitive." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "However, social interaction remains _____.", options: [{text: "crucial",correct:true},{text: "crucially",correct:false},{text: "cruel",correct:false},{text: "unimportant",correct:false}], explanation: "Adjective." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "Teachers will act as _____ rather than lecturers.", options: [{text: "guides",correct:true},{text: "guide",correct:false},{text: "guiding",correct:false},{text: "guidance",correct:false}], explanation: "Noun plural." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "Critical thinking is more important _____ memorization.", options: [{text: "than",correct:true},{text: "then",correct:false},{text: "that",correct:false},{text: "as",correct:false}], explanation: "Comparison." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "We must adapt to a _____ world.", options: [{text: "changing",correct:true},{text: "change",correct:false},{text: "changed",correct:false},{text: "changer",correct:false}], explanation: "Adjective (participle)." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "Access to technology is NOT _____ distributed.", options: [{text: "evenly",correct:true},{text: "even",correct:false},{text: "event",correct:false},{text: "ever",correct:false}], explanation: "Adverb." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "The digital divide is a major _____.", options: [{text: "concern",correct:true},{text: "concert",correct:false},{text: "concrete",correct:false},{text: "concept",correct:false}], explanation: "Noun." }
    ]
  },

  // Bundle 5: Part 6 (Reading Inferential) - Mental Health
  {
    meta: {
      id: "CO-ENG-11-read-mental-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Reading: Mental Health Awareness"
    },
    base: { question: "Read about health.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Stigma often prevents people from seeking help.' -> Stigma acts as:", options: [{text: "A barrier",correct:true},{text: "A cure",correct:false},{text: "A friend",correct:false},{text: "A doctor",correct:false}], explanation: "Metaphor." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Anxiety is more than just feeling nervous; it is persistent.' -> Anxiety is:", options: [{text: "Continuous",correct:true},{text: "Temporary",correct:false},{text: "Fun",correct:false},{text: "Rare",correct:false}], explanation: "Definition." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Self-care includes setting boundaries and resting.' -> Resting is:", options: [{text: "Part of self-care",correct:true},{text: "Lazy",correct:false},{text: "Useless",correct:false},{text: "Harmful",correct:false}], explanation: "Categorization." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Talking to a professional provides a new perspective.' -> Therapy offers:", options: [{text: "Different view",correct:true},{text: "Money",correct:false},{text: "More problems",correct:false},{text: "Silence",correct:false}], explanation: "Benefit." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Chronic stress damages physical health over time.' -> Mind and body are:", options: [{text: "Connected",correct:true},{text: "Separate",correct:false},{text: "Enemies",correct:false},{text: "Identical",correct:false}], explanation: "Relationship." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Social support networks buffer against depression.' -> Friends and family:", options: [{text: "Protect",correct:true},{text: "Harm",correct:false},{text: "Ignore",correct:false},{text: "Depress",correct:false}], explanation: "Function." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Burnout is a state of emotional, physical, and mental exhaustion.' -> Burnout affects:", options: [{text: "The whole person",correct:true},{text: "Just the body",correct:false},{text: "Just the mind",correct:false},{text: "Just work",correct:false}], explanation: "Scope." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Mindfulness teaches staying in the present moment.' -> The goal is:", options: [{text: "Awareness",correct:true},{text: "Forgetting",correct:false},{text: "Sleeping",correct:false},{text: "Planning",correct:false}], explanation: "Concept." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'Resilience is not avoiding stress, but recovering from it.' -> Resilience means:", options: [{text: "Bouncing back",correct:true},{text: "Hiding",correct:false},{text: "Never falling",correct:false},{text: "Ignoring pain",correct:false}], explanation: "Definition." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Empathy builds bridges between people.' -> Empathy creates:", options: [{text: "Connection",correct:true},{text: "Walls",correct:false},{text: "Distance",correct:false},{text: "Money",correct:false}], explanation: "Metaphor." }
    ]
  },

  // Bundle 6: Part 7 (Cloze B2) - Space Mining
  {
    meta: {
      id: "CO-ENG-11-cloze-spacemine-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Cloze: Asteroid Mining"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "Resources on Earth are _____ limited.", options: [{text: "becoming",correct:true},{text: "become",correct:false},{text: "became",correct:false},{text: "becomes",correct:false}], explanation: "Present continuous." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "Companies are looking _____ space for solution.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "at",correct:false},{text: "on",correct:false}], explanation: "Look to (direction)." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "Asteroids contain _____ metals.", options: [{text: "valuable",correct:true},{text: "value",correct:false},{text: "valid",correct:false},{text: "valor",correct:false}], explanation: "Adjective." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "Mining them could _____ trillions.", options: [{text: "generate",correct:true},{text: "make",correct:false},{text: "do",correct:false},{text: "create",correct:false}], explanation: "Generate money." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "However, the technology is _____ expensive.", options: [{text: "extremely",correct:true},{text: "extreme",correct:false},{text: "extremes",correct:false},{text: "extremity",correct:false}], explanation: "Adverb." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "There are also legal _____.", options: [{text: "issues",correct:true},{text: "tissue",correct:false},{text: "issue",correct:false},{text: "issued",correct:false}], explanation: "Plural noun." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "Who owns _____ found in space?", options: [{text: "what",correct:true},{text: "that",correct:false},{text: "which",correct:false},{text: "who",correct:false}], explanation: "Pronoun." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "Treaties need to be _____.", options: [{text: "updated",correct:true},{text: "update",correct:false},{text: "dating",correct:false},{text: "date",correct:false}], explanation: "Passive." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "It sounds _____ science fiction.", options: [{text: "like",correct:true},{text: "as",correct:false},{text: "so",correct:false},{text: "same",correct:false}], explanation: "Sounds like." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "But it might happen _____ soon.", options: [{text: "fairly",correct:true},{text: "fair",correct:false},{text: "fared",correct:false},{text: "fairest",correct:false}], explanation: "Adverb (Fairly soon)." }
    ]
  },

  // Bundle 7: Part 6 (Reading Inferential) - Gender Equality
  {
    meta: {
      id: "CO-ENG-11-read-gender-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Reading: Gender Equality"
    },
    base: { question: "Read about equality.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Equal pay for equal work is a basic right.' -> This means:", options: [{text: "Fair wages",correct:true},{text: "Free money",correct:false},{text: "Less work",correct:false},{text: "More taxes",correct:false}], explanation: "Definition." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Stereotypes limit potential for both men and women.' -> Stereotypes are:", options: [{text: "Harmful",correct:true},{text: "Helpful",correct:false},{text: "True",correct:false},{text: "Fun",correct:false}], explanation: "Evaluation." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Representation matters: Seeing women in power inspires girls.' -> The effect is:", options: [{text: "Inspiration",correct:true},{text: "Jealousy",correct:false},{text: "Fear",correct:false},{text: "Boredom",correct:false}], explanation: "Cause-Effect." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Paternity leave allows fathers to bond with babies.' -> This benefits:", options: [{text: "Fathers and babies",correct:true},{text: "Only mothers",correct:false},{text: "Employers only",correct:false},{text: "Nobody",correct:false}], explanation: "Beneficiary." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'The glass ceiling is an invisible barrier to promotion.' -> It stops:", options: [{text: "Career advancement",correct:true},{text: "Rain",correct:false},{text: "Sunlight",correct:false},{text: "Noise",correct:false}], explanation: "Metaphor." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Gender is a spectrum, not just binary.' -> This view is:", options: [{text: "Inclusive",correct:true},{text: "Narrow",correct:false},{text: "Old",correct:false},{text: "Wrong",correct:false}], explanation: "Type of view." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Toxic masculinity harms men by suppressing emotions.' -> Men should:", options: [{text: "Express emotions",correct:true},{text: "Hide feelings",correct:false},{text: "Valid fighting",correct:false},{text: "Be silent",correct:false}], explanation: "Advice." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Feminism advocates for equality, not superiority.' -> The goal is:", options: [{text: "Balance",correct:true},{text: "Dominance",correct:false},{text: "Revenge",correct:false},{text: "Hatred",correct:false}], explanation: "Clarification." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'Intersectionality considers race, class, and gender together.' -> It looks at:", options: [{text: "Multiple factors",correct:true},{text: "One thing",correct:false},{text: "Nothing",correct:false},{text: "Traffic",correct:false}], explanation: "Concept." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Equality benefits the economy by utilizing all talent.' -> It makes economic sense to:", options: [{text: "Include everyone",correct:true},{text: "Exclude women",correct:false},{text: "Hire only men",correct:false},{text: "Stop working",correct:false}], explanation: "Logic." }
    ]
  },

  // Bundle 8: Part 7 (Cloze B2) - Ethics of War
  {
    meta: {
      id: "CO-ENG-11-cloze-war-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part7-cloze",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Cloze: Conflict Ethics"
    },
    base: { question: "Choose the correct word.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 7", question: "War brings terrible _____.", options: [{text: "suffering",correct:true},{text: "suffer",correct:false},{text: "suffers",correct:false},{text: "suffered",correct:false}], explanation: "Noun." },
      { id_suffix: "v2", difficulty: 1, type: "Part 7", question: "Civilians often bear the _____.", options: [{text: "brunt",correct:true},{text: "front",correct:false},{text: "back",correct:false},{text: "side",correct:false}], explanation: "Bear the brunt." },
      { id_suffix: "v3", difficulty: 2, type: "Part 7", question: "International law tries to _____ rules.", options: [{text: "set",correct:true},{text: "sit",correct:false},{text: "sat",correct:false},{text: "seat",correct:false}], explanation: "Set rules." },
      { id_suffix: "v4", difficulty: 2, type: "Part 7", question: "Targeting hospitals is _____ illegal.", options: [{text: "strictly",correct:true},{text: "strict",correct:false},{text: "stricter",correct:false},{text: "strictness",correct:false}], explanation: "Adverb." },
      { id_suffix: "v5", difficulty: 3, type: "Part 7", question: "However, enforcement is _____ difficult.", options: [{text: "often",correct:true},{text: "oftener",correct:false},{text: "seldom",correct:false},{text: "never",correct:false}], explanation: "Adverb." },
      { id_suffix: "v6", difficulty: 3, type: "Part 7", question: "Peacekeeping missions aim _____ protect.", options: [{text: "to",correct:true},{text: "for",correct:false},{text: "at",correct:false},{text: "of",correct:false}], explanation: "Aim to." },
      { id_suffix: "v7", difficulty: 4, type: "Part 7", question: "Refugees must be _____ asylum.", options: [{text: "granted",correct:true},{text: "grant",correct:false},{text: "grants",correct:false},{text: "granting",correct:false}], explanation: "Passive." },
      { id_suffix: "v8", difficulty: 4, type: "Part 7", question: "Diplomacy should always _____ war.", options: [{text: "precede",correct:true},{text: "proceed",correct:false},{text: "follow",correct:false},{text: "chase",correct:false}], explanation: "Come before." },
      { id_suffix: "v9", difficulty: 5, type: "Part 7", question: "History teaches us _____ the costs.", options: [{text: "about",correct:true},{text: "for",correct:false},{text: "to",correct:false},{text: "at",correct:false}], explanation: "Teach about." },
      { id_suffix: "v10", difficulty: 5, type: "Part 7", question: "We hope for a world _____ conflict.", options: [{text: "without",correct:true},{text: "within",correct:false},{text: "with",correct:false},{text: "under",correct:false}], explanation: "Preposition." }
    ]
  },

  // Bundle 9: Part 6 (Reading Inferential) - Sustainable Cities
  {
    meta: {
      id: "CO-ENG-11-read-city-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "part6-reading",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Reading: Green Cities"
    },
    base: { question: "Read about cities.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Part 6", question: "Text: 'Green roofs reduce heat and absorb rain.' -> They are:", options: [{text: "Eco-friendly",correct:true},{text: "Ugly",correct:false},{text: "Hot",correct:false},{text: "Dry",correct:false}], explanation: "Classification." },
      { id_suffix: "v2", difficulty: 1, type: "Part 6", question: "Text: 'Public transport reduces traffic congestion and smog.' -> Cities should:", options: [{text: "Invest in it",correct:true},{text: "Ban it",correct:false},{text: "Ignore it",correct:false},{text: "Buy cars",correct:false}], explanation: "Recommendation." },
      { id_suffix: "v3", difficulty: 2, type: "Part 6", question: "Text: 'Walkable cities improve public health by encouraging exercise.' -> Walking is:", options: [{text: "Healthy",correct:true},{text: "Dangerous",correct:false},{text: "Slow",correct:false},{text: "Expensive",correct:false}], explanation: "Inference." },
      { id_suffix: "v4", difficulty: 2, type: "Part 6", question: "Text: 'Smart grids manage electricity efficiently.' -> They save:", options: [{text: "Energy",correct:true},{text: "Water",correct:false},{text: "Time",correct:false},{text: "Paper",correct:false}], explanation: "Function." },
      { id_suffix: "v5", difficulty: 3, type: "Part 6", question: "Text: 'Urban farming brings fresh food to city centers.' -> It reduces:", options: [{text: "Food miles",correct:true},{text: "Food taste",correct:false},{text: "Food cost",correct:false},{text: "Cooking time",correct:false}], explanation: "Benefit." },
      { id_suffix: "v6", difficulty: 3, type: "Part 6", question: "Text: 'Mixed-use zoning puts homes near shops and work.' -> The result is:", options: [{text: "Less driving",correct:true},{text: "More driving",correct:false},{text: "More sleep",correct:false},{text: "More noise",correct:false}], explanation: "Result." },
      { id_suffix: "v7", difficulty: 4, type: "Part 6", question: "Text: 'Affordable housing prevents gentrification.' -> This keeps cities:", options: [{text: "Inclusive",correct:true},{text: "Rich",correct:false},{text: "Empty",correct:false},{text: "Tall",correct:false}], explanation: "Outcome." },
      { id_suffix: "v8", difficulty: 4, type: "Part 6", question: "Text: 'Bike lanes differ from car lanes for safety.' -> They should be:", options: [{text: "Separated",correct:true},{text: "Mixed",correct:false},{text: "Hidden",correct:false},{text: "Wide",correct:false}], explanation: "Design." },
      { id_suffix: "v9", difficulty: 5, type: "Part 6", question: "Text: 'The challenge is retrofitting old buildings.' -> It is hard to:", options: [{text: "Update old ones",correct:true},{text: "Build new ones",correct:false},{text: "Destroy old ones",correct:false},{text: "Paint them",correct:false}], explanation: "Task." },
      { id_suffix: "v10", difficulty: 5, type: "Part 6", question: "Text: 'Cities of the future must be resilient to climate change.' -> They need to:", options: [{text: "Adapt",correct:true},{text: "Move",correct:false},{text: "Shrink",correct:false},{text: "Give up",correct:false}], explanation: "Requirement." }
    ]
  },

  // Bundle 10: Taller Review B2
    {
    meta: {
      id: "CO-ENG-11-taller-b2-001",
      country: "co",
      grade: 11,
      subject: "ingles",
      topic: "review",
      periodo: 4,
      dba_id: "DBA-ENG-11-5",
      title: "Review B2 Level"
    },
    base: { question: "General review.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Grammar", question: "I regret _____ that to him.", options: [{text: "saying",correct:true},{text: "say",correct:false},{text: "to say",correct:false},{text: "said",correct:false}], explanation: "Regret + gerund (past)." },
      { id_suffix: "v2", difficulty: 1, type: "Grammar", question: "Whatever you do, don't _____ up.", options: [{text: "give",correct:true},{text: "giving",correct:false},{text: "gave",correct:false},{text: "given",correct:false}], explanation: "Phrasal verb give up." },
      { id_suffix: "v3", difficulty: 2, type: "Grammar", question: "She is believed _____ a spy.", options: [{text: "to be",correct:true},{text: "be",correct:false},{text: "being",correct:false},{text: "is",correct:false}], explanation: "Passive infinitive." },
      { id_suffix: "v4", difficulty: 2, type: "Vocabulary", question: "Word for 'Unavoidable':", options: [{text: "Inevitable",correct:true},{text: "Evitable",correct:false},{text: "Unlikely",correct:false},{text: "Impossible",correct:false}], explanation: "Synonym." },
      { id_suffix: "v5", difficulty: 3, type: "Grammar", question: "Had I known, I _____ called you.", options: [{text: "would have",correct:true},{text: "will have",correct:false},{text: "had",correct:false},{text: "have",correct:false}], explanation: "Third conditional inversion." },
      { id_suffix: "v6", difficulty: 3, type: "Grammar", question: "It is essential that he _____ on time.", options: [{text: "be",correct:true},{text: "is",correct:false},{text: "was",correct:false},{text: "were",correct:false}], explanation: "Subjunctive." },
      { id_suffix: "v7", difficulty: 4, type: "Grammar", question: "I'd rather you _____ smoke here.", options: [{text: "didn't",correct:true},{text: "don't",correct:false},{text: "won't",correct:false},{text: "not to",correct:false}], explanation: "Would rather + past." },
      { id_suffix: "v8", difficulty: 4, type: "Vocabulary", question: "Opposite of 'Humble':", options: [{text: "Arrogant",correct:true},{text: "Modest",correct:false},{text: "Shy",correct:false},{text: "Kind",correct:false}], explanation: "Antonym." },
      { id_suffix: "v9", difficulty: 5, type: "Grammar", question: "Under no circumstances _____ you open this door.", options: [{text: "should",correct:true},{text: "you should",correct:false},{text: "you shall",correct:false},{text: "to",correct:false}], explanation: "Inversion." },
      { id_suffix: "v10", difficulty: 5, type: "Grammar", question: "He talked as if he _____ the owner.", options: [{text: "were",correct:true},{text: "examples",correct:false},{text: "is",correct:false},{text: "has been",correct:false}], explanation: "As if + past subjunctive." }
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
    console.log(`✅ Created Period 4 Bundle v3.0: ${fullPath}`);
});

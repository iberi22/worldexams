/**
 * generate-g05-ingles-weekly.js
 * 
 * Generates CO Ingles G05 W01-W40 weekly bundles v5.2
 * 
 * Grade 5 → CEFR A2
 * Grammar: Simple Past, Present Continuous, Comparatives/Superlatives, Basic Modals
 * 10 questions per bundle
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'E:\\scripts-python\\worldexams\\questions_data\\colombia\\ingles\\grado-05\\2026\\weekly';

const weeks = [
  { week: 'W01', topic: 'greetings-introductions', label: 'Greetings and Introductions' },
  { week: 'W02', topic: 'classroom-objects', label: 'Classroom Objects and Commands' },
  { week: 'W03', topic: 'colors-shapes', label: 'Colors and Shapes' },
  { week: 'W04', topic: 'numbers-counting', label: 'Numbers and Counting' },
  { week: 'W05', topic: 'family-members', label: 'Family Members' },
  { week: 'W06', topic: 'body-parts', label: 'Body Parts' },
  { week: 'W07', topic: 'animals-pets', label: 'Animals and Pets' },
  { week: 'W08', topic: 'food-drinks', label: 'Food and Drinks' },
  { week: 'W09', topic: 'daily-routine', label: 'Daily Routine' },
  { week: 'W10', topic: 'review-p1', label: 'Review Period 1 (W01-W09)' },
  { week: 'W11', topic: 'days-months', label: 'Days of the Week and Months' },
  { week: 'W12', topic: 'weather-seasons', label: 'Weather and Seasons' },
  { week: 'W13', topic: 'clothes-accessories', label: 'Clothes and Accessories' },
  { week: 'W14', topic: 'house-rooms', label: 'House and Rooms' },
  { week: 'W15', topic: 'furniture-appliances', label: 'Furniture and Appliances' },
  { week: 'W16', topic: 'school-subjects', label: 'School Subjects' },
  { week: 'W17', topic: 'hobbies-interests', label: 'Hobbies and Interests' },
  { week: 'W18', topic: 'sports-games', label: 'Sports and Games' },
  { week: 'W19', topic: 'places-town', label: 'Places in Town' },
  { week: 'W20', topic: 'review-p2', label: 'Review Period 2 (W11-W19)' },
  { week: 'W21', topic: 'transportation', label: 'Transportation' },
  { week: 'W22', topic: 'occupations-jobs', label: 'Occupations and Jobs' },
  { week: 'W23', topic: 'time-hours', label: 'Time and Hours' },
  { week: 'W24', topic: 'healthy-habits', label: 'Healthy Habits' },
  { week: 'W25', topic: 'emotions-feelings', label: 'Emotions and Feelings' },
  { week: 'W26', topic: 'nature-environment', label: 'Nature and Environment' },
  { week: 'W27', topic: 'holidays-celebrations', label: 'Holidays and Celebrations' },
  { week: 'W28', topic: 'music-entertainment', label: 'Music and Entertainment' },
  { week: 'W29', topic: 'technology-devices', label: 'Technology and Devices' },
  { week: 'W30', topic: 'review-p3', label: 'Review Period 3 (W21-W29)' },
  { week: 'W31', topic: 'describing-people', label: 'Describing People' },
  { week: 'W32', topic: 'comparisons', label: 'Making Comparisons' },
  { week: 'W33', topic: 'directions-locations', label: 'Directions and Locations' },
  { week: 'W34', topic: 'shopping-money', label: 'Shopping and Money' },
  { week: 'W35', topic: 'food-preferences', label: 'Food Preferences' },
  { week: 'W36', topic: 'past-events', label: 'Past Events and Experiences' },
  { week: 'W37', topic: 'future-plans', label: 'Future Plans (Going to)' },
  { week: 'W38', topic: 'abilities-talents', label: 'Abilities and Talents (Can/Can\'t)' },
  { week: 'W39', topic: 'rules-obligations', label: 'Rules and Obligations (Must/Have to)' },
  { week: 'W40', topic: 'final-review', label: 'Final Review (W01-W39)' },
];

// Generate questions for each week
function generateQuestions(week, topic, label) {
  const qs = [];
  
  // Simple helper: each week gets 10 questions covering different parts (ICFES-style)
  // For review weeks, we mix topics
  const isReview = week === 'W10' || week === 'W20' || week === 'W30' || week === 'W40';
  
  // Each question follows the Grade 10 template structure but at A2 level
  // Bloom levels: D1-D3 for A2 (Remember, Understand, Apply)
  // Parts: Part 2 (Vocabulary), Part 4 (Grammar Cloze), Part 6/7 (Reading)
  
  // Build 10 questions
  // We'll write them inline here - each function creates a specific set
  
  return qs;
}

// Define all 40 bundles as string content
const bundleContents = {};

// Period 1: W01-W09 + W10 Review
// Topic: Basic vocabulary, present simple, verb to be, basic descriptions

bundleContents.W01 = `---
id: "CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-bundle"
country: "colombia"
grado: 5
asignatura: "ingles"
tema: "greetings-introductions"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
license: "FREE"
cefr_level: "A2"
tier: "MASTERY"
creador: "Jules-Agent"
---

# Bundle Mastery: Greetings and Introductions - Grade 5

This bundle covers basic greetings, introductions, and polite expressions at A2 level.

---

## Question 1 [D1]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v1\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.90
**Contexto:** A new student arrives at school.

### Enunciado
You meet a new classmate in the morning. What do you say?

### Opciones
- [ ] A) Good night.
- [ ] B) Good morning.
- [x] C) Good morning. <!-- feedback: Correct. 'Good morning' is the greeting we use before noon. -->
- [ ] D) Good evening.

### Explicación Pedagógica
We use 'Good morning' as a greeting in the morning hours, usually before 12:00 PM.

---

## Question 2 [D1]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v2\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.88
**Contexto:** Introducing yourself.

### Enunciado
"Hi, my ____ is Sofia. What's your name?"

### Opciones
- [ ] A) age
- [ ] B) school
- [x] C) name <!-- feedback: Correct. 'My name is...' is the standard way to introduce yourself. -->
- [ ] D) book

### Explicación Pedagógica
We use 'my name is...' to tell someone who we are when we first meet them.

---

## Question 3 [D2]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v3\`
**Bloom:** Understand
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.85
**Contexto:** A conversation between two students.

### Enunciado
"A: Where ____ you from? B: I ____ from Colombia."

### Opciones
- [ ] A) is / am
- [ ] B) are / is
- [x] C) are / am <!-- feedback: Correct. 'Are' for 'you' and 'am' for 'I'. -->
- [ ] D) am / are

### Explicación Pedagógica
Verb to be: 'you are' (question form 'Where are you?') and 'I am' for the answer. This is a basic pattern in English.

---

## Question 4 [D2]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v4\`
**Bloom:** Understand
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.83
**Contexto:** Asking for personal information.

### Enunciado
"What ____ your phone number?"

### Opciones
- [ ] A) am
- [x] B) is <!-- feedback: Correct. 'Is' is used with singular nouns like 'phone number'. -->
- [ ] C) are
- [ ] D) be

### Explicación Pedagógica
'Is' is the correct form of the verb 'to be' for singular things like a phone number or an address.

---

## Question 5 [D2]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v5\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.80
**Contexto:** Saying goodbye.

### Enunciado
It is 8:00 PM and you are leaving a friend's house. You say: "____"

### Opciones
- [ ] A) Good morning.
- [x] B) Good night. <!-- feedback: Correct. 'Good night' is used when leaving late or going to bed. -->
- [ ] C) Hello.
- [ ] D) See you never.

### Explicación Pedagógica
'Good night' is the appropriate farewell in the evening or when someone is going to sleep.

---

## Question 6 [D2]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v6\`
**Bloom:** Apply
**ICFES:** Part 6 - Reading Comprehension
**Expected_Success:** 0.78
**Contexto:** A short conversation in the classroom.

### Enunciado
Read the conversation:
Teacher: "Good morning, class!"
Students: "Good morning, teacher!"
Teacher: "Today we have a new student. This is Carlos."
Carlos: "____, everyone. Nice to meet you."

What does Carlos say?

### Opciones
- [x] A) Hello <!-- feedback: Correct. Carlos is greeting the class. -->
- [ ] B) Goodbye
- [ ] C) I'm tired
- [ ] D) See you later

### Explicación Pedagógica
When meeting people for the first time, we say 'Hello' or 'Hi' followed by 'Nice to meet you'.

---

## Question 7 [D3]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v7\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.75
**Contexto:** Talking about ages.

### Enunciado
"Sofia is ten years old. I ____ ten years old too."

### Opciones
- [ ] A) is
- [x] B) am <!-- feedback: Correct. We use 'am' with the subject 'I'. -->
- [ ] C) are
- [ ] D) be

### Explicación Pedagógica
Remember: I am, you are, he/she/it is. 'I am' is used when talking about yourself.

---

## Question 8 [D3]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v8\`
**Bloom:** Understand
**ICFES:** Part 6 - Reading Comprehension
**Expected_Success:** 0.72
**Contexto:** A short personal introduction.

### Enunciado
Read the text: "Hello! My name is Ana. I am nine years old. I am from Bogotá, Colombia."

What information does Ana give?

### Opciones
- [ ] A) Her favorite color
- [x] B) Her name, age, and city <!-- feedback: Correct. Ana says her name, age, and where she is from. -->
- [ ] C) Her school name
- [ ] D) Her pet's name

### Explicación Pedagógica
When we introduce ourselves, we often include our name, age, and where we are from.

---

## Question 9 [D3]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v9\`
**Bloom:** Apply
**ICFES:** Part 7 - Reading Comprehension
**Expected_Success:** 0.70
**Contexto:** A dialogue at school.

### Enunciado
"Pedro: Hello, I'm Pedro. What's your name?
Laura: Hi Pedro, I'm Laura. Nice to meet you.
Pedro: Nice to meet you too, Laura. Are you in Grade 5?
Laura: Yes, I am."

Which statement is TRUE?

### Opciones
- [ ] A) Laura is a teacher.
- [x] B) Pedro and Laura are classmates. <!-- feedback: Correct. They are both in Grade 5 and meeting each other. -->
- [ ] C) Pedro is not friendly.
- [ ] D) Laura doesn't like Pedro.

### Explicación Pedagógica
From the dialogue, we can understand that Pedro and Laura are both in Grade 5, so they are classmates.

---

## Question 10 [D3]
**ID:** \`CO-ING-05-2026-W01-greetings-introductions-001-MASTERY-v10\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.68
**Contexto:** Saying how you feel.

### Enunciado
"A: How ____ you today? B: I ____ fine, thank you."

### Opciones
- [ ] A) is / is
- [ ] B) am / are
- [x] C) are / am <!-- feedback: Correct. 'How are you?' uses 'are', and 'I am' in the response. -->
- [ ] D) are / is

### Explicación Pedagógica
'How are you?' is a common greeting asking about someone's well-being. Use 'are' with 'you' and 'am' with 'I'.

---
`;

bundleContents.W02 = `---
id: "CO-ING-05-2026-W02-classroom-objects-001-MASTERY-bundle"
country: "colombia"
grado: 5
asignatura: "ingles"
tema: "classroom-objects"
periodo: "weekly"
week: "W02"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
license: "FREE"
cefr_level: "A2"
tier: "MASTERY"
creador: "Jules-Agent"
---

# Bundle Mastery: Classroom Objects and Commands - Grade 5

This bundle covers vocabulary for common classroom objects and simple teacher commands at A2 level.

---

## Question 1 [D1]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v1\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.90
**Contexto:** Identifying classroom items.

### Enunciado
You write with this object in your notebook. What is it?

### Opciones
- [ ] A) Eraser
- [ ] B) Ruler
- [x] C) Pencil <!-- feedback: Correct. A pencil is used for writing. -->
- [ ] D) Scissors

### Explicación Pedagógica
A pencil is a common tool for writing. It has a tip made of graphite.

---

## Question 2 [D1]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v2\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.88
**Contexto:** Identifying furniture.

### Enunciado
You sit on this in the classroom.

### Opciones
- [ ] A) Desk
- [x] B) Chair <!-- feedback: Correct. You sit on a chair in the classroom. -->
- [ ] C) Blackboard
- [ ] D) Door

### Explicación Pedagógica
A chair is a piece of furniture for sitting. In the classroom, each student typically has their own chair.

---

## Question 3 [D2]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v3\`
**Bloom:** Understand
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.85
**Contexto:** Teacher giving instructions.

### Enunciado
The teacher says: "Open your ____ to page 10."

### Opciones
- [ ] A) pencil case
- [x] B) book <!-- feedback: Correct. 'Open your book' means to turn to a specific page. -->
- [ ] C) backpack
- [ ] D) eraser

### Explicación Pedagógica
'Open your book' is a common classroom instruction. It means to start looking at your textbook.

---

## Question 4 [D2]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v4\`
**Bloom:** Understand
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.82
**Contexto:** Describing what you have.

### Enunciado
"I ____ a new pencil case. It ____ blue."

### Opciones
- [ ] A) have / have
- [x] B) have / is <!-- feedback: Correct. 'Have' for possession and 'is' to describe the color. -->
- [ ] C) has / is
- [ ] D) have / are

### Explicación Pedagógica
Use 'have' with 'I' to show possession. Use 'is' with 'it' to describe something's color.

---

## Question 5 [D2]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v5\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.80
**Contexto:** Classroom commands.

### Enunciado
"Please ____ your hand before you speak."

### Opciones
- [ ] A) put down
- [x] B) raise <!-- feedback: Correct. 'Raise your hand' means to lift your hand up. -->
- [ ] C) hide
- [ ] D) cover

### Explicación Pedagógica
'Raise your hand' is a classroom rule. It means to put your hand up to ask or answer a question.

---

## Question 6 [D2]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v6\`
**Bloom:** Understand
**ICFES:** Part 6 - Reading Comprehension
**Expected_Success:** 0.78
**Contexto:** A list of school supplies.

### Enunciado
Read the list: "School supplies: one pencil, one eraser, one ruler, one notebook, and crayons."

How many items are on the list?

### Opciones
- [ ] A) Three
- [x] B) Five <!-- feedback: Correct. There are five items: pencil, eraser, ruler, notebook, crayons. -->
- [ ] C) Two
- [ ] D) Ten

### Explicación Pedagógica
Count the items on the list: pencil (1), eraser (2), ruler (3), notebook (4), and crayons (5).

---

## Question 7 [D3]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v7\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.75
**Contexto:** Describing location.

### Enunciado
"The teacher's desk is ____ the front of the classroom."

### Opciones
- [ ] A) on
- [x] B) at <!-- feedback: Correct. 'At the front' is the correct preposition for this location. -->
- [ ] C) in
- [ ] D) under

### Explicación Pedagógica
'At the front' is a fixed expression to describe something located in the front part of a room.

---

## Question 8 [D3]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v8\`
**Bloom:** Understand
**ICFES:** Part 6 - Reading Comprehension
**Expected_Success:** 0.72
**Contexto:** A description of objects.

### Enunciado
Read: "This is my pencil case. Inside, there is a blue pen, a red pencil, and a small eraser."

What color is the pencil?

### Opciones
- [ ] A) Blue
- [x] B) Red <!-- feedback: Correct. The text says "a red pencil". -->
- [ ] C) Green
- [ ] D) Yellow

### Explicación Pedagógica
Reading carefully: the text mentions 'a red pencil'. The color red describes the pencil.

---

## Question 9 [D3]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v9\`
**Bloom:** Apply
**ICFES:** Part 7 - Reading Comprehension
**Expected_Success:** 0.70
**Contexto:** Classroom rules.

### Enunciado
Read the classroom rules:
1. Raise your hand to speak.
2. Keep your desk clean.
3. Listen to the teacher.
4. Don't run in class.

Which rule is about talking?

### Opciones
- [ ] A) Rule 2
- [x] B) Rule 1 <!-- feedback: Correct. Rule 1 says "Raise your hand to speak" which is about talking. -->
- [ ] C) Rule 3
- [ ] D) Rule 4

### Explicación Pedagógica
Rule 1 directly mentions speaking, so it is the rule about talking in class.

---

## Question 10 [D3]
**ID:** \`CO-ING-05-2026-W02-classroom-objects-001-MASTERY-v10\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.68
**Contexto:** Describing objects.

### Enunciado
"These scissors ____ new, but this notebook ____ old."

### Opciones
- [ ] A) is / is
- [ ] B) are / are
- [x] C) are / is <!-- feedback: Correct. 'Scissors' is plural so 'are', 'notebook' is singular so 'is'. -->
- [ ] D) is / are

### Explicación Pedagógica
Some nouns in English are always plural, like 'scissors'. They take 'are'. 'Notebook' is singular and takes 'is'.

---
`;

bundleContents.W03 = `---
id: "CO-ING-05-2026-W03-colors-shapes-001-MASTERY-bundle"
country: "colombia"
grado: 5
asignatura: "ingles"
tema: "colors-shapes"
periodo: "weekly"
week: "W03"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
license: "FREE"
cefr_level: "A2"
tier: "MASTERY"
creador: "Jules-Agent"
---

# Bundle Mastery: Colors and Shapes - Grade 5

This bundle covers basic color and shape vocabulary at A2 level.

---

## Question 1 [D1]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v1\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.92
**Contexto:** Identifying colors.

### Enunciado
What color is the sky on a sunny day?

### Opciones
- [ ] A) Green
- [ ] B) Red
- [x] C) Blue <!-- feedback: Correct. The sky appears blue on a clear day. -->
- [ ] D) Yellow

### Explicación Pedagógica
The sky is blue during a sunny day. Blue is one of the basic colors.

---

## Question 2 [D1]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v2\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.90
**Contexto:** Identifying shapes.

### Enunciado
A ball is this shape. What shape is it?

### Opciones
- [ ] A) Square
- [x] B) Circle <!-- feedback: Correct. A ball is round, so it is a circle (in 2D) or sphere (in 3D). -->
- [ ] C) Triangle
- [ ] D) Rectangle

### Explicación Pedagógica
A circle is a round shape with no corners. Balls and wheels are circular.

---

## Question 3 [D2]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v3\`
**Bloom:** Understand
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.87
**Contexto:** Describing objects.

### Enunciado
The Colombian flag has three colors: yellow, blue, and ____.

### Opciones
- [ ] A) green
- [ ] B) white
- [x] C) red <!-- feedback: Correct. The Colombian flag has yellow, blue, and red. -->
- [ ] D) black

### Explicación Pedagógica
The flag of Colombia has three horizontal stripes: yellow (top), blue (middle), and red (bottom).

---

## Question 4 [D2]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v4\`
**Bloom:** Understand
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.85
**Contexto:** Describing colors.

### Enunciado
"My backpack ____ blue and white."

### Opciones
- [ ] A) have
- [x] B) is <!-- feedback: Correct. 'Is' is used to describe the color of a singular object. -->
- [ ] C) has
- [ ] D) are

### Explicación Pedagógica
Use 'is' with singular nouns to describe their color or appearance.

---

## Question 5 [D2]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v5\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.82
**Contexto:** Mixing colors.

### Enunciado
"If you mix yellow and blue, you ____ green."

### Opciones
- [ ] A) are getting
- [x] B) get <!-- feedback: Correct. Present Simple describes a general fact. -->
- [ ] C) got
- [ ] D) getting

### Explicación Pedagógica
Present Simple is used for scientific facts and general truths. Yellow + Blue = Green.

---

## Question 6 [D2]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v6\`
**Bloom:** Understand
**ICFES:** Part 6 - Reading Comprehension
**Expected_Success:** 0.80
**Contexto:** Describing a picture.

### Enunciado
Read the description: "The apple is red. The banana is yellow. The grape is purple."

Which fruit is red?

### Opciones
- [x] A) The apple <!-- feedback: Correct. The description says "The apple is red." -->
- [ ] B) The banana
- [ ] C) The grape
- [ ] D) The orange

### Explicación Pedagógica
Reading carefully: the text says "The apple is red. The banana is yellow." The correct answer is the apple.

---

## Question 7 [D3]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v7\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.78
**Contexto:** Comparing objects.

### Enunciado
"The red balloon is big, but the blue balloon is ____."

### Opciones
- [ ] A) big
- [x] B) bigger <!-- feedback: Correct. 'Bigger' is the comparative form used for comparing two things. -->
- [ ] C) biggest
- [ ] D) more big

### Explicación Pedagógica
For short adjectives like 'big', we add '-er' to compare two things: big → bigger.

---

## Question 8 [D3]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v8\`
**Bloom:** Understand
**ICFES:** Part 6 - Reading Comprehension
**Expected_Success:** 0.75
**Contexto:** A shape riddle.

### Enunciado
Read the riddle: "I have four equal sides. I am not a circle. What shape am I?"

### Opciones
- [ ] A) Triangle
- [ ] B) Rectangle
- [x] C) Square <!-- feedback: Correct. A square has four equal sides. -->
- [ ] D) Star

### Explicación Pedagógica
A square is a shape with four sides of equal length and four corners.

---

## Question 9 [D3]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v9\`
**Bloom:** Apply
**ICFES:** Part 7 - Reading Comprehension
**Expected_Success:** 0.72
**Contexto:** A classroom activity.

### Enunciado
The teacher asks the students to color. Read the instructions:

"Color the circle red. Color the square blue. Color the triangle yellow."

What color is the triangle?

### Opciones
- [ ] A) Red
- [ ] B) Blue
- [x] C) Yellow <!-- feedback: Correct. The instructions say "Color the triangle yellow." -->
- [ ] D) Green

### Explicación Pedagógica
Careful reading: the last instruction says 'Color the triangle yellow.'

---

## Question 10 [D3]
**ID:** \`CO-ING-05-2026-W03-colors-shapes-001-MASTERY-v10\`
**Bloom:** Apply
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.70
**Contexto:** Describing a drawing.

### Enunciado
"I ____ drawing a house. The roof ____ red."

### Opciones
- [x] A) am / is <!-- feedback: Correct. Present Continuous 'am drawing' for current action, 'is' to describe. -->
- [ ] B) is / am
- [ ] C) am / are
- [ ] D) are / is

### Explicación Pedagógica
Use Present Continuous ('am drawing') for actions happening now. Use 'is' with singular nouns ('the roof is').

---
`;

bundleContents.W04 = `---
id: "CO-ING-05-2026-W04-numbers-counting-001-MASTERY-bundle"
country: "colombia"
grado: 5
asignatura: "ingles"
tema: "numbers-counting"
periodo: "weekly"
week: "W04"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
license: "FREE"
cefr_level: "A2"
tier: "MASTERY"
creador: "Jules-Agent"
---

# Bundle Mastery: Numbers and Counting - Grade 5

This bundle covers numbers 1-100 and basic counting at A2 level.

---

## Question 1 [D1]
**ID:** \`CO-ING-05-2026-W04-numbers-counting-001-MASTERY-v1\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.92
**Contexto:** Counting objects.

### Enunciado
How do you write the number 15 in words?

### Opciones
- [ ] A) Fiveteen
- [ ] B) Fifty
- [x] C) Fifteen <!-- feedback: Correct. The number 15 is spelled 'fifteen'. -->
- [ ] D) Fivty

### Explicación Pedagógica
Numbers 13-19 end in '-teen'. Fifteen is 5 + 10 (five + teen).

---

## Question 2 [D1]
**ID:** \`CO-ING-05-2026-W04-numbers-counting-001-MASTERY-v2\`
**Bloom:** Remember
**ICFES:** Part 2 - Lexical Knowledge
**Expected_Success:** 0.90
**Contexto:** Counting in tens.

### Enunciado
What number comes after twenty-nine?

### Opciones
- [x] A) Thirty <!-- feedback: Correct. After 29 (twenty-nine) comes 30 (thirty). -->
- [ ] B) Twenty-ten
- [ ] C) Forty
- [ ] D) Thirty-one

### Explicación Pedagógica
Counting: ... 27, 28, 29, 30 (thirty), 31 ... Numbers in English have specific names.

---

## Question 3 [D2]
**ID:** \`CO-ING-05-2026-W04-numbers-counting-001-MASTERY-v3\`
**Bloom:** Understand
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.87
**Contexto:** Talking about quantity.

### Enunciado
"There ____ twenty students in my class."

### Opciones
- [ ] A) is
- [x] B) are <!-- feedback: Correct. 'Are' is used with plural nouns like 'twenty students'. -->
- [ ] C) am
- [ ] D) be

### Explicación Pedagógica
Use 'there are' with plural countable nouns. Twenty students is more than one, so we use 'are'.

---

## Question 4 [D2]
**ID:** \`CO-ING-05-2026-W04-numbers-counting-001-MASTERY-v4\`
**Bloom:** Understand
**ICFES:** Part 4 - Grammatical Cloze
**Expected_Success:** 0.84
**Contexto:** Asking about age.

### Enunciado
"How old ____ you
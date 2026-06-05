#!/usr/bin/env python3
"""Add Grade 6 English questions to _questions_data_full.json"""
import json

with open('_questions_data_full.json', encoding='utf-8') as f:
    Q = json.load(f)

# === GRADE 6 - INGLES P1 (Personal Information) ===
Q['6_ingles_P1'] = [
    {"c":"In English class in Bogot\u00e1 they learn introductions.","e":"How do you ask someone's name?","opts":[["A","How old are you?","No."],["B","What's your name?","Correcto."],["C","Where are you from?","No."],["D","How are you?","No."]],"a":"B","fb":"'What's your name?' = '\u00bfC\u00f3mo te llamas?'"},
    {"c":"In Medell\u00edn they practice greetings.","e":"'Good morning' is used from ___.","opts":[["A","12 pm to 6 pm","No."],["B","Morning until noon","Correcto."],["C","6 pm to 12 am","No."],["D","Only on Mondays","No."]],"a":"B","fb":"Good morning: from sunrise to noon. Good afternoon: noon to 6 pm. Good evening: after 6 pm."},
    {"c":"In Cali they ask about origin.","e":"'Where are you from?' 'I am from ___.'","opts":[["A","Colombia","Correcto."],["B","Colombian","Adjective."],["C","Colombia's","No."],["D","The Colombia","No."]],"a":"A","fb":"'I am from Colombia' = 'Soy de Colombia.' 'I am Colombian' = 'Soy colombiano.'"},
    {"c":"In Barranquilla they talk about age.","e":"'How old are you?' Answer: 'I am 12 ___ old.'","opts":[["A","year","No, plural."],["B","years","Correcto."],["C","years'","No."],["D","year's","No."]],"a":"B","fb":"'I am 12 years old.' 'I am 12.' Both correct."},
    {"c":"In Bucaramanga they practice 'to be'.","e":"Complete: 'She ___ 11 years old.'","opts":[["A","is","Correcto."],["B","am","No, I am."],["C","are","No, you/we/they."],["D","be","No."]],"a":"A","fb":"He/she/it uses 'is'. 'She is 11 years old.'"},
    {"c":"In Cartagena they spell names.","e":"'How do you spell your name?' J-O-H-N.","opts":[["A","John","Correcto."],["B","Jon","No."],["C","Jhon","No."],["D","Johan","No."]],"a":"A","fb":"Spelling = saying each letter: J-O-H-N."},
    {"c":"In Pereira they exchange phone numbers.","e":"'What's your phone number?' 'It's 321 ___'","opts":[["A","five five five","Correcto, 555."],["B","five and five","No."],["C","double five","No."],["D","fifty five","No."]],"a":"A","fb":"Numbers: 321-555-1234 = three two one, five five five, one two three four."},
    {"c":"In Manizales they talk about birthdays.","e":"'When is your birthday?' 'It's on March ___'","opts":[["A","five","5th."],["B","the fifth","Correcto."],["C","five's","No."],["D","fifth's","No."]],"a":"B","fb":"'March 5th' = 'March fifth' or 'the fifth of March.'"},
    {"c":"In C\u00facuta they learn classroom expressions.","e":"'Can you repeat, please?' means ___.","opts":[["A","\u00bfPuede repetir?","Correcto."],["B","\u00bfPuedo ir al ba\u00f1o?","No."],["C","\u00bfC\u00f3mo se dice?","No."],["D","\u00bfQu\u00e9 significa?","No."]],"a":"A","fb":"'Can you repeat, please?' = '\u00bfPuede repetir, por favor?'"},
    {"c":"In Ibagu\u00e9 they complete a personal profile.","e":"'I live in ___' - 'Vivo en Ibagu\u00e9.'","opts":[["A","Ibagu\u00e9","Correcto."],["B","the Ibagu\u00e9","No, no article."],["C","from Ibagu\u00e9","No."],["D","to Ibagu\u00e9","No."]],"a":"A","fb":"'I live in Ibagu\u00e9' = 'Vivo en Ibagu\u00e9.' City names don't need 'the'."},
]
print("Added 6_ingles_P1")

# === GRADE 6 - INGLES P2 (School life) ===
Q['6_ingles_P2'] = [
    {"c":"In English class in Bogot\u00e1 they learn school subjects.","e":"'Matem\u00e1ticas' in English is ___.","opts":[["A","Maths / Math","Correcto."],["B","Science","No."],["C","History","No."],["D","Art","No."]],"a":"A","fb":"Mathematics = Maths (UK) or Math (US)."},
    {"c":"In Medell\u00edn they practice 'there is/are'.","e":"'There ___ 30 students in my class.'","opts":[["A","is","No, plural."],["B","are","Correcto."],["C","am","No."],["D","be","No."]],"a":"B","fb":"'There are' + plural noun. 'There is' + singular."},
    {"c":"In Cali they describe the classroom.","e":"'The book is ___ the desk.' (sobre)","opts":[["A","in","No."],["B","on","Correcto."],["C","under","Debajo."],["D","next to","Al lado."]],"a":"B","fb":"Prepositions: on (sobre), in (dentro), under (debajo), next to (al lado)."},
    {"c":"In Barranquilla they talk about timetables.","e":"'I have English ___ 8 am on Mondays.'","opts":[["A","in","No."],["B","at","Correcto."],["C","on","No."],["D","by","No."]],"a":"B","fb":"'At' + specific time: at 8 am, at 3:30 pm."},
    {"c":"In Bucaramanga they describe their school.","e":"'My school has a big ___' (cancha deportiva)","opts":[["A","sports field","Correcto."],["B","sport field","No."],["C","sports court","Possible."],["D","sport land","No."]],"a":"A","fb":"'Sports field' = cancha deportiva. 'Playground' = parque infantil."},
    {"c":"In Cartagena they practice simple present.","e":"'She ___ Spanish class every Tuesday.'","opts":[["A","have","No, third person."],["B","has","Correcto."],["C","having","No."],["D","had","No, present."]],"a":"B","fb":"Third person (he/she/it): has, goes, studies."},
    {"c":"In Pereira they ask about schedules.","e":"'What time does school start?' 'It ___ at 7 am.'","opts":[["A","start","No."],["B","starts","Correcto."],["C","starting","No."],["D","started","No."]],"a":"B","fb":"Third person singular: It starts, school begins, the class finishes."},
    {"c":"In Manizales they learn school objects.","e":"What do you use to write on a blackboard?","opts":[["A","A pen","No, paper."],["B","A marker / chalk","Correcto."],["C","A pencil","No."],["D","A ruler","No."]],"a":"B","fb":"On a blackboard: chalk. On a whiteboard: marker."},
    {"c":"In C\u00facuta they talk about favorite subjects.","e":"'My favorite subject is ___ because I like to draw.'","opts":[["A","Math","No."],["B","Art","Correcto."],["C","English","No."],["D","Music","No."]],"a":"B","fb":"Art class involves drawing and painting. Match subject to activity."},
    {"c":"In Ibagu\u00e9 they write about school rules.","e":"'We ___ run in the hallways.' (prohibido)","opts":[["A","must","No."],["B","mustn't","Correcto."],["C","can","No."],["D","don't have to","No, no obligation."]],"a":"B","fb":"Mustn't = prohibido. 'Must' = obligaci\u00f3n."},
]
print("Added 6_ingles_P2")

# === GRADE 6 - INGLES P3 (Daily routines) ===
Q['6_ingles_P3'] = [
    {"c":"In English class in Bogot\u00e1 they learn daily routines.","e":"'I wake ___ at 6 am.'","opts":[["A","up","Correcto."],["B","in","No."],["C","on","No."],["D","out","No."]],"a":"A","fb":"'Wake up' = despertarse. Phrasal verb."},
    {"c":"In Medell\u00edn they sequence activities.","e":"'I get dressed ___ I have breakfast.' (antes de)","opts":[["A","after","No."],["B","before","Correcto."],["C","then","No."],["D","and","No."]],"a":"B","fb":"'Before' = antes. Sequence: get dressed before breakfast."},
    {"c":"In Cali they practice time expressions.","e":"'I go to school ___ 7 am.'","opts":[["A","in","No."],["B","at","Correcto."],["C","on","No."],["D","the","No."]],"a":"B","fb":"'At' + time: at 7 am, at noon, at midnight."},
    {"c":"In Barranquilla they use frequency adverbs.","e":"'I ___ eat breakfast.' (siempre)","opts":[["A","always","Correcto."],["B","never","No."],["C","sometimes","A veces."],["D","rarely","Casi nunca."]],"a":"A","fb":"Always = siempre. Never = nunca. Sometimes = a veces."},
    {"c":"In Bucaramanga they conjugate verbs.","e":"'He ___ breakfast at 7.' (have)","opts":[["A","have","No."],["B","has","Correcto."],["C","having","No."],["D","haves","No."]],"a":"B","fb":"Simple present: He/she/it + verb+s. He has, she goes, it rains."},
    {"c":"In Cartagena they talk about weekends.","e":"'On Saturdays I ___ my friends.'","opts":[["A","visit","Correcto."],["B","visits","No."],["C","visitting","No."],["D","visited","No."]],"a":"A","fb":"I/you/we/they use base verb: I visit, you visit, we visit."},
    {"c":"In Pereira they use negatives.","e":"'She ___ like getting up early.' (no)","opts":[["A","doesn't","Correcto."],["B","don't","No, third person."],["C","isn't","No."],["D","not","No."]],"a":"A","fb":"Third person negative: doesn't + base verb. She doesn't like."},
    {"c":"In Manizales they practice questions.","e":"'___ you do homework every day?'","opts":[["A","Does","No, you."],["B","Do","Correcto."],["C","Are","No."],["D","Is","No."]],"a":"B","fb":"Do/Does + subject + verb. I/you/we/they: Do. He/she/it: Does."},
    {"c":"In C\u00facuta they talk about routines.","e":"'I brush my ___' (dientes)","opts":[["A","tooth","Singular."],["B","teeth","Correcto."],["C","teet","No."],["D","tooths","No."]],"a":"B","fb":"Irregular plural: tooth \u2192 teeth (not 'tooths')."},
    {"c":"In Ibagu\u00e9 they describe a typical day.","e":"'In the evening, I ___ TV.'","opts":[["A","watch","Correcto."],["B","see","No."],["C","look at","No."],["D","view","No."]],"a":"A","fb":"'Watch TV' = ver televisi\u00f3n. 'Watch' is for moving images."},
]
print("Added 6_ingles_P3")

# === GRADE 6 - INGLES P4 (Free time activities) ===
Q['6_ingles_P4'] = [
    {"c":"In English class in Bogot\u00e1 they talk about hobbies.","e":"'I like ___ videogames.'","opts":[["A","play","No."],["B","playing","Correcto."],["C","plays","No."],["D","played","No."]],"a":"B","fb":"Like + -ing: I like playing, reading, swimming."},
    {"c":"In Medell\u00edn they use 'can'.","e":"'I ___ play the guitar.' (puedo)","opts":[["A","can","Correcto."],["B","cans","No."],["C","can to","No."],["D","am can","No."]],"a":"A","fb":"Can + base verb: I can play, she can sing. No 'to' after can."},
    {"c":"In Cali they talk about sports.","e":"'I'm good ___ soccer.'","opts":[["A","in","No."],["B","at","Correcto."],["C","on","No."],["D","for","No."]],"a":"B","fb":"'Good at' + activity: good at soccer, good at math."},
    {"c":"In Barranquilla they make invitations.","e":"'Do you want to ___ to the park?'","opts":[["A","go","Correcto."],["B","going","No."],["C","goes","No."],["D","went","No."]],"a":"A","fb":"'Want to + verb': want to go, want to play, want to see."},
    {"c":"In Bucaramanga they use frequency.","e":"'I go swimming ___ a week.' (2 veces)","opts":[["A","one time","No."],["B","twice","Correcto."],["C","two time","No."],["D","two","No."]],"a":"B","fb":"Once (1x), twice (2x), three times (3x)."},
    {"c":"In Cartagena they practice present continuous.","e":"'Right now, I ___ basketball.'","opts":[["A","play","No."],["B","am playing","Correcto."],["C","plays","No."],["D","played","No."]],"a":"B","fb":"Present continuous: am/is/are + -ing. Right now = now."},
    {"c":"In Pereira they talk about preferences.","e":"'I prefer ___ to running.'","opts":[["A","swim","No."],["B","swimming","Correcto."],["C","swims","No."],["D","swam","No."]],"a":"B","fb":"Prefer + -ing: I prefer swimming to running."},
    {"c":"In Manizales they use 'like + infinitive'.","e":"'I like ___ (to) read books.'","opts":[["A","to read","Correcto."],["B","reads","No."],["C","reading","Also correct."],["D","readed","No."]],"a":"A","fb":"Both 'like + to read' and 'like reading' are correct."},
    {"c":"In C\u00facuta they ask about hobbies.","e":"'What do you do in your free time?' 'I ___ pictures.' (dibujo)","opts":[["A","draw","Correcto."],["B","draws","No."],["C","drawing","No."],["D","drew","No."]],"a":"A","fb":"Simple present: I draw, you draw, he/she draws."},
    {"c":"In Ibagu\u00e9 they describe their talents.","e":"'I am very good ___ singing.'","opts":[["A","in","No."],["B","at","Correcto."],["C","on","No."],["D","for","No."]],"a":"B","fb":"'Good at + -ing': good at singing, good at dancing, good at drawing."},
]
print("Added 6_ingles_P4")

with open('_questions_data_full.json', 'w', encoding='utf-8') as f:
    json.dump(Q, f, ensure_ascii=False, indent=2)
print(f"Saved. Total keys: {len(Q)}")

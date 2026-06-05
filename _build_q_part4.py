#!/usr/bin/env python3
"""Add Grade 5 English to _questions_data_full.json"""
import json

with open('_questions_data_full.json', encoding='utf-8') as f:
    Q = json.load(f)

# === GRADE 5 - INGLES P1 (Descriptions) ===
Q['5_ingles_P1'] = [
    {"c":"In English class at school in Ch\u00eda, the teacher describes objects.","e":"How do you say 'gato' in English?","opts":[["A","Dog","No, that's perro."],["B","Cat","Correcto."],["C","Bird","No, that's ave."],["D","Fish","No, that's pez."]],"a":"B","fb":"'Gato' in English is 'cat'. 'Dog' is perro."},
    {"c":"In English class in Medell\u00edn they learn colors.","e":"Complete: The sky is ___.","opts":[["A","Green","No."],["B","Blue","Correcto."],["C","Red","No."],["D","Yellow","No."]],"a":"B","fb":"The sky is blue. Colors are adjectives that describe nouns."},
    {"c":"In class in Cali they describe their pets.","e":"Choose the correct description: 'The elephant is ___'.","opts":[["A","Small","No."],["B","Big","Correcto."],["C","Tiny","No."],["D","Short","No."]],"a":"B","fb":"Elephants are big animals. 'Big' and 'small' are size adjectives."},
    {"c":"In English class in Barranquilla they learn body parts.","e":"How many fingers do you have on one hand?","opts":[["A","Three","No."],["B","Four","No."],["C","Five","Correcto."],["D","Ten","No, that's both."]],"a":"C","fb":"You have five fingers on one hand. 'Hand' is 'mano' in Spanish."},
    {"c":"In Bucaramanga, the teacher asks: 'What is it?' - It has four legs, fur, and says 'woof'.","e":"What animal is it?","opts":[["A","A cat","Cats say meow."],["B","A dog","Correcto."],["C","A cow","Cows say moo."],["D","A duck","Ducks say quack."]],"a":"B","fb":"A dog has four legs, fur, and barks 'woof'."},
    {"c":"In Cartagena they practice describing people.","e":"'She ___ long hair.' Complete the sentence.","opts":[["A","have","No, need third person."],["B","has","Correcto."],["C","is","No."],["D","are","No."]],"a":"B","fb":"Third person singular (he/she/it) uses 'has'. 'I have, she has'."},
    {"c":"In Pereira they practice adjectives.","e":"What is the opposite of 'tall'?","opts":[["A","Big","No."],["B","Short","Correcto."],["C","Long","No."],["D","Fat","No."]],"a":"B","fb":"Tall (alto) vs Short (bajo). Opposites help expand vocabulary."},
    {"c":"In Manizales, the teacher shows a picture.","e":"Describe the apple: 'It is ___'.","opts":[["A","Blue and big","No."],["B","Red and round","Correcto."],["C","Green and square","No."],["D","Yellow and flat","No."]],"a":"B","fb":"Apples are typically red and round. Descriptions use color and shape adjectives."},
    {"c":"In C\u00facuta they describe emotions.","e":"How do you feel when you get a gift?","opts":[["A","Sad","No."],["B","Angry","No."],["C","Happy","Correcto."],["D","Tired","No."]],"a":"C","fb":"Getting a gift makes most people feel happy. Emotions: happy, sad, angry, tired."},
    {"c":"In Ibagu\u00e9 they write descriptions of their family.","e":"'My mother is ___' means 'Mi mam\u00e1 es cari\u00f1osa'.","opts":[["A","strict","No."],["B","loving","Correcto."],["C","funny","No."],["D","serious","No."]],"a":"B","fb":"'Loving' means 'cari\u00f1osa' in Spanish. Descriptions tell how someone is."},
]
print("Added 5_ingles_P1")

# === GRADE 5 - INGLES P2 (Daily routines) ===
Q['5_ingles_P2'] = [
    {"c":"In class in Bogot\u00e1 they describe daily routines.","e":"What is 'levantarse' in English?","opts":[["A","Go to sleep","No."],["B","Get up","Correcto."],["C","Eat breakfast","No."],["D","Brush teeth","No."]],"a":"B","fb":"'Levantarse' is 'get up' or 'wake up'. Daily routines use simple present tense."},
    {"c":"In Medell\u00edn they practice time expressions.","e":"Complete: 'I ___ breakfast at 7 am.'","opts":[["A","make","No."],["B","have","Correcto."],["C","do","No."],["D","take","No."]],"a":"B","fb":"'Have breakfast' = desayunar. Collocations: have breakfast, have lunch, have dinner."},
    {"c":"In English class in Cali.","e":"'I brush my ___' (me cepillo los dientes).","opts":[["A","hair","No."],["B","teeth","Correcto."],["C","hands","No."],["D","face","No."]],"a":"B","fb":"'Brush my teeth' = cepillarse los dientes. Part of daily hygiene routine."},
    {"c":"In Barranquilla they talk about schedule.","e":"What time do you go to school? Usually at ___.","opts":[["A","6 am","Correcto (var\u00eda)."],["B","12 pm","No, that's noon."],["C","8 pm","No."],["D","10 pm","No."]],"a":"A","fb":"Many children go to school in the morning, around 6-7 am."},
    {"c":"In Bucaramanga they sequence the day.","e":"What do you do FIRST in the morning?","opts":[["A","Have dinner","Evening."],["B","Wake up","Correcto."],["C","Go to bed","Night."],["D","Do homework","Afternoon."]],"a":"B","fb":"First you wake up, then you get dressed, eat breakfast, and go to school."},
    {"c":"In Cartagena practice frequency adverbs.","e":"Complete: 'I ___ take a shower in the morning.' (always)","opts":[["A","always take","Correcto."],["B","take always","No, wrong order."],["C","always takes","No, I + take."],["D","takes always","No."]],"a":"A","fb":"Frequency adverbs go before the verb: I always take, she always takes."},
    {"c":"In Pereira they practice telling time.","e":"\u00bfC\u00f3mo se dice '7:30' en ingl\u00e9s?","opts":[["A","Seven and thirty","No."],["B","Half past seven","Correcto."],["C","Quarter to seven","No, that's 6:45."],["D","Seven o'clock","No, 7:00."]],"a":"B","fb":"7:30 = half past seven. 7:15 = quarter past seven. 7:45 = quarter to eight."},
    {"c":"In Manizales they describe a week routine.","e":"'On Monday I ___ to music class.'","opts":[["A","go","Correcto."],["B","goes","No."],["C","going","No."],["D","went","No, present."]],"a":"A","fb":"Present simple with I/you/we/they uses the base verb: I go, you go, we go."},
    {"c":"In C\u00facuta they practice 'before' and 'after'.","e":"'I do my homework ___ I watch TV.' (first homework, then TV)","opts":[["A","after","No."],["B","before","Correcto."],["C","during","No."],["D","while","No."]],"a":"B","fb":"'Before' indicates something happening earlier: homework before TV."},
    {"c":"In Ibagu\u00e9 they write about daily life.","e":"'I go to ___ at 9 pm.' (a dormir)","opts":[["A","bed","Correcto."],["B","school","No."],["C","work","No."],["D","home","At night you go to bed."]],"a":"A","fb":"'Go to bed' = irse a la cama. 'Sleep' = dormir."},
]
print("Added 5_ingles_P2")

# === GRADE 5 - INGLES P3 (Food and drink) ===
Q['5_ingles_P3'] = [
    {"c":"In English class in Bogot\u00e1, they learn food vocabulary.","e":"What is 'pan' in English?","opts":[["A","Bread","Correcto."],["B","Butter","No."],["C","Rice","No."],["D","Cheese","No."]],"a":"A","fb":"'Pan' = bread. Other foods: rice (arroz), cheese (queso), butter (mantequilla)."},
    {"c":"In Medell\u00edn they order food in a pretend restaurant.","e":"What do you say when you want to order?","opts":[["A","I want a burger","Informal."],["B","I would like a burger","Correcto (polite)."],["C","Give me a burger","Rude."],["D","Burger now","Rude."]],"a":"B","fb":"'I would like...' is the polite way to order food in a restaurant."},
    {"c":"In Cali they talk about fruits from Colombia.","e":"What fruit is 'mango' in English?","opts":[["A","Mango","Correcto."],["B","Apple","No."],["C","Banana","No."],["D","Orange","No."]],"a":"A","fb":"Mango is mango in both Spanish and English. Colombia is famous for its mangos."},
    {"c":"In the class in Barranquilla they talk about meals.","e":"What is 'almuerzo' in English?","opts":[["A","Breakfast","Morning meal."],["B","Lunch","Correcto."],["C","Dinner","Evening meal."],["D","Snack","Small meal."]],"a":"B","fb":"Breakfast = desayuno (morning), Lunch = almuerzo (noon), Dinner = cena (evening)."},
    {"c":"In Bucaramanga they ask about preferences.","e":"Complete: 'I like ___ but I don't like coffee.'","opts":[["A","tea","Correcto."],["B","tea the","No."],["C","the tea","No, not needed."],["D","a tea","No."]],"a":"A","fb":"In general statements we say 'I like tea', not 'I like the tea'."},
    {"c":"In Cartagena they practice 'some' and 'any'.","e":"Complete: 'Would you like ___ water?'","opts":[["A","some","Correcto (offers)."],["B","any","Used in negatives."],["C","a","Water is uncountable."],["D","the","No."]],"a":"A","fb":"'Some' is used in offers and requests. 'Any' in negatives and questions."},
    {"c":"In Pereira they talk about Colombian food.","e":"What is 'bandeja paisa' in English?","opts":[["A","Paisa tray","Correcto (literal)."],["B","Colombian rice","No."],["C","Fried chicken","No."],["D","Fish soup","No."]],"a":"A","fb":"Bandeja Paisa is a traditional dish from Antioquia with beans, rice, meat, egg, and arepa."},
    {"c":"In Manizales they read a menu.","e":"'Beverages' on a menu means ___.","opts":[["A","Food","No."],["B","Drinks","Correcto."],["C","Desserts","No."],["D","Appetizers","No."]],"a":"B","fb":"Beverages = bebidas. Appetizers = entradas. Main course = plato fuerte. Desserts = postres."},
    {"c":"In C\u00facuta they practice quantifiers.","e":"'There is ___ milk in the fridge.' (indica cantidad)","opts":[["A","a few","No, countable."],["B","some","Correcto."],["C","many","No, uncountable."],["D","a","Milk is uncountable."]],"a":"B","fb":"'Some' works with uncountable nouns (milk, water, rice). 'A few' with countable."},
    {"c":"In Ibagu\u00e9 they create a food diary.","e":"'For breakfast I eat ___ with milk.'","opts":[["A","arepas","Correcto."],["B","pizza","No, not typical."],["C","soup","No, lunch."],["D","steak","No, dinner."]],"a":"A","fb":"Arepas with milk or chocolate is a typical Colombian breakfast."},
]
print("Added 5_ingles_P3")

# === GRADE 5 - INGLES P4 (Hobbies) ===
Q['5_ingles_P4'] = [
    {"c":"In class in Bogot\u00e1 they ask about hobbies.","e":"What is 'pasatiempo' in English?","opts":[["A","Homework","No, tarea."],["B","Hobby","Correcto."],["C","Subject","No, materia."],["D","Exam","No, examen."]],"a":"B","fb":"'Hobby' or 'pastime' means 'pasatiempo'. Examples: reading, drawing, playing sports."},
    {"c":"In Medell\u00edn they practice 'like + -ing'.","e":"Complete: 'I like ___ soccer.'","opts":[["A","play","Gram\u00e1tica: like + -ing."],["B","playing","Correcto."],["C","plays","No."],["D","played","No."]],"a":"B","fb":"After 'like' we use the -ing form: I like playing, I like reading, I like dancing."},
    {"c":"In Cali they ask about weekend activities.","e":"'What do you do on weekends?' 'I ___ my friends.'","opts":[["A","visit","Correcto."],["B","visits","No, I."],["C","visiting","No."],["D","visited","No, present."]],"a":"A","fb":"Simple present for routines: I visit, you visit, he/she visits."},
    {"c":"In Barranquilla they talk about sports.","e":"What sport uses a ball and a racket?","opts":[["A","Soccer","No, foot."],["B","Tennis","Correcto."],["C","Swimming","No ball."],["D","Running","No racket."]],"a":"B","fb":"Tennis uses a racket and a ball. Other racket sports: badminton, ping pong."},
    {"c":"In Bucaramanga they practice leisure vocabulary.","e":"'I like to ___' means 'Me gusta bailar'.","opts":[["A","sing","No."],["B","dance","Correcto."],["C","draw","No."],["D","read","No."]],"a":"B","fb":"'Bailar' = to dance. 'Like to + verb' or 'like + -ing' are both correct."},
    {"c":"In Cartagena they ask about frequency.","e":"Complete: 'I play video games ___ a week.' (1 vez por semana)","opts":[["A","once","Correcto."],["B","twice","Dos veces."],["C","three times","Tres veces."],["D","every day","Todos los d\u00edas."]],"a":"A","fb":"Once = una vez. Twice = dos veces. Three times = tres veces."},
    {"c":"In Pereira they compare hobbies.","e":"'Singing' and 'dancing' are forms of ___.","opts":[["A","art","Correcto."],["B","science","No."],["C","math","No."],["D","history","No."]],"a":"A","fb":"Singing and dancing are performing arts. Other arts: drawing, painting, acting."},
    {"c":"In Manizales they practice 'can' for abilities.","e":"'I ___ play the guitar very well.'","opts":[["A","cans","No."],["B","can","Correcto."],["C","can to","No."],["D","can not","No, that's cannot."]],"a":"B","fb":"'Can' + verb: I can play, she can sing, they can dance. No 'to' after can."},
    {"c":"In C\u00facuta they ask about free time.","e":"'I like to watch ___' (ver pel\u00edculas)","opts":[["A","movies","Correcto."],["B","music","No, listen."],["C","sports","No."],["D","advertisements","No."]],"a":"A","fb":"'Watch movies' = ver pel\u00edculas. 'Listen to music' = escuchar m\u00fasica."},
    {"c":"In Ibagu\u00e9 they present their hobbies.","e":"'My favorite hobby is ___' (leer libros)","opts":[["A","reading books","Correcto."],["B","read books","No, needs -ing."],["C","reads books","No."],["D","readed","No."]],"a":"A","fb":"'My favorite hobby is reading books.' After 'is' we use the -ing form as a gerund."},
]
print("Added 5_ingles_P4")

with open('_questions_data_full.json', 'w', encoding='utf-8') as f:
    json.dump(Q, f, ensure_ascii=False, indent=2)
print(f"Saved. Total keys: {len(Q)}")

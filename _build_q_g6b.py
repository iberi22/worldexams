#!/usr/bin/env python3
"""Add Grade 6 Math and Science to _questions_data_full.json"""
import json

with open('_questions_data_full.json', encoding='utf-8') as f:
    Q = json.load(f)

# === GRADE 6 - MATEMATICAS P1 (Number systems) ===
Q['6_matematicas_P1'] = [
    {"c":"In math class in Bogot\u00e1, they learn about integers.","e":"Which number is an INTEGER?","opts":[["A","2.5","Decimal, not integer."],["B","-3","Correcto."],["C","1/2","Fraction."],["D","\u221a2","Irrational."]],"a":"B","fb":"Integers include positive numbers, negative numbers, and zero. -3 is an integer."},
    {"c":"In Medell\u00edn they work with absolute value.","e":"What is |-7|?","opts":[["A","-7","No."],["B","0","No."],["C","7","Correcto."],["D","14","No."]],"a":"C","fb":"Absolute value is the distance from zero. |-7| = 7."},
    {"c":"In Cali they compare numbers on a number line.","e":"Which is true? -5 ___ -2","opts":[["A",">","No, -5 is less."],["B","<","Correcto. -5 < -2."],["C","=","No."],["D","\u2265","No."]],"a":"B","fb":"On a number line, -5 is to the left of -2, so -5 < -2."},
    {"c":"In Barranquilla they add integers.","e":"-8 + 3 = ?","opts":[["A","-11","No."],["B","-5","Correcto."],["C","5","No."],["D","11","No."]],"a":"B","fb":"-8+3 = -5. When signs differ, subtract absolute values (8-3=5) and keep sign of larger."},
    {"c":"In Bucaramanga they multiply integers.","e":"(-4) x (-3) = ?","opts":[["A","-12","No, negatives cancel."],["B","12","Correcto."],["C","-7","No."],["D","7","No."]],"a":"B","fb":"Negative x Negative = Positive. (-4)x(-3)=12."},
    {"c":"In Cartagena they solve integer problems.","e":"Temperature in Bogot\u00e1 drops from 5\u00b0C to -3\u00b0C. The change is:","opts":[["A","2\u00b0C","No."],["B","-8\u00b0C","Correcto."],["C","8\u00b0C","No."],["D","-2\u00b0C","No."]],"a":"B","fb":"Change = final - initial = -3-5 = -8. The temperature dropped 8 degrees."},
    {"c":"In Pereira they learn exponents.","e":"2\u00b3 = ?","opts":[["A","6","No, 2+2+2."],["B","5","No."],["C","8","Correcto."],["D","9","No."]],"a":"C","fb":"2\u00b3 = 2x2x2 = 8. The exponent tells how many times to multiply the base."},
    {"c":"In Manizales they find square roots.","e":"\u221a49 = ?","opts":[["A","6","No, 6\u00b2=36."],["B","7","Correcto."],["C","8","No, 8\u00b2=64."],["D","9","No, 9\u00b2=81."]],"a":"B","fb":"\u221a49 = 7 because 7x7 = 49."},
    {"c":"In C\u00facuta they order numbers.","e":"Order: 3, -1, 0, -4","opts":[["A","-4, -1, 0, 3","Correcto."],["B","3, 0, -1, -4","Incorrecto."],["C","-1, -4, 0, 3","Incorrecto."],["D","0, -1, 3, -4","Incorrecto."]],"a":"A","fb":"From least to greatest on number line: -4, -1, 0, 3."},
    {"c":"In Ibagu\u00e9 they apply order of operations.","e":"3 + 4 x 2 = ?","opts":[["A","14","No, wrong order."],["B","11","Correcto."],["C","10","No."],["D","7","No."]],"a":"B","fb":"Order: multiply first (4x2=8), then add (3+8=11). PEMDAS/Papomudas."},
]
print("Added 6_matematicas_P1")

# === GRADE 6 - MATEMATICAS P2 (Fractions and decimals) ===
Q['6_matematicas_P2'] = [
    {"c":"In math class in Bogot\u00e1 they work with fractions.","e":"1/2 + 1/4 = ?","opts":[["A","1/6","No."],["B","2/6","No."],["C","3/4","Correcto."],["D","1/8","No."]],"a":"C","fb":"1/2 = 2/4, so 2/4 + 1/4 = 3/4. Get common denominator."},
    {"c":"In Medell\u00edn they convert fractions to decimals.","e":"3/5 as a decimal is:","opts":[["A","0.3","No."],["B","0.5","No."],["C","0.6","Correcto."],["D","0.35","No."]],"a":"C","fb":"3/5 = 3 \u00f7 5 = 0.6."},
    {"c":"In Cali they compare fractions.","e":"Which is larger: 3/4 or 2/3?","opts":[["A","3/4","Correcto."],["B","2/3","No."],["C","Equal","No."],["D","Cannot compare","Yes you can."]],"a":"A","fb":"3/4 = 0.75, 2/3 \u2248 0.667. 3/4 > 2/3."},
    {"c":"In Barranquilla they subtract decimals.","e":"5.3 - 2.7 = ?","opts":[["A","2.4","No."],["B","3.4","No."],["C","2.6","Correcto."],["D","3.6","No."]],"a":"C","fb":"5.3 - 2.7 = 2.6. Align decimal points and subtract."},
    {"c":"In Bucaramanga they multiply decimals.","e":"0.4 x 0.5 = ?","opts":[["A","0.2","Correcto."],["B","2.0","No."],["C","0.02","No."],["D","0.9","No."]],"a":"A","fb":"0.4x0.5=0.2. Multiply: 4x5=20, then place 2 decimal places = 0.20 = 0.2."},
    {"c":"In Cartagena they divide fractions.","e":"1/2 \u00f7 1/4 = ?","opts":[["A","1/8","No."],["B","1/2","No."],["C","2","Correcto."],["D","1/4","No."]],"a":"C","fb":"Dividing by 1/4 = multiplying by 4/1. 1/2 x 4 = 4/2 = 2."},
    {"c":"In Pereira they simplify fractions.","e":"Simplify 8/12:","opts":[["A","2/3","Correcto."],["B","4/6","Not simplest."],["C","1/4","No."],["D","3/4","No."]],"a":"A","fb":"8/12, divide numerator and denominator by 4 = 2/3."},
    {"c":"In Manizales they add decimals.","e":"A pizza costs $12,500. A drink $3,200. Total?","opts":[["A","$15,000","No."],["B","$15,700","Correcto."],["C","$16,000","No."],["D","$15,200","No."]],"a":"B","fb":"$12,500 + $3,200 = $15,700. Align decimal points and add."},
    {"c":"In C\u00facuta they find equivalent fractions.","e":"Which is equivalent to 2/5?","opts":[["A","4/10","Correcto."],["B","5/2","No, reciprocal."],["C","1/3","No."],["D","6/10","No."]],"a":"A","fb":"Multiply numerator and denominator by 2: 2/5 = 4/10."},
    {"c":"In Ibagu\u00e9 they solve word problems.","e":"Carlos ate 1/3 of a cake and Mar\u00eda ate 1/4. How much remains?","opts":[["A","1/12","No."],["B","7/12","No."],["C","5/12","Correcto."],["D","1/7","No."]],"a":"C","fb":"Total eaten: 4/12+3/12 = 7/12. Remaining: 12/12-7/12 = 5/12."},
]
print("Added 6_matematicas_P2")

# === GRADE 6 - MATEMATICAS P3 (Plane geometry) ===
Q['6_matematicas_P3'] = [
    {"c":"In Bogot\u00e1 geometry class they learn about angles.","e":"How many degrees in a right angle?","opts":[["A","45\u00b0","No."],["B","90\u00b0","Correcto."],["C","180\u00b0","Straight angle."],["D","360\u00b0","Full turn."]],"a":"B","fb":"A right angle = 90 degrees. Represented by a square corner symbol."},
    {"c":"In Medell\u00edn they identify triangles.","e":"A triangle with all sides equal is ___.","opts":[["A","Isosceles","Two equal."],["B","Scalene","No equal."],["C","Equilateral","Correcto."],["D","Right","Has 90\u00b0."]],"a":"C","fb":"Equilateral: all 3 sides equal, all 3 angles = 60\u00b0."},
    {"c":"In Cali they measure area.","e":"Area of a 6m x 4m rectangle?","opts":[["A","10 m\u00b2","No, perimeter."],["B","20 m\u00b2","No."],["C","24 m\u00b2","Correcto."],["D","12 m\u00b2","No."]],"a":"C","fb":"Area = length x width = 6x4 = 24 square meters."},
    {"c":"In Barranquilla they find perimeter.","e":"Perimeter of a 5m square?","opts":[["A","10 m","No."],["B","15 m","No."],["C","20 m","Correcto."],["D","25 m","No, area."]],"a":"C","fb":"Square perimeter = 4 x side = 4 x 5 = 20 m."},
    {"c":"In Bucaramanga they learn about circles.","e":"What is pi (\u03c0) approximately?","opts":[["A","2.14","No."],["B","3.14","Correcto."],["C","4.14","No."],["D","1.14","No."]],"a":"B","fb":"Pi \u2248 3.14159. It's the ratio of circumference to diameter."},
    {"c":"In Cartagena they calculate triangle area.","e":"Area of a triangle with base 8 cm and height 5 cm?","opts":[["A","40 cm\u00b2","No, that's rectangle."],["B","20 cm\u00b2","Correcto."],["C","13 cm\u00b2","No."],["D","80 cm\u00b2","No."]],"a":"B","fb":"Triangle area = (base x height)/2 = (8x5)/2 = 20 cm\u00b2."},
    {"c":"In Pereira they classify quadrilaterals.","e":"A quadrilateral with all sides equal and all angles 90\u00b0 is a ___.","opts":[["A","Rectangle","Sides may differ."],["B","Rhombus","Angles not 90."],["C","Square","Correcto."],["D","Trapezoid","No."]],"a":"C","fb":"Square: all sides equal, all angles 90 degrees."},
    {"c":"In Manizales they work with angle types.","e":"An angle larger than 90\u00b0 but less than 180\u00b0 is ___.","opts":[["A","Acute","<90\u00b0."],["B","Right","=90\u00b0."],["C","Obtuse","Correcto."],["D","Straight","=180\u00b0."]],"a":"C","fb":"Obtuse angle: between 90\u00b0 and 180\u00b0."},
    {"c":"In C\u00facuta they identify 3D shapes.","e":"How many faces does a cube have?","opts":[["A","4","No."],["B","6","Correcto."],["C","8","No, vertices."],["D","12","No, edges."]],"a":"B","fb":"A cube has 6 faces, 8 vertices, and 12 edges."},
    {"c":"In Ibagu\u00e9 they solve composite shapes.","e":"A rectangle 10m long and 3m wide has a 2mx2m square cut out. Remaining area?","opts":[["A","30 m\u00b2","No, original."],["B","26 m\u00b2","Correcto."],["C","34 m\u00b2","No."],["D","28 m\u00b2","No."]],"a":"B","fb":"Original: 10x3=30. Cutout: 2x2=4. Remaining: 30-4=26 m\u00b2."},
]
print("Added 6_matematicas_P3")

# === GRADE 6 - MATEMATICAS P4 (Basic statistics) ===
Q['6_matematicas_P4'] = [
    {"c":"In Bogot\u00e1 they collect class data.","e":"What is the MEAN (average) of 4, 8, 6, 10?","opts":[["A","6","No."],["B","7","Correcto."],["C","8","No."],["D","5","No."]],"a":"B","fb":"Mean = (4+8+6+10)/4 = 28/4 = 7."},
    {"c":"In Medell\u00edn they find the median.","e":"Median of 3, 7, 2, 9, 5?","opts":[["A","3","No."],["B","5","Correcto."],["C","7","No."],["D","2","No."]],"a":"B","fb":"Order: 2,3,5,7,9. Middle value (3rd) = 5."},
    {"c":"In Cali they calculate mode.","e":"Mode of 2,3,3,5,3,7,2?","opts":[["A","2","Appears twice."],["B","3","Correcto. Appears 3 times."],["C","5","Once."],["D","7","Once."]],"a":"B","fb":"Mode is the value that appears most frequently: 3 appears 3 times."},
    {"c":"In Barranquilla they interpret bar graphs.","e":"A bar graph shows 5 students like soccer, 3 like basketball, 2 like tennis. Most popular sport?","opts":[["A","Tennis","No."],["B","Basketball","No."],["C","Soccer","Correcto."],["D","All equal","No."]],"a":"C","fb":"Soccer has the highest bar (5), so it's the most popular."},
    {"c":"In Bucaramanga they find the range.","e":"Range of 12, 18, 8, 14, 20?","opts":[["A","8","No."],["B","12","Correcto."],["C","10","No."],["D","20","No."]],"a":"B","fb":"Range = max-min = 20-8 = 12."},
    {"c":"In Cartagena they create frequency tables.","e":"How many students if 3 chose blue, 5 red, 2 green?","opts":[["A","8","No."],["B","10","Correcto."],["C","12","No."],["D","15","No."]],"a":"B","fb":"Total = 3+5+2 = 10 students."},
    {"c":"In Pereira they analyze a pie chart.","e":"A pie chart shows 50% of students walk to school. If 200 students, how many walk?","opts":[["A","50","No."],["B","100","Correcto."],["C","150","No."],["D","200","No."]],"a":"B","fb":"50% of 200 = 100 students walk to school."},
    {"c":"In Manizales they work with probability.","e":"What is the probability of flipping heads on a coin?","opts":[["A","1/4","No."],["B","1/3","No."],["C","1/2","Correcto."],["D","1","No, certainty."]],"a":"C","fb":"A coin has 2 outcomes: heads or tails. P(heads) = 1/2 = 50%."},
    {"c":"In C\u00facuta they interpret line graphs.","e":"A line graph shows temperature rising from 8am to 12pm. This indicates ___.","opts":[["A","Temperature dropped","No."],["B","Temperature rose","Correcto."],["C","No change","No."],["D","Fluctuation","No trend."]],"a":"B","fb":"An upward slope in a line graph indicates increase."},
    {"c":"In Ibagu\u00e9 they design surveys.","e":"What is the first step in a statistical study?","opts":[["A","Collect data","No, define."],["B","Formulate a question","Correcto."],["C","Make a graph","Later."],["D","Calculate mean","Later."]],"a":"B","fb":"First: define the research question. Then collect, organize, analyze, interpret data."},
]
print("Added 6_matematicas_P4")

# === GRADE 6 - CIENCIAS NATURALES P1 (The cell) ===
Q['6_ciencias-naturales_P1'] = [
    {"c":"In science class in Bogot\u00e1 they study cells.","e":"What is the basic unit of life?","opts":[["A","The atom","No."],["B","The cell","Correcto."],["C","The organ","No."],["D","The tissue","No."]],"a":"B","fb":"The cell is the basic structural and functional unit of all living organisms."},
    {"c":"In Medell\u00edn they observe cells under a microscope.","e":"Which organelle is the 'powerhouse' of the cell?","opts":[["A","Nucleus","Control center."],["B","Ribosome","Protein synthesis."],["C","Mitochondria","Correcto."],["D","Cell membrane","Protection."]],"a":"C","fb":"Mitochondria produce energy (ATP) through cellular respiration."},
    {"c":"In Cali they compare cell types.","e":"Difference between plant and animal cells?","opts":[["A","Plant cells have chloroplasts","Correcto."],["B","Animal cells have cell wall","No, plants do."],["C","They are exactly the same","No."],["D","Plant cells have no nucleus","No."]],"a":"A","fb":"Plant cells have chloroplasts for photosynthesis and a cell wall."},
    {"c":"In Barranquilla they learn about the nucleus.","e":"What does the nucleus contain?","opts":[["A","Water","No."],["B","DNA/genetic material","Correcto."],["C","Ribosomes","No."],["D","Chlorophyll","No."]],"a":"B","fb":"The nucleus contains DNA, which carries genetic information."},
    {"c":"In Bucaramanga they study cell division.","e":"Mitosis produces how many daughter cells?","opts":[["A","1","No."],["B","2","Correcto."],["C","4","No, meiosis."],["D","8","No."]],"a":"B","fb":"Mitosis produces 2 identical daughter cells for growth and repair."},
    {"c":"In Cartagena they explore cell function.","e":"The cell membrane function is to ___.","opts":[["A","Produce energy","Mitochondria."],["B","Control what enters/exits","Correcto."],["C","Store water","Vacuole."],["D","Make proteins","Ribosome."]],"a":"B","fb":"Cell membrane is selectively permeable, controlling passage of substances."},
    {"c":"In Pereira they identify organelles.","e":"Vacuoles are primarily for ___.","opts":[["A","Energy production","No."],["B","Storage of water and nutrients","Correcto."],["C","Cell division","No."],["D","Protein synthesis","No."]],"a":"B","fb":"Vacuoles store water, nutrients, and waste. Larger in plant cells."},
    {"c":"In Manizales they compare unicellular vs multicellular.","e":"Which is unicellular?","opts":[["A","Human","Multicellular."],["B","Tree","Multicellular."],["C","Bacteria","Correcto."],["D","Dog","Multicellular."]],"a":"C","fb":"Bacteria are unicellular (single-celled) organisms."},
    {"c":"In C\u00facuta they study levels of organization.","e":"Correct order from smallest to largest?","opts":[["A","Cell, tissue, organ, system","Correcto."],["B","Tissue, cell, organ, system","No."],["C","Organ, system, tissue, cell","No."],["D","System, organ, tissue, cell","No."]],"a":"A","fb":"Levels: cell \u2192 tissue \u2192 organ \u2192 organ system \u2192 organism."},
    {"c":"In Ibagu\u00e9 they relate structure to function.","e":"Red blood cells are disc-shaped to ___.","opts":[["A","Store water","No."],["B","Carry more oxygen","Correcto."],["C","Produce energy","No."],["D","Divide faster","No."]],"a":"B","fb":"The disc shape of red blood cells increases surface area for oxygen transport."},
]
print("Added 6_ciencias-naturales_P1")

# === GRADE 6 - CIENCIAS NATURALES P2 (Ecosystems) ===
Q['6_ciencias-naturales_P2'] = [
    {"c":"In science in Bogot\u00e1 they study ecosystems.","e":"What is a BIOTIC factor in an ecosystem?","opts":[["A","Water","Abiotic."],["B","Sunlight","Abiotic."],["C","Trees","Correcto, living."],["D","Rocks","Abiotic."]],"a":"C","fb":"Biotic = living (plants, animals, bacteria). Abiotic = non-living (water, sun, soil)."},
    {"c":"In Medell\u00edn they study the food web.","e":"Which organism is a producer?","opts":[["A","Fox","Consumer."],["B","Grass","Correcto."],["C","Rabbit","Consumer."],["D","Hawk","Consumer."]],"a":"B","fb":"Producers (plants) make their own food via photosynthesis."},
    {"c":"In Cali they analyze energy flow.","e":"How much energy passes from one trophic level to the next?","opts":[["A","90%","No."],["B","50%","No."],["C","10%","Correcto."],["D","100%","No."]],"a":"C","fb":"Only about 10% of energy transfers between trophic levels (10% rule)."},
    {"c":"In Barranquilla they study the mangrove ecosystem.","e":"Why are mangroves important for coastal protection?","opts":[["A","They produce oil","No."],["B","Roots prevent erosion","Correcto."],["C","They attract tourists","Not main."],["D","They filter salt","No."]],"a":"B","fb":"Mangrove roots trap sediment and reduce coastal erosion from waves."},
    {"c":"In Bucaramanga they identify ecological relationships.","e":"A lion eating a zebra is an example of ___.","opts":[["A","Mutualism","Both benefit."],["B","Commensalism","One benefits."],["C","Predation","Correcto."],["D","Parasitism","Harm but not kill."]],"a":"C","fb":"Predation: one organism (predator) kills and eats another (prey)."},
    {"c":"In Cartagena they study nutrient cycles.","e":"What do decomposers do in an ecosystem?","opts":[["A","Produce oxygen","No."],["B","Break down dead organisms","Correcto."],["C","Hunt prey","No."],["D","Make food","No."]],"a":"B","fb":"Decomposers (bacteria/fungi) recycle nutrients by breaking down dead matter."},
    {"c":"In Pereira they study human impact.","e":"Deforestation affects the carbon cycle by ___.","opts":[["A","Increasing CO2 in atmosphere","Correcto."],["B","Reducing CO2","No."],["C","Creating more oxygen","No."],["D","Having no effect","No."]],"a":"A","fb":"Trees absorb CO2. Deforestation releases stored carbon and reduces CO2 absorption."},
    {"c":"In Manizales they analyze population dynamics.","e":"What happens when prey population increases?","opts":[["A","Predators decrease","No."],["B","Predators may increase","Correcto."],["C","Nothing changes","No."],["D","Prey becomes predator","No."]],"a":"B","fb":"More prey available = more food for predators, so predator population may grow."},
    {"c":"In C\u00facuta they study succession.","e":"Primary succession begins on ___.","opts":[["A","Existing soil","Secondary."],["B","Bare rock","Correcto."],["C","A forest clearing","No."],["D","Farmland","No."]],"a":"B","fb":"Primary succession starts on surfaces with no soil (bare rock, lava)."},
    {"c":"In Ibagu\u00e9 they study biomes.","e":"The Colombian p\u00e1ramo is a unique ___.","opts":[["A","Desert","No."],["B","High-altitude ecosystem","Correcto."],["C","Coral reef","No."],["D","Tropical rainforest","No."]],"a":"B","fb":"P\u00e1ramos are high-altitude ecosystems in the Andes, vital water sources."},
]
print("Added 6_ciencias-naturales_P2")

with open('_questions_data_full.json', 'w', encoding='utf-8') as f:
    json.dump(Q, f, ensure_ascii=False, indent=2)
print(f"Saved. Total keys: {len(Q)}")

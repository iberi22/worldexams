#!/usr/bin/env python3
"""
Generate MASTERY bundles for South Africa (ZA) - NSC Matric Prep (Grade 12)
Curriculum: CAPS (Curriculum and Assessment Policy Statement)
5 subjects x 10 weeks = 50 bundles, 20 questions each
"""
import os, hashlib

BASE = r"E:\scripts-python\worldexams\questions_data\southafrica"
YEAR = 2026
GRADO = 12
SZ = 20

# Each bank entry: [stem, A_text, B_text, C_text, D_text, correct_letter, explanation, bloom, difficulty, context]
BANKS = {
    "Mathematics": [
        ["Solve for x: 3(x - 2) + 7 = 2x + 1", "x = 0", "x = 2", "x = -2", "x = 4", "A",
         "3x - 6 + 7 = 2x + 1 -> 3x + 1 = 2x + 1 -> x = 0.", "Apply", 3,
         "A Grade 12 learner in Johannesburg is solving linear equations."],
        ["Factorise completely: 9x^2 - 16", "(3x - 4)(3x - 4)", "(3x + 4)(3x - 4)", "(9x + 4)(x - 4)", "(9x - 4)(x + 4)", "B",
         "9x^2 - 16 = (3x)^2 - (4)^2 = (3x + 4)(3x - 4) — difference of squares.", "Remember", 3,
         "A matric class is practising factorisation."],
        ["Solve for x: x^2 - 5x + 6 = 0", "x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = 6", "A",
         "(x - 2)(x - 3) = 0 -> x = 2 or x = 3.", "Apply", 4, "Solving quadratics in a Pretoria classroom."],
        ["Simplify: (x^2 x x^4) / x^3", "x^3", "x^9", "x^24", "x", "A",
         "x^2 x x^4 = x^6, x^6/x^3 = x^3.", "Apply", 4, "Learners review exponent laws."],
        ["The solution of 2x - 5 = 3x + 1 is:", "x = -6", "x = 6", "x = 4", "x = -4", "A",
         "2x - 5 = 3x + 1 -> -5 - 1 = 3x - 2x -> -6 = x -> x = -6.", "Apply", 4,
         "Solving linear equations in a Soweto classroom."],
        ["Solve the inequality: 4x - 3 >= 2x + 7", "x >= 5", "x <= 5", "x >= 2", "x >= -5", "A",
         "4x - 2x >= 7 + 3 -> 2x >= 10 -> x >= 5.", "Apply", 4, "Inequalities practice in Durban."],
        ["If f(x) = 2x^2 - 3x + 1, find f(-1).", "6", "0", "-4", "4", "A",
         "f(-1) = 2(1) - 3(-1) + 1 = 2 + 3 + 1 = 6.", "Apply", 3, "Function evaluation practice."],
        ["The discriminant of x^2 - 3x + 2 = 0 is:", "1", "9", "17", "-1", "A",
         "d = (-3)^2 - 4(1)(2) = 9 - 8 = 1.", "Analyze", 5,
         "Analyzing the nature of roots."],
        ["Solve for x: 3^(2x) = 81", "x = 2", "x = 3", "x = 4", "x = 1", "A",
         "3^(2x) = 3^4 -> 2x = 4 -> x = 2.", "Analyze", 5,
         "Solving exponential equations in Grade 12."],
        ["If 2x - 3y = 7 and x + y = 1, find y.", "y = -1", "y = 1", "y = 2", "y = -2", "A",
         "x = 1 - y; substitute: 2(1-y) - 3y = 7 -> 2 - 5y = 7 -> y = -1.", "Apply", 5,
         "Simultaneous equations in a Cape Town class."],
        ["For what k does x^2 - 2x + k = 0 have equal roots?", "k = 1", "k = -1", "k = 0", "k = 4", "A",
         "Equal roots -> d = 0: (-2)^2 - 4(1)k = 0 -> 4 - 4k = 0 -> k = 1.", "Analyze", 6,
         "Determining conditions for equal roots."],
        ["Simplify: (x^2 - 9)/(x - 3)", "x + 3", "x - 3", "x^2 + 9", "x^2 - 9", "A",
         "(x+3)(x-3)/(x-3) = x+3 (x != 3).", "Apply", 5,
         "Simplifying algebraic fractions."],
        ["The next term in 5; 9; 13; 17; ... is:", "21", "20", "22", "19", "A",
         "d = 4, so next = 17 + 4 = 21.", "Remember", 3,
         "Identifying number patterns."],
        ["The nth term of 3; 7; 11; 15; ... is:", "4n - 1", "4n + 3", "3n + 4", "4n - 3", "A",
         "a = 3, d = 4, T_n = 3 + (n-1)4 = 4n - 1.", "Apply", 4,
         "General term of an arithmetic sequence."],
        ["Sum of first 8 terms of 1 + 3 + 5 + 7 + ... is:", "64", "36", "100", "49", "A",
         "S_8 = 8/2[2(1)+7(2)] = 4(16) = 64.", "Apply", 5,
         "Sum of an arithmetic series."],
        ["T_1 = 3, r = 2. T_5 in this geometric sequence:", "48", "96", "24", "12", "A",
         "T_5 = 3 x 2^4 = 3 x 16 = 48.", "Apply", 4,
         "Finding terms of a geometric sequence."],
        ["Sum to infinity of 16 + 8 + 4 + 2 + ... :", "32", "30", "24", "16", "A",
         "a = 16, r = 1/2, S = 16/(1-0.5) = 32.", "Analyze", 5,
         "Sum to infinity of a geometric series."],
        ["Sigma_{k=1}^{3} (3k - 1) =", "15", "14", "12", "18", "A",
         "k=1:2, k=2:5, k=3:8; sum=15.", "Apply", 5,
         "Evaluating sigma notation in a Cape Town class."],
        ["T_n = n^2 + 1. T_4 =", "17", "9", "16", "5", "A",
         "T_4 = 4^2 + 1 = 16 + 1 = 17.", "Apply", 3,
         "Evaluating a quadratic general term."],
        ["Common ratio of 81; 27; 9; ... :", "1/3", "3", "9", "-3", "A",
         "r = 27/81 = 9/27 = 1/3.", "Remember", 3,
         "Identifying common ratio."],
        ["Domain of f(x) = sqrt(x - 2):", "x >= 2", "x > 2", "x <= 2", "x < 2", "A",
         "Radicand >= 0: x - 2 >= 0 -> x >= 2.", "Understand", 4,
         "Finding domain of a square root function."],
        ["Gradient through (1,2) and (4,8):", "2", "-2", "6", "3", "A",
         "m = (8-2)/(4-1) = 6/3 = 2.", "Apply", 3,
         "Calculating gradient between two points."],
        ["The equation of line with m=2 through (0,5):", "y = 2x + 5", "y = 5x + 2", "y = 2x - 5", "y = x + 5", "A",
         "y = mx + c: m=2, c=5 -> y = 2x + 5.", "Apply", 4,
         "Equation of a straight line."],
        ["Turning point of f(x) = -(x+1)^2 + 4:", "(-1, 4)", "(1, 4)", "(-1, -4)", "(1, -4)", "A",
         "Vertex form: f(x) = a(x-p)^2 + q, turning point is (-1, 4).", "Analyze", 5,
         "Finding turning point of a quadratic."],
        ["If f(x) = 3x - 2 and g(x) = x + 1, find f(g(2)).", "7", "10", "9", "5", "A",
         "g(2)=3, f(3)=3(3)-2=7.", "Apply", 5,
         "Composite functions in Grade 12."],
    ],
    "English Home Language": [
        ["Identify the figure of speech: 'The wind whispered through the trees.'",
         "Personification", "Simile", "Metaphor", "Alliteration", "A",
         "The wind is given the human quality of whispering.", "Remember", 3,
         "A learner in Pretoria analyses a poem extract."],
        ["Which is a complex sentence?", "Because she was tired, she went to bed.",
         "She was tired and went to bed.", "She went to bed.", "Tired, she slept.", "A",
         "One dependent clause + one independent clause = complex sentence.", "Understand", 4,
         "Analysing sentence structures."],
        ["The prefix 'un-' in 'unbelievable' means:", "Not", "Before", "Again", "Under", "A",
         "'un-' is a negative prefix meaning 'not'.", "Remember", 3,
         "Vocabulary study in an English HL class."],
        ["In 'He ran quickly', 'quickly' is:", "An adverb", "An adjective", "A verb", "A noun", "A",
         "Adverbs modify verbs; 'quickly' modifies 'ran'.", "Understand", 3,
         "Grammar revision for Paper 1."],
        ["Main purpose of a persuasive text:", "Convince the reader", "Inform the reader",
         "Entertain the reader", "Describe a scene", "A",
         "Persuasive texts aim to convince the audience.", "Understand", 3,
         "Analysing text types in English HL."],
        ["A soliloquy is:", "A speech by a character alone on stage",
         "A conversation between two characters", "A short comment to the audience",
         "A stage direction", "A", "A soliloquy reveals a character's inner thoughts.", "Remember", 4,
         "Studying dramatic texts in Soweto."],
        ["Punctuation to join two independent clauses without conjunction:",
         "Semicolon", "Comma", "Colon", "Full stop", "A",
         "A semicolon joins related independent clauses.", "Understand", 4,
         "Punctuation practice for the NSC exams."],
        ["Appropriate tone for a formal complaint letter:", "Respectful and firm",
         "Angry and aggressive", "Casual and friendly", "Humorous", "A",
         "Formal letters require a respectful yet firm tone.", "Understand", 3,
         "Transactional writing in a Durban classroom."],
        ["A group of lines forming a unit in poetry:", "Stanza", "Verse", "Couplet", "Paragraph", "A",
         "A stanza is a grouped set of lines in poetry.", "Remember", 3,
         "Poetry analysis in Grade 12."],
        ["Theme of a literary work refers to:", "The central idea or message",
         "The sequence of events", "The main character", "The setting", "A",
         "Theme is the underlying message explored in the text.", "Understand", 4,
         "Novel study: identifying themes."],
        ["Suffix '-tion' in 'education' indicates:", "A process or state",
         "A person who does something", "The opposite of", "A small version of", "A",
         "'-tion' forms nouns meaning a process.", "Remember", 3,
         "Morphology in language study."],
        ["An ad using a celebrity employs which technique?", "Appeal to authority",
         "Appeal to fear", "Bandwagon", "Loaded language", "A",
         "Celebrity endorsement is an appeal to authority.", "Analyze", 5,
         "Visual literacy and media analysis."],
        ["Protagonist's internal conflict is best described as:", "Person vs self",
         "Person vs person", "Person vs society", "Person vs nature", "A",
         "Internal conflict occurs within the character.", "Understand", 4,
         "Character analysis in a prescribed novel."],
        ["Correct: 'Neither the teacher nor the students was present.'",
         "were present", "is present", "have present", "are been present", "A",
         "Verb agrees with closest subject (students) -> 'were'.", "Apply", 5,
         "Subject-verb agreement practice."],
        ["Purpose of a rhetorical question:", "To make the reader think without expecting an answer",
         "To request information", "To show confusion", "To ask for clarification", "A",
         "Rhetorical questions engage the reader.", "Understand", 4,
         "Rhetorical devices in argumentative writing."],
        ["Synonym for 'courageous':", "Brave", "Cowardly", "Timid", "Fearful", "A",
         "'Courageous' and 'brave' share similar meanings.", "Remember", 3,
         "Vocabulary enrichment for English HL."],
        ["Direct to indirect: She said, 'I am happy.'",
         "She said that she was happy.", "She said that she is happy.",
         "She said that I am happy.", "She said she will be happy.", "A",
         "Present tense shifts to past in indirect speech.", "Apply", 5,
         "Grammar transformation exercises."],
        ["Salience in an image refers to:", "What stands out most to the viewer",
         "The colour scheme", "The font style", "The background texture", "A",
         "Salience is what grabs attention in a visual.", "Understand", 4,
         "Visual literacy in a Cape Town classroom."],
        ["A metaphor differs from a simile because it:", "Does not use 'like' or 'as'",
         "Compares unlike things", "Uses exaggeration", "Repeats consonant sounds", "A",
         "Metaphors compare directly without 'like' or 'as'.", "Understand", 4,
         "Analysing figurative language."],
        ["Climax of a dramatic plot:", "The moment of highest tension or turning point",
         "The introduction of characters", "The resolution of the conflict",
         "The falling action", "A", "The climax is the peak of dramatic tension.", "Understand", 4,
         "Drama study for NSC English."],
        ["What is a metaphor?", "A direct comparison without 'like' or 'as'",
         "A comparison using 'like' or 'as'", "An extreme exaggeration",
         "A repeated consonant sound", "A", "A metaphor states something is something else.", "Remember", 3,
         "Figurative language revision."],
        ["Correct the comma splice: 'I went home, I was tired.'",
         "I went home because I was tired.",
         "I went home I was tired.",
         "I went home; tired.",
         "I went home, tired I was.", "A",
         "A subordinating conjunction fixes a comma splice.", "Apply", 5,
         "Sentence structure and editing."],
        ["The mood created in a text refers to:", "The emotional atmosphere",
         "The author's attitude", "The main character's feelings",
         "The setting description", "A",
         "Mood is the feeling the reader experiences.", "Understand", 4,
         "Analysing mood in literature."],
        ["In 'The cat sat on the mat', the word 'the' is:", "An article", "A preposition",
         "A conjunction", "An adverb", "A",
         "'The' is a definite article.", "Remember", 3,
         "Parts of speech identification."],
        ["What is the effect of alliteration?", "Creates rhythm and emphasis",
         "Compares two unlike things", "Shows contrast",
         "Exaggerates for effect", "A",
         "Alliteration repeats initial sounds for musical effect.", "Understand", 4,
         "Poetic devices analysis."],
    ],
    "Physical Sciences": [
        ["A 4 kg mass accelerates at 3 m/s^2. Net force = ?", "12 N", "7 N", "1.33 N", "81 N", "A",
         "F = ma = 4 x 3 = 12 N.", "Apply", 3,
         "Newton's Second Law in a Cape Town classroom."],
        ["SI unit of electric current:", "Ampere", "Volt", "Ohm", "Coulomb", "A",
         "Current is measured in amperes (A).", "Remember", 3,
         "Physics definitions for the NSC exam."],
        ["In Zn + CuSO4 -> ZnSO4 + Cu, which is oxidised?", "Zn", "Cu", "CuSO4", "ZnSO4", "A",
         "Zn loses electrons (0 -> +2), so it is oxidised.", "Analyze", 5,
         "Redox reactions in a Durban lab."],
        ["pH of 0.001 M HCl:", "3", "11", "0.001", "7", "A",
         "pH = -log[10^{-3}] = 3.", "Apply", 4,
         "Acid-base chemistry calculations."],
        ["Chemical formula of sulphuric acid:", "H2SO4", "H2S", "HSO4", "H2SO3", "A",
         "Sulphuric acid is H2SO4.", "Remember", 3,
         "Chemical formulae in Grade 12."],
        ["Law of conservation of momentum states:", "Total momentum before = total momentum after",
         "Kinetic energy is always conserved", "Momentum is created during collisions",
         "Energy is destroyed in collisions", "A",
         "Momentum is conserved in isolated systems.", "Understand", 4,
         "Momentum and collisions in a Johannesburg class."],
        ["Three resistors 2, 3 and 5 Ohm in series. Total R:", "10 Ohm", "0.97 Ohm", "30 Ohm", "15 Ohm", "A",
         "R = 2 + 3 + 5 = 10 Ohm.", "Apply", 3,
         "Electric circuits in a Pretoria classroom."],
        ["Which visible colour has highest frequency?", "Violet", "Red", "Blue", "Green", "A",
         "Violet has shortest wavelength, highest frequency.", "Remember", 3,
         "Electromagnetic spectrum study."],
        ["Reaction rate when temperature increases:", "Increases", "Decreases",
         "Stays the same", "Becomes zero", "A",
         "Higher temperature = more kinetic energy = faster rate.", "Understand", 4,
         "Chemical change: rates of reaction."],
        ["In an exothermic reaction, heat is:", "Released", "Absorbed",
         "Neither released nor absorbed", "Created", "A",
         "Exothermic reactions release heat to surroundings.", "Remember", 3,
         "Energy changes in chemical reactions."],
        ["A 2 kg object in free fall accelerates at:", "9.8 m/s^2", "4.9 m/s^2",
         "19.6 m/s^2", "0 m/s^2", "A",
         "All objects free fall at g = 9.8 m/s^2.", "Understand", 4,
         "Gravitational acceleration in a Bloemfontein class."],
        ["Function of a capacitor:", "Store electric charge", "Resist current flow",
         "Amplify voltage", "Convert AC to DC", "A",
         "A capacitor stores electrical energy.", "Remember", 4,
         "Electrodynamics in Grade 12."],
        ["Pressure doubled at constant temp. Volume:", "Halves", "Doubles",
         "Quadruples", "Stays the same", "A",
         "Boyle's Law: P1V1 = P2V2.", "Apply", 4,
         "Gas laws in Physical Sciences."],
        ["Empirical formula: 40%C, 6.67%H, 53.33%O:", "CH2O", "C2H4O2",
         "C3H6O3", "CH4O", "A",
         "C=40/12=3.33, H=6.67/1=6.67, O=53.33/16=3.33. Ratio 1:2:1.", "Analyze", 6,
         "Stoichiometry and empirical formula."],
        ["A galvanic cell converts:", "Chemical to electrical energy",
         "Electrical to chemical energy", "Heat to light energy",
         "Kinetic to potential energy", "A",
         "Galvanic cells produce electricity from redox reactions.", "Understand", 4,
         "Electrochemistry in a Pretoria lab."],
        ["Increasing light intensity (above threshold) increases:", "Number of photoelectrons",
         "Kinetic energy of photoelectrons", "Threshold frequency", "Work function", "A",
         "More photons = more photoelectrons, same KE each.", "Analyze", 6,
         "Photoelectric effect in modern physics."],
        ["Induced EMF in a conductor moving through B field:", "E = Blv", "E = IR",
         "E = Q/V", "E = mc^2", "A",
         "Faraday's law: E = Blv.", "Apply", 5,
         "Electromagnetic induction in Grade 12."],
        ["Le Chatelier's principle: disturbed equilibrium:", "Shifts to counteract the disturbance",
         "Remains unchanged", "Speeds up indefinitely", "Reverses completely", "A",
         "The system shifts to reduce the effect of disturbance.", "Understand", 5,
         "Chemical equilibrium in a Soweto classroom."],
        ["Work done: 50 N force moves object 3 m:", "150 J", "53 J", "16.7 J", "47 J", "A",
         "W = F x d = 50 x 3 = 150 J.", "Apply", 3,
         "Work, energy and power calculations."],
        ["Period of a wave with frequency 50 Hz:", "0.02 s", "50 s", "0.5 s", "20 s", "A",
         "T = 1/f = 1/50 = 0.02 s.", "Apply", 4,
         "Waves and sound in Physical Sciences."],
        ["The unit of electric potential difference is:", "Volt", "Ampere", "Ohm", "Watt", "A",
         "Electric potential difference is measured in volts.", "Remember", 3,
         "Electrical definitions for the NSC."],
        ["In a chemical equilibrium, if products increase:", "Reverse reaction speeds up",
         "Forward reaction speeds up", "Equilibrium shifts right",
         "Nothing changes", "A",
         "More products cause the reverse reaction to increase.", "Analyze", 6,
         "Equilibrium and Le Chatelier's principle."],
        ["What is the oxidation number of S in H2SO4?", "+6", "+4", "+2", "0", "A",
         "H = +1 (x2=+2), O = -2 (x4=-8); 2 + S - 8 = 0 -> S = +6.", "Analyze", 6,
         "Determining oxidation numbers in compounds."],
        ["A transformer steps up voltage from 100V to 200V. If N_1 = 50 turns, N_2 = ?",
         "100 turns", "25 turns", "200 turns", "50 turns", "A",
         "V1/N1 = V2/N2 -> 100/50 = 200/N2 -> N2 = 100.", "Apply", 6,
         "Transformers in electrodynamics."],
    ],
    "Life Sciences": [
        ["Organelle responsible for cellular respiration:", "Mitochondrion", "Nucleus",
         "Ribosome", "Golgi apparatus", "A",
         "Mitochondria produce ATP via cellular respiration.", "Remember", 3,
         "Cell biology in a Cape Town classroom."],
        ["DNA replication occurs in which phase?", "S phase", "G1 phase",
         "G2 phase", "M phase", "A",
         "DNA synthesis happens in the S phase of interphase.", "Remember", 3,
         "The cell cycle in Grade 12 Life Sciences."],
        ["Crossing over occurs during:", "Prophase I of meiosis", "Prophase II of meiosis",
         "Anaphase I of meiosis", "Mitosis", "A",
         "Crossing over between homologous chromatids occurs in Prophase I.", "Remember", 4,
         "Meiosis in a Johannesburg classroom."],
        ["In Tt x Tt, probability of tt offspring:", "25%", "50%", "75%", "100%", "A",
         "Punnett: TT, Tt, Tt, tt -> 1/4 = 25%.", "Apply", 4,
         "Mendelian genetics in a Durban class."],
        ["Diploid chromosome number in humans:", "46", "23", "44", "48", "A",
         "Humans have 23 pairs (46) chromosomes.", "Remember", 3,
         "Genetics in a Soweto classroom."],
        ["Which gland produces insulin?", "Pancreas", "Thyroid", "Pituitary", "Adrenal", "A",
         "Islets of Langerhans in pancreas produce insulin.", "Remember", 3,
         "Endocrine system in a Pretoria class."],
        ["Gas exchange occurs in the:", "Alveoli", "Bronchi", "Trachea", "Bronchioles", "A",
         "Alveoli are the air sacs for gas exchange.", "Remember", 3,
         "Respiratory system in Grade 12."],
        ["Binomial name for humans:", "Homo sapiens", "Homo erectus",
         "Hominidae sapiens", "Homo habilis", "A",
         "Linnaean: genus Homo, species sapiens.", "Remember", 3,
         "Biodiversity and classification."],
        ["Light-dependent reactions produce:", "ATP and NADPH", "Glucose and oxygen",
         "Water and CO2", "ATP and glucose", "A",
         "Light-dependent reactions produce ATP and NADPH.", "Understand", 4,
         "Photosynthesis in a Cape Town class."],
        ["Blood group O has:", "No antigens on red blood cells",
         "A and B antigens", "Only A antigens", "Only B antigens", "A",
         "Type O has neither A nor B antigens.", "Remember", 4,
         "Genetics and blood groups."],
        ["Function of DNA helicase:", "Unwinds the DNA double helix",
         "Adds complementary nucleotides", "Seals Okazaki fragments",
         "Proofreads the new strand", "A",
         "Helicase breaks hydrogen bonds between base pairs.", "Understand", 4,
         "DNA replication in a Bloemfontein class."],
        ["Natural selection favours individuals with:", "Traits that increase survival and reproduction",
         "Largest body size", "Brightest colours", "Fastest speed", "A",
         "Traits that improve fitness are selected.", "Understand", 5,
         "Evolution by natural selection."],
        ["Nephron is the functional unit of the:", "Kidney", "Liver", "Lung", "Heart", "A",
         "Nephrons filter blood and produce urine.", "Remember", 3,
         "Excretory system in Grade 12."],
        ["Most ATP per glucose produced by:", "Aerobic respiration", "Anaerobic respiration",
         "Fermentation", "Glycolysis alone", "A",
         "Aerobic respiration yields ~36-38 ATP per glucose.", "Understand", 5,
         "Cellular respiration in a Durban class."],
        ["Hormone regulating blood calcium:", "Calcitonin", "Insulin",
         "Thyroxine", "Adrenaline", "A",
         "Calcitonin from thyroid lowers blood calcium.", "Remember", 4,
         "Endocrine homeostasis."],
        ["Meiosis results in:", "Four haploid daughter cells", "Two diploid daughter cells",
         "Four diploid daughter cells", "Two haploid daughter cells", "A",
         "Meiosis produces four genetically different haploid cells.", "Understand", 4,
         "Cell division in a Pretoria classroom."],
        ["Greatest biodiversity found in:", "Tropical rainforest", "Desert",
         "Tundra", "Grassland", "A",
         "Tropical rainforests have the highest species diversity.", "Remember", 3,
         "Biomes and biodiversity."],
        ["Function of the placenta:", "Exchange nutrients and waste between mother and foetus",
         "Produce eggs", "Store urine from foetus", "Pump blood for foetus", "A",
         "Placenta allows diffusion of substances between blood supplies.", "Understand", 4,
         "Human reproduction in a Soweto class."],
        ["A mutation in a gene changes:", "The DNA sequence", "The phenotype directly",
         "The chromosome number", "The cell membrane", "A",
         "A mutation alters the nucleotide sequence of DNA.", "Understand", 4,
         "DNA mutations and their effects."],
        ["The semi-conservative model of DNA replication means:", "Each new DNA has one old and one new strand",
         "Both strands are completely new", "The original DNA remains intact",
         "Replication is random", "A",
         "Each daughter molecule contains one original and one newly synthesised strand.", "Understand", 5,
         "DNA replication in a Cape Town classroom."],
        ["Eutrophication is caused by:", "Excess nutrients (nitrates/phosphates) in water",
         "Too much oxygen in water", "Global warming",
         "Acid rain", "A",
         "Fertilisers wash into water, causing algal blooms and oxygen depletion.", "Understand", 4,
         "Human impact on the environment."],
        ["The greenhouse effect is primarily caused by:", "Increased CO2 and methane levels",
         "The hole in the ozone layer", "Deforestation only",
         "Volcanic eruptions", "A",
         "Greenhouse gases (CO2, CH4) trap heat in the atmosphere.", "Understand", 4,
         "Climate change in a Durban class."],
        ["In a pedigree chart, a shaded circle represents:", "An affected female",
         "An unaffected female", "An affected male", "An unaffected male", "A",
         "Circles represent females; shaded means affected.", "Analyze", 6,
         "Genetic inheritance patterns."],
        ["During protein synthesis, transcription produces:", "mRNA from a DNA template",
         "Proteins from mRNA", "DNA from RNA",
         "tRNA from proteins", "A",
         "Transcription copies DNA into mRNA in the nucleus.", "Understand", 5,
         "Protein synthesis in a Johannesburg class."],
        ["The role of tRNA is to:", "Carry amino acids to the ribosome",
         "Carry the genetic code from DNA", "Form the ribosome structure",
         "Catalyse peptide bond formation", "A",
         "tRNA molecules bring specific amino acids during translation.", "Understand", 5,
         "Protein synthesis - translation."],
    ],
    "Geography": [
        ["Cape Town's climate type:", "Mediterranean", "Tropical", "Desert", "Continental", "A",
         "Cape Town has warm, dry summers and cool, wet winters (Mediterranean).", "Remember", 3,
         "Climate regions in a Cape Town classroom."],
        ["The warm current on SA's east coast:", "Agulhas Current", "Benguela Current",
         "Mozambique Current", "South Atlantic Current", "A",
         "The Agulhas Current warms the east coast.", "Remember", 3,
         "Ocean currents and climate in Grade 12."],
        ["Primary cause of urbanisation in developing countries:", "Rural-to-urban migration",
         "Natural population growth only", "Improved rural infrastructure",
         "Decreasing birth rates", "A",
         "Push factors from rural areas and pull factors to cities drive urbanisation.", "Understand", 4,
         "Settlement geography in a Soweto class."],
        ["GDP per capita measures:", "Average income per person", "Total population",
         "Total exports", "Government spending", "A",
         "GDP per capita is total GDP divided by population.", "Remember", 3,
         "Development geography."],
        ["Which is a renewable resource?", "Solar energy", "Coal", "Oil", "Natural gas", "A",
         "Solar energy is naturally replenished.", "Remember", 3,
         "Resource management and sustainability."],
        ["Main river forming border between SA and Zimbabwe:", "Limpopo River", "Orange River",
         "Vaal River", "Zambezi River", "A",
         "The Limpopo River forms the northern border.", "Remember", 3,
         "Regional geography of South Africa."],
        ["Contours close together indicate:", "Steep slope", "Gentle slope", "Flat land",
         "Depression", "A",
         "Close contour lines mean rapid elevation change = steep slope.", "Apply", 4,
         "Mapwork skills in a Durban classroom."],
        ["A mid-latitude cyclone in SA typically affects:", "The Western Cape in winter",
         "KwaZulu-Natal in summer", "Gauteng all year", "The Northern Cape", "A",
         "Mid-latitude cyclones bring winter rain to the SW Cape.", "Understand", 4,
         "Climate and weather in Grade 12."],
        ["Africa's highest mountain peak:", "Kilimanjaro", "Mount Kenya",
         "Table Mountain", "Mount Everest", "A",
         "Mount Kilimanjaro (5,895 m) is Africa's highest peak.", "Remember", 3,
         "Regional geography of Africa."],
        ["The tertiary sector includes:", "Services like banking and education",
         "Farming and mining", "Manufacturing", "Construction", "A",
         "The tertiary sector provides services.", "Understand", 3,
         "Economic geography of South Africa."],
        ["Population pyramid with wide base indicates:", "High birth rate",
         "High death rate", "Ageing population", "Low fertility", "A",
         "A wide base indicates high birth rate and young population.", "Analyze", 5,
         "Population geography."],
        ["A DEM (Digital Elevation Model) in GIS shows:", "Elevation data",
         "Population density", "Land use", "Road networks", "A",
         "A DEM represents elevation data in raster format.", "Understand", 4,
         "GIS skills in mapwork."],
        ["Gauteng contributes approximately what % of SA GDP?", "35%",
         "15%", "50%", "25%", "A",
         "Gauteng is the economic powerhouse of South Africa.", "Remember", 3,
         "Economic geography."],
        ["A tropical cyclone in the Southern Hemisphere rotates:", "Clockwise",
         "Anticlockwise", "Neither", "Both", "A",
         "Coriolis effect causes clockwise rotation in the SH.", "Understand", 4,
         "Climate and weather."],
        ["SA 1:50,000 topographic maps typically use what contour interval?",
         "20 m", "5 m", "50 m", "100 m", "A",
         "The standard contour interval is 20 m.", "Remember", 3,
         "Mapwork skills."],
        ["The primary factor influencing SA rainfall patterns:",
         "Latitude and ocean currents", "Altitude", "Longitude", "Wind belts only", "A",
         "Latitude and ocean currents (Agulhas warm, Benguela cold) determine rainfall.", "Analyze", 6,
         "Climate factors in Grade 12 Geography."],
        ["Deforestation in tropical Africa mainly leads to:",
         "Soil erosion and habitat loss", "Increased rainfall", "Improved air quality", "Higher crop yields", "A",
         "Deforestation causes soil degradation and loss of biodiversity.", "Understand", 4,
         "Resource management."],
        ["A bearing of 270 degrees is:", "West", "East", "North", "South", "A",
         "270 degrees = due west.", "Apply", 4,
         "Mapwork bearings."],
        ["The primary sector involves:", "Mining and agriculture",
         "Manufacturing", "Banking", "Transport", "A",
         "The primary sector extracts natural resources.", "Remember", 3,
         "Economic geography."],
        ["IDZs in South Africa aim to:", "Promote export-oriented manufacturing",
         "Increase agricultural output", "Build schools", "Reduce urbanisation", "A",
         "Industrial Development Zones attract investment and boost exports.", "Understand", 4,
         "Economic geography in a Pretoria classroom."],
        ["Food security means:", "Access to sufficient, safe and nutritious food",
         "Exporting food", "Having large farms", "Growing cash crops", "A",
         "Food security exists when all have access to adequate food.", "Understand", 4,
         "Resource management."],
        ["In GIS, buffering creates:", "A zone around a feature",
         "A line between features", "A new data layer", "A map title", "A",
         "Buffering creates a boundary at a specified distance.", "Apply", 5,
         "GIS skills."],
        ["SA's largest urban area:", "Gauteng (Johannesburg-Soweto)",
         "Cape Town", "Durban", "Pretoria", "A",
         "Gauteng is the most urbanised province.", "Remember", 3,
         "Settlement geography."],
        ["SADC promotes:", "Regional economic integration in Southern Africa",
         "Global trade", "Military alliances", "Cultural exchange only", "A",
         "SADC fosters economic cooperation in Southern Africa.", "Remember", 3,
         "Regional geography of Africa."],
        ["Primary cause of ozone depletion:", "CFCs (chlorofluorocarbons)",
         "CO2", "Methane", "Nitrous oxide", "A",
         "CFCs destroy ozone molecules in the stratosphere.", "Remember", 4,
         "Human impact on environment."],
    ]
}

def gen_questions(display, topic_slug, topic_title, seed):
    import random
    rng = random.Random(seed)
    bank = BANKS.get(display, BANKS["Mathematics"])
    items = list(bank)
    rng.shuffle(items)
    questions = []
    blooms = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"]
    diffs = [3]*2 + [4]*3 + [5]*3 + [6]*3 + [7]*3 + [8]*3 + [9]*2 + [10]*1
    for i in range(20):
        item = items[i % len(items)]
        stem, a, b, c, d, correct, expl, bloom, diff, ctx = item[:10]
        questions.append({
            "stem": stem,
            "A": a, "B": b, "C": c, "D": d,
            "correct": correct,
            "difficulty": diffs[i] if i < 20 else int(diff),
            "bloom": rng.choice(blooms),
            "context": ctx if ctx else f"A matric learner studies {topic_title} for NSC.",
            "expl": expl
        })
    return questions


def make_id(subj, week_str, topic):
    subj_code = subj[:3].upper()
    return f"ZA-{subj_code}-{GRADO}-{YEAR}-{week_str}-{topic}-001-MASTERY"


def generate_bundle(subj, week_idx, topic_slug, topic_title, questions):
    lines = []
    subj_config = [s for s in subjects if s["key"] == subj][0]
    display = subj_config["display"]
    exam = subj_config["exam"]
    alignment = subj_config["alignment"]
    week_str = f"W{week_idx:02d}"
    bid = make_id(subj, week_str, topic_slug)
    lines.append("---")
    lines.append(f'id: "{bid}"')
    lines.append('country: "southafrica"')
    lines.append(f'exam: "{exam}"')
    lines.append("grado: 12")
    lines.append(f'asignatura: "{display}"')
    lines.append(f'tema: "{topic_slug}"')
    # Map weeks to periods (1-2: P1, 3-5: P2, 6-8: P3, 9-10: P4)
    periodo_map = {1:1,2:1,3:2,4:2,5:2,6:3,7:3,8:3,9:4,10:4}
    periodo = periodo_map.get(week_idx, 1)
    lines.append(f"semana: {week_idx}")
    lines.append(f"periodo: {periodo}")
    lines.append("bundle_index: 1")
    lines.append('protocol_version: "5.2"')
    lines.append(f"year: {YEAR}")
    lines.append(f"bundle_size: {SZ}")
    lines.append(f'alignment: "{alignment}"')
    lines.append("---")
    lines.append("")
    lines.append(f"# MASTERY Bundle — {topic_title}")
    lines.append(f"**Difficulty: D3-D10 | {SZ} Questions | {display} — NSC Matric**")
    lines.append("")
    lines.append("---")
    lines.append("")
    for idx, q in enumerate(questions[:SZ], 1):
        lines.append(f"## Question {idx} — D{q['difficulty']}")
        lines.append(f"**ID:** `{bid}-v{idx}`")
        lines.append(f"**Bloom:** {q['bloom']}")
        if q.get("context"):
            lines.append("")
            lines.append(f"**Context:** {q['context']}")
        lines.append("")
        lines.append(f"**Stem:** {q['stem']}")
        lines.append("")
        for opt_key in ["A", "B", "C", "D"]:
            txt = q.get(opt_key, "")
            is_correct = opt_key == q["correct"]
            cb = "x" if is_correct else " "
            fb = "Correct! ✓" if is_correct else "Incorrect. Review the concept."
            if txt:
                lines.append(f"- [{cb}] **{opt_key})** {txt}")
                lines.append(f"  <!-- feedback: {fb} -->")
        lines.append("")
        expl = q.get("expl", "Understanding this concept is key for Matric success.")
        lines.append(f"**Explanation:** {expl}")
        lines.append("")
        lines.append("---")
        lines.append("")
    return "\n".join(lines), bid


subjects = [
    {"key": "mathematics", "display": "Mathematics",
     "exam": "NSC Matric — Mathematics (CAPS)",
     "alignment": "CAPS Grade 12 Mathematics (DBE 2026)",
     "weeks": [
        ("algebra-expressions-equations", "Algebra: Expressions, Equations & Inequalities"),
        ("number-patterns-sequences", "Number Patterns, Sequences & Series"),
        ("functions-graphs", "Functions & Graphs"),
        ("finance-growth-decay", "Finance, Growth & Decay"),
        ("trigonometry", "Trigonometry"),
        ("euclidean-geometry", "Euclidean Geometry"),
        ("analytical-geometry", "Analytical Geometry"),
        ("differential-calculus", "Differential Calculus"),
        ("probability-statistics", "Probability & Statistics"),
        ("revision-integration", "Matric Revision & Integration"),
    ]},
    {"key": "english-home-language", "display": "English Home Language",
     "exam": "NSC Matric — English Home Language (CAPS)",
     "alignment": "CAPS Grade 12 English Home Language (DBE 2026)",
     "weeks": [
        ("comprehension-skills", "Comprehension & Critical Reading"),
        ("poetry-analysis", "Poetry: Analysis & Interpretation"),
        ("novel-study", "Novel: Character, Theme & Plot"),
        ("drama-study", "Drama: Dialogue, Conflict & Stagecraft"),
        ("language-structure", "Language: Grammar & Structure"),
        ("language-usage", "Language: Vocabulary & Usage"),
        ("argumentative-writing", "Argumentative & Persuasive Writing"),
        ("creative-writing", "Creative & Transactional Writing"),
        ("visual-literacy", "Visual Literacy & Media Studies"),
        ("exam-preparation", "Exam Preparation & Integrated Language"),
    ]},
    {"key": "physical-sciences", "display": "Physical Sciences",
     "exam": "NSC Matric — Physical Sciences (CAPS)",
     "alignment": "CAPS Grade 12 Physical Sciences (DBE 2026)",
     "weeks": [
        ("newtons-laws", "Newton's Laws & Applications"),
        ("momentum-impulse", "Momentum & Impulse"),
        ("work-energy-power", "Work, Energy & Power"),
        ("gravitational-electric-fields", "Gravitational & Electric Fields"),
        ("electric-circuits", "Electric Circuits"),
        ("electrodynamics", "Electrodynamics"),
        ("chemical-change", "Chemical Change: Rates & Equilibrium"),
        ("acids-bases", "Acids & Bases"),
        ("electrochemistry", "Electrochemistry"),
        ("photons-relativity", "Photons, Electrons & Relativity"),
    ]},
    {"key": "life-sciences", "display": "Life Sciences",
     "exam": "NSC Matric — Life Sciences (CAPS)",
     "alignment": "CAPS Grade 12 Life Sciences (DBE 2026)",
     "weeks": [
        ("dna-code-of-life", "DNA: The Code of Life"),
        ("meiosis-genetics", "Meiosis & Genetics"),
        ("inheritance-variation", "Inheritance, Variation & Evolution"),
        ("human-reproduction", "Human Reproduction"),
        ("endocrine-system", "Endocrine System & Homeostasis"),
        ("nervous-system", "Nervous System & Senses"),
        ("human-impact", "Human Impact on the Environment"),
        ("evolution-evidence", "Evolution: Evidence & Theories"),
        ("photosynthesis-respiration", "Photosynthesis & Cellular Respiration"),
        ("animal-diversity", "Animal Diversity & Classification"),
    ]},
    {"key": "geography", "display": "Geography",
     "exam": "NSC Matric — Geography (CAPS)",
     "alignment": "CAPS Grade 12 Geography (DBE 2026)",
     "weeks": [
        ("climate-geomorphology", "Climate & Geomorphology"),
        ("drainage-landforms", "Drainage Systems & Landforms"),
        ("rural-urban-settlement", "Rural & Urban Settlement"),
        ("economic-geography", "Economic Geography of South Africa"),
        ("population-movement", "Population Structure & Movement"),
        ("development-geography", "Development Geography"),
        ("resource-management", "Resource Management & Sustainability"),
        ("mapwork-skills", "Mapwork Skills & GIS"),
        ("regional-geography", "Regional Geography: Africa"),
        ("exam-revision", "Exam Revision & Integrated Geography"),
    ]},
]


def main():
    total = 0
    for sc in subjects:
        subj = sc["key"]
        display = sc["display"]
        for week_idx, (topic_slug, topic_title) in enumerate(sc["weeks"], 1):
            week_str = f"W{week_idx:02d}"
            seed = int(hashlib.md5(f"{subj}-{week_str}-{topic_slug}".encode()).hexdigest(), 16)
            questions = gen_questions(display, topic_slug, topic_title, seed)
            md, bid = generate_bundle(subj, week_idx, topic_slug, topic_title, questions)
            d = os.path.join(BASE, subj, f"grado-{GRADO}", str(YEAR), "weekly")
            os.makedirs(d, exist_ok=True)
            with open(os.path.join(d, f"{bid}.md"), "w", encoding="utf-8") as f:
                f.write(md)
            total += 1
    print(f"OK {total} bundles generated!")


if __name__ == "__main__":
    main()
# Complete question data - auto-generated
import random
random.seed(2026)

BLOOMS = ["Remember","Remember","Understand","Understand","Understand",
          "Apply","Apply","Analyze","Analyze","Evaluate"]
ICFES = ["Indagación y Comprensión","Uso comprensivo del conocimiento científico",
         "Explicación de fenómenos","Indagación y Comprensión",
         "Uso comprensivo del conocimiento científico","Formulación y Ejecución",
         "Formulación y Ejecución","Razonamiento y Argumentación",
         "Explicación de fenómenos","Razonamiento y Argumentación"]
EXPECTED = [0.85,0.80,0.75,0.70,0.65,0.60,0.55,0.50,0.50,0.45]

ALL_QUESTIONS = {}

def add_q(grado, segmento, semana, qs):
    ALL_QUESTIONS[(grado, segmento, semana)] = qs

def _opts(a_t, a_f, b_t, b_f, c_t, c_f, d_t, d_f):
    return [("A",a_t,a_f),("B",b_t,b_f),("C",c_t,c_f),("D",d_t,d_f)]

# ====== DATA BEGINS ======

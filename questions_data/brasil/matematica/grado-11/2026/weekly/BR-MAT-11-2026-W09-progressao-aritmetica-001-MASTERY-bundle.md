---
id: BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle
country: brasil
grado: 11
asignatura: matematica
tema: progressao-aritmetica
periodo: weekly
week: W09
year: 2026
bundle_type: weekly
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "BNCC Brasil / ENEM 2026"
license: FREE
tier: legacy
creador: Jules-Agent
---

## Question 1 [D3]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Funções e Álgebra
**Expected_Success:** 0.85
**Contexto:** Um estudante em São Paulo revisa os conceitos fundamentais de sequências para sua prova de matemática.

### Enunciado
Qual é a fórmula do termo geral ($a_n$) de uma Progressão Aritmética (PA) em função do primeiro termo ($a_1$), da posição ($n$) e da razão ($r$)?

### Opciones
- [ ] A) $a_n = a_1 + nr$ <!-- feedback: Incorreto. O termo n deve ser subtraído de 1, pois o primeiro termo não recebe a razão. -->
- [x] B) $a_n = a_1 + (n - 1)r$ <!-- feedback: Correto. Esta fórmula permite encontrar qualquer termo da PA conhecendo o primeiro e a razão. -->
- [ ] C) $a_n = a_1 \cdot r^{n-1}$ <!-- feedback: Esta é a fórmula do termo geral de uma Progressão Geométrica. -->
- [ ] D) $a_n = \frac{a_1 + a_{n-1}}{2}$ <!-- feedback: Esta é uma propriedade do termo médio, não a fórmula do termo geral. -->

### Explicacion Pedagogica
Em uma PA, cada termo a partir do segundo é igual ao anterior somado a uma constante $r$. Para chegar ao termo de posição $n$, partimos de $a_1$ e somamos a razão $n-1$ vezes.

## Question 2 [D3]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Funções e Álgebra
**Expected_Success:** 0.80
**Contexto:** Um professor no Rio de Janeiro explica como classificar uma progressão baseando-se no sinal de sua razão.

### Enunciado
Uma Progressão Aritmética é considerada **decrescente** quando:

### Opciones
- [ ] A) A razão $r$ é igual a zero. <!-- feedback: Se r = 0, a progressão é constante ou estacionária. -->
- [ ] B) A razão $r$ é positiva ($r > 0$). <!-- feedback: Se r > 0, a progressão é crescente. -->
- [x] C) A razão $r$ é negativa ($r < 0$). <!-- feedback: Correto. Somar um número negativo faz com que os termos sucessivos sejam menores. -->
- [ ] D) O primeiro termo $a_1$ é negativo. <!-- feedback: O sinal de a1 não determina se a PA cresce ou decresce, apenas a razão r. -->

### Explicacion Pedagogica
O comportamento de crescimento da PA depende exclusivamente da razão. Se somamos valores negativos ($r < 0$), os termos da sequência diminuem de valor à medida que a posição $n$ aumenta.

## Question 3 [D4]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v3
**Bloom:** Understand
**EJE:** Funções e Álgebra
**Expected_Success:** 0.75
**Contexto:** Um arquiteto projeta uma escada em Curitiba onde a largura dos degraus diminui linearmente de baixo para cima.

### Enunciado
Dada a PA $(-5, -2, 1, 4, ...)$, qual é o valor da razão $r$?

### Opciones
- [ ] A) -3 <!-- feedback: A sequência está aumentando, logo a razão deve ser positiva. -->
- [x] B) 3 <!-- feedback: r = -2 - (-5) = -2 + 5 = 3. -->
- [ ] C) 2 <!-- feedback: Cálculo incorreto da diferença entre os termos. -->
- [ ] D) -7 <!-- feedback: Erro de operação aritmética. -->

### Explicacion Pedagogica
A razão é a diferença entre um termo e seu antecessor: $r = a_2 - a_1$. No caso, $r = -2 - (-5) = -2 + 5 = 3$.

## Question 4 [D4]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Funções e Álgebra
**Expected_Success:** 0.70
**Contexto:** Um economista em Brasília utiliza a fórmula da soma da PA para calcular o total de parcelas pagas em um financiamento com amortização constante.

### Enunciado
Qual é a fórmula para calcular a soma dos $n$ primeiros termos ($S_n$) de uma PA?

### Opciones
- [ ] A) $S_n = (a_1 + a_n) \cdot n$ <!-- feedback: Falta dividir por 2 na fórmula. -->
- [x] B) $S_n = \frac{(a_1 + a_n) \cdot n}{2}$ <!-- feedback: Correto. É a média aritmética dos extremos multiplicada pelo número de termos. -->
- [ ] C) $S_n = a_1 + (n-1)r$ <!-- feedback: Esta é a fórmula do termo geral, não da soma. -->
- [ ] D) $S_n = n \cdot r$ <!-- feedback: Incorreto. -->

### Explicacion Pedagogica
A soma dos termos de uma PA pode ser visualizada pareando os termos (primeiro com último, segundo com penúltimo, etc.), onde cada par tem a mesma soma. O resultado é a soma de um par ($a_1 + a_n$) multiplicado pela quantidade de pares ($n/2$).

## Question 5 [D5]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v5
**Bloom:** Understand
**EJE:** Funções e Álgebra
**Expected_Success:** 0.65
**Contexto:** Um técnico de laboratório registra o aumento de temperatura de uma estufa que sobe $2^\circ$C a cada 10 minutos.

### Enunciado
Se o primeiro termo de uma PA é $a_1 = 12$ e a razão é $r = 5$, qual é o valor do termo $a_{11}$?

### Opciones
- [ ] A) 67 <!-- feedback: a11 = 12 + 11*5 = 67. Erro: usou n em vez de n-1. -->
- [x] B) 62 <!-- feedback: a11 = 12 + (11-1)*5 = 12 + 50 = 62. -->
- [ ] C) 57 <!-- feedback: Este é o valor de a10. -->
- [ ] D) 72 <!-- feedback: Cálculo incorreto. -->

### Explicacion Pedagogica
Aplicamos o termo geral: $a_{11} = a_1 + 10r$. Substituindo: $a_{11} = 12 + 10 \cdot 5 = 12 + 50 = 62$.

## Question 6 [D5]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v6
**Bloom:** Understand
**EJE:** Funções e Álgebra
**Expected_Success:** 0.60
**Contexto:** Um atleta em Belo Horizonte planeja seu treinamento aumentando a distância percorrida em 400 metros a cada dia.

### Enunciado
Quantos termos existem na PA finita $(10, 14, 18, ..., 90)$?

### Opciones
- [ ] A) 20 <!-- feedback: Cálculo incorreto. -->
- [x] B) 21 <!-- feedback: 90 = 10 + (n-1)4 => 80 = 4(n-1) => 20 = n-1 => n = 21. -->
- [ ] C) 22 <!-- feedback: Erro ao finalizar a resolução da equação. -->
- [ ] D) 80 <!-- feedback: Este é o deslocamento total, não o número de termos. -->

### Explicacion Pedagogica
Usamos o termo geral para isolar $n$: $a_n = a_1 + (n-1)r \Rightarrow 90 = 10 + (n-1) \cdot 4$. Subtraindo 10 de ambos os lados: $80 = 4(n-1)$. Dividindo por 4: $20 = n - 1$. Logo, $n = 21$.

## Question 7 [D6]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Funções e Álgebra
**Expected_Success:** 0.60
**Contexto:** Uma empresa em Salvador organiza seu estoque em prateleiras onde a primeira tem 50 caixas e cada prateleira seguinte tem 3 caixas a menos.

### Enunciado
Qual é a posição do termo que vale 20 nesta PA?

### Opciones
- [ ] A) 10ª <!-- feedback: a10 = 50 + 9*(-3) = 50 - 27 = 23. Quase lá. -->
- [x] B) 11ª <!-- feedback: 20 = 50 + (n-1)(-3) => -30 = -3(n-1) => 10 = n-1 => n = 11. -->
- [ ] C) 12ª <!-- feedback: a12 = 50 - 33 = 17. -->
- [ ] D) 9ª <!-- feedback: a9 = 50 - 24 = 26. -->

### Explicacion Pedagogica
Montamos a equação com $a_1 = 50$, $r = -3$ e $a_n = 20$. Temos $20 = 50 + (n-1)(-3)$. Resolvendo: $-30 = -3(n-1) \Rightarrow 10 = n - 1 \Rightarrow n = 11$.

## Question 8 [D6]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Funções e Álgebra
**Expected_Success:** 0.55
**Contexto:** Um investidor aplica R\$ 100,00 por mês em uma conta que não rende juros, apenas acumula o capital.

### Enunciado
Qual é a soma dos 12 primeiros termos da PA $(100, 200, 300, ...)$?

### Opciones
- [ ] A) 1.200 <!-- feedback: Este seria o valor se não houvesse acúmulo (apenas o 12º termo). -->
- [x] B) 7.800 <!-- feedback: a12 = 1200. Soma = (100 + 1200) * 12 / 2 = 1300 * 6 = 7800. -->
- [ ] C) 6.600 <!-- feedback: Cálculo incorreto da soma. -->
- [ ] D) 15.600 <!-- feedback: Esqueceu de dividir por 2 na fórmula da soma. -->

### Explicacion Pedagogica
O 12º termo é $100 + (12-1)100 = 1200$. A soma é $S_{12} = \frac{(100 + 1200) \cdot 12}{2} = 1300 \cdot 6 = 7800$.

## Question 9 [D6]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Funções e Álgebra
**Expected_Success:** 0.55
**Contexto:** Um programador em Recife cria uma rotina de repetição onde o valor de uma variável segue uma PA.

### Enunciado
Numa PA, sabe-se que $a_3 = 10$ e $a_6 = 19$. Qual é o valor da razão $r$?

### Opciones
- [ ] A) 9 <!-- feedback: 9 é a diferença entre os termos, mas eles estão separados por 3 posições. -->
- [x] B) 3 <!-- feedback: a6 = a3 + 3r => 19 = 10 + 3r => 9 = 3r => r = 3. -->
- [ ] C) 4 <!-- feedback: Se r=4, a6 seria 10 + 12 = 22. -->
- [ ] D) 2 <!-- feedback: Se r=2, a6 seria 10 + 6 = 16. -->

### Explicacion Pedagogica
Usamos a relação entre dois termos quaisquer: $a_k = a_j + (k-j)r$. Logo, $a_6 = a_3 + (6-3)r \Rightarrow 19 = 10 + 3r$. Resolvendo para $r$, temos $3r = 9$, então $r = 3$.

## Question 10 [D6]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Funções e Álgebra
**Expected_Success:** 0.50
**Contexto:** Um agrimensor em Manaus mede a distância entre estacas colocadas em linha reta com intervalos constantes.

### Enunciado
Insira 3 meios aritméticos entre os números 5 e 21. Qual é a razão da PA formada?

### Opciones
- [ ] A) 5 <!-- feedback: Se r=5, a sequência seria 5, 10, 15, 20, 25. O último seria 25, não 21. -->
- [x] B) 4 <!-- feedback: Com 3 meios, temos 5 termos no total. 21 = 5 + 4r => 16 = 4r => r = 4. PA: (5, 9, 13, 17, 21). -->
- [ ] C) 3 <!-- feedback: Se r=3, o 5º termo seria 17. -->
- [ ] D) 2 <!-- feedback: Incorreto. -->

### Explicacion Pedagogica
Inserir 3 meios aritméticos entre 5 e 21 significa criar uma PA onde $a_1 = 5$ e $a_5 = 21$. Pela fórmula: $21 = 5 + (5-1) \cdot r \Rightarrow 16 = 4r \Rightarrow r = 4$.

## Question 11 [D7]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v11
**Bloom:** Apply
**EJE:** Funções e Álgebra
**Expected_Success:** 0.50
**Contexto:** Um engenheiro em São Paulo calcula o peso suportado por colunas dispostas em série com reforço progressivo.

### Enunciado
Em uma PA, a soma dos $n$ primeiros termos é dada por $S_n = n^2 + 2n$. Qual é o valor do primeiro termo $a_1$ e da razão $r$?

### Opciones
- [ ] A) $a_1 = 3, r = 3$ <!-- feedback: Incorreto. -->
- [x] B) $a_1 = 3, r = 2$ <!-- feedback: S1 = a1 = 1² + 2(1) = 3. S2 = a1 + a2 = 2² + 2(2) = 8. Logo a2 = 5 e r = 5-3 = 2. -->
- [ ] C) $a_1 = 1, r = 2$ <!-- feedback: S1 daria 3, não 1. -->
- [ ] D) $a_1 = 3, r = 1$ <!-- feedback: Se r=1, a2 seria 4 e S2 seria 7, mas S2 pela fórmula é 8. -->

### Explicacion Pedagogica
1) $a_1 = S_1 = 1^2 + 2(1) = 3$.
2) $a_1 + a_2 = S_2 = 2^2 + 2(2) = 4 + 4 = 8$.
3) $a_2 = 8 - a_1 = 8 - 3 = 5$.
4) $r = a_2 - a_1 = 5 - 3 = 2$.

## Question 12 [D7]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v12
**Bloom:** Apply
**EJE:** Funções e Álgebra
**Expected_Success:** 0.45
**Contexto:** Um analista financeiro avalia o total acumulado de um fundo onde o aporte mensal cresce linearmente para compensar a inflação.

### Enunciado
Determine a soma de todos os números naturais múltiplos de 7 entre 10 e 100.

### Opciones
- [ ] A) 700 <!-- feedback: Valor aproximado, mas não exato. -->
- [x] B) 728 <!-- feedback: PA: (14, 21, ..., 98). n=13. Soma = (14+98)*13/2 = 112*6,5 = 728. -->
- [ ] C) 735 <!-- feedback: Erro no cálculo da soma dos termos. -->
- [ ] D) 630 <!-- feedback: Valor muito baixo. -->

### Explicacion Pedagogica
1) Primeiro múltiplo: 14. Último múltiplo: 98.
2) Número de termos: $98 = 14 + (n-1)7 \Rightarrow 84 = 7(n-1) \Rightarrow 12 = n-1 \Rightarrow n = 13$.
3) Soma: $S_{13} = \frac{(14 + 98) \cdot 13}{2} = \frac{112 \cdot 13}{2} = 56 \cdot 13 = 728$.

## Question 13 [D7]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Funções e Álgebra
**Expected_Success:** 0.45
**Contexto:** Um professor desafia os alunos com uma propriedade curiosa dos termos da PA.

### Enunciado
Três números estão em PA. A soma deles é 15 e o produto é 80. Quais são esses números?

### Opciones
- [ ] A) 1, 5, 9 <!-- feedback: Soma = 15, mas produto = 45. -->
- [x] B) 2, 5, 8 <!-- feedback: Soma = 2+5+8 = 15. Produto = 2*5*8 = 80. Razão r=3. -->
- [ ] C) 3, 5, 7 <!-- feedback: Soma = 15, mas produto = 105. -->
- [ ] D) 4, 5, 6 <!-- feedback: Soma = 15, mas produto = 120. -->

### Explicacion Pedagogica
Representamos os termos como $(x-r, x, x+r)$. A soma é $(x-r) + x + (x+r) = 3x = 15 \Rightarrow x = 5$. O produto é $(5-r) \cdot 5 \cdot (5+r) = 80 \Rightarrow 25 - r^2 = 16 \Rightarrow r^2 = 9 \Rightarrow r = 3$. Os termos são $5-3=2, 5$ e $5+3=8$.

## Question 14 [D7]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Funções e Álgebra
**Expected_Success:** 0.40
**Contexto:** Um arquiteto em Porto Alegre utiliza PA para definir as alturas de colunas em um telhado inclinado.

### Enunciado
Em uma PA, $a_1 + a_9 = 20$. Qual é o valor de $a_5$?

### Opciones
- [ ] A) 5 <!-- feedback: Incorreto. -->
- [x] B) 10 <!-- feedback: Pela propriedade dos termos equidistantes, a1+a9 = a5+a5 = 2*a5. Logo a5 = 20/2 = 10. -->
- [ ] C) 20 <!-- feedback: Este é o valor da soma dos extremos. -->
- [ ] D) Não é possível determinar sem a razão. <!-- feedback: É possível sim, pois a5 é o termo médio exato entre a1 e a9. -->

### Explicacion Pedagogica
Em qualquer PA, a soma de dois termos equidistantes dos extremos é constante. Como $1+9 = 10$, e $5+5 = 10$, então $a_1 + a_9 = a_5 + a_5 = 2 \cdot a_5$. Assim, $a_5 = 20/2 = 10$.

## Question 15 [D8]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Funções e Álgebra
**Expected_Success:** 0.40
**Contexto:** Um estatístico em São Paulo utiliza a interpolação para prever valores faltantes em uma série histórica linear.

### Enunciado
Ao intercalar 6 meios aritméticos entre 10 e 45, qual é o valor do quarto termo da progressão total?

### Opciones
- [ ] A) 20 <!-- feedback: Este é o terceiro termo. -->
- [x] B) 25 <!-- feedback: Total de termos n=8. 45 = 10 + 7r => 35 = 7r => r = 5. PA: (10, 15, 20, 25, 30, 35, 40, 45). a4 = 25. -->
- [ ] C) 30 <!-- feedback: Este é o quinto termo. -->
- [ ] D) 15 <!-- feedback: Este é o segundo termo. -->

### Explicacion Pedagogica
1) Total de termos: 2 (extremos) + 6 (meios) = 8.
2) Razão: $a_8 = a_1 + 7r \Rightarrow 45 = 10 + 7r \Rightarrow 35 = 7r \Rightarrow r = 5$.
3) Quarto termo: $a_4 = a_1 + 3r = 10 + 3 \cdot 5 = 25$.

## Question 16 [D8]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Funções e Álgebra
**Expected_Success:** 0.35
**Contexto:** Um matemático estuda a relação entre funções afins e progressões aritméticas.

### Enunciado
Toda PA pode ser vista como uma função discreta. Se $a_n = 4n - 1$, qual é a soma dos 20 primeiros termos?

### Opciones
- [ ] A) 780 <!-- feedback: Cálculo incorreto da soma. -->
- [x] B) 820 <!-- feedback: a1 = 3. a20 = 79. S20 = (3 + 79) * 20 / 2 = 82 * 10 = 820. -->
- [ ] C) 800 <!-- feedback: Cálculo incorreto. -->
- [ ] D) 1.640 <!-- feedback: Esqueceu de dividir por 2. -->

### Explicacion Pedagogica
1) Calculamos os extremos: $a_1 = 4(1)-1 = 3$; $a_{20} = 4(20)-1 = 79$.
2) Aplicamos a soma: $S_{20} = \frac{(3 + 79) \cdot 20}{2} = 82 \cdot 10 = 820$.

## Question 17 [D9]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Funções e Álgebra
**Expected_Success:** 0.30
**Contexto:** Um pesquisador em Campinas analisa uma sequência onde os termos são funções de uma variável $x$.

### Enunciado
Para quais valores de $x$ a sequência $(\log x, \log 2x, \log 4x)$ forma uma PA?

### Opciones
- [ ] A) Somente para $x = 1$. <!-- feedback: Na verdade, qualquer x positivo satisfaz a condição. -->
- [x] B) Para todo $x > 0$. <!-- feedback: Razão r = log(2x) - log(x) = log(2x/x) = log 2. Como a razão é constante independente de x, é sempre PA. -->
- [ ] C) Para nenhum valor de $x$. <!-- feedback: A sequência sempre possui uma diferença constante. -->
- [ ] D) Somente para $x = 2$. <!-- feedback: Incorreto. -->

### Explicacion Pedagogica
Verificamos a diferença entre os termos:
$r_1 = \log(2x) - \log(x) = \log(2x/x) = \log 2$.
$r_2 = \log(4x) - \log(2x) = \log(4x/2x) = \log 2$.
Como $r_1 = r_2 = \log 2$ (constante), a sequência é uma PA para qualquer $x$ no domínio da função logaritmo ($x > 0$).

## Question 18 [D9]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Funções e Álgebra
**Expected_Success:** 0.25
**Contexto:** Durante uma olimpíada, propõe-se um desafio envolvendo a soma de termos de índices pares e ímpares.

### Enunciado
Numa PA de 100 termos, a soma dos termos de ordem ímpar é 500. Se a razão é $r = 2$, qual é a soma dos termos de ordem par?

### Opciones
- [ ] A) 500 <!-- feedback: Os termos pares são sempre maiores que os ímpares anteriores se r > 0. -->
- [x] B) 600 <!-- feedback: Cada termo par a_2k é igual ao ímpar anterior a_{2k-1} + r. Como são 50 pares, Spar = Simpar + 50*r = 500 + 50*2 = 600. -->
- [ ] C) 700 <!-- feedback: Cálculo incorreto do acréscimo. -->
- [ ] D) 550 <!-- feedback: Cálculo incorreto. -->

### Explicacion Pedagogica
Existem 50 termos ímpares ($a_1, a_3, ..., a_{99}$) e 50 termos pares ($a_2, a_4, ..., a_{100}$). Cada termo par pode ser escrito como $a_{2k} = a_{2k-1} + r$. Somando todos os 50 pares: $\sum a_{par} = \sum (a_{impar} + r) = \sum a_{impar} + 50r$. Logo, $S_{par} = 500 + 50 \cdot 2 = 600$.

## Question 19 [D10]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Funções e Álgebra
**Expected_Success:** 0.20
**Contexto:** No vestibular do ITA, avalia-se a capacidade de relacionar PA com geometria plana.

### Enunciado
As medidas dos lados de um triângulo retângulo estão em PA. Se a área do triângulo é 24, qual é o valor da hipotenusa?

### Opciones
- [ ] A) 6 <!-- feedback: Este seria o cateto menor. -->
- [ ] B) 8 <!-- feedback: Este seria o cateto maior. -->
- [x] C) 10 <!-- feedback: Lados: (x-r, x, x+r). Pelo teorema de Pitágoras: (x-r)² + x² = (x+r)² => x = 4r. Lados: 3r, 4r, 5r. Área = (3r*4r)/2 = 6r² = 24 => r=2. Hipotenusa = 5r = 10. -->
- [ ] D) 12 <!-- feedback: Incorreto. -->

### Explicacion Pedagogica
Lados em PA: $x-r, x, x+r$. No triângulo retângulo, $(x-r)^2 + x^2 = (x+r)^2 \Rightarrow x^2 - 2xr + r^2 + x^2 = x^2 + 2xr + r^2 \Rightarrow x^2 = 4xr \Rightarrow x = 4r$ (pois $x \neq 0$). Os lados são $3r, 4r$ e $5r$. Área = $\frac{3r \cdot 4r}{2} = 6r^2$. Como Área = 24, $r^2 = 4 \Rightarrow r = 2$. Hipotenusa = $5 \cdot 2 = 10$.

## Question 20 [D10]
**ID:** BR-MAT-11-2026-W09-progressao-aritmetica-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Funções e Álgebra
**Expected_Success:** 0.20
**Contexto:** Um matemático estuda o comportamento da soma dos inversos dos termos de uma PA, aproximando-se do conceito de série harmônica.

### Enunciado
Considere uma PA onde a soma dos $n$ primeiros termos é $S_n = 3n^2 + n$. Determine o termo $a_{10}$.

### Opciones
- [ ] A) 310 <!-- feedback: Este é o valor de S10, não do termo a10. -->
- [x] B) 58 <!-- feedback: a10 = S10 - S9 = (3*100+10) - (3*81+9) = 310 - 252 = 58. -->
- [ ] C) 60 <!-- feedback: Cálculo incorreto da diferença entre as somas. -->
- [ ] D) 61 <!-- feedback: Cálculo incorreto. -->

### Explicacion Pedagogica
O termo de posição $n$ pode ser encontrado pela diferença entre a soma dos $n$ primeiros e a soma dos $n-1$ primeiros: $a_n = S_n - S_{n-1}$.
Para $n=10$: $a_{10} = S_{10} - S_9$.
$S_{10} = 3(10)^2 + 10 = 310$.
$S_9 = 3(9)^2 + 9 = 243 + 9 = 252$.
$a_{10} = 310 - 252 = 58$.

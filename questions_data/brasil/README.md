# Brasil — Regras de Geração de Bundles

## Exame Oficial
- **Exame:** ENEM (Exame Nacional do Ensino Médio)
- **Agência:** INEP (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira) — MEC
- **Séries alvo:** 3º ano do Ensino Médio (EM)
- **Formato:** 180 questões + redação, 2 dias
- **Referência:** https://www.gov.br/inep

## Currículo (BNCC — Base Nacional Comum Curricular)

### 3º Ano EM — Matemática
- Conjuntos numéricos, funções, progressões
- Geometria plana e espacial
- Estatística, probabilidade, análise combinatória
- Matrizes, sistemas lineares
- Matemática financeira

### 3º Ano EM — Ciências da Natureza
- Biologia: genética, evolução, ecologia
- Química: estequiometria, reações, soluções
- Física: mecânica, termologia, eletricidade

### 3º Ano EM — Linguagens
- Interpretação textual, literatura brasileira
- Gramática normativa, redação (ENEM)
- Língua estrangeira (Inglês/Espanhol)

### 7º Ano EF — Matemática
- Números inteiros e racionais
- Álgebra básica, equações
- Geometria: áreas e perímetros

### 7º Ano EF — Português
- Interpretação de textos narrativos
- Gramática: classes gramaticais, verbos
- Produção textual

## Regras Culturais
- **Moeda:** Real (R$)
- **Cidades:** São Paulo, Rio de Janeiro, Brasília, Salvador, Belo Horizonte, Recife, Manaus
- **Nomes:** João, Maria, Pedro, Ana, Carlos, Juliana, Lucas, Fernanda
- **Instituições:** USP, UNICAMP, UFRJ, Fiocruz, INPE, SUS
- **Contextos:** Carnaval, Copa do Mundo, Amazônia, Caatinga, Pantanal, futebol, samba, feijoada

## Subject Keys
| Subject | Key | Pasta |
|---------|-----|-------|
| Matemática | matematica | `matematica/` |
| Português | portugues | `portugues/` |
| Ciências da Natureza | ciencias-naturais | `ciencias-naturais/` |
| Língua Estrangeira | lingua | `lingua/` |

## Diretório Canônico (3º EM)
```
questions_data/brasil/matematica/3o-ano/2026/weekly/
  BR-MAT-3EM-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

## Diretório Canônico (outras séries)
```
questions_data/brasil/{subject}/grado-{N}/2026/weekly/
  BR-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

## Formato Obrigatório
- Seguir `PROTOCOL_v7.md` — strictamente
- `country: "brasil"`
- `tier: "mastery"`
- Conteúdo em português brasileiro
- Feedback e opções em português (nunca inglês)

## Distribuição Semanal Sugerida (Matemática 3EM)
- W01-W05: Conjuntos, funções, progressões
- W06-W10: Geometria (plana, espacial, analítica)
- W11-W20: Estatística, probabilidade, análise combinatória
- W21-W30: Matrizes, sistemas, matemática financeira
- W31-W40: Revisão integrada + simulados ENEM

## Validação
```bash
node scripts/validate-bundles-v7.mjs questions_data/brasil/**/*.md
```

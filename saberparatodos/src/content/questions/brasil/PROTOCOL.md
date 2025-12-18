# 🇧🇷 Protocolo de Geração: Brasil (ENEM)

> **Versão:** 1.0
> **Exame Alvo:** ENEM (Exame Nacional do Ensino Médio)
> **Moeda:** BRL (R$)

## 📌 Especificações Técnicas

| Característica | Regra |
|----------------|-------|
| **Opções** | **5 Opções** (A, B, C, D, E) |
| **Opções Corretas** | Apenas uma correta. 4 Distratores. |
| **Prefixo ID** | `BR-` |
| **Idioma** | **Português do Brasil** |

## 📚 Mapeamento de Disciplinas

| Pasta (`src/content/questions/brasil/`) | Nome Real | Código ID |
|-----------------------------------------|-----------|-----------|
| `matematica` | Matemática e suas Tecnologias | `MAT` |
| `ciencias-natureza` | Ciências da Natureza | `CNAT` |
| `ciencias-humanas` | Ciências Humanas | `HUM` |
| `linguagens` | Linguagens, Códigos e suas Tecnologias | `LIN` |

## 🌍 Contextualização Cultural (Obrigatório)

**Lugares:** São Paulo, Rio de Janeiro, Brasília, Salvador, Amazônia.
**Instituições:** USP, Unicamp, MEC, INEP.
**Moeda:** Real Brasileiro (BRL). Usar símbolo `R$`.
**Nomes Comuns:** João, Maria, Pedro, Ana, Silva, Santos.

**Exemplo:**
> "Um estudante de São Paulo precisa pegar o metrô para a Avenida Paulista..."

---

## 📋 Template de Arquivo

```yaml
---
id: "BR-MAT-11-algebra-001"
country: "br"
exam_board: "ENEM"
options_count: 5
language: "pt-BR"
...
```

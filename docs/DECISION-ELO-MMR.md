# Decision: Elo-vs-MMR

## Contexto
El sistema requiere una separación clara entre el Elo utilizado para el matchmaking del juego (runtime T3/T4) y el MMR estimado del ICFES.

## Fórmula de migración
`elo = mmr * 4 + 200`

## Tabla base por banda de dificultad
| Banda de Dificultad | Base Elo |
| ------------------- | -------- |
| D3-D4               | 800      |
| D5-D6               | 1200     |
| D7-D8               | 1600     |
| D9-D10              | 2000     |

## Tabla de offset por grado
| Grado  | Offset Elo |
| ------ | ---------- |
| G3-5   | +0         |
| G6-7   | +100       |
| G8-9   | +200       |
| G10    | +300       |
| G11    | +400       |

*(Tope máximo de 2200)*

## Tabla de Elo inicial por grado
| Grado  | Elo Inicial |
| ------ | ----------- |
| G3-5   | 500         |
| G6-8   | 1000        |
| G9     | 1300        |
| G10    | 1600        |
| G11    | 1800        |

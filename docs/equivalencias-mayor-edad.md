# CLASES DE EQUIVALENCIA -esMayorDeEdad


### Clases
| ID | Clase | Dominio de entrada | ¿Válida? | Resultado esperado |
|---|---|---|---|---|
| C1 | Entero seguro negativo | `edad < 0` y `Number.isSafeInteger(edad)` | No | Lanza `Error('Edad no valida')` |
| C2 | Entero seguro [0,17] | `0 ≤ edad ≤ 17` y entero seguro | Sí | `false` |
| C3 | Entero seguro ≥ 18 | `edad ≥ 18` y entero seguro | Sí | `true` |
| C4 | No entero | p. ej. `18.5` | No | Lanza `Error('Edad no valida')` |
| C5 | NaN | `Number.isNaN(edad)` | No | Lanza `Error('Edad no valida')` |
| C6 | Infinito | `±Infinity` | No | Lanza `Error('Edad no valida')` |
| C7 | Tipo no numérico | `'18'`, `true`, `{}`, `[]`, `null`, `undefined`, `BigInt(18)` | No | Lanza `Error('Edad no valida')` |
| C8 | Entero no “safe” | `|edad| > Number.MAX_SAFE_INTEGER` | No | Lanza `Error('Edad no valida')` |

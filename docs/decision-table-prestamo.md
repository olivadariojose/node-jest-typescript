# TABLA DE DECISIONES -prestamo


### Condiciones
- C1: Ocupación = `estudiante`
- C2: Ocupación = `empleado`
- C3: Ocupación = `retirado`
- C4: `tieneDeudas` = `true`/`false`
- Otras ocupaciones → error.

### Reglas
|  | R1 | R2 | R3 | R4 | R5 |
|---|---|---|---|---|---|
| C1: estudiante | Sí | No | No | No | No |
| C2: empleado | No | Sí | No | No | No |
| C3: retirado | No | No | Sí | Sí | No |
| C4: tieneDeudas | – | – | `false` | `true` | – |
| **Acción** | **No aprueba (`false`)** | **Aprueba (`true`)** | **Aprueba (`true`)** | **No aprueba (`false`)** | **Error `ocupacion invalida`** |

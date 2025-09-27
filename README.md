<!-- # Descuentos: tabla de decisiones, clases de equivalencia y valores límite

## Reglas
1. Si `devoluciones30d > 3` ⇒ no aplica ningún descuento.
2. Si `m > 200` ⇒ aplica `dp` sobre el precio actual.
3. Si `esMiembro` ⇒ aplica `dm` sobre el precio resultante.
4. Validaciones: `m ≥ 0`, `0 ≤ dp ≤ 1`, `0 ≤ dm ≤ 1`, `devoluciones30d ≥ 0`.

---

## Tabla de decisiones

| Caso | devoluciones30d > 3 | m > 200 | esMiembro | Descuento dp | Descuento dm | Precio final |
|-----:|:--------------------:|:-------:|:---------:|:------------:|:------------:|:-------------|
| 1    | Sí                   | *—*     | *—*       | No           | No           | `m` |
| 2    | No                   | No      | No        | No           | No           | `m` |
| 3    | No                   | No      | Sí        | No           | Sí           | `m * (1 - dm)` |
| 4    | No                   | Sí      | No        | Sí           | No           | `m * (1 - dp)` |
| 5    | No                   | Sí      | Sí        | Sí           | Sí           | `m * (1 - dp) * (1 - dm)` |


---

## Clases de equivalencia

| Parámetro          | Clases válidas                                             | Clases inválidas                             |
|-------------------|-------------------------------------------------------------|----------------------------------------------|
| `m`               | `m ∈ [0, 200]`  ·  `m ∈ (200, +∞)`                         | `m < 0`                                      |
| `dp`              | `dp ∈ [0, 1]`                                               | `dp < 0`  ·  `dp > 1`                        |
| `dm`              | `dm ∈ [0, 1]`                                               | `dm < 0`  ·  `dm > 1`                        |
| `esMiembro`       | `true`  ·  `false`                                         | —                                            |
| `devoluciones30d` | `0 ≤ devoluciones30d ≤ 3`  ·  `devoluciones30d > 3` (dom.) | `devoluciones30d < 0`                        |

---

## Análisis de valores límite

| Parámetro          | Umbral                 | Valores sugeridos (BV)                            | Esperado |
|-------------------|------------------------|---------------------------------------------------|----------|
| `m`               | `200`                  | `200`, `199.99` (o `199`), `201`                  | `m=200` no dp · `m>200` sí dp                 |
| `dp`              | `[0, 1]`               | `0`, `1`, `-0.01`, `1.01`                         | `-0.01/1.01` error · `0/1` válido             |
| `dm`              | `[0, 1]`               | `0`, `1`, `-0.01`, `1.01`                         | `-0.01/1.01` error · `0/1` válido             |
| `devoluciones30d` | `3`                    | `3`, `4`, `-1`, `0`                               | `>3` sin descuento · `<0` error               |

---

## Conjunto mínimo de casos (cubre reglas y bordes)

| ID | `m`  | `dp`  | `dm`  | `esMiembro` | `devoluciones30d` | Resultado esperado |
|---:|-----:|------:|------:|:-----------:|-------------------:|--------------------|
| A  | 500  | 0.10  | 0.05  | true        | 4                  | `final = 500` (sin descuentos) |
| B  | 200  | 0.10  | 0.05  | false       | 0                  | `final = 200` |
| C  | 201  | 0.10  | 0.00  | false       | 0                  | `201 * (1 - 0.10)` |
| D  | 150  | 0.00  | 0.05  | true        | 0                  | `150 * (1 - 0.05)` |
| E  | 300  | 0.10  | 0.05  | true        | 0                  | `300 * (1 - 0.10) * (1 - 0.05)` |
| F  | 100  | -0.01 | 0.05  | false       | 0                  | Error por `dp < 0` |
| G  | 100  | 0.10  | 1.01  | false       | 0                  | Error por `dm > 1` |
| H  | 250  | 0.10  | 0.05  | true        | 3                  | `250 * (1 - 0.10) * (1 - 0.05)` |
 -->




# Descuentos: tabla de decisiones, clases de equivalencia y valores límite

## Definiciones
- **m**: monto total de la compra en moneda local.
- **dp**: tasa de descuento por compras altas en rango `[0, 1]` (ej. `0.10` = 10%).
- **dm**: tasa de descuento por membresía en rango `[0, 1]`.
- **esMiembro**: indica si el cliente pertenece al programa de membresía (`true`/`false`).
- **devoluciones30d**: cantidad de artículos devueltos por el cliente en los últimos 30 días.

## Reglas
1. Si `devoluciones30d > 3` ⇒ no aplica ningún descuento.
2. Si `m > 200` ⇒ aplica `dp` sobre el precio actual.
3. Si `esMiembro` ⇒ aplica `dm` sobre el precio resultante.
4. Validaciones: `m ≥ 0`, `0 ≤ dp ≤ 1`, `0 ≤ dm ≤ 1`, `devoluciones30d ≥ 0`.

---

## Tabla de decisiones

| Caso | devoluciones30d > 3 | m > 200 | esMiembro | Descuento dp | Descuento dm | Precio final |
|-----:|:--------------------:|:-------:|:---------:|:------------:|:------------:|:-------------|
| 1    | Sí                   | *—*     | *—*       | No           | No           | `m` |
| 2    | No                   | No      | No        | No           | No           | `m` |
| 3    | No                   | No      | Sí        | No           | Sí           | `m * (1 - dm)` |
| 4    | No                   | Sí      | No        | Sí           | No           | `m * (1 - dp)` |
| 5    | No                   | Sí      | Sí        | Sí           | Sí           | `m * (1 - dp) * (1 - dm)` |

> Nota: Los casos con `devoluciones30d > 3` dominan. Cualquier combinación con esta condición da `final = m`.

---

## Clases de equivalencia

| Parámetro          | Clases válidas                                             | Clases inválidas                             |
|-------------------|-------------------------------------------------------------|----------------------------------------------|
| `m`               | `m ∈ [0, 200]`  ·  `m ∈ (200, +∞)`                         | `m < 0`                                      |
| `dp`              | `dp ∈ [0, 1]`                                               | `dp < 0`  ·  `dp > 1`                        |
| `dm`              | `dm ∈ [0, 1]`                                               | `dm < 0`  ·  `dm > 1`                        |
| `esMiembro`       | `true`  ·  `false`                                         | —                                            |
| `devoluciones30d` | `0 ≤ devoluciones30d ≤ 3`  ·  `devoluciones30d > 3` (dom.) | `devoluciones30d < 0`                        |

---

## Análisis de valores límite

| Parámetro          | Umbral                 | Valores sugeridos (BV)                            | Esperado |
|-------------------|------------------------|---------------------------------------------------|----------|
| `m`               | `200`                  | `200`, `199.99` (o `199`), `201`                  | `m=200` no dp · `m>200` sí dp                 |
| `dp`              | `[0, 1]`               | `0`, `1`, `-0.01`, `1.01`                         | `-0.01/1.01` error · `0/1` válido             |
| `dm`              | `[0, 1]`               | `0`, `1`, `-0.01`, `1.01`                         | `-0.01/1.01` error · `0/1` válido             |
| `devoluciones30d` | `3`                    | `3`, `4`, `-1`, `0`                               | `>3` sin descuento · `<0` error               |

---

## Conjunto mínimo de casos (cubre reglas y bordes)

| ID | `m`  | `dp`  | `dm`  | `esMiembro` | `devoluciones30d` | Resultado esperado |
|---:|-----:|------:|------:|:-----------:|-------------------:|--------------------|
| A  | 500  | 0.10  | 0.05  | true        | 4                  | `final = 500` (sin descuentos) |
| B  | 200  | 0.10  | 0.05  | false       | 0                  | `final = 200` |
| C  | 201  | 0.10  | 0.00  | false       | 0                  | `201 * (1 - 0.10)` |
| D  | 150  | 0.00  | 0.05  | true        | 0                  | `150 * (1 - 0.05)` |
| E  | 300  | 0.10  | 0.05  | true        | 0                  | `300 * (1 - 0.10) * (1 - 0.05)` |
| F  | 100  | -0.01 | 0.05  | false       | 0                  | Error por `dp < 0` |
| G  | 100  | 0.10  | 1.01  | false       | 0                  | Error por `dm > 1` |
| H  | 250  | 0.10  | 0.05  | true        | 3                  | `250 * (1 - 0.10) * (1 - 0.05)` |

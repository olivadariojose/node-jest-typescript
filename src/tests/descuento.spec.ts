
import { calcularPrecioFinal } from "../domain/descuento";
import { EntradaDescuento } from "../domain/types";


describe('calcularPrecioFinal', () => {
  const base: Omit<EntradaDescuento, 'm'> = {
    dp: 0.10,
    dm: 0.05,
    esMiembro: false,
    devoluciones30d: 0,
  };

  test('regla de devoluciones tiene prioridad: sin descuentos', () => {
    const r = calcularPrecioFinal({ ...base, m: 500, esMiembro: true, devoluciones30d: 4 });
    expect(r.final).toBe(500);
    expect(r.descuentoTotal).toBe(0);
    expect(r.aplicados).toHaveLength(0);
    expect(r.omitidoPorDevoluciones).toBe(true);
  });

  test('sin descuentos cuando m <= 200 y no es miembro', () => {
    const r = calcularPrecioFinal({ ...base, m: 200 });
    expect(r.final).toBe(200);
    expect(r.aplicados).toHaveLength(0);
  });

  test('aplica solo dp cuando m > 200 y no es miembro', () => {
    const r = calcularPrecioFinal({ ...base, m: 300 });
    expect(r.final).toBeCloseTo(300 * (1 - 0.10));
    expect(r.aplicados.map(a => a.nombre)).toEqual(['dp']);
  });

  test('aplica dp y luego dm cuando corresponde', () => {
    const r = calcularPrecioFinal({ ...base, m: 300, esMiembro: true });
    const esperado = 300 * (1 - 0.10) * (1 - 0.05);
    expect(r.final).toBeCloseTo(esperado);
    expect(r.aplicados.map(a => a.nombre)).toEqual(['dp', 'dm']);
  });

  test('aplica solo dm si es miembro y m <= 200', () => {
    const r = calcularPrecioFinal({ ...base, m: 150, esMiembro: true });
    expect(r.final).toBeCloseTo(150 * (1 - 0.05));
    expect(r.aplicados.map(a => a.nombre)).toEqual(['dm']);
  });

  test('tasas fuera de rango lanzan error', () => {
    expect(() =>
      calcularPrecioFinal({ ...base, m: 100, dp: -0.1 })
    ).toThrow();

    expect(() =>
      calcularPrecioFinal({ ...base, m: 100, dp: 0.1, dm: 1.1 })
    ).toThrow();
  });

  test('borde: devoluciones = 3 permite descuentos', () => {
    const r = calcularPrecioFinal({ ...base, m: 250, devoluciones30d: 3, esMiembro: true });
    expect(r.final).toBeCloseTo(250 * (1 - 0.10) * (1 - 0.05));
    expect(r.omitidoPorDevoluciones).toBe(false);
  });
});

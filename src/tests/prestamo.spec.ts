// src/tests/prestamos.spec.ts
import { puedeAprobarPrestamo } from "../domain/prestamo"
import { Persona, } from '../domain/types';

const basePersona: Persona = {
    edad: 30,
    ocupacion: 'empleado',
    tieneDeudas: false,
    moraActiva: false,
    score: 700,
    ingresosVerificados: true,
    dti: 30,
    antiguedadMeses: 12,
    garante: false,
};

describe('puedeAprobarPrestamo', () => {

    const persona1 = (p: Partial<Persona> = {}): Persona => ({
        ...basePersona,
        ...p
    })

    it.each<[Partial<Persona>, boolean]>([
        [{ ocupacion: "estudiante", tieneDeudas: false }, false],
        [{ ocupacion: "estudiante", tieneDeudas: true }, false],
    ])("estudiante %o -> %s", (input, esperado) => {
        expect(puedeAprobarPrestamo(persona1(input))).toBe(esperado);
    });

    it.each<[Partial<Persona>, boolean]>([
        [{ ocupacion: "empleado", tieneDeudas: false }, true],
        [{ ocupacion: "empleado", tieneDeudas: true }, true],
    ])("empleado %o -> %s", (input, esperado) => {
        expect(puedeAprobarPrestamo(persona1(input))).toBe(esperado);
    });

    it("ocupación desconocida", () => {
        const p = persona1({ ocupacion: "otro" as any });
        expect(() => puedeAprobarPrestamo(p)).toThrow("ocupacion invalida");
    });


    it.each<[Partial<Persona>, boolean]>([
        [{ ocupacion: "retirado", tieneDeudas: false }, true],
        [{ ocupacion: "retirado", tieneDeudas: true }, false],
    ])("retirado %o -> %s", (input, esperado) => {
        expect(puedeAprobarPrestamo(persona1(input))).toBe(esperado);
    });

})
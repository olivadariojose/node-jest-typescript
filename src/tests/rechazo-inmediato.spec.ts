// src/tests/rechazo-inmediato.spec.ts

import { rechazoInmediato } from "../domain/rechazo-inmediato";
import { Persona } from "../domain/types";

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



describe("aprobarCredito", () => {
    const persona2 = (p: Partial<Persona> = {}): Persona => ({
        ...basePersona,
        ...p
    });

    // Rechazo inmediato
    it("moraActiva => NO", () => {
        expect(rechazoInmediato(persona2({ moraActiva: true }))).toBe(false);
    });

    it.each([599, 300])("score %d (<600) => NO", (sc) => {
        expect(rechazoInmediato(persona2({ score: sc }))).toBe(false);
    });

    // Reglas base
    it("sin ingresos verificados y sin excepción => NO", () => {
        expect(rechazoInmediato(persona2({ ingresosVerificados: false }))).toBe(false);
    });

    it("dti > 35 y sin excepción => NO", () => {
        expect(rechazoInmediato(persona2({ dti: 36 }))).toBe(false);
    });

    it("estudiante con garante puede saltar base => evalúa y APRUEBA", () => {
        const s = persona2({
            ocupacion: "estudiante",
            garante: true,
            ingresosVerificados: false,
            dti: 90,
            score: 620, 
        });
        expect(rechazoInmediato(s)).toBe(true);
    });

    // Estudiante
    it.each([
        [{ garante: true, score: 600 }, true], // por garante
        [{ garante: false, score: 650 }, true], // por score
        [{ garante: false, score: 649 }, false],
    ])("estudiante %o => %s", (extra, esperado) => {
        const s = persona2({
            ocupacion: "estudiante",
            ingresosVerificados: true,
            dti: 20,
            ...extra,
        });
        expect(rechazoInmediato(s)).toBe(esperado);
    });

    // Empleado
    it.each([
        [{ antiguedadMeses: 6, score: 650 }, true],
        [{ antiguedadMeses: 5, score: 700 }, false],
        [{ antiguedadMeses: 12, score: 649 }, false],
    ])("empleado %o => %s", (extra, esperado) => {
        expect(rechazoInmediato(persona2({ ocupacion: "empleado", ...extra }))).toBe(
            esperado
        );
    });

    // Independiente
    it.each([
        [{ antiguedadMeses: 12, score: 670 }, true],
        [{ antiguedadMeses: 11, score: 700 }, false],
        [{ antiguedadMeses: 24, score: 669 }, false],
    ])("independiente %o => %s", (extra, esperado) => {
        expect(rechazoInmediato(persona2({ ocupacion: "independiente", ...extra }))).toBe(
            esperado
        );
    });

    // Retirado
    it.each([
        [{ score: 640 }, true],
        [{ score: 639 }, false],
    ])("retirado %o => %s", (extra, esperado) => {
        expect(rechazoInmediato(persona2({ ocupacion: "retirado", ...extra }))).toBe(
            esperado
        );
    });

    // Si no cumple alguna regla anterior => NO
    it("empleado con dti alto aunque cumpla umbral => NO", () => {
        const s = persona2({ dti: 50, antiguedadMeses: 20, score: 800 });
        expect(rechazoInmediato(s)).toBe(false);
    });

    it("perfil desconocido => error", () => {
        const s = persona2({ ocupacion: "otro" as any });
        expect(() => rechazoInmediato(s)).toThrow("No aprobado");
    });
});

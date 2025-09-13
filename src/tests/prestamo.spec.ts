// src/tests/prestamos.spec.ts

import { puedeAprobarPrestamo } from "../domain/prestamo"
import { Persona, Ocupacion } from '../domain/types';


describe('puedeAprobarPrestamo', () => {

    const persona1 = (p: Partial<Persona> = {}): Persona => ({
        edad: 30,
        ocupacion: 'empleado',
        tieneDeudas: false,
        ...p
    })

    it.each([
        [{ Ocupacion: 'estudiante', tieneDeudas: false }, false],
        [{ Ocupacion: 'estudiante', tieneDeudas: true }, false]
    ])('estudiante %o -> %s', (input, esperado) => {
        expect(puedeAprobarPrestamo(persona1(input))).toBe(esperado)
    })

    it.each([
        [{ Ocupacion: 'empleado', tieneDeudas: false }, true],
        [{ Ocupacion: 'empleado', tieneDeudas: true }, true],
    ])('empleado %o -> %s', (input, esperado) => {
        expect(puedeAprobarPrestamo(persona1(input))).toBe(esperado);
    });

    it.each([
        [{ Ocupacion: 'retirado', tieneDeudas: false }, true],
        [{ Ocupacion: 'retirado', tieneDeudas: true }, false],
    ])('retirado %o -> %s', (input, esperado) => {
        expect(puedeAprobarPrestamo(persona1(input))).toBe(esperado);
    });



})
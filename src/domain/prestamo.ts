// src/domain/prestamo.ts
/**
 * Funcion Aprobar Prestamo
 * 
 * Estudiante : No aprueba
 * Empleado: Si aprueba
 * Retirado: Tienede deudas? No aprueba : Si aprueba
 * 
 */

import type { Persona } from "./types";


export function puedeAprobarPrestamo(persona: Persona): boolean {

    switch (persona.ocupacion) {
        case 'estudiante':
            return false;
        case 'empleado':
            return true
        case 'retirado':
            return persona.tieneDeudas ? false : true;
        default:
            throw new Error('ocupacion invalida');
    }
}
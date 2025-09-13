// src/domain/rechazo-inmediato.ts

import { Persona } from "./types";

const minScore: number = 600
const minDti: number = 35


export function rechazoInmediato(persona: Persona): boolean{

    if(persona.moraActiva) return false

    if( !(Number.isSafeInteger(persona.score)) || persona.score < minScore ) return false

    if( !(persona.ingresosVerificados) && (persona.dti<=minDti)) return false 

    const reglaBase = persona.ingresosVerificados === true && persona.dti <= minDti
    const baseAprobado = reglaBase || (persona.ocupacion==='estudiante' && persona.garante)

    if(!baseAprobado) return false;

    switch(persona.ocupacion){
        case 'estudiante':
            return persona.garante || persona.score >= 650;
        case 'empleado':
            return persona.antiguedadMeses >= 6 && persona.score >=650;
        case 'independiente':
            return persona.antiguedadMeses>= 12 && persona.score >=670
        case 'retirado':
            return persona.score >=640;

        default:
            throw new Error('No aprobado')
    }
}
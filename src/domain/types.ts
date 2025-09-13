// src/domain/types.ts
export type Ocupacion = 'estudiante' | 'empleado' | 'retirado';


export interface Persona{
    edad:number;
    ocupacion:Ocupacion;
    tieneDeudas: boolean;
}


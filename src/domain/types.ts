// src/domain/types.ts
export type Ocupacion = 'estudiante' | 'empleado' | 'retirado' | 'independiente';


export interface Persona{
    edad:number;
    ocupacion:Ocupacion;
    tieneDeudas: boolean;

    moraActiva: boolean;
    score: number;
    ingresosVerificados: boolean;
    dti:number;
    antiguedadMeses: number;
    garante:boolean;
}


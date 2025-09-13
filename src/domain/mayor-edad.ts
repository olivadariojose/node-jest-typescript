// src/domain/mayor-edad.ts
/**
 * Funcion para validar si una persona es mayor de edad
 * 
 * Retorna true si la edad es mayor o igual a 18
 * Retorna false si la edad es menor a 18
 * 
 */


export function esMayorDeEdad(edad:number):boolean{

    if(!Number.isSafeInteger(edad)) throw new Error('Edad no valida');
    
    if(edad<0) throw new Error('Edad no valida');

    
    return edad >= 18;
}
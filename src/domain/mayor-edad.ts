/**
 * Funcion para validar si una persona es mayor de edad
 * 
 * Retorna true si la edad es mayor o igual a 18
 * Retorna false si la edad es menor a 18
 * 
 */


export function esMayorDeEdad(edad:number):boolean{

    if(typeof edad !== 'number') throw new TypeError('edad invalida');

    if(!Number.isFinite(edad)) throw new TypeError('edad invalida');

    if(!Number.isInteger(edad)) throw new TypeError('edad invalida');
    
    if(edad<0) throw new RangeError('edad invalida');
    
    return edad >= 18;
}
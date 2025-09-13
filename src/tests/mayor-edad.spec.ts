// src/tests/mayor-edad.espect.ts

import { esMayorDeEdad } from "../domain/mayor-edad";



describe('esMayorDeEdad', () => {

    it.each([0,17])('valor : %d -> false',(n)=>{
        expect(esMayorDeEdad(n)).toBe(false)
    })

    it.each([18,100])('valor : %d -> true',(n)=>{
        expect(esMayorDeEdad(n)).toBe(true)
    })

    it('negativos -> lanza error', ()=>{
        expect(()=>esMayorDeEdad(-3 as any)).toThrow('Edad no valida')
    })


    it.each([
        '18',
        'dieciocho',
        null,
        undefined,
        [],
        {},
        true,
        18.5,
        NaN,
        Infinity,
        BigInt(18)
    ])('entrada no valida %p -> lanza error', (valor:any)=>{
        expect(()=> esMayorDeEdad(valor)).toThrow('Edad no valida')
    })

})
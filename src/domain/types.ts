
export type DescuentoNombre = 'dp' | 'dm';

export interface EntradaDescuento {
    m: number;               // monto total
    dp: number;              // tasa descuento compras altas (0..1)
    dm: number;              // tasa descuento membresía (0..1)
    esMiembro: boolean;      // cliente miembro
    devoluciones30d: number; // artículos devueltos últimos 30 días
}

export interface DetalleDescuento {
    nombre: DescuentoNombre;
    tasa: number;
    monto: number; // valor descontado en moneda
}

export interface ResultadoPrecio {
    final: number;
    descuentoTotal: number;
    aplicados: DetalleDescuento[];
    omitidoPorDevoluciones: boolean;
}
import { DetalleDescuento, EntradaDescuento, ResultadoPrecio } from "./types";


function validarEntrada(x: EntradaDescuento) {
    if (x.m < 0) throw new Error('m debe ser >= 0');
    if (x.dp < 0 || x.dp > 1) throw new Error('dp debe estar en [0,1]');
    if (x.dm < 0 || x.dm > 1) throw new Error('dm debe estar en [0,1]');
    if (!Number.isFinite(x.devoluciones30d) || x.devoluciones30d < 0) {
        throw new Error('devoluciones30d debe ser >= 0');
    }
}

export function calcularPrecioFinal(in_: EntradaDescuento): ResultadoPrecio {
    validarEntrada(in_);

    const { m, dp, dm, esMiembro, devoluciones30d } = in_;

    if (devoluciones30d > 3) {
        return {
            final: m,
            descuentoTotal: 0,
            aplicados: [],
            omitidoPorDevoluciones: true,
        };
    }

    let precio = m;
    const aplicados: DetalleDescuento[] = [];

    if (m > 200 && dp > 0) {
        const monto = precio * dp;
        precio -= monto;
        aplicados.push({ nombre: 'dp', tasa: dp, monto });
    }

    if (esMiembro && dm > 0) {
        const monto = precio * dm;
        precio -= monto;
        aplicados.push({ nombre: 'dm', tasa: dm, monto });
    }

    return {
        final: precio,
        descuentoTotal: m - precio,
        aplicados,
        omitidoPorDevoluciones: false,
    };
}
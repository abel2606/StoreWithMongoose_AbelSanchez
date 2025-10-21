import VentaDAO from '../dao/VentaDAO.js';
import { AppError } from '../utils/appError.js';


class Ventacontroller {

    static async crearVenta(req, res, next) {
        try {
            const { total, iva, productosventa } = req.body;

            //validar valores
            if (total === undefined || iva === undefined || !productosventa) {
                next(new AppError('Los campos total e iva son requeridos', 400));
            }

            const ventaData = { total, iva, productosventa };
            const venta = await VentaDAO.crearVenta(ventaData);
            res.status(201).json(venta);

        } catch (error) {
            next(new AppError(`Ocurrio un error al crear el la venta: ${error.message}`, 500))
        }
    }

    static async agregarProductoAVenta(req, res, next) {
        try {
            const idVenta = req.params.id;
            const productos = req.body.productos;

            if(!productos || !Array.isArray(productos) || productos.length === 0){
                return next(new AppError('Se require una lista de productos para agregarlos.',400))
            }

            const ventaConProductos = await VentaDAO.agregaProductosAVenta(idVenta,productos);
            res.status(200).json(ventaConProductos);

        } catch (error) {
            next(new AppError('Ocurrió un error al agregar los productos a la venta',500));
        }
    }

}

export default Ventacontroller;
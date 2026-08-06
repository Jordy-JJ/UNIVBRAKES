# Univbrakes | Sistema de ventas e inventario

MVP web para modernizar el control de inventario que actualmente se lleva en Excel.

## Funciones incluidas

- Importación de inventario desde `.xlsx`, `.xls` y `.csv`.
- Detección automática de columnas comunes: código/SKU, producto, marca, modelo, existencia, costo y precio de venta.
- Actualización de productos existentes usando el código/SKU.
- Buscador y filtros de inventario.
- Alertas de existencias bajas.
- Punto de venta con carrito.
- Descuento automático de existencias al registrar una venta.
- Historial de ventas y movimientos de inventario.
- Alta y edición manual de productos.
- Ajustes de existencias con motivo.
- Exportación del inventario actualizado a Excel.
- Persistencia local en el navegador para poder probar el flujo sin servidor.

## Cómo probarlo

1. Abra `index.html` en un navegador moderno o publique esta carpeta con GitHub Pages.
2. Presione **Importar Excel** y seleccione el inventario actual.
3. Revise los productos importados en **Inventario**.
4. Registre una operación en **Punto de venta**.
5. Exporte el inventario actualizado desde el botón **Exportar Excel**.

También se incluye `plantilla-inventario.csv` como ejemplo de columnas recomendadas.

## Columnas recomendadas

| Columna | Obligatoria | Ejemplo |
| --- | --- | --- |
| Código | Sí | D1234 |
| Producto | Sí | Balata delantera cerámica |
| Marca | No | Brembo |
| Modelo / Aplicación | No | Nissan Versa 2020-2024 |
| Existencia | No | 12 |
| Costo | No | 350.00 |
| Precio venta | No | 590.00 |
| Ubicación | No | A-03 |
| Categoría | No | Balata delantera |
| Stock mínimo | No | 3 |

## Alcance técnico del MVP

Los datos se guardan en `localStorage`, por lo que permanecen solamente en el navegador y equipo donde se use. Esta versión sirve para validar el flujo y la estructura del sistema.

Para operación real con varios vendedores o sucursales, la siguiente fase debe conectar el panel con una base de datos PostgreSQL/Supabase e incorporar:

- Usuarios, permisos y cierre de sesión.
- Inventario centralizado y por sucursal.
- Clientes, proveedores, compras y cuentas por cobrar.
- Cotizaciones, devoluciones y cancelaciones controladas.
- Bitácora de auditoría.
- Respaldo automático.
- Facturación CFDI mediante un proveedor autorizado.
- Lectura de códigos de barras y soporte para impresora de tickets.

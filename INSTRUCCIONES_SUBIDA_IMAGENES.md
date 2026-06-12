# UNIVBRAKES - carga de imágenes por usuarios

Esta versión incluye un apartado llamado **Subir fotos** dentro de `index.html`.

## Qué hace ahora

- Permite que el usuario escriba su nombre, WhatsApp, sucursal y vehículo/producto.
- Permite seleccionar hasta 3 imágenes.
- Muestra una vista previa antes de enviar.
- Abre WhatsApp con un resumen para Portales o Coapa.
- Incluye un formulario preparado para Netlify Forms con carga de archivos.

## Para que las imágenes se guarden realmente

1. Sube la carpeta completa `univbrakes_web` a Netlify.
2. En Netlify, entra a **Forms** y activa **Enable form detection**.
3. Vuelve a desplegar la página.
4. En el panel de Netlify aparecerá el formulario **subir-imagenes**.
5. Las solicitudes llegarán con los campos del usuario y las fotos adjuntas.

## Limitaciones de esta forma sencilla

- Las imágenes no se publican automáticamente en la galería pública.
- Sirve para recibir fotos de clientes o usuarios como solicitud de cotización.
- Para que cada usuario tenga cuenta con contraseña y sus fotos aparezcan automáticamente en la página, se necesita conectar un backend como Supabase, Firebase, Cloudinary o un panel de administración.

## Horarios actualizados

- Portales: lunes a viernes 9:00-18:00, sábado 9:00-15:00, domingo cerrado.
- Coapa: lunes a viernes 9:00-18:00, sábado 9:00-15:00, domingo cerrado.
- Días festivos: normalmente cerrado. Confirmar por WhatsApp.

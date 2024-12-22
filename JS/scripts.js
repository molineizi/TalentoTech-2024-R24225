// scripts.js - Funcionalidades para la página web "Locos por el Fútbol"

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.boton');
  const carritoContainer = document.querySelector('#carrito-container');
  const carritoProductos = [];

  // Función para agregar productos al carrito
  function agregarAlCarrito(event) {
      const productoCard = event.target.closest('.producto-card');
      const nombre = productoCard.querySelector('h3').textContent;
      const precio = productoCard.querySelector('p:nth-child(4)').textContent;

      const producto = {
          nombre,
          precio: parseFloat(precio.replace('$', '').replace('.', '')),
          cantidad: 1,
      };

      // Verificar si el producto ya está en el carrito
      const existente = carritoProductos.find((p) => p.nombre === producto.nombre);
      if (existente) {
          existente.cantidad++;
      } else {
          carritoProductos.push(producto);
      }

      actualizarCarrito();
  }

  // Función para actualizar el contenido del carrito
  function actualizarCarrito() {
      if (carritoProductos.length === 0) {
          carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
          return;
      }

      carritoContainer.innerHTML = `
          <table>
              <thead>
                  <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Total</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody></tbody>
          </table>
      `;

      const tbody = carritoContainer.querySelector('tbody');

      carritoProductos.forEach((producto, index) => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
              <td>${producto.nombre}</td>
              <td>${producto.cantidad}</td>
              <td>$${(producto.precio * producto.cantidad).toLocaleString()}</td>
              <td>
                  <button class="btn-editar" data-index="${index}">Editar</button>
                  <button class="btn-eliminar" data-index="${index}">Eliminar</button>
              </td>
          `;
          tbody.appendChild(fila);
      });

      configurarBotonesEdicion();
      configurarBotonesEliminacion();
  }

  // Función para configurar los botones de edición
  function configurarBotonesEdicion() {
      const botonesEditar = document.querySelectorAll('.btn-editar');
      botonesEditar.forEach((boton) => {
          boton.addEventListener('click', (event) => {
              const index = parseInt(event.target.dataset.index);
              const nuevaCantidad = parseInt(prompt('Ingrese la nueva cantidad:', carritoProductos[index].cantidad));

              if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                  carritoProductos[index].cantidad = nuevaCantidad;
                  actualizarCarrito();
              }
          });
      });
  }

  // Función para configurar los botones de eliminación
  function configurarBotonesEliminacion() {
      const botonesEliminar = document.querySelectorAll('.btn-eliminar');
      botonesEliminar.forEach((boton) => {
          boton.addEventListener('click', (event) => {
              const index = parseInt(event.target.dataset.index);
              carritoProductos.splice(index, 1);
              actualizarCarrito();
          });
      });
  }

  // Agregar eventos a los botones "Agregar al carrito"
  botonesAgregar.forEach((boton) => boton.addEventListener('click', agregarAlCarrito));
});

// URL de la Fake Store API
const API_URL = 'https://fakestoreapi.com/products';

// Función para cargar productos de la API
async function cargarProductos() {
  try {
    const response = await fetch(API_URL);
    const productos = await response.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

// Función para mostrar productos en el DOM
// Función para mostrar productos en el DOM
function mostrarProductos(productos) {
  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = '';

  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('border', 'p-4', 'rounded', 'bg-white', 'shadow');

    // Elemento para la imagen
    const imagenElement = document.createElement('img');
    imagenElement.src = producto.image; // Cargar la imagen del producto
    imagenElement.alt = producto.title;
    imagenElement.classList.add('w-full', 'h-48', 'object-contain', 'mb-4'); // Clases de Tailwind para el tamaño

    // Elementos para nombre y descripción
    const nombreElement = document.createElement('h3');
    nombreElement.setAttribute('data-product-name', producto.id);
    nombreElement.classList.add('text-lg', 'font-bold', 'mb-2');
    nombreElement.textContent = producto.title; // Título del producto

    const descripcionElement = document.createElement('p');
    descripcionElement.setAttribute('data-product-description', producto.id);
    descripcionElement.classList.add('text-gray-700', 'mb-4');
    descripcionElement.textContent = producto.description; // Descripción del producto

    // Elemento para precio
    const precioElement = document.createElement('p');
    precioElement.classList.add('text-gray-900', 'font-bold');
    precioElement.textContent = `$${producto.price}`; // Precio del producto

    // Agregar elementos al contenedor del producto
    productoElement.appendChild(imagenElement); // Añadir la imagen primero
    productoElement.appendChild(nombreElement);
    productoElement.appendChild(descripcionElement);
    productoElement.appendChild(precioElement);
    productosContainer.appendChild(productoElement);
  });
}


// Función para cargar traducciones desde un archivo JSON
async function cargarTraducciones(idioma) {
  try {
    const response = await fetch(`translations/${idioma}.json`);
    const traducciones = await response.json();
    aplicarTraducciones(traducciones);
  } catch (error) {
    console.error('Error al cargar traducciones:', error);
  }
}

// Función para aplicar las traducciones al DOM
function aplicarTraducciones(traducciones) {
  document.querySelectorAll('[data-key]').forEach(element => {
    const key = element.getAttribute('data-key');
    const texto = key.split('.').reduce((obj, k) => obj && obj[k], traducciones);
    if (texto) element.textContent = texto;
  });

  // Traducir también los productos cargados
  document.querySelectorAll('[data-product-name]').forEach(element => {
    const productId = element.getAttribute('data-product-name');
    element.textContent = traducciones[`product_names`]?.[productId] || element.textContent;
  });

  document.querySelectorAll('[data-product-description]').forEach(element => {
    const productId = element.getAttribute('data-product-description');
    element.textContent = traducciones[`product_descriptions`]?.[productId] || element.textContent;
  });
}

// Guardar preferencia de idioma en Local Storage
function guardarPreferenciaIdioma(idioma) {
  localStorage.setItem('idioma', idioma);
}

// Cargar preferencia de idioma desde Local Storage
function cargarPreferenciaIdioma() {
  return localStorage.getItem('idioma') || 'en'; // inglés por defecto
}

// Event Listener para el cambio de idioma
document.getElementById('languageSelector').addEventListener('change', (e) => {
  const idioma = e.target.value;
  cargarTraducciones(idioma);
  guardarPreferenciaIdioma(idioma);
});

// Configuración inicial
const idioma = cargarPreferenciaIdioma();
document.getElementById('languageSelector').value = idioma;
cargarTraducciones(idioma);
cargarProductos(); // Cargar productos al iniciar

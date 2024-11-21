
const API_URL = 'https://fakestoreapi.com/products';

async function cargarProductos() {
  try {
    const response = await fetch(API_URL);
    const productos = await response.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}


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
    imagenElement.classList.add('product-image'); // Clase de CSS específica


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

function guardarPreferenciaIdioma(idioma) {
  localStorage.setItem('idioma', idioma);
}

function cargarPreferenciaIdioma() {
  return localStorage.getItem('idioma') || 'en'; 
}

document.getElementById('languageSelector').addEventListener('change', (e) => {
  const idioma = e.target.value;
  cargarTraducciones(idioma);
  guardarPreferenciaIdioma(idioma);
});


const idioma = cargarPreferenciaIdioma();
document.getElementById('languageSelector').value = idioma;
cargarTraducciones(idioma);
cargarProductos(); 

document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('show');
});
document.getElementById("hamburger").addEventListener("click", function() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show"); 
});

// Array para almacenar los productos agregados al carrito
let carrito = [];

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = '';

  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('border', 'p-4', 'rounded', 'bg-white', 'shadow');

    // Imagen del producto
    const imagenElement = document.createElement('img');
    imagenElement.src = producto.image;
    imagenElement.alt = producto.title;
    imagenElement.classList.add('product-image');

    // Título del producto
    const nombreElement = document.createElement('h3');
    nombreElement.setAttribute('data-product-name', producto.id);
    nombreElement.classList.add('text-lg', 'font-bold', 'mb-2');
    nombreElement.textContent = producto.title;

    // Descripción del producto
    const descripcionElement = document.createElement('p');
    descripcionElement.setAttribute('data-product-description', producto.id);
    descripcionElement.classList.add('text-gray-700', 'mb-4');
    descripcionElement.textContent = producto.description;

    // Precio del producto
    const precioElement = document.createElement('p');
    precioElement.classList.add('text-gray-900', 'font-bold');
    precioElement.textContent = `$${producto.price}`;

    // Botón para agregar al carrito
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.classList.add('bg-blue-500', 'text-white', 'p-2', 'rounded', 'hover:bg-blue-700');
    botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));

    // Agregar elementos al contenedor del producto
    productoElement.appendChild(imagenElement);
    productoElement.appendChild(nombreElement);
    productoElement.appendChild(descripcionElement);
    productoElement.appendChild(precioElement);
    productoElement.appendChild(botonAgregar);
    productosContainer.appendChild(productoElement);
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto); // Agregar el producto al carrito

  // Mostrar SweetAlert
  Swal.fire({
    title: 'Producto agregado',
    text: `¡"${producto.title}" ha sido agregado al carrito!`,
    icon: 'success',
    showConfirmButton: false,
    timer: 1500
  });

  console.log('Carrito actualizado:', carrito); // Para verificar en la consola
}

// Resto del código permanece igual
async function cargarProductos() {
  try {
    const response = await fetch(API_URL);
    const productos = await response.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

cargarProductos();

// Referencias a elementos
const signupLink = document.getElementById("signupLink");
const signupModal = document.getElementById("signupModal");
const closeModal = document.getElementById("closeModal");
const signupForm = document.getElementById("signupForm");

// Mostrar el modal al hacer clic en Sign up
signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupModal.style.display = "block";
});

// Cerrar el modal al hacer clic en el botón de cierre
closeModal.addEventListener("click", () => {
  signupModal.style.display = "none";
});

// Validación del formulario
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor ingresa un correo válido.",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: "Formulario enviado correctamente.",
    });
    signupModal.style.display = "none";
  }
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener("click", (e) => {
  if (e.target === signupModal) {
    signupModal.style.display = "none";
  }
});

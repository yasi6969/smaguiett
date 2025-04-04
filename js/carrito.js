//aniamciond e carga

document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(".animado");
  
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("mostrar");
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });
  
    elementos.forEach(el => observer.observe(el));
  });
  
  
  
  
  
  //logo modo clro 
  let colores = ["color1", "color2", "color3"];
  let index = localStorage.getItem("colorIndex") ? parseInt(localStorage.getItem("colorIndex")) : 0;
  
  document.body.classList.add(colores[index]);
  
  function cambiarColor() {
      document.body.classList.remove(...colores);
      index = (index + 1) % colores.length; 
      document.body.classList.add(colores[index]);
      localStorage.setItem("colorIndex", index); 
  }
  
//abrir menu 
const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');
const header = document.querySelector('.header');

// Abrir/Cerrar con toggle
menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.contains('active');

  if (isOpen) {
    closeMenu();
  } else {
    // Abrir animado
    header.style.height = '80px';
    header.classList.add('active');
    nav.classList.add('active');
    menuToggle.classList.add('open');

    requestAnimationFrame(() => {
      header.style.transition = 'height 0.5s ease';
      header.style.height = '100vh';
    });
  }
});

//guarda alura del header 

let headerClosedHeight;

function updateHeaderClosedHeight() {

  if (!nav.classList.contains('active')) {
    headerClosedHeight = header.offsetHeight + 'px';
  }
}

window.addEventListener('DOMContentLoaded', updateHeaderClosedHeight);


let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    updateHeaderClosedHeight();
  }, 500); 
});


window.addEventListener('resize', () => {
  setTimeout(updateHeaderClosedHeight, 300);
});

// Cerrar animado
function closeMenu() {
    if (nav.classList.contains('active')) {
      const currentHeight = header.scrollHeight + 'px';
      header.style.height = currentHeight;
  
      requestAnimationFrame(() => {
        header.style.transition = 'height 0.5s ease';
        header.style.height = headerClosedHeight;
      });
  
      menuToggle.classList.remove('open');
      nav.classList.remove('active');
  
      setTimeout(() => {
        header.classList.remove('active');
        header.style.height = '';
        header.style.transition = '';
        nav.style.display = '';
      }, 500);
    }
  }
  
  
  
  
  


window.addEventListener('scroll', closeMenu);
window.addEventListener('resize', closeMenu);


document.addEventListener('click', function (event) {
  const isClickInsideMenu =
    event.target.closest('.header__menu-link') ||
    event.target.closest('.header__menu-toggle');

  if (nav.classList.contains('active') && !isClickInsideMenu) {
    closeMenu();
  }
});


// Ajusta el margen superior del body según la altura del header
function ajustarMargen() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const body = document.body;
    body.style.marginTop = `${header.offsetHeight - 12}px`;
}

document.addEventListener('DOMContentLoaded', ajustarMargen);

// Cambia el tamaño del header al hacer scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (!header) return;
    
    if (window.scrollY > 50) {
        header.classList.add("header-small");
    } else {
        header.classList.remove("header-small");
    }
    
});



document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        localStorage.removeItem("carrito");
        mostrarCarrito();
    });

    document.getElementById("realizar-pedido").addEventListener("click", () => {
        generarEnlacePedido();
    });

    document.getElementById("ultima-compra").addEventListener("click", () => {
        restaurarUltimaCompra();
    });

    actualizarEstadoUltimaCompra();
});

function mostrarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    const listaCarrito = document.getElementById("lista-carrito");
    const btnPedido = document.getElementById("realizar-pedido");
    const btnVaciar = document.getElementById("vaciar-carrito");

    listaCarrito.innerHTML = carrito.length === 0 
        ? "<p>El carrito está vacío.</p>" 
        : carrito.map(producto => `
            <div class="carrito-item" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="Imagen de ${producto.descripcion_corta}" class="carrito-item__imagen">
                <div class="carrito-item__info">
                    <p class="carrito-item__descripcion">${producto.descripcion_corta}</p>
                    <p class="carrito-item__precio">${producto.precio}</p>
                    <div class="cantidad-control">
                        <button class="btn-restar" data-id="${producto.id}">-</button>
                        <span class="cantidad">${producto.cantidad}</span>
                        <button class="btn-sumar" data-id="${producto.id}">+</button>
                    </div>
                </div>
            </div>
        `).join("");

    listaCarrito.innerHTML += carrito.length > 0 
        ? `<p id="carrito__total"><strong>Total: $${calcularTotal(carrito)}</strong></p>` 
        : "";

    agregarEventosBotones();


    if (carrito.length === 0) {
        btnPedido.disabled = true;
        btnPedido.textContent = "Agrega productos al carrito para pedirlos";
        btnVaciar.disabled = true; 
    } else {
        btnPedido.disabled = false;
        btnPedido.textContent = "Realizar Pedido ✅";
        btnVaciar.disabled = false; 
    }

    actualizarEstadoUltimaCompra();
}



function agregarEventosBotones() {
    document.querySelectorAll(".btn-sumar").forEach(boton => {
        boton.addEventListener("click", () => modificarCantidad(boton.dataset.id, 1));
    });

    document.querySelectorAll(".btn-restar").forEach(boton => {
        boton.addEventListener("click", () => modificarCantidad(boton.dataset.id, -1));
    });
}

function modificarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    id = id.toString();

    let producto = carrito.find(item => item.id.toString() === id);
    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(item => item.id.toString() !== id);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function calcularTotal(carrito) {
    return carrito
        .filter(p => p.precio) 
        .reduce((acc, producto) => {
            let precioLimpio = String(producto.precio)
                .replace(/\(.*?\)/g, "")
                .replace(/\./g, "") 
                .replace(/[^\d]/g, "");

            return acc + parseFloat(precioLimpio) * producto.cantidad;
        }, 0).toLocaleString("es-CO"); 
}



function generarEnlaceWhatsApp() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carrito.length === 0) {
        console.error("El carrito está vacío. No se puede generar el enlace.");
        return;
    }

    let mensaje = "Hola, buen día. Quisiera pedir estos productos:\n\n";

    carrito.forEach(producto => {
        let descripcion = producto.descripcion_corta;


        if (producto.cantidad > 1) {
            descripcion = descripcion
                .replace(/\bunidad\b/gi, "Unidades")
                .replace(/\baguja\b/gi, "Agujas")
                .replace(/\bcaja\b/gi, "Cajas")
                .replace(/\bpaquete\b/gi, "Paquetes")
                .replace(/\bfrasco\b/gi, "Frascos")
                .replace(/\bmetro\b/gi, "Metros")
                .replace(/\bpar\b/gi, "Pares")
                .replace(/\bpack\b/gi, "Packs")
                .replace(/\bPalito\b/gi, "Palitos")
                .replace(/\bvitamina yodi\b/gi, "vitaminas yodi")
                .replace(/\bultra ink tattoo\b/gi, "ultra inks tattoo")
                .replace(/\bafter care\b/gi, "after cares")
                .replace(/\brollo\b/gi, "rollos")
                .replace(/\bcubre grip\b/gi, "Cubre grips")
                .replace(/\bnaranja\b/gi, "Naranjas")
                .replace(/\bPiel Sintética\b/gi, "Pieles sinteticas")
                .replace(/\bMáquina\b/gi, "Maquinas")
                .replace(/\bLoción\b/gi, "Lociónes")
                .replace(/\btarro\b/gi, "Tarros")
                .replace(/\bcable\b/gi, "Cables")
                .replace(/\bpañal\b/gi, "Pañales")
                .replace(/\bgel anestésico\b/gi, "geles anestésicos")
                .replace(/\bcrema Anestésica\b/gi, "Cremas Anestésicas")
                .replace(/\bmarcador\b/gi, "Marcadores")
                .replace(/\brecipiente\b/gi, "Recipientes")
                .replace(/\bpapel hectográfico\b/gi, "Papeles hectográficos")
                .replace(/\bcuchilla\b/gi, "Cuchillas")
                .replace(/\bSolucion\b/gi, "Soluciones"); }

        mensaje += `- ${producto.cantidad} ${descripcion}\n`;
    });

    mensaje += "\nAgradezco su confirmación.\nA la dirección: ";

    let enlace = `https://wa.me/573053662867?text=${encodeURIComponent(mensaje)}`;
    
    console.log("Enlace generado:", enlace);
    window.open(enlace, "_blank");

    localStorage.setItem("ultimaCompra", JSON.stringify(carrito));

    localStorage.removeItem("carrito");
    mostrarCarrito();
}







function actualizarEstadoUltimaCompra() {
    const btnUltimaCompra = document.getElementById("ultima-compra");
    const btnRealizarPedido = document.getElementById("realizar-pedido");
    const ultimaCompra = localStorage.getItem("ultimaCompra");


    btnUltimaCompra.textContent = ultimaCompra && JSON.parse(ultimaCompra).length > 0
        ? "Último Pedido 🔁"
        : "No hay último pedido";

    btnUltimaCompra.disabled = !ultimaCompra || JSON.parse(ultimaCompra).length === 0;
}



function restaurarUltimaCompra() {
    const ultimaCompra = localStorage.getItem("ultimaCompra");
    if (!ultimaCompra) return;

    localStorage.setItem("carrito", ultimaCompra);
    mostrarCarrito();
}


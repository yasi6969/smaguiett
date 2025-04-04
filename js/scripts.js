//letrero web app

let deferredPrompt;

const BANNER_ID = 'install-banner';
const DESKTOP_BREAKPOINT = 768;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    const isDesktop = window.innerWidth > DESKTOP_BREAKPOINT;
    const isPWA = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

    if (!isPWA && !isDesktop) {
        mostrarBanner();
    }
});

function mostrarBanner() {
    const banner = document.getElementById(BANNER_ID);
    if (banner) {
        banner.style.display = "grid";
    }
}

function instalarApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("✅ Usuario aceptó la instalación");
            } else {
                console.log("❌ Usuario rechazó la instalación");
            }
            deferredPrompt = null;
            cerrarBanner();
        });
    }
}

function cerrarBanner() {
    const banner = document.getElementById(BANNER_ID);
    if (banner) {
        banner.style.display = "none";
    }
}



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

menuToggle.style.pointerEvents = 'auto';

menuToggle.addEventListener('click', function () {

    if (nav.classList.contains('active')) {
        menuToggle.classList.remove('open');
        nav.classList.remove('active');
        header.classList.remove('active');
    } else {
        menuToggle.classList.add('open');
        nav.classList.add('active');
        header.classList.add('active');
    }
});

// Cierra el menú al hacer scroll o redimensionar
function closeMenu() {
    if (nav.classList.contains('active')) {
        menuToggle.classList.remove('open');
        nav.classList.remove('active');
        header.classList.remove('active');
    }
}

window.addEventListener('scroll', closeMenu);
window.addEventListener('resize', closeMenu);

//Cierra al dar click afuera 
document.addEventListener('click', function (event) {
    const isClickInsideMenu = event.target.closest('.header__menu-link') || event.target.closest('.header__menu-toggle');

    if (nav.classList.contains('active') && !isClickInsideMenu) {
        menuToggle.classList.remove('open');
        nav.classList.remove('active');
        header.classList.remove('active');
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
    
    ajustarTopNav();
    ajustarAlturaNav();
});




//  Swiper 1
var swiper1 = new Swiper(".swiper1", {
  loop:true,
  effect: 'fade',
  navigation: {
      nextEl: ".next1",
      prevEl: ".prev1"
  },
 
});


  

//  Swiper 2
let swiper2 = new Swiper(".productos__content", {
  loop: true,
  autoplay: true,
  spaceBetween: 15,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  
  navigation: {
    nextEl: ".next2",
    prevEl: ".prev2",
  },

  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    968: {
      slidesPerView: 3,
    },
    1180: {
      slidesPerView: 4,
    }
  },


});





// vermas enlos prodctos
document.addEventListener("DOMContentLoaded", function() {
  const botonesVerMas = document.querySelectorAll(".ver-mas");
  const contenedorProductos = document.querySelector(".productos__container"); 
  botonesVerMas.forEach(boton => {
      boton.addEventListener("click", function(event) {
          let descripcion = this.previousElementSibling;
          let abierto = descripcion.style.display === "inline";
          descripcion.style.display = abierto ? "none" : "inline";
          this.textContent = abierto ? "Ver más" : "Ver menos";

          event.stopPropagation(); 
      });
  });
  document.addEventListener("click", function(event) {
      if (!contenedorProductos.contains(event.target)) {
          botonesVerMas.forEach(boton => {
              let descripcion = boton.previousElementSibling;
              descripcion.style.display = "none";
              boton.textContent = "Ver más";
          });
      }
  });
});




// Animación de iconos en el footer
document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll("#contacto ul li a img");
    const contacto = document.querySelector("#contacto");

    function mostrarIconos() {
        if (contacto.getBoundingClientRect().top < window.innerHeight) {
            icons.forEach((icono, index) => {
                setTimeout(() => {
                    icono.classList.add("revelar");
                }, index * 150); // Retraso en la animación de cada ícono
            });
        }
    }

    window.addEventListener("scroll", mostrarIconos);
});

// Paignas randoms onclick

function redireccionar() {
  const sitios = [
"http://awkwardfamilyphotos.com/",
"https://www.daysoftheyear.com/",
"http://thecodinglove.com/",
"https://pointerpointer.com/",
"https://eelslap.com/",
"https://theuselessweb.com/",
"https://heeeeeeeey.com/",
"https://weirdorconfusing.com/",
"http://cat-bounce.com/",
"http://www.fallingfalling.com/",
"http://www.staggeringbeauty.com/",
"http://www.boredbutton.com/",
"http://zoomquilt.org/",
"http://www.koalastothemax.com/",
"http://sanger.dk/",
"http://www.patience-is-a-virtue.org/",
"http://endless.horse/",
"http://longdogechallenge.com/",
"http://corndog.io/",
"http://isitchristmas.com/",
"http://isitimeforabreak.com/",
"http://sometimesredsometimesblue.com/",
"https://trypap.com/",
"http://beesbeesbees.com/",
"https://thisissand.com/",
"https://radio.garden/",
"https://asoftmurmur.com/",
"http://hackertyper.com/",
"https://thezen.zone/",
"http://www.republiquedesmangues.fr/",
"https://lava.lamp.fm/",
"http://chrismckenzie.com/",
"https://geekprank.com/fake-virus/",
"https://mapcrunch.com/",
"http://r33b.net/",
"https://ncase.me/trust/",
"https://neal.fun/infinite-craft/",
"https://neal.fun/absurd-trolley-problems/",
"https://neal.fun/draw-perfect-circles/",
"https://papertoilet.com/",
"https://findtheinvisiblecow.com/",
"https://puginarug.com/",
"https://corgiorgy.com/",
"http://www.ismycomputeron.com/",
"http://www.howmanypeopleareinspacerightnow.com/",
"http://www.iamawesome.com/",
"http://tencents.info/",
"http://www.zombo.com/",
"http://www.donothingfor2minutes.com/",
"http://www.everydayim.com/",
"http://www.movenowthinklater.com/",
"http://www.muchbetterthanthis.com/",
"https://whereisroadster.com/",
"https://bouncyballs.org/",
"https://quickdraw.withgoogle.com/",
"https://papertoilet.com/",
"https://findtheinvisiblecow.com/",
"https://puginarug.com/",
"https://corgiorgy.com/",
"http://www.ismycomputeron.com/",
"http://www.howmanypeopleareinspacerightnow.com/",
"http://www.iamawesome.com/",
"http://tencents.info/",
"http://www.zombo.com/",
"http://www.donothingfor2minutes.com/",
"http://www.everydayim.com/",
"http://www.movenowthinklater.com/",
"http://www.muchbetterthanthis.com/",
"https://whereisroadster.com/",
"https://bouncyballs.org/",
"https://quickdraw.withgoogle.com/",
"https://neal.fun/size-of-space/",
"https://neal.fun/space-elevator/",
"https://neal.fun/deep-sea/",
"https://neal.fun/password-game/",
"https://neal.fun/spend/",
"https://neal.fun/2048/",
"https://neal.fun/let-there-be-light/",
"https://neal.fun/guess-my-word/",
"https://neal.fun/rocks/",
"https://neal.fun/diamonds/",
"https://neal.fun/open-probability/",
"https://neal.fun/never-ending-calendar/",
"https://neal.fun/ten-thousand-cents/",
"https://neal.fun/who-will-win/",
"https://neal.fun/what-if/",
"https://neal.fun/where-does-the-time-go/",
"https://neal.fun/whats-my-name/",
"https://neal.fun/weather-machine/",
"https://neal.fun/wind-map/",
"https://neal.fun/zoom-world/",
"https://neal.fun/you-vs-everyone/",
"https://neal.fun/your-life-on-earth/",
"https://neal.fun/your-name-in-time/",
"https://neal.fun/your-name-in-universe/",
"https://neal.fun/zodiac-map/",
"https://neal.fun/visualize-this/",
"https://neal.fun/vivid-mind/",


  ];
  
  const randomIndex = Math.floor(Math.random() * sitios.length);
  window.open(sitios[randomIndex], "_blank");
}

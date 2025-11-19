/* =========================================
   GRADIENTE ANIMADO (HERO + FOOTER + SECCIONES)
   ========================================= */

// Colores oscuros que ya estabas usando
const colors = [
  [200, 70, 25],   // naranja oscuro
  [120, 160, 10],  // verde oliva oscuro
  [210, 120, 50],  // naranja tostado
  [170, 145, 70]   // crema/mustaza oscuro
];

let step = 0;
let colorIndices = [0, 1, 2, 3];
const gradientSpeed = 0.002;

function updateGradient() {
  const elements = document.querySelectorAll(".gradient-animated");
  if (!elements.length) {
    requestAnimationFrame(updateGradient);
    return;
  }

  const c0_0 = colors[colorIndices[0]];
  const c0_1 = colors[colorIndices[1]];
  const c1_0 = colors[colorIndices[2]];
  const c1_1 = colors[colorIndices[3]];

  const istep = 1 - step;

  const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  const color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  const color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  elements.forEach((el) => {
    el.style.background =
      "linear-gradient(135deg, " + color1 + " 0%, " + color2 + " 100%)";
  });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    colorIndices[1] =
      (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
    colorIndices[3] =
      (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }

  requestAnimationFrame(updateGradient);
}

/* =========================================
   INTERACCIÓN UI (HEADER, MENÚ, BOTONES)
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const navToggle = document.querySelector(".nav-toggle");

  /* === HEADER QUE SE ENCOGE AL HACER SCROLL === */
  if (header) {
    const scrollThreshold = 80; // píxeles de scroll antes de encoger

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    }

    // Ejecutar una vez al cargar (por si recargas ya scrolleado)
    onScroll();

    // Escuchar el scroll
    window.addEventListener("scroll", onScroll);
  }

  /* === MENÚ RESPONSIVE (HAMBURGUESA) === */
  if (header && navToggle) {
    // Abrir/cerrar al hacer clic en la hamburguesa
    navToggle.addEventListener("click", function () {
      header.classList.toggle("nav-open");
    });

    // Cerrar menú al hacer clic en cualquier enlace del nav (en móvil)
    const navLinks = header.querySelectorAll(".main-nav a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
      });
    });

    // Si se redimensiona a escritorio, aseguramos el menú cerrado
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) {
        header.classList.remove("nav-open");
      }
    });
  }

  /* === INICIAR GRADIENTE ANIMADO === */
  requestAnimationFrame(updateGradient);

  /* === BOTONES “PEGADOS” AL RATÓN (COLORES PLANOS) === */
  const gooeyButtons = document.querySelectorAll(
    ".btn-cta, .btn-secundario, .btn-presupuesto"
  );

  gooeyButtons.forEach((btn) => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animating = false;

    const maxOffset = 35; // desplazamiento máximo en px

    function animate() {
      if (!animating) return;

      const ease = 0.20; // cuanto más alto, más rápido “se pega” al cursor
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      // movemos el botón
      btn.style.transform = `translate(${currentX}px, ${currentY}px)`;

      // sombra que acompaña, ligera sensación de profundidad
      const shadowX = -currentX * 2;
      const shadowY = 16 - currentY;
      btn.style.boxShadow = `${shadowX}px ${shadowY}px 32px rgba(0,0,0,0.22)`;

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        requestAnimationFrame(animate);
      } else {
        animating = false;
      }
    }

    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 a 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = relX * maxOffset;
      targetY = relY * maxOffset;

      if (!animating) {
        animating = true;
        requestAnimationFrame(animate);
      }
    });

    btn.addEventListener("pointerleave", () => {
      // cuando el ratón sale, el botón vuelve al centro
      targetX = 0;
      targetY = 0;

      if (!animating) {
        animating = true;
        requestAnimationFrame(animate);
      }
    });
  });

  /* === AOS (ANIMATIONS ON SCROLL), SI ESTÁ CARGADO === */
  if (window.AOS) {
    AOS.init();
  }

  
});

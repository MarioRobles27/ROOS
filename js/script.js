
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
  });


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
    // 👉 todos los elementos que tendrán el mismo fondo animado
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

    // 👉 mismo gradiente aplicado a cada sección animada
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

  document.addEventListener("DOMContentLoaded", function () {
    requestAnimationFrame(updateGradient);
  });

/*---Menu---*/
const header = document.querySelector("header");
const menu = document.querySelector(".menu");
const btnMenu = document.querySelector(".iconMenu");

/*-----Carrito------*/
const carritoOpen = document.getElementById("BtCarrito");
const carrito = document.getElementById("carrito");
const blur = document.querySelector(".modal-blur");

carritoOpen.addEventListener("click", () => {
  carrito.classList.toggle("show");
  blur.classList.toggle("show");
});
const carritoObj = {};
const carritoFactura = document.querySelector(".carrito-factura");
const carritoItems = document.querySelector(".carrito");
const btnAñdir = document.querySelectorAll("#addTo");

// Calcular gastos
const calcularpago = (Card) => {
  carritoFactura.innerHTML = "";
  const Items = Object.values(Card);

  const precioTotal = Items.reduce((total, el) => {
    return total + el.precio * el.cantidad;
  }, 0);

  Items.forEach((el) => {
    const html = `
    <div class="factura">
      <p>${el.nombre} X${el.cantidad}</p>
      <p>$${el.cantidad * el.precio}</p>
    </div>
    `;
    carritoFactura.insertAdjacentHTML("afterbegin", html);
  });
  const totalPagar = `<hr class="line" />
  <div class="total-factura">
  <p>Total a pagar</p>
  <p>$${precioTotal}</p>
  </div>`;
  carritoFactura.insertAdjacentHTML("beforeend", totalPagar);
  return totalPagar;
};

// Aumentar y reducir
const cantidadBtn = (e) => {
  const itemElement = e.target;
  const itemCarrito = e.target.closest(".carrito-general");

  const aumentarEl = itemCarrito.querySelector(".aumentar");
  const reducirEl = itemCarrito.querySelector(".reducir");

  if (e.target === aumentarEl) {
    const itemNombre = itemCarrito.querySelector(".carrito-titulo").textContent;
    carritoObj[itemNombre].cantidad++;
  } else if (e.target === reducirEl) {
    const itemNombre = itemCarrito.querySelector(".carrito-titulo").textContent;
    carritoObj[itemNombre].cantidad--;
  }
  añadirItems(carritoObj);
};

// añadir carrito
const añadirItems = (Items) => {
  carritoItems.innerHTML = "";
  const element = document.createElement("div");

  Object.values(Items).forEach((Card) => {
    const html = `
    <div class="carrito-general">
      <div class="carrito-content">
        <div class="carrito-item">
          <img src="${Card.img}" alt="img" />
          <div class="carrito-textos">
            <p class="carrito-titulo">${Card.nombre}</p><br>
            <p class="carrito-precio">$<span>${Card.precio}</span></p>
          </div>
        </div>
        <div class="carrito-cantidad">
          <div class="btn-cantidad reducir" >-</div>
          <span>${Card.cantidad}</span>
          <div class="btn-cantidad aumentar" >+</div>
        </div>
      </div>
      <hr class="line" />`;

    element.insertAdjacentHTML("beforeend", html);
  });

  // element.innerHTML = html;
  carritoItems.appendChild(element);

  // Evento de aumentar o reducir
  carritoItems.addEventListener("click", cantidadBtn);
  // Calcular pago
  calcularpago(Items);
};

const obtenerData = (e) => {
  const Card = e.target.closest(".Card");

  const CardObj = {
    img: Card.querySelector("img").getAttribute("src"),
    nombre: Card.querySelector(".card-titulo").textContent,
    precio: Card.querySelector(".card-price span").textContent,
    cantidad: 1,
  };

  if (carritoObj[CardObj.nombre]) {
    carritoObj[CardObj.nombre].cantidad++;
  } else {
    carritoObj[CardObj.nombre] = { ...CardObj };
  }
  añadirItems(carritoObj);
};

// evento para añadir carrito

btnAñdir.forEach((Card) => {
  Card.addEventListener("click", obtenerData);
});

/*-------menu--------*/
document.addEventListener("scroll", function () {
  if (scrollY >= 10) header.classList.add("scrollActive");
  else header.classList.remove("scrollActive"); 
});

btnMenu.addEventListener("click", function () {
  menu.classList.toggle("menuActive");
});
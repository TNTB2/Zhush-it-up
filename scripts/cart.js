document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = `Total: R${total.toFixed(2)}`;
  }

  function renderCart() {
    const cart = getCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceElement.textContent = "Total: R0.00";
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";

      // Build quantity options (e.g. 1-20)
      let optionsHTML = '';
      for (let i = 1; i <= 20; i++) {
        optionsHTML += `<option value="${i}" ${i === item.quantity ? 'selected' : ''}>${i}</option>`;
      }

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="item-info">
          <h4>${item.title}</h4>
          <p>Price: R${item.price}</p>
        </div>
        <div class="item-actions">
          <button class="qty-btn qty-minus" data-index="${index}">−</button>
          <select class="quantity-select" data-index="${index}">
            ${optionsHTML}
          </select>
          <button class="qty-btn qty-plus" data-index="${index}">+</button>
          <button class="remove-btn" data-index="${index}">×</button>
        </div>
      `;
      cartContainer.appendChild(itemDiv);
    });

    updateTotal(cart);
  }

  // Handle click events for remove, plus, minus buttons
  cartContainer.addEventListener("click", (e) => {
    const cart = getCart();

    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    }

    if (e.target.classList.contains("qty-minus")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart(cart);
        renderCart();
      }
    }

    if (e.target.classList.contains("qty-plus")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      if (cart[index].quantity < 20) {
        cart[index].quantity++;
        saveCart(cart);
        renderCart();
      }
    }
  });

  // Handle changes on the dropdown quantity selector
  cartContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("quantity-select")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      const newQty = parseInt(e.target.value);
      const cart = getCart();

      if (newQty >= 1 && newQty <= 20) {
        cart[index].quantity = newQty;
        saveCart(cart);
        updateTotal(cart);
      }
    }
  });

  renderCart();
});

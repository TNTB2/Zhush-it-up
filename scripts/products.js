document.addEventListener("DOMContentLoaded", function () {
  Papa.parse("./data/products.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const productGrid = document.getElementById("productGrid");

      results.data.forEach(product => {
        // Convert review number to stars (1–5)
        const rating = parseInt(product.review);
        let stars = '';
        for (let i = 0; i < 5; i++) {
          stars += i < rating ? '★' : '☆';
        }

        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-overlay">
              <span class="price">R${product.price}</span>
              <button class="add-to-cart" 
                data-title="${product.title}" 
                data-price="${product.price}" 
                data-image="${product.image}">
                Add to Cart
              </button>
            </div>
          </div>
          <h3 class="product-title">${product.title}</h3>
          <div class="star-rating">${stars}</div>
        `;
        productGrid.appendChild(card);
      });

      // Add event listener for Add to Cart buttons
      productGrid.addEventListener("click", function(e) {
        if (e.target.classList.contains("add-to-cart")) {
          const button = e.target;
          const title = button.getAttribute("data-title");
          const price = parseFloat(button.getAttribute("data-price"));
          const image = button.getAttribute("data-image");

          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          const existingItem = cart.find(item => item.title === title);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({ title, price, image, quantity: 1 });
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`Added "${title}" to your cart.`);
        }
      });
    }
  });
});

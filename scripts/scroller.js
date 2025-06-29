document.addEventListener("DOMContentLoaded", function () {
  Papa.parse("./data/products.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const grid = document.getElementById("productScrollerGrid");

      // Manually entered titles (ordered)
      const manualTitles = [
        "Modern Elegance",
        "Urban Vibe",
        "Bold & Chic",
        "Vintage Glam"
      ];

      // Filter products with category containing "scroller"
      const scrollerProducts = results.data.filter(product => {
        if (!product.category) return false;
        return product.category.split(";").map(c => c.trim().toLowerCase()).includes("scroller");
      });

      // Limit to 4 and generate cells
      scrollerProducts.slice(0, 4).forEach((product, index) => {
        const title = manualTitles[index] || "Untitled";

        const cell = document.createElement("div");
        cell.className = "product-scroller-cell";

        cell.innerHTML = `
          <img src="${product.image}" alt="${title}">
          <div class="product-scroller-title-wrapper">
            <div class="title-bg"></div>
            <div class="product-scroller-title">${title}</div>
          </div>
        `;

        grid.appendChild(cell);
      });
    }
  });
});

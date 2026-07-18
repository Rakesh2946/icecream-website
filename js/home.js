/* =========================================================
   Frosty & Co. — home page logic
   ========================================================= */

const FEATURED_IDS = [1, 5, 8, 3]; // best sellers shown on the home page

function renderFeatured(){
  const grid = document.getElementById("featuredGrid");
  if(!grid) return;

  const items = FEATURED_IDS.map(getProductById).filter(Boolean);

  grid.innerHTML = items.map(item => `
    <div class="item-card">
      <div class="item-swatch" style="background:${item.bg};">${item.emoji}</div>
      <h3>${item.name}</h3>
      <div class="desc">${item.desc}</div>
      <div class="item-bottom">
        <span class="item-price">₹${item.price}</span>
        <button class="add-btn" data-id="${item.id}">Add to Cart</button>
      </div>
    </div>
  `).join("");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn");
    if(!btn) return;
    const id = btn.dataset.id;
    addToCart(id, 1);
    showToast("Added to cart 🍦");
  });
}

document.addEventListener("DOMContentLoaded", renderFeatured);

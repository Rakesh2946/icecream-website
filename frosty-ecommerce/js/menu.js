/* =========================================================
   Frosty & Co. — menu page logic
   ========================================================= */

let currentCat = "all";

function renderMenu(){
  const grid = document.getElementById("menuGrid");
  if(!grid) return;

  const items = currentCat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentCat);

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
}

function initMenuPage(){
  const catTabs = document.getElementById("catTabs");
  const grid = document.getElementById("menuGrid");

  catTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".cat-tab");
    if(!tab) return;
    [...catTabs.children].forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentCat = tab.dataset.cat;
    renderMenu();
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn");
    if(!btn) return;
    const id = btn.dataset.id;
    addToCart(id, 1);
    showToast("Added to cart 🍦");
  });

  renderMenu();
}

document.addEventListener("DOMContentLoaded", initMenuPage);

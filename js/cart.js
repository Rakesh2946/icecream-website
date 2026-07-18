/* =========================================================
   Frosty & Co. — cart page logic
   ========================================================= */

function renderCartPage(){
  const container = document.getElementById("cartContent");
  if(!container) return;

  const cart = getCart();
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  if(entries.length === 0){
    container.innerHTML = `
      <div class="cart-empty">
        <div class="big">🍦</div>
        <h3>Your cart is empty</h3>
        <p>Add some scoops from the menu to get started.</p>
        <div style="margin-top:18px;">
          <a href="menu.html" class="btn btn-primary">Browse the Menu</a>
        </div>
      </div>
    `;
    return;
  }

  const rows = entries.map(([id, qty]) => {
    const item = getProductById(id);
    if(!item) return "";
    return `
      <div class="cart-row" data-id="${id}">
        <div class="swatch" style="background:${item.bg};">${item.emoji}</div>
        <div class="info">
          <h4>${item.name}</h4>
          <div class="unit">₹${item.price} each</div>
          <button class="remove-btn" data-action="remove" data-id="${id}">Remove</button>
        </div>
        <div class="qty-controls">
          <button data-action="dec" data-id="${id}">−</button>
          <span>${qty}</span>
          <button data-action="inc" data-id="${id}">+</button>
        </div>
        <div class="row-total">₹${item.price * qty}</div>
      </div>
    `;
  }).join("");

  const subtotal = cartSubtotal();
  const delivery = cartDelivery();
  const total = cartTotal();
  const amountToFree = FREE_DELIVERY_THRESHOLD - subtotal;

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-table">${rows}</div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="sum-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
        <div class="sum-row"><span>Delivery</span><span>${delivery === 0 ? "Free" : "₹" + delivery}</span></div>
        ${amountToFree > 0 ? `<div class="sum-row" style="color:var(--teal-dark);">Add ₹${amountToFree} more for free delivery</div>` : ""}
        <div class="sum-row total"><span>Total</span><span>₹${total}</span></div>
        <a href="checkout.html" class="btn btn-primary" style="text-align:center; margin-top:8px;">Proceed to Checkout</a>
        <a href="menu.html" class="btn btn-secondary" style="text-align:center;">Add More Items</a>
      </div>
    </div>
  `;
}

function initCartPage(){
  const container = document.getElementById("cartContent");

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const cart = getCart();
    const currentQty = cart[id] || 0;

    if(action === "inc") setQty(id, currentQty + 1);
    if(action === "dec") setQty(id, currentQty - 1);
    if(action === "remove") removeFromCart(id);

    renderCartPage();
  });

  renderCartPage();
}

document.addEventListener("DOMContentLoaded", initCartPage);

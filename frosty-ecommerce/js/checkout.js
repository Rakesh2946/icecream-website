/* =========================================================
   Frosty & Co. — checkout page logic
   ========================================================= */

let selectedPayment = "cod";

function renderCheckoutPage(){
  const container = document.getElementById("checkoutContent");
  if(!container) return;

  const cart = getCart();
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  if(entries.length === 0){
    container.innerHTML = `
      <div class="cart-empty">
        <div class="big">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add something from the menu before checking out.</p>
        <div style="margin-top:18px;">
          <a href="menu.html" class="btn btn-primary">Browse the Menu</a>
        </div>
      </div>
    `;
    return;
  }

  const subtotal = cartSubtotal();
  const delivery = cartDelivery();
  const total = cartTotal();

  const summaryRows = entries.map(([id, qty]) => {
    const item = getProductById(id);
    return `<div class="sum-row"><span>${item.name} × ${qty}</span><span>₹${item.price * qty}</span></div>`;
  }).join("");

  container.innerHTML = `
    <div class="checkout-layout">
      <div class="form-card">
        <form id="checkoutForm" novalidate>
          <div class="form-group">
            <label for="custName">Full name</label>
            <input type="text" id="custName" placeholder="Your name">
            <div class="field-error" id="err-custName">Please enter your name.</div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="custPhone">Phone number</label>
              <input type="tel" id="custPhone" placeholder="10-digit mobile number">
              <div class="field-error" id="err-custPhone">Enter a valid 10-digit phone number.</div>
            </div>
            <div class="form-group">
              <label for="custEmail">Email (optional)</label>
              <input type="email" id="custEmail" placeholder="you@example.com">
            </div>
          </div>

          <div class="form-group">
            <label for="custAddress">Delivery address</label>
            <textarea id="custAddress" rows="3" placeholder="House no, street, area, city"></textarea>
            <div class="field-error" id="err-custAddress">Please enter a delivery address.</div>
          </div>

          <div class="form-group">
            <label>Payment method</label>
            <div class="pay-options" id="payOptions">
              <button type="button" class="pay-opt selected" data-pay="cod">Cash on Delivery</button>
              <button type="button" class="pay-opt" data-pay="upi">UPI</button>
              <button type="button" class="pay-opt" data-pay="card">Card</button>
            </div>
          </div>

          <button type="submit" class="btn btn-teal" style="width:100%;">Place Order — ₹${total}</button>
        </form>
      </div>

      <div class="cart-summary">
        <h3>Order Summary</h3>
        ${summaryRows}
        <div class="sum-row" style="border-top:2px dashed var(--line); padding-top:8px; margin-top:4px;">
          <span>Subtotal</span><span>₹${subtotal}</span>
        </div>
        <div class="sum-row"><span>Delivery</span><span>${delivery === 0 ? "Free" : "₹" + delivery}</span></div>
        <div class="sum-row total"><span>Total</span><span>₹${total}</span></div>
      </div>
    </div>
  `;

  initCheckoutForm(total, entries);
}

function initCheckoutForm(total, entries){
  const payOptions = document.getElementById("payOptions");
  selectedPayment = "cod";

  payOptions.addEventListener("click", (e) => {
    const btn = e.target.closest(".pay-opt");
    if(!btn) return;
    [...payOptions.children].forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedPayment = btn.dataset.pay;
  });

  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const address = document.getElementById("custAddress").value.trim();

    let valid = true;

    toggleError("custName", name.length === 0);
    if(name.length === 0) valid = false;

    const phoneValid = /^[0-9]{10}$/.test(phone);
    toggleError("custPhone", !phoneValid);
    if(!phoneValid) valid = false;

    toggleError("custAddress", address.length === 0);
    if(address.length === 0) valid = false;

    if(!valid) return;

    const order = {
      orderId: "FC-" + Math.floor(100000 + Math.random() * 900000),
      name, phone, email, address,
      payment: selectedPayment,
      items: entries.map(([id, qty]) => {
        const item = getProductById(id);
        return { name: item.name, qty, price: item.price };
      }),
      total,
      placedAt: new Date().toISOString(),
    };

    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    clearCart();
    window.location.href = "confirmation.html";
  });
}

function toggleError(fieldId, show){
  const field = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId);
  if(err) err.classList.toggle("show", show);
  if(field) field.style.borderColor = show ? "var(--coral-dark)" : "var(--line)";
}

document.addEventListener("DOMContentLoaded", renderCheckoutPage);

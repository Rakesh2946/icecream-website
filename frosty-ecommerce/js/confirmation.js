/* =========================================================
   Frosty & Co. — confirmation page logic
   ========================================================= */

function renderConfirmation(){
  const container = document.getElementById("confirmationContent");
  if(!container) return;

  const raw = localStorage.getItem(LAST_ORDER_KEY);
  if(!raw){
    container.innerHTML = `
      <div class="cart-empty">
        <div class="big">🍦</div>
        <h3>No recent order found</h3>
        <p>Place an order from the menu to see your confirmation here.</p>
        <div style="margin-top:18px;">
          <a href="menu.html" class="btn btn-primary">Browse the Menu</a>
        </div>
      </div>
    `;
    return;
  }

  const order = JSON.parse(raw);
  const itemRows = order.items.map(i =>
    `<div class="sum-row"><span>${i.name} × ${i.qty}</span><span>₹${i.price * i.qty}</span></div>`
  ).join("");

  const paymentLabel = order.payment === "cod" ? "Cash on Delivery" : order.payment.toUpperCase();

  container.innerHTML = `
    <div class="confirm-box">
      <div class="confirm-icon">✓</div>
      <h2>Order placed, ${order.name.split(" ")[0]}!</h2>
      <p style="color:var(--ink-soft); margin-top:8px;">Your scoops are being packed and will be on their way shortly.</p>
      <div class="order-id">Order ID: ${order.orderId}</div>

      <div class="confirm-summary">
        ${itemRows}
        <div class="sum-row total" style="margin-top:8px;"><span>Total paid</span><span>₹${order.total}</span></div>
        <div class="sum-row"><span>Payment method</span><span>${paymentLabel}</span></div>
        <div class="sum-row"><span>Delivering to</span><span style="text-align:right; max-width:220px;">${order.address}</span></div>
        <div class="sum-row"><span>Estimated delivery</span><span>45 mins</span></div>
      </div>

      <a href="menu.html" class="btn btn-primary">Order Again</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderConfirmation);

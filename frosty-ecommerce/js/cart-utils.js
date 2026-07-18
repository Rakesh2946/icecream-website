/* =========================================================
   Frosty & Co. — cart utilities
   Cart is stored in localStorage as { "<productId>": qty, ... }
   Requires products.js to be loaded first.
   ========================================================= */

const CART_KEY = "frosty_cart";
const LAST_ORDER_KEY = "frosty_last_order";

function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    return {};
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty = 1){
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
}

function setQty(id, qty){
  const cart = getCart();
  if(qty <= 0){
    delete cart[id];
  }else{
    cart[id] = qty;
  }
  saveCart(cart);
}

function removeFromCart(id){
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}

function clearCart(){
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartCount(){
  const cart = getCart();
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function cartSubtotal(){
  const cart = getCart();
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = getProductById(id);
    return sum + (product ? product.price * qty : 0);
  }, 0);
}

function cartDelivery(){
  const subtotal = cartSubtotal();
  if(subtotal === 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

function cartTotal(){
  return cartSubtotal() + cartDelivery();
}

/* Updates the little badge on the cart icon — call on every page load */
function updateCartBadge(){
  const badge = document.getElementById("cartBadge");
  if(!badge) return;
  const count = cartCount();
  if(count > 0){
    badge.textContent = count;
    badge.classList.remove("hidden");
  }else{
    badge.classList.add("hidden");
  }
}

/* Small toast notification, reused across pages.
   Expects a <div class="toast" id="toast"></div> somewhere in the page. */
function showToast(message){
  const toast = document.getElementById("toast");
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

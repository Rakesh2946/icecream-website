# Frosty & Co. — Ice Cream E-commerce (HTML/CSS/JS only)

A multi-page ice cream ordering website built with plain HTML, CSS, and
vanilla JavaScript — no frameworks, no build tools, no backend required.

## How to run it

Just open `index.html` in any browser (double-click it, or right-click →
"Open with" your browser). Every page links to the others with normal
relative links, so the whole site works straight off your file system.

## Folder structure

```
frosty-ecommerce/
├── index.html          Home page (hero + best sellers)
├── menu.html            Full menu with category filters
├── cart.html             Cart page (view/update/remove items)
├── checkout.html         Checkout form (name, phone, address, payment)
├── confirmation.html     Order confirmation with order ID
├── contact.html          Contact form + store details
├── css/
│   └── style.css         Shared stylesheet for every page
└── js/
    ├── products.js       Product catalog (id, name, price, category...)
    ├── cart-utils.js      Cart logic shared by every page (localStorage)
    ├── home.js            Home page logic
    ├── menu.js             Menu page logic
    ├── cart.js              Cart page logic
    ├── checkout.js          Checkout form + order placement
    ├── confirmation.js       Confirmation page logic
    └── contact.js             Contact form logic
```

## How the cart works

The cart is stored in the browser's `localStorage` under the key
`frosty_cart`, as a simple object like `{ "1": 2, "5": 1 }` (product ID →
quantity). Because it's `localStorage` and not just page memory, your cart
survives page reloads and moving between pages — but it's specific to your
browser on your device, and clears if you clear site data.

`js/cart-utils.js` is loaded on every page and exposes:
- `addToCart(id, qty)`
- `setQty(id, qty)`
- `removeFromCart(id)`
- `clearCart()`
- `cartCount()`, `cartSubtotal()`, `cartDelivery()`, `cartTotal()`
- `updateCartBadge()` — keeps the header cart icon count in sync

## Editing the menu / prices

All products live in one place: `js/products.js`. Each entry looks like:

```js
{ id:1, name:"Mint Chip Chaos", desc:"Cool mint with dark chocolate shards.",
  price:129, cat:"cups", emoji:"🍃", bg:"#CFF3E4" }
```

Add, remove, or edit entries there and every page (home, menu, cart,
checkout, confirmation) picks up the change automatically.

Delivery pricing (`DELIVERY_FEE` and `FREE_DELIVERY_THRESHOLD`) is also in
`js/products.js`.

## Important note on checkout

This is a **demo storefront**. The checkout flow collects name, phone,
address, and a chosen payment method, generates an order ID, and shows a
confirmation page — but it does **not** process real payments or send the
order anywhere. To take real orders and real payments you'd need to add:

- A backend (Node/Express, PHP, etc.) or a service like Firebase to store orders
- A real payment gateway (Razorpay, Stripe, PayPal, etc.) for card/UPI payments
- Order/email notifications to the shop and the customer

Happy to help wire any of that up if you want to take this further.

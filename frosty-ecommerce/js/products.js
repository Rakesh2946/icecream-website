/* =========================================================
   Frosty & Co. — product catalog
   Shared by menu.js, home.js, cart.js, checkout.js
   ========================================================= */

const PRODUCTS = [
  { id:1,  name:"Mint Chip Chaos",              desc:"Cool mint with dark chocolate shards.",        price:129, cat:"cups",  emoji:"🍃", bg:"#CFF3E4" },
  { id:2,  name:"Strawberry Roast",             desc:"Roasted strawberries folded into cream.",      price:139, cat:"cups",  emoji:"🍓", bg:"#FFD9DE" },
  { id:3,  name:"Butter Toffee Crunch",         desc:"Salted toffee bits throughout.",                price:149, cat:"cups",  emoji:"🧈", bg:"#FFEBC2" },
  { id:4,  name:"Belgian Chocolate",            desc:"Rich 70% dark chocolate ice cream.",            price:139, cat:"cups",  emoji:"🍫", bg:"#E4CBB5" },
  { id:5,  name:"Mint Chip Chaos Tub (500ml)",  desc:"Family-size tub of our best seller.",           price:399, cat:"tubs",  emoji:"🍃", bg:"#CFF3E4" },
  { id:6,  name:"Strawberry Roast Tub (500ml)", desc:"Family-size tub, ready to share.",              price:419, cat:"tubs",  emoji:"🍓", bg:"#FFD9DE" },
  { id:7,  name:"Cookie Dough Riot Tub (500ml)",desc:"Loaded with chunky cookie dough.",              price:449, cat:"tubs",  emoji:"🍪", bg:"#EAD9C2" },
  { id:8,  name:"Classic Hot Fudge Sundae",     desc:"Three scoops, hot fudge, whipped cream.",       price:219, cat:"sundae",emoji:"🍨", bg:"#FFE1D6" },
  { id:9,  name:"Oreo Shake",                   desc:"Blended cookies & cream, tall glass.",          price:189, cat:"sundae",emoji:"🥤", bg:"#E7E1F5" },
  { id:10, name:"Mango Sorbet Cup",             desc:"Dairy-free, made with real mango.",             price:119, cat:"cups",  emoji:"🥭", bg:"#FFE9B0" },
  { id:11, name:"Ube Sunset",                   desc:"Purple yam ice cream, sweet & nutty.",          price:159, cat:"cups",  emoji:"💜", bg:"#E7D3F0" },
  { id:12, name:"Banana Split Sundae",          desc:"Three flavors, banana, nuts, cherry on top.",   price:239, cat:"sundae",emoji:"🍌", bg:"#FFF3C4" },
];

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 399;

function getProductById(id){
  return PRODUCTS.find(p => p.id === Number(id));
}

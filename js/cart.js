const cartListElement = document.querySelector(".cart-list");
const favsElement = document.querySelector(".favs");
const priceElement = document.querySelector(".price");

var cart = JSON.parse(localStorage.getItem("cart"));
var favs = JSON.parse(localStorage.getItem("favs"));

function drawCartItems(cartItems) {
  var price = 0;
  var cartHTML = cartItems
    .map((item) => {
      price = price + item.price * item.count;
      return `<div class="cart-item">
    <img src="../images/${item.image}" alt="">
    <div class="content">
        <div class="cart-info">
            <div class="name">
                <span>${item.name}</span>
            </div>
            <div class="price">
                <span>Price:  ${item.price} $</span>
            </div>
            <div class="category">
                <span>Category: ${item.category}</span>
            </div>
        </div>
        <div class="cart-action">
            <span class="count"> ${item.count}</span>
            <span class="plus" onclick="increaseByOne(event,${item.id})">+</span>
            <span class="minus"  onclick="decreaseByOne(event,${item.id})">&#8722</span>
            <button  type="button" onclick="removeFromCart(event,${item.id})" class="btn btn-danger remove">Remove</button>
        </div>
    </div>
</div>`;
    })
    .join("");
  priceElement.innerHTML = `${price} $`;
  cartListElement.innerHTML = cartHTML;
}

function drawPrice(items) {
  var price = 0;
  for (item of items) {
    price = item.price * item.count + price;
  }
  priceElement.innerHTML = `${price} $`;
}

function drawFavsHTML() {
  var favsHTML = favs
    .map((item) => {
      return `<div class="fav-item">
      <img src="../images/${item.image}" alt="">
      <div class="product-name">
      <span>Product: </span>
      <span class="name">${item.name}</span>
  </div>
  <div class="product-category">
      <span>Category: </span>
      <span class="category">${item.category}</span>
  </div>
  <i class="fa fa-heart" onclick="unFav(event,${item.id})" style="font-size:24px"></i>

  </div>`;
    })
    .join("");
  favsElement.innerHTML = favsHTML;
}

function removeFromCart(e, id) {
  cart = cart.filter((item) => item.id != id);
  localStorage.setItem("cart", JSON.stringify(cart));
  drawCartItems(cart);
}

function increaseByOne(event, id) {
  const product = cart.find((item) => item.id == id);
  product.count++;
  localStorage.setItem("cart", JSON.stringify(cart));
  event.target.parentElement.children[0].innerHTML = product.count;
  drawPrice(cart);
}
function decreaseByOne(event, id) {
  const product = cart.find((item) => item.id == id);
  if (product.count > 1) {
    product.count--;
    localStorage.setItem("cart", JSON.stringify(cart));
    event.target.parentElement.children[0].innerHTML = product.count;
    drawPrice(cart);
  }
}

function unFav(event, id) {
  event.target.parentElement.remove();
  favs = favs.filter((item) => item.id != id);
  localStorage.setItem("favs", JSON.stringify(favs));
}

window.onload = (e) => {
  drawCartItems(cart);
  drawFavsHTML();
};

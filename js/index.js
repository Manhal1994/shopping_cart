let products = [
  {
    id: 1,
    name: "T-Shirt",
    image: "side_shirt.jpg",
    price: "320",
    category: "T-shirt",
    liked: false,
    count: 0,
  },
  {
    id: 2,
    name: "Jacket",
    image: "jacket.jpg",
    price: "70",
    category: "jackets",
    liked: false,
    count: 0,
  },
  {
    id: 3,
    name: "Pjama",
    image: "sport.jpg",
    price: "40",
    category: "Sport",
    liked: false,
    count: 0,
  },
  {
    id: 4,
    name: "jenz",
    image: "jeans.jpeg",
    price: "120",
    category: "pans",
    liked: false,
    count: 0,
  },
  {
    id: 5,
    name: "short",
    image: "short.jpg",
    price: "13",
    category: "pans",
    liked: false,
    count: 0,
  },
  {
    id: 6,
    name: "shoes",
    image: "shoes.png",
    price: "21",
    category: "Sport",
    liked: false,
    count: 0,
  },
];

const productsElement = document.querySelector(".products");
const cartProducts = document.querySelector(".cart-products");
const badge = document.querySelector(".badge");
const minus = document.querySelector(".minus");
const cartIcon = document.querySelector(".cart-icon");
const categoriesFilter = document.querySelector("#categories-filter");
const logout = document.querySelector(".logout");

let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let favs = localStorage.getItem("favs")
  ? JSON.parse(localStorage.getItem("favs"))
  : [];

function drawUI(productList) {
  let productsHTML = productList
    .map(({ id, name, price, category, count, image, liked }) => {
      return `<div class="product_item card bg" style="width: 18rem;">
      <img class="card-img-top" src="./images/${image}" alt="Card image cap">
      <div class="cart-body">
          <div class="name">
              <span>Product: ${name}</span>
          </div>
          <div class="price">
              <span>Price:  ${price} $</span>
          </div>
          <div class="category">
              <span>Category: ${category}</span>
          </div>
          <a class="btn ${
            count < 1 ? "btn-primary" : "btn-danger"
          }  mt-1 add-item" onclick="addItem(event,${id})">${
        count > 0 ? "Remove from cart" : "Add to cart"
      }</a>
  
      </div>
      <i class="fa fa-heart" style="color:${
        liked ? "red" : "grey"
      }" onclick="like(event,${id})" style="font-size:24px"></i>
  
    </div>`;
    })
    .join("");
  productsElement.innerHTML = productsHTML;
}

window.onload = (e) => {
  badge.innerHTML = cart.length > 0 ? cart.length : "";
  products.forEach((product) => {
    cart.forEach((item) => {
      if (product.id == item.id) {
        product.count = item.count;
      }
    });
  });
  products.forEach((product) => {
    favs.forEach((item) => {
      if (product.id == item.id) {
        product.liked = item.liked;
      }
    });
  });
  if (!isLogin()) {
    document.querySelector(".sign").style.display = "none";
    document.querySelector(".cart-icon").style.color = "none";
    document.querySelector(".sign").style.display = "block";
    document.querySelector(".logout").style.display = "none";
    cartIcon.style.display = "none";
  } else {
    const name = localStorage.getItem("fname");
    document.querySelector(".username").innerHTML = name ?? "ll";
    document.querySelector(".sign").style.display = "block";
    document.querySelector(".cart-icon").style.color = "block";
    document.querySelector(".sign").style.display = "none";
    document.querySelector(".logout").style.display = "block";
  }
  drawUI(products);
  drawCartItem();
};

// check auth state
function isLogin() {
  return localStorage.getItem("email");
}

// Add  item to cart
function addItem(event, id) {
  if (isLogin()) {
    const product = products.find((item) => item.id === id);
    let inCart = false;
    for (let item of cart) {
      if (item.id === id) {
        inCart = true;
      }
    }
    if (!inCart) {
      product.count++;
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      drawCartItem();

      event.target.classList.remove("btn-primary");
      event.target.classList.add("btn-danger");
      event.target.innerHTML = "Remove from cart";
    } else {
      product.count = 0;
      cart = cart.filter((item) => item.id !== id);
      document.querySelector(`#cart-item-${id}`).style.display = "none";
      event.target.classList.add("btn-primary");
      event.target.classList.remove("btn-danger");
      event.target.innerHTML = "Add to cart";
    }
    badge.innerHTML = cart.length;
    if (cart.length > 0) {
      badge.style.display = "block";
    } else {
      badge.style.display = "none";
    }
  } else {
    location.href = "./pages/login.html";
  }
}

// draw cart items
function drawCartItem() {
  cartProducts.innerHTML =
    cart
      .map((item) => {
        return `<li class="cart-item" id="cart-item-${item.id}""><span class="title">${item.name}</span>
<div class="counter">
    <span class="count" id="count-${item.id}">${item.count}</span>
    <span class="plus" onclick="increaseOnce(${item.id})" product-id="${item.id}">+</span>
    <span class="minus" onclick="decrease(${item.id})">-</span>

</div>
</li>`;
      })
      .join("") +
    `<a href="#" onclick="toCart()" class="view-all">View all products</a>`;
}

// increase product amount by one
function increaseOnce(id) {
  const product = products.find((item) => item.id == id);
  product.count++;
  const itemCountEl = document.getElementById(`count-${id}`);
  itemCountEl.innerHTML = product.count;
  cart = cart.filter((item) => item.id != id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}
// decrase product count by one
function decrease(id) {
  if (product.count > 0) {
    const product = products.find((item) => item.id == id);
    product.count--;
    const itemCountEl = document.getElementById(`count-${id}`);
    itemCountEl.innerHTML = product.count;
    cart = cart.filter((item) => item.id != id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
// add product to favourites
function like(event, id) {
  if (isLogin()) {
    const product = products.find((item) => item.id == id);
    if (!product.liked) {
      product.liked = !product.liked;
      favs.push(product);
      event.target.style.color = "red";

      localStorage.setItem("favs", JSON.stringify(favs));
    } else {
      favs = favs.filter((item) => item.id != id);
      event.target.style.color = "grey";
      localStorage.setItem("favs", JSON.stringify(favs));
    }
  } else {
    location.href = "./pages/login.html";
  }
}
// fill ui by product categories
function assignCategories() {
  let categoriesHTML = "<option value=-1>Select a category</option>";
  categoriesHTML =
    categoriesHTML +
    products
      .map((item) => {
        return `<option value="${item.category}">${item.category}</option>`;
      })
      .join("");
  categoriesFilter.innerHTML = categoriesHTML;
}

assignCategories();

function toCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem(
    "favs",
    JSON.stringify(products.filter((item) => item.liked))
  );

  window.location = "./pages/cart.html";
}
// filter products by by name and category
function search(event) {
  setTimeout(() => {
    const categoryId = document.getElementById("categories-filter").value;

    const result = products.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase().trim()) &&
        item.category == (categoryId == "-1" ? item.category : categoryId)
    );

    drawUI(result);
  }, 0.5);
}
// filter products by by catgory and name

function filterCategory(event) {
  const text = document.getElementById("inputSearch").value;
  const category = event.target.value;
  console.log(category);
  const result = products.filter(
    (item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) &&
      item.category === category
  );
  drawUI(result);
}

// close the cart pop up menu

cartIcon.addEventListener("click", () => {
  if (isLogin()) {
    cartProducts.style.display =
      cartProducts.style.display === "block" ? "none" : "block";
  } else {
    location.href = "./pages/login.html";
  }
});

logout.addEventListener("click", () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("favs");
  location.reload();
});

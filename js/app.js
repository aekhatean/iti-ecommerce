/**
 * Fetching products from JSON file and embedding it to the UI.
 */
const categoriesFilter = document.getElementById("categories-filter");
const productsGrid = document.getElementById("products-grid");

function getFilters() {
  let queriedProductTitle = "",
    queriedCategories = [],
    queriedMaxPrice = 0;

  const searchQuery = location.search;
  if (searchQuery) {
    const searchTerms = searchQuery.split("&");
    for (const term of searchTerms) {
      const termType = term.split("=")[0];
      const termValue = term
        .split("=")[1]
        .replace(/\+/g, " ")
        .replace(/\%27/, "'");

      switch (termType) {
        case "category":
          queriedCategories.push(termValue);
          break;

        case "?search":
          queriedProductTitle = termValue;
          break;

        case "priceRange":
          queriedMaxPrice = parseInt(termValue);
          break;

        default:
          break;
      }
    }
  }
  return [queriedProductTitle, queriedCategories, queriedMaxPrice];
}

function createProductNode(id, image, title, price, rating) {
  const item = document.createElement("div");
  item.innerHTML = `
      <div class ="grid-item" key="${id}">
        <img class="products-img" src="${image}"/>
        <p class="products-title fs-300">
          ${title.length > 40 ? title.substr(0, 40) + ".. " : title}</p>
        <div class="products-price-rating flex">
          <p class="products-price fs-400">
            <b>${price}</b>$
          </p>
          <p class="products-rating flex fs-400">
            ${rating.rate}
            <img src="../assets/Filled_star.png" />
          </p>
        </div>
        <button class="products-add-to-cart" onclick="addToCart(this)">Add to cart</button>
      </div>`;
  return item;
}

function filterProducts(productsData) {
  // Get query paramaeters to tell if a user visit this page through search or direct url,
  // and if it is a search, what are they searching for
  const [queriedProductTitle, queriedCategories, queriedMaxPrice] =
    getFilters();

  // If user searched for a name find it
  // console.log(queriedProductTitle);
  if (queriedProductTitle.length > 0) {
    productsData = productsData.filter((product) =>
      product.title.toLowerCase().includes(queriedProductTitle.toLowerCase())
    );
  }

  // If user applied a filter to select specific categories, only return these categories
  if (queriedCategories.length > 0) {
    productsData = productsData.filter(
      (product) => queriedCategories.indexOf(product.category) > -1
    );
  }

  // If user applied a filter to select max price, only return products with this price or above
  if (queriedMaxPrice > 0) {
    productsData = productsData.filter(
      (product) => parseFloat(product.price) >= parseFloat(queriedMaxPrice)
    );
  }

  return productsData;
}

function displayProducts() {
  // Get unfiltered data from JSON products file
  fetch("../api/products.json")
    .then((res) => res.json())
    .then((productsData) => filterProducts(productsData))
    .then((filteredProducts) =>
      filteredProducts.map((product) => {
        const { id, image, title, price, rating, category } = product;
        if (location.href.indexOf("products.html") > -1) {
          productsGrid.appendChild(
            createProductNode(id, image, title, price, rating)
          );
        }
      })
    );
}

// cart page
let cartProducts = JSON.parse(localStorage.getItem("userCart")) || Array();
function addToCart(purchaseButton) {
  const productId = purchaseButton.parentNode.attributes.key.value;
  const productCount = 1;
  const PurchasedProduct = {
    id: productId,
    count: productCount,
  };
  cartProducts.push(PurchasedProduct);
  if (cartProducts.length > 0) {
    localStorage.setItem("userCart", JSON.stringify(cartProducts));
  }
}

// Show cart products on cart page load
const visibleCartProducts = document.getElementById("cart-products-section");

const proceedBtn = document.createElement("div");
proceedBtn.innerHTML =
  '<a id="cart-proceed" href="checkout.html">Proceed To Checkout</a>';

// Prevent user from entering non-numbers to counter
function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === "paste") {
    key = evt.clipboardData.getData("text/plain");
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

function updateCount(event, id) {
  const value = event.target.value;
  const cartProducts = JSON.parse(localStorage.getItem("userCart"));
  for (productIndex in cartProducts) {
    if (parseInt(cartProducts[productIndex].id) == id) {
      cartProducts[productIndex].count = parseInt(value);
      localStorage.setItem("userCart", JSON.stringify(cartProducts));
    }
  }
}

function removeFromCart(event, id) {
  const cartProducts = JSON.parse(localStorage.getItem("userCart"));
  for (productIndex in cartProducts) {
    if (parseInt(cartProducts[productIndex].id) == id) {
      cartProducts.splice(productIndex, 1);
      localStorage.setItem("userCart", JSON.stringify(cartProducts));
    }
  }
  event.target.parentNode.remove();
}

// Show cart products when user visits cart page
function showCart() {
  let currentCart = JSON.parse(localStorage.getItem("userCart"));

  for (purchase in currentCart) {
    // To get the keys of the current products in user's cart
    const productIndex = parseInt(currentCart[purchase].id) - 1;

    // To get products data from products JSON file
    fetch("../api/products.json")
      .then((res) => res.json())
      .then((data) => {
        let product = data[productIndex];

        // get count of every product from local storage
        // I DO NOT THINK IT IS THE OPTIMUM METHOD, If you have a better solution implement it.
        let count = 0;
        for (cartItem in currentCart) {
          if (currentCart[cartItem].id == data[productIndex].id) {
            count = currentCart[cartItem].count;
          }
        }

        // Create UI that wraps this data in cart.html page as an order summary UI.
        const item = document.createElement("div");
        item.innerHTML = `
        <div class ="cart-product-card grid" key="${product.id}">
        <img class="cart-product-img" src="${product.image}"/>
        <b class="cart-product-title fs-300">${
          product.title.length > 40
            ? product.title.substr(0, 40) + ".. "
            : product.title
        }</b>
        <p class="cart-product-price fs-400">Price: <b>${product.price}</b>$</p>
        <div class="cart-counter">
          <input type="number"
            is="decimal-input"
            min="1"
            max="99"
            step="1"
            pattern="[1-9]"
            onkeypress="validate(event)"
            onchange="updateCount(event, ${product.id})"
            value="${count}"
            class="counter-input" />
        </div>

        <p class="cart-product-total">Total: <b>${
          product.price * count
        }</b>$</p>
        </div>
        <button class="cart-remove-product"
        onclick="removeFromCart(event, ${product.id})"
        >Remove from cart</button>
              <hr />`;
        if (location.href.indexOf("cart.html") > -1)
          visibleCartProducts.appendChild(item);

        // Embed proceed to checkout after the loop over products end
        visibleCartProducts.appendChild(proceedBtn);
      });
  }
}

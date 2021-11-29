/**
 * Fetching products from JSON file and embedding it to the UI.
 */
const productsGrid = document.getElementById("products-grid");

fetch("../api/products.json")
  .then((res) => res.json())
  .then((productsData) =>
    productsData.map((product) => {
      //   console.log(product);
      const item = document.createElement("div");
      item.innerHTML = `
    <div class ="grid-item" key="${product.id}">
    <img class="products-img" src="${product.image}"/>
      <p class="products-title fs-300">${
        product.title.length > 40
          ? product.title.substr(0, 40) + ".. "
          : product.title
      }</p>
      <div class="products-price-rating flex">
          <p class="products-price fs-400"><b>${product.price}</b>$</p>
          <p class="products-rating flex fs-400">${
            product.rating.rate
          }<img src="../assets/Filled_star.png" /></p>
      </div>
      <button class="products-add-to-cart" onclick="addToCart(this)">Add to cart</button>
    </div>`;
      if (location.href.indexOf("products.html") > -1)
        productsGrid.appendChild(item);
    })
  );

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
  console.log(cartProducts);
}

// Show cart products on cart page load
const visibleCartProducts = document.getElementById("cart-products-section");

const proceedBtn = document.createElement("div");
proceedBtn.innerHTML =
  '<a id="cart-proceed" href="checkout.html">Proceed To Checkout</a>';

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
        <p class="cart-product-count flex fs-400">count: <b>${count}</b></p>
        <p class="cart-product-total">Total: <b>${
          product.price * count
        }</b>$</p>
        </div>
              <hr />`;
        if (location.href.indexOf("cart.html") > -1)
          visibleCartProducts.appendChild(item);

        // Embed proceed to checkout after the loop over products end
        visibleCartProducts.appendChild(proceedBtn);
      });
  }
}

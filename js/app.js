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
const cartProducts = Array();
function addToCart(purchaseButton) {
  const productId = purchaseButton.parentNode.attributes.key.value;
  const productCount = 3;
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
  console.log(currentCart);
  for (purchase in currentCart) {
    const productIndex = parseInt(currentCart[purchase].id);
    // console.log(productIndex);
    fetch("../api/products.json")
      .then((res) => res.json())
      .then((data) => {
        let product = data[productIndex];
        let count =
          data[productIndex].id - 1 === parseInt(currentCart[purchase].id)
            ? currentCart[purchase].count
            : 1;
        // console.log(parseInt(currentCart[purchase].id));
        // console.log(data[productIndex].id - 1);
        //Very bad performance, preferably store products data in full instead
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
        <p class="cart-product-count flex fs-400">count :${count}</p>
        <p class="cart-product-total">Total: <b>${product.price}</b>$</p>
        </div>
              <hr />`;
        if (location.href.indexOf("cart.html") > -1)
          visibleCartProducts.appendChild(item);
        visibleCartProducts.appendChild(proceedBtn);
      });
  }
}

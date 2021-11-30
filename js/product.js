/**Global variables */
var home_product = document.getElementById("products-grid");
var product_image = document.getElementsByClassName("product-page-image")[0];
var product_title = document.getElementsByClassName("products-title")[0];
var product_category = document.getElementsByClassName(
  "product-page-category"
)[0];

var product_count = document.getElementsByClassName("product-page-count")[0];

var product_rate = document.getElementsByClassName("product-rating")[0];
var product_price = document.getElementsByClassName("products-price")[0];

var add_product_form = document.getElementById("add_to_cart_form");
var product_description = document.getElementsByClassName(
  "product-description"
)[1];

var cartBtn = document.getElementById("add_cart_btn");

let cartProducts = JSON.parse(localStorage.getItem("userCart")) || Array();

//fetch data by id

window.onload = function () {
  var id = window.location.search.split("=")[1];
  getProduct(parseInt(id));
};

function getProduct(id) {
  fetch("../api/products.json")
    .then((response) => response.json())
    .then((data) => {
      var product =
        data[Object.keys(data).filter((key) => data[key].id === id)[0]];
      product_title.innerHTML = product.title;
      product_image.src = product.image;
      product_price.innerHTML = "<b>Price: " + product.price + " $</b>";
      product_rate.innerHTML =
        "<b>Rating: </b> " +
        product.rating.rate +
        "<img src='../assets/Filled_star.png'/>";
      product_count.innerHTML = "<b>In Stock: </b>" + product.rating.count;
      product_category.innerHTML = "<b>Category: </b>" + product.category;
      product_description.innerHTML = product.description;
      cartBtn.setAttribute("key", id);
    });
}

/** Fetch Product data* */

fetch("../api/products.json")
  .then((response) => response.json())
  .then((data) => {
    for (p in data) {
      if (document.getElementsByClassName("grid-item").length < 4) {
        //create class grid-item div
        var grid_item = document.createElement("div");
        grid_item.classList.add("grid-item");

        //create class product-image img
        var product_img = document.createElement("img");
        product_img.classList.add("products-img");
        product_img.src = data[p].image;

        //create class product_info div
        var product_info = document.createElement("div");
        product_info.classList.add("product_info");
        //create price and rate div
        var price_rate = document.createElement("div");
        price_rate.classList.add("products-price-rating");
        price_rate.classList.add("flex");

        //create p title
        var title_p = document.createElement("a");
        title_p.href = "./product.html?id=" + data[p].id;
        title_p.classList.add("products-title");
        title_p.classList.add("fs-300");
        title_p.innerHTML = data[p].title;

        //create p price
        var price_p = document.createElement("p");
        price_p.classList.add("products-price");
        price_p.classList.add("fs-400");
        price_p.innerHTML = "<b>" + data[p].price + "</b>$";
        price_rate.appendChild(price_p);
        //create p rate
        var rate_p = document.createElement("p");
        rate_p.classList.add("products-rating");
        rate_p.classList.add("flex");
        rate_p.classList.add("fs-400");

        rate_p.innerHTML =
          data[p].rating.rate + "<img src='../assets/Filled_star.png'/>";
        price_rate.appendChild(rate_p);

        //create class add_to_basket_btn bg-light button
        var add_to_cart_btn = document.createElement("button");
        add_to_cart_btn.classList.add("products-add-to-cart");
        add_to_cart_btn.classList.add("bg-light");
        add_to_cart_btn.innerHTML = "Add To Cart";
        add_to_cart_btn.setAttribute("key", data[p].id);

        add_to_cart_btn.setAttribute("onclick", "addToCart(this)");

        //apending
        home_product.appendChild(grid_item);
        grid_item.appendChild(product_img);
        //grid_item.appendChild(product_info);
        grid_item.appendChild(title_p);
        grid_item.appendChild(price_rate);
        grid_item.appendChild(add_to_cart_btn);
      }
    }
  });

//add to cart handle

// add_product_form.onsubmit(function (ele) {
//   event.preventDefault();
//   console.log(ele);
// });
function addToCart(purchaseForm) {
  event.preventDefault();
  const id = purchaseForm.childNodes[1].attributes.key.value;
  const productCount = purchaseForm.childNodes[3].value;
  const PurchasedProduct = {
    id: id,
    count: productCount,
  };
  cartProducts.push(PurchasedProduct);
  if (cartProducts.length > 0) {
    localStorage.setItem("userCart", JSON.stringify(cartProducts));
  }
  console.log(purchaseForm.childNodes[3].value);
}

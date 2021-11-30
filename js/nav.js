//rendering nav bar

const nav = document.getElementById("nav");
nav.innerHTML = ` <div id="nav-logo">Bee🐝</div>
<div id="nav-list">
  <img
    onclick="showNav()"
    onblur="hideNav()"
    class="hide"
    src="../assets/nav_list.svg"
    alt="nav_list"
  />
  <div id="nav-links" class="">
    <a href="./home.html">Home</a>

    <a href="./products.html">Products</a>

    <a href="#about">About us</a>

    <a href="./products.html" class="flexing-row"
      ><span>Search</span>
      <img
        class="icon"
        src="../assets/search.svg"
        alt="nav_icon_search"
      />
    </a>

    <a href="./cart.html" class="flexing-row">
      <span>Cart</span>
      <img class="icon" src="../assets/cart.svg" alt="nav_icon_cart" />
      <span id="cart_count">0</span>
    </a>

    <a id="nav-signin" href="./signin.html">
      <span id="authed-username">Please Sign in</span></a
    >
  </div>
</div>`;

const footer = document.getElementById("footer");
footer.innerHTML = `<div id="about">
<h3>Bee🐝</h3>
<span
  >@copyright ITI-Intensive Program 2021-2022 Q2 Menia Branch
</span>
<span>Full Stack Development using Python</span>
<span>Group 1 Team 7</span>
</div>
<div id="footer-links">
<a href="./home.html">Home</a>

<a href="./products.html">Products</a>
</div>`;
//navbar handling

function showNav() {
  document.getElementById("nav-links").style.display = "flex";
}
function hideNav() {
  setTimeout(hide, 3000);
}

function hide() {
  document.getElementsByClassName("hide")[0].style.visibilty = "visible";
  document.getElementById("nav-links").style.display = "none";
}

//username

const nav_username = document.getElementById("authed-username");
function displayUser() {
  var user = localStorage.getItem("user");

  if (!user) {
    nav_username.innerHTML = "Please Sign in!";
  } else if (user) {
    let logout = document.createElement("span");
    logout.innerHTML = "Logout";
    logout.addEventListener("click", () => {
      nav_username.innerHTML = "Please Sign in!";
    });
    nav_username.innerHTML = user.split(",")[0];
    nav_username.appendChild(logout);
  }
}

//handle cart notification
let cart_count = 0;

const handleCartNotification = () => {
  const counter_span = document.getElementById("cart_count");

  let counting_array = [];
  JSON.parse(localStorage.getItem("userCart")).map((item) =>
    counting_array.push(parseInt(item.count))
  );
  cart_count = counting_array.reduce((a, b) => a + b, 0);
  console.log(cart_count);
  counter_span.innerText = cart_count;
};

handleCartNotification();

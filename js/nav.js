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

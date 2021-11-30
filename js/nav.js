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
    if (localStorage.getItem("currentUser")) {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        let logout = document.createElement("span");
        logout.innerHTML = "  Logout";
        logout.addEventListener("click", () => {

            localStorage.removeItem("currentUser")
        });
        nav_username.innerHTML = user[0].Username + "    ";
        nav_username.appendChild(logout);
    } else {
        nav_username.innerHTML = "Please Sign in!";
    }
}
displayUser();
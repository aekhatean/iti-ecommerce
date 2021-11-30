var F_name = document.getElementById("F_name");
var L_name = document.getElementById("L_name");
var Username = document.getElementById("Username");
var Phone = document.getElementById("Phone");
var City = document.getElementById("City");
var Street = document.getElementById("Street");
var Email = document.getElementById("Email");
var Password = document.getElementById("Password");
////////////////////////////////put patterns

L_name.oninvalid = function (event) {
  event.target.setCustomValidity(
    "last name should only contain  letters only and length more than 3"
  );
};
Username.oninvalid = function (event) {
  event.target.setCustomValidity(
    "Username should only contain lowercase letters. e.g. john"
  );
};
Phone.oninvalid = function (event) {
  event.target.setCustomValidity(
    "phone number should only contain numbers length is = 11 number . e.g. john"
  );
};
City.oninvalid = function (event) {
  event.target.setCustomValidity(
    "Cith should only contain  letters only and length more than 3"
  );
};
Street.oninvalid = function (event) {
  event.target.setCustomValidity(
    "Street should only contain  letters only and length more than 3"
  );
};
Email.oninvalid = function (event) {
  event.target.setCustomValidity("Email should  contain @");
};
Password.oninvalid = function (event) {
  event.target.setCustomValidity(
    "pass word should be more than 6 numbers and chars"
  );
};

function submmition() {
  localStorage.setItem("user", [
    document.getElementById("F_name").value,
    document.getElementById("L-name").value,
    document.getElementById("Username").value,
    document.getElementById("Phone").value,
    document.getElementById("City").value,
    document.getElementById("Email").value,
    document.getElementById("Password").value,
  ]);
}

/////////////////////////////////sign in check if user found in local storage  ////////////

function chick_signin_val(event) {
  var user = localStorage.getItem("user");
  var user2 = user.split(",");

  if (
    user2[5] == document.getElementById("Email2").value &&
    user2[6] == document.getElementById("Password2").value
  ) {
    return true;
  } else {
    event.preventDefault();
    alert(" Email or password is wrong");
  }
}

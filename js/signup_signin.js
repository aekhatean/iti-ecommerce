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
// Street.oninvalid = function(event) {
//     event.target.setCustomValidity('Street should only contain  letters only and length more than 3');
// }
Email.oninvalid = function (event) {
  event.target.setCustomValidity("Email should  contain @");
};
Password.oninvalid = function (event) {
  event.target.setCustomValidity(
    "pass word should be more than 6 numbers and chars"
  );
};

function submmition(event) {
  if (localStorage.getItem("allUsers")) {
    var flag = 0;
    var data = JSON.parse(localStorage.getItem("allUsers"));
    var current_user_data = {
      F_name: document.getElementById("F_name").value,
      L_name: document.getElementById("L_name").value,
      Username: document.getElementById("Username").value,
      Phone: document.getElementById("Phone").value,
      City: document.getElementById("City").value,
      Street: document.getElementById("Street").value,
      Email: document.getElementById("Email").value,
      Password: document.getElementById("Password").value,
    };
    for (index in data) {
      if (
        current_user_data.Username == data[index].Username ||
        current_user_data.Email == data[index].Email
      ) {
        flag = 1;
      }
    }
    if (flag == 0) {
      var datalength = data.length;
      data[datalength] = current_user_data;
      localStorage.setItem("allUsers", JSON.stringify(data));
      localStorage.setItem("currentUser", JSON.stringify([current_user_data]));
    } else {
      event.preventDefault();
      alert("this email or username are used");
      flag = 0;
    }
  } else {
    var current_user_data = [
      {
        F_name: document.getElementById("F_name").value,
        L_name: document.getElementById("L_name").value,
        Username: document.getElementById("Username").value,
        Phone: document.getElementById("Phone").value,
        City: document.getElementById("City").value,
        Street: document.getElementById("Street").value,
        Email: document.getElementById("Email").value,
        Password: document.getElementById("Password").value,
      },
    ];
    localStorage.setItem("allUsers", JSON.stringify(current_user_data));
    localStorage.setItem("currentUser", JSON.stringify(current_user_data));
  }
}

/////////////////////////////////sign in check if user found in local storage  ////////////

function chick_signin_val(event) {
  if (localStorage.getItem("allUsers")) {
    var data = JSON.parse(localStorage.getItem("allUsers"));
    var current_user_index = -1;
    for (index in data) {
      if (
        data[index].Email == document.getElementById("Email2").value &&
        data[index].Password == document.getElementById("Password2").value
      ) {
        current_user_index = index;
      }
    }
    if (current_user_index != -1) {
      var current_user_data = data[current_user_index];
      localStorage.setItem("currentUser", JSON.stringify([current_user_data]));
    } else {
      localStorage.removeItem("currentUser");
      event.preventDefault();
      alert("worng in E-mail or password or you don't have an acount");
    }
  } else {
    event.preventDefault();
    alert("worng in E-mail or password or you don't have an acount");
  }
}

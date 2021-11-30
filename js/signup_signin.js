var F_name = document.getElementById("F_name");
var L_name = document.getElementById("L_name");
var Username = document.getElementById("Username");
var Phone = document.getElementById("Phone");
var City = document.getElementById("City");
var Street = document.getElementById("Street");
var Email = document.getElementById("Email");
var Password = document.getElementById("Password");
////////////////////////////////put patterns

L_name.oninvalid = function(event) {
    event.target.setCustomValidity('last name should only contain  letters only and length more than 3');
}
Username.oninvalid = function(event) {
    event.target.setCustomValidity('Username should only contain lowercase letters. e.g. john');
}
Phone.oninvalid = function(event) {
    event.target.setCustomValidity('phone number should only contain numbers length is = 11 number . e.g. john');
}
City.oninvalid = function(event) {
        event.target.setCustomValidity('Cith should only contain  letters only and length more than 3');
    }
    // Street.oninvalid = function(event) {
    //     event.target.setCustomValidity('Street should only contain  letters only and length more than 3');
    // }
Email.oninvalid = function(event) {
    event.target.setCustomValidity('Email should  contain @');
}
Password.oninvalid = function(event) {
    event.target.setCustomValidity('pass word should be more than 6 numbers and chars');
}

function submmition() {
    alert("ok1")
    var x = [{ F_name: document.getElementById("F_name").value, L_name: document.getElementById("L_name").value, Username: document.getElementById("Username").value, Phone: document.getElementById("Phone").value, City: document.getElementById("City").value, Street: document.getElementById("Street").value, Email: document.getElementById("Email").value, Password: document.getElementById("Password").value }];
    alert("x")
    localStorage.setItem("allUsers", JSON.stringify(x))


}


/////////////////////////////////sign in check if user found in local storage  ////////////

function chick_signin_val(event) {
    var user = localStorage.getItem('user');
    var user2 = user.split(",");

    if (user2[5] == document.getElementById("Email2").value && user2[6] == document.getElementById("Password2").value) {
        return true
    } else {
        event.preventDefault();
        alert(" Email or password is wrong");

    }

}
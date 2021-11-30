function fillinformation() {
    if (localStorage.getItem('currentUser')) {
        var user = localStorage.getItem('currentUser');
        var user2 = JSON.parse(user);

        document.getElementById("F_name").value = user2[0].F_name;
        document.getElementById("L_name").value = user2[0].L_name;
        document.getElementById("Phone").value = user2[0].Phone;
        document.getElementById("City").value = user2[0].City;
        document.getElementById("Street").value = user2[0].Street;
        document.getElementById("Email").value = user2[0].Email;
    } else {
        alert("you should signin")
    }

}

fillinformation();




function submmition(event) {

    if (localStorage.getItem('currentUser')) {
        var x = [{ firstname: document.getElementById("F_name").value, lastname: document.getElementById("L_name").value, Phone: document.getElementById("Phone").value, City: document.getElementById("City").value, Street: document.getElementById("Street").value, Email: document.getElementById("Email").value }]

        try {
            localStorage.setItem("orders", JSON.stringify(x))
        } catch (error) {
            alert(error)
        }
    } else {
        event.preventDefault(); {
            alert("you should signin")
        }
    }


}
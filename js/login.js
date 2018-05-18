window.onload = function () {
    var login_personal = document.getElementsByClassName('login_personal')[0];
    var login_personal_password = login_personal.children[1];
    var userpassword = login_personal_password.getElementById('userpassword');

    userpassword.oninput = function () {
        if (userpassword.value !== "") {
            userpassword.style.fontFamily = "Tahoma";
        }
    }
}

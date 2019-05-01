// refer to question 4 before development starts for scope document
function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    var phoneRegex = /^[\d{3}]+[\s.-]+[\d{3}]+[\s.-]+[\d{4}]+$/;

    if (firstName == "" || firstName == null) {
        document.getElementById("firstNameError").style.display = "inline";
    } else {
        document.getElementById("firstNameError").style.display = "none";
    }

    if (lastName == "" || lastName == null) {
        document.getElementById("lastNameError").style.display = "inline";
    } else {
        document.getElementById("lastNameError").style.display = "none";
    }

    if (phoneRegex.test(phone) == false) {
        document.getElementById("phoneError").style.display = "inline";
    } else {
        document.getElementById("phoneError").style.display = "none";
    }

    if (emailRegex.test(email) == false) {
        document.getElementById("emailError").style.display = "inline";
    } else {
        document.getElementById("emailError").style.display = "none";
    }
}
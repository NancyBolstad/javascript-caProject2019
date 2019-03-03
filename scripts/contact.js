// refer to question 4 before development starts for scope document
"use strict";

//Form validation only happens after a user clicks the submit button.
document.getElementById("submitContact").addEventListener("click", function validateForm() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    //RFC2822 standards email validation, refer to:https://regexr.com/2rhq7
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    //Regular expression for special number format: xxx xxx xxxx OR xxx-xxx-xxxx OR xxx.xxx.xxxx
    const phoneRegex = /(^\d{3}\s\d{3}\s\d{4}$)|(^\d{3}\.\d{3}\.\d{4}$)|(^\d{3}-\d{3}-\d{4}$)/;


    //Validate name, last name, email and phone numbers and display display error messages if there is an issue with the values for each textbox respectively. If the value of the textbox is valid, hide the error message.  
    function checkFirstName() {
        if (firstName == "" || firstName == null) {
            document.getElementById("firstNameError").style.display = "block";
            document.getElementById("firstName").focus();
            return false;
        } else {
            document.getElementById("firstNameError").style.display = "none";
            return true;
        }
    }

    function checkLastName() {
        if (lastName == "" || lastName == null) {
            document.getElementById("lastNameError").style.display = "block";
            document.getElementById("lastName").focus();
            return false;
        } else {
            document.getElementById("lastNameError").style.display = "none";
            return true;
        }
    }

    function checkPhone() {
        if (!phoneRegex.test(phone)) {
            document.getElementById("phoneError").style.display = "block";
            document.getElementById("phone").focus();
            return false;
        } else {
            document.getElementById("phoneError").style.display = "none";
            return true;
        }
    }

    function checkEmail() {
        if (!emailRegex.test(email)) {
            document.getElementById("emailError").style.display = "block";
            document.getElementById("email").focus();
            return false;
        } else {
            document.getElementById("emailError").style.display = "none";
            return true;
        }
    }

    //Only submit the form when all input has been validated.
    if (checkFirstName() && checkLastName() && checkPhone() && checkEmail()) {
        alert("Great! Your contact information has been validated now.");
    }
});
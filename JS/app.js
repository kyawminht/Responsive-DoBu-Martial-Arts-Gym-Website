// const { event } = require("jquery");

$('.portfolio').slick({
dots: true,
infinite: true,
speed: 300,
slidesToShow: 4,
slidesToScroll: 2,
centerMode:true,
autoplay: true,
responsive: [
{
breakpoint: 1024,
settings: {
slidesToShow: 2,
slidesToScroll: 2,
infinite: true,
dots: true
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
slidesToScroll:2
}
},
{
breakpoint: 480,
settings: {
slidesToShow: 1,
slidesToScroll: 1
}
}

]
});




//Storing in localStorage
const usernameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');


const form = document.querySelector('#registrationForm');
const thankYouMessage=document.querySelector("#thankYouMessage");

const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};



const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();
        

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid;
      

    // submit to the server if the form is valid
    if (isFormValid) {

        //showing thank you message

        registrationForm.style.display = "none";
        thankYouMessage.style.display = "block";
        	
        //get form data
        const formData = new FormData(registrationForm);
        const userObj = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Retrieve existing user data array from localStorage or initialize an empty array
        const storedUserData = localStorage.getItem('userData');
        let userDataArray = storedUserData ? JSON.parse(storedUserData) : [];

        // Check if userDataArray is an array
        if (!Array.isArray(userDataArray)) {
            userDataArray = []; // If it's not an array, initialize an empty array
        }


        // Add the new user data object to the array
        userDataArray.push(userObj);

        // Store the updated array back in localStorage
        localStorage.setItem('userData', JSON.stringify(userDataArray));

    }
});

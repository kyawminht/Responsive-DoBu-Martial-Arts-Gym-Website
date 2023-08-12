
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve existing user data array from localStorage or initialize an empty array
  const storedUserData = localStorage.getItem("userData");
  const userDataArray = storedUserData ? JSON.parse(storedUserData) : [];

  // Get the table body element
  const tableBody = document.querySelector("#userDataTable tbody");

  // Get the edit modal and form elements
  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");
  const editNameInput = document.getElementById("editName");
  const editEmailInput = document.getElementById("editEmail");
  const editPasswordInput = document.getElementById("editPassword");

  // Function to populate the table with user data
  function displayUserDataInTable() {
    // Clear the existing table rows
    tableBody.innerHTML = "";

    // Loop through each user data object and create rows in the table
    userDataArray.forEach((userData, index) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const emailCell = document.createElement("td");
      const passwordCell = document.createElement("td");
      const editCell = document.createElement("td"); // For CRUD controls
      const deleteCell = document.createElement("td");

      // Populate cells with user data
      nameCell.textContent = userData.name;
      emailCell.textContent = userData.email;
      passwordCell.textContent = userData.password;

      // Create Edit and Delete buttons for CRUD operations
      const editButton = document.createElement("button");
      editButton.innerHTML = `<i class="ri-pencil-fill"></i>`;
      editButton.classList.add("btn", "btn-success");
      editButton.addEventListener("click", () => editUserData(index));
      
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<i class="ri-delete-bin-line"></i>`;
      deleteButton.classList.add("btn", "btn-dark");
      deleteButton.addEventListener("click", () => deleteUserData(index));

      // Append buttons to the actions cell
      editCell.appendChild(editButton);
      deleteCell.appendChild(deleteButton);

      // Append cells to the row
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(passwordCell);
      row.appendChild(editCell);
      row.appendChild(deleteCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  }

  // Function to edit user data
  function editUserData(index) {
    // Get the selected user data
    const selectedUserData = userDataArray[index];

    // Pre-fill the form fields with the selected user data
    editNameInput.value = selectedUserData.name;
    editEmailInput.value = selectedUserData.email;
    editPasswordInput.value = selectedUserData.password;

    // Show the edit modal
    editModal.style.display = "block";

    // Clear previous event listeners
    editForm.removeEventListener("submit", submitEditForm);

    // Handle form submission
    function submitEditForm(event) {
      event.preventDefault();

      // Update the selected user data with edited values
      selectedUserData.name = editNameInput.value;
      selectedUserData.email = editEmailInput.value;
      selectedUserData.password = editPasswordInput.value;

      // Update the userDataArray
      userDataArray[index] = selectedUserData;

      // Update localStorage
      localStorage.setItem("userData", JSON.stringify(userDataArray));

      // Close the modal and update the table
      editModal.style.display = "none";
      displayUserDataInTable();

      // Remove the event listener to prevent duplicate submissions
      editForm.removeEventListener("submit", submitEditForm);
    }

    // Attach the submit event listener to the form
    editForm.addEventListener("submit", submitEditForm);
  }

  // Close the edit modal when the close button is clicked
  const closeButton = document.querySelector(".close-edit");
  closeButton.addEventListener("click", function () {
    editModal.style.display = "none";
  });

  // Function to delete user data
  function deleteUserData(index) {
    // Remove the user data at the specified index from the userDataArray
    userDataArray.splice(index, 1);
    // Update the localStorage with the modified array
    localStorage.setItem("userData", JSON.stringify(userDataArray));
    // Refresh the table display
    displayUserDataInTable();
  }

  // Display initial user data in the table
  displayUserDataInTable();
});

//Storing in localStorage
const usernameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

const createForm = document.querySelector("#createForm");
const successMessage = document.querySelector("#successMessage");

const checkUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
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
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
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
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(passwordEl, "Password must has at least 8 characters");
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.{8,})");
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

createForm.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid = isUsernameValid && isEmailValid && isPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    //showing thank you message

    createForm.style.display = "none";
    successMessage.style.display = "block";

    //get form data
    const formData = new FormData(createForm);
    const userObj = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Retrieve existing user data array from localStorage or initialize an empty array
    const storedUserData = localStorage.getItem("userData");
    let userDataArray = storedUserData ? JSON.parse(storedUserData) : [];

    // Check if userDataArray is an array
    if (!Array.isArray(userDataArray)) {
      userDataArray = []; // If it's not an array, initialize an empty array
    }

    // Add the new user data object to the array
    userDataArray.push(userObj);

    // Store the updated array back in localStorage
    localStorage.setItem("userData", JSON.stringify(userDataArray));
  }
});

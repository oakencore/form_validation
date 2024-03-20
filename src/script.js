const mainDiv = document.getElementById("mainDiv");
const contentDiv = document.getElementById("contentDiv");
const countryList = [
  { code: "FR", name: "France" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
];

// Reusable Input field creation
function createInputField(type, id, placeholder, countryList = null) {
  let field;

  if (type === "country") {
    field = document.createElement("select");
    field.name = id;
    countryList.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.code;
      option.text = country.name;
      field.appendChild(option);
    });
  } else {
    field = document.createElement("input");
    field.type = type;
    field.id = id;
    field.placeholder = placeholder;
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error");
    errorSpan.setAttribute("aria-live", "polite");
    field.appendChild(errorSpan);
  }

  return field;
}

// Form building
const form = document.createElement("form");
// Append elements to the form
form.appendChild(createInputField("email", "email", "Email"));
form.appendChild(createInputField("password", "password", "Password"));
form.appendChild(
  createInputField("password", "confirmPassword", "Confirm Password")
);
form.appendChild(
  createInputField("country", "country", "Select a country", countryList)
);
form.appendChild(createInputField("postCode", "postCode", "Post Code"));
form.appendChild(createSubmitButton("submit", "Submit"));

// Append, Style and Add Form to DOM
contentDiv.appendChild(form);

// submit button
function createSubmitButton(type = "submit", textContent) {
  const submitButton = document.createElement("button");
  submitButton.type = type;
  submitButton.textContent = textContent;
  return submitButton;
}

// Form Styling
form.style.display = "flex";
form.style.flexDirection = "column";
form.style.maxHeight = "500px";
form.style.maxWidth = "800px";
form.style.justifyContent = "center";
form.style.padding = "40px";
form.style.gap = "20px";

// Content div styling
contentDiv.style.display = "flex";
contentDiv.style.justifyContent = "center";
contentDiv.style.alignItems = "center";
contentDiv.style.background = "gray";
contentDiv.style.borderRadius = "25px";
contentDiv.style.boxShadow = "4px 6px";
contentDiv.style.borderRadius = "25px";

// Main Div Styling
mainDiv.style.display = "flex";
mainDiv.style.justifyContent = "center";
mainDiv.style.alignItems = "center";
mainDiv.style.height = "100%";
mainDiv.style.backgroundImage =
  "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)";
mainDiv.style.width = "100vw";
mainDiv.style.height = "100vh";
mainDiv.style.top = "0";
mainDiv.style.left = "0";
// Fixed takes maindiv out of the normal document flow and positions it relative to the browser window
mainDiv.style.position = "fixed";

// Validation Styling

function performValidation() {
  // input fields
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  //Email validation
  if (email.validity.typeMismatch) {
    email.style.border = "1px solid red";
    email.nextElementSibling.style.display = "block";
    email.setCustomValidity("NEED AN EMAIL.");
  } else {
    email.style.border = "1px solid #ccc";
    email.setCustomValidity("");
  }

  //Password validaiton
  if (password.validity.tooShort) {
    password.setCustomValidity(
      "NEED A PASSWORD THAT IS AT LEAST 8 CHARACTERS LONG."
    );
    password.style.border = "1px solid red";
  } else if (password.value.trim() !== confirmPassword.value.trim()) {
    password.style.border = "1px solid red";
    password.setCustomValidity("YOUR PASSWORDS DON'T MATCH");
  } else {
    password.style.border = "1px solid #ccc";
    password.setCustomValidity("");
  }
}

//event listeners
password.addEventListener("blur", performValidation);
form.addEventListener("submit", (event) => {
  performValidation();
  event.preventDefault();
});

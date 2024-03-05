const contentDiv = document.getElementById("contentDiv");
const countryList = [
  { code: "FR", name: "France" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
];

// Form element
const form = document.createElement("form");

// Input field
function createInputField(type, name, placeholder, countryList = null) {
  let field;

  if (type === "country") {
    field = document.createElement("select");
    field.name = name;
    countryList.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.code;
      option.text = country.name;
      field.appendChild(option);
    });
  } else {
    field = document.createElement("input");
    field.type = type;
    field.name = name;
    field.placeholder = placeholder;
  }

  return field;
}

// submit button
function createSubmitButton(type = "submit", textContent) {
  const submitButton = document.createElement("button");
  submitButton.type = type;
  submitButton.textContent = textContent;
  return submitButton;
}

// Append elements to the form
form.appendChild(
  createInputField("country", "country", "Select a country", countryList)
);
form.appendChild(createSubmitButton("submit", "Submit"));

contentDiv.appendChild(form);

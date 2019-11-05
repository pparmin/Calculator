function add (firstValue, secondValue) {
  let sum = Number(firstValue) + Number(secondValue);
  return sum;
}

function subtract (firstValue, secondValue) {
  let difference = Number(firstValue) - Number(secondValue);
  return difference;
}

function multiply (firstValue, secondValue) {
  let product = Number(firstValue) * Number(secondValue);
  return product;
}

function divide (firstValue, secondValue) {
  let division = Number(firstValue) / Number(secondValue);
  return division;
}

function operate (operator, firstValue, secondValue) {
  console.log(operator);
  console.log(typeof operator);

  switch (operator) {
    case "add":
      console.log('This is working');
      clearText();
      textbox.textContent += `${add(firstValue, secondValue)}`;
    break;

    case "subtract":
      console.log('This is working');
      clearText();
      textbox.textContent += `${subtract(firstValue, secondValue)}`;
    break;

    case "multiply":
      console.log('This is working');
      clearText();
      textbox.textContent += `${multiply(firstValue, secondValue)}`;
    break;

    case "divide":
      console.log('This is working');
      clearText();
      textbox.textContent += `${divide(firstValue, secondValue)}`;
    break;
  }
}

function chooseOperator (event) {

  // saving the currently displayed value
  savedDisplay = displayValue;
  console.log(`The current display value is: ${savedDisplay}`);
  operator = event.target.value;
  console.log(`The chosen operator is: ${operator}`);

  switch (operator) {
    case "add":
      textbox.textContent += '+';
    break;

    case "subtract":
      textbox.textContent += '-';
    break;

    case "divide":
      textbox.textContent += '/';
    break;

    case "multiply":
      textbox.textContent += '*';
    break; 

  }

  numberButtons.forEach(button => {
    button.classList.replace("inactive", "active");
  });
}

function addNumber (event) {
  if (event.target.classList == "active") {
    event.target.classList.replace("active", "inactive");
    clearText();
  }

  console.log(`old display value: ${displayValue}`);
  console.log(event.target.value);
  textbox.textContent += event.target.value;
  displayValue = textbox.textContent;
  console.log(`new display value: ${displayValue}`)
}

function clearText () {
  textbox.textContent = '';
}

const textbox = document.querySelector('.textbox');
const calculator = document.querySelectorAll('.container');
const result = document.querySelector('#result');

const numberButtons = document.querySelectorAll('.numbers > button');
const calcFunctions = document.querySelectorAll('.calc-functions > button');
console.log(numberButtons);
console.log(calcFunctions);

const seven = document.getElementById('seven');
const clear = document.getElementById('clear');

let displayValue = '0';
let savedDisplay = '0';
let operator = '';
let mode = "inactive";

numberButtons.forEach(button => {
  button.addEventListener('click', addNumber);
  console.log(`The classlist: ${button.classList}`);
});

calcFunctions.forEach(operator => {
  clearText();
  operator.addEventListener('click', chooseOperator);
});

clear.addEventListener('click', clearText);

result.addEventListener('click', (event) => operate(operator, savedDisplay, displayValue));
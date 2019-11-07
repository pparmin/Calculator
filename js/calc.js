/* 
***Basic functionality*** 

The final calculation is made in operate(). When you press the results button, it will pass the saved Value and the current displayValue
as well as the chosen operator to operate(). The function then calculates the result of that operation.


At it's core, the calculator works with modes that define what kind of value
the program is dealing with. 

1. If the mode is "firstValue" (it is in the beginning), it is writing the numbers into the display
and thus creating a displayValue to be used as the first value of the calculation.

2. When you choose an operator, the operator takes the current display value, saves it in a variable, 
and then sets the mode for all numbers on "secondValue".

3. If the mode is "secondValue", the current display (and thus its value) will be cleared 
as well as setting the mode back to "firstValue" mode. This enables the function to produce
a second value (the current displayValue) which will eventually be used for the calculation, 
together with the savedValue. 

In order to chain operations, the program will look whether an operator has already been assigned (if class is "active").
If it is, it will calculate a temporary result and display it, so it can be used in further calculations.
*/



/* Basic functions for the different types of calculation */
/* ------------------------------------------------------ */

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
  if (Number(secondValue) == 0) {
    return 'You can not divide by 0';
  }

  let division = Number(firstValue) / Number(secondValue);
  return division;
}

/* ------------------------------------------------------ */


/* Function for the final calculation: 
It clears the textbox and puts out a result instead, based on the operator type
*/
function operate (operator, firstValue, secondValue) {
  console.log(`Saved value: ${firstValue} & second value: ${secondValue}`);

  switch (operator) {
    case "add":
      clearText();
      textbox.textContent += `${add(firstValue, secondValue)}`;
    break;

    case "subtract":
      clearText();
      textbox.textContent += `${subtract(firstValue, secondValue)}`;
    break;

    case "multiply":
      clearText();
      textbox.textContent += `${multiply(firstValue, secondValue)}`;
    break;

    case "divide":
      clearText();
      textbox.textContent += `${divide(firstValue, secondValue)}`;
    break;
  }

  // sets the mode to "secondValue"
  setModeNumbers.setSecondValue();
  displayValue = textbox.textContent;
  console.log(`display value after result: ${displayValue}`);
}



// Saves the current value and changes the mode 
function chooseOperator (event) {

  /* This checks whether the operator has already been activated and if it did it will calculate
  a temporary result and display this value. From then on it will proceed with the normal function 
  body. 

  If operator is set to active, because it has already been used 
    --> calculate temporary result and display it 
      --> from there proceed normally with the updated operator value  
  */
  if (event.target.className == "active") {
    console.log("-----IF PART ACTIVE-----")
    console.log('Operator is active');
    console.log(`OPERATOR CHOSEN: ${operator}`);
    operate(operator, savedValue, displayValue);   
  }


  // saving the selected operator
  operator = event.target.value;
  console.log(`The chosen operator is: ${operator}`);

  // saving the currently displayed value
  savedValue = displayValue;
  console.log(`The saved value is: ${savedValue}`);

  // Sets the mode to "active"
  setModeOperators.setActive();

  // display the correct symbol on the textbox
  addOperatorSymbol(operator);


  // sets the mode to "secondValue"
  setModeNumbers.setSecondValue();

}

function addNumber (event) {
  if (event.target.classList == "secondValue") {
    clearText();
  }

  textbox.textContent += event.target.value;
  displayValue = textbox.textContent;
  console.log(`NUMBER SELECTED: ${displayValue}`)
}

function addOperatorSymbol (operator) {
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
}
 
function clearText () {
  textbox.textContent = '';
  setModeNumbers.setFirstValue();
}

// switches the operator mode back to "inactive"
function clearOperators () {
  setModeOperators.setInactive();
}

const setModeNumbers = {

  setFirstValue : function() {
    numberButtons.forEach(button => {
      button.className = "firstValue";
      //button.classList.replace("secondValue", "firstValue");
    });
  },

  setSecondValue : function() {
    numberButtons.forEach(button => {
      button.classList.replace("firstValue", "secondValue");
    });
  },

  setCalculated : function() {
    numberButtons.forEach(button => {
      button.className = 'calculated';
    });
  },
};

const setModeOperators = {

  setActive : function() {
    calcFunctions.forEach(operator => {
      operator.className = "active";
    });
  },

  setInactive : function() {
    calcFunctions.forEach(operator => {
      operator.className = "inactive";
    });
  }
};

const textbox = document.querySelector('.textbox');
const result = document.querySelector('#result');

const numberButtons = document.querySelectorAll('.numbers > button');
const calcFunctions = document.querySelectorAll('.calc-functions > button');
console.log(numberButtons);
console.log(calcFunctions);

const clear = document.getElementById('clear');

let displayValue = '';
let savedValue = '';
let tempResult = '';
let operator = '';

numberButtons.forEach(button => {
  button.addEventListener('click', addNumber);
  console.log(`The classlist: ${button.classList}`);
});

calcFunctions.forEach(operator => {
  clearText();
  operator.addEventListener('click', chooseOperator);
});

clear.addEventListener('click', () => {
  clearText();
  clearOperators();
});

result.addEventListener('click', () => {
  operate(operator, savedValue, displayValue);

  // resetting the savedValue & operator after the operation fixes the issue
  // of the result button switching between two values
  savedValue = '';
  operator = '';
  setModeOperators.setInactive();
});
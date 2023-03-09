// Get the calculator elements
const display = document.getElementById("result");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equal");
const clear = document.querySelector(".clear");

// Initialize the calculator state
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Helper functions for calculator operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "Error: Divide by zero";
      }
      return divide(a, b);
    default:
      return "Error: Invalid operator";
  }
}

// Event listeners for calculator buttons
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (waitingForSecondOperand) {
      display.value = button.value;
      waitingForSecondOperand = false;
    } else {
      display.value += button.value;
    }
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (firstOperand === null) {
      firstOperand = parseFloat(display.value);
      operator = button.value;
      waitingForSecondOperand = true;
    } else {
      const secondOperand = parseFloat(display.value);
      const result = operate(operator, firstOperand, secondOperand);
      display.value = result;
      firstOperand = result;
      operator = button.value;
      waitingForSecondOperand = true;
    }
  });
});

equals.addEventListener("click", () => {
  if (firstOperand === null) {
    return;
  }
  const secondOperand = parseFloat(display.value);
  const result = operate(operator, firstOperand, secondOperand);
  display.value = result;
  firstOperand = result;
  operator = null;
  waitingForSecondOperand = true;
});

clear.addEventListener("click", () => {
  display.value = "";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
});
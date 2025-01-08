const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
let currentOperand = "0";
let previousOperand = null;
let operator = null;

function updateDisplay() {
  display.textContent = currentOperand;
}
function clearCalculator() {
  currentOperand = "0";
  previousOperand = null;
  operator = null;
  updateDisplay();
}
function appendNumber(number) {
  if (currentOperand === "0") {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}
function appendDot() {
  if (!currentOperand.includes(".")) {
    currentOperand += ".";
    updateDisplay();
  }
}
function chooseOperator(op) {
  if (operator !== null) compute();
  operator = op;
  previousOperand = currentOperand;
  currentOperand = "0";
}
function compute() {
  if (operator === null || previousOperand === null) return;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let result;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  operator = null;
  previousOperand = null;
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      appendNumber(button.textContent);
    } else if (button.classList.contains("dot")) {
      appendDot();
    } else if (button.classList.contains("operator")) {
      chooseOperator(button.textContent);
    } else if (button.classList.contains("equal")) {
      compute();
    } else if (button.classList.contains("clear")) {
      clearCalculator();
    }
  });
});

clearCalculator();

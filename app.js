const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equals");
const currentDisplay = document.querySelector(".currentDisplay");
const btns = document.querySelectorAll("button");

let firstNumber = "";
let secondNumber = "";
let selectedOperation = undefined;

// ==============FUNCTIONS=====================

const updateDisplay = (number) => {
  if (firstNumber == "" && secondNumber != "") {
    currentDisplay.innerText =
      secondNumber.replace("error", "") + selectedOperation;
    return;
  }
  currentDisplay.innerText = firstNumber;
};
const calculation = () => {
  if (!firstNumber || !secondNumber) return;

  let numA = parseFloat(firstNumber.replace("=", ""));
  let numB = parseFloat(secondNumber.replace("=", ""));
  let result = "";

  switch (selectedOperation) {
    case "+":
      result = numA + numB;
      break;
    case "-":
      result = numB - numA;
      break;
    case "×":
      result = numA * numB;
      break;
    case "÷":
      if (numA == 0) {
        clear();
        // firstNumber = 'error'
        updateDisplay();
        return;
      }
      result = numB / numA;
      break;
    default:
      break;
  }
  firstNumber = "= " + result.toString();
  secondNumber = "";
  updateDisplay();
};
const clear = () => {
  firstNumber = "";
  secondNumber = "";
  selectedOperation = undefined;
  updateDisplay();
};
const removeActive = () => {
  for (const a of operators) {
    a.classList.remove("active");
  }
};

// ================BUTTONS=====================

numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (firstNumber.length == 11) return;
    if (firstNumber.toString().includes("=")) {
      clear();
      updateDisplay();
    }

    if (btn.innerText == "." && firstNumber.includes(".")) return;

    firstNumber = firstNumber + btn.innerText;
    updateDisplay();
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.add("active");

    if (firstNumber == "") {
      if (secondNumber != "") {
        selectedOperation = btn.innerText;
        updateDisplay();
        return;
      } else {
        return;
      }
    }
    if (secondNumber != "") {
      calculation();
    }

    selectedOperation = btn.innerText;
    secondNumber = firstNumber;
    firstNumber = "";
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculation();
  removeActive();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  removeActive();
  clear();
});

deleteBtn.addEventListener("click", () => {
  if (firstNumber.includes("= ")) {
    return;
  }

  firstNumber = firstNumber.substring(0, firstNumber.length - 1);
  updateDisplay();
});

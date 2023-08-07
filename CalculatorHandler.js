
function add(LVal, RVal)  {
    return LVal + RVal;
}

function subtract(LVal, RVal)  {
    return LVal - RVal;
}

function multiply(LVal, RVal)  {
    return LVal * RVal;
}

function divide (LVal, RVal) {
    return LVal / RVal;
}

let LVal, RVal = 0;
let operator = '';

function operate(LVal, operator, RVal) {
    switch (operator) {
        case '+':
            return add(LVal,RVal);
        case '-':
            return subtract(LVal, RVal);
        case '*':
            return multiply(LVal,RVal);
        case '/':
            return divide(LVal,RVal);
        default:
            console.error("Error: Invalid operand supplied. Calculation failed.");
            return -1;
    }
}

console.info("Info: running 'operate(1, +, 1)' - this will pass.");
console.info("Result: " + operate(1, '+', 1));
console.info("");
console.info("Info: running 'operate(1, ?, 1)' - this will fail.");
console.info("Result: " + operate(1, '?', 1));

let buttonsPressed = [];

function generateNumberButtons(startInc, endInc) {
    let calculatorButtonsDiv = document.getElementById("calculator-buttons-div");
    for (let i = startInc; i <= endInc; i++) {
        let button = document.createElement("button");
        button.id = "button-" + i;
        button.textContent = i.toString();
        calculatorButtonsDiv.append(button);
    }
}

function generateSpecialButtons(){
    let calculatorButtonsDiv = document.getElementById("calculator-buttons-div");

    let button = document.createElement("button");
    button.id = "button-addition";
    button.textContent = "+";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-subtraction";
    button.textContent = "-";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-multiplication";
    button.textContent = "x";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-division";
    button.textContent = "/";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-equals";
    button.textContent = "=";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-clear";
    button.textContent = "Clear";
    calculatorButtonsDiv.append(button);
}

function generateCalculatorPanel() {

    let calculatorScreenDiv = document.getElementById("calculator-screen-div");
    calculatorScreenDiv.style.border = "5px solid black";
    /*
        calculatorScreenDiv.display = "flex";
        calculatorScreenDiv.textAlign = "center";
        calculatorScreenDiv.alignItems = "center";
        calculatorScreenDiv.justifyContent = "center";
    */

    let calculatorButtonsDiv = document.getElementById("calculator-buttons-div");
    calculatorButtonsDiv.style.display = "grid";
    calculatorButtonsDiv.style.gridTemplateRows = "repeat(3, 1fr)";
    calculatorButtonsDiv.style.gridTemplateColumns = "repeat(3, 1fr)";

    generateNumberButtons(7, 9); // 7, 8, 9
    generateNumberButtons(4, 6); // 4, 5, 6
    generateNumberButtons(1, 3); // 1, 2, 3
    generateNumberButtons(0, 0); // 0
    generateSpecialButtons() // +, -, x, /, =
    generateButtonEventListeners();
}

function generateButtonEventListeners(){
    document.querySelector("#calculator-buttons-div").querySelectorAll("button")
    .forEach(b =>
        b.addEventListener("click", (e) =>
            onButtonPress(e.target)));
}

generateCalculatorPanel();

let calculatorScreenTxt = document.querySelector("#calculator-screen-div").querySelector("p");
calculatorScreenTxt.style.textAlign = "center";

function onButtonPress(eventTarget) {

    if (eventTarget.id === "button-clear") {
        for (let len = buttonsPressed.length; len > 0; len--)
            buttonsPressed.shift();
        calculatorScreenTxt.textContent = "";
    }

    // TODO: Math Input Evaluation
    else if (eventTarget.id === "button-equals") {

    }

    else {
        buttonsPressed.push(eventTarget.textContent);
        calculatorScreenTxt.textContent += eventTarget.textContent;
    }
}
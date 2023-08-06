
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

let testPass = operate(1, '+', 1);
console.log(testPass);

let testFail = operate(1, '?', 1);
console.log(testFail);

function generateCalculatorPanel() {
    let calculatorPanelDiv = document.createElement("div");
    calculatorPanelDiv.id = "calculator-panel";
    calculatorPanelDiv.style.display = "grid";
    calculatorPanelDiv.style.gridTemplateRows = "repeat(3, 1fr)";
    calculatorPanelDiv.style.gridTemplateColumns = "repeat(3, 1fr)";

    document.getElementsByTagName("main")[0].append(calculatorPanelDiv);

    calculatorPanelDiv = document.getElementById("calculator-panel");

    // TODO: Fix centering by creating new div for panel before calculatorPanelDiv (which has repeat(3, 1fr); separate them

    // TODO: Center
    let screenPanelDiv = document.createElement("div");
    let screenPanelTxt = document.createElement("p");
    screenPanelTxt.textContent = "012345689";
    screenPanelTxt.style.textAlign = "center";
    screenPanelDiv.id = "screen-panel-div";
    screenPanelDiv.style.width = "auto";
    screenPanelDiv.style.height = "auto";
    screenPanelDiv.style.border = "5px solid black";
    screenPanelDiv.append(screenPanelTxt);
    calculatorPanelDiv.append(screenPanelDiv);

    for (let i = 1; i < 10; i++) {
        // let buttonDiv = document.createElement("div");
        let button = document.createElement("button");
        // buttonDiv.id = "button-div-" + i;
        button.id = "button-" + i;
        button.textContent = i.toString();
        // button.addEventListener("click", () => )
        calculatorPanelDiv.append(button);
        // buttonDiv.append(button);
    }

    // TODO: Center
    let button = document.createElement("button");
    button.id = "button-0";
    button.textContent = "0";
    calculatorPanelDiv.append(button);

    let operators = ["+", "--", "X", "/", "=", "Clear"];

    for (let x of operators) {
        let button = document.createElement("button");
        x === "--" ? button.id = "button-minus" : button.id = "button-" + x;
        button.textContent = x;
        calculatorPanelDiv.append(button);
    }


}

generateCalculatorPanel();
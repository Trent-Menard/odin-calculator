
let operation = {
    LVal: undefined,
    RVal: undefined,
    operator: undefined,
    result: undefined
}

const calculatorButtonsDiv = document.querySelector("#calculator-buttons-div");
const calculatorScreenTxt = document.querySelector("#calculator-screen-div").querySelector("p");
const calculatorScreenDiv = document.querySelector("#calculator-screen-div");
const calculatorDiv = document.querySelector("#calculator-div");

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

function generateNumberButtons(startInc, endInc) {
    for (let i = startInc; i <= endInc; i++) {
        let button = document.createElement("button");
        button.id = "button-" + i;
        button.classList.add("number");
        button.textContent = i.toString();
        calculatorButtonsDiv.append(button);
    }
}

function generateSpecialButtons(id, className, text) {
    let button = document.createElement("button");
    button.id = id;
    button.classList.add(className);
    button.textContent = text;
    calculatorButtonsDiv.append(button);
}

function generateCalculatorPanel() {
    calculatorDiv.style.border = "5px inset black";
    calculatorDiv.style.backgroundColor = "rgb(73, 80, 87)";
    calculatorDiv.style.padding = "0.3vw";
    calculatorDiv.style.width = "20vw";
    calculatorDiv.style.height = "20vw";

    calculatorScreenDiv.style.display = "flex";
    calculatorScreenDiv.style.alignItems = "center";
    calculatorScreenDiv.style.justifyContent = "center";
    calculatorScreenDiv.style.border = "5px solid rgb(33, 37, 41)";
    calculatorScreenDiv.style.backgroundColor = "rgb(173, 181, 189)";


    calculatorButtonsDiv.style.display = "grid";
    calculatorButtonsDiv.style.gridTemplateRows = "repeat(4, 1fr)";
    calculatorButtonsDiv.style.gridTemplateColumns = "repeat(4, 1fr)";

    // 7, 8, 9, /
    generateNumberButtons(7, 9);
    generateSpecialButtons("button-division","arithmeticOperator", "/");

    generateNumberButtons(4, 6); // 4, 5, 6, *
    generateSpecialButtons("button-multiplication","arithmeticOperator", "*");

    generateNumberButtons(1, 3); // 1, 2, 3, -
    generateSpecialButtons("button-subtraction","arithmeticOperator", "-");

    generateNumberButtons(0, 0); // 0, +, =, C
    generateSpecialButtons("button-equals","evaluationOperator", "=");
    generateSpecialButtons("button-clear","clear", "C");
    generateSpecialButtons("button-addition","arithmeticOperator", "+");

    const arithmeticButtons = calculatorButtonsDiv.querySelectorAll("button.arithmeticOperator");
    arithmeticButtons.forEach(b => b.style.backgroundColor = "rgb(52, 58, 64)");

    const clearButton = calculatorButtonsDiv.querySelector("button.clear");
    clearButton.style.backgroundColor = "rgb(52, 58, 64)";

    const equalsButton = calculatorButtonsDiv.querySelector("button.evaluationOperator");
    equalsButton.style.backgroundColor = "rgb(52, 58, 64)";
}

function generateButtonEventListeners(){
    calculatorButtonsDiv.querySelectorAll("button.number")
    .forEach(b =>
        b.addEventListener("click", numberPressEventListener));

    // Arithmetic Operators: +, -, *, / EventListener
    calculatorButtonsDiv.querySelectorAll("button.arithmeticOperator").forEach(b => b.addEventListener("click", arithmeticEventListener))

    // Evaluation Operator: = EventListener
    calculatorButtonsDiv.querySelector("button#button-equals").addEventListener("click", evaluationEventListener);

    // Clear Button: EventListener
    calculatorButtonsDiv.querySelector("button#button-clear").addEventListener("click", clearButtonEventListener);
}

generateCalculatorPanel();
generateButtonEventListeners();

// document.querySelector("#calculator-div").style.height = "50vh";
// document.querySelector("#calculator-div").style.width = "20vw";

function appendTextToPanel(text) {
    calculatorScreenTxt.textContent += text;
}

function numberPressEventListener(event) {
    // Clear placeholder
    if (calculatorScreenTxt.textContent === "Calculation results will appear here.")
        calculatorScreenTxt.textContent = "";

    // If no operator supplied, assume is LVal, if supplied, assume is RVal then concat as string & parse to Number.
    if (operation.operator === undefined)
        operation.LVal === undefined ? operation.LVal = Number(event.target.textContent) : operation.LVal = Number(String(operation.LVal + event.target.textContent));
    else
        operation.RVal === undefined ? operation.RVal = Number(event.target.textContent) : operation.RVal = Number(String(operation.RVal + event.target.textContent));

    appendTextToPanel(event.target.textContent);
}

function arithmeticEventListener(event) {
    if (operation.LVal === undefined) {
        alert("Hmm, that won't work.\nYou can't perform an arithmetic operation on a single operand!");
        return; // Don't append to screen.
    }

    if (operation.operator === undefined) {
        appendTextToPanel(event.target.textContent);
        operation.operator = event.target.textContent;
    }

    if (operation.LVal !== undefined && operation.RVal !== undefined && operation.operator !== undefined){
        if (operation.RVal === 0 && operation.operator === "/") {
            alert("Seriously, are you trying to break my calculator?\nYou cannot divide by 0!");
            clearButtonEventListener();
        } else {
            calculatorScreenTxt.textContent = operate(operation.LVal, operation.operator, operation.RVal);
            operation.result = Number(calculatorScreenTxt.textContent);
        }

        if (operation.result !== undefined) {
            appendTextToPanel(event.target.textContent);
            operation.operator = event.target.textContent;

            operation.LVal = operation.result;
            operation.RVal = undefined;
            operation.result = undefined;
        }
    }
}

function evaluationEventListener() {
    if (operation.LVal !== undefined && operation.RVal !== undefined && operation.operator !== undefined) {
        if (operation.RVal === 0 && operation.operator === "/") {
            alert("Seriously, are you trying to break my calculator?\nYou cannot divide by 0!");
            clearButtonEventListener();
        }
        else {
            calculatorScreenTxt.textContent = operate(operation.LVal, operation.operator, operation.RVal);
            operation.result = Number(calculatorScreenTxt.textContent);
        }
    } else
        alert("Oops!\nThe supplied calculation cannot be performed. You seem to be lacking one or two operands.");
}

function clearButtonEventListener() {
    // Reset vars, clear calc screen
    operation.LVal = undefined;
    operation.RVal = undefined;
    operation.result = undefined;
    operation.operator = undefined;
    calculatorScreenTxt.textContent = "Calculation results will appear here.";
}
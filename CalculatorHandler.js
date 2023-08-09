
let operation = {
    LVal: "",
    RVal: "",
    operator: undefined
}

// let numberButtonsPressed = [];
let isArithmeticEventListenerEnabled = true;
let isEvaluationEventListenerEnabled = true;

const calculatorButtonsDiv = document.querySelector("#calculator-buttons-div");
const calculatorScreenTxt = document.querySelector("#calculator-screen-div").querySelector("p");
calculatorScreenTxt.style.textAlign = "center";

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

function generateSpecialButtons(){
    let button = document.createElement("button");
    button.id = "button-addition";
    button.classList.add("arithmeticOperator");
    button.textContent = "+";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-subtraction";
    button.classList.add("arithmeticOperator");
    button.textContent = "-";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-multiplication";
    button.classList.add("arithmeticOperator");
    button.textContent = "*";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-division";
    button.classList.add("arithmeticOperator");
    button.textContent = "/";
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-equals";
    button.textContent = "=";
    button.classList.add("evaluationOperator");
    calculatorButtonsDiv.append(button);

    button = document.createElement("button");
    button.id = "button-clear";
    button.textContent = "Clear";
    calculatorButtonsDiv.append(button);
}

function generateCalculatorPanel() {
    let calculatorScreenDiv = document.querySelector("#calculator-screen-div");
    calculatorScreenDiv.style.border = "5px solid black";

    calculatorButtonsDiv.style.display = "grid";
    calculatorButtonsDiv.style.gridTemplateRows = "repeat(3, 1fr)";
    calculatorButtonsDiv.style.gridTemplateColumns = "repeat(3, 1fr)";

    generateNumberButtons(7, 9); // 7, 8, 9
    generateNumberButtons(4, 6); // 4, 5, 6
    generateNumberButtons(1, 3); // 1, 2, 3
    generateNumberButtons(0, 0); // 0
    generateSpecialButtons() // +, -, x, /, =
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

function appendTextToPanel(text) {
    calculatorScreenTxt.textContent += text;
}

function numberPressEventListener(event) {
    // Clear placeholder
    if (calculatorScreenTxt.textContent === "Calculation results will appear here.")
        calculatorScreenTxt.textContent = "";

    // If no operator supplied, assume is LVal, if supplied, assume is RVal (parsed to Number on evaluation).
    if (operation.operator === undefined)
        operation.LVal === "" ? operation.LVal = event.target.textContent : operation.LVal += event.target.textContent;
    else
        operation.RVal === "" ? operation.RVal = event.target.textContent : operation.RVal += event.target.textContent;

    // Prob replace w/ push to operations[]
    // numberButtonsPressed.push(event.target.textContent);
    appendTextToPanel(event.target.textContent);
}

function arithmeticEventListener(event) {
    if (operation.LVal && !operation.RVal) {
        if (isArithmeticEventListenerEnabled) {
            isArithmeticEventListenerEnabled = false;
            appendTextToPanel(event.target.textContent)
            const arithmeticButtons = calculatorButtonsDiv.querySelectorAll("button.arithmeticOperator");
            arithmeticButtons.forEach(b => b.style.backgroundColor = "red");

            operation.operator = event.target.textContent;
        } else
            alert("Oops!\nSilly, you can only perform one arithmetic operation at a time!");
    } else
        alert("Oops!\nCannot perform an arithmetic operation on a single operand!");
}

function evaluationEventListener() {
    if (operation.LVal && operation.RVal && operation.operator) {
        if (isEvaluationEventListenerEnabled) {
            if (operation.RVal === "0" && operation.operator === "/")
                alert("Seriously, are you trying to break my calculator?\nYou cannot divide by 0!");
            else {
                isEvaluationEventListenerEnabled = false;
                const evaluationButton = calculatorButtonsDiv.querySelector("button.evaluationOperator");
                evaluationButton.style.backgroundColor = "red";

                operation.LVal = Number(operation.LVal);
                operation.RVal = Number(operation.RVal);
                calculatorScreenTxt.textContent = operate(operation.LVal, operation.operator, operation.RVal);
            }
        } else
            alert("Oops!\nArithmetic operation already in progress!");
    } else
        alert("Oops!\nThe supplied calculation cannot be performed; invalid syntax.");
}

function clearButtonEventListener() {
    // Reset vars, clear calc screen, & remove button bg colors
    isArithmeticEventListenerEnabled = true;
    isEvaluationEventListenerEnabled = true;

    operation.LVal = "";
    operation.RVal = "";
    operation.operator = undefined;

    calculatorScreenTxt.textContent = "Calculation results will appear here.";

    const arithmeticButtons = calculatorButtonsDiv.querySelectorAll("button");
    arithmeticButtons.forEach(b => b.style.backgroundColor = "");
}
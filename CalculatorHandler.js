
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
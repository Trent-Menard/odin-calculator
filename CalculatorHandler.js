
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
            add(LVal,RVal);
            break;
        case '-':
            subtract(LVal, RVal);
            break;
        case '*':
            multiply(LVal,RVal);
            break;
        case '/':
            divide(LVal,RVal);
            break;
        default:
            console.error("Invalid operand supplied.");
            return -1;
    }
}

let testPass = operate(1, '+', 1);
console.log(testPass);

let testFail = operate(1, '?', 1);
console.log(testFail);
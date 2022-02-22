const buttons = document.querySelectorAll('button');
const calcDisplay = document.querySelector('#display');
const OPERATORS = ['+', '-', '*', '/', '\\', '='];
let userInput = 0, firstOperand = 0;

function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) return 'ERROR';

    return (num1 / num2).toFixed(2);
}

//  =
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
        case '\\':
            return divide(num1, num2);
            break;
        default:
            return 'ERROR';
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        userInput = buttons[i].textContent;

        if (userInput === 'CLEAR') {
            calcDisplay.textContent = '...hello...';
            firstOperand = 0;
        }

        else if (calcDisplay.textContent === '...hello...' || calcDisplay.textContent === 'ERROR' || (userInput == '.') && calcDisplay.textContent.includes('.')) {
            if (OPERATORS.includes(userInput)) {
                console.log('ERROR');
            }

            else if (userInput == '.') {
                //do nothing
            }

            else {
                calcDisplay.textContent = userInput;
            }
        }

        // else if (input is equal to equals)
        else if (userInput == '=') {
            calcDisplay.textContent = operate(firstOperand.charAt(firstOperand.length - 1), firstOperand.slice(0, firstOperand.length - 1), calcDisplay.textContent.slice(firstOperand.length, calcDisplay.textContent.length));
            firstOperand = 0;
        }

        //checks to see if last input was a number
        else if (!(OPERATORS.includes(calcDisplay.textContent[calcDisplay.textContent.length - 1]))) {
            if (userInput == '=') {
                calcDisplay.textContent = operate(firstOperand.charAt(firstOperand.length - 1), firstOperand.slice(0, firstOperand.length - 1), calcDisplay.textContent.slice(firstOperand.length, calcDisplay.textContent.length));
            }

            else if (OPERATORS.includes(userInput)) {
                if (firstOperand == 0) {
                    calcDisplay.textContent += userInput;
                    firstOperand = calcDisplay.textContent;
                }

                else {
                    console.log(operate(firstOperand.charAt(firstOperand.length - 1), firstOperand.slice(0, firstOperand.length - 1), calcDisplay.textContent.slice(firstOperand.length, calcDisplay.textContent.length)));

                    if (firstOperand.charAt(firstOperand.length - 1) == '=') {
                        userInput = '';
                    }

                    calcDisplay.textContent = operate(firstOperand.charAt(firstOperand.length - 1), firstOperand.slice(0, firstOperand.length - 1), calcDisplay.textContent.slice(firstOperand.length, calcDisplay.textContent.length)) + userInput;

                    firstOperand = calcDisplay.textContent;
                }
            }

            else {
                calcDisplay.textContent += userInput;
            }
        }

        //checks to see if last input was an operator
        else if (OPERATORS.includes(calcDisplay.textContent[calcDisplay.textContent.length - 1])) {
            if (OPERATORS.includes(userInput)) {
                //change operator to input
                calcDisplay.textContent = calcDisplay.textContent.slice(0, calcDisplay.textContent.length - 1) + userInput;
                firstOperand = calcDisplay.textContent;
            }

            else {
                calcDisplay.textContent += userInput;
            }
        }
    });
}
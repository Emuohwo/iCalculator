const container = document.querySelector('.container');

const btnkeys = document.querySelector('.calculatorKeys');

const screen = document.querySelector('.calculatorScreen');

const calculator = { 
    displayValue: '0', 
    firstOperand: null, 
    waitingForSecondOperand: false, 
    operator: null, 
};

function updateDisplay() { 
     screen.textContent = calculator.displayValue; 
} 
updateDisplay();

btnkeys.addEventListener('click', e => {
    const { target } = e;
    if (target.classList.contains('operator')) {
        handleOperator(target.value); 
        updateDisplay();
    return;
    }

    if (target.classList.contains('digit')) {
        inputDigit(target.value); 
        updateDisplay(); 
    return;
    }

    if (target.classList.contains('reset')) {
        resetCalculator(target.value);
        updateDisplay(); 
    return;
    }

    if (target.classList.contains('dot')) {
        inputDecimal(target.value); 
        updateDisplay(); 
    return;
    }
})

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit; 
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    // screen.textContent = calculator.displayValue;
    console.log(calculator);

}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;
     // If the `displayValue` does not contain a decimal point 
     if (!calculator.displayValue.includes(dot)) { 
         // Append the decimal point
          calculator.displayValue += dot; 
        } 
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        calculator.firstOperand = currentValue;
        const result = performCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result); 
        calculator.firstOperand = result;
    }
    
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}
const performCalculation = { 
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand, 
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand, 
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand, 
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand, 
  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
    
}
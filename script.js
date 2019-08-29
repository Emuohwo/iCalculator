const container = document.querySelector('.container');

const btnkeys = document.querySelector('.calculatorKeys');

const screen = document.querySelector('.calculatorScreen')

btnkeys.addEventListener('click', evt => {
    if (evt.target.matches('button')) {
        const digit = evt.target;
        const operator = digit.dataset.operator;
         

        const specificDigit = digit.textContent;
        const screenView = screen.textContent;
        if(!operator) {
            if(screenView === '0'){
                screen.textContent = specificDigit;
            } else {
                screen.textContent = screenView + specificDigit;
            }
        }
        // Enable user to type number with decimal point
        if(operator === 'decimal'){
            if (!screenView.includes('.')) {
                screen.textContent = screenView + '.';
            }
        }
    }
})
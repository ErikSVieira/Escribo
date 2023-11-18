window.onload = inputFocus;

const inputNumber = document.getElementById('number');

inputNumber.addEventListener('keydown', (e) => {
    if (event.key === 'Enter') {
        calculation();
    }
});

function inputFocus() {
    inputNumber.focus();
}

const btnCalculation = document.getElementById('btnCalculation');

btnCalculation.addEventListener('click', () => {
    calculation();
});

function calculation() {
    const number = getNumber();

    const numberArray = getNumberArray(number);

    const total = totalArray(numberArray, number);

    printNumberArray(numberArray);
    printResult(total);

    inputFocus();
}

function getNumber() {
    const inputNumber = document.getElementById('number').value;
    
    const number = parseInt(inputNumber);

    return number;
}

function getNumberArray(number) {
    let numberArray = [];

    for (; number > 0; number--) {
        if (number % 3 === 0 || number % 5 === 0) {
            numberArray.push(number);
        }
    }

    return numberArray;
}

function totalArray(numberArray, number) {
    let somar = numberArray.reduce((result, value) => {
        if (value < number) {
            return result + value;
        } else {
            return result;
        }
    }, 0);

    return somar;
}

function printNumberArray(numberArray) {
    const spanContainer = document.getElementById('array');

    spanContainer.innerHTML = '';

    numberArray.shift();

    spanContainer.innerHTML = numberArray.reverse();
}

function printResult(total) {
    const spanContainer = document.getElementById('total');

    spanContainer.innerHTML = '';

    spanContainer.innerHTML = total;
}
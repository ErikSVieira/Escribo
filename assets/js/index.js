// Ao carregar a página executa a função "inputFocus"
window.onload = inputFocus;

// Pega o elemento input com ID number
const inputNumber = document.getElementById('number');

// Adiciona evento no inputNumber de 'keydown', quando receber a tecla "Enter" executa a função calculation
inputNumber.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculation();
    }
});

// Função que deixa o inputNumber em focu
function inputFocus() {
    inputNumber.focus();
}

// Pega o elemento "btnCalculation"
const btnCalculation = document.getElementById('btnCalculation');

// Adiciona evento no btnCalculation de 'click', para executa a função calculation
btnCalculation.addEventListener('click', () => {
    calculation();
});

// Função principal, executa varias função para entregar o resultado esperado
function calculation() {
    const number = getNumber();

    const numberArray = getNumberArray(number);

    const total = totalArray(numberArray, number);

    printNumberArray(numberArray, number);
    printResult(total);

    inputFocus();
}

// Pega o numero do elemento 'number'
function getNumber() {
    const inputNumber = document.getElementById('number').value;
    
    const number = parseInt(inputNumber);

    return number;
}

// Cria um array dos números divisíveis por 3 ou 5
function getNumberArray(number) {
    let numberArray = [];

    for (; number > 0; number--) {
        if (number % 3 === 0 || number % 5 === 0) {
            numberArray.push(number);
        }
    }

    return numberArray;
}

// Soma todos os números doa array menos se o número for igual ao número informado
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

// Imprimi os números do array que foram somandos na página
function printNumberArray(numberArray, number) {
    const spanContainer = document.getElementById('array');

    spanContainer.innerHTML = '';

    if (number === numberArray[0]) {
        numberArray.shift();
    }

    spanContainer.innerHTML = numberArray.reverse();
}

// Imprimi a soma total do array
function printResult(total) {
    const spanContainer = document.getElementById('total');

    spanContainer.innerHTML = '';

    spanContainer.innerHTML = total;
}
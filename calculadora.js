const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');

let currentExpression = '';
let isCalculated = false;

function appendNumber(num) {
    // Se o resultado acabou de ser calculado, limpa para começar uma nova conta
    if (isCalculated) {
        currentExpression = '';
        isCalculated = false;
        resultDisplay.classList.remove('error');
    }

    // Evita múltiplos pontos decimais no mesmo número
    if (num === '.' && currentExpression.split(/[\+\-\*\/]/).pop().includes('.')) {
        return;
    }

    currentExpression += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentExpression === '' && op !== '-') return;

    if (isCalculated) {
        isCalculated = false;
        resultDisplay.classList.remove('error');
    }

    // Se o último caractere já for um operador, substitui pelo novo
    const lastChar = currentExpression.trim().slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1) + op;
    } else {
        currentExpression += op;
    }

    updateDisplay();
}

function clearDisplay() {
    currentExpression = '';
    expressionDisplay.innerText = '';
    resultDisplay.innerText = '0';
    resultDisplay.classList.remove('error');
    isCalculated = false;
}

function deleteLast() {
    if (isCalculated) return;
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    // Troca os símbolos internos por símbolos mais amigáveis no visor
    expressionDisplay.innerText = currentExpression.replace(/\*/g, ' × ').replace(/\//g, ' ÷ ');
}

function calculate() {
    if (currentExpression === '') return;

    try {
        // Avalia a expressão matemática com segurança básica
        // eval() é aceitável aqui por ser um escopo estritamente controlado via botões
        let result = eval(currentExpression);

        if (result === Infinity || result === -Infinity || isNaN(result)) {
            throw new Error("Divisão por zero");
        }

        // Arredonda casas decimais longas para não quebrar o layout
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(8));
        }

        resultDisplay.innerText = result;
        resultDisplay.classList.remove('error');
        isCalculated = true;
    } catch (error) {
        resultDisplay.innerText = 'Erro';
        resultDisplay.classList.add('error');
        isCalculated = true;
    }
}
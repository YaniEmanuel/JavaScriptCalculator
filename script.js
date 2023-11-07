document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';
  
    // Función para actualizar el display
    function updateDisplay() {
      display.textContent = currentInput || '0';
    }
  
    // Función para manejar los números y el punto decimal
    function handleNumberInput(value) {
      if (currentInput === '0' && value !== '.') {
        currentInput = value;
      } else if (value === '.' && currentInput.includes('.')) {
        return;
      } else {
        currentInput += value;
      }
      updateDisplay();
    }
  
    // Función para manejar los operadores
    function handleOperatorInput(operator) {
      if (currentOperator && previousInput) {
        performCalculation();
      } else {
        previousInput = currentInput;
        currentInput = '';
      }
      currentOperator = operator;
    }
  
    // Función para realizar el cálculo
    function performCalculation() {
      const num1 = parseFloat(previousInput);
      const num2 = parseFloat(currentInput);
  
      switch (currentOperator) {
        case '+':
          currentInput = (num1 + num2).toString();
          break;
        case '-':
          currentInput = (num1 - num2).toString();
          break;
        case '*':
          currentInput = (num1 * num2).toString();
          break;
        case '/':
          if (num2 !== 0) {
            currentInput = (num1 / num2).toString();
          } else {
            currentInput = 'Error';
          }
          break;
      }
  
      previousInput = '';
      currentOperator = '';
      updateDisplay();
    }
  
    // Función para borrar
    function clear() {
      currentInput = '';
      previousInput = '';
      currentOperator = '';
      updateDisplay();
    }
  
    // Manejo de clics en los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        const value = button.textContent;
  
        if (/[0-9.]/.test(value)) {
          handleNumberInput(value);
        } else if (/[+\-*/]/.test(value)) {
          handleOperatorInput(value);
        } else if (value === '=') {
          performCalculation();
        } else if (value === 'AC') {
          clear();
        }
      });
    });
  });  
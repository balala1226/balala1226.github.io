let didClickOperator = false;
let hasDecimal = false;
let shouldGetSum = false;
let isCurrentScreenValueSum = false

let currentNumbersOnScreen = [];

let currentSum = 0.0;
let currentOperation = '';

function onNumberClick(value)
{
    var screenDiv = document.getElementById('screen');

    if (value == '.' && hasDecimal)
    {
        return;
    }

    isCurrentScreenValueSum = false;
    if (didClickOperator)
    {
        hasDecimal = false;
        currentNumbersOnScreen = [];
        screenDiv.innerHTML = '';
    }

    didClickOperator = false;
    currentNumbersOnScreen.push(value);
    screenDiv.innerHTML += value;

    if (value == '.')
    {
        hasDecimal = true;
    }
}

function onDelete()
{
    if (isCurrentScreenValueSum)
    {
        return;
    }

    if (currentNumbersOnScreen.length <= 0)
    {
        return;
    }

    currentNumbersOnScreen.pop();

    var screenDiv = document.getElementById('screen');
    screenDiv.innerHTML = '';
    for (var index = 0; index < currentNumbersOnScreen.length; index++){
        screenDiv.innerHTML += currentNumbersOnScreen[index];
    }
}

function onAllClear()
{
    var screenDiv = document.getElementById('screen');
    currentNumbersOnScreen = [];
    screenDiv.innerHTML = '';
    currentSum = 0.0;
    didClickOperator = false;
    shouldGetSum = false;
    isCurrentScreenValueSum = false;
    currentOperation = '';
}

function onOperatorClick(operator)
{
    didClickOperator = true;

    if (shouldGetSum)
    {
        calculateSum();

        isCurrentScreenValueSum = true;

        var screenDiv = document.getElementById('screen');
        screenDiv.innerHTML = currentSum.toString();
        currentNumbersOnScreen = []
    }
    else
    {
        var screenDiv = document.getElementById('screen');
        currentSum = parseFloat(screenDiv.innerHTML);
    }

    currentOperation = operator;
    shouldGetSum = true;
}

function onSumClick()
{
    calculateSum();

    isCurrentScreenValueSum = true;

    var screenDiv = document.getElementById('screen');
    screenDiv.innerHTML = currentSum.toString();
    currentNumbersOnScreen = []
}

function calculateSum()
{
    shouldGetSum = false;

    var screenDiv = document.getElementById('screen');
    var screenValue = parseFloat(screenDiv.innerHTML);
    switch(currentOperation) {
        case 'multiply':
            currentSum *= screenValue;
            break;
        case 'add':
            currentSum += screenValue;
            break;
        case 'subtract':
            currentSum -= screenValue;
            break;
        case 'divide':
            currentSum /= screenValue;
            break;
    }
}
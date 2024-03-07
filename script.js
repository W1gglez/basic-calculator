let clear = document.querySelector('.clear')
let decimal = document.querySelector('.decimal')
let equal = document.querySelector('.equals')

let numbers = document.querySelectorAll('.number')
let operators = document.querySelectorAll('.operator')

let previous = document.querySelector('.previous')
let current = document.querySelector('.current')

let operator = ''
let previousValue = ''
let currentValue = ''
let previousScreen = ''

numbers.forEach((number) => number.addEventListener('click', (e) => {
    console.log(currentValue)
    handleNumber(e.target.textContent)
    console.log(currentValue)
    current.textContent = currentValue
}))

operators.forEach((op) => op.addEventListener('click', (e) => {
    evaluatePair()
    handleOperator(e.target.textContent)
    previous.textContent = previousScreen
    current.textContent = currentValue
    
}))

clear.addEventListener('click', clearDisplay)

equal.addEventListener('click', () => {
    previous.textContent = previousScreen + currentValue + ' ='
    calculate()
    if(currentValue){
    current.textContent = currentValue
    } else {
        current.textContent = ''
    }
    previousScreen = ''
    operator = ''
    
 })
    
 decimal.addEventListener('click', () => {
    if(!currentValue.includes('.')){
        currentValue += '.'
    }
    current.textContent = currentValue
 })

function handleNumber(num){
    if (currentValue.length <= 5){
        currentValue += num
    }
}

function handleOperator(op){
    if(currentValue && previous){
    operator += op
    previousScreen += currentValue + ' ' + operator + ' '
    previousValue += currentValue
    currentValue = ''
    }
   }

function clearDisplay(){
    current.textContent = ''
    currentValue = ''
    previous.textContent = ''
    previousValue = ''
    previousScreen = ''
    operator = ''
}

function calculate(){
    previousValue = Number(previousValue)
    currentValue = Number(currentValue)
    if(operator == '+'){
        currentValue = previousValue + currentValue;
        previousValue = ''
    } else if (operator == '-'){
        currentValue = previousValue - currentValue;
        previousValue = ''
    } else if (operator == '*'){
        currentValue = previousValue * currentValue;
        previousValue = ''
    } else if (operator == '/'){
        if(currentValue == 0){
            previous.textContent = '#DIV/0!'
            currentValue = ''
            previousValue = ''
        } else {
        currentValue = previousValue / currentValue;
        previousValue = ''
        }
    }
}

function evaluatePair(){
    if(!(currentValue == '') && !(previousValue == '')){
        calculate()
        current.textContent = currentValue
        previousScreen = ''
        operator = ''
    }
}
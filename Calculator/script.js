class Calculator{
  constructor(previousoperandTextelement,currentoperandTextelement){
    this.previousoperandTextelement = previousoperandTextelement;
    this.currentoperandTextelement = currentoperandTextelement;
    this.clear();
  }

  clear(){
    this.currentOperand =''
    this.previousOperand = ''
    this.operation = undefined
  }
  delete(){
    this.currentOperand =this.currentOperand.toString().slice(0,-1)
  }
  appendNumber(number){
    if(number==='.'&& this.currentOperand.includes('.')){return } ;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation){ 
    if(this.currentOperand === '')return
    if(this.previousOperand !== ''){this.compute()}
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand =''
  }
  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev)|| isNaN(current))return
    switch(this.operation){
      case '+':
      computation = prev+current;
      break;
      case '-':
      computation = prev-current;
      break;
      case '*':
      computation = prev*current;
      break;
      case '/':
      computation = prev/current;
      break;
      default:return
    }
    this.currentOperand =computation
    this.operation =undefined
    this.previousOperand=''
  }
  getdisplayno(number)
  {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let intDisplay
    if(isNaN(integerDigits)){
      intDisplay = ''
    }
    else{
      intDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0})
    }
  if(decimalDigits != null){
    return `${intDisplay}.${decimalDigits}`
  }
  else{
    return intDisplay
  }
  }
  updateDisplay(){
    

    this.currentoperandTextelement.innerText =this.getdisplayno(this.currentOperand)
    if(this.previousOperand !== ''){
    this.previousoperandTextelement.innerText =  this.getdisplayno(this.previousOperand) +this.operation}
    else{this.previousoperandTextelement.innerText = this.getdisplayno(this.previousOperand) }
  }
}

const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-all-clear]')
const previousoperandTextelement = document.querySelector('[data-previous-operand]')
const currentoperandTextelement = document.querySelector('[data-current-operand]')

const calc = new Calculator(previousoperandTextelement,currentoperandTextelement)

numberButton.forEach(button =>{
  button.addEventListener('click',() => {
    console.log(button.innerText)
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
  })
})
operationButton.forEach(button =>{
  button.addEventListener('click',() => {
    console.log(button.innerText)
    calc.chooseOperation(button.innerText);
    calc.updateDisplay();
  })
})
equalButton.addEventListener("click",button =>{
  calc.compute()
  calc.updateDisplay()
})
allclearButton.addEventListener("click",button =>{
  calc.clear()
  calc.updateDisplay()
  document.querySelector("#current-operand").innerText="0"
})
deleteButton.addEventListener("click",button =>{
  calc.delete()
  calc.updateDisplay()
})

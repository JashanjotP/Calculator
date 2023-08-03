const numbers = document.querySelectorAll(".nums");
const operator = document.querySelectorAll(".operators");
const equal = document.querySelector(".result");
const clear = document.querySelector(".clear");
const deleteNum = document.querySelector(".delete");
const decimal = document.querySelector(".decimal");
const last = document.querySelector(".equation")
const current = document.querySelector(".display-num")

let firstNum = '';
let secondNum = '';
let operation = null;
let reset = false;

equal.addEventListener("click",()=>evaluate());

clear.addEventListener("click", () =>Allclear());

numbers.forEach((e)=>{
    e.addEventListener("click",()=> append(e.value));
});

operator.forEach((e) => {
    e.addEventListener("click",() => setOperator(e.value));
})

deleteNum.addEventListener("click",()=> del());

decimal.addEventListener("click", () => appendDot());

window.addEventListener("keydown",(e)=>{

    if(e.key >= 0 && e.key<=9){
        append(e.key);
    }
    else if(e.key === "."){
        appendDot();
    }
    else if (e.key === "Backspace"){
        del();
    }
    else if(e.key === "=" || e.key === "Enter"){
        evaluate();
    }
    else if(e.key === "+" ||e.key === "-" ||e.key === "*" || e.key === "/"){
        setOperator(e.key);
    }
});

function del(){
    current.textContent = current.textContent.toString().slice(0,-1);
}

function resetScreen(){
    current.textContent = "";
    reset = false;
}

function append(number){
    if(current.textContent==="0" || reset){
        resetScreen();
    }
    current.textContent += number
}

function appendDot(){
    if(reset){
        resetScreen();
    }
    if(current.textContent.includes(".")){
        return;
    }
    current.textContent+= "."
}

function operate(operation,a,b){

    a = Number(a);
    b = Number(b);

    if(operation === "+"){
        return a + b;
    }
    else if(operation === "-"){
        return a - b; 
    }
    else if(operation === "*"){
        return a * b;
    }
    else if(operation === "/"){
        if (b === "0") return
        return a / b;
    }
}

function Allclear() {
    current.textContent = '0'
    last.textContent = ''
    firstNum = ''
    secondNum = ''
    operation = null;
  }

  function setOperator(operator) {
    if (operation !== null) evaluate()
    firstNum = current.textContent;
    operation = operator;
    last.textContent = `${firstNum} ${operator}`
    reset = true
  }
  
function evaluate(){
    if (operation === null || reset) return
    if (operation === '/' && current.textContent === '0') {
        alert("You can't divide by 0!")
        return;
  }
  secondNum = current.textContent
  current.textContent = round(operate(operation, firstNum, secondNum));
  
  last.textContent = `${firstNum} ${operation} ${secondNum} =`
  operation = null
}

function round (num){
    return Math.round(num *1000)/1000;
}
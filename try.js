let isResultDisplayed = false;

const display = document.querySelector(".display"); 

function clearDisplay(){
    display.textContent = '';
}

function deleteLast(){
    if(display.textContent === 1 || display.textContent === 'error'){
        display.textContent = '';
    }else{
        display.textContent = display.textContent.slice(0, -1);
    }
}

function appedToDisplay(value){
    let current = display.textContent;
    const lastChar = current.slice(-1)

    if(isResultDisplayed && !"+-*/%".includes(value)){
        display.textContent = '';
        isResultDisplayed = false;
        return;
    }
    
    if(isResultDisplayed && "*-/+%".includes(value)){
        isResultDisplayed = false;
    }

    if(current === '' || current === "error"){
        if(current === '' && "*/-+%".includes(value)){
            return
        }
        document.textContent = value;
        return;
    }

    if("%/*-+".includes(value) && "%/*-+".includes(lastChar)){
        return;
    }

    display.textContent += value;
}

function convert(){
    let current = display.textContent;
    if(!isNaN(current) && current.trim() !== ''){
        display.textContent = Number(current) * -1;
    }
}

function calculate(){
    let current = display.textContent.trim();

    if(current !== '' && current !== 'error'){
        try{
            let result = eval(current);

            if(!isNaN){
                display.textContent = result;
                isResultDisplayed = true;
            }else{
                display.textContent = 'error';
            }
        }catch (e){
            display.textContent = 'error';
        }
    }
}
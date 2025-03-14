// Flag
let isResultDisplayed = false;

// Global variable
const display = document.querySelector(".display");

function clearDisplay() {
    display.textContent = "";
};

function deleteLast() {
    if (display.textContent === 1 || display.textContent === "error") {
        display.textContent = '';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
};

function appedToDisplay(value) {
    let current = display.textContent;
    const lastChar = current.slice(-1);

    if (isResultDisplayed && !"+-*/%".includes(value)) {
        display.textContent = value;
        isResultDisplayed = false; // Reset flag
        return;
    }

    if (isResultDisplayed && "+-*/%".includes(value)) {
        isResultDisplayed = false;
    }

    if (current === "" || current === "error") {
        if (current === "" && "+*/%".includes(value)) {
            return;
        }
        display.textContent = value;
        return;
    }

    if ("/*-+%".includes(value) && "/*-+%".includes(lastChar)) {
        return;
    }

    display.textContent += value;
}

function calculate() {
    let current = display.textContent.trim();

    // Check if the display contains an expression and it's not empty or "error"
    if (current !== "" && current !== "error") {
        try {
            // Evaluate the expression and update the display with the result
            let result = calculateFnc(current);

            // If result is a valid number, display it; otherwise, display an error
            if (!isNaN(result)) {
                display.textContent = result;
                isResultDisplayed = true;
            } else {
                display.textContent = "error";
            }
        } catch (e) {
            // If an error occurs during evaluation (e.g., malformed expression), show "error"
            display.textContent = "error";
        }
    }
}

function calculateFnc(expression) {
    const operators = /[/*+%]/;
    let tokens = expression.split(/([/*+\-()%])/).map(sign => sign.trim());

    if (tokens.length < 3) {
        return;
    }

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let nextNum = parseFloat(tokens[i + 1]);

        if (isNaN(nextNum)) {
            return NaN;
        }

        switch (operator) {
            case "+":
                result += nextNum;
                break;

            case "-":
                result -= nextNum;
                break;

            case "*":
                result *= nextNum;
                break;

            case "/":
                result = nextNum !== 0 ? result / nextNum : "error";
                break;

            case "%":
                result = result * (nextNum / 100);
                break;
        }
    }
    return result;
}

function convert() {
    let current = display.textContent;
    if (!isNaN(current) && current.trim() !== '') {
        display.textContent = Number(current) * -1;
    }
}

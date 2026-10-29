const screen = document.querySelector("#screen p");
const buttons = document.querySelectorAll("#buttons button");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";
let calculationCompleted = false;


// Display something on the calculator screen
function display(value) {
    screen.textContent = value;
}


// Go through every button
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.textContent;


        // ==========================
        // NUMBERS AND DECIMAL
        // ==========================

        if (!isNaN(value) || value === ".") {

            // If previous calculation is completed,
            // start a new calculation
            if (calculationCompleted) {

                firstNumber = "";
                secondNumber = "";
                operator = "";
                result = "";

                calculationCompleted = false;
            }


            // First number
            if (operator === "") {

                // Prevent two decimal points
                if (value === "." && firstNumber.includes(".")) {
                    return;
                }

                firstNumber += value;

                display(firstNumber);
            }


            // Second number
            else {

                // Prevent two decimal points
                if (value === "." && secondNumber.includes(".")) {
                    return;
                }

                secondNumber += value;

                display(firstNumber + operator + secondNumber);
            }
        }


        // ==========================
        // OPERATORS
        // ==========================

        else if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷"
        ) {

            // Don't allow operator without number
            if (firstNumber === "") {
                return;
            }


            // If user already entered an operator,
            // don't replace the calculation unnecessarily
            if (secondNumber !== "") {
                return;
            }


            operator = value;

            display(firstNumber + operator);
        }


        // ==========================
        // EQUALS
        // ==========================

        else if (value === "=") {

            // Make sure calculation is complete
            if (
                firstNumber === "" ||
                secondNumber === "" ||
                operator === ""
            ) {
                return;
            }


            let num1 = Number(firstNumber);
            let num2 = Number(secondNumber);


            // Addition
            if (operator === "+") {

                result = num1 + num2;
            }


            // Subtraction
            else if (operator === "−") {

                result = num1 - num2;
            }


            // Multiplication
            else if (operator === "×") {

                result = num1 * num2;
            }


            // Division
            else if (operator === "÷") {

                if (num2 === 0) {

                    display("Error");

                    firstNumber = "";
                    secondNumber = "";
                    operator = "";
                    result = "";

                    calculationCompleted = true;

                    return;
                }

                result = num1 / num2;
            }


            // Show result
            display(result);


            // Remember that calculation is finished
            calculationCompleted = true;
        }


        // ==========================
        // CLEAR ALL
        // ==========================

        else if (value === "C") {

            firstNumber = "";
            secondNumber = "";
            operator = "";
            result = "";

            calculationCompleted = false;

            display("0");
        }


        // ==========================
        // CLEAR ENTRY
        // ==========================

        else if (value === "CE") {

            if (operator === "") {

                firstNumber = "";

            } else {

                secondNumber = "";
            }

            display("0");
        }


        // ==========================
        // BACKSPACE
        // ==========================

        else if (value === "DEL") {

            // If calculation is finished,
            // don't modify the result
            if (calculationCompleted) {
                return;
            }


            if (operator === "") {

                firstNumber = firstNumber.slice(0, -1);

                if (firstNumber === "") {
                    display("0");
                } else {
                    display(firstNumber);
                }

            } else {

                secondNumber = secondNumber.slice(0, -1);

                if (secondNumber === "") {
                    display(firstNumber + operator);
                } else {
                    display(firstNumber + operator + secondNumber);
                }
            }
        }


        // ==========================
        // PERCENTAGE
        // ==========================

        else if (value === "%") {

            if (calculationCompleted) {
                return;
            }


            if (operator === "") {

                if (firstNumber !== "") {

                    firstNumber = Number(firstNumber) / 100;

                    display(firstNumber);
                }

            } else {

                if (secondNumber !== "") {

                    secondNumber = Number(secondNumber) / 100;

                    display(firstNumber + operator + secondNumber);
                }
            }
        }

    });

});
// ==========================
// KEYBOARD SUPPORT
// ==========================

document.addEventListener("keydown", function (event) {

    let key = event.key;


    // ==========================
    // NUMBERS
    // ==========================

    if (key >= "0" && key <= "9") {

        handleKeyboardButton(key);

    }


    // ==========================
    // DECIMAL
    // ==========================

    else if (key === ".") {

        handleKeyboardButton(".");

    }


    // ==========================
    // OPERATORS
    // ==========================

    else if (key === "+") {

        handleKeyboardButton("+");

    }

    else if (key === "-") {

        handleKeyboardButton("-");

    }

    else if (key === "*") {

        handleKeyboardButton("X");

    }

    else if (key === "/") {

        // Prevent browser from opening search/find
        event.preventDefault();

        handleKeyboardButton("÷");

    }


    // ==========================
    // ENTER = EQUALS
    // ==========================

    else if (key === "Enter" || key === "=") {

        handleKeyboardButton("=");

    }


    // ==========================
    // BACKSPACE
    // ==========================

    else if (key === "Backspace") {

        handleKeyboardButton("⌫");

    }


    // ==========================
    // ESCAPE = CLEAR
    // ==========================

    else if (key === "Escape") {

        handleKeyboardButton("C");

    }


    // ==========================
    // PERCENTAGE
    // ==========================

    else if (key === "%") {

        handleKeyboardButton("%");

    }

});


// ==========================
// KEYBOARD BUTTON FUNCTION
// ==========================

function handleKeyboardButton(keyValue) {

    buttons.forEach(function (button) {

        let buttonValue = button.textContent.trim();

        // Keyboard * corresponds to calculator X
        if (
            keyValue === "X" &&
            (buttonValue === "X" || buttonValue === "×")
        ) {

            button.click();
            return;
        }


        // Keyboard backspace
        if (
            keyValue === "⌫" &&
            (buttonValue === "⌫" || buttonValue === "DEL")
        ) {

            button.click();
            return;
        }


        // Normal matching
        if (buttonValue === keyValue) {

            button.click();
            return;
        }

    });

}

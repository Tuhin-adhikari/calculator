let icons = document.querySelectorAll(".icons");    //Getting all the buttons with numbers and operatos
let infix = document.querySelector(".infix");    //the text content to be displayed to the user
let result = document.querySelector(".result");    //Result

//Getting the value (number or operator) from the user
icons.forEach((icon) => {
    icon.addEventListener("click", () => {
        let value = icon.textContent.trim();
        let expression = infix.textContent;

        if (value === "AC") {
            infix.textContent = "";
            result.textContent = "";
            result.style.display = "none";
        } else if (value === "DEL") {
            infix.textContent = expression.slice(0, -1);
            result.style.display = "none";
        } else if (value === "=") {
            try {
                let cleaned = expression.replace(/(^|[^0-9.])0+(\d)/g, '$1$2')
                                        .replace(/(^|[^0-9])\.(\d+)/g, '$10.$2')
                                        .replace(/^0+(\d)/, '$1');
                result.textContent = eval(cleaned);
                result.style.display = "block";
            } catch {
                result.textContent = "Error";
                result.style.display = "block";
            }
        } else {
            let newExpr = expression + value;
            let lastOpIndex = Math.max(
                newExpr.lastIndexOf('+'),
                newExpr.lastIndexOf('-'),
                newExpr.lastIndexOf('*'),
                newExpr.lastIndexOf('/'),
                newExpr.lastIndexOf('%')
            );
            let prefix = newExpr.substring(0, lastOpIndex + 1);
            let lastSegment = newExpr.substring(lastOpIndex + 1);
            lastSegment = lastSegment
                .replace(/^0+(\d)/, '$1')
                .replace(/^0+$/, '0')
                .replace(/^(\d*)\.(\d*)$/, (m, a, b) => (a === '' ? '0' : a) + '.' + b);
            infix.textContent = prefix + lastSegment;
            result.style.display = "none";
        }
    });
});

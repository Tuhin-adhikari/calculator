let icons = document.querySelectorAll(".icons");
let infix = document.querySelector(".infix");
let result = document.querySelector(".result");

//Clicking numbers or operators
icons.forEach((icon) => {
    icon.addEventListener("click", () => {
        let value = icon.textContent.trim();

        if (value === "00") {   //If the start number is 0 and we click 00, we need it as 0
            if (infix.textContent === "" || infix.textContent === "0") {    //checking if the content is empty for 00 or 0
                infix.textContent = "0";
            } else {
                infix.textContent += "00";  //for a non zero element it should be added as 00 at end, for eg : 1 and then we can add 00
            }
            result.style.display = "none";
        } else if (value === "AC") {
            infix.textContent = "";
            result.textContent = "";
            result.style.display = "none";
        } else if (value === "DEL") {
            infix.textContent = infix.textContent.slice(0, -1);
            result.style.display = "none";
        } else if (value === "=") {
            try {
                let evaluated = eval(infix.textContent);
                result.textContent = evaluated;
                result.style.display = "block";
            } catch {
                result.textContent = "Error";
                result.style.display = "block";
            }
        } else {
            infix.textContent += value;
            result.style.display = "none";
        }
    });
});

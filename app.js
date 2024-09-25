import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of second",
    validate: (input) => {
        const numberInput = Number(input);
        if (isNaN(numberInput)) {
            return "Please enter a valid number";
        }
        else if (numberInput > 60) {
            return "seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = response.userInput;
function startTime(value) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(initialTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        if (timeDifference <= 0) {
            console.log("Timer has expired");
            process.exit();
        }
        const minutes = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const second = Math.floor(timeDifference % 60);
        console.log(`${minutes.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);

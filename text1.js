const { isBefore, format, addDays, addMinutes } = require("date-fns")

let today = new Date()

console.log(today);

// let x = format(today, "dd/MM/yyyy")
// console.log(x);
let y = format(today, "dd/LLLL/yyyy/h:m:s:aaa")
// let fd = addDays(today, 2)
let futureDate = addMinutes(new Date(), 5)
// console.log(format(fd, "dd/MM/Y"));
console.log(format(futureDate, "dd/LLLL/yyyy/h:m:s:aaa"));
console.log(y);
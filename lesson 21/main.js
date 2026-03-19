// задача 1
const firstName = 'Вася';
const lastName = 'Пупкин';
const isStudent = true
// задача 2
const age = 21;
const currentYear = 2026;
const birthYear = currentYear - age;
// задача 3 
console.log(`Меня зовут ${firstName} ${lastName}, мне ${age} лет. Я ученик курса ${isStudent}`);
// задача 4
let a = '123';
let b = +'456';
let c = Number('789');
let d = Boolean(0);
let e = Boolean(' ');
let result = a+b+c+d+e;

//1234567890falsetrue

console.log(result)
for (let i = 1; i <21; i++) {
    if (i % 4 === 0) {
        continue
    }
    console.log(i)
}

const number = +prompt('число');
let factorial = 1;
for (let i = 1; i <= number; i++) {
    factorial *= i;
    console.log(factorial)
}

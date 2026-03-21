const del = 2;

if (del % 2 === 0) {
    console.log('четное число')
} else {
    console.log('нечетное число')
}

let age = 65;
let discount = age < 18 ? 10 : (age <= 65 ? 20 : 30);

console.log(`скидка ${discount}%`)

switch (age) {
    case age < 18:
        discount = 10;
    break;
    case age < 18:
        discount = 20;
    break;
    case age > 66:
        discount = 30;
    break;
}
console.log(`скидка ${discount}%`)


let userName = prompt('ваше имя?');
const password = +prompt('ваш пароль?');
 
if ((userName === 'admin' || userName === 'user') && password === 123456) {
    alert('Доступ разрешен');
} else {
    alert('Кто ты воин ?');
}

const weight = +prompt('Вес вашей доставки?');
const delivery = prompt('напишите тип доставки (стандарт / экспресс / премиум)');

let cof;
let hasError = false;

switch (true) {
    case weight <= 0:
        alert('некорректный вес посылки');
        hasError = true;
        break;
    case delivery !== 'стандарт' && delivery !== 'экспресс' && delivery !== 'премиум':
        alert('неверный тип доставки');
        hasError = true;
        break;
}

if (hasError) {
    let decision = prompt('ты все сломал. Вопрос будем решать тихо, мирно или по жесткому');
    if (decision ==='тихо'||decision ==='мирно') {
        alert('бабки мне скидывай')
    }else {
        alert('диктуй свой id')
    }
} else {
    const priceWeight = weight <= 1 ? 5 : (weight <= 5 ? 10 : 15);

    switch (true) {
        case delivery === 'стандарт':
            cof = 1;
            break;
        case delivery === 'экспресс':
            cof = 1.5;
            break;
        case delivery === 'премиум':
            cof = 2;
            break;
    }
    
    let result = priceWeight * cof;
    alert(`сумма доставки составила: ${result}$`);
}
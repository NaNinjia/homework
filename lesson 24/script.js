// задача 1
function calculateFinalPrice(price, discount, tax) {
    const discountAmount = price * (discount/100);
    const priceAfterDiscount = price - discountAmount;

    const taxAmount = priceAfterDiscount * (tax/100);
    const finalPrice = priceAfterDiscount + taxAmount;

    return finalPrice;
}

console.log(calculateFinalPrice(100, 10, 0.2));


// задача 2
function checkAccess(name, password) {
    if (name === 'admin' && password === 123456) {
        return('доступ разрешен');
    }else {
        return('доступ запрещен');
    }
}

console.log(checkAccess("admin", 123456));

// задача 3
function getTimeOfDay(time) {
    if (time >= 0 && time <= 5) {
        return('ночь');
    }else if (time > 5 && time <= 11) {
        return('утро');
    }else if (time >= 12 && time <= 17) {
        return('день');
    }else if (time >= 17 && time <= 23) {
        return('вечер');
    }else {
        return('Некорректное время')
    }
}

console.log(getTimeOfDay(0))

// задача 4
function findFirstEven(start, end) {
    for (let i = start; i <= end; i++) {
        if (i % 2 === 0) {
            return(i);
        }
    }
    return 'Чётных чисел нет';
}

console.log(findFirstEven(1,10))
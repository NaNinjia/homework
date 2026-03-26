//задача 1

let person = {
    name: "alex",
    age: 23,
    hobby: "fly",
    height: 180,
}

console.log(person);

//задача 2 

function isEmpty(object) {
    for (let key in object) {
        return false;
    }
    return true;
}

console.log(isEmpty())

//задача 3 

const task = {
    title: "объекты",
    description: "понять тему объекты",
    isCompleted: false,
};

function cloneAndModify(object) {
    return {
        ...object,
    };
}

const modifications = cloneAndModify(task);

modifications.time = '12:13pm'

for (let key in modifications) {
    if (modifications.hasOwnProperty(key)) {
        console.log(`${key}: ${modifications[key]}`);
    }
}

//задача 4

const myObject = {
    method1() {
        console.log('Метод 1 вызван');
    },
    method2() {
        console.log('Метод 2 вызван');
    },
    property: 'Это не метод'
};

callAllMethods(myObject);

function callAllMethods(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'function') {
            obj[key]();
        }
    }
}

console.log(callAllMethods(myObject))

//задача 1
const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
];

users.push({ name: 'Ann', age: 19, isAdmin: false });
users.push({ name: 'Jack', age: 43, isAdmin: true })

console.log(users);

//задача 2
function getUserAverageAge(users) {
    const totalAge = users.reduce((sum, user) => sum + user.age, 0);
    return totalAge / users.length;
}

//задача 3
function getAllAdmins(users) {
    return users.filter(user => user.isAdmin === true);
}

//задача 4
function first(arr, n) {
    return n === undefined ? arr.slice(0, 1) : arr.slice(0, n);
}
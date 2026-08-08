// Destructuring (การสลายโครงสร้าง)

// Array แบบดั้งเดิม

const colors = ["red", "green", "blue"];
const red = colors[0];
const green = colors[1];
const blue = colors[2];

console.log(red)
console.log(green)
console.log(blue)

// Array แบบ Destructuring

const colors2 = ["red", "green", "blue"];
const [red2, green2, blue2] = colors2;

console.log(red2)
console.log(green2)
console.log(blue2)

// Object แบบดั้งเดิม

const person = {
    name: "John",
    age: 30,
    city: "New York"
};

const name = person.name;
const age = person.age;
const city = person.city;   

console.log(name)
console.log(age)
console.log(city)   

// Object แบบ Destructuring

const person2 = {
    name: "John",
    age: 30,
    city: "New York"
};

const {name: name2, age: age2, city: city2} = person2;

console.log(name2)
console.log(age2)
console.log(city2)
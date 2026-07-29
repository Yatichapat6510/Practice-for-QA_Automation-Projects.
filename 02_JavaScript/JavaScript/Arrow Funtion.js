// Arrow Function

// แบบดั่งเดิม
function fullname(fname, Lname){
    return fname + Lname;
}

console.log(fullname("Yatichapat ", "Kanta"));


// แบบ Arrow Function
const fullname2 = (fname, Lname) => {
    return fname + Lname;
}

console.log(fullname2("Yatichapat ", "Kanta"));


const setAge = (age) => "อายุ = " + age;

console.log(setAge(27));

// การกระจายสมาชิกใน Array หรือ Object

const newArray = [100, 200, 300];
const data = [10,20, ...newArray, 400, 500];

console.log(data);

const color =["red", "green", "blue"];
const newColor = ["yellow", ...color, "black"];
const allColor = [...newColor, "white", "gray"];
allColor.push("pink");

console.log(allColor);

// Normal function

summation=(x,y)=>{
    return x+y;

}

summation=(x,y,z)=>{
    return x+y+z;

}

console.log(summation(50, 30, 20));

// Rest Parametar

summation=(...args)=>{
    let total=0;
    for(let i=0; i<args.length; i++){
        total+=args[i];
    }
    return total;
}

console.log(summation(50, 30, 20, 10, 5));
console.log(summation(100, 200, 300, 400, 500, 600));
/*
    1. "Right-Angled Triangle Star Pattern" or "Pyramid Pattern"
    <---------------------------------------------------------->
*/

let str = "";

for(let i = 0; i < 5; i++){
    for(let j = 0; j < 5; j++){
        if (j <= i) {
            str = str.concat("* ");
        }
    }
    str = str.concat("\n");
};
console.log(str);

/*
    Time Complexity: O(n2)
    Space Complexity: O(n2)
*/

/*

    Output:-

    *
    * *       
    * * *     
    * * * *   
    * * * * *
*/



/*<<<<<<<<<<<<<<<<---------------------- Write in a better way ------------------------------------>>>>>>>>>>>>>>>>*/

let newStr = [];

for (let i = 0; i < 5; i++) {
    let line = "";
    for (let j = 0; j <= i; j++) {
        line += "* ";
    }
    newStr.push(line);
};
console.log(newStr); // [ '* ', '* * ', '* * * ', '* * * * ', '* * * * * ' ]
console.log(newStr.join("\n"));

/*

    Output:-

    *
    * *       
    * * *     
    * * * *   
    * * * * *
*/
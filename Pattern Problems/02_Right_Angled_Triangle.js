/*
    Output:-

            *
          * *
        * * *
      * * * *
    * * * * *
*/


let str = "";

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if (j < 5 - i - 1) {
            str = str.concat(" ");
        } else {
            str = str.concat("*");
        }
    }
    str = str.concat("\n");
};
console.log(str);

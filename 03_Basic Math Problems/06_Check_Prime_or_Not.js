/*
    Prime Number
    <---------->

    A number exactly 2 factors 1 & itself.

    n = 11, 13, 17,.....etc
*/

/*<-------------------------------------------- Brute Force Approach ------------------------------------------------>*/

const primeNumber = (n) => {
    let count = 0;

    for(let i = 1; i <= n; i++){
        if(n % i == 0){
            count++;
        }
    }
    if(count == 2) return "Prime Number";

    else return "Not Prime Number";
};
console.log(primeNumber(11)); // Output:- "Prime Number"
console.log(primeNumber(16)); // Output:- "Not Prime Number"

/*
    Time Complexity: O(n), where n is the input number.
    Space Complexity: O(1).
*/


/*<------------------------------------ Optimized Approach (Using Square Root) -------------------------------------->*/

const primeNumberOptimized = (n) => {
    if (n <= 1) return "Not Prime Number";
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return "Not Prime Number";
    }
    return "Prime Number";
};
console.log(primeNumberOptimized(11)); // Output: "Prime Number"
console.log(primeNumberOptimized(16)); // Output: "Not Prime Number"

/*
    Time Complexity: O(Square Root of n), where n is the input number.
    Space Complexity: O(1).
*/
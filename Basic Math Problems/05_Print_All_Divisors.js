/*
    Print All Divisors of a number
    <---------------------------->

    E.g - 36 --> 1, 2, 3, 4, 6, 9, 12, 18, 36
*/


/*<-------------------------------------------- Brute Force Approach ------------------------------------------------>*/

const printDivisors = (n) => {
    for(let i = 1; i < n; i++){
        if(n % i === 0){
            console.log(i);
        }
    }
    return n;
};
console.log(printDivisors(36));

/*
    Time Complexity: O(n), where n is the input number.
    Space Complexity: O(1).
*/



/*<------------------------------------ Optimized Approach (Using Square Root) -------------------------------------->*/

const printDivisorsOptimized = (n) => {
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            console.log(i); // Print the smaller divisor
            if (i !== n / i) {
                console.log(n / i); // Print the larger divisor
            }
        }
    }
};
console.log(printDivisorsOptimized(36));



/*
    Time Complexity: O(Square Root of n), where n is the input number.
    Space Complexity: O(1).
*/
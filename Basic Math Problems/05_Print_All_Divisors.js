/*
    Print All Divisors of a number
    <---------------------------->

    E.g - 36 --> 1, 2, 3, 4, 6, 9, 12, 18, 36
*/

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
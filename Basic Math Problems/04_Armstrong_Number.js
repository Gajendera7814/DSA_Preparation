/*
    Armstrong Number    Leetcode Problem
    <-------------->    <--------------->

    An Armstrong number is a number that is equal to the sum of its own digits raised to the power of the number of digits. 
    
    For example:

    153 = 1*1*1 + 5*5*5 + 3*3*3

    9474 = 9*9*9*9 + 4*4*4*4 + 7*7*7*7 + 4*4*4*4
*/

const armstrongNumber = (n) => {
    let dup = n, sum = 0, lastDigit;

    const numDigits = n.toString().length;

    while (n > 0) {
        lastDigit = Math.floor(n % 10);
        sum += Math.pow(lastDigit, numDigits);
        n = Math.floor(n / 10);
    }

    if (sum === dup) {
        console.log("Armstrong Number");
    } else {
        console.log("Not Armstrong Number");
    }
};
console.log(armstrongNumber(1634));

/*
    Time Complexity: O(log10(n))
    Space Complexity: O(log10(n))
*/
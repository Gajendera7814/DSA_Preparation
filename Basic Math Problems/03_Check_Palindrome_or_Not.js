/*
    Check if a number is Palindrome or Not
    <------------------------------------>

    Problem Statement: Given an integer N, return true if it is a palindrome else return false.

    A palindrome is a number that reads the same backward as forward.

    For example, 121, 1331, and 4554 are palindromes because they remain the same when their digits are reversed.
*/

const palindromeOrNot = (n) => {
    let reverseNum = 0;
    let dup = n;

    while(n > 0){
        let lastDigit = Math.floor(n % 10);
        reverseNum = reverseNum * 10 + lastDigit;
        n = Math.floor(n / 10);
    }

    if(reverseNum === dup) return true;
    
    else return false;
};
console.log(palindromeOrNot(234)); // Output: false
console.log(palindromeOrNot(121)); // Output: true

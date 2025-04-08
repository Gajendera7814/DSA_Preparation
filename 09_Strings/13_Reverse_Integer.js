/*
    Reverse Integer    Leetcode Problem
    <-------------->   <--------------->

    Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the 
    signed 32-bit integer range [-231, 231 - 1], then return 0.

    Example 1:

        Input: x = 123,  Output: 321

    Example 2:

        Input: x = -123,  Output: -321

    Example 3:

        Input: x = 120,  Output: 21
*/

/*<---------------------------------------------- Mathematical Reversal -------------------------------------------->*/

const reverse = (x) => {
    let result = 0;
    let num = Math.abs(x);

    while (num > 0) {
        let digit = num % 10;          // Get the last digit
        result = result * 10 + digit;  // Append digit to result
        num = Math.floor(num / 10);    // Remove the last digit
    }

    if (x < 0) {
        result = -result;
    }

    const MAX = Math.pow(2, 31) - 1;
    const MIN = -Math.pow(2, 31);

    if (result < MIN || result > MAX) {
        return 0;
    }

    return result;
};
console.log(reverse(123));     // Output: 321
console.log(reverse(-123));    // Output: -321
console.log(reverse(120));     // Output: 21
console.log(reverse(0));       // Output: 0
console.log(reverse(1534236469)); // Output: 0 (overflow)

/*


    Time Complexity: O(n)

        - The while loop runs once per digit in the number.
        - Each iteration:
        - %, *, +, Math.floor() — all are constant time.
        - For a 32-bit signed integer, the max number of digits is 10 ([-2^31, 2^31 - 1] range).

        So overall:

        - Best/Worst/Average Case: O(n) where n is the number of digits (at most 10 → so practically constant).
        - But theoretical time complexity is still O(n).


    Space Complexity: O(1)

        - No arrays or strings are created.
        - Uses a fixed number of variables: result, num, digit, etc.
        - Space doesn't grow with input size.
*/




/*<------------------------------------------------- Inbuild Methods ----------------------------------------------->*/

const Reverse = (x) => {
    const isNegative = x < 0;
    const reversedStr = Math.abs(x).toString().split('').reverse().join('');
    const reversed = parseInt(reversedStr, 10);

    const MAX = Math.pow(2, 31) - 1;
    const MIN = -Math.pow(2, 31);

    const result = isNegative ? -reversed : reversed;

    return (result < MIN || result > MAX) ? 0 : result;
};
console.log(Reverse(123));     // Output: 321
console.log(Reverse(-123));    // Output: -321
console.log(Reverse(120));     // Output: 21

/*
    Time Complexity: O(n)

        - Math.abs(x) → O(1)
        - .toString() → Converts number to string: O(n) where n is number of digits
        - .split('') → Creates array from string: O(n)
        - .reverse() → Reverses the array: O(n)
        - .join('') → Joins characters: O(n)
        - parseInt(...) → Parses the string back to a number: O(n)

        So total = O(n) + O(n) + O(n) + O(n) + O(n) = O(n)  

    Space Complexity: O(n)

        - Intermediate strings and arrays are created during:
        - .toString() → string of length n
        - .split('') → array of length n
        - .reverse() → new array of length n
        - .join('') → final string of length n
*/
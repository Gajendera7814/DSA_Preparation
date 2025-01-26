/*
    Decimal to binary number
    <----------------------->

    Given a decimal number as input, we need to write a program to convert the given decimal number into an equivalent binary number.

    Input: 7,  Output: 111

    Input: 10,  Output: 1010
*/

const decimalToBinary = (n) => {
    /* Base case: if n is 0, return 0 */
    if (n === 0) return 0;

    /* Recursive case: remainder + recursive call with integer division by 2 */
    return ((n % 2) + 10 * decimalToBinary(parseInt(n / 2)));
};
console.log(decimalToBinary(4));
console.log(decimalToBinary(10));

/*
    Time Complexity: O(logn), The function makes O(logn) recursive calls, with constant work done in each call.

    Space Complexity: O(logn), The space used is proportional to the recursion depth, which is O(logn).
*/


/*
    Recursion Diagram for decimalToBinary(5)
    <--------------------------------------->

    decimalToBinary(5)
    └── (5 % 2) + 10 * decimalToBinary(5 / 2) => 1 + 10 * decimalToBinary(2)
            └── (2 % 2) + 10 * decimalToBinary(2 / 2) => 0 + 10 * decimalToBinary(1)
                    └── (1 % 2) + 10 * decimalToBinary(1 / 2) => 1 + 10 * decimalToBinary(0)
                                └── Base case: decimalToBinary(0) returns 0
*/
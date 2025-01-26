/*
    Power Calculation
    <---------------->

    Input: a = 2, b = 3,    Output: 8

    Explanation: 2 ^ 3 = 2 * 2 * 2 = 8


    Input: a = 3, b = 3,    Output: 27

    Explanation: 3 ^ 3 = 3 * 3 * 3 = 27
*/


const power = (a, b) => {
    /* Base case: a ^ 0 = 1 */
    if (b === 0) return 1;

    /* Recursive case: a ^ b = a * a ^ (b - 1) */
    return a * power(a, b - 1);
};
console.log(power(2, 3));  /* Output: 8 */
console.log(power(3, 3));  /* Output: 27 */

/*
    Time Complexity: O(b), where b is the exponent. The function performs b recursive calls, each with constant work.
    Space Complexity: O(b), because the recursion stack will have b frames.
*/

/*
    Recursion Diagram
    <---------------->

    power(2, 3)
    └── 2 * power(2, 2)
            └── 2 * power(2, 1)
                └── 2 * power(2, 0)
                        └── 1  (Base case)
*/
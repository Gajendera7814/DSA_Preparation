/*
    Factorial of a Number
    <-------------------->

    Given the number n (n >=0), find its factorial. 
    
    Factorial of n is defined as 1 x 2 x … x n. For n = 0, factorial is 1. We are going to discuss iterative and 
    recursive programs in this post.

    Examples:

        Input: n = 5,   Output: 120
        Explanation: 5! = 5 * 4 * 3 * 2 * 1 = 120

        Input: n = 4,   Output: 24
        Explanation: 4! = 4 * 3 * 2 * 1 = 24

        Input: n = 0,   Output: 1

        Input: n = 1,   Output: 1
*/

const factorial = (n) => {
    /* Base case: factorial of 0 is 1 */
    if (n === 0) return 1;

    /* Recursive case */
    return n * factorial(n - 1);
};
console.log(factorial(5)); /* Output: 120 */


/*
    Time Complexity
    <-------------->

    The function makes a recursive call for every value of n until n = 0 (base case).

    - Each recursive call does a constant amount of work (multiplication and return).
    - The number of recursive calls is equal to n + 1 (from n to 0).
    
    Time Complexity: O(n), The function performs n recursive calls.


    Space Complexity
    <--------------->
    
    1. Call Stack
    Each recursive call adds a new frame to the call stack.

    - The maximum depth of recursion is n + 1 (from n to 0).
    - Each frame takes O(1) space.
    
    2. Auxiliary Space
    No additional data structures are used apart from the recursion.

    
    Space Complexity: O(n) Due to the call stack, O(n) space is used.
*/


/*
    Recursion Diagram
    <---------------->

    factorial(5)
    └── 5 * factorial(4)
            └── 4 * factorial(3)
                └── 3 * factorial(2)
                        └── 2 * factorial(1)
                                └── 1 * factorial(0)
                                        └── 1 (Base case)
*/

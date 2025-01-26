/*
    Sum of N Natural Numbers
    <----------------------->

    Sum of n Natural Numbers is simply an addition of 'n' numbers of terms that are organized in a series, with the 
    first term being 1, and n being the number of terms together with the nth term. The numbers that begin at 1 and 
    terminate at infinity are known as natural numbers. Sum of the first n natural numbers formula is given by [n (n + 1)]/2.


    Input: n = 4,  Output: 10
    Explanation: 4 = 4 + 3 + 2 + 1 = 10

    Input: n = 5,  Output: 15
    Explanation: 5 = 5 + 4 + 3 + 2 + 1 = 10
*/

const sumOfNaturalNumbers = (n) => {
    /* Base case: the sum of the first 0 numbers is 0 */
    if (n === 0) return 0;

    /* Recursive case */
    return n + sumOfNaturalNumbers(n - 1);
};
console.log(sumOfNaturalNumbers(5)); /* Output: 15 */


/*
    Time Complexity
    <-------------->

    The function makes a recursive call for every value of n until n = 0 (base case).

    1. Number of Calls: The recursion depth is n, as we decrement n by 1 in each call until n = 0.

    2. Work Per Call: Each call performs a constant amount of work O(1) for addition and the recursive function call.

    Total Time Complexity: O(n), This is because the function is called n times, and each call takes constant time.



    Space Complexity
    <-------------->
    
    Call Stack: Each recursive call adds a frame to the call stack. The maximum depth of recursion is n + 1 (from n to 0).

    Auxiliary Space: The function doesn’t use any additional memory apart from the recursion.

    Total Space Complexity: O(n), This is due to the call stack space used by the recursive function calls.


    Summary :-
    
    Time Complexity: O(n), The function is called n times.
    Space Complexity: O(n) The recursion uses O(n) stack frames.
*/


/*
    Recursion Diagram
    <---------------->

    sumOfNaturalNumbers(5)
    └── 5 + sumOfNaturalNumbers(4)
            └── 4 + sumOfNaturalNumbers(3)
                └── 3 + sumOfNaturalNumbers(2)
                        └── 2 + sumOfNaturalNumbers(1)
                                └── 1 + sumOfNaturalNumbers(0)
                                        └── 0 (Base case)
*/
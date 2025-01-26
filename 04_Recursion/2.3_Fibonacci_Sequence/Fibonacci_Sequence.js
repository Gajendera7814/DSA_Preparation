/*
    Fibonacci Sequence
    <----------------->

    The Fibonacci sequence is the integer sequence where the first two terms are 0 and 1. After that, the next 
    term is defined as the sum of the previous two terms.

    Input : 5,  Output : 5
    Explanation: 5 = 0, 1, 1, 2, 3, 5, 8....

    Input : 8,  Output : 34
*/

const fibonacci = (n) => {
    /* Base case: Fibonacci(0) = 0 */
    if (n === 0) return 0;

    /* Base case: Fibonacci(1) = 1 */
    if (n === 1) return 1;

    /* Recursive case */
    return fibonacci(n - 1) + fibonacci(n - 2);
};
console.log(fibonacci(5)); /* Output: 5 */


/*
    Recursion Diagram for fibonacci(5)
    <-------------------------------->

    fibonacci(5)
    └── fibonacci(4) + fibonacci(3)
        ├── fibonacci(3) + fibonacci(2)
        │     ├── fibonacci(2) + fibonacci(1)
        │     │     ├── fibonacci(1)  → 1
        │     │     └── fibonacci(0)  → 0
        │     └── fibonacci(1)  → 1
        └── fibonacci(2) + fibonacci(1)
                ├── fibonacci(1)  → 1
                └── fibonacci(0)  → 0
*/

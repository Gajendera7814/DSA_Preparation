/*
    Stock Span - Problem Statement

    Given a list of prices of a stock for N days. The task is to find the stack span for each day.

    Stock span can be defined as the number of consecutive days before the current day where the price of the 
    stack was equal to or less than the current price.


    Days --> 1   2   3   4   5   6   7
    Input: [100, 80, 60, 70, 60, 75, 85];  Output: [1, 1, 1, 2, 1, 4, 6]


    100: On day 1, there are no consecutive elements that are smaller than or equal before it.  --> [100] --> 1
    80: On day 2, there are no consecutive elements that are smaller than or equal before it. --> [80] --> 1
    60: On day 3, there are no consecutive elements that are smaller than or equal before it. --> [60] --> 1
    70: On day 4, there are one consecutive elements that are smaller than or equal before it. --> [60, 70] --> 2
    60: On day 5, there are no consecutive elements that are smaller than or equal before it. --> [60] --> 1
    75: On day 6, there are three consecutive elements that are smaller than or equal before it. --> [75, 60, 70, 60] --> 4
    85: On day 7, there are five consecutive elements that are smaller than or equal before it. --> [85, 75, 60, 70, 60, 80] --> 6

*/


/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

/*
    Algorithm Explanation - The Stock Span Problem determines how many consecutive days (including the current day) 
    the stock price has been less than or equal to the current day's price.

    1. Initialize an array span of size n to store results.

    2. The first day's span is always 1 since there are no previous prices.

    3. Iterate through each day's price (i loop):
        - Set span[i] = 1 initially.
        - Compare the price at i with previous prices (j loop):
            - If the previous price is less than or equal to the current price, increase the span.
            - Stop when a larger price is found.

    4. Return the span array.


    Prices = [100, 80, 60, 70, 60, 75, 85]

    | Day (i) | price[i] |   Checking Previous (j)  |  Span Count (span[i]) |   Final Span  |
    |---------|----------|--------------------------|-----------------------|---------------|
    |    0    |  100     |  -                       |   1                   |       1       |
    |    1    |  80      |  100                     |   1                   |       1       |
    |    2    |  60      |  80, 100                 |   1                   |       1       |
    |    3    |  70      |  60                      |   1 + 1 = 2           |       2       |
    |    4    |  60      |  70, 60, 80, 100         |   1                   |       1       |
    |    5    |  75      |  60, 70, 60              |   1 + 1 + 1 = 4       |       4       |
    |    6    |  85      |  75, 60, 70, 60, 80, 100 |   1 + 4 + 1 = 6       |       6       |

    Final Output : [1, 1, 1, 2, 1, 4, 6]
*/

const stockSpanProblem = (prices) => {
    let n = prices.length;
    let span = new Array(n); /* Array to store stock span values */

    span[0] = 1; /* First day always has a span of 1 */

    for (let i = 1; i < n; i++) {
        span[i] = 1; /* Initialize span for the current day */

        /* Check previous prices to determine the span */
        for (let j = i - 1; j >= 0 && prices[i] >= prices[j]; j--) {
            span[i]++;
        }
    }
    return span;
};

console.log(stockSpanProblem([100, 80, 60, 70, 60, 75, 85])); // Output: [1, 1, 1, 2, 1, 4, 6]

/*
    Time Complexity -

        - The outer loop runs O(n).
        - The inner loop (j loop) runs O(n) in the worst case.
        - Worst-case complexity: O(n²) (when all prices increase).

    Space Complexity -

        - The span array stores n elements → O(n).
        - No extra data structures are used apart from loop variables.
        - Total space complexity: O(n).
*/



/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    Consecutive smaller or equal to before it == Nearest Greater to left

    Days --> 1   2   3   4   5   6   7
    Input: [100, 80, 60, 70, 60, 75, 85];  Output: [1, 1, 1, 2, 1, 4, 6]

    Nearest Greater to Left Approach Follow -

        i -  0    1   2   3   4   5   6   --->> i   
            [100, 80, 60, 70, 60, 75, 85]

    NGTL --> -1   100  80  80  70  80  100

    Index -> -1,   0,   1,  1,  3,  1,  0   --->> Index


    Output : - i - Index = [(0 - (-1)), (1 - 0), (2 - 1), (3 - 1), (4 - 3), (5 - 1), (6 - 0)] = [1, 1, 1, 2, 1, 4, 6]


    - i - index = ans

    - NearestGreaterToLeft Index - i = ans


    - Stack store NearestGreaterToLeft element and index as well as.

    - Push inside stack([arr[i], i])
*/

/*
    How the Algorithm Works -

    1. Initialize a stack to store elements along with their indices.

    2. Iterate through each element (i loop):
        - If the stack is empty, push -1 into the result.
        - If the top of the stack is greater than the current element, store the index of the top element.
        - Otherwise, pop elements from the stack until we find a greater element.
        - If no greater element is found after popping, push -1.
        - Push the current element and its index onto the stack.

    3. Modify the result array by computing the distance from the current index i to the stored index.

    4. Return the result array.


    Input - [100, 80, 60, 70, 60, 75, 85]

    |  i | arr[i] |           Stack Before            |             Action Taken            | Stack After | Result Before Adjustment | Final Result (i - result[i]) |
    |----|--------|-----------------------------------|-------------------------------------|------------|------------------|------------------|
    | 0  |  100   | []                                | Stack empty → -1                    | [(100, 0)] | [-1] | 0 - (-1) = 1 |
    | 1  |  80    | [(100,0)]                         | 100 > 80 → Store 0                  | [(100,0), (80,1)] | [ -1, 0 ] | 1 - 0 = 1 |
    | 2  |  60    | [(100,0), (80,1)]                 | 80 > 60 → Store 1                   | [(100,0), (80,1), (60,2)] | [ -1, 0, 1 ] | 2 - 1 = 1 |
    | 3  |  70    | [(100,0), (80,1), (60,2)]         | Pop 60 → 80 > 70 → Store 1          | [(100,0), (80,1), (70,3)] | [ -1, 0, 1, 2 ] | 3 - 2 = 1 |
    | 4  |  60    | [(100,0), (80,1), (70,3)]         | 70 > 60 → Store 3                   | [(100,0), (80,1), (70,3), (60,4)] | [ -1, 0, 1, 2, 3 ] | 4 - 3 = 1 |
    | 5  |  75    | [(100,0), (80,1), (70,3), (60,4)] | Pop 60, Pop 70 → 80 > 75 → Store 1  | [(100,0), (80,1), (75,5)]         | [ -1, 0, 1, 2, 3, 1 ] | 5 - 1 = 4 |
    | 6  |  85    | [(100,0), (80,1), (75,5)]         | Pop 75 → 80 > 85 (no pop) → Store 1 | [(100,0), (85,6)] | [ -1, 0, 1, 2, 3, 1, 1 ] | 6 - 1 = 5 |

    Final Output - [1, 1, 1, 1, 1, 4, 5]
*/

const nextGreaterToLeft = (arr) => {
    let stack = []; /* Stack to store elements and their indices */
    let result = []; /* Stores indices of next greater elements to the left */
    
    /* Helper function to get the top element of the stack */
    const top = (stack) => {
        return stack[stack.length - 1];
    }

    /* Iterate through the array from left to right */
    for (let i = 0; i < arr.length; i++) {
        /* If stack is empty, there is no greater element to the left */
        if (stack.length === 0) {
            result.push(-1);
        }

        /* If top of stack is greater than current element, store its index */
        else if (top(stack)[0] > arr[i]) {
            result.push(top(stack)[1]);
        }

        /* If top of stack is smaller, remove elements until we find a greater one */
        else {
            while (stack.length > 0 && top(stack)[0] <= arr[i]) {
                stack.pop();
            }

            /* If stack is empty, no greater element found */
            if (stack.length === 0) {
                result.push(-1);
            } else {
                result.push(top(stack)[1]);
            }
        }

        /* Push the current element and its index onto the stack */
        stack.push([arr[i], i]);
    }

    /* Convert stored indices into distances */
    for (let i = 0; i < result.length; i++) {
        result[i] = i - result[i];
    }

    return result;
};
console.log(nextGreaterToLeft([100, 80, 60, 70, 60, 75, 85])); // Output: [1, 1, 1, 1, 1, 4, 5]


/*
    Time Complexity -

        - The outer loop runs O(n).
        - The inner while loop only pops elements from the stack once for each element.
        - Each element is pushed and popped at most once, making the overall complexity O(n).

    Space Complexity -

        - The result array stores n elements → O(n).
        - The stack can store at most n elements → O(n).
        - Total space complexity: O(n).
*/





/*<------------------------------------------------- Another Approach ---------------------------------------------->*/

/*
    Step-by-Step Working -
    
    1. Initialize Data Structures

        - An empty stack stack = [] to store indices of prices.
        - An array spans[] to store results, initialized with 1 (since every stock is at least greater than itself).

    2. Iterate Through the Prices

        - For each stock price prices[i] at index i:
            - Remove smaller prices: If the price at the top of the stack is less than or equal to the current price, pop it (because it will never be used again).
            - Compute the span:
            - If the stack is empty (meaning all previous elements were smaller), span = i + 1 (i.e., the price is the highest seen so far).
            - Otherwise, span = i - stack[top] (the difference between current index and last greater price).
            - Push the current index onto the stack.

    3. Return the spans array.


    Input: [100, 80, 60, 70, 60, 75, 85]

    | Index (i) | Price (prices[i]) | Stack Before | Popped Elements |  Stack After | Span Computation | Span (spans[i]) |
    |-----------|-------------------|--------------|-----------------|--------------|------------------|-----------------|
    | 0         |  100              | []           |  None           | [0]          |    i + 1 = 1     | 1               |
    | 1         |  80               | [0]          |  None           | [0, 1]       |    i - 0 = 1     | 1               |
    | 2         |  60               | [0, 1]       |  None           | [0, 1, 2]    |    i - 1 = 1     | 1               |
    | 3         |  70               | [0, 1, 2]    |  [2]            | [0, 1, 3]    |    i - 1 = 2     | 2               |
    | 4         |  60               | [0, 1, 3]    |  None           | [0, 1, 3, 4] |    i - 3 = 1     | 1               |
    | 5         |  75               | [0, 1, 3, 4] |  [4, 3]         | [0, 1, 5]    |    i - 1 = 4     | 4               |
    | 6         |  85               | [0, 1, 5]    |  [5, 1]         | [0, 6]       |    i - 0 = 6     | 6               |

    Final Output :- [1, 1, 1, 2, 1, 4, 6]
*/

const stockSpanProblems = (prices) => {
    const n = prices.length;
    const stack = [];
    
    const spans = Array(n).fill(1);
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && prices[stack[stack.length - 1]] <= prices[i]) {
            stack.pop();
        }
        spans[i] = (stack.length === 0) ? (i + 1) : (i - stack[stack.length - 1]);
        stack.push(i);
    }
    return spans;
};
console.log(stockSpanProblems([100, 80, 60, 70, 60, 75, 85])); /* Output: [1, 1, 1, 2, 1, 4, 6] */

/*
    Time Complexity - O(n)
    Space Complexity: O(n)
*/
/*
    Nearest Smaller to Right
    <----------------------->

    Input : [4, 5, 2, 10, 8], Output: [ 2, 2, -1, 8, -1 ], No need of do reverse

    4  -->  2
    5  -->  2
    2  --> -1
    10 -->  8
    8  --> -1

*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

/*
    Approach :-

    1. Initialize an empty array result to store the answers.
    2. Iterate through each element in the array (i loop):
        - Set nextSmaller = -1 (default value).
        - Iterate over the remaining elements to the right (j loop).
        - If a smaller element is found, update nextSmaller and break the loop.
    3. Push the found value into result.
    4. Return the result array.


    Input:- [4, 5, 2, 10, 8]

    |  i | arr[i] | Checking Elements (arr[j] for j > i) |    First Smaller Found     |       result      |
    |----|--------|--------------------------------------|----------------------------|-------------------|
    | 0  |    4   |         [5, 2, 10, 8]                |   2 (found at j = 2)       | [2]               |
    | 1  |    5   |         [2, 10, 8]                   |   2 (found at j = 2)       | [2, 2]            |
    | 2  |    2   |         [10, 8]                      |  -1 (no smaller element)   | [2, 2, -1]        |
    | 3  |   10   |         [8]                          |   8 (found at j = 4)       | [2, 2, -1, 8]     |
    | 4  |    8   |         []                           |  -1 (no elements to check) | [2, 2, -1, 8, -1] |

    Final Output: [2, 2, -1, 8, -1]
*/


const nextSmallertoRight = (arr) => {
    let result = []; /* Stores the next smaller elements */
    
    for (let i = 0; i < arr.length; i++) {
        let nextSmaller = -1; /* Default value if no smaller element exists */

        /* Check elements to the right of arr[i] */
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) { /* Found the next smaller element */
                nextSmaller = arr[j];
                break; /* Stop searching once we find a smaller element */
            }
        }
        result.push(nextSmaller);
    }
    return result;
};

console.log(nextSmallertoRight([4, 5, 2, 10, 8])); // Output: [2, 2, -1, 8, -1]


/*
    Time Complexity -

        - Outer loop (i loop) runs O(n).
        - Inner loop (j loop) runs O(n - i) in the worst case.
        - In total, O(n²) worst case.

    Space Complexity -

        - The result array stores n elements → O(n).
        - No extra data structures (apart from loop variables).
        - Total space complexity: O(n).
*/



/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    Conditions -

    1. stack empty --> -1
    2. stack.top() < arr[i] --> push in result variable
    3. stack.top() >= arr[i] --> 1. stack empty 2. stack.top() >= arr[i] do pop() 

    Note - for loop depends on stack direction.
*/

/*
    Approach -

    1. Initialize an empty array result to store the answers.

    2. Use a stack to efficiently track elements while iterating from right to left.

    3. Iterate through the array in reverse (i loop):
        - If the stack is empty, push -1 to result (no smaller element).
        - If the top of the stack is smaller than the current element, push it to result.
        - Otherwise, pop elements from the stack until we find a smaller one.
        - If no smaller element is found after popping, push -1.

    4. Push the current element to the stack (to be used for the next iteration).

    5. Reverse the result array before returning (because we iterated from right to left).


    Input: [4, 5, 2, 10, 8]

    |  i | arr[i] | Stack Before |          Action          |  Stack After  | result (before reversing) |
    |----|--------|--------------|--------------------------|---------------|---------------------------|
    | 4  |  8     |     []       | Stack empty -→ Push -1   |   [8]         |   [-1]                    |
    | 3  | 10     |     [8]      | 8 < 10 -→ Push 8         |   [8, 10]     |   [-1, 8]                 |
    | 2  |  2     |     [8, 10]  | Pop 10, Pop 8 -→ -1      |   [2]         |   [-1, 8, -1]             |
    | 1  |  5     |     [2]      | 2 < 5 -→ Push 2          |   [2, 5]      |   [-1, 8, -1, 2]          |
    | 0  |  4     |     [2, 5]   | Pop 5, 2 < 4 -→ Push 2   |   [2, 4]      |   [-1, 8, -1, 2, 2]       |

    After reversing: [2, 2, -1, 8, -1]
*/


const nextSmallerToRight = (arr) => {
    let result = [];  /* Stores the next smaller elements */
    let stack = [];   /* Stack to keep track of elements */
    
    /* Helper function to get the top of the stack */
    const top = (stack) => {
        return stack[stack.length - 1];
    }
    
    /* Traverse the array from right to left */
    for (let i = arr.length - 1; i >= 0; i--) {
        /* If stack is empty, there is no smaller element to the right */
        if (stack.length === 0) {
            result.push(-1);
        }

        /* If top of stack is smaller than current element, it's the answer */
        else if (top(stack) < arr[i]) {
            result.push(top(stack));
        }

        /* If top of stack is greater than or equal to current element */
        else {
            /* Remove elements from stack until we find a smaller one */
            while (stack.length > 0 && top(stack) >= arr[i]) {
                stack.pop();
            }

            /* If stack is empty, no smaller element found */
            if (stack.length === 0) {
                result.push(-1);
            } else {
                result.push(top(stack));
            }
        }

        /* Push the current element to stack for future comparisons */
        stack.push(arr[i]);
    }

    /* Reverse the result since we processed elements from right to left */
    return result.reverse();
};
console.log(nextSmallerToRight([4, 5, 2, 10, 8])); // Output: [2, 2, -1, 8, -1]


/*
    Time Complexity -

        - The outer loop runs O(n).
        - Each element is pushed and popped once from the stack, making stack operations O(1) per element.
        - The total complexity is O(n).

    Space Complexity -

        - The result array stores n elements → O(n).
        - The stack can store at most n elements → O(n).
        - Total space complexity: O(n).
*/
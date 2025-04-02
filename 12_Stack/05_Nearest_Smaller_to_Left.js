/*
    Nearest Smaller to left     Nearest Smaller element
    <--------------------->     <---------------------->

    Input : [4, 5, 2, 10, 8], Output: [ -1, 4, -1, 2, 2 ] No need of do reverse


    The Next Smaller Element for an element x is the first smaller element on the left side of x in the array. 
    Elements for which no smaller element exist, consider the next smaller element as -1. 

    Example - 1

        Input: [4, 5, 2, 10, 8],  Output: [ -1, 4, -1, 2, 2 ]

        4 -–>  -1
        5 -–>   4
        2 -–>  -1
        10 -–>   2
        8 -->   2


    Example - 2

        Input: [13, 7, 6 , 12], Output: [-1, -1, -1, 6]

        13 -–>  -1
        7  -–>  -1
        6  -–>  -1
        12 -–>   6
        
*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

/*

    Approach :-

    1. Initialize an empty array result to store answers.

    2. Iterate through each element in the array:
        - For each element arr[i], look at all elements before it arr[j] where j < i.
        - Find the first smaller element arr[j] < arr[i].
        - If found, store that element; otherwise, store -1.

    3. Return the result array.


    Input: [4, 5, 2, 10, 8]

    |   i  | arr[i] | Check Elements (arr[j] for j < i) | First Smaller to Left |       result          |
    |------|--------|-----------------------------------|-----------------------|-----------------------|
    |   0  |    4   |               None                |            -1         |   [-1]                |
    |   1  |    5   |               4                   |             4         |   [-1, 4]             |
    |   2  |    2   |               5, 4                |            -1         |   [-1, 4, -1]         |
    |   3  |    10  |               2, 5, 4             |             2         |   [-1, 4, -1, 2]      |
    |   4  |    8   |               10, 2, 5, 4         |             2         |   [-1, 4, -1, 2, 2]   |

    Final Output: [-1, 4, -1, 2, 2]
*/

const nextSmallertoLeft = (arr) => {
    let result = [];
    
    for(let i = 0; i < arr.length; i++){
        let nextSmaller = -1;
        for(let j = i - 1; j >= 0; j--){
            if(arr[j] < arr[i]){
                nextSmaller = arr[j];
                break;
            }
        }
        result.push(nextSmaller);
    }
    return result;
};
console.log(nextSmallertoLeft([4, 5, 2, 10, 8]));


/*
    Time Complexity - O(n²)
    Space complexity - O(n)
*/




/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    Conditions -

    1. stack empty --> -1
    2. stack.top() < arr[i] --> push in result variable
    3. stack.top() >= arr[i] --> 1. stack empty 2. stack.top() >= arr[i] do pop() 

    Note -- for loop depends on stack direction.
*/

/*
    1. Initialize an empty array result to store answers.
    2. Use a stack to store elements while iterating.
    3. Iterate through the array:
        - If the stack is empty, push -1 to result (no smaller element).
        - If the top of the stack is smaller than the current element, push it to result.
        - Otherwise, pop elements from the stack until we find a smaller one.
        - If no smaller element is found after popping, push -1.
    4. Push the current element to the stack (to be used for the next iteration).
    5. Return result array.


    Input: [4, 5, 2, 10, 8]:

    |  i | arr[i] | Stack Before |          Action          | Stack After |         result          |
    |----|--------|--------------|--------------------------|-------------|-------------------------|
    | 0  |   4    |     []       | Stack empty → Push -1    |   [4]       |     [-1]                |
    | 1  |   5    |     [4]      | 4 < 5 → Push 4           |   [4, 5]    |     [-1, 4]             |
    | 2  |   2    |     [4, 5]   | Pop 5, Pop 4 → -1        |   [2]       |     [-1, 4, -1]         |
    | 3  |  10    |     [2]      | 2 < 10 → Push 2          |   [2, 10]   |     [-1, 4, -1, 2]      |
    | 4  |   8    |     2, 10]   | Pop 10, 2 < 8 → Push 2   |   [2, 8]    |     [-1, 4, -1, 2, 2]   |

    Final Output: [-1, 4, -1, 2, 2]
*/

const nextSmallerToLeft = (arr) => {
    let result = [];  /* Stores the nearest smaller elements */
    let stack = [];   /* Stack to keep track of elements */
    
    /* Helper function to get the top of the stack */
    const top = (stack) => {
        return stack[stack.length - 1];
    }
    
    for (let i = 0; i < arr.length; i++) {
        /* If stack is empty, there is no smaller element to the left */
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
    return result;
};
console.log(nextSmallerToLeft([13, 7, 6 , 12])); // Output: [ -1, -1, -1, 6 ]
console.log(nextSmallerToLeft([4, 5, 2, 10, 8])); // Output: [-1, 4, -1, 2, 2]


/*
    Time Complexity

    - The outer loop runs O(n).
    - Each element is pushed and popped once from the stack, making stack operations O(1) per element.
    - The total complexity is O(n).

    Space Complexity

    - Stack stores elements → O(n)
    - Result array stores n elements → O(n)
    - Overall Space Complexity: O(n)
*/

/*
    Nearest Greater to Right      Next Largest element
    <----------------------->    <-------------------->

    The Next greater Element for an element x is the first greater element on the right side of x in the array. 
    Elements for which no greater element exist, consider the next greater element as -1. 

    Example - 1

        Input: [4, 5, 2, 25],  Output: [5, 25, 25, -1]

            4 -–>  5
            5 -–>  25
            2 -–>  25
            25  -–>  -1
        
        Explanation: except 25 every element has an element greater than them present on the right side

    Example - 2

        Input: [13, 7, 6 , 12], Output: [-1, 12, 12, -1]

            13 -–>  -1
            7  -–>  12
            6  -–>  12
            12 -–>  -1
        
        Explanation: 13 and 12 don’t have any element greater than them present on the right side
*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

/*
    How do we identify where we use stack - If j depends on i, then a stack can be a suitable choice.
*/

/*
    Input: [4, 5, 2, 10, 8]

        |  i (Current Element) |  j (Checking Right Elements) |  arr[j] > arr[i]? | nextGreater (Updated Value) |   Final Result Array  |
        |----------------------|------------------------------|-------------------|-----------------------------|-----------------------|
        |   4 (i = 0)          |    5 (j = 1)                 | ✅ Yes            |     5                       |   [5]                 |
        |   5 (i = 1)          |    2 (j = 2)                 | ❌ No             |     -1                      |   [5]                 |
        |                      |    10 (j = 3)                | ✅ Yes            |     10                      |   [5, 10]             |
        |   2 (i = 2)          |    10 (j = 3)                | ✅ Yes            |     10                      |   [5, 10, 10]         |
        |   10 (i = 3)         |    8 (j = 4)                 | ❌ No             |     -1                      |   [5, 10, 10, -1]     |
        |   8 (i = 4)          |    (No elements right)       | -                  |    -1                       |  [5, 10, 10, -1, -1]  |

    Final Output: [5, 10, 10, -1, -1]
*/

const nearestGreaterToRights = (arr) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let nextGreater = -1; 
        for (let j = i + 1; j < arr.length; j++) { // Since j depends on i, we can use a stack.
            if (arr[j] > arr[i]) {
                nextGreater = arr[j];
                break;
            }
        }
        result.push(nextGreater);
    }
    return result;
}
console.log(nearestGreaterToRights([4, 5, 2, 10, 8])); // Output: [5, 10, 10, -1, -1]

/*
    Time Complexity - O(n²) (Nested loop → each element is compared with the remaining elements)
    Space Complexity - O(n) (Result array storing the nearest greater elements)
*/




/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    Conditions -

    1. stack empty ---> -1
    2. stack.top > arr[i] ---> push in result variable
    3. stack.top <= arr[i] ---> stack.pop() -->  1. stack empty,   2. stack.pop > arr[i]

    Note --> for loop depends on stack direction.
*/

/*
    How the Algorithm Works -

    The Nearest Greater to Right (NGR) problem finds the nearest greater element to the right for each element in 
    an array using a monotonic decreasing stack.

        Key Idea -

        1. Iterate from right to left (so we process elements in the correct order).
        2. Use a stack to keep track of greater elements.
        3. For each element:
            - If the stack is empty: No greater element exists → Push -1 to result.
            - If stack’s top is greater than current element: The top is the answer → Push to result.
            - If stack’s top is smaller: Pop smaller elements from the stack until we find a greater one.
            - Push the current element to the stack as a potential NGR for future elements.
        4. Reverse the result at the end since we processed elements from right to left.


    Input: [4, 5, 2, 10, 8]

        | Step | i (Element) | Stack Before |                   Action                      |  Stack After  |  result (Before Reverse)  |
        |------|-------------|--------------|-----------------------------------------------|---------------|---------------------------|
        | 1    |    8        |   []         | Stack empty, push -1                          | [8]           | [-1]                      |
        | 2    |    10       |   [8]        | Pop 8 (<= 10), Stack empty -→ -1              | [10]          | [-1, -1]                  |
        | 3    |    2        |   [10]       | Top (10) is greater -→ Push 10                | [10, 2]       | [-1, -1, 10]              |
        | 4    |    5        |   [10, 2]    | Pop 2 (<= 5), Top (10) is greater -→ Push 10  | [10, 5]       | [-1, -1, 10, 10]          |
        | 5    |    4        |   [10, 5]    | Top (5) is greater- → Push 5                  | [10, 5, 4]    | [-1, -1, 10, 10, 5]       |


    Final Step: Reverse the result -→ [5, 10, 10, -1, -1]
*/

const nearestGreaterToRight = (arr) => {
    let stack = [];
    let result = [];

    /* Helper function to get the top element of the stack */
    const top = (stack) => {
        return stack[stack.length - 1];
    };

    /* Traverse the array from right to left */
    for (let i = arr.length - 1; i >= 0; i--) {
        /* If the stack is empty, no greater element exists to the right */
        if (stack.length === 0) {
            result.push(-1);
        }

        /* If the top of the stack is greater than the current element */
        else if (stack.length > 0 && top(stack) > arr[i]) {
            result.push(top(stack));
        }

        /* If the top of the stack is less than or equal to the current element */
        else if (stack.length > 0 && top(stack) <= arr[i]) {
            /* Pop elements from the stack until we find a greater element */
            while (stack.length > 0 && top(stack) <= arr[i]) {
                stack.pop();
            }

            /* If the stack is empty after popping, no greater element exists */
            if (stack.length === 0) {
                result.push(-1);
            } else {
                /* If a greater element is found, push it to the result */
                result.push(top(stack));
            }
        }

        /* Push the current element to the stack as it might be the next greater for future elements */
        stack.push(arr[i]);
    };

    /* Reverse the result array to match the original left-to-right order */
    return result.reverse();
}
console.log(nearestGreaterToRight([4, 5, 2, 10, 8]));  // Output: [5, 10, 10, -1, -1]


/*
    Time Complexity: O(n) (Each element is pushed/popped from the stack at most once)
    Space Complexity: O(n) (For the stack and result array)
*/


/* 
    Dry Run -→ 

    Input: arr = [1, 3, 2, 4],  stack = [],  result = []

    Iteration 1 - (i = 3, arr[i] = 4)

        The loop starts with i = 3 and arr[i] = 4.

        Condition: if(stack.length === 0) is true because the stack is empty.

        Action: Push -1 to result.

        Action: Push 4 to stack.

        stack = [4],  result = [-1]


    Iteration 2 - (i = 2, arr[i] = 2)

        Next, i = 2 and arr[i] = 2.

        Condition: if(stack.length === 0) is false because the stack contains [4].

        Condition: else if(stack.length > 0 && top(stack) > arr[i]) is true because top(stack) = 4 > 2.

        Action: Push 4 to result.

        Action: Push 2 to stack.

        stack = [4, 2],  result = [-1, 4]


    Iteration 3 - (i = 1, arr[i] = 3)

        Next, i = 1 and arr[i] = 3.

        Condition: if(stack.length === 0) is false because the stack contains [4, 2].

        Condition: else if(stack.length > 0 && top(stack) > arr[i]) is false because top(stack) = 2 < 3.

        Condition: else if(stack.length > 0 && top(stack) <= arr[i]) is true because top(stack) = 2 <= 3.

        Action: Enter the while loop:

            First iteration:- top(stack) = 2, which is less than 3, so stack.pop() removes 2.
                Now stack = [4].

            Second iteration: Exit the while loop because top(stack) = 4 > 3.

            Condition: if(stack.length === 0) is false because the stack contains [4].

            Action: Push 4 to result.
            Action: Push 3 to stack.

            stack = [4, 3],  result = [-1, 4, 4]

    Iteration 4 - (i = 0, arr[i] = 1)

        Finally, i = 0 and arr[i] = 1.

        Condition: if(stack.length === 0) is false because the stack contains [4, 3].

        Condition: else if(stack.length > 0 && top(stack) > arr[i]) is true because top(stack) = 3 > 1.

        Action: Push 3 to result.

        Action: Push 1 to stack.

        stack = [4, 3, 1],  result = [-1, 4, 4, 3]

    Final Step - Action: Reverse the result array to get [3, 4, 4, -1].
*/
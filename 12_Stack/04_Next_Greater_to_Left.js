/*
    Next Greater to Left
    <------------------->

    The Next greater Element for an element x is the first greater element on the left side of x in the array. 
    Elements for which no greater element exist, consider the next greater element as -1. 

    Example -

        Input: [1, 3, 2, 4],  Output: [-1, -1, 3, -1]

            1 -–>  -1
            3 -–>  -1
            2 -–>   3
            4 -–>  -1
    

    Conditions -

        1. stack empty --->> -1
        2. stack.top > arr[i] --->> push in result variable
        3. stack.top <= arr[i] --->> stack.pop() --> 1. stack empty, 2. stack.pop > arr[i]
*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

/*

    Approach :-  

    - Traverse the array from left to right.
    - For each element at index i, check all elements before it (j = i - 1 to 0).
    - If a greater element is found, store it and break the loop.
    - If no greater element exists, store -1.

    Input: [1, 3, 2, 4]

    |   Index (i)  |  Element (arr[i]) |            Compare with (j -→ i-1 to 0)             | Next Greater to Left |    Result Array   |
    |--------------|-------------------|-----------------------------------------------------|----------------------|-------------------|
    | 0            | 1                 | No elements to the left                             | -1                   | [-1]              |
    | 1            | 3                 | 1 (Not greater)                                     | -1                   | [-1, -1]          |
    | 2            | 2                 | 3 (Greater)                                         | 3                    | [-1, -1, 3]       |
    | 3            | 4                 | 2 (Not greater) → 3 (Not greater) → 1 (Not greater) | -1                   | [-1, -1, 3, -1]   |

    Final Output: [-1, -1, 3, -1]

*/

const nextGreatertoLeft = (arr) =>{
    let result = [];

    for(let i = 0; i < arr.length; i++){
        let nextGreater = -1;
        for(let j = i - 1; j >= 0; j--){
            if(arr[j] > arr[i]){
                nextGreater = arr[j];
                break;
            }
        }
        result.push(nextGreater);
    }
    return result;
};
console.log(nextGreatertoLeft([1, 3, 2, 4]));

/*
    Time Complexity : O(n2)
    Space Complexity : O(n)

*/



/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    Input Array: [1, 3, 2, 4]

    |  Index | Element (arr[i]) | Stack Before | Stack After  |  Next Greater to Left (Result)   |
    |--------|------------------|--------------|--------------|----------------------------------|
    | 0      |  1               | []           | [1]          |     -1                           |
    | 1      |  3               | [1]          | [3]          |     -1                           |
    | 2      |  2               | [3]          | [3, 2]       |     3                            |
    | 3      |  4               | [3, 2]       | [4]          |     -1                           |

    Final Output: [-1, -1, 3, -1]
*/

const nextGreaterToLeft = (arr) => { 
    let stack = [];
    let result = []; /* Result array to store the next greater element to the left */
    
    /* Helper function to get the top element of the stack */
    const top = (stack) => {  
        return stack[stack.length - 1]; /* Returns the last element of the stack */
    };
    
    for (let i = 0; i < arr.length; i++) {
        /* If stack is empty, no greater element to the left */
        if(stack.length === 0){  
            result.push(-1);
        }

        /* If stack top is greater than current element */
        else if (stack.length > 0 && top(stack) > arr[i]) {
            result.push(top(stack));
        }

        /* If stack top is less than or equal to current element */
        else if (stack.length > 0 && top(stack) <= arr[i]) {
            /* Pop elements from the stack until a greater element is found */
            while(stack.length > 0 && top(stack) <= arr[i]){
                stack.pop();
            }

            if(stack.length === 0){
                result.push(-1);
            } else {
                result.push(top(stack));
            }
        }
        stack.push(arr[i]);
    }
    return result; 
};

console.log(nextGreaterToLeft([1, 3, 2, 4])); // Output: [-1, -1, 3, -1]

/*
    Time Complexity: O(n)
    Space Complexity: O(n)
*/




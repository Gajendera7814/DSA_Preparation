/*
    Right Rotate an array by K’th places (<------- clock-wise start from end index)   Leetcode Problem (Rotate Array)
    <----------------------------------------------------------------------------->   <----------------------------->

    Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

    Example 1:

        Input: nums = [1, 2, 3, 4, 5, 6, 7], k = 3, Output: [5, 6, 7, 1, 2, 3, 4]
        
        Explanation:
            - rotate 1 steps to the right: [7, 1, 2, 3, 4, 5, 6]
            - rotate 2 steps to the right: [6, 7, 1, 2, 3, 4, 5]
            - rotate 3 steps to the right: [5, 6, 7, 1, 2, 3, 4]
    
    Example 2:

        Input: nums = [-1, -100, 3, 99],  k = 2,  Output: [3, 99, -1, -100]
        
        Explanation: 
            - rotate 1 steps to the right: [99, -1, -100, 3]
            - rotate 2 steps to the right: [3, 99, -1, -100]
*/


/* <------------------------------- Right Rotate an Array using "Temp Storage Method" -----------------------------> */

/*
    Input : [1, 2, 3, 4, 5, 6, 7] 
    - K = 3 (number of positions to rotate)  
    - N = 7 (length of the array)  


    Step 1: Divide the Array We split the array at index (N - K) = (7 - 3) = 4, creating two parts:

        Original Array:  

        -------------------------------------------
        | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
        -------------------------------------------
        |--------- Part-1 ------|----- Part-2 ----|


        Part-1 (First N - K elements): [1, 2, 3, 4]  
        Part-2 (Last K elements): [5, 6, 7] 


    Step 2: Store Last K Elements in a Temporary Array We temporarily store the last K elements:

        Temp = [5, 6, 7]

    Step 3: Shift Remaining Elements to the Right We shift the first (N - K) elements ([1, 2, 3, 4]) to the right 
            to make space for the stored elements.

        Before shifting:

        -------------------------------------------
        | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
        -------------------------------------------


        Shift one by one from right to left:

        -------------------------------------------
        | 1   | 2   | 3   | 4   | 4   | 5   | 6   |
        -------------------------------------------
        | 1   | 2   | 3   | 3   | 4   | 5   | 6   |
        -------------------------------------------
        | 1   | 2   | 2   | 3   | 4   | 5   | 6   |
        -------------------------------------------
        | 1   | 1   | 2   | 3   | 4   | 5   | 6   |
        -------------------------------------------

        Now, the first K positions are empty.


    Step 4: Place Stored Elements at the Beginning We now place [5, 6, 7] at the start:

        -------------------------------------------
        | 5   | 6   | 7   | 1   | 2   | 3   | 4   |
        -------------------------------------------

        Final Output: [5, 6, 7, 1, 2, 3, 4]

*/


const rotateToRight = (arr, k) => {
    if (arr.length === 0) return arr;
    let n = arr.length;
    k = k % n;

    /* Edge case where no rotation is needed */
    if (k === 0) return arr;

    let temp = [];

    /* Store the last k elements in the temp */
    for (let i = 0; i < k; i++) {
        temp[i] = arr[n - k + i];
    }

    /* Shift the rest of the array to the right */
    for (let i = n - 1; i >= k; i--) {
        arr[i] = arr[i - k];
    }

    /* Place the stored elements at the beginning */
    for (let i = 0; i < k; i++) {
        arr[i] = temp[i];
    }

    return arr;
};
console.log(rotateToRight([1, 2, 3, 4, 5, 6, 7], 3));

/*
    Time Complexity = O(k) + O(n - k) + O(k) = O(k + n - k + k) = O(n + k)
    Space Complexity = O(k)
*/




/* <----------------------------- Right Rotate an Array using "Reversal Algorithm" --------------------------------> */

/*
    Approach:

    Given an array of size N and an integer K (rotation count), the goal is to right rotate the array by K positions 
    efficiently.

    Steps: Input : [1, 2, 3, 4, 5, 6, 7], K = 3, N = 7

    1. Reverse the entire array:

        Original Array:
        -------------------------------------------
        | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
        -------------------------------------------
        
        After reversing the whole array:
        -------------------------------------------
        | 7   | 6   | 5   | 4   | 3   | 2   | 1   |   ----> reverse(arr, 0, n - 1)
        -------------------------------------------

    2. Reverse the first K elements:

        Reverse first K elements (0 to K - 1):
        -------------------------------------------
        | 5   | 6   | 7   | 4   | 3   | 2   | 1   |   ----> reverse(arr, 0, k - 1)
        -------------------------------------------

    3. Reverse the remaining elements:

        Reverse last (N - K) elements (K to N - 1):
        -------------------------------------------
        | 5   | 6   | 7   | 1   | 2   | 3   | 4   |   ----> reverse(arr, k, n - 1)
        -------------------------------------------

        This results in the final right-rotated array.
*/


const reverse = (arr, start, end) => {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
};

const rightRotate = (arr, k) => {
    let n = arr.length;
    k = k % n;

    /* Edge case where no rotation is needed */
    if (n === 0) return arr;

    /* Step 1: Reverse the entire array */
    reverse(arr, 0, n - 1);

    /* Step 2: Reverse the first k elements */
    reverse(arr, 0, k - 1);

    /* Step 3: Reverse the remaining elements */
    reverse(arr, k, n - 1);
    
    return arr;
};
console.log(rightRotate([-1, -100, 3, 99], 2)); /* Output: [ 3, 99, -1, -100 ] */

console.log(rightRotate([1, 2, 3, 4, 5, 6, 7], 3)); /* Output: [ 5, 6, 7, 1, 2, 3, 4 ] */

/*
    Time Complexity = O(n) + O(k) + O(n − k) = O(n + k + n - k) = O(2n) ~ O(n)
    Space Complexity = O(1), no additional data structures are used.
*/
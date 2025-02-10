/*
    Sort an array of 0s, 1s and 2s
    <----------------------------->

    Given an array consisting of only 0s, 1s, and 2s. Write a program to in-place sort the array without using 
    inbuilt sort functions.

    Input: [0, 2, 1, 2, 0, 1],  Output: [ 0, 0, 1, 1, 2, 2 ]

    Input: [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1],  Output: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2]
*/

/*<------------------------------------------ Brute Force Approach ------------------------------------------------>*/

const sortArray = (arr) => {
    let count0 = 0, count1 = 0, count2 = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) count0++;
        else if (arr[i] === 1) count1++;
        else count2++;
    }

    for(let i = 0; i < count0; i++) arr[i] = 0;

    for(let i = count0; i < count0 + count1; i++) arr[i] = 1;

    for (let i = count0 + count1; i < count0 + count1 + count2; i++) arr[i] = 2;

    return arr;
};
console.log(sortArray([0, 2, 1, 2, 0, 1])); /* Output: [ 0, 0, 1, 1, 2, 2 ] */

/*
    Time Complexity = O(n) + O(n) + O(n) = O(3n) ~ O(n)
    Space Complexity = O(1)
*/





/*<------------------------------------------- Dutch National Flag Algorithm -------------------------------------->*/

/*
    The Dutch National Flag Algorithm sorts an array of 0s, 1s, and 2s in O(n) time with O(1) space by using three pointers:

        1. low: Tracks the boundary for 0s.  
        2. mid: Used for traversal.  
        3. high: Tracks the boundary for 2s.  


    How It Works -

        - We traverse the array with mid.
        - If we find 0, swap it to low and move both low and mid forward.
        - If we find 1, just move mid forward.
        - If we find 2, swap it with high and decrease high, keeping mid in place for further checking.
*/

/*
    arr = [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]

    Low (low) = 0,  Mid (mid) = 0,  High (high) = 11 (last index)


    | Step | Low (low) | Mid (mid) | High (high) |                Array State           |                               Action                        |
    |------|-----------|-----------|-------------|--------------------------------------|-------------------------------------------------------------|
    | 1    | 0         | 0         |  11         | [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1] | arr[mid] === 0, swap arr[low] <----> arr[mid], low++, mid++ |
    | 2    | 1         | 1         |  11         | [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1] | arr[mid] === 1, mid++                                       |
    | 3    | 1         | 2         |  11         | [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1] | arr[mid] === 1, mid++                                       |
    | 4    | 1         | 3         |  11         | [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1] | arr[mid] === 0, swap arr[low] <----> arr[mid], low++, mid++ |
    | 5    | 2         | 4         |  11         | [0, 0, 1, 1, 1, 2, 1, 2, 0, 0, 0, 1] | arr[mid] === 1, mid++                                       |
    | 6    | 2         | 5         |  11         | [0, 0, 1, 1, 1, 2, 1, 2, 0, 0, 0, 1] | arr[mid] === 2, swap arr[mid] <----> arr[high], high--      |
    | 7    | 2         | 5         |  10         | [0, 0, 1, 1, 1, 1, 1, 2, 0, 0, 2, 2] | arr[mid] === 1, mid++                                       |
    | 8    | 2         | 6         |  10         | [0, 0, 1, 1, 1, 1, 1, 2, 0, 0, 2, 2] | arr[mid] === 1, mid++                                       |
    | 9    | 2         | 7         |  10         | [0, 0, 1, 1, 1, 1, 1, 2, 0, 0, 2, 2] | arr[mid] === 2, swap arr[mid] <----> arr[high], high--      |
    | 10   | 2         | 7         |  9          | [0, 0, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2] | arr[mid] === 0, swap arr[low] <----> arr[mid], low++, mid++ |
    | 11   | 3         | 8         |  9          | [0, 0, 0, 1, 1, 1, 1, 1, 0, 2, 2, 2] | arr[mid] === 0, swap arr[low] <----> arr[mid], low++, mid++ |
    | 12   | 4         | 9         |  9          | [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2] | arr[mid] === 2, swap arr[mid] <----> arr[high], high--      |
    | 13   | 4         | 9         |  8          | [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2] | mid > high, loop terminates.                                |

    
    Final Sorted Array:- [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2]


    How This Algorithm Works

    1. Three pointers:
        - low points to the first index where 0s should go.
        - mid traverses the array.
        - high points to the last index where 2s should go.
    
    2. Operations in the loop:
        - If arr[mid] === 0: Swap arr[low] ↔ arr[mid], then increment low and mid.
        - If arr[mid] === 1: Move mid forward.
        - If arr[mid] === 2: Swap arr[mid] ↔ arr[high], then decrement high.

    3. Loop terminates when mid > high, ensuring all elements are sorted in O(n) time with O(1) space.

*/

const sortAnArray = (arr) => {
    let low = 0, mid = 0, high = arr.length - 1;

    while (mid <= high) {
        if (arr[mid] === 0) {
            /* Swap 0 to the left */
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            /* Keep 1s in place */
            mid++;
        } else {
            /* Swap 2 to the right */
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }

    return arr;
};
console.log(sortAnArray([0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1])); // Output: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2]

/*
    Time Complexity:- Each element is visited at most once, so O(n).
    Space Complexity:- No extra space is used, so O(1).
*/


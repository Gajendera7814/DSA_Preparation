/*
    Find Minimum in Rotated Sorted Array    Leetcode Problem
    <---------------------------------->    <---------------->

    Given the sorted rotated array nums of unique elements, return the minimum element of this array.

    Example - 1
    
        Input: nums = [3, 4, 5, 1, 2], Output: 1
        Explanation: The original array was [1, 2, 3, 4, 5] rotated 3 times.

    Example - 2

        Input: nums = [4, 5, 6, 7, 0, 1, 2], Output: 0
        Explanation: The original array was [0, 1, 2, 4, 5, 6, 7] and it was rotated 4 times.

    Example - 2

        Input: nums = [11, 13, 15, 17], Output: 11
        Explanation: The original array was [11, 13, 15, 17] and it was rotated 4 times. 
*/

/*
    Algorithm Steps :-

    1. Initialize pointers:

        - start = 0, end = arr.length - 1
        - ans = Infinity (to store the minimum value found)

    2. Binary Search Loop (while start ≤ end):

        - Compute mid = Math.floor((start + end) / 2).
        - Check if the subarray is already sorted:
            - If arr[start] ≤ arr[end], the subarray [start, end] is sorted. The minimum is arr[start], so update ans and break the loop.
        - Left half is sorted (arr[start] ≤ arr[mid]):
            - The minimum in this half is arr[start], so update ans = min(ans, arr[start]).
            - Since the smallest element must be in the unsorted part, move start = mid + 1.
        - Right half is sorted (otherwise):
            - The minimum in this half is arr[mid], so update ans = min(ans, arr[mid]).
            - Move end = mid - 1.

    3. Return ans, which holds the minimum element.


    Input: [4, 5, 6, 7, 0, 1, 2]

    | Iteration |  start |  end |  mid |  arr[start] | arr[mid] | arr[end] |        Condition Met     |             Action Taken            |  ans Update |
    |-----------|--------|------|------|-------------|----------|----------|--------------------------|-------------------------------------|-------------|
    | 1         | 0      | 6    | 3    | 4           | 7        |  2       | Left half sorted (4 ≤ 7) | ans = min(∞, 4) = 4, move start = 4 |   ans = 4   |
    | 2         | 4      | 6    | 5    | 0           | 1        |  2       | Left half sorted (0 ≤ 1) | ans = min(4, 0) = 0, move start = 6 |   ans = 0   |
    | 3         | 6      | 6    | 6    | 2           | 2        |  2       | Subarray sorted (2 ≤ 2)  | ans = min(0, 2) = 0, break          |   ans = 0   |

    Final Output: 0
*/

const findMin = (arr) => {
    let start = 0;
    let end = arr.length - 1;
    let ans = Infinity;
    
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        
        /* search space is already sorted then arr[start] will always be the minimum in that search space. */
        if (arr[start] <= arr[end]) {
            ans = Math.min(ans, arr[start]);
            break;
        }
        
        /* If left part is sorted */
        if (arr[start] <= arr[mid]) {
            /* Keep the minimum */
            ans = Math.min(ans, arr[start]);

            /* Eliminate left half */
            start = mid + 1;
        } else {
            /* If right part is sorted, Keep the minimum */
            ans = Math.min(ans, arr[mid]);

            /* Eliminate right half */
            end = mid - 1;
        }
    }
    return ans;
};
console.log(findMin([3, 4, 5, 1, 2])); // Output: 1
console.log(findMin([11, 13, 15, 17])); // Output: 11
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // Output: 0

/*
    Time Complexity Analysis

        - The algorithm eliminates half of the search space in each step (Binary Search).
        - Worst-case time complexity: O(log N)
    
    Space complexity: O(1) (constant extra space used)
*/
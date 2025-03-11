/*
    Maximum Sum Subarray of size K 
    <----------------------------->

    Given an array of integers of size ‘n’, Our aim is to calculate the maximum sum of ‘k’ consecutive elements in the array.

    Input: [100, 200, 300, 400],  k = 2,  Output: 700

    Input: [1, 4, 2, 10, 23, 3, 1, 0, 20],  k = 4,  Output: 39

        - We get maximum sum by adding subarray [4, 2, 10, 23] of size 4.

    Input: [2, 3],  k = 3,   Output: Invalid

        - There is no subarray of size 3 as size of whole array is 2.
*/

/*<-------------------------------------------- Brute Force Approach ----------------------------------------------->*/

/*
    Input: [100, 200, 300, 400], k = 2

    | Step |  i  | Subarray [i: i + k]  | current_sum Calculation |  max_sum Update  |
    |------|-----|----------------------|-------------------------|------------------|
    | 1    | 0   | [100, 200]           | 100 + 200 = 300         |  max_sum = 300   |
    | 2    | 1   | [200, 300]           | 200 + 300 = 500         |  max_sum = 500   |
    | 3    | 2   | [300, 400]           | 300 + 400 = 700         |  max_sum = 700   |

    Final Output: 700
*/

const maxSum = (arr, k) => {
    /* Edge case: If k is larger than array size */
    if (arr.length < k) return null;

    /* Handle cases where array has negative numbers */
    let max_sum = -Infinity;
    let n = arr.length;

    for (let i = 0; i <= n - k; i++) { /* runs (n − k + 1) times ----> O(n) */
        let current_sum = 0;
        for (let j = 0; j < k; j++) { /* ----> O(k) */
            current_sum += arr[i + j];
        }
        max_sum = Math.max(current_sum, max_sum);
    }
    return max_sum;
};
console.log(maxSum([100, 200, 300, 400], 2)); /* Output: 700 */

/*
    Total Complexity- O(n × k)
    Space Complexity- O(1)
*/

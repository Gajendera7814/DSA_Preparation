/*
    Maximum Subarray    Leetcode Problem
    <--------------->   <--------------->

    Given an integer array nums, find the subarray with the largest sum, and return its sum.

    Example 1:

        Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4],  Output: 6
        Explanation: The subarray [4, -1, 2, 1] has the largest sum 6.
    
    Example 2:

        Input: nums = [1], Output: 1
        Explanation: The subarray [1] has the largest sum 1.

    Example 3:

        Input: nums = [5, 4, -1, 7, 8],  Output: 23
        Explanation: The subarray [5, 4, -1, 7, 8] has the largest sum 23.
*/

/*<------------------------------------------- Brute Force Approach ----------------------------------------------->*/

/*

    1. Initialize maxSum to -Infinity
        - This ensures that even if all numbers are negative, the algorithm still works correctly.

    2. Outer Loop (i from 0 to arr.length - 1)  
        - This loop selects the starting index of the subarray.

    3. Inner Loop (j from i to arr.length - 1)  
        - This loop selects the ending index of the subarray and keeps a running sum.

    4. Calculate currentSum for each subarray  
        - We initialize currentSum = 0 before the inner loop.
        - In each iteration of the inner loop, we add arr[j] to currentSum, effectively considering all subarrays 
          starting from i and ending at j.

    5. Update maxSum  
        - After adding each element, we check if currentSum is greater than maxSum and update maxSum accordingly.

    6. Return maxSum  
        - After examining all subarrays, the function returns the highest sum found.

    
    Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]


        |  i |  j |      Subarray (arr[i] to arr[j])     | currentSum | maxSum |
        |----|----|--------------------------------------|------------|--------|
        | 0  | 0  | [-2]                                 |   -2       | -2     |
        | 0  | 1  | [-2, 1]                              |   -1       | -1     |
        | 0  | 2  | [-2, 1, -3]                          |   -4       | -1     |
        | 0  | 3  | [-2, 1, -3, 4]                       |    0       | 0      |
        | 0  | 4  | [-2, 1, -3, 4, -1]                   |   -1       | 0      |
        | 0  | 5  | [-2, 1, -3, 4, -1, 2]                |    1       | 1      |
        | 0  | 6  | [-2, 1, -3, 4, -1, 2, 1]             |    2       | 2      |
        | 0  | 7  | [-2, 1, -3, 4, -1, 2, 1, -5]         |   -3       | 2      |
        | 0  | 8  | [-2, 1, -3, 4, -1, 2, 1, -5, 4]      |    1       | 2      |


        | i  | j  | Subarray (arr[i] to arr[j])          | currentSum | maxSum |
        |----|----|--------------------------------------|------------|--------|
        | 1  | 1  | [1]                                  |   1        |   2    |
        | 1  | 2  | [1, -3]                              |   -2       |   2    |
        | 1  | 3  | [1, -3, 4]                           |   2        |   2    |
        | 1  | 4  | [1, -3, 4, -1]                       |   1        |   2    |
        | 1  | 5  | [1, -3, 4, -1, 2]                    |   3        |   3    |
        | 1  | 6  | [1, -3, 4, -1, 2, 1]                 |   4        |   4    |
        | 1  | 7  | [1, -3, 4, -1, 2, 1, -5]             |   -1       |   4    |
        | 1  | 8  | [1, -3, 4, -1, 2, 1, -5, 4]          |   3        |   4    |


        | i  | j  | Subarray (arr[i] to arr[j])  | currentSum | maxSum |
        |----|----|------------------------------|------------|--------|
        | 2  | 2  | [-3]                         |   -3       |   4    |
        | 2  | 3  | [-3, 4]                      |   1        |   4    |
        | 2  | 4  | [-3, 4, -1]                  |   0        |   4    |
        | 2  | 5  | [-3, 4, -1, 2]               |   2        |   4    |
        | 2  | 6  | [-3, 4, -1, 2, 1]            |   3        |   4    |
        | 2  | 7  | [-3, 4, -1, 2, 1, -5]        |  -2        |   4    |
        | 2  | 8  | [-3, 4, -1, 2, 1, -5, 4]     |   2        |   4    |


        | i  | j  |  Subarray (arr[i] to arr[j]) | currentSum | maxSum |
        |----|----|------------------------------|------------|--------|
        | 3  | 3  | [4]                          |   4        |    4   |
        | 3  | 4  | [4, -1]                      |   3        |    4   |
        | 3  | 5  | [4, -1, 2]                   |   5        |    5   |
        | 3  | 6  | [4, -1, 2, 1]                |   6        |    6   |
        | 3  | 7  | [4, -1, 2, 1, -5]            |   1        |    6   |
        | 3  | 8  | [4, -1, 2, 1, -5, 4]         |   5        |    6   |


        The function finds that the maximum subarray sum is 6, corresponding to the subarray [4, -1, 2, 1].

        Final Output: 6
*/

const maxSubArrayBruteForce = (arr) => {
    let maxi = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        let sum = 0;

        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            maxi = Math.max(maxi, sum);
        }
    }
    return maxi;
};
console.log(maxSubArrayBruteForce([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6

/*
    Time Complexity: O(n2)
    Space Complexity: O(1)
*/





/*<------------------------------------------- Kadane's Algorithm ------------------------------------------------->*/

/*
    Algorithm :-

    - Initialize two variables: currentSum (the sum of the current subarray) and maxSum (the largest sum found).
    - Iterate through the array. For each element, update currentSum to be either the current element alone or 
      the sum of the current element with the previous currentSum, whichever is larger.
    - Update maxSum to the maximum of maxSum and currentSum.
*/

const maxSubArrayKadane = (arr) => {
    let currentSum = arr[0];
    let maxSum = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
console.log(maxSubArrayKadane([-2, -3, 4, -1, -2, 1, 5, -3])); // Output: 7

/*
    Time Complexity: O(n)
    Space Complexity: O(1)
*/
/*
    Count Subarray sum Equals K     Subarray Sum Equals K (Leetcode Problem)
    <-------------------------->    <--------------------------------------->

    Given an array of integers and an integer k, return the total number of subarrays whose sum equals k.

    A subarray is a contiguous non-empty sequence of elements within an array.


    Example 1: 
        
        Input: [3, 1, 2, 4],   k = 6,   Output: 2
        
        Explanation: The subarrays that sum up to 6 are [3, 1, 2] and [2, 4].

    Example 2:

        Input: [1, 2, 3],   k = 3,   Output: 2
       
        Explanation: The subarrays that sum up to 3 are [1, 2], and [3].
*/


/*<--------------------------------------------- Optimized Brute Force -------------------------------------------->*/

/*
    Algorithm :-

    1. Initialize count: Set count = 0 to store the number of subarrays whose sum is equal to k.
    2. Iterate over the starting indices (i): Use a loop that selects every possible starting index from 0 to n-1.
    3. Iterate over the ending indices (j): For each i, use another loop to select the possible ending indices from i to n-1.
    4. Compute the sum: Initialize sum = 0 before the inner loop. Iterate from i to j and add arr[j] to sum to keep track of
       the current subarray sum.
    5. Check the sum: If sum === k, increment the count.
    6. Return count: After processing all subarrays, return the final count.
*/

/*
    Example Input: [3, 1, 2, 4],    k = 3

  
    |  i (Start) |   j (End)  |  Subarray arr[i...j]  | Sum Calculation  |  sum === k   |  count |
    |------------|------------|-----------------------|------------------|--------------|--------|
    | 0          | 0          | [3]                   | sum = 3          | ✅ Yes       | 1      |
    | 0          | 1          | [3, 1]                | sum = 3 + 1 = 4  | ❌ No        | 1      |
    | 0          | 2          | [3, 1, 2]             | sum = 4 + 2 = 6  | ❌ No        | 1      |
    | 0          | 3          | [3, 1, 2, 4]          | sum = 6 + 4 = 10 | ❌ No        | 1      |
    | 1          | 1          | [1]                   | sum = 1          | ❌ No        | 1      |
    | 1          | 2          | [1, 2]                | sum = 1 + 2 = 3  | ✅ Yes       | 2      |
    | 1          | 3          | [1, 2, 4]             | sum = 3 + 4 = 7  | ❌ No        | 2      |
    | 2          | 2          | [2]                   | sum = 2          | ❌ No        | 2      |
    | 2          | 3          | [2, 4]                | sum = 2 + 4 = 6  | ❌ No        | 2      |
    | 3          | 3          | [4]                   | sum = 4          | ❌ No        | 2      |

    1. [3]
    2. [1, 2]

    Output: 2  
*/

const subarraySum = (arr, k) => {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            if (sum === k) count++;
        }
    }
    return count;
};
console.log(subarraySum([1, 1, 1], 2)); // Output: 2
console.log(subarraySum([1, 2, 3], 3)); // Output: 2
console.log(subarraySum([3, 1, 2, 4], 3)); // Output: 2

/*
    Time Complexity: O(n²)
    Space Complexity: O(1)
*/
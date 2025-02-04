/*
    Longest Subarray with given Sum K(Positives)
    <------------------------------------------>

    Given an array and a sum k, we need to print the length of the longest subarray that sums to k.

    Example : 1

        Input: [2, 3, 5], k = 5, Output: 2
        Explanation: The longest subarray with sum 5 is [2, 3] And its length is 2.
        
    Example : 2

        Input: [2, 3, 5, 1, 9], k = 10, Output: 3
        Explanation: The longest subarray with sum 10 is [2, 3, 5] And its length is 3.
*/

/*<-------------------------------------------- Brute Force Approach ---------------------------------------------->*/

const getLongestSubarray = (arr, k) => {
    let n = arr.length;
    let longestLength = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let sum = 0;
            for (let k = i; k <= j; k++) {
                sum += arr[k];
            }

            if (sum === k) longestLength = Math.max(longestLength, j - i + 1);
        }
    }
    return longestLength;
};
console.log(getLongestSubarray([2, 3, 5], 5)); // Output: 2

/*
    Time Complexity: O(n3)
    Space Complexity: O(1)
*/



const GetLongestSubarray = (arr, k) => {
    let maxLength = 0;

    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;

        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];

            if (currentSum === k) {
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }
    return maxLength;
};
console.log(GetLongestSubarray([2, 3, 5, 1, 9], 10)); // Output: 3

/*
    Time Complexity: O(n2)
    Space Complexity: O(1)
*/




/*<----------------------------------------------- Using Two pointers --------------------------------------------->*/

const getLongestSubarrayWithSum = (arr, k) => {
    let n = arr.length;
    let left = 0;
    let right = 0;
    let currentSum = arr[0];
    let longestLength = 0;

    while (right < n) {
        while (left <= right && currentSum > k) {
            currentSum -= arr[left];
            left++;
        }

        if (currentSum === k) {
            longestLength = Math.max(longestLength, right - left + 1);
        }

        right++;

        if (right < n) {
            currentSum += arr[right];
        }
    }

    return longestLength;
};
console.log(getLongestSubarrayWithSum([2, 3, 5, 1, 9], 10)); // Output: 3

/*
    Time Complexity: O(2 * n)
    Space Complexity: O(1)
*/
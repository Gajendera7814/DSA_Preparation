/*
    Two Sum (Leetcode Problem)
    <------------------------->

    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    You can return the answer in any order.


    Example 1:

        Input: nums = [2, 7, 11, 15], target = 9
        Output: [0, 1]
        Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
    
    Example 2:

        Input: nums = [3, 2, 4], target = 6
        Output: [1, 2]
    
    Example 3:

        Input: nums = [3, 3], target = 6
        Output: [0, 1]
*/

/*<-------------------------------------------- Brute Force Approach ---------------------------------------------->*/

const twoSum = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
};
console.log(twoSum([2, 6, 5, 8, 11], 14)); // Output: [1, 3]

/*
    Time Complexity: O(n2)
    Space Complexity: O(1)
*/




/*<--------------------------------------- using Hashing Approach ------------------------------------------------->*/

/*

    Input nums = [2, 6, 5, 8, 11] and target = 14

    Step - 1 when currentIndex = 0

        - currentNumber = 2, complement = 14 - 2 = 12.
        - numIndicesMap does not contain 12, so we add 2 with index 0 to the map.
        - numIndicesMap = { 2: 0 }.
        
    Step - 2 when currentIndex = 1

        - currentNumber = 6, complement = 14 - 6 = 8.
        - numIndicesMap does not contain 8, so we add 6 with index 1 to the map.
        - numIndicesMap = { 2: 0, 6: 1 }.
        
    Step - 3 when currentIndex = 2

        - currentNumber = 5, complement = 14 - 5 = 9.
        - numIndicesMap does not contain 9, so we add 5 with index 2 to the map.
        - numIndicesMap = { 2: 0, 6: 1, 5: 2 }.
        
    Step - 4 when currentIndex = 3:

        - currentNumber = 8, complement = 14 - 8 = 6.
        - numIndicesMap contains 6, so we have found a valid pair: 8 at index 3 and 6 at index 1.
        - Return [3, 1].
*/

const twoSumUsingHashing = (arr, target) => {
    let hashMap = new Map();

    for (let i = 0; i < arr.length; i++) {
        let complement = target - arr[i];

        if (hashMap.has(complement)) {
            return [i, hashMap.get(complement)];
        }
        hashMap.set(arr[i], i);
    }
    return [-1, -1];
};
console.log(twoSumUsingHashing([2, 6, 5, 8, 11], 14)); // Output: [3, 1]

/*
    Time Complexity: O(n), 
    
    where n is the number of elements in the array. We loop through the array once and perform constant-time operations 

    Space Complexity: O(n), 
    
    since the set can store up to n elements in the worst case, where all elements in the array are unique.
*/



/*<---------------------------------------- Using a Set Approach -------------------------------------------------->*/

/*

    1. First Iteration (i = 0):
        - Current number: 3
        - Complement needed: 6 - 3 = 3
        - seen is empty, so 3 is not found.
        - Add 3 to seen: {3}
        - Continue to next iteration.

    2. Second Iteration (i = 1):
        - Current number: 2
        - Complement needed: 6 - 2 = 4
        - seen contains {3}, but 4 is not found.
        - Add 2 to seen: {3, 2}
        - Continue to next iteration.

    3. Third Iteration (i = 2):
        - Current number: 4
        - Complement needed: 6 - 4 = 2
        - seen contains {3, 2}, and 2 is found in the set.
        - Return [2, 1] because:
            - 2 is at index 1
            - 4 is at index 2

    Final Output: [2, 1]
*/

const twoSumSet = (nums, target) => {
    let seen = new Set();
    
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [i, nums.indexOf(complement)];
        }
        
        seen.add(nums[i]);
    };
    return [-1, -1];
};
console.log(twoSumSet([3, 2, 4], 6)); // Output: [2, 1]

/*
    Time Complexity: O(n), We traverse the array once, and each lookup in the set is O(1)
    Space Complexity: O(n), The set stores up to n unique elements in the worst case.
*/




/*<------------------------------------------- using two-pointer Approach ------------------------------------------>*/

const twoSumUsingTwoPointer = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    arr.sort((a, b) => a - b);

    while (left < right) {
        const sum = arr[left] + arr[right];

        if (sum < target) {
            left++;
        } else if (sum > target) {
            right--;
        } else {
            return [left, right];
        }
    }
    return [-1, -1];
};
console.log(twoSumUsingTwoPointer([1, 3, 5, 7, 9], 12)); // Output: [1, 4]

/*
    Time Complexity: O(nlogn) + O(n) = O(nlogn)
    Space Complexity: O(n)
*/

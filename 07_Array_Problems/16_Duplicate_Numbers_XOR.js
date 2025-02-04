/*
    Find the XOR of Numbers Which Appear Twice   Leetcode problem
    <---------------------------------------->   <--------------->

    You are given an array nums, where each number in the array appears either once or twice.

    Return the bitwise XOR of all the numbers that appear twice in the array, or 0 if no number appears twice.

    Example 1:

        Input: nums = [1, 2, 1, 3],  Output: 1
        Explanation: The only number that appears twice in nums is 1.

    Example 2:

        Input: nums = [1, 2, 3],  Output: 0
        Explanation: No number appears twice in nums.

    Example 3: 
        Input: nums = [1, 2, 2, 1],  Output: 3
        Explanation: Numbers 1 and 2 appeared twice. 1 XOR 2 == 3.
*/

/*
    Key XOR Properties
    -------------------
    1. XOR a number with itself results in 0: a ⊕ a = 0
    2. XOR a number with 0 results in the number itself: a ⊕ 0 = a
    3. XOR is commutative and associative: (a ⊕ b ⊕ a) = (a ⊕ a ⊕ b) = (0 ⊕ b) = b


    1. Sorting the Array:
        - First, the array is sorted in ascending order. This brings all duplicates next to each other. 
          This allows us to efficiently check for duplicates by simply comparing adjacent elements.

        - Example:
            - Input: [1, 2, 2, 1]
            - Sorted: [1, 1, 2, 2]

    2. Iterate Through the Array:
        - We start from the second element (index 1), comparing each element with its previous one.
        - If two adjacent elements are the same, this indicates that the number appears twice, and we perform XOR 
          on that number. 
        - XORing two identical numbers will "cancel out" their effect, leaving only the result of XORing all the 
          duplicate numbers.

    3. Final XOR:
        - After iterating through all the numbers, the result in xor will be the XOR of all the numbers that appeared twice.
        
        - Example:
            - For [1, 1, 2, 2], we have:
            - 1 ⊕ 1 = 0
            - 2 ⊕ 2 = 0
            - The result is 0 ⊕ 0 = 0 (for no duplicates)
            - However, if we only have one number that repeats, like [1, 2, 1]:
            - 1 ⊕ 1 = 0
            - The result will be 0 ⊕ 2 = 2 (only 2 is left)
*/

const duplicateNumbersXOR = (arr) => {
    arr.sort((a, b) => a - b);
    let xor = 0;

    /* XOR only adjacent duplicate numbers */
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
            xor ^= arr[i]; 
        }
    }

    return xor;
};
console.log(duplicateNumbersXOR([1, 2, 3])); // Output: 0
console.log(duplicateNumbersXOR([1, 2, 1, 3])); // Output: 1
console.log(duplicateNumbersXOR([1, 2, 2, 1])); // Output: 3


/*
    Time Complexity: O(n log n)	Sorting takes O(n log n), looping takes O(n), so total O(n log n).
    Space Complexity: O(1)	No extra space used.
*/
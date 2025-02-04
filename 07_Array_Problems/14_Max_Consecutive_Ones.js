/*
    Max Consecutive Ones    Leetcode Problem
    <------------------->   <--------------->

    Given a binary array nums, return the maximum number of consecutive 1's in the array.

 
    Example 1:

        Input: nums = [1, 1, 0, 1, 1, 1, 0, 1, 1],  Output: 3
        
        Explanation: The first two digits or the last three digits are consecutive 1s. 
        The maximum number of consecutive 1s is 3.
    
    Example 2:

        Input: nums = [1, 0, 1, 1, 0, 1],  Output: 2
*/

/*

    1. Initialize Variables:

        - maxOnes keeps track of the maximum sequence of consecutive 1s encountered so far.
        - currentCount tracks the count of 1s in the current sequence.

    2. Iterate Through the Array:

        - If the current element (arr[i]) is 1, increment currentCount.
        - Update maxOnes by comparing it with currentCount using Math.max().
        - If a 0 is encountered, reset currentCount to 0 (because the sequence is broken).

    3. Return maxOnes:

        - After looping through the array, maxOnes holds the maximum consecutive 1s.


    Input: [1, 1, 0, 1, 1, 1, 0, 1, 1]
    
        |  Index   |   Element  |       currentCount   |    maxOnes    |
        |----------|------------|----------------------|---------------|
        |   0      |    1       |       1              |    1          |
        |   1      |    1       |       2              |    2          |
        |   2      |    0       |       0 (reset)      |    2          |
        |   3      |    1       |       1              |    2          |
        |   4      |    1       |       2              |    2          |
        |   5      |    1       |       3              |    3          |
        |   6      |    0       |       0 (reset)      |    3          |
        |   7      |    1       |       1              |    3          |
        |   8      |    1       |       2              |    3          |

    Final Output: 3
*/

const findMaxConsecutiveOnes = (arr) => {
    let maxOnes = 0;
    let currentCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
            currentCount++; 
            maxOnes = Math.max(maxOnes, currentCount);
        } else {
            currentCount = 0;
        }
    }
    return maxOnes;
};
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1, 0, 1, 1])); /* Output: 3 */

/*
    Time Complexity: O(n)
    Space Complexity: O(1)
*/




/*<---------------------------------- Using a Two-Pointer (Sliding Window) Approach -------------------------------->*/

/*
    Algorithm :-

    1. Use two pointers, start and end, both starting at the beginning of the array.

    2. As you move end to traverse the array, check if the element is 1 or 0.
        - If it's 1, continue moving end.
        - If it's 0, update the maxCount with the length of the window [start, end - 1], then move start to end + 1 
          to start a new window.

    3. After the loop, handle the case where the array ends with 1.


    Input: [1, 1, 0, 1, 1, 1]


    |     Index (end)    |     Element (arr[end])    |    start    | maxCount         |        Explanation                          |
    |--------------------|---------------------------|-------------|------------------|---------------------------------------------|
    |       0            |      1                    |      0      |        0         | Start of first sequence                     |
    |       1            |      1                    |      0      |        0         | Still in sequence                           |
    |       2            |      0                    |      0 → 3  | max(0, 2-0) = 2  | Reset start to 3                            |
    |       3            |      1                    |      3      |        2         | Start of new sequence                       |
    |       4            |      1                    |      3      |        2         | Still in sequence                           |
    |       5            |      1                    |      3      |        2         | Still in sequence                           |
    |       Loop Ends    |      -                    |      -      | max(2, 6-3) = 3  | Handle case where the array ends with 1s    |

    Final Output: 3
*/

const findMaxConsecutiveOnesTwoPointer = (arr) => {
    let maxCount = 0;
    let start = 0;

    for (let end = 0; end < arr.length; end++) {
        if (arr[end] === 0) {
            maxCount = Math.max(maxCount, end - start);
            start = end + 1;
        }
    }

    /* Handle the case where the array ends with 1's */
    maxCount = Math.max(maxCount, arr.length - start);

    return maxCount;
};
console.log(findMaxConsecutiveOnesTwoPointer([1, 1, 0, 1, 1, 1])); /* Output: 3 */


/*
    Time Complexity
    <------------->

    - The loop runs O(n) times, iterating through the array once.
    - Each operation inside the loop (Math.max, subtraction, reassignment) is O(1).
    
    Overall: O(n).

    Space Complexity
    <-------------->

    - Only two integer variables (start, maxCount) are used.
    - No extra data structures --→ O(1).


    Time Complexity: O(n)
    Space Complexity: O(1)
*/
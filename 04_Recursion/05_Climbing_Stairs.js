/*
    Climbing Stairs
    <------------->

    Given a staircase with n steps, the task is to print all possible ways to climb to the top of the staircase starting from step 0.
    At each step, you can climb 1, 2, or 3 steps.
*/

/*
<----------------------- Dry Run of the Code ------------------------->

    Input: climbingStairs(0, 5)

    1. Start at currPos = 0, n = 5, ans = ""
        - Call climbingStairs(1, 5, "1")
        - Call climbingStairs(2, 5, "2")
        - Call climbingStairs(3, 5, "3")

    2. For climbingStairs(1, 5, "1"):
        - Call climbingStairs(2, 5, "11")
        - Call climbingStairs(3, 5, "12")
        - Call climbingStairs(4, 5, "13")

    3. For climbingStairs(2, 5, "2"):
        - Call climbingStairs(3, 5, "21")
        - Call climbingStairs(4, 5, "22")
        - Call climbingStairs(5, 5, "23") → Prints "23"

    4. For climbingStairs(3, 5, "3"):
        - Call climbingStairs(4, 5, "31")
        - Call climbingStairs(5, 5, "32") → Prints "32"

    5. Repeat recursively until all possible paths are printed.
*/

const climbingStairs = (currPos, n, ans = "") => {
    if (currPos === n) {
        console.log(ans);
        return;
    }

    if (currPos > n) return;

    climbingStairs(currPos + 1, n, ans + "1");
    climbingStairs(currPos + 2, n, ans + "2");
    climbingStairs(currPos + 3, n, ans + "3");
};
climbingStairs(0, 5);

/*  
    Output -
    11111
    1112
    1121
    113
    1211
    122
    131
    2111
    212
    221
    23
    311
    32
*/

/*
    Time and Space Complexity:

    Time Complexity: The number of recursive calls can be modeled as a tree where each node has 3 children (corresponding to 
    taking 1, 2, or 3 steps). The number of ways to climb the staircase corresponds to the  n-th term of the tribonacci 
    sequence T(n).

    time complexity - O(3^n).

    Space Complexity: The space complexity is determined by the maximum depth of the recursion tree, which is  O(n) 
    (due to the call stack).

    time complexity - O(3^n)
    Space Complexity - O(n) 
*/



/*<--------------------------------------- Leetcode Problem -------------------------------------->*/

/*
    You are climbing a staircase. It takes n steps to reach the top.

    Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

    Example 1: Input: n = 2  Output: 2
    
    Explanation: There are two ways to climb to the top.
    1. 1 step + 1 step
    2. 2 steps

    Example 2: Input: n = 3    Output: 3

    Explanation: There are three ways to climb to the top.
    1. 1 step + 1 step + 1 step
    2. 1 step + 2 steps
    3. 2 steps + 1 step
*/

const countWaysToClimb = (n) => {
    /* Base cases */
    if (n === 0) return 1; /* One way to stay at the ground (do nothing) */
    if (n < 0) return 0;   /* No way to climb if negative steps */

    return countWaysToClimb(n - 1) + countWaysToClimb(n - 2);
};
console.log(countWaysToClimb(2)); /* Output: 2 */
console.log(countWaysToClimb(3)); /* Output: 3 */

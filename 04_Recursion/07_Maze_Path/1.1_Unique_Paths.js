/*
    Unique Paths    Leetcode Problem
    <----------->   <--------------->

    There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). 
    The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either 
    down or right at any point in time.

    Given the two integers m and n, return the number of possible unique paths that the robot can take to reach 
    the bottom-right corner.

    The test cases are generated so that the answer will be less than or equal to 2 * 109.

    Example 1:
    Input: m = 3, n = 7,    Output: 28

    Example 2:

    Input: m = 3, n = 2,    Output: 3
    
    Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
    1. Right -> Down -> Down
    2. Down -> Down -> Right
    3. Down -> Right -> Down
*/

const countMazePaths = (currentRow, currentCol, endRow, endCol) => {
    /* Base case: If the current position matches the target position, return 1 (valid path). */
    if (currentRow === endRow && currentCol === endCol) {
        return 1;
    }

    /* Boundary condition: Stop further exploration if the current position exceeds the target bounds. */
    if (currentRow > endRow || currentCol > endCol) {
        return 0;
    }

    /* Recursive case: Count paths from Horizontal and Vertical moves. */
    const horizontalPaths = countMazePaths(currentRow, currentCol + 1, endRow, endCol);
    const verticalPaths = countMazePaths(currentRow + 1, currentCol, endRow, endCol);

    return horizontalPaths + verticalPaths;
};
const m = 3, n = 2;
const totalPaths = countMazePaths(0, 0, m - 1, n - 1);
console.log(totalPaths); // Output: 3



/*
    Time and Space Complexity
    <----------------------->

    Time Complexity:  
    
    - With only Horizontal and Vertical moves, there are C(m + n - 2, m - 1) combinations (where C is the binomial coefficient).
      Calculating the recursion leads to an exponential time complexity of approximately O(2^{m + n}).  
   
    Space Complexity: The recursive call stack grows up to O(m + n).
*/
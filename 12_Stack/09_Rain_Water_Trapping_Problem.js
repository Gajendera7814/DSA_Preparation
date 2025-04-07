/*
    Rain Water Trapping problem     Leetcode Problem
    <-------------------------->    <--------------->

    The Rainwater Trapping Problem involves calculating how much water can be trapped after rain, given an array of 
    non-negative integers that represent the heights of bars or elevations. The width of each bar is considered to be 1, 
    and the goal is to find the total water trapped between these bars based on their heights.


    Input -> Height : [3, 0, 0, 2, 0, 4],  Outptt: TotalUnitOfWater = 10

*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

/*
    The algorithm works by, for each element in the array:

    - Finding the maximum height to the left including current index.

    - Finding the maximum height to the right including current index.

    - Calculating trapped water at the current index using: min(maxLeft, maxRight) − height[i]


    | i | heights[i] | maxLeft (0..i) |  maxRight (i..n-1) |  min(maxLeft, maxRight)  |  Water Trapped at i |  totalWater |
    |---|------------|----------------|--------------------|--------------------------|---------------------|-------------|
    | 0 | 3          | 3              | 4                  | 3                        | 0                   | 0           |
    | 1 | 0          | 3              | 4                  | 3                        | 3                   | 3           |
    | 2 | 0          | 3              | 4                  | 3                        | 3                   | 6           |
    | 3 | 2          | 3              | 4                  | 3                        | 1                   | 7           |
    | 4 | 0          | 3              | 4                  | 3                        | 3                   | 10          |
    | 5 | 4          | 4              | 4                  | 4                        | 0                   | 10          |

    Final Output: 10
*/

const trapWater = (heights) => {
    let n = heights.length;
    let totalWater = 0;

    for (let i = 0; i < n; i++) {
        /* Find the maximum height to the left of the current element. */
        let maxLeft = 0;
        for (let j = 0; j <= i; j++) {
            maxLeft = Math.max(maxLeft, heights[j]);
        }

        /* Find the maximum height to the right of the current element. */
        let maxRight = 0;
        for (let j = i; j < n; j++) {
            maxRight = Math.max(maxRight, heights[j]);
        }

        /* The water trapped on top of the current element. */
        totalWater += Math.min(maxLeft, maxRight) - heights[i];
    }
    return totalWater;
}
console.log(trapWater([3, 0, 0, 2, 0, 4])); // Output: 10

/*
    ⏱ Time Complexity:

        - Outer loop runs n times.
        - For each element, we run:
        - One loop from 0 to i → O(n)
        - One loop from i to n-1 → O(n)
        - So for each i, we do O(n) work ⇒ O(n²) total.

        Time Complexity: O(n²)

        
    Space Complexity :-

        - We're only using a few variables (totalWater, maxLeft, maxRight, etc.)
        - No additional arrays or data structures used.

        Space Complexity: O(1)
*/





/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    Input -> Height : [3, 0, 0, 2, 0, 4],  Outptt: TotalUnitOfWater = 10

    Height: [3, 0, 0, 2, 0, 4]

    MaxLeft: [3, 3, 3, 3, 3, 4]

    MaxRight: [4, 4, 4, 4, 4, 4]

    Min: [3, 3, 3, 3, 3, 4]

    water[i] = Min - Height = [0, 3, 3, 1, 3, 0]

    sum = 10

*/

/*
    Input: height = [3, 0, 0, 2, 0, 4]


    Step 1: maxLeft Array

        | i | height[i] | maxLeft[i] = max(maxLeft[i - 1], height[i]) |
        |---|-----------|---------------------------------------------|
        | 0 | 3         |                    3                        |
        | 1 | 0         |                    3                        |
        | 2 | 0         |                    3                        |
        | 3 | 2         |                    3                        |
        | 4 | 0         |                    3                        |
        | 5 | 4         |                    4                        |

        --→ maxLeft = [3, 3, 3, 3, 3, 4]


    Step 2: maxRight Array

        | i | height[i] | maxRight[i] = max(maxRight[i + 1], height[i])  |
        |---|-----------|------------------------------------------------|
        | 5 |     4     |                      4                         |
        | 4 |     0     |                      4                         |
        | 3 |     2     |                      4                         |
        | 2 |     0     |                      4                         |
        | 1 |     0     |                      4                         |
        | 0 |     3     |                      4                         |

        --→ maxRight = [4, 4, 4, 4, 4, 4]

    
    Step 3: Water at each index

        | i | height[i] | maxLeft[i] | maxRight[i] |  min(maxLeft, maxRight)  | Water[i] |
        |---|-----------|------------|-------------|--------------------------|----------|
        | 0 |     3     |     3      |      4      |           3              |    0     |
        | 1 |     0     |     3      |      4      |           3              |    3     |
        | 2 |     0     |     3      |      4      |           3              |    3     |
        | 3 |     2     |     3      |      4      |           3              |    1     |
        | 4 |     0     |     3      |      4      |           3              |    3     |
        | 5 |     4     |     4      |      4      |           4              |    0     |

        --→ water = [0, 3, 3, 1, 3, 0]

    Total Water Trapped sum = 0 + 3 + 3 + 1 + 3 + 0 = 10

    Final Output: 10
*/

const rainWaterTrapping = (height) => {
    let maxLeft = [];
    let maxRight = [];
    let water = [];

    /* Fill maxLeft array. */
    maxLeft[0] = height[0];
    for (let i = 1; i < height.length; i++) {
        maxLeft[i] = Math.max(maxLeft[i - 1], height[i]);
    }

    /* Fill maxRight array. */
    maxRight[height.length - 1] = height[height.length - 1];
    for (let i = height.length - 2; i >= 0; i--) {
        maxRight[i] = Math.max(maxRight[i + 1], height[i]);
    }

    /* Calculate water trapped at each index. */
    for (let i = 0; i < height.length; i++) {
        water[i] = Math.min(maxLeft[i], maxRight[i]) - height[i];
    }

    /* Calculate the total amount of trapped water. */
    let sum = 0;
    for (let i = 0; i < height.length; i++) {
        sum += water[i];
    }

    return sum;
}
console.log(rainWaterTrapping([3, 0, 0, 2, 0, 4])); // Output: 10


/*
    Time Complexity: O(n)
    Space Complexity: O(n)
*/

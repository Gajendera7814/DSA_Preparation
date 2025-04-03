
/*
    Largest Rectangle in Histogram     Maximum Area Histogram   (Leetcode Problem)
    <----------------------------->    <----------------------------------------->

    The maximum area of a rectangle in a histogram can be determined by identifying the width of contiguous bars 
    and their respective heights.

    Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, 
    return the area of the largest rectangle in the histogram.

    Input: [6, 2, 5, 4, 5, 1, 6],  Output: 12
*/

/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

/*
    1. Understanding the Algorithm -

    The Maximum Area Histogram (MAH) problem is about finding the largest rectangular area that can be formed in a histogram, where:
        - The width of each bar is 1.
        - The height of each bar is given in the heights[] array.

    How the Algorithm Works -

        The given approach is a brute-force approach, which checks all possible rectangles by:
        1. Iterating through every bar as a starting point.
        2. Expanding to the right, checking how far we can extend while maintaining the minimum height.
        3. Calculating the area for each rectangle and updating maxArea.


        Input: [6, 2, 5, 4, 5, 1, 6]


        | i (Start) |  j (End) |  minHeight | Width |       Area (minHeight * Width)      | maxArea |
        |-----------|----------|------------|-------|-------------------------------------|---------|
        | 0         |   0      |   6        | 1     |           6                         | 6       |
        | 0         |   1      |   2        | 2     |           4                         | 6       |
        | 0         |   2      |   2        | 3     |           6                         | 6       |
        | 0         |   3      |   2        | 4     |           8                         | 8       |
        | 0         |   4      |   2        | 5     |           10                        | 10      |
        | 0         |   5      |   1        | 6     |           6                         | 10      |
        | 0         |   6      |   1        | 7     |           7                         | 10      |
        | 1         |   1      |   2        | 1     |           2                         | 10      |
        | 1         |   2      |   2        | 2     |           4                         | 10      |
        | 1         |   3      |   2        | 3     |           6                         | 10      |
        | 1         |   4      |   2        | 4     |           8                         | 10      |
        | 1         |   5      |   1        | 5     |           5                         | 10      |
        | 1         |   6      |   1        | 6     |           6                         | 10      |
        | 2         |   2      |   5        | 1     |           5                         | 10      |
        | 2         |   3      |   4        | 2     |           8                         | 10      |
        | 2         |   4      |   4        | 3     |           12                        | 12      |
        | 2         |   5      |   1        | 4     |           4                         | 12      |
        | 2         |   6      |   1        | 5     |           5                         | 12      |
        | 3         |   3      |   4        | 1     |           4                         | 12      |
        | 3         |   4      |   4        | 2     |           8                         | 12      |
        | 3         |   5      |   1        | 3     |           3                         | 12      |
        | 3         |   6      |   1        | 4     |           4                         | 12      |
        | 4         |   4      |   5        | 1     |           5                         | 12      |
        | 4         |   5      |   1        | 2     |           2                         | 12      |
        | 4         |   6      |   1        | 3     |           3                         | 12      |
        | 5         |   5      |   1        | 1     |           1                         | 12      |
        | 5         |   6      |   1        | 2     |           2                         | 12      |
        | 6         |   6      |   6        | 1     |           6                         | 12      |

        
        Final Output: 12
*/

const MaximumAreaHistogram = (heights) => {
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
        let minHeight = heights[i];

        for (let j = i; j < heights.length; j++) {
            minHeight = Math.min(minHeight, heights[j]);
            let width = j - i + 1;
            let area = minHeight * width;
            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
};
console.log(MaximumAreaHistogram([6, 2, 5, 4, 5, 1, 6])); // Output: 12

/*
    Time Complexity -

        - The algorithm uses two nested loops:
        - Outer loop: Iterates i from 0 to N-1 → O(N)
        - Inner loop: Iterates j from i to N-1 → O(N)
        - In the worst case (when all bars are equal), it iterates approximately N² / 2 times.
        - Worst-case Time Complexity: O(N²).

    Space Complexity -

        - Uses only a few variables (maxArea, minHeight, width, area).
        - No extra data structures (like stacks or arrays) are used.
        - Space Complexity: O(1) (Constant Space).
*/




/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    - { A building can be expended into other building only when other building height >= current building }

    Index :  0  1  2  3  4  5  6

    Input : [6, 2, 5, 4, 5, 1, 6]    ---->>> Building Height

    NSRI :-  1, 5, 3, 5, 5, 7, 7      ---->>> Find Nearest Smaller In Right Index  Assume psudoIndex = arr.length because we assume Last Ground Floor

    NSLI : -1, -1, 1, 1, 3, -1, 5     ---->>> Find Nearest Smaller In Left Index   Assume psudoIndex = -1 because we assume IInitial Ground Floor

    width = rightArr - leftArr - 1 = NSRI - NSLI - 1 

    width[i] = right[i] - left[i];

    width = [1, 5, 1, 3, 1, 7, 1]

    buildingHeight/arr = [6, 2, 5, 4, 5, 1, 6] 
    width = [1, 5, 1, 3, 1, 7, 1]

    Area[i] = arr[i] * width[i];
    Area = [6, 10, 5, 12, 5, 7, 6]

    Find MaxArea = Math.max(Area[i]);

    Output : 12;


    Approach -

    1. Find Nearest Smaller In Left Index
    2. Find Nearest Smaller In Right Index
    3. Find Width = NSRI - NSLI - 1
    4. Calculate Area = arr[i] * width[i];
    5. Find MaxArea = Math.max(Area[i]);

*/


const maximumAreaHistogram = (arr) => {
    let leftResult = [];
    let stack = [];
    let psudoIndex = -1;
    
    const top = (stack) => {
        return stack[stack.length - 1];
    };
    
    /* Find Nearest Smaller In Left Index */
    for (let i = 0; i < arr.length; i++) {
        if (stack.length === 0) {
            leftResult.push(psudoIndex);
        }

        else if (stack.length > 0 && top(stack)[0] < arr[i]) {
            leftResult.push(top(stack)[1]);
        }
        else if (stack.length > 0 && top(stack)[0] >= arr[i]) {
            while (stack.length > 0 && top(stack)[0] >= arr[i]) {
                stack.pop();
            }

            if (stack.length === 0) {
                leftResult.push(psudoIndex);
            } else {
                leftResult.push(top(stack)[1]);
            }
        }
        stack.push([arr[i], i]);
    };
    
    let rightResult = [];
    let stack2 = [];
    let psudoIndex2 = arr.length;
    
    /* Find Nearest Smaller In Right Index */
    for (let i = arr.length - 1; i >= 0; i--) {
        if (stack2.length === 0) {
            rightResult.push(psudoIndex2);
        }

        else if (stack2.length > 0 && top(stack2)[0] < arr[i]) {
            rightResult.push(top(stack2)[1]);
        }

        else if (stack2.length > 0 && top(stack2)[0] >= arr[i]) {
            while (stack2.length > 0 && top(stack2)[0] >= arr[i]) {
                stack2.pop();
            }

            if (stack2.length === 0) {
                rightResult.push(psudoIndex2);
            } else {
                rightResult.push(top(stack2)[1]);
            }
        };
        stack2.push([arr[i], i]);
    }
    rightResult.reverse();
    
    let width = [];
    for (let i = 0; i < arr.length; i++) {
        width.push(rightResult[i] - leftResult[i] - 1);
    }
    
    let area = [];
    for (let i = 0; i < arr.length; i++) {
        area.push(arr[i] * width[i]);
    }
    
    return Math.max(...area);
};
console.log(maximumAreaHistogram([6, 2, 5, 4, 5, 1, 6])); // output: 12


/*
    Time Complexity = O(n)
    Space Complexity = O(n)
*/




/*<------------------------------------------------ Another Approach ----------------------------------------------->*/

const maxHistogramArea = (heights) => {  
    let stack = [];  
    let maxArea = 0;  
    let index = 0;  

    while (index < heights.length) {  
        /* If this bar is higher than the bar at stack top, push it to the stack */
        if (stack.length === 0 || heights[stack[stack.length - 1]] <= heights[index]) {  
            stack.push(index++);  
        } else {  
            /* Pop the top */ 
            let top = stack.pop();  

            /* Calculate the area with heights[top] as the smallest (or minimum height) bar 'h' */
            let area = heights[top] * (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);  

            /* Update max area, if needed */
            maxArea = Math.max(maxArea, area);  
        }  
    }  

    /* Now, pop the remaining bars from stack and calculate area with every popped bar */ 
    while (stack.length > 0) {  
        let top = stack.pop();  
        let area = heights[top] * (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);  
        maxArea = Math.max(maxArea, area);  
    }  

    return maxArea;  
}
console.log(maxHistogramArea([6, 2, 5, 4, 5, 1, 6])); // Output: 12
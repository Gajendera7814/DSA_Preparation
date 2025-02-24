/*
    Rotate Matrix OR Image by 90 Degrees    Leetcode Problem
    <----------------------------------->   <--------------->

    Given a matrix, your task is to rotate the matrix 90 degrees clockwise.

    Example 1:

        Input:
        [
            [1,     2,      3],
            [4,     5,      6],
            [7,     8,      9]
        ]

        Output:
        [   
            [7,     4,      1],
            [8,     5,      2],
            [9,     6,      3]
        ]

        Explanation: Rotate the matrix simply by 90 degree clockwise and return the matrix.


    Example 2:
        Input:
        [
            [5,     1,      9,      11],
            [2,     4,      8,      10],
            [13,    3,      6,       7],
            [15,    14,     12,     16]
        ]

        Output:
        [
            [15,    13,     2,      5],
            [14,    3,      4,      1],
            [12,    6,      8,      9],
            [16,    7,      10,     11]
        ]

        Explanation: Rotate the matrix simply by 90 degree clockwise and return the matrix
*/


/*<---------------------------------------------- Brute Force Approach ----------------------------------------------->*/

/*
    Approach: Take another dummy matrix of n * n, and then take the first row of the matrix and put it in the last column 
    of the dummy matrix, take the second row of the matrix, and put it in the second last column of the matrix and so.

    Explanation :-
    - The first row [1, 2, 3] becomes the last column [1, 2, 3].
    - The second row [4, 5, 6] becomes the middle column [4, 5, 6].
    - The third row [7, 8, 9] becomes the first column [7, 8, 9].


*/

/*
    Ddry Run -
        
    Input:
    [
        [1,     2,      3],
        [4,     5,      6],
        [7,     8,      9]
    ]

    Step 1: Initialize an Empty ans Matrix
    
        - We create an empty matrix of the same size filled with 0s:

                [
                    [1,     2,      3],
        ans =       [4,     5,      6],
                    [7,     8,      9]
                ]

    Step 2: Iterate Through matrix and Fill ans -

        | i | j |  matrix[i][j] |   Target Position in ans (ans[j][n-1-i])  |       Updated ans Matrix          |
        |---|---|---------------|-------------------------------------------|-----------------------------------|
        | 0 | 0 |       1       |               ans[0][2] = 1               | [[0, 0, 1], [0, 0, 0], [0, 0, 0]] |
        | 0 | 1 |       2       |               ans[1][2] = 2               | [[0, 0, 1], [0, 0, 2], [0, 0, 0]] |
        | 0 | 2 |       3       |               ans[2][2] = 3               | [[0, 0, 1], [0, 0, 2], [0, 0, 3]] |
        | 1 | 0 |       4       |               ans[0][1] = 4               | [[0, 4, 1], [0, 0, 2], [0, 0, 3]] |
        | 1 | 1 |       5       |               ans[1][1] = 5               | [[0, 4, 1], [0, 5, 2], [0, 0, 3]] |
        | 1 | 2 |       6       |               ans[2][1] = 6               | [[0, 4, 1], [0, 5, 2], [0, 6, 3]] |
        | 2 | 0 |       7       |               ans[0][0] = 7               | [[7, 4, 1], [0, 5, 2], [0, 6, 3]] |
        | 2 | 1 |       8       |               ans[1][0] = 8               | [[7, 4, 1], [8, 5, 2], [0, 6, 3]] |
        | 2 | 2 |       9       |               ans[2][0] = 9               | [[7, 4, 1], [8, 5, 2], [9, 6, 3]] |

        Final Output -

        [   
            [7,     4,      1],
            [8,     5,      2],
            [9,     6,      3]
        ]
*/

const rotateMatrix = (matrix) => {
    const n = matrix.length;
    let ans = new Array(n).fill(null).map(() => new Array(n).fill(0)); 

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            ans[j][(n - 1) - i] = matrix[i][j];
        }
    }
    
    return ans;
};
console.log(rotateMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // Output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]

/*
    Time Complexity: O(n2)
    Space Complexity: O(n2)
*/
/*
    Set Matrix Zeroes    Leetcode Problem
    <--------------->    <--------------->

    Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

    Input: matrix = 
        [ 
            [1, 1, 1], 
            [1, 0, 1], 
            [1, 1, 1] 
        ]

    Output: 
        [ 
            [1, 0, 1], 
            [0, 0, 0], 
            [1, 0, 1] 
        ]
    
    Explanation: Since matrix[2][2] = 0.Therfore the 2nd column and 2nd row wil be set to 0.


    Input: matrix = 
        [ 
            [0, 1, 2, 0], 
            [3, 4, 5, 2],
            [1, 3, 1, 5]
        ]

    Output: 
        [
            [0, 0, 0, 0],
            [0, 4, 5, 0],
            [0, 3, 1, 0]
        ]

    Explanation: Since matrix[0][0] = 0 and matrix[0][3] = 0. Therefore 1st row, 1st column and 4th column will be set to 0
*/


/*<------------------------------------ Using an Auxiliary Array (Extra Space) --------------------------------------->*/

/*
    Approach: Use two arrays (rowSet and colSet) to track which rows and columns should be zeroed.

    Steps:
        - Traverse the matrix to find the positions of zeros.
        - Mark the corresponding rows and columns in rowSet and colSet.
        - Traverse the matrix again and set the elements to zero if their row or column is marked.
*/

/*
    Explanation of the Algorithm -

    1. Initialization:
        - Determine the number of rows (rows) and columns (cols).
        - Create two boolean arrays: rowSet (to track rows that should be zeroed) and colSet (to track columns that 
          should be zeroed). Both arrays are initially set to false.

    2. Step 1: Identify Zero Locations
        - Iterate through each cell of the matrix.
        - If a cell contains 0, mark its row index in rowSet and its column index in colSet.

    3. Step 2: Set Rows and Columns to Zero
        - Iterate through the matrix again.
        - If a row is marked in rowSet or a column is marked in colSet, set the corresponding cell to 0.


    Input: matrix = 
        [ 
            [1, 1, 1], 
            [1, 0, 1], 
            [1, 1, 1] 
        ]

    Step 1: Identify Zero Locations

        - Traverse the matrix and mark the rows and columns where 0 is found.

        |   i\j   |   0    |   1    |    2   |  rowSet  |  
        |---------|--------|--------|--------|----------|  
        |    0    |   1    |   1    |   1    | false    |  
        |    1    |   1    |   0    |   1    | true     |  
        |    2    |   1    |   1    |   1    | false    |  

        |    j   |  colSet  |  
        |--------|----------|  
        |    0   | false    |  
        |    1   | true     |  
        |    2   | false    |  

        After this step:
        - rowSet = [false, true, false]
        - colSet = [false, true, false]


    Step 2: Modify the Matrix

        - Set matrix elements to 0 wherever rowSet[i] or colSet[j] is true.

        |   i\j   |   0   |   1    |    2   |  
        |---------|-------|--------|--------|  
        |    0    |  1    |   0    |   1    |  
        |    1    |  0    |   0    |   0    |  
        |    2    |  1    |   0    |   1    |  

    Final Output -
        [
            [1,  0,  1]
            [0,  0,  0]
            [1,  0,  1]
        ]
*/

const setZeroes = (matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rowSet = new Array(rows).fill(false);
    const colSet = new Array(cols).fill(false);

    /*<------- Step 1: Record rows and columns to be zeroed -------->*/
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                rowSet[i] = true;
                colSet[j] = true;
            }
        }
    };

    /*<----------- Step 2: Set matrix elements to zero ------------->*/
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (rowSet[i] || colSet[j]) {
                matrix[i][j] = 0;
            }
        }
    };

    return matrix;
};
console.log(setZeroes([ [1, 1, 1], [1, 0, 1], [1, 1, 1] ])); // Output: [ [1, 0, 1], [0, 0, 0], [1, 0, 1]]

/*
    Time Complexity: O(m × n), where m is the number of rows and n is the number of columns.
    Space Complexity: O(m + n), due to the auxiliary arrays.
*/




/*<---------------------------------------------- Using a Hash Table ------------------------------------------------>*/

/*
    Approach: Use two hash tables (or JavaScript objects) to store rows and columns that should be zeroed.
    
    Steps:
        - Use the first traversal to record rows and columns in hash tables.
        - Use the second traversal to modify the matrix.
*/

const setZeroesUsingHash = (matrix) => {
    const rows = new Set();
    const cols = new Set();

    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    /*<----------- Step 1: Store rows and columns with zeros ------------>*/
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (matrix[i][j] === 0) {
                rows.add(i);
                cols.add(j);
            }
        }
    };

    /*<--------------- Step 2: Zero out rows and columns ---------------->*/
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (rows.has(i) || cols.has(j)) {
                matrix[i][j] = 0;
            }
        }
    };

    return matrix;
};
console.log(setZeroesUsingHash([ [0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5] ])); 

// Output: [ [0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0] ]


/*
    Time Complexity: O(m × n), where m is the number of rows and n is the number of columns.
    Space Complexity: O(m + n), due to the auxiliary arrays.
*/

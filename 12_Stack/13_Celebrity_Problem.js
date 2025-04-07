
/*
    Celebrity Problem
    <---------------->

    A celebrity is a person who is known to everyone in a party, but he does not knows anyone over there.

    Given a square matrix M[][] of size N X N, such that M[i][j] = 1 means ith person knows jth person, the task is to find 
    the celebrity. A celebrity is a person who is known to all but does not know anyone. Return the index of the celebrity, 
    if there is no celebrity return -1.

    Note: Follow 0 based indexing and M[i][i] will always be 0.

    matrix = [
        [0, 1, 1, 1],  // Person 0 knows 1, 2, 3
        [0, 0, 1, 1],  // Person 1 knows 2, 3
        [0, 0, 0, 1],  // Person 2 knows 3
        [0, 0, 0, 0]   // Person 3 knows no one
    ];

    Output: 3

*/


/*<-------------------------------------------------- Brute Force -------------------------------------------------->*/

const CelebrityProblem = (matrix) => {
    const n = matrix.length;
    
    const knowMe = new Array(n).fill(0); /* Initialize knowMe array. */
    const iKnow = new Array(n).fill(0);  /* Initialize iKnow array. */
    
    /* Populate the knowMe and iKnow arrays based on the matrix. */
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                knowMe[j]++;   /* Person j is known by i. */
                iKnow[i]++;    /* Person i knows j. */
            }
        }
    };
    
    /* Check for celebrity */
    for (let i = 0; i < n; i++) {
        if (knowMe[i] === n - 1 && iKnow[i] === 0) {
            return i;  /* Person i is the celebrity. */
        }
    };
    
    return -1;  /* No celebrity found. */
};

const matrix1 = [
  [0, 1, 1, 1],  // Person 0 knows 1, 2, 3
  [0, 0, 1, 1],  // Person 1 knows 2, 3
  [0, 0, 0, 1],  // Person 2 knows 3
  [0, 0, 0, 0]   // Person 3 knows no one
];
console.log(CelebrityProblem(matrix1)); // Output: 3


/*
    Time Complexity: O(n²)
    Space Complexity: O(n)
*/




/*<-------------------------------------------------- Using Stack -------------------------------------------------->*/

/*
    - top starts at 0, down starts at 3.

    Input :-

    [      0  1  2  3
        0 [0, 1, 1, 1],
        1 [0, 0, 1, 1],
        2 [0, 0, 0, 1],
        3 [0, 0, 0, 0]
    ];

    - In the first iteration, matrix[0][3] === 1, so top++ (person 0 knows person 3, so person 0 can't be a celebrity).
    - In the second iteration, matrix[1][3] === 1, so top++ (person 1 knows person 3, so person 1 can't be a celebrity).
    - In the third iteration, matrix[2][3] === 1, so top++ (person 2 knows person 3, so person 2 can't be a celebrity).

    Now, top === 3, so person 3 is the only remaining candidate for the celebrity.
    
*/

const CelebrityProblemStack = (matrix) => {
    const n = matrix.length;
    let top = 0, down = n - 1;

    /* Find potential celebrity by narrowing down with two pointers. */
    while (top < down) {
        if (matrix[top][down] === 1) {
            /* If top knows down, top cannot be a celebrity, so move top down. */
            top++;
        } else if (matrix[down][top] === 1) {
            /* If down knows top, down cannot be a celebrity, so move down up. */
            down--;
        } else {
            /* Both don't know each other, move both pointers. */
            top--;
            down--;
        }
    };

    /* After narrowing, top should be the potential celebrity */
    if (top > down) return -1;  // No valid celebrity

    /* Validate the potential celebrity. */
    for (let i = 0; i < n; i++) {
        if (i === top) continue;  // Skip the diagonal check
        /* Check if the potential celebrity knows someone or is not known by everyone. */
        if (matrix[top][i] === 1 || matrix[i][top] === 0) {
            return -1;  // Invalid celebrity
        }
    }

    /* If the loop passes, top is the celebrity. */
    return top;
};

const matrix = [
  [0, 1, 1, 1],  // Person 0 knows 1, 2, 3
  [0, 0, 1, 1],  // Person 1 knows 2, 3
  [0, 0, 0, 1],  // Person 2 knows 3
  [0, 0, 0, 0]   // Person 3 knows no one
];

console.log(CelebrityProblemStack(matrix));  // Output: 3


/*
    Time Complexity: O(2n)
    Space Complexity: O(1)
*/
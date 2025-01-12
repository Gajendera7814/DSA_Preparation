/*
    Maze Path Problem
    <---------------->

    Problem Statement:- Given a maze represented as a grid, to find all possible paths from the top-left corner 
    starting at (0, 0) to the bottom-right corner (endRow, endCol). 
    
    The movements allowed in the maze are:

    1. Horizontal (H): Move one step to the right.
    2. Vertical (V): Move one step down.
    3. Diagonal (D): Move one step diagonally (right and down simultaneously).

    The goal is to print all possible paths to reach the target cell (endRow, endCol) from (currentRow, currentCol). 
    Each path is represented as a string where:
    
    - "H" represents a horizontal move,
    - "V" represents a vertical move, and
    - "D" represents a diagonal move.
*/

/*
    Function to explore all possible paths in a maze from the current position to the target position.
    Parameters:
    - currentRow, currentCol: Represent the current position in the maze.
    - endRow, endCol: Represent the target position in the maze.
    - ans: Accumulates the path taken so far, initially an empty string.
*/

const mazePath = (currentRow, currentCol, endRow, endCol, ans = "") => {
    /* Base case: If the current position matches the target position, print the path and return.*/
    if (currentRow === endRow && currentCol === endCol) {
        console.log(ans);
        return;
    }

    /* Boundary condition: Stop further exploration if the current position exceeds the target bounds.*/
    if (currentRow > endRow || currentCol > endCol) return;

    /* Recursive case: Explore the three possible moves: 1. Horizontal move: Move one step to the right.*/
    mazePath(currentRow, currentCol + 1, endRow, endCol, ans + "H");

    /* 2. Vertical move: Move one step down.*/
    mazePath(currentRow + 1, currentCol, endRow, endCol, ans + "V");

    /* 3. Diagonal move: Move one step diagonally (right and down).*/
    mazePath(currentRow + 1, currentCol + 1, endRow, endCol, ans + "D");
};
mazePath(0, 0, 2, 2);

/*
    Output -

    HHVV
    HVHV
    HVVH
    HVD 
    HDV 
    VHHV
    VHVH
    VHD 
    VVHH
    VDH
    DHV
    DVH
    DD
*/

/*
    Recursive tree structure considering moves Horizontal (H), and Vertical (V).
    <-------------------------------------------------------------------------->

    (0,0) ""
    ├── H -> (0,1) "H"
    │   ├── H -> (0,2) "HH"
    │   │   ├── H -> Out of bounds
    │   │   ├── V -> (1,2) "HHV"
    │   │   │   ├── H -> Out of bounds
    │   │   │   ├── V -> (2,2) "HHVV" [PATH FOUND]
    │   │   │   └── Out of bounds
    │   │   └── Out of bounds
    │   ├── V -> (1,1) "HV"
    │   │   ├── H -> (1,2) "HVH"
    │   │   │   ├── H -> Out of bounds
    │   │   │   ├── V -> (2,2) "HVHV" [PATH FOUND]
    │   │   │   └── Out of bounds
    │   │   ├── V -> (2,1) "HVV"
    │   │   │   ├── H -> (2,2) "HVVH" [PATH FOUND]
    │   │   │   ├── V -> Out of bounds
    │   │   │   └── Out of bounds
    │   │   └── Out of bounds
    │   └── Out of bounds
    ├── V -> (1,0) "V"
    │   ├── H -> (1,1) "VH"
    │   │   ├── H -> (1,2) "VHH"
    │   │   │   ├── H -> Out of bounds
    │   │   │   ├── V -> (2,2) "VHHV" [PATH FOUND]
    │   │   │   └── Out of bounds
    │   │   ├── V -> (2,1) "VHV"
    │   │   │   ├── H -> (2,2) "VHVH" [PATH FOUND]
    │   │   │   ├── V -> Out of bounds
    │   │   │   └── Out of bounds
    │   │   └── Out of bounds
    │   ├── V -> (2,0) "VV"
    │   │   ├── H -> (2,1) "VVH"
    │   │   │   ├── H -> (2,2) "VVHH" [PATH FOUND]
    │   │   │   ├── V -> Out of bounds
    │   │   │   └── Out of bounds
    │   │   ├── V -> Out of bounds
    │   │   └── Out of bounds
    │   └── Out of bounds
    └── Out of bounds

*/

/*
    Recursive tree structure considering moves Horizontal (H), Vertical (V), and Diagonal (D).
    <---------------------------------------------------------------------------------------->

    (0,0) ""
    ├── H -> (0,1) "H"
    │   ├── H -> (0,2) "HH"
    │   │   ├── H -> Out of bounds
    │   │   ├── V -> (1,2) "HHV"
    │   │   │   ├── H -> Out of bounds
    │   │   │   ├── V -> (2,2) "HHVV" [PATH FOUND]
    │   │   │   └── D -> Out of bounds
    │   │   └── D -> Out of bounds
    │   ├── V -> (1,1) "HV"
    │   │   ├── H -> (1,2) "HVH"
    │   │   │   ├── H -> Out of bounds
    │   │   │   ├── V -> (2,2) "HVHV" [PATH FOUND]
    │   │   │   └── D -> Out of bounds
    │   │   ├── V -> (2,1) "HVV"
    │   │   │   ├── H -> (2,2) "HVVH" [PATH FOUND]
    │   │   │   ├── V -> Out of bounds
    │   │   │   └── D -> Out of bounds
    │   │   └── D -> (2,2) "HVD" [PATH FOUND]
    │   └── D -> (1,2) "HD"
    │       ├── H -> Out of bounds
    │       ├── V -> (2,2) "HDV" [PATH FOUND]
    │       └── D -> Out of bounds
    ├── V -> (1,0) "V"
    │   ├── H -> (1,1) "VH"
    │   │   ├── H -> (1,2) "VHH"
    │   │   │   ├── H -> Out of bounds
    │   │   │   ├── V -> (2,2) "VHHV" [PATH FOUND]
    │   │   │   └── D -> Out of bounds
    │   │   ├── V -> (2,1) "VHV"
    │   │   │   ├── H -> (2,2) "VHVH" [PATH FOUND]
    │   │   │   ├── V -> Out of bounds
    │   │   │   └── D -> Out of bounds
    │   │   └── D -> (2,2) "VHD" [PATH FOUND]
    │   ├── V -> (2,0) "VV"
    │   │   ├── H -> (2,1) "VVH"
    │   │   │   ├── H -> (2,2) "VVHH" [PATH FOUND]
    │   │   │   ├── V -> Out of bounds
    │   │   │   └── D -> Out of bounds
    │   │   ├── V -> Out of bounds
    │   │   └── D -> Out of bounds
    │   └── D -> (2,1) "VD"
    │       ├── H -> (2,2) "VDH" [PATH FOUND]
    │       ├── V -> Out of bounds
    │       └── D -> Out of bounds
    └── D -> (1,1) "D"
        ├── H -> (1,2) "DH"
        │   ├── H -> Out of bounds
        │   ├── V -> (2,2) "DHV" [PATH FOUND]
        │   └── D -> Out of bounds
        ├── V -> (2,1) "DV"
        │   ├── H -> (2,2) "DVH" [PATH FOUND]
        │   ├── V -> Out of bounds
        │   └── D -> Out of bounds
        └── D -> (2,2) "DD" [PATH FOUND]

*/

/*
    Time Complexity:

    - The function mazePath explores all possible paths to reach the target position (endRow, endCol) from (currentRow, currentCol). 
      Each step in the maze allows three possible moves: Horizontal (H), Vertical (V), and Diagonal (D). 

    - For an n x n grid (where endRow = endCol = n), the number of recursive calls can be estimated using the branching factor of 3 
      at each step.

    - The total number of paths corresponds to a sum of combinations of moves taken in each direction. While it is difficult to 
      compute precisely for all grids, the total number of recursive calls grows exponentially with n.

    Thus, the time complexity is approximately O(3^(n + m)), where n is endRow and m is endCol.

    Space Complexity:

    - Recursive Call Stack: The maximum depth of the recursion is determined by the longest path in the maze. For an n x n grid, 
      this is at most n + m (diagonal, horizontal, and vertical moves combined).

    - This leads to a space complexity of O(n + m) for the stack.

    - Auxiliary Space: The string ans is appended at each step. In the worst case, it will have a length of n + m, but since it 
      is not reused after the recursive call returns, it does not add to the space complexity.

    Thus, the overall space complexity is O(n + m).
*/
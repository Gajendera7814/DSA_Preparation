
/*
    Blocked Maze
    <----------->

    You are given a 2D grid representing a maze. Each cell in the grid can either be open (0) or blocked (1). 
    Starting from the top-left corner of the maze (0, 0), your task is to find all possible paths to the bottom-right 
    corner (grid.length - 1, grid[0].length - 1).

    - You can move in four directions: up (T), down (D), left (L), and right (R).
    - You cannot move out of the boundaries or into blocked cells.
    - Ensure that you do not revisit any cell in the current path.
*/

const BlockedMaze = (grid, row, col, ans, visited) => {
    /* Positive Base case - To reach (3, 3) or the bottom-right cell */
    if (row === grid.length - 1 && col === grid[0].length - 1) {
        console.log(ans);
        return;
    }

    /* Negative Base Case - To restrict moving out of bounds or into blocked/visited cells */
    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || visited[row][col] || grid[row][col] === 1) {
        return;
    }

    /* Mark the current cell as visited */
    visited[row][col] = true;

    /* Explore all possible directions- */
    BlockedMaze(grid, row - 1, col, ans + "T", visited); /* UP */
    BlockedMaze(grid, row + 1, col, ans + "D", visited); /* Down */
    BlockedMaze(grid, row, col - 1, ans + "L", visited); /* Left */
    BlockedMaze(grid, row, col + 1, ans + "R", visited); /* Right */

    /* Backtrack by marking the current cell as unvisited */
    visited[row][col] = false;
};

const grid = [ 
    [0, 1, 0, 0], 
    [0, 0, 0, 0], 
    [0, 1, 0, 0], 
    [0, 1, 1, 0] 
];

/* Initialize a visited grid of the same size as the input grid */
const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));

/* Call the function */
BlockedMaze(grid, 0, 0, "", visited);

/*  Output :-

    "DRRTRDDD"
    "DRRDRD"
    "DRRRDD"
*/





/*<--------------------------------------------------------------------------------------------------------------------->*/

/*
    Blocked Maze
    <----------->

    Output: [ 'DRRTRDDD', 'DRRDRD', 'DRRRDD' ]
*/

const blockedMaze = (grids, row, col, ans, visiteds, paths) => {
    /* Positive Base case - To reach (3, 3) or the bottom-right cell */
    if (row === grid.length - 1 && col === grid[0].length - 1) {
        paths.push(ans);
        return;
    }

    /* Negative Base Case - To restrict moving out of bounds or into blocked/visiteds cells */
    if (
        row < 0 ||
        col < 0 ||
        row >= grids.length ||
        col >= grids[0].length ||
        visiteds[row][col] ||
        grids[row][col] === 1
    ) {
        return;
    }

    /* Mark the current cell as visiteds */
    visiteds[row][col] = true;

    /* Explore all possible directions */
    blockedMaze(grids, row - 1, col, ans + "T", visiteds, paths); /* UP */
    blockedMaze(grids, row + 1, col, ans + "D", visiteds, paths); /* Down */
    blockedMaze(grids, row, col - 1, ans + "L", visiteds, paths); /* Left */
    blockedMaze(grids, row, col + 1, ans + "R", visiteds, paths); /* Right */

    /* Backtrack by marking the current cell as unvisiteds */
    visiteds[row][col] = false;
};

const grids = [
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0]
];

/* Initialize a visited grid of the same size as the input grid */
const visiteds = Array.from({ length: grids.length }, () => Array(grids[0].length).fill(false));

/* Initialize an array to store all paths */
const paths = [];

/* Call the function */
blockedMaze(grids, 0, 0, "", visiteds, paths);

/* Log the resulting paths */
console.log(paths); 

/* Output: [ 'DRRTRDDD', 'DRRDRD', 'DRRRDD' ] */



/*
    Recursive tree structure
    <------------------------>

    Valid Paths Found:
    Based on the recursive tree and the grid layout, the following paths lead from (0,0) to (3,3):

    1.  Path 1: "DRRTRDDD"
        Down → Right → Right → Down → Right → Down → Down → Down.

    2.  Path 2: "DRRDRD"
        Down → Right → Right → Down → Right → Down.

    3.  Path 3: "DRRRDD"
        Down → Right → Right → Right → Down → Down.

    (0,0) ""
    ├── R -> (0,1) "R"
    │   ├── R -> (0,2) "RR"
    │   │   ├── R -> (0,3) "RRR"
    │   │   │   ├── R -> Out of bounds
    │   │   │   ├── D -> (1,3) "RRRD"
    │   │   │   │   ├── R -> Out of bounds
    │   │   │   │   ├── D -> (2,3) "RRRDD"
    │   │   │   │   │   ├── R -> Out of bounds
    │   │   │   │   │   ├── D -> (3,3) "RRRDDD" [PATH FOUND]
    │   │   │   │   │   ├── L -> Out of bounds
    │   │   │   │   │   └── U -> Out of bounds
    │   │   │   │   ├── L -> Out of bounds
    │   │   │   │   └── U -> Out of bounds
    │   │   │   ├── L -> Out of bounds
    │   │   │   └── U -> Out of bounds
    │   │   ├── D -> (1,2) "RRD"
    │   │   │   ├── R -> (1,3) "RRDR"
    │   │   │   │   ├── Already visited or Out of bounds
    │   │   │   ├── D -> (2,2) "RRDD"
    │   │   │   │   ├── R -> (2,3) "RRDDR"
    │   │   │   │   │   ├── D -> (3,3) "RRDRDD" [PATH FOUND]
    │   │   │   │   └── Other directions Out of bounds
    │   │   │   ├── Other directions Out of bounds
    │   │   └── Other directions Out of bounds
    │   └── Other directions Out of bounds
    ├── D -> (1,0) "D"
    │   ├── R -> (1,1) "DR"
    │   │   ├── R -> (1,2) "DRR"
    │   │   │   ├── R -> (1,3) "DRRR"
    │   │   │   │   ├── D -> (2,3) "DRRRD"
    │   │   │   │   │   ├── D -> (3,3) "DRRRDD" [PATH FOUND]
    │   │   │   ├── D -> (2,2) "DRRD"
    │   │   │   │   ├── R -> (2,3) "DRRDR"
    │   │   │   │   │   ├── D -> (3,3) "DRRDRD" [PATH FOUND]
    │   │   ├── D -> (2,1) "DRD"
    │   │   │   ├── R -> (2,2) "DRDR"
    │   │   │   │   ├── R -> (2,3) "DRDRR"
    │   │   │   │   │   ├── D -> (3,3) "DRDRRD" [PATH FOUND]
    │   │   │   ├── Other directions Out of bounds
    │   │   └── Other directions Out of bounds
    │   ├── D -> (2,0) "DD"
    │   │   ├── R -> (2,1) "DDR"
    │   │   │   ├── R -> (2,2) "DDRR"
    │   │   │   │   ├── R -> (2,3) "DDRRR"
    │   │   │   │   │   ├── D -> (3,3) "DDRRRD" [PATH FOUND]
    │   │   │   ├── Other directions Out of bounds
    │   │   └── Other directions Out of bounds
    │   ├── Other directions Out of bounds
    │   └── Out of bounds
    └── Other directions Out of bounds

*/
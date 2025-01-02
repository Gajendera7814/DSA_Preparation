/*
    Tower of Hanoi
    <------------>

    Tower of Hanoi is a mathematical puzzle where we have three rods (A, B, and C) and N disks. 
    Initially, all the disks are stacked in decreasing value of diameter i.e. the smallest disk is placed on the top and they are on rod A. 
    
    The objective of the puzzle is to move the entire stack to another rod.
    
    The following simple rules: 
        - Only one disk can be moved at a time.
        - Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack 
          i.e. a disk can only be moved if it is the uppermost disk on a stack.
        - No disk may be placed on top of a smaller disk.

    Input: 2,
    Output:
        Move 1 disk from S to H
        Move 2 disk from S to D
        Move 1 disk from H to D

    Input: 3
    Output: 
        Move 1 disk from S to D
        Move 2 disk from S to H
        Move 1 disk from D to H
        Move 3 disk from S to D
        Move 1 disk from H to S
        Move 2 disk from H to D
        Move 1 disk from S to D

    Note - Source, Destination, Helper

    - Move from Source to Destination with the help of Helper.
    - Bigger Problem - 3 disks move from S --> D (By using Helper)
    - Smaller Problem - 2 disks move from S --> H (By using Destination)
    - Print 3rd disk from s --> D

    Now 

    - 2 disks move from H --> D using S
*/

const TOH = (n, src, dst, helper) => {
    if (n === 0) return;
    TOH(n - 1, src, helper, dst);
    console.log("Move " + n + " disk from " + src + " to " + dst);
    TOH(n - 1, helper, dst, src);
};
TOH(3, "S", "D", "H");

/*
    Here 2 recursive calls occur, the structure forms like a tree (also known as Recursion Tree).

    here n --> 3, S --> src, H --> helper, D --> dst

    TOH(3, S, D, H)
    ├── TOH(2, S, H, D)
    │   ├── TOH(1, S, D, H)
    │   │   ├── TOH(0, S, H, D) --> RETURN (n = 0)
    │   │   └── Move Disk 1 from S to D
    │   │   └── TOH(0, H, D, S) --> RETURN (n = 0)
    │   ├── Move Disk 2 from S to H
    │   └── TOH(1, D, H, S)
    │       ├── TOH(0, D, S, H) --> RETURN (n = 0)
    │       └── Move Disk 1 from D to H
    │       └── TOH(0, S, H, D) --> RETURN (n = 0)
    ├── Move Disk 3 from S to D
    └── TOH(2, H, D, S)
        ├── TOH(1, H, S, D)
        │   ├── TOH(0, H, D, S) --> RETURN (n = 0)
        │   └── Move Disk 1 from H to S
        │   └── TOH(0, S, D, H) --> RETURN (n = 0)
        ├── Move Disk 2 from H to D
        └── TOH(1, S, D, H)
            ├── TOH(0, S, H, D) --> RETURN (n = 0)
            └── Move Disk 1 from S to D
            └── TOH(0, H, D, S) --> RETURN (n = 0)
    
*/

/*
    Time Complexity - 

    1. Recursive Calls:
        - For n = 3:
            - The function calls itself twice for n - 1, making 2 x TOH(n-1) calls.
            - Each recursive step involves one additional operation (the console.log statement).

    2. Recurrence Relation:
        - The number of operations for n disks is given by:
            T(n) = 2T(n-1) + 1;
        - Here, T(n-1) represents the time for the two smaller sub-problems.
        - The "+1" accounts for the operation to move the largest disk.

    3. Solution:
        - Solving the recurrence relation:
            T(n) = 2^n - 1
        - The time complexity is O(2^n), which is exponential.


    Space Complexity -

    1. Call Stack:
        - Each recursive call adds a frame to the call stack.
        - The maximum depth of the recursion is n because the function keeps calling itself with n - 1 until n = 0.

    2. Auxiliary Space:
        - Apart from the recursive calls, no additional data structures are used, so the auxiliary space is negligible.

    3. Total Space Complexity:
        - The space complexity is O(n) due to the recursive call stack.


    Time Complexity: O(2^n)  
    Space Complexity: O(n), This reflects the maximum depth of the recursion stack.
*/
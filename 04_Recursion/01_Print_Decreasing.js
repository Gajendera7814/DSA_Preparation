/*
    Recursion occurs when a function calls itself repeatedly until a specific condition is met. 

    Key points about recursion:
    - The same function is invoked on a smaller subset of the problem.
    
    Consider the following steps in a recursive approach:
    1. Start with the bigger problem.
    2. Break it down into a smaller problem.
    3. Perform a task in such a way that the result of the smaller problem contributes to solving the larger problem 
    (self-contained work).

    Important Key Points -
    
    - When there is 1 recursive call, a linear stack is formed, building up from the bottom to the top, and then it is removed 
      in a linear fashion from top to bottom (LIFO).
    
    - when 2 or more recursive calls occur, the structure forms like a tree (also known as Recursion Tree), with each recursive 
      call branching out into further calls.
*/

/*<--------------------------------------------- Print Decreasing -------------------------------------------------------------->*/

const PD = (n) => {
    if(n <= 0) return;

    console.log(n);
    PD(n - 1);
};
PD(4);

/*
    Output -
    4
    3
    2
    1
*/

/*
    Call Stack -

    Initial State -
    +----------------------+
    | Step 6:              |
    |    if(n <= 0);       |  --> Current (Base case)
    |    return;           |
    +----------------------+
    | Step 5:              |
    |    n = 1;            |
    |    console.log(1);   |
    |    PD(0);            |
    +----------------------+
    | Step 4:              |
    |    n = 2;            |
    |    console.log(2);   |
    |    PD(1);            |
    +----------------------+
    | Step 3:              |
    |    n = 3;            |
    |    console.log(3);   |
    |    PD(2);            |
    +----------------------+
    | Step 2:              |
    |    n = 4;            |
    |    console.log(4);   |
    |    PD(3);            |
    +----------------------+
    | Step 1: PD(4)        |  --> Initial function call frame.
    +----------------------+

*/

/*
    Time Complexity:
        1. The function PD(n) calls itself recursively with a decremented value of n until n becomes less than or equal to 0.
        2. Each recursive call involves:
        - A constant time operation console.log(n) --> (O(1)).
        - A recursive call, which decreases n by 1.

        Thus, the function will make n recursive calls before reaching the base case. Therefore, 
        
    The time complexity is O(n) because the function makes one call for each integer from n down to 1.

    Space Complexity:
        1. The space complexity is determined by the call stack during the recursive calls.
        2. Each recursive call adds a new frame to the call stack.
        3. Since the recursion depth is n, the space complexity is O(n) because the maximum depth of the call stack will be n
        before it starts returning.


    Time Complexity: O(n)
    Space Complexity: O(n)
*/
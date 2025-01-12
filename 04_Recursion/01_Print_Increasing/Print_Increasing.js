
/*<------------------------------------------- Print Increasing -------------------------------------------------------->*/

const PI = (n) => {
    if(n === 0) return;

    PI(n - 1);
    console.log(n);
};
PI(4);

/*
    Output -
    1
    2
    3
    4
*/

/*
    Call Stack -

    Initial State -
    +----------------------+
    | Step 6:              |
    |    if(n <= 0);       | <- Current (Base case)
    |    return;           |
    +----------------------+
    | Step 5:              |
    |    n = 1;            |
    |    PI(0);            |
    +----------------------+
    | Step 4:              |
    |    n = 2;            |
    |    PI(1);            |
    +----------------------+
    | Step 3:              |
    |    n = 3;            |
    |    PI(2);            |
    +----------------------+
    | Step 2:              |
    |    n = 4;            |
    |    PI(3);            |
    +----------------------+
    | Step 1: PI(4)        | Initial function call frame.
    +----------------------+



    Final State -
    +----------------------+
    | Step 6:              |
    |    if(n <= 0);       | --> Base case reached, return and remove from the call stack.
    |    return;           |
    +----------------------+
    | Step 5:              |
    |    n = 1;            |
    |    PI(0);            |
    |    console.log(1);   | --> Print 1 (then remove it from the call stack)
    +----------------------+
    | Step 4:              |
    |    n = 2;            |
    |    PI(1);            |
    |    console.log(2);   | --> Print 2 (then remove it from the call stack)
    +----------------------+
    |    Step 3:           |
    |    n = 3;            |
    |    PI(2);            |
    |    console.log(3);   | --> Print 3 (then remove it from the call stack)
    +----------------------+
    |    Step 2:           |
    |    n = 4;            |
    |    PI(3);            |
    |    console.log(4);   | --> Print 4 (then remove it from the call stack)
    +----------------------+
    |   Step 1: PI(4)      | Initial function call frame.
    +----------------------+

*/


const PDI = (n) => {
    if(n === 0) return;

    console.log("hello " + n);
    PDI(n - 1);
    console.log("bye", + n);
};
PDI(4);

/*
    hello 4
    hello 3
    hello 2
    hello 1
    bye 1
    bye 2
    bye 3
    bye 4
*/

/*
    Call Stack -

    Initial State -
    +---------------------------------+
    | Step 6:                         |
    |    if(n <= 0);                  | --> Base case reached, return and remove from the call stack.
    |    return;                      |
    +---------------------------------+
    | Step 5:                         |
    |    n = 1;                       |
    |    console.log("hello " + n);   | --> Print hello 1
    |    PDI(0);                      |
    +---------------------------------+
    | Step 4:                         |
    |    n = 2;                       |
    |    console.log("hello " + n);   | --> Print hello 2
    |    PDI(1);                      |
    +---------------------------------+
    | Step 3:                         |
    |    n = 3;                       |
    |    console.log("hello " + n);   | --> Print hello 3
    |    PDI(2);                      |
    +---------------------------------+
    | Step 2:                         |
    |    n = 4;                       |
    |    console.log("hello " + n);   | --> Print hello 4
    |    PDI(3);                      |
    +---------------------------------+
    | Step 1: PDI(4)                  | Initial function call frame.
    +---------------------------------+



    Final State -
    +---------------------------------+
    | Step 6:                         |
    |    if(n <= 0);                  | <- Current (Base case)
    |    return;                      |
    +---------------------------------+
    | Step 5:                         |
    |    n = 1;                       |
    |    console.log("hello " + n);   |
    |    PDI(0);                      |
    |    console.log("bye " + n);     | --> Print bye 1 (then remove it from the call stack)
    +---------------------------------+
    | Step 4:                         |
    |    n = 2;                       |
    |    console.log("hello " + n);   |
    |    PDI(1);                      |
    |    console.log("bye " + n);     | --> Print bye 2 (then remove it from the call stack)
    +---------------------------------+
    | Step 3:                         |
    |    n = 3;                       |
    |    console.log("hello " + n);   |
    |    PDI(2);                      |
    |    console.log("bye " + n);     | --> Print bye 3 (then remove it from the call stack)
    +---------------------------------+
    | Step 2:                         |
    |    n = 4;                       |
    |    console.log("hello " + n);   |
    |    PDI(3);                      |
    |    console.log("bye " + n);     | --> Print bye 4 (then remove it from the call stack)
    +---------------------------------+
    | Step 1: PDI(4)                  | Initial function call frame.
    +---------------------------------+

*/


/*
    Time Complexity:
        1. The function PI(n) calls itself recursively with n - 1 until n reaches 0.
        2. Each recursive call involves:
        - A constant time operation console.log(n) --> (O(1)).
        - A recursive call to PI(n-1).

        Thus, the function will make n recursive calls before reaching the base case, and each call prints n at the end. 
        Therefore, the time complexity is O(n) because the function performs a constant time operation for each recursive call, 
        and there are n calls.

    Space Complexity:
        1. The space complexity is determined by the call stack during the recursive calls.
        2. Each recursive call adds a new frame to the call stack, but the function performs the console.log(n) after the recursive call.
        3. Since the recursion depth is n, the space complexity is O(n), as the maximum depth of the call stack is n before 
        it starts unwinding.

    Time Complexity: O(n) (because we make n recursive calls and each call does a constant time operation)
    Space Complexity: O(n) (because of the depth of the recursion, the call stack grows to a maximum size of n)
*/
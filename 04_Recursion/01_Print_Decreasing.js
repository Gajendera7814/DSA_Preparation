/*
    Recursion occurs when a function calls itself repeatedly until a specific condition is met. 

    Key points about recursion:
    - The same function is invoked on a smaller subset of the problem.
    
    Consider the following steps in a recursive approach:
    1. Start with the bigger problem.
    2. Break it down into a smaller problem.
    3. Perform a task in such a way that the result of the smaller problem contributes to solving the larger problem 
    (self-contained work).
*/

/*<--------------------------------------------- Print Decreasing -------------------------------------------------------------->*/

const PD = (n) => {
    if(n <= 0) return;

    console.log(n);
    PD(n - 1);
};
PD(4);

/*
    Call Stack -

    +----------------------+
    |    Step 6:           |
    |    if(n <= 0);       |<- Current (Base case)
    |    return;           |
    +----------------------+
    |    Step 5:           |
    |    n = 1;            |
    |    console.log(1);   |
    |    PD(0);            |
    +----------------------+
    |    Step 4:           |
    |    n = 2;            |
    |    console.log(2);   |
    |    PD(1);            |
    +----------------------+
    |    Step 3:           |
    |    n = 3;            |
    |    console.log(3);   |
    |    PD(2);            |
    +----------------------+
    |    Step 2:           |
    |    n = 4;            |
    |    console.log(4);   |
    |    PD(3);            |
    +----------------------+
    |   Step 1: PD(4)      |
    +----------------------+

*/
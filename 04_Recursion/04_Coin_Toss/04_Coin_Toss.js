/*
    Coin Toss
    <-------->

    n = 2, Output: HH, HT, TH, TT

    n = 3, Output: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT

    n = 4 total posible case is 2^4 = 16

*/


/*<------------------------------------------------------ Iterative Approach ----------------------------------------------------->*/

/*
    n = 3, 2 ^ 3 = 8 (Possible case) = HHH, HHT, HTH, HTT, THH, THT, TTH, TTT


    Fistly convert in to decimal numbers - 0 denotes head (H) and 1 denotes tail (T)

    Decimal        Binary
    0 -----------> 0 0 0 -----------> HHH
    1 -----------> 0 0 1 -----------> HHT
    2 -----------> 0 1 0 -----------> HTH
    3 -----------> 0 1 1 -----------> HTT
    4 -----------> 1 0 0 -----------> THH
    5 -----------> 1 0 1 -----------> THT
    6 -----------> 1 1 0 -----------> TTH
    7 -----------> 1 1 1 -----------> TTT
*/

const coinToss = (n) => {
    const results = [];
    const totalOutcomes = 2 ** n;

    for (let i = 0; i < totalOutcomes; i++) {
        const binary = i.toString(2).padStart(n, '0');
        const outcome = binary.split('').map(bit => (bit === '0' ? 'H' : 'T')).join('');
        results.push(outcome);
    }

    return results;
};

console.log(coinToss(3)); // Output: [ 'HHH', 'HHT', 'HTH', 'HTT', 'THH', 'THT', 'TTH', 'TTT' ]

/*
    Time Complexity: O(2^n ⋅ n)
    Space Complexity: O(2^n ⋅ n)
*/

/*<-------------------------------------------------------- By Recursively ------------------------------------------------------->*/

const coinTossByRecursion = (n, ans = "") => {
    if (n === 0) {
        console.log(ans);
        return;
    }

    /* Recursive cases: append "H" or "T" and decrement the number of tosses */
    coinTossByRecursion(n - 1, ans + "H");
    coinTossByRecursion(n - 1, ans + "T");
};
coinTossByRecursion(3); // Output: "HHH", "HHT", "HTH", "HTT", "THH", "THT", "TTH", "TTT"

/*
    Time and Space Complexity
    <----------------------->
    
    Time Complexity: 
        - There are 2^𝑛 recursive calls because for each toss, you have two choices (head or tail).
        - Each call does O(1) work (appending to ans and checking the base case).
        
        Total Time Complexity: O(2^n).
    
    Space Complexity:
        - The maximum depth of the recursion tree is n, so the space used by the call stack is O(n).
        - The result strings are printed directly, so no additional space is required for storage.

        Total Space Complexity: O(n).
*/
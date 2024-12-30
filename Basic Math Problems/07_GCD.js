/*
    Greatest common divisior (G.C.D) || Higest common factor (H.C.F)
    <------------------------------>    <-------------------------->

    n1 = 9 (its factor is - 1, 3, 9)
    n2 = 12 (its factor is - 1, 2, 3, 4, 6, 12)

    G.C.D (9, 12) = (1, 3) = 3

    G.C.D (11, 13) = 1
*/

/*<-------------------------------------------- Brute Force Approach ------------------------------------------------>*/

const GCD = (n1, n2) => {
    let gcd = 1;

    for(let i = 1; i <= Math.min(n1, n2); i++){
        if(n1 % i == 0 && n2 % i == 0){
            gcd = i;
        }
    }
    return gcd;
};
console.log(GCD(9, 12)); // Output: 3
console.log(GCD(11, 13)); // Output: 1

/*
    Time Complexity: O(Math.min(n1, n2))

        𝑂(𝑘) where 𝑘 = min(n1, n2)
    ⁡
    Space Complexity: O(1)
*/



/*<---------------------------------------------- Optimized Approach  ----------------------------------------------->*/

const GreatestCommonDivisior = (n1, n2) => {
    for(let i = Math.min(n1, n2); i >= 1; i--){
        if(n1 % i == 0 && n2 % i == 0){
            return i;
        }
    }
};
console.log(GreatestCommonDivisior(20, 40)); // Output: 20
console.log(GreatestCommonDivisior(19, 13)); // Output: 1


/*
    Time Complexity: O(Math.min(n1, n2))

        𝑂(𝑘) where 𝑘 = min(n1, n2)
    ⁡
    Space Complexity: O(1)
*/



/*<---------------------------------------- Using the Euclidean Algorithm  ------------------------------------------>*/

/*
    GCD(n1, n2) = GCD(n1 - n2, n2), where n1 > n2.

    Step - 1

        GCD(20, 15) = GCD(5, 15) again

    Step - 2
        
        GCD(15, 5) = GCD(10, 5) again

    Step - 3

        GCD(10, 5) = GCD(5, 5) again

    Step - 4

        GCD(5, 5) = GCD(0, 5) = 5
*/

const GCDs = (n1, n2) => {
    while (n2 !== 0) {
        let temp = n2;
        n2 = n1 % n2;
        n1 = temp;
    }
    return n1;
};

console.log(GCDs(12, 16)); // Output: 4
console.log(GCDs(17, 19)); // Output: 1

/*
    Time Complexity: O(log(min(n1, n2)))
    Space Complexity: O(1)
*/

/*
    Count Digits
    <----------->

    Input: 156,  Output: 3

    Input: 15678,  Output: 5

    Input: 1562454,  Output: 7
*/

const countDigits = (n) => {
    let count = 0;

    while(n > 0){
        count = count + 1;
        n = Math.floor(n / 10);
    }
    return count
};
console.log(countDigits(15678)); // Output: 5


/*
    The function uses a while loop that runs as long as n is greater than 0. In each iteration, n is divided by 10 
    (n = Math.floor(n / 10)).
    
    The number of iterations is determined by the number of digits in n. In each iteration, the size of n is reduced 
    by a factor of 10.
    
    The loop will run approximately logarithmically with respect to the number n. Specifically, the number of iterations 
    is proportional to the number of digits in n, which is 

    Thus, the time complexity is :- O(log10(n))
*/

/*
    Time Complexity : O(log10(n))
    Space Complexity : O(1)
*/
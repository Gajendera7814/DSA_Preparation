/*
    Square root of a number
    <---------------------->

    Given an integer n, find the square root of n. If n is not a perfect square, then return the floor value.

    Floor value of any number is the greatest Integer which is less than or equal to that number

    Example - 1
    
        Input: n = 5, Output: 2

        Explanation: Since, 5 is not a perfect square, floor of square_root of 5 is 2.

    Example - 2
    
        Input: n = 4, Output: 2

        Explanation: Since, 4 is a perfect square, so its square root is 2.

    Example - 3

        Input: n = 28, Output: 5

        Explanation: Square root of 28 is approximately 5.292. So, the floor value will be 5.
*/


/*<---------------------------------------------- Brute Force Approach ---------------------------------------------->*/

const floorSqrt = (n) => {
    let ans = 0;

    for (let i = 1; i <= n; i++) {
        let val = i * i;
        if (val <= n) {
            ans = i;
        } else {
            break;
        }
    }
    return ans;
};
console.log(floorSqrt(5)); // Output: 2

/*
    Time Complexity: O(N),
    Space Complexity: O(1)
*/


/*<---------------------------------------------- Optimal Approach -------------------------------------------------->*/

const floorSqrtOA = (n) => {
    let ans = Math.floor(Math.sqrt(n));
    return ans;
};
console.log(floorSqrtOA(4)); // Output: 2

/*
    Time Complexity: O(N)
    Space Complexity: O(1)
*/



/*<------------------------------------------ Using Binary Search -------------------------------------------------->*/

/*
    Dry Run: -
    -----------

    Initial Values: start = 1, end = 28

    First iteration :- 

        mid = 1 + Math.floor((28 - 1) / 2) = 14
        val = 14 * 14 = 196, which is greater than 28.
        Update end = 14 - 1 = 13.

    Second Iteration :-

        start = 1, end = 13
        mid = 1 + Math.floor((13 - 1) / 2) = 7
        val = 7 * 7 = 49, which is greater than 28.
        Update end = 7 - 1 = 6.

    Third Iteration :-

        start = 1, end = 6
        mid = 1 + Math.floor((6 - 1) / 2) = 3
        val = 3 * 3 = 9, which is less than 28.
        Update start = 3 + 1 = 4.

    Fourth Iteration :-

        start = 4
        end = 6
        mid = 4 + Math.floor((6 - 4) / 2) = 5
        val = 5 * 5 = 25, which is less than 28.
        Update start = 5 + 1 = 6.

    Fifth Iteration :-

        start = 6
        end = 6
        mid = 6 + Math.floor((6 - 6) / 2) = 6
        val = 6 * 6 = 36, which is greater than 28.
        Update end = 6 - 1 = 5.
    
    Loop Ends :-

        start = 6
        end = 5
        The loop ends as start > end.

    At this point, the largest integer mid whose square is less than or equal to 28 is 5.

    Hence, the function returns start - 1 or end, both of which are 5.
*/

/*
    Input: 28

    | Iteration | start | end | mid  | mid²  |   Comparison mid² vs n   |    Update start / end  |
    |-----------|-------|-----|------|-------|--------------------------|------------------------|
    | 1         | 1     | 28  | 14   |  196  | 196 > 28                 | end = 13               |
    | 2         | 1     | 13  | 7    |  49   | 49 > 28                  | end = 6                |
    | 3         | 1     | 6   | 3    |  9    | 9 ≤ 28                   | start = 4              |
    | 4         | 4     | 6   | 5    |  25   | 25 ≤ 28                  | start = 6              |
    | 5         | 6     | 6   | 6    |  36   | 36 > 28                  | end = 5                |

    After the loop terminates start > end, the function returns end, which is 5.

    Final Output: 5
*/

const floorSqrtBS = (n) => {
    let start = 1;
    let end = n;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        let val = mid * mid;

        if (val <= n) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }
    return end; // OR start - 1
};
console.log(floorSqrtBS(28)); // Output: 5


/*
    Time Complexity: O(logn)
    Auxiliary Space: O(1)
*/
/*
    Find the Nth root of an Integer
    <------------------------------>

    You are given 2 numbers (n , m); the task is to find n√m (nth root of m).

    Example - 1

        Input: n = 2, m = 9, Output: 3
        Explanation: 3 ^ 2 = 9

    Example - 2

        Input: n = 3, m = 9, Output: -1
        Explanation: 3rd root of 9 is not integer.

    Example - 3

        Input: n = 3, m = 27, Output: 3
        Explanation: The cube root of 27 is equal to 3.

    Example - 4

        Input: n = 4, m = 69, Output: -1
        Explanation: The 4th root of 69 does not exist. So, the answer is -1.
*/

/*<----------------------------------------------- Brute Force Approach -------------------------------------------->*/

const func = (b, exp) => {
    let ans = 1;
    let base = b;

    while (exp > 0) {
        if (exp % 2) {
            exp--;
            ans = ans * base;
        }
        else {
            exp /= 2;
            base = base * base;
        }
    }
    return ans;
};

const NthRoot = (n, m) => {
    for (let i = 1; i <= m; i++) {
        let val = func(i, n);
        if (val === m) return i;
        else if (val > m) break;
    }
    return -1;
};
console.log(NthRoot(3, 9)); // Output: -1




/*<----------------------------------------- Using Binary Search --------------------------------------------------->*/

/*
    Algorithm :-

    - Place the 2 pointers i.e. low and high: Initially, we will place the pointers. The pointer low will point to 1 and 
      the high will point to m.

    - Calculate the mid: Now, inside a loop, we will calculate the value of mid using the following formula:
        mid = (low + high) / 2 
    
    - Eliminate the halves accordingly: 

        - If func(n, m, mid) == 1: On satisfying this condition, we can conclude that the number mid is our answer. 
          So, we will return to mid.

        - If func(n, m, mid) == 0: On satisfying this condition, we can conclude that the number mid is smaller than 
          our answer. So, we will eliminate the left half and consider the right half(i.e. low = mid+1).

        - If func(n, m, mid) == 2: the value mid is larger than the number we want. This means the numbers greater than 
          mid will not be our answers and the right half of mid consists of such numbers. So, we will eliminate the 
          right half and consider the left half(i.e. high = mid-1).

    - Finally,  if we are outside the loop, this means no answer exists. So, we will return -1.
*/

/*
    Understanding the Function -

    - funcBS(mid, n, m) checks whether mid^n is equal to m, greater than m, or smaller.
    - If mid ^ n > m, return 2.
    - If mid ^ n == m, return 1.
    - Otherwise, return 0.

    - NthRootBS(n, m) applies binary search to find mid such that mid ^ n = m.


    Input: (3, 27)

    | Iteration | start | end | mid | mid³ (funcBS(mid, 3, 27)) | Result (midN) | Update start / end  |
    |-----------|-------|-----|-----|---------------------------|---------------|---------------------|
    | 1         | 1     | 27  | 14  | 14 ^ 3 = 2744 (>27)       | 2 (Too high)  | end = 13            |
    | 2         | 1     | 13  | 7   | 7 ^ 3 = 343 (>27)         | 2 (Too high)  | end = 6             |
    | 3         | 1     | 6   | 3   | 3 ^ 3 = 27 (=27)          | 1 (Found)     | Return 3            |

    Final Output: 3
*/

const funcBS = (mid, n, m) => {
    let ans = 1;
    for (let i = 1; i <= n; i++) {
        ans = ans * mid;
        if (ans > m) return 2;
    }
    if (ans === m) return 1;
    return 0;
}

const NthRootBS = (n, m) => {
    let start = 1; 
    let end = m;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        let midN = funcBS(mid, n, m);

        if (midN === 1) {
            return mid;
        } else if (midN === 0) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
};
console.log(NthRootBS(2, 9)); // Output: 3
console.log(NthRootBS(3, 9)); //Output: -1
console.log(NthRootBS(3, 27)); // Output: 3
console.log(NthRootBS(4, 69)); // Output: -1


/*
    Time Complexity: O(n * log(m))
    Space Complexity: O(1)
*/
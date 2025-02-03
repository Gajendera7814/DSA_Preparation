/*
    Missing Number   Leetcode Problem
    <------------>   <--------------->

    Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that 
    is missing from the array.

    Example 1:

        Input: nums = [3, 0, 1],  Output: 2

        Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0, 3]. 2 is the missing number in 
        the range since it does not appear in nums.

    Example 2: Input: nums = [0, 1],  Output: 2

        Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0, 2]. 2 is the missing number in 
        the range since it does not appear in nums.

    Example 3: Input: nums = [9, 6, 4, 2, 3, 5, 7, 0, 1],  Output: 8

        Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in 
        the range since it does not appear in nums.
*/

/*<------------------------------------------------ Brute Force Approach -------------------------------------------->*/

const missingNumber = (arr) => {
    let n = arr.length + 1;

    for (let i = 1; i <= n; i++) {
        let flag = 0; /* check if an element exists */

        for (let j = 0; j < n - 1; j++) {
            if (arr[j] === i) {
                flag = 1;
                break;
            }
        }

        /* check if the element is missing (i.e., flag === 0) */
        if (flag === 0) return i;
    }
    return -1;
};
console.log(missingNumber([3, 0, 1])); /* Output: 2 */
console.log(missingNumber([1, 2, 4, 5])); /* Output: 3 */

/*
    Time Complexity: O(n2) 
    Space Complexity: O(1)
*/



/*<---------------------------------------------- using Hashing -------------------------------------------------->*/

/* Only for sorted array */

/*
    1. Initialize a Hash Array (Frequency Array)
        - Create an array hash of size n+1 (to store frequency counts for numbers from 1 to n).
        - Initialize all elements to 0:
        
        const hash = new Array(n + 1).fill(0);
    

    2. Store the Frequencies of Elements in arr
        - Iterate through the given arr (which has n-1 elements) and increase frequency count in hash:
    
        for (let i = 0; i < n - 1; i++) {
            hash[arr[i]]++;
        }
        
        - The hash array now contains 1 for numbers present in arr and 0 for missing numbers.

    3. Identify the Missing Number
        - Iterate from 1 to n and find the number with zero frequency (hash[i] === 0):

        for (let i = 1; i <= n; i++) {
            if (hash[i] === 0) {
                return i;
            }
        }
  
        - Return the missing number.



    Input: arr = [1, 2, 3, 4, 5, 7] // Missing number = 6

    Step 1: Create Hash Array
        Since the array length is 6, n = arr.length = 6, so the hash array will have n + 1 = 7 elements:

        hash = [0, 0, 0, 0, 0, 0, 0]


    Step 2: Update Hash Array with arr Elements For each number in arr, mark its presence:
        
        | arr[i]   | hash[arr[i]]++  |     Updated hash         |
        |----------|-----------------|--------------------------|
        | 1        | hash[1]++       | [0, 1, 0, 0, 0, 0, 0]    |
        | 2        | hash[2]++       | [0, 1, 1, 0, 0, 0, 0]    |
        | 3        | hash[3]++       | [0, 1, 1, 1, 0, 0, 0]    |
        | 4        | hash[4]++       | [0, 1, 1, 1, 1, 0, 0]    |
        | 5        | hash[5]++       | [0, 1, 1, 1, 1, 1, 0]    |
        | 7        | hash[7]++       | [0, 1, 1, 1, 1, 1, 0, 1] |

    Step 3: Find the Missing Number- Loop through 1 to n (6), checking where hash[i] === 0:
  
        hash[1] = 1 ✅
        hash[2] = 1 ✅
        hash[3] = 1 ✅
        hash[4] = 1 ✅
        hash[5] = 1 ✅
        hash[6] = 0 ❌ (Missing Number Found!)
  
    - The function returns 6.
*/

const missingNumbers = (arr) => {
    let n = arr.length;
    const hash = new Array(n + 1).fill(0);

    /* storing the frequencies */
    for (let i = 0; i < n - 1; i++) {
        hash[arr[i]]++;
    }
    
    /* checking the frequencies for numbers 1 to n */
    for (let i = 1; i <= n; i++) {
        if (hash[i] === 0) {
            return i;
        }
    }
    return -1;
};
console.log(missingNumbers([1, 2, 3, 4, 5, 7])); /* Output: 6 */


/*

    Time Complexity
    <-------------->

    1. Building the hash array --→ O(N)
    2. Checking for the missing number -→ O(N)
    3. Total Complexity → O(N) + O(N) --> O(2N)

    Space Complexity
    <--------------->

    - Extra space for hash array (O(N))
    - Total Space Complexity: O(N)
*/




/*<----------------------------------------- Summation Approach --------------------------------------------------->*/

const missingnumber = (arr) => {
    let n = arr.length;

    const summation = (n * (n + 1)) / 2;
    
    let s2 = 0;
    for (let i = 0; i < n - 1; i++) {
        s2 += arr[i];
    }
    
    const missingNum = summation - s2;

    return missingNum;
};
console.log(missingNumber([3, 0, 1])); // Output: 2
console.log(missingnumber([1, 2, 3, 5, 6, 7])); // Output: 4

/* OR */

const findMissingNumber = (arr) => {
    let n = arr.length + 1;

    let expectedSum = (n * (n + 1)) / 2;

    let actualSum = arr.reduce((acc, num) => acc + num, 0);
    
    return expectedSum - actualSum;
};
console.log(missingNumber([3, 0, 1])); // Output: 2
console.log(findMissingNumber([1, 2, 3, 4, 6, 7])); // Output: 5

/*
    Time Complexity: O(N)
    Space Complexity: O(1)
*/





/*<------------------------------------------------ XOR Approach  -------------------------------------------------->*/

/*
    XOR --> a ^ a = 0,  0 ^ any number = number

    E.g - 
    
        2 ^ 2 = 0, 
        5 ^ 5 = 0, 
        2 ^ 2 ^ 5 ^ 5 = 0 ^ 0 = 0

        2 ^ 2 ^ 2 = 0 ^ 2 = 2
*/

/*

    1. XOR of a number with itself is 0 -→ a ^ a = 0
    2. XOR of a number with 0 is the number itself -→ a ^ 0 = a
    3. XOR is commutative and associative, meaning order does not matter -→ (a ^ b) ^ c = a ^ (b ^ c)

    Logic Behind the Function

        - We take two XOR values:
            - xor1: XOR of all numbers from 1 to n (expected range).
            - xor2: XOR of all elements in the given array.

        - Since the missing number is not present in arr, its value remains in the XOR operation at the end.

    
    |-------------------------------------------------------------------------------------------------------|
    
    Input: arr = [1, 3, 4, 5]  Missing number = 2

    Step 1: Initialize xor1 and xor2

        let xor1 = 0; ---> XOR for all numbers from 1 to n
        let xor2 = 0; ---> XOR for all numbers in arr
        let n = arr.length; ---> n = 4 (originally array should have 5 elements)


    Step 2: Compute xor2 (XOR of array elements)

        |      Index   |  arr[i]   | XOR Computation (xor2 = xor2 ^ arr[i]) | Updated xor2   |
        |--------------|-----------|----------------------------------------|----------------|
        |       0      |    1      |            0 ^ 1                       |      1         |
        |       1      |    3      |            1 ^ 3                       |      2         |
        |       2      |    4      |            2 ^ 4                       |      6         |
        |       3      |    5      |            6 ^ 5                       |      3         |


    Step 3: Compute xor1 (XOR of numbers from 1 to n)

        |  i + 1    | XOR Computation (xor1 = xor1 ^ (i + 1)) |     Updated xor1  |
        |-----------|-----------------------------------------|-------------------|
        |   1       |           0 ^ 1                         |         1         |
        |   2       |           1 ^ 2                         |         3         |
        |   3       |           3 ^ 3                         |         0         |
        |   4       |           0 ^ 4                         |         4         |

    
    Step 4: Include n in xor1 Since the missing number should be in the range 1 to n, we also XOR n (which is 5 here):

        xor1 = xor1 ^ n;
        
        4 ^ 5 = 1

        Now, xor1 = 1.

    Step 5: Compute the Missing Number - 
    
        return xor1 ^ xor2;

        1 ^ 3 = 2

        So, the missing number is 2.

        Final Output: 2
*/

const missingsNumber = (arr) => {
    let xor1 = 0;
    let xor2 = 0;
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        xor2 = xor2 ^ arr[i];
        xor1 = xor1 ^ (i + 1);
    }
    xor1 = xor1 ^ n;

    return xor1 ^ xor2;
};
console.log(missingsNumber([1, 3, 4, 5])); // Output: 2
 
/*
    Time Complexity: O(N)
    Space Complexity: O(1)
*/

/*
    Time Complexity
    <-------------->

        - Loop to compute xor2 --→ O(N)
        - Loop to compute xor1 --→ O(N)
        - Final XOR operation --→ O(1)
        
        Total Complexity → O(N)

    Space Complexity
    <--------------->
        - Only uses integer variables (xor1, xor2) --→ O(1)
*/
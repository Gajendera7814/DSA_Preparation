/*
    Rearrange Array Elements by Sign    Leetcode Problem
    <------------------------------->   <--------------->

    You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and 
    negative integers.

    You should return the array of nums such that the the array follows the given conditions:

        - Every consecutive pair of integers have opposite signs.
        - For all integers with the same sign, the order in which they were present in nums is preserved.
        - The rearranged array begins with a positive integer.
    
    Return the modified array after rearranging the elements to satisfy the aforementioned conditions.
    
    Example 1:

        Input: [3, 1, -2, -5, 2, -4],  Output: [3, -2, 1, -5, 2, -4]
        
        Explanation:

            - The positive integers in nums are [3, 1, 2]. The negative integers are [-2, -5, -4].
            - The only possible way to rearrange them such that they satisfy all conditions is [3, -2, 1, -5, 2, -4].
        
            Other ways such as [1, -2, 2, -5, 3, -4], [3, 1, 2, -2, -5, -4], [-2, 3, -5, 1, -4, 2] are incorrect because 
            they do not satisfy one or more conditions.  
    
    Example 2:

        Input: nums = [-1, 1],  Output: [1, -1]
        
        Explanation: 1 is the only positive integer and -1 the only negative integer in nums. So nums is rearranged to [1,-1].
*/

/*
    There are two varieties of the same problem
    |------------------------------------------|

    1. positive element == negative element
        [3, 1, -2, -5, 2, -4] here posElem = 3, negElem = 3
    
    2. positive element !== negative element Here Two Possibilities occur.
        1. posElem > negElem [1, 2, -4, -5, 3, 4] here posElem = 4, negElem = 2
        2. posElem < negElem [1, 2, -3, -1, -2, -3] here posElem = 2, negElem = 4
*/


/*<------------------------------------------ Brute Force Approach ----------------------------------------------->*/

/* Case - 1 Positive Element === Negative Element */

/*
    Input: [3, 1, -2, -5, 2, -4] 

    Step-by-step Execution -

        |  Step |                 Operation             |      posElem    |     negElem    | arr (Intermediate State) |
        |-------|---------------------------------------|-----------------|----------------|--------------------------|
        |   1   |  Initial input array                  |      []         |   []           |   [3, 1, -2, -5, 2, -4]  |
        |   2   |  Iterate: 3 > 0 -→ push to posElem    |      [3]        |   []           |   [3, 1, -2, -5, 2, -4]  |
        |   3   |  Iterate: 1 > 0 -→ push to posElem    |     [3, 1]      |   []           |   [3, 1, -2, -5, 2, -4]  |
        |   4   |  Iterate: -2 < 0 -→ push to negElem   |     [3, 1]      |   [-2]         |   [3, 1, -2, -5, 2, -4]  |
        |   5   |  Iterate: -5 < 0 -→ push to negElem   |     [3, 1]      |   [-2, -5]     |   [3, 1, -2, -5, 2, -4]  |
        |   6   |  Iterate: 2 > 0 -→ push to posElem    |     [3, 1, 2]   |   [-2, -5]     |   [3, 1, -2, -5, 2, -4]  |
        |   7   |  Iterate: -4 < 0 -→ push to negElem   |     [3, 1, 2]   |   [-2, -5, -4] |   [3, 1, -2, -5, 2, -4]  |


    Rearranging elements

        | Step |                   Operation                 | arr (Intermediate State) |
        |------|---------------------------------------------|--------------------------|
        |  8   | Place posElem[0] = 3 at arr[0]              | [3, _, -2, -5, 2, -4]    |
        |  9   | Place negElem[0] = -2 at arr[1]             | [3, -2, -2, -5, 2, -4]   |
        |  10  | Place posElem[1] = 1 at arr[2]              | [3, -2, 1, -5, 2, -4]    |
        |  11  | Place negElem[1] = -5 at arr[3]             | [3, -2, 1, -5, 2, -4]    |
        |  12  | Place posElem[2] = 2 at arr[4]              | [3, -2, 1, -5, 2, -4]    |
        |  13  | Place negElem[2] = -4 at arr[5]             | [3, -2, 1, -5, 2, -4]    |

        Final Output :- [3, -2, 1, -5, 2, -4]
*/

const reArrangebBySign = (arr) => {
    let posElem = [];
    let negElem = [];
    let n = arr.length;
    
    for (let i = 0; i < n; i++) {
        if (arr[i] > 0) {
            posElem.push(arr[i]);
        } else {
            negElem.push(arr[i]);
        }
    }

    /* Positives on even indices, negatives on odd. */
    for (let i = 0; i < n / 2; i++) {
        arr[2 * i] = posElem[i];
        arr[2 * i + 1] = negElem[i];
    }
    return arr;
};
console.log(reArrangebBySign([3, 1, -2, -5, 2, -4])); /* Output: [3, -2, 1, -5, 2, -4] */


/*
    Time Complexity: O(n + n/2)
    Space Complexity: O(n/2 + n/2) = O(n)
*/




/*<------------------------------------------------ Optimal Approach ---------------------------------------------->*/

/*
    How the Algorithm Works Behind It-

    1. Initialize Variables  
        - n = arr.length: Stores the length of the input array.
        - ans = new Array(n).fill(0): Creates an empty array of size n, initially filled with zeros.
        - posIndex = 0: Keeps track of where to insert the next positive number (starts at index 0).
        - negIndex = 1: Keeps track of where to insert the next negative number (starts at index 1).

    2. Iterate Through the Input Array  
        - If arr[i] is negative, place it at ans[negIndex], then increment negIndex by 2 (to maintain odd indices).
        - If arr[i] is positive, place it at ans[posIndex], then increment posIndex by 2 (to maintain even indices).

    3. Return the ans array as the final result.

*/

/*
    Case: Equal Positives and Negatives Numbers: [3, 1, -2, -5, 2, -4]


    | Step |      arr[i]     |  posIndex  |  negIndex   |  ans (Intermediate State) |
    |------|-----------------|------------|-------------|---------------------------|
    |  1   |   3 (Positive)  |  0 → 2     |      1      |   [3, 0, 0, 0, 0, 0]      |
    |  2   |   1 (Positive)  |  2 → 4     |      1      |   [3, 0, 1, 0, 0, 0]      |
    |  3   |  -2 (Negative)  |  2         |      1 -→ 3 |   [3, -2, 1, 0, 0, 0]     |
    |  4   |  -5 (Negative)  |  2         |      3 -→ 5 |   [3, -2, 1, -5, 0, 0]    |
    |  5   |   2 (Positive)  |  4 → 6     |      3      |   [3, -2, 1, -5, 2, 0]    |
    |  6   |  -4 (Negative)  |  4         |      5 -→ 7 |   [3, -2, 1, -5, 2, -4]   |

    Final Output:- [3, -2, 1, -5, 2, -4]



    Case: More Positives than Negatives: [1, 2, -4, -5, 3, 4]


    | Step |     arr[i]    |  posIndex  | negIndex   | ans (Intermediate State) |
    |------|---------------|------------|------------|--------------------------|
    |   1  | 1 (Positive)  |   0 → 2    |    1       |   [1, 0, 0, 0, 0, 0]     |
    |   2  | 2 (Positive)  |   2 → 4    |    1       |   [1, 0, 2, 0, 0, 0]     |
    |   3  | -4 (Negative) |   2        |    1 → 3   |   [1, -4, 2, 0, 0, 0]    |
    |   4  | -5 (Negative) |   2        |    3 → 5   |   [1, -4, 2, -5, 0, 0]   |
    |   5  | 3 (Positive)  |   4 → 6    |    3       |   [1, -4, 2, -5, 3, 0]   |
    |   6  | 4 (Positive)  |   6 → 8    |    3       |   [1, -4, 2, -5, 3, 4]   |

    Final Output: [1, -4, 2, -5, 3, 4]
*/


const reArrangebBySignOptimalWay = (arr) => {
    let n = arr.length;
    let ans = new Array(n).fill(0);

    /* Positive elements start from 0 and negative from 1. */
    let posIndex = 0;
    let negIndex = 1;
    
    for (let i = 0; i < n; i++) {
        /* Fill negative elements in odd indices and increment by 2. */
        if (arr[i] < 0) {
            ans[negIndex] = arr[i];
            negIndex += 2;
        }
        
        /* Fill positive elements in even indices and increment by 2. */
        else {
            ans[posIndex] = arr[i];
            posIndex += 2;
        }
    }
    return ans;
};
console.log(reArrangebBySignOptimalWay([3, 1, -2, -5, 2, -4])); // Output: [ 3, -2, 1, -5, 2, -4 ]
console.log(reArrangebBySignOptimalWay([1, 2, -4, -5, 3, 4])); // posElem > negElem Output: [1, -4, 2, -5, 3,  0, 4]


/*

    Time Complexity: O(n)

        - We iterate through the array once --→ O(n).
        - We place elements in ans[] in constant time per operation --→ O(n).
  
    Space Complexity: O(n) 
        
        - A new array ans of size n is created.
*/



/*<------------------------------------------ Using Two Separate Arrays -------------------------------------------->*/

/*
    Algorithm :-

        - Traverse the input array and collect positive and negative numbers in separate arrays.
        - Merge the arrays by alternating between positive and negative numbers.
        - If one array is longer than the other, append the remaining elements at the end.
*/


/*
    How the Algorithm Works Behind It -

    1. Separate Positives and Negatives  
        - Two arrays, positives and negatives, are created to store positive and negative numbers separately.
    
    2. Merge Alternately  
        - A new array result is used to store numbers in an alternating fashion.
        - Iterate through both positives and negatives, adding one from each until one list is exhausted.

    3. Append Remaining Elements  
        - If any numbers are left in either list, they are appended to result.
*/

/*
    Case: 1 => Equal Positivesand Negatives Numbers,  Input: [1, 2, -4, -5]

        | Step |      arr[i]   |    positives   |   negatives   | result (Intermediate State) |
        |------|---------------|----------------|---------------|-----------------------------|
        |  1   | 1 (Positive)  |     [1]        |   []          |           []                |
        |  2   | 2 (Positive)  |     [1, 2]     |   []          |           []                |
        |  3   | -4 (Negative) |     [1, 2]     |   [-4]        |           []                |
        |  4   | -5 (Negative) |     [1, 2]     |   [-4, -5]    |           []                |

    Merging Alternately -

        | Step |                   Operation                  |     result    -|
        |------|----------------------------------------------|----------------|
        |  5   | Add positives[0] = 1, then negatives[0] = -4 | [1, -4]        |
        |  6   | Add positives[1] = 2, then negatives[1] = -5 | [1, -4, 2, -5] |

        Final Output:- [1, -4, 2, -5]


    Case: 2 => Positives Number > Negatives Numbers,  Input: [1, 2, -4, -5, 3, 4

        | Step |     arr[i]     |     positives    |    negatives     | result (Intermediate State) |
        |------|----------------|------------------|------------------|-----------------------------|
        | 1    |  1 (Positive)  |   [1]            |     []           |             []              |
        | 2    |  2 (Positive)  |   [1, 2]         |     []           |             []              |
        | 3    | -4 (Negative)  |   [1, 2]         |    [-4]          |             []              |
        | 4    | -5 (Negative)  |   [1, 2]         |    [-4, -5]      |             []              |
        | 5    |  3 (Positive)  |   [1, 2, 3]      |    [-4, -5]      |             []              |
        | 6    |  4 (Positive)  |   [1, 2, 3, 4]   |    [-4, -5]      |             []              |

    Merging Alternately -

        | Step |                   Operation                    |     result             |
        |------|------------------------------------------------|------------------------|
        |  7   |   Add positives[0] = 1, then negatives[0] = -4 |   [1, -4]              |
        |  8   |   Add positives[1] = 2, then negatives[1] = -5 |   [1, -4, 2, -5]       |
        |  9   |   Add remaining positives[2] = 3               |   [1, -4, 2, -5, 3]    |
        | 10   |   Add remaining positives[3] = 4               |   [1, -4, 2, -5, 3, 4] |

        Final Output:- [1, -4, 2, -5, 3, 4]


    Case: 3 => Positives Number < Negatives Numbers,  Input: [1, 2, -3, -1, -2, -3]

        | Step |    arr[i]       | positives |       negatives      |  result (Intermediate State)  |
        |------|-----------------|-----------|----------------------|---------------[---------------|
        |  1   |   1 (Positive)  |  [1]      |     []               |           []                  |
        |  2   |   2 (Positive)  |  [1, 2]   |     []               |           []                  |
        |  3   |  -3 (Negative)  |  [1, 2]   |     [-3]             |           []                  |
        |  4   |  -1 (Negative)  |  [1, 2]   |     [-3, -1]         |           []                  |
        |  5   |  -2 (Negative)  |  [1, 2]   |     [-3, -1, -2]     |           []                  |
        |  6   |  -3 (Negative)  |  [1, 2]   |     [-3, -1, -2, -3] |           []                  |


    Merging Alternately-

        | Step |                 Operation                    |           result            |
        |------|----------------------------------------------|-----------------------------|
        |  7   | Add positives[0] = 1, then negatives[0] = -3 |     [1, -3]                 |
        |  8   | Add positives[1] = 2, then negatives[1] = -1 |     [1, -3, 2, -1]          |
        |  9   | Add remaining negatives[2] = -2              |     [1, -3, 2, -1, -2]      |
        | 10   | Add remaining negatives[3] = -3              |     [1, -3, 2, -1, -2, -3]  |

        Final Output:- [1, -3, 2, -1, -2, -3]
*/

const rearrangeBySign = (arr) => {
    let positives = [];
    let negatives = [];
    
    /* Separate positive and negative numbers */
    for (let num of arr) {
        if (num >= 0) {
            positives.push(num);
        } else {
            negatives.push(num);
        }
    }

    let result = [];
    let i = 0;
    
    /* Alternate between positives and negatives */
    while (i < positives.length && i < negatives.length) {
        result.push(positives[i]);
        result.push(negatives[i]);
        i++;
    }

    /* If positives are left */
    while (i < positives.length) {
        result.push(positives[i++]);
    }

    /* If negatives are left */
    while (i < negatives.length) {
        result.push(negatives[i++]);
    }

    return result;
};
console.log(rearrangeBySign([1, 2, -4, -5]));  /* Output: [1, -4, 2, -5] */
console.log(rearrangeBySign([1, 2, -4, -5, 3, 4]));  /* Output: [ 1, -4, 2, -5, 3, 4 ] */
console.log(rearrangeBySign([1, 2, -3, -1, -2, -3]));  /* Output: [ 1, -3, 2, -1, -2, -3 ] */

/*
    Time Complexity: O(n)

        - One pass to separate positives and negatives -→ O(n)  
        - One pass to merge alternately -→ O(n)  

    Space Complexity: O(n), (for positives, negatives, and result)
*/
/*
    Single Element in a Sorted Array     Leetcode Problem
    <------------------------------>    <---------------->

    You are given a sorted array consisting of only integers where every element appears exactly twice, except for 
    one element which appears exactly once.

    Return the single element that appears only once.

    Input: nums = [1, 1, 2, 3, 3, 4, 4, 8, 8],  Output: 2

    Input: nums = [3, 3, 7, 7, 10, 11, 11],  Output: 10
*/

/*<---------------------------------------------- Brute Force Approach - 1 ----------------------------------------->*/

/*

    Input: [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]

    | Iteration |   i  |  arr[i]  |  arr[i-1]  |  arr[i+1]  |                       Condition Checked                  | Action Taken | Return Value |
    |-----------|------|----------|------------|------------|----------------------------------------------------------|--------------|--------------|
    | 1         | 0    | 1        | -          | 1          | arr[i] !== arr[i + 1] → False                            |     Continue |     -        |
    | 2         | 1    | 1        | 1          | 2          | arr[i] !== arr[i - 1] → False                            |     Continue |     -        |
    | 3         | 2    | 2        | 1          | 2          | arr[i] !== arr[i + 1] → False                            |     Continue |     -        |
    | 4         | 3    | 2        | 2          | 3          | arr[i] !== arr[i - 1] → False                            |     Continue |     -        |
    | 5         | 4    | 3        | 2          | 3          | arr[i] !== arr[i + 1] → False                            |     Continue |     -        |
    | 6         | 5    | 3        | 3          | 4          | arr[i] !== arr[i - 1] → False                            |     Continue |     -        |
    | 7         | 6    | 4        | 3          | 5          | arr[i] !== arr[i - 1] AND arr[i] !== arr[i+1] → ✅ True  |     Return 4 |     4        |

    Final Output: 4
*/

const singleNonDuplicate1 = (arr) => {
    var n = arr.length;
    if (n === 1) return arr[0];

    for (var i = 0; i < n; i++) {
        /* Check for first index */
        if (i === 0) {
            if (arr[i] !== arr[i + 1]) {
                return arr[i];
            }
        }

        /* Check for last index */
        else if (i === n - 1) {
            if (arr[i] !== arr[i - 1]) {
                return arr[i];
            }
        } else {
            if (arr[i] !== arr[i - 1] && arr[i] !== arr[i + 1]) {
                return arr[i];
            }
        }
    }
    return -1;
};
console.log(singleNonDuplicate1([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6])); // Output - 4


/*<---------------------------------------------- Brute Force Approach - 1 ----------------------------------------->*/

const singleNonDuplicate2 = (arr) => {
    let n = arr.length;
    let ans = 0;

    /* XOR all the elements */
    for (let i = 0; i < n; i++) {
        ans = ans ^ arr[i];
    }
    return ans;
};
console.log(singleNonDuplicate2([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6])); // Output - 4


/*<---------------------------------------------- By Using Binary Search ------------------------------------------->*/

/*
    Algorithm: The steps are as follows

    - If n == 1: This means the array size is 1. If the array contains only one element, we will return that element only.

    - If arr[0] != arr[1]: This means the very first element of the array is the single element. So, we will return arr[0].

    - If arr[n - 1] != arr[n - 2]: This means the last element of the array is the single element. So, we will return arr[n - 1].

    - Place the 2 pointers i.e. low and high: Initially, we will place the pointers excluding index 0 and n - 1 like this: 
        low will point to index 1, and high will point to index n - 2 i.e. the second last index.

    - Calculate the ‘mid’: Now, inside a loop, we will calculate the value of ‘mid’ using the following formula:
        mid = (low + high) // 2

    - Check if arr[mid] is the single element:
        If arr[mid] != arr[mid - 1] and arr[mid] != arr[mid + 1]: If this condition is true for arr[mid], we can conclude arr[mid]
        is the single element. We will return arr[mid].
        
    - If (mid % 2 == 0 and arr[mid] == arr[mid + 1])
        or (mid%2 == 1 and arr[mid] == arr[mid - 1]): This means we are in the left half and we should eliminate it as our 
        single element appears on the right. So, we will do this: low = mid + 1.
    
    Otherwise, we are in the right half and we should eliminate it as our single element appears on the left. 
    So, we will do this: high = mid - 1.
*/

/*
    Key Observations :-

    1. Edge Cases:  

        - If the array has only one element, return it.
        - If the first or last element is the unique one, return it immediately.

    2. Binary Search Approach:
    
        - If arr[mid] is not equal to its adjacent elements, it's the unique element.
        - The left half contains the unique element if:
            - mid is odd and arr[mid] == arr[mid-1]
            - mid is even and arr[mid] == arr[mid+1]
        - Otherwise, the right half is the correct region.
        - Adjust low and high accordingly to eliminate half the search space in each iteration.


    Input: [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]

    | Iteration |  low | high |  mid | arr[mid] | arr[mid-1] | arr[mid+1] |             Condition Met                   |       Action Taken    | Updated low/high |
    |-----------|------|------|------|----------|------------|------------|---------------------------------------------|-----------------------|------------------|
    | -         | -    | -    | -    | 1        | -          | 1          | arr[0] == arr[1], continue                  |       -               |       -          |
    | -         | -    | -    | -    | 6        | 6          | -          | arr[n-1] == arr[n-2], continue              |       -               |       -          |
    | 1         | 1    | 9    | 5    | 3        | 3          | 4          | arr[mid] == arr[mid-1] | Search right half  |   low = mid + 1 = 6   |                  |
    | 2         | 6    | 9    | 7    | 5        | 4          | 5          | arr[mid] == arr[mid+1] | Search left half   |   high = mid - 1 = 6  |                  |
    | 3         | 6    | 6    | 6    | 4        | 3          | 5          | arr[mid] is not equal to its neighbors      | Unique Element Found  |       Return 4   |

    Final Calculation -

        Unique Element = 4
        Output: 4
*/

const singleNonDuplicates = (arr) => {
    let n = arr.length;

    /* Edge cases :- */
    if (n === 1) return arr[0];
    if (arr[0] !== arr[1]) return arr[0];
    if (arr[n - 1] !== arr[n - 2]) return arr[n - 1];

    let low = 1, high = n - 2;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        /* If arr[mid] is the single element */
        if (arr[mid] !== arr[mid + 1] && arr[mid] !== arr[mid - 1]) {
            return arr[mid];
        }

        /* We are in the left :- */
        if ((mid % 2 === 1 && arr[mid] === arr[mid - 1]) || (mid % 2 === 0 && arr[mid] === arr[mid + 1])) {
            /* Eliminate the left half */
            low = mid + 1;
        }

        /* We are in the right */
        else {
            /* Eliminate the right half */
            high = mid - 1;
        }
    }
    return -1;
};
console.log(singleNonDuplicates([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6])); // Output - 4






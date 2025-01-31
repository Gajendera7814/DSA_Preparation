/*
    Union Of Two Sorted Arrays With Duplicates   Leetcode Problem
    <----------------------------------------->  <--------------->

    Given two sorted arrays of size n and m respectively, find their union. The Union of two arrays can be defined 
    as the common and distinct elements in the two arrays. Return the elements in sorted order. 
    
    Example:-
        arr1 = [1, 1, 2, 3, 4, 5], 
        arr2 = [2, 3, 4, 4, 5, 6]
        
        Output = [1, 2, 3, 4, 5, 6]
*/

/*<-------------------------------------------- Approach -1 Using Set --------------------------------------------->*/

/*
    Approach Behind the Code
    <----------------------->

    1. Use a Set for Unique Elements  
        - A Set is initialized to store unique elements from both arrays.  
        - A Set in JavaScript automatically removes duplicate values.

    2. Insert Elements from arr1  
        - Iterate through arr1 and insert each element into the Set.  
        - Since a Set only stores unique values, duplicates are automatically ignored.  

    3. Insert Elements from arr2  
        - Iterate through arr2 and insert its elements into the Set.  
        - If an element already exists in the Set, it won’t be added again.  

    4. Convert the Set Back to an Array  
        - The spread operator ([...]) is used to convert the Set into an array and return the result.  
        - This ensures that the final result is an array of unique elements from both input arrays.
*/

const findUnion = (arr1, arr2) => {
    /* Create a Set to store unique elements. */
    const set = new Set();

    /* Add all elements from the first array to the set. */
    for (let i = 0; i < arr1.length; i++) {
        set.add(arr1[i]);
    }

    /* Add all elements from the second array to the set. */
    for (let i = 0; i < arr2.length; i++) {
        set.add(arr2[i]);
    };

    /* Convert the set back to an array and return it. */
    return [...set];
};
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr2 = [2, 3, 4, 4, 5, 11, 12];

console.log(findUnion(arr1, arr2)); /* Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] */

/*
    Time Complexity Analysis
    <----------------------->

    1. Inserting elements from arr1 into the Set --→  O(n), where  n is the length of arr1.
    2. Inserting elements from arr2 into the Set --→  O(m), where  m is the length of arr2.
    3. Converting the Set back into an array --→  O(n + m), as iterating through a set takes  O(n + m).

    Overall Time Complexity: O(n + m)


    Space Complexity Analysis
    <------------------------>

    1. Set storage → Stores at most  n + m unique elements --→  O(n + m).
    2. Final output array --→ Also stores  O(n + m) elements.
    3. Constant extra variables --→  O(1) (negligible).

    Overall Space Complexity: O(n + m)


    - Time Complexity:  O(n + m)
    - Space Complexity: O(n + m)
*/




/*<----------------------------------------- Approach -2 Using 2 Pointer ------------------------------------------>*/

/*
    Logic Behind the Two Pointer Approach for Union of Two Sorted Arrays
    |<----------------------------------------------------------------->|

    1. Initialization
        - Two pointers i and j are used to traverse arr1 and arr2, respectively.
        - unionList is an empty array that will store the union of both arrays.
        - n1 and n2 store the lengths of arr1 and arr2.


    2. Main Loop: Traverse Both Arrays Simultaneously
        - We iterate through both arrays until we reach the end of either one.
        - Comparing elements at i and j:

        1. If arr1[i] < arr2[j] --→  
            - arr1[i] is smaller, so it should be included in unionList first.
            - Increment i (move pointer in arr1).
        2. If arr1[i] > arr2[j] →  
            - arr2[j] is smaller, so it should be included first.
            - Increment j (move pointer in arr2).
        3. If arr1[i] === arr2[j] →  
            - Both elements are the same, so we include only one copy in unionList.
            - Move both pointers (i++ and j++) to avoid duplicates.

    3. Handling Remaining Elements
        - Once one array is fully traversed, the remaining elements in the other array are directly added to unionList.
        - This ensures that all elements are included, even if one array is longer than the other.


    arr1 = [1, 3, 4, 5, 7];
    arr2 = [2, 3, 5, 6];

    Execution Steps:

    |   i  |  arr1[i] |   j  |  arr2[j] |   Action            | unionList  |
    |------|----------|------|----------|---------------------|-----------------------|
    | 0    | 1        | 0    | 2        | Add 1, move i       | [1]                   |
    | 1    | 3        | 0    | 2        | Add 2, move j       | [1, 2]                |
    | 1    | 3        | 1    | 3        | Add 3, move both    | [1, 2, 3]             |
    | 2    | 4        | 2    | 5        | Add 4, move i       | [1, 2, 3, 4]          |
    | 3    | 5        | 2    | 5        | Add 5, move both    | [1, 2, 3, 4, 5]       |
    | 4    | 7        | 3    | 6        | Add 6, move j       | [1, 2, 3, 4, 5, 6]    |
    | 4    | 7        | 4    | -        | Add 7, move i       | [1, 2, 3, 4, 5, 6, 7] |

    Output: [1, 2, 3, 4, 5, 6, 7]
*/

const unionTwoPointer = (arr1, arr2) => {
    let n1 = arr1.length;
    let n2 = arr2.length;
    let i = 0;
    let j = 0;
    let unionList = [];
  
    while (i < n1 && j < n2) {
        /* If the element is smaller, push it to unionList and move that pointer. */
        if (arr1[i] < arr2[j]) {
            unionList.push(arr1[i]);
            i++;
        } else if (arr1[i] > arr2[j]) {
            unionList.push(arr2[j]);
            j++;
        } else {
            /* If both elements are equal, add one and move both pointers. */
            unionList.push(arr1[i]);
            i++;
            j++;
        }
    };
    
    /* Add remaining elements of arr1. */
    while (i < arr1.length) {
        unionList.push(arr1[i]);
        i++;
    };
  
    /* Add remaining elements of arr2. */
    while (j < arr2.length) {
        unionList.push(arr2[j]);
        j++;
    };
  
    return unionList;
};
console.log(unionTwoPointer([1, 3, 4, 5, 7], [2, 3, 5, 6])); /* Output: [1, 2, 3, 4, 5, 6, 7] */

/*

    Time Complexity:
        - Each element is processed once**, and each pointer moves only forward.
        - Since we traverse both arrays only once, the complexity is: O(n + m)

        where n and m are the lengths of arr1 and arr2.

    Space Complexity:
        - The result unionList stores at most n + m elements.
        - Since we are not using extra data structures apart from the output list, the space complexity is: O(n + m)
*/
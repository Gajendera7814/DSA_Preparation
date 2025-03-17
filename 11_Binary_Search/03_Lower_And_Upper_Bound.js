/*
    Lower Bound
    <---------->

    Problem Statement: Given a sorted array of N integers and an integer x, write a program to find the lower bound of x.

    Example - 1
    
        Input: [1, 2, 2, 3], target = 2, Output: 1
        Explanation: Index 1 is the smallest index such that arr[1] >= x.

    Example - 2

        Input: [3, 5, 8, 15, 19], target = 9, Output: 3
        Explanation: Index 3 is the smallest index such that arr[3] >= x.
*/

/*
    Approach :-

    Calculate the "mid": mid = start + (end - start) / 2.

    Compare arr[mid] with target: With comparing arr[mid] to target, we can observe 2 different cases :-

        Case 1 - If arr[mid] >= target: This condition means that the index mid may be an answer. So, we will update the 
        ans variable with mid and search in the left half if there is any smaller index that satisfies the same condition. 
        Here, we are eliminating the right half.
        
        Case 2 - If arr[mid] < target: In this case, mid cannot be our answer and we need to find some bigger element. 
        So, we will eliminate the left half and search in the right half for the answer.
*/


/*<--------------------------------------------------- Lower Bound -------------------------------------------------->

    Algorithm Explanation (Lower Bound) -

    The Lower Bound algorithm finds the smallest index at which target can be inserted in a sorted array without 
    disrupting the order.  

    - If target is present, it returns the first occurrence of target.
    - If target is not present, it returns the index where it should be inserted.

    Steps:

    1. Initialize:
        - start = 0
        - end = arr.length - 1
        - ans = arr.length (default answer if target is greater than all elements).

    2. Perform Binary Search:
        - Calculate mid = start + Math.floor((end - start) / 2).
        - If arr[mid] >= target, update ans = mid and search left (end = mid - 1).
        - If arr[mid] < target, search right (start = mid + 1).

    3. Return ans, which is the lower bound index.


    Input: [3, 5, 8, 15, 19], target = 9


    | Iteration | start | end | mid | arr[mid] | Comparison (arr[mid] >= 9 ?) | ans Update |   New start / end    |
    |-----------|-------|-----|-----|---------|-------------------------------|------------|----------------------|
    | 1         | 0     | 4   | 2   | 8       | No (8 < 9) → Search right     | No change  | start = 3            |
    | 2         | 3     | 4   | 3   | 15      | Yes (15 >= 9) → Update ans    | ans = 3    | end = 2              |

    Final Output: 3 (Index where 9 should be inserted) 

    Thus, the lower bound of 9 is index 3, meaning 9 should be placed at index 3 to maintain the sorted order.

*/

const lowerBound = (arr, target) => {
    let start = 0; 
    let end = arr.length - 1;
    let ans = arr.length;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        /* maybe an answer */
        if (arr[mid] >= target) {
            ans = mid;
            /* look for smaller index on the left */
            end = mid - 1;
        } else {
            /* look on the right */
            start = mid + 1;
        }
    }
    return ans;
};
console.log(lowerBound([3, 5, 8, 15, 19], 9)); // Output: 3




/*<--------------------------------------------------- Lower Bound -------------------------------------------------->*/

/*
    Algorithm Explanation (Upper Bound) -

    The Upper Bound algorithm finds the smallest index at which target + 1 can be inserted in a sorted array without 
    disrupting the order.  

    - If target is present, it returns the first index greater than target.
    - If target is not present, it returns the index where it should be inserted.

    Steps:

    1. Initialize:
        - start = 0
        - end = arr.length - 1
        - ans = arr.length (default answer if target is greater than all elements).

    2. Perform Binary Search:
        - Calculate mid = start + Math.floor((end - start) / 2).
        - If arr[mid] > target, update ans = mid and search left (end = mid - 1).
        - If arr[mid] <= target, search right (start = mid + 1).

    3. Return ans, which is the upper bound index.


    Input: arr = [3, 5, 8, 9, 15, 19],  target = 9

    | Iteration | start | end | mid | arr[mid] |  Comparison (arr[mid] > 9 ?) | ans Update |   New start / end    |
    |-----------|-------|-----|-----|----------|------------------------------|------------|----------------------|
    | 1         | 0     | 5   | 2   |  8       |  No (8 <= 9) → Search right  | No change  | start = 3            |
    | 2         | 3     | 5   | 4   |  15      |  Yes (15 > 9) → Update ans   | ans = 4    | end = 3              |
    | 3         | 3     | 3   | 3   |  9       |  No (9 <= 9) → Search right  | No change  | start = 4            |

    Final Output: 4 (Index where 9 should be inserted to maintain sorted order)

    Thus, the upper bound of 9 is index 4, meaning 9 can be inserted at index 4 while keeping the array sorted.
*/

const upperBound = (arr, target) => {
    let start = 0; 
    let end = arr.length - 1;
    let ans = arr.length;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        /* maybe an answer */
        if (arr[mid] > target) {
            ans = mid;
            /* look for smaller index on the left */
            end = mid - 1;
        } else {
            /* look on the right */
            start = mid + 1;
        }
    }
    return ans;
};
console.log(upperBound([3, 5, 8, 9, 15, 19], 9)); // Output: 4

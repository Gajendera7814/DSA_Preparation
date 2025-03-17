/*
    Search Insert Position    (Leetcode Problem)
    <-------------------->    <----------------->

    The "Search Insert Position" problem involves finding the index of a target value in a sorted array of distinct integers. 
    If the target is present, return its index. If it's not, return the index where it can be inserted while keeping the 
    array sorted. 

    Given a sorted array of distinct integers and a target value, return the index if the target is found. 
    If not, return the index where it would be if it were inserted in order.


    Input: [1, 3, 5, 6], target = 5, Output: 2

    Input: [1, 3, 5, 6], target = 2, Output: 1

    Input: [1, 3, 5, 6], target = 7, Output: 4
*/

/*
    Dry Run :-
    -----------

    Input: [1, 3, 5, 6], target = 7, start = 0, end = arr.length - 1 = 3

    - First Iteration :- start = 0, end = 3

        Calculate mid = start + Math.floor((end - start) / 2) = 0 + Math.floor((3 - 0) / 2) = 0 + Math.floor(3 / 2) = 1
        arr[mid] = arr[1] = 3

        Since arr[mid] < target (i.e. 3 < 7), set start = mid + 1 = 1 + 1 = 2

    - Second Iteration :- start = 2, end = 3

        Calculate mid = start + Math.floor((end - start) / 2) = 2 + Math.floor((3 - 2) / 2) = 2 + Math.floor(1 / 2) = 2
        arr[mid] = arr[2] = 5

        Since arr[mid] < target (i.e. 5 < 7), set start = mid + 1 = 2 + 1 = 3

    - Third Iteration :- start = 3, end = 3

        Calculate mid = start + Math.floor((end - start) / 2) = 3 + Math.floor((3 - 3) / 2) = 3
        arr[mid] = arr[3] = 6
        
        Since arr[mid] < target (i.e. 6 < 7), set start = mid + 1 = 3 + 1 = 4

    - End of Loop :- start = 4, end = 3

        - Now, start > end, so the loop terminates.

    Final Output :- At the end of the loop, start = 4. Since the target 7 is greater than all elements in the array, 
    the correct insert position is at index 4.
*/

/*
    Algorithm Explanation (Search Insert Position) -
    
    The searchInsert function finds the index where target is located or where it should be inserted in a sorted array.

    Steps:

    1. Initialize Pointers:
        - start = 0
        - end = arr.length - 1

    2. Binary Search:
        - Calculate mid = start + Math.floor((end - start) / 2).
        - If arr[mid] == target, return mid (target found).
        - If target < arr[mid], search left (end = mid - 1).
        - If target > arr[mid], search right (start = mid + 1).
        
    3. Return Insert Position:
        - If target is not found, return start (correct insert position).

   
    Input: [1, 3, 5, 6], target = 5


    | Iteration | start | end | mid | arr[mid] | Comparison (target ? arr[mid]) | New start / end |
    |-----------|-------|-----|-----|---------|--------------------------------|----------------------|
    | 1         | 0     | 3   | 1   | 3       | 5 > 3 → Search right         | start = 2           |
    | 2         | 2     | 3   | 2   | 5       | 5 == 5 → Target found        | Return 2          |

    Final Output: 2 (Index of 5 in the array)


    <-------------------------------------------------------------------------------------------------->

    Test Case Where Target is Not Present

    If we run: [1, 3, 5, 6], target = 2


    | Iteration | start | end | mid | arr[mid] | Comparison (target ? arr[mid]) |    New start / end   |
    |-----------|-------|-----|-----|----------|--------------------------------|----------------------|
    | 1         | 0     | 3   | 1   | 3        |  2 < 3 → Search left           |  end = 0             |
    | 2         | 0     | 0   | 0   | 1        |  2 > 1 → Search right          |  start = 1           |

    Output: 1 (Insert 2 at index 1 to maintain sorted order)
*/

const searchInsert = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (target < arr[mid]) {
            end = mid - 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            return mid;
        }
    }
    /* If not found, start will be the correct insert position */
    return start;
};
console.log(searchInsert([1, 3, 5, 6], 5)); // Output: 2
console.log(searchInsert([1, 3, 5, 6], 2)); // Output: 1
console.log(searchInsert([1, 3, 5, 6], 7)); // Output: 4
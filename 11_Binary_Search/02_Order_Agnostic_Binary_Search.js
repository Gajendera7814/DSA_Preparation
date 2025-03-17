/*
    Order Agnostic Binary Search
    <--------------------------->

    In Order Agnostic Binary Search order (ascending or descending) of the array is unknown.

    check that the value of the first element is greater or smaller than the last element.

    1.  If the first element is smaller than the last element, then if the search key value X is less than the middle of the 
        interval then the end pointer will be changed to middle -1 otherwise start will be changed to middle + 1.
    
    2.  If the first element is greater than the last element, then if the search key value X is less than the middle of the
        interval then the start pointer will move to the next element of the middle element otherwise the end pointer will 
        move previous to the middle element.

    Input: [40, 10, 5, 2, 1, -3],  target = 5,  Output = 5

    Input: [2, 4, 6, 9, 11, 12, 14, 20, 36, 48], target = 36,  Output = 8
*/

/*
    Algorithm Explanation (Order-Agnostic Binary Search) -

    Order-Agnostic Binary Search works for both ascending and descending sorted arrays. The steps are:

    1. Determine order: Compare arr[start] and arr[end]:
        - If arr[start] < arr[end], the array is ascending.
        - Otherwise, it is descending.

    2. Perform Binary Search:
        - Find the middle index: mid = Math.floor(start + (end - start) / 2).
        - If arr[mid] == target, return mid (found).
        - Adjust start or end based on the order:
            - Ascending Order:
            - If target < arr[mid], search left (end = mid - 1).
            - Else, search right (start = mid + 1).
            - Descending Order:
            - If target > arr[mid], search left (end = mid - 1).
            - Else, search right (start = mid + 1).

    3. Return -1 if the target is not found.


    Input: [40, 10, 5, 2, 1, -3], target = 5

    | Iteration | start | end | mid  | arr[mid] | Order (Descending) |  Comparison               |    New start / end   |
    |-----------|-------|-----|------|----------|--------------------|---------------------------|----------------------|
    | 1         | 0     | 5   | 2    |  5       | Descending         | 5 == 5 → Target found     |    Return 2          |

    Output: 2 (Index of 5 in the array)

*/

const orderAgnosticBS = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;
    let isAscending = arr[start] < arr[end];

    while (start <= end) {
        const mid = Math.floor(start + (end - start) / 2);

        if (arr[mid] === target) {
            return mid;
        }

        if (isAscending) {
            if (target < arr[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (target > arr[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
    }
    return -1;
};
console.log(orderAgnosticBS([40, 10, 5, 2, 1, -3], 5)); // Output: 2
console.log(orderAgnosticBS([2, 4, 6, 9, 11, 12, 14, 20, 36, 48], 36)); // Output: 8

/*
    Input: [2, 4, 6, 9, 11, 12, 14, 20, 36, 48],  target = 36

    1. Determine Order:
        - arr[start] = 2, arr[end] = 48
        - Since 2 < 48, the array is ascending.

    2. Perform Binary Search:

    | Iteration | start | end  | mid  | arr[mid] | Order (Ascending) | Comparison                  |    New start / end   |
    |-----------|-------|------|------|------- --|-------------------|-----------------------------|----------------------|
    | 1         | 0     | 9    | 4    |  11      |   Ascending       | 36 > 11 → Search right half |  start = 5           |
    | 2         | 5     | 9    | 7    |  20      |   Ascending       | 36 > 20 → Search right half |  start = 8           |
    | 3         | 8     | 9    | 8    |  36      |   Ascending       | 36 == 36 → Target found     |  Return 8            |

    Output: 8
*/
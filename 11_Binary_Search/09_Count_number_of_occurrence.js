/*   
    Count number of occurrences in a sorted array
    <-------------------------------------------->

    Given a sorted array Arr of size N and a number X, you need to find the number of occurrences of X in Arr.

        The total number of occurrences = (last index - first index + 1) and return this length as the answer.

    Example - 1
    
        Input: [1, 1, 2, 2, 2, 2, 3], target = 2, Output: 4
        
        Explanation: target = 2 occurs 4 times in the given array so the output is 4.

    Example - 2
        
        Input: [1, 1, 2, 2, 2, 2, 3, 5], target = 4, Output: 0
        
        Explanation: target = 4 is not present in the given array so the output is 0.
*/

/*
    Approach :-

        - Use binary search to find the index of first occurrence of the target.
        - Use binary search to find the index of last occurrence of the target.

        If the target is found, the number of occurrences = lastPosIndex - firstPosIndex + 1.
*/

/*
    Input: [1, 1, 2, 2, 2, 2, 3],  target = 2


    Step 1: Dry Run for findFirstPosition(arr, 2)

        Goal: Find the first occurrence of 2.

        | Step | start | end |      mid (calculated)       | arr[mid] | Comparison (target = 2)  |                  Action                  |
        |------|-------|-----|-----------------------------|----------|--------------------------|------------------------------------------|
        | 1    | 0     | 6   | Math.floor(0 + (6-0)/2) = 3 |    2     |         2 == 2           | Update firstPos = 3, move left (end = 2) |
        | 2    | 0     | 2   | Math.floor(0 + (2-0)/2) = 1 |    1     |         2 > 1            | Move right (start = 2)                   |
        | 3    | 2     | 2   | Math.floor(2 + (2-2)/2) = 2 |    2     |         2 == 2           | Update firstPos = 2, move left (end = 1) |
        | 4    | 2     | 1   | - (loop terminates)         |    -     |           -              | Return firstPos = 2                      |

        First occurrence of 2 is at index 2.


    Step 2: Dry Run for findLastPosition(arr, 2)
    
        Goal: Find the last occurrence of 2.

        | Step | start | end |      mid (calculated)       | arr[mid] | Comparison (target = 2)  |                  Action                    |
        |------|-------|-----|-----------------------------|----------|--------------------------|--------------------------------------------|
        | 1    | 0     | 6   | Math.floor(0 + (6-0)/2) = 3 |     2    |         2 == 2           | Update lastPos = 3, move right (start = 4) |
        | 2    | 4     | 6   | Math.floor(4 + (6-4)/2) = 5 |     2    |         2 == 2           | Update lastPos = 5, move right (start = 6) |
        | 3    | 6     | 6   | Math.floor(6 + (6-6)/2) = 6 |     3    |         2 < 3            | Move left (end = 5)                        |
        | 4    | 6     | 5   | - (loop terminates)         |     -    |         -                | Return lastPos = 5                         |

        Last occurrence of 2 is at index 5.


    Step 3: Compute the Count

        count = lastPos - firstPos + 1 = 5 - 2 + 1 = 4

        Final Output: 4

    Explanation
    
    - findFirstPosition(arr, 2) finds the first occurrence of 2 at index 2.
    - findLastPosition(arr, 2) finds the last occurrence of 2 at index 5.
    - The total occurrences of 2 in the array are 5 - 2 + 1 = 4.
    - The function correctly returns 4.
*/

const findFirstPosition = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;
    let firstPos = -1;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (target < arr[mid]) {
            end = mid - 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            firstPos = mid; /* found target, continue searching on the left. */
            end = mid - 1;
        }
    }
    return firstPos;
};

const findLastPosition = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;
    let lastPos = -1;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (target < arr[mid]) {
            end = mid - 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            lastPos = mid; /* found target, continue searching on the right. */
            start = mid + 1;
        }
    }

    return lastPos;
};

const countOccurrences = (arr, target) => {
    const firstPosIndex = findFirstPosition(arr, target);
    if (firstPosIndex === -1) return 0; // target not found

    const lastPosIndex = findLastPosition(arr, target);
    return lastPosIndex - firstPosIndex + 1;
};

console.log(countOccurrences([1, 1, 2, 2, 2, 2, 3], 2));  // Output: 4
console.log(countOccurrences([1, 1, 2, 2, 2, 2, 3], 1));  // Output: 2
console.log(countOccurrences([1, 1, 2, 2, 2, 2, 3], 3));  // Output: 1
console.log(countOccurrences([1, 1, 2, 2, 2, 2, 3], 4));  // Output: 0

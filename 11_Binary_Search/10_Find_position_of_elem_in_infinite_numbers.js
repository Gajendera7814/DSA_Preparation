/*
    Find position of an element in a sorted array of infinite numbers
    <---------------------------------------------------------------->

    To find the position of an element in an infinite sorted array, you can use a modified binary search approach. 
        Start by establishing bounds: 
        
        initialize a low pointer to the first element and a high pointer to the second element, then double the high 
        pointer until the element you are searching for is within the bounds defined by the low and high pointers. 
        Once the bounds are set, you can apply the traditional binary search algorithm within those bounds 
        to locate the element's position. 
        
        If the element is found, return its index; otherwise, return -1.

    Note - In this problem we don't know the size of the array. so we are not allow to use arr.length

    Input: [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 20, 23, 30], target = 15


    Step - 1 To check target lies in this range or not if not lies then double the high pointer 
         s  e
        [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 20, 23, 30]

    Step - 2 To check target lies in this range or not if not lies then double the high pointer 
               s        e
        [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 20, 23, 30]

    Step - 3 Here target lies in this range so we use Binary Search.
                           s                          e
        [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 20, 23, 30]
*/

/*
    Input - [1, 3, 5, 7, 9, 10, 13, 15, 17, 19, 21, 24, 27, 30],  target = 17

    Step 1: Finding the Range (Exponential Search)

        Goal: Expand start and end to identify the subarray where target = 17 might exist.

        | Step | start | end | arr[end] | Comparison (target = 17) |                Action                |
        |------|-------|-----|----------|--------------------------|--------------------------------------|
        | 1    | 0     | 1   |  3       |   17 > 3                 | Expand range (start = 2, end = 5)    |
        | 2    | 2     | 5   |  10      |   17 > 10                | Expand range (start = 6, end = 13)   |
        | 3    | 6     | 13  |  30      |   17 < 30                | Stop expanding (found range [6, 13]) |

        Found the range: [start = 6, end = 13]


    Step 2: Binary Search in the Range [6, 13]
    
        Goal: Find the index of 17 in [13, 15, 17, 19, 21, 24, 27, 30].

        | Step | start | end |         mid (calculated)     |        arr[mid]          | Comparison (target = 17) |            Action       |
        |------|-------|-----|------------------------------|--------------------------|--------------------------|-------------------------|
        | 1    | 6     | 13  | Math.floor(6 + (13-6)/2) = 9 |           19             |            17 < 19       | Move left (end = 8)     |
        | 2    | 6     | 8   | Math.floor(6 + (8-6)/2) = 7  |           15             |            17 > 15       | Move right (start = 8)  |
        | 3    | 8     | 8   | Math.floor(8 + (8-8)/2) = 8  |           17             |            17 == 17      | Return 8                |

    Final Output: 8


    Explanation -

    1. Finding the range

        - Initially, start = 0, end = 1.
        - The range is doubled until arr[end] is greater than or equal to target = 17.
        - The valid range found is [6, 13].

    2. Binary search within [6, 13]

        - The binary search correctly finds 17 at index 8.

    3. Result

        - The function returns 8, which is the correct index of 17 in the infinite sorted array.
*/

const positionInInfiniteArray = (arr, target) => {
    /* First find the range where the target might lie */
    let start = 0;
    let end = 1;

    /* Expand the range until the target is less than arr[end] */
    while (arr[end] < target) {
        let temp = end + 1; /* Keep track of the previous end Double the box size for the next range */
        end = end + (end - start + 1) * 2;
        start = temp; /* Move start to the previous end + 1 */
    }

    return binarySearch(arr, target, start, end);
};

const binarySearch = (arr, target, start, end) => {
    while (start <= end) {
        const mid = Math.floor(start + (end - start) / 2);

        if (target < arr[mid]) {
            end = mid - 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
};
const arr = [1, 3, 5, 7, 9, 10, 13, 15, 17, 19, 21, 24, 27, 30]; // Infinite sorted array
const target = 17;
console.log(positionInInfiniteArray(arr, target)); // Output: 8

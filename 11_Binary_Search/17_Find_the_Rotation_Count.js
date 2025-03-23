/*
    Find the Rotation Count in Rotated Sorted array 
    <---------------------------------------------->

    The rotation count in a rotated sorted array refers to the number of times the array has been rotated from its 
    original sorted order. This count can be determined by finding the index of the minimum element in the rotated array, 
    as the number of rotations corresponds to this index. A linear solution involves scanning the array to find this 
    minimum element's index.

    Example - 1

        Input: [15, 18, 2, 3, 6, 12], Output: 2
        
        Explanation: Initial array must be [2, 3, 6, 12, 15, 18]. We get the given array after rotating the initial array twice.

    Example - 2

        Input: [7, 9, 11, 12, 5], Output: 4

    Example - 3

        Input: [7, 9, 11, 12, 15], Output: 0
*/


/*
    Key Observations:
    
    - The pivot element is the largest element in the rotated array.
    - The number of rotations is the index of the pivot + 1.
    - A binary search is used to efficiently find the pivot.


    Input: [4, 5, 6, 7, 0, 1, 2]

    | Iteration |  start |  end |  mid | arr[mid] | arr[mid + 1] | arr[mid - 1] |          Condition Met          |  Action Taken  | Pivot Found? |
    |-----------|--------|------|------|----------|--------------|--------------|---------------------------------|----------------|--------------|
    | 1         | 0      | 6    | 3    | 7        |  0           |  6           | arr[mid] > arr[mid + 1] (7 > 0) | Return mid = 3 |    ✅ Yes    |


    Final Calculation -

    Pivot index = 3  
    Rotation count = pivot + 1 = 3 + 1 = 4
    Output: 4

    - This approach efficiently finds the number of rotations in logarithmic time.
    - The pivot element is identified using a modified binary search.
    - The method works for distinct elements in a rotated sorted array.

    Final Output: 4
*/

const RotationCount = (arr) => {
    let pivot = findPivot(arr);
    return pivot + 1;
};

/* use this for non duplicates */
const findPivot = (arr) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = start + Math.floor((end - start) / 2);

        /* 4 cases to find the pivot */
        if (mid < end && arr[mid] > arr[mid + 1]) {
            return mid;
        }

        if (mid > start && arr[mid] < arr[mid - 1]) {
            return mid - 1;
        }

        if (arr[start] >= arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return -1;
};
console.log(RotationCount([7, 9, 11, 12, 15])); // Output: 0
console.log(RotationCount([15, 18, 2, 3, 6, 12])); // Output: 2
console.log(RotationCount([4, 5, 6, 7, 0, 1, 2])); // Output: 4

/*
    Time Complexity Analysis -

        - The algorithm uses binary search, which reduces the search space in each step.
        - Time Complexity: O(log N)

    Space Complexity: O(1) (constant extra space used)
*/


/*<---------------------------------------- use this when arr contains duplicates ---------------------------------->*/

/*
    Key Points :-

    1. Uses Binary Search to find the pivot efficiently.
    2. Handles duplicate elements by skipping unnecessary comparisons.
    3. If the left half is sorted, the pivot must be in the right half.
    4. If arr[start] == arr[mid] == arr[end], the algorithm checks if start or end is the pivot before moving inwards.


    Input: [15, 6, 18, 2, 3, 6, 12, 3]

    | Iteration |  start |  end |  mid | arr[mid] | arr[mid + 1] | arr[mid - 1] |           Condition Met          |     Action Taken   | Pivot Found? |
    |-----------|--------|------|------|----------|--------------|--------------|----------------------------------|--------------------|--------------|
    | 1         | 0      | 7    | 3    | 2        |  3           |  18          | arr[mid] < arr[mid - 1] (2 < 18) | Return mid - 1 = 2 |     ✅ Yes   |


    Final Calculation -

    - Pivot index = 2
    - Pivot element = 18
    - Output: 2 (Pivot index)
*/

const findPivotWithDuplicates = (arr) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = start + Math.floor((end - start) / 2);

        // 4 cases to find the pivot
        if (mid < end && arr[mid] > arr[mid + 1]) {
            return mid;
        }
        if (mid > start && arr[mid] < arr[mid - 1]) {
            return mid - 1;
        }
        // if elements at middle, start, end are equal then just skip the duplicates.
        if (arr[mid] === arr[start] && arr[mid] === arr[end]) {
            // skip the duplicates

            // Note :- what if these elements as start and were the pivot??
            // check if start is pivot
            if(arr[start] > arr[start + 1]){
                return start;
            }
            start++;

            // check if end is pivot
            if(arr[end] < arr[end - 1]){
                return end - 1;
            }
            end--;
        }
        // left side is sorted, so pivot should be in right
        else if (arr[start] <= arr[mid] || (arr[start] === arr[mid] && arr[mid] > arr[end])) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
};
console.log(findPivotWithDuplicates([15, 6, 18, 2, 3, 6, 12, 3])); // Output: 2



/*<------------------------------------------------- Another Way --------------------------------------------------->*/

/*

    Key Observations:

    - The minimum element is the pivot, which represents how many times the array has been rotated.
    - If the search space is already sorted, the first element is the smallest.
    - Binary Search is used to efficiently locate the pivot.


    Input: [4, 5, 6, 7, 0, 1, 2, 3]

    | Iteration | low | high | mid | arr[low] | arr[mid] | arr[high] | Condition Met | Action Taken | index Update |
    |-----------|------|------|------|----------|----------|---------|---------------|--------------|--------------|
    | 1         | 0    | 7    | 3    | 4        | 7        | 3       | Left part is sorted (4 ≤ 7) | Update ans = 4, move low = 4 | index = 0 |
    | 2         | 4    | 7    | 5    | 0        | 1        | 3       | Left part is sorted (0 ≤ 1) | Update ans = 0, move low = 6 | index = 4 |
    | 3         | 6    | 7    | 6    | 2        | 2        | 3       | Search space sorted (2 ≤ 3) | ans = 0, break loop | index = 4 | 


    Final Calculation -

    - Minimum element = 0
    - Pivot index = 4
    - Rotation count = 4
    - Output: 4
*/

const findKRotation = (arr) => {
    let low = 0, high = arr.length - 1;
    let ans = Infinity;
    let index = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        /* If search space is already sorted, then arr[low] will always be the minimum in that search space. */
        if (arr[low] <= arr[high]) {
            if (arr[low] < ans) {
                index = low;
                ans = arr[low];
            }
            break;
        }

        /* If left part is sorted. */
        if (arr[low] <= arr[mid]) {
            /* Keep the minimum */
            if (arr[low] < ans) {
                index = low;
                ans = arr[low];
            }

            /* Eliminate left half */
            low = mid + 1;
        } else { 
            /* If right part is sorted, Keep the minimum */
            if (arr[mid] < ans) {
                index = mid;
                ans = arr[mid];
            }

            /* Eliminate right half */
            high = mid - 1;
        }
    }
    return index;
};
console.log(findKRotation([4, 5, 6, 7, 0, 1, 2, 3])); // Output: 4

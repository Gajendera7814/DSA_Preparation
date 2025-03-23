/*
    Rotated Binary Search in Array with Duplicate Values
    <--------------------------------------------------->

    Input: [2, 5, 6, 0, 0, 1, 2],  target = 0, Output = 3
*/


const RotatedBSinArrayWithDuplicateValues = (arr, target) => {
    const pivot = findPivotWithDuplicates(arr);

    /* If no pivot, the array is not rotated, perform a regular binary search */
    if (pivot === -1) {
        return binarySearch(arr, target, start = 0, end = arr.length - 1);
    }

    /* If we found the pivot, we have 2 sorted subarrays */
    if (arr[pivot] === target) {
        return pivot;
    }

    /* If target is in the left half */
    if (target >= arr[0]) {
        return binarySearch(arr, target, start = 0, end = pivot - 1);
    }

    /*Else target is in the right half */
    return binarySearch(arr, target, start = pivot + 1, end = arr.length - 1);
};

const findPivotWithDuplicates = (arr) => {
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

        /* if elements at middle, start, end are equal then just skip the duplicates. */
        if (arr[mid] === arr[start] && arr[mid] === arr[end]) {
            // skip the duplicates

            // Note :- what if these elements as start and were the pivot ??
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

        /* left side is sorted, so pivot should be in right */
        else if (arr[start] <= arr[mid] || (arr[start] === arr[mid] && arr[mid] > arr[end])) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
};

const binarySearch = (arr, target, start, end) => {
    let result = -1;  // Track the leftmost occurrence
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);

        if (arr[mid] === target) {
            result = mid;  // Potential result found, continue searching to the left
            end = mid - 1; // Keep searching for the first occurrence
        } else if (target < arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return result;
};
console.log(RotatedBSinArrayWithDuplicateValues([3, 9, 2, 2, 2], 2)); // Output: 2
console.log(RotatedBSinArrayWithDuplicateValues([2, 5, 6, 0, 0, 1, 2], 0)); // Output: 3

/*
    Search in Rotated Sorted Array      Leetcode Problem
    <---------------------------->     <---------------->

    Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, 
    or -1 if it is not in nums.

    1. Identify the mid-point of the array.
    2. Check if the mid-point value equals the target.
    3. Determine which side of the array is sorted (either left or right of mid-point).
    4. Based on the sorted side, decide whether to continue searching on the left or right.

    Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0, Output: 4
    Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3, Output: -1
    Input: nums = [1], target = 0, Output: -1
*/

/*
    Approach :-

    1. find the pivot in the array.

        Pivot --> from where your next numbers are ascending.

        [4, 5, 6, 7, 0, 1, 2]   ---> here 7 is pivot element (it is a largest value in an array)
        <---------> <------->
           asc         asc

    2. Search  in first half --> use simple Binary Search (0 to pivot);

    3. Otherwise, Search in second half --> use simple Binary Search (pivot + 1 to end);

        Find Pivot -

         0  1  2  3  4  5  6  7
        [3, 4, 5, 6, 7, 0, 1, 2]   mid = 7/2 = 3
         s        m           e

        3, 4, 5, 6, 7 ------> ascending
        0, 1, 2 ------> ascending
        7, 0 ------> only these 2 elements will be descending

    Ans :- 
        
    Case - 1.    when you find that arr[mid] > arr[mid + 1] element i.e Pivot element.
    Case - 2.   if mid element < (mid - 1) element, i.e also may be ans.
    Case - 3.   if start element >= mid element

         0  1  2  3  4  5  6  7   8
        [4, 5, 6, 7, 3, 2, 1, 0, -1]
         s           m            e

        [3, 2, 1, 0, -1] ------> smaller than s

        In this case, all elements from mid, will be < start. hence we can ignore all these elements, since we are looking for Peak i.e largest element.

        end = mid - 1
    
    Case - 4.   if Start element < mid element

         0  1  2  3  4
        [3, 4, 5, 6, 2]
         s     m     e

        start = mid + 1
*/


const searchInRotatedSortedArray = (arr, target) => {
    const pivot = findPivot(arr);

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

    /* Else target is in the right half */
    return binarySearch(arr, target, start = pivot + 1, end = arr.length - 1);
};

/* This will not work in duplicate values */
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

const binarySearch = (arr, target, start, end) => {
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);

        if (target < arr[mid]) {
            end = mid - 1;
        } else if (target > arr[mid]){
            start = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
};

console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1 (not found)



/*<------------------------------------------------ Another Way ----------------------------------------------------->*/

/*
    Input: [4, 5, 6, 7, 0, 1, 2],  target = 0

    | Iteration |  start |  end |  mid |  arr[mid] | arr[start] | arr[end] | Condition (arr[mid] == target) | Left Half Sorted (arr[start] <= arr[mid]) |                     Action                 |
    |-----------|--------|------|------|-----------|------------|----------|--------------------------------|-------------------------------------------|--------------------------------------------|
    | 1         | 0      | 6    | 3    | 7         | 4          | 2        |   No                           |           Yes (4 ≤ 7)                     | start = mid + 1 = 4 (search in right half) |
    | 2         | 4      | 6    | 5    | 1         | 0          | 2        |   No                           |           Yes (0 ≤ 1)                     | end = mid - 1 = 4 (search in left half)    |
    | 3         | 4      | 4    | 4    | 0         | 0          | 0        |   Yes                          |               -                           | Return mid = 4                             |

    Final Output: The index of target = 0 in the rotated sorted array [4, 5, 6, 7, 0, 1, 2] is 4.
*/

const searchinRotatedSortedArray = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = Math.floor(start + (end - start) / 2);

        /* Check if mid element is the target */
        if (arr[mid] === target) {
            return mid;
        }

        /* Determine which half is sorted */
        if (arr[start] <= arr[mid]) {
            /* Left half is sorted */
            if (arr[start] <= target && target < arr[mid]) {
                end = mid - 1; /* Search in the left half */
            } else {
                start = mid + 1; /* Search in the right half */
            }
        } else {
            /* Right half is sorted */
            if (arr[mid] < target && target <= arr[end]) {
                start = mid + 1; /* Search in the right half */
            } else {
                end = mid - 1; /* Search in the left half */
            }
        }
    }
    return -1;
};
console.log(searchinRotatedSortedArray([1], 0)); // Output: -1
console.log(searchinRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0));  // Output: 4
console.log(searchinRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 3));  // Output: -1


/*
    Find in Mountain Array     Leetcode Problem
    <-------------------->     <--------------->

    Problem Statement - To find an element in a mountain array, you need to first identify the peak of the mountain. 
    A mountain array is defined as being strictly increasing up to a certain point (the peak) and then strictly decreasing 
    thereafter. You can use a binary search to efficiently find the element X you are looking for. If X is found, return 
    its smallest index; otherwise, return -1.

    The task is to find the smallest index of X in the given array. If no such index is found, print -1.

    Input: array = [1, 2, 3, 4, 5, 3, 1], target = 3, Output: 2
    
    Explanation: 3 exists in the array, at index = 2 and index = 5. Return the minimum index, which is 2.

    Input: array = [0, 1, 2, 4, 2, 1], target = 3, Output: -1
    
    Explanation: 3 does not exist in the array, so we return -1.
*/

/*
    Dry Run :-
    ------------

    Input: [1, 2, 3, 4, 5, 3, 1], target: 3


    1. Initial call to findInMountainArray :-
    ------------------------------------------

    - Input: [1, 2, 3, 4, 5, 3, 1], target = 3
    - The function begins by finding the peak element using findPeak(arr)


    Step 1: Finding the Peak Element (findPeak function)

        const findPeak = (arr) => {
            let start = 0, end = arr.length - 1;

            while (start < end) {
                const mid = Math.floor((start + end) / 2);
                if (arr[mid] > arr[mid + 1]) {
                    end = mid;
                } else {
                    start = mid + 1;
                }
            }
            return start;
        };

        Dry Run of findPeak(arr)
        -------------------------

        - Initial Values :- start = 0, end = 6 

        First Iteration :-

            - mid = Math.floor((0 + 6) / 2) = 3
            - Compare arr[mid] = 4 with arr[mid + 1] = 5. Since 4 < 5, move start to mid + 1 = 4

        Second Iteration :-

            - start = 4, end = 6
            - mid = Math.floor((4 + 6) / 2) = 5
            - Compare arr[mid] = 3 with arr[mid + 1] = 1. Since 3 > 1, move end to mid = 5

        Third Iteration :-

            - start = 4, end = 5
            - mid = Math.floor((4 + 5) / 2) = 4
            - Compare arr[mid] = 5 with arr[mid + 1] = 3. Since 5 > 3, move end to mid = 4

        Now start = end = 4, so we have found the peak at index 4 (value 5)

        Peak index = 4

    Step 2: Searching in the Left Half (orderAgnosticBS function)

        Now that we know the peak is at index 4, we perform a binary search in the left half (from index 0 to 4) 
        using orderAgnosticBS.

        const leftIndex = orderAgnosticBS(arr, target, 0, peak); // orderAgnosticBS(arr, target, 0, 4)

        We search in the subarray [1, 2, 3, 4, 5] with start = 0 and end = 4.

        Dry Run of orderAgnosticBS(arr, 3, 0, 4)

        Initial Values :- start = 0, end = 4

            - isAscending = arr[start] < arr[end] = 1 < 5 = true

        First Iteration :-
        
            - mid = Math.floor((0 + 4) / 2) = 2
            - Compare arr[mid] = 3 with target = 3. They are equal!

        Result :- Target found at index 2. Return 2.

        Since the target 3 was found in the left half of the array at index 2, the function stops here and returns 2.

    Final Output :- The target 3 is found at index 2, so findInMountainArray returns 2.
*/

const findInMountainArray = (arr, target) => {
    const peak = findPeak(arr);

    const leftIndex = orderAgnosticBS(arr, target, start = 0, peak);
    if (leftIndex !== -1) {
        return leftIndex;
    }
    return orderAgnosticBS(arr, target, peak + 1, end = arr.length - 1);
};

const findPeak = (arr) => {
    let start = 0, end = arr.length - 1;

    while (start < end) {
        const mid = Math.floor((start + end) / 2);
        if (arr[mid] > arr[mid + 1]) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return start;
};

const orderAgnosticBS = (arr, target, start, end) => {
    const isAscending = arr[start] < arr[end];

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        
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
console.log(findInMountainArray([0, 1, 2, 4, 2, 1], 3)); // Output: -1
console.log(findInMountainArray([1, 2, 3, 4, 5, 3, 1], 3)); // Output: 2
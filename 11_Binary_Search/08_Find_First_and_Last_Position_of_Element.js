/*
    Find First and Last Position of Element in Sorted Array    Leetcode Problem
    <----------------------------------------------------->    <--------------->

    To find the first and last positions of an element in a sorted array containing possibly duplicate elements, 
    you can perform a binary search. If the element exists, you will first search for the leftmost (first) occurrence 
    and then the rightmost (last) occurrence of that element. If the element is not found, both positions should return -1.

    If target is not found in the array, return [-1, -1].

    Time complexity :- O(log n)

    Input: nums = [5, 7, 7, 8, 8, 10], target = 8, Output: [3, 4]

    Input: nums = [5, 7, 7, 8, 8, 10], target = 6, Output: [-1, -1]

    Input: nums = [], target = 0, Output: [-1, -1]
*/

/*
    Dry Run :-
    ------------

    Input: [5, 7, 7, 8, 8, 10]

    <<----------------------------------------------- First Call---------------------------------------------------->>

    First Call :- Find the Start Index (findStartIndex = true)
        - Call: search([5, 7, 7, 8, 8, 10], 7, true)

        Initial values: start = 0, end = 5, ans = -1

    Binary Search Process -
    
        First Iteration :-

            - mid = Math.floor(0 + (5 - 0) / 2) = 2
            - nums[mid] = 7, which is equal to the target.
            - ans = mid = 2 (we found 7 at index 2).

            Since findStartIndex = true, we try to find an earlier occurrence by moving end = mid - 1 = 1

        Second Iteration :-

            - mid = Math.floor(0 + (1 - 0) / 2) = 0
            - nums[mid] = 5, which is less than the target.
            - Move start = mid + 1 = 1 (to the right).

        Third Iteration :-

            - mid = Math.floor(1 + (1 - 1) / 2) = 1
            - nums[mid] = 7, which is equal to the target.
            - ans = mid = 1 (we found an earlier occurrence at index 1).
            
            Since findStartIndex = true, we move end = mid - 1 = 0, exiting the loop.

        Result of First Call :-

        - Start index = 1, so ans[0] = 1

    <<------------------------------------------------ Second Call ------------------------------------------------>>

    Second Call: Find the End Index (findStartIndex = false)
        - Call: search([5, 7, 7, 8, 8, 10], 7, false)

        Initial values: start = 0, end = 5, ans = -1

    Binary Search Process
        
        First Iteration :-

            - mid = Math.floor(0 + (5 - 0) / 2) = 2
            - nums[mid] = 7, which is equal to the target.
            - ans = mid = 2 (we found 7 at index 2).
            
            Since findStartIndex = false, we try to find a later occurrence by moving start = mid + 1 = 3

        Second Iteration :-

            - mid = Math.floor(3 + (5 - 3) / 2) = 4
            - nums[mid] = 8, which is greater than the target.
            - Move end = mid - 1 = 3 (to the left).

        Third Iteration :-

            - mid = Math.floor(3 + (3 - 3) / 2) = 3
            - nums[mid] = 8, which is greater than the target.
            - Move end = mid - 1 = 2, exiting the loop.

        Result of Second Call :-

        - End index = 2, so ans[1] = 2

    Final Result :- returns [1, 2]

    Summary of Logic :-
        First Binary Search (Start Index) :-  
        It finds the first occurrence of the target by moving end to the left when a match is found.
    
        Second Binary Search (End Index) :-  
        It finds the last occurrence of the target by moving start to the right when a match is found.
*/

const searchRange = (nums, target) => {
    let ans = [-1, -1];

    let start = search(nums, target, findStartIndex = true);
    let end = search(nums, target, findStartIndex = false);
    ans[0] = start;
    ans[1] = end;

    return ans;
};

const search = (nums, target, findStartIndex) => {
    let start = 0;
    let end = nums.length - 1;
    let ans = -1;

    while(start <= end) {
        const mid = Math.floor(start + (end - start) / 2);

        if(target < nums[mid]){
            end = mid - 1;
        } else if(target > nums[mid]){
            start = mid + 1;
        } else {
            ans = mid;
            if(findStartIndex) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
    }
    return ans;
};
console.log(searchRange([5, 7, 7, 8, 8, 10], 7)); // Output: [ 1, 2 ]

/*
    Input - [5, 7, 7, 8, 8, 10],  target = 7

    search(nums, target, findStartIndex = true)

        Goal: Find the first occurrence of 7.

        | Step | start | end |      mid (calculated)       | nums[mid] | Comparison (target = 7)  |             Action                  |
        |------|-------|-----|-----------------------------|-----------|--------------------------|-------------------------------------|
        | 1    | 0     | 5   | Math.floor(0 + (5-0)/2) = 2 |     7     |        7 == 7            | Update ans = 2, move left (end = 1) |
        | 2    | 0     | 1   | Math.floor(0 + (1-0)/2) = 0 |     5     |        7 > 5             | Move right (start = 1)              |
        | 3    | 1     | 1   | Math.floor(1 + (1-1)/2) = 1 |     7     |        7 == 7            | Update ans = 1, move left (end = 0) |
        | 4    | 1     | 0   | - (loop terminates)         |     -     |          -               | Return ans = 1                      |

        First occurrence of 7 is at index 1.


    search(nums, target, findStartIndex = false

        Goal: Find the last occurrence of 7.

        | Step | start | end |       mid (calculated)      | nums[mid] | Comparison (target = 7)  |             Action                     |
        |------|-------|-----|-----------------------------|-----------|--------------------------|----------------------------------------|
        | 1    | 0     | 5   | Math.floor(0 + (5-0)/2) = 2 |    7      |        7 == 7            | Update ans = 2, move right (start = 3) |
        | 2    | 3     | 5   | Math.floor(3 + (5-3)/2) = 4 |    8      |        7 < 8             | Move left (end = 3)                    |
        | 3    | 3     | 3   | Math.floor(3 + (3-3)/2) = 3 |    8      |        7 < 8             | Move left (end = 2)                    |
        | 4    | 3     | 2   | - (loop terminates)         |    -      |          -               | Return ans = 2                         |

        Last occurrence of 7 is at index 2.

    Final Output: [1, 2]


    Explanation:

    - The function finds the first and last occurrence of target in a sorted array.
    - The first occurrence (findStartIndex = true) is found at index 1.
    - The last occurrence (findStartIndex = false) is found at index 2.
    - The final output is [1, 2].
*/


/*<--------------------------------------------------- Another Way ------------------------------------------------>*/

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
            firstPos = mid;  /* target found, continue searching on the left */
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
            lastPos = mid;  /* target found, continue searching on the right */
            start = mid + 1;
        }
    }
    return lastPos;
};

const findFirstAndLastPosition = (arr, target) => {
    const firstPos = findFirstPosition(arr, target);
    const lastPos = findLastPosition(arr, target);

    return [firstPos, lastPos];
};
console.log(findFirstAndLastPosition([5, 7, 7, 8, 8, 10], 8)); // Output: [3, 4]
console.log(findFirstAndLastPosition([5, 7, 7, 8, 8, 10], 6)); // Output: [-1, -1]

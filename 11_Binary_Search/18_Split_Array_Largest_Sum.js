/*
    Split Array Largest Sum     Leetcode Problem
    <--------------------->    <---------------->

    Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest 
    sum of any subarray is minimized.

    Return the minimized largest sum of the split.

    A subarray is a contiguous part of the array.

    Example - 1

        Input: nums = [7, 2, 5, 10, 8], k = 2, Output: 18

        Explanation: There are four ways to split nums into two subarrays.
        The best way is to split it into [7, 2, 5] and [10, 8], where the largest sum among the two subarrays is only 18.

    Example - 2

        Input: nums = [1, 2, 3, 4, 5], k = 2, Output: 9

        Explanation: There are four ways to split nums into two subarrays.
        The best way is to split it into [1, 2, 3] and [4, 5], where the largest sum among the two subarrays is only 9.
*/

/*
    Dry Run :-
    -------------

    arr = [7, 2, 5, 10, 8], k = 2, start = 0, end = 0

    <------------------------------------------- Find "start" and "end" ---------------------------------------------->
        
        start is initialized to the maximum element of the array.
        end is initialized to the sum of all elements in the array.

        1. First iteration :- i = 0, arr[0] = 7
            start = Math.max(0, 7) = 7
            end += 7, so end = 7
        
        2. Second iteration :- i = 1, arr[1] = 2
            start = Math.max(7, 2) = 7
            end += 2, so end = 9
        
        3. Third iteration :- i = 2, arr[2] = 5
            start = Math.max(7, 5) = 7
            end += 5, so end = 14
        
        4. Fourth iteration :- i = 3, arr[3] = 10
            start = Math.max(7, 10) = 10
            end += 10, so end = 24
        
        5. Fifth iteration :- i = 4, arr[4] = 8
            start = Math.max(10, 8) = 10
            end += 8, so end = 32

    After this loop:

        start = 10 (the maximum element in the array)
        end = 32 (the sum of all elements)


    <---------------------------------------------- Step 2: Binary Search -------------------------------------------->

    start = 10, end = 32

    <--------------------- First Binary Search Iteration :- mid = 10 + Math.floor((32 - 10) / 2) = 21 ---------------->
  
    Now, we iterate over the array to determine how many subarrays are needed if the maximum sum allowed per subarray is 21.

        1. First iteration :- sum = 0 + 7 = 7 (add arr[0] = 7 to the first subarray)
        2. Second iteration :- sum = 7 + 2 = 9 (add arr[1] = 2 to the first subarray)
        3. Third iteration :- sum = 9 + 5 = 14 (add arr[2] = 5 to the first subarray)
        4. Fourth iteration :- sum = 14 + 10 = 24 (adding arr[3] = 10 exceeds mid = 21, so create a new subarray)
            - Start a new subarray with sum = 10 and pieces = 2
        5. Fifth iteration :- sum = 10 + 8 = 18 (add arr[4] = 8 to the second subarray)

    At the end of this iteration, we have divided the array into 2 subarrays [7, 2, 5] and [10, 8], 
    which is valid since we can split the array into k = 2 subarrays. So, we reduce the end to mid to see 
    if we can further minimize the largest sum.

    start = 10, end = mid = 21


    <--------------------- Second Binary Search Iteration :- mid = 10 + Math.floor((21 - 10) / 2) = 15 --------------->

    We iterate over the array again, with mid = 15

        1. First iteration :- sum = 0 + 7 = 7 (add arr[0] = 7 to the first subarray)
        2. Second iteration :- sum = 7 + 2 = 9 (add arr[1] = 2 to the first subarray)
        3. Third iteration :- sum = 9 + 5 = 14 (add arr[2] = 5 to the first subarray)
        4. Fourth iteration :- sum = 14 + 10 = 24 (adding arr[3] = 10 exceeds mid = 15, so create a new subarray)
            - Start a new subarray with sum = 10 and pieces = 2
        5. Fifth iteration :- sum = 10 + 8 = 18 (adding arr[4] = 8 exceeds mid = 15, so create another new subarray)
            - Start a new subarray with sum = 8 and pieces = 3

    At the end of this iteration, we have divided the array into 3 subarrays [7, 2, 5], [10], and [8].
    Since we need only k = 2 subarrays but ended up with 3, we need to increase the allowed subarray 
    sum by increasing start.

    start = mid + 1 = 16, end = 21


    <------------------ Third Binary Search Iteration :- mid = 16 + Math.floor((21 - 16) / 2) = 18 ------------------>

    We iterate over the array again, with mid = 18.

        1. First iteration :- sum = 0 + 7 = 7 (add arr[0] = 7 to the first subarray)
        2. Second iteration :- sum = 7 + 2 = 9 (add arr[1] = 2 to the first subarray)
        3. Third iteration :- sum = 9 + 5 = 14 (add arr[2] = 5 to the first subarray)
        4. Fourth iteration :- sum = 14 + 10 = 24 (adding arr[3] = 10 exceeds mid = 18, so create a new subarray)
            - Start a new subarray with sum = 10 and pieces = 2
        5. Fifth iteration :- sum = 10 + 8 = 18 (add arr[4] = 8 to the second subarray)

    At the end of this iteration, we have divided the array into 2 subarrays [7, 2, 5] and [10, 8]. 
    Since this is valid, we try to minimize the sum further by reducing end to mid.

    start = 16, end = 18


    <------------------- Fourth Binary Search Iteration :- mid = 16 + Math.floor((18 - 16) / 2) = 17 ----------------->

    We iterate over the array again, with mid = 17.

        1. First iteration :- sum = 0 + 7 = 7 (add arr[0] = 7 to the first subarray)
        2. Second iteration :- sum = 7 + 2 = 9 (add arr[1] = 2 to the first subarray)
        3. Third iteration :- sum = 9 + 5 = 14 (add arr[2] = 5 to the first subarray)
        4. Fourth iteration :- sum = 14 + 10 = 24 (adding arr[3] = 10 exceeds mid = 17, so create a new subarray)
            - Start a new subarray with sum = 10 and pieces = 2
        5. Fifth iteration :- sum = 10 + 8 = 18 (adding arr[4] = 8 exceeds mid = 17, so create another new subarray)
            - Start a new subarray with sum = 8 and pieces = 3

    Since we ended up with 3 subarrays again, we need to increase start.

    start = mid + 1 = 18, end = 18


    <--------------------------------------------- Step 3: Conclusion ----------------------------------------------->

    Now, start equals end (both are 18), so the loop exits, and we return end = 18 as the minimum largest sum.
*/

const SplitArrayLargestSum = (arr, k) => {
    let start = 0;
    let end = 0;

    /* Find the maximum element and the sum of all elements in the array */
    for (let i = 0; i < arr.length; i++) {
        start = Math.max(start, arr[i]); // start is initialized to the max element
        end += arr[i]; // end is the sum of all elements
    }

    /* Binary Search to find the minimum largest sum for splitting the array into k subarrays. */
    while (start < end) {
        const mid = start + Math.floor((end - start) / 2); // potential answer for max sum

        let sum = 0;
        let pieces = 1; // Start with one subarray
        for (let i = 0; i < arr.length; i++) {
            if (sum + arr[i] > mid) {
                // If adding arr[i] exceeds mid, create a new subarray
                sum = arr[i]; // start a new subarray with arr[i]
                pieces++; // increment number of subarrays
            } else {
                // Otherwise, add arr[i] to the current subarray
                sum += arr[i];
            }
        }

        /* If the number of subarrays exceeds k, increase the minimum sum (start) */
        if (pieces > k) {
            start = mid + 1;
        } else {
            /* Otherwise, try for a smaller sum (reduce end) */
            end = mid;
        }
    }
    /* start == end at this point, which is the answer */
    return end;
};
console.log(SplitArrayLargestSum([7, 2, 5, 10, 8], 2)); // Output: 18

/*
    Peak Index in Mountain Array (Leetcode Problem)   OR   Find Peak Element (Leetcode Problem)
    <--------------------------------------------->        <----------------------------------->

    In a mountain array, the peak index is the index of the element that is greater than or equal to its adjacent elements. 
    The array must first increase to a maximum value (the peak) and then decrease afterwards. To find the peak index.

    Note - index of the element that is greater than or equal to its adjacent elements.

    Input: arr = [0, 1, 0], --->>> Output: 1
    Input: arr = [0, 2, 1, 0], --->>> Output: 1
    Input: arr = [0, 1, 4, 10, 5, 2], --->>> Output: 3
    Input: arr = [1, 2, 3, 5, 6, 4, 3, 2], --->>> Output: 4

    It do not contains duplicate element.
*/

/*
    Logic - 

     0  1  2  3  4  5  6  7
    [1, 2, 3, 5, 6, 4, 3, 2]
     s        m           e

    start = 0, end = 7, mid = 3

    Case - 1

        if (arr[mid] > arr[mid + 1]) {   --->> we are in the decreasing part of an array, this may be ans, but look at left.
            end = mid  --> this is why end != mid - 1
        }

    Case - 2  
    
        s,   m,   m + 1,   e

        if (arr[mid] < arr[mid + 1]) {   --->> we are in the increasing part of an array. because we know that mid + 1 element > mid element
            start = mid + 1
        }

    Case - 3 when will loop break ?

        - the end, start === end and pointing to the largest number because of the 2 checks above
        - start and end are always trying to find max element in the above 2 checks hence, when they are pointing to 
        just one element, that is the maximum one because that is what the checks say.

        return start or return end as both are equal
*/

/*
    Dry Run :-
    ------------

    Initial State :-

    arr = [1, 2, 3, 5, 6, 4, 3, 2], start = 0, end = arr.length - 1 = 7

    1st Iteration :-

        - Calculate mid = start + Math.floor((end - start) / 2) = 0 + Math.floor((7 - 0) / 2) = 3.
        - arr[mid] = 5
        - Compare arr[mid] with arr[mid + 1] 
            - arr[3] = 5 and arr[4] = 6 --→ arr[3] < arr[4]
            - This means we are in the increasing part of the array, so the peak must be to the right.

        Update start = mid + 1 = 3 + 1 = 4

    2nd Iteration :-

        - Calculate mid = start + Math.floor((end - start) / 2) = 4 + Math.floor((7 - 4) / 2) = 4 + 1 = 5
        - arr[mid] = 4
        - Compare arr[mid] with arr[mid + 1]
            - arr[5] = 4 and arr[6] = 3 --→ arr[5] > arr[6]
            - This means we are in the decreasing part of the array, so the peak is either at mid or to the left.
            
        Update end = mid = 5

    3rd Iteration :-

        - Calculate mid = start + Math.floor((end - start) / 2) = 4 + Math.floor((5 - 4) / 2) = 4
        - arr[mid] = 6
        - Compare arr[mid] with arr[mid + 1]
            - arr[4] = 6 and arr[5] = 4 --→ arr[4] > arr[5]
            - We are still in the decreasing part of the array, so the peak might be at mid or to the left.

        Update end = mid = 4

    ermination :-

        - Now, start = 4 and end = 4, so start === end.
        - At this point, the algorithm terminates and returns start (or end), which is 4.

    Final Output :- The peak element is arr[4] = 6, and its index is 4. Thus, the output is 4.
*/

/*
    Input: [1, 2, 3, 5, 6, 4, 3, 2] 

    | Iteration |  start |  end |  mid |  arr[mid] | arr[mid + 1] |  Condition (arr[mid] > arr[mid + 1])   |        Action       |
    |-----------|--------|------|------|-----------|--------------|----------------------------------------|---------------------|
    | 1         | 0      | 7    | 3    | 5         |  6           |         No                             | start = mid + 1 = 4 |
    | 2         | 4      | 7    | 5    | 4         |  3           |         Yes                            | end = mid = 5       |
    | 3         | 4      | 5    | 4    | 6         |  4           |         Yes                            | end = mid = 4       |
    | End       | 4      | 4    | -    | -         |  -           |         -                              | Return start = 4    |

    Final Output: The peak index in the mountain array [1, 2, 3, 5, 6, 4, 3, 2] is 4, which corresponds to the element 6.
*/

const peakIndexInMountainArray = (arr) => {
    let start = 0;
    let end = arr.length - 1;

    while(start < end){
        let mid = start + Math.floor((end - start) / 2);

        if (arr[mid] > arr[mid + 1]) {
            /* We are in the decreasing part of the array, so the peak might be here or to the left.
              That's why we don't move 'end' to mid - 1, since mid could still be the peak. */
            end = mid;
        } else {
            /* We are in the increasing part of the array, so the peak must be to the right.
               We move 'start' to mid + 1 because we know arr[mid + 1] is greater than arr[mid]. */
            start = mid + 1;
        }
    }
    /* Eventually, start and end will converge to the peak element. Both start and end will point to the maximum element, as the loop conditions ensure that. */
    return start; /* You could return 'end' as well since start === end. */
};
console.log(peakIndexInMountainArray([0, 1, 0])); // Output: 1
console.log(peakIndexInMountainArray([0, 2, 1, 0])); // Output: 1
console.log(peakIndexInMountainArray([0, 1, 4, 10, 5, 2])); // Output: 3
console.log(peakIndexInMountainArray([1, 2, 3, 5, 6, 4, 3, 2])); // Output: 4



/*<------------------------------------------------ Another Way ---------------------------------------------------->*/

/*
    Input - [1, 2, 3, 4, 5, 6, 7, 8, 5, 1]

    Step 1: Handle Edge Cases

    - n = 10
    - arr[0] = 1, arr[1] = 2 -→ Not a peak
    - arr[n-1] = 1, arr[n-2] = 5 -→ Not a peak
    - Proceed with binary search.

    | Iteration |  low | high |  mid | arr[mid-1] | arr[mid] | arr[mid+1] | Condition (arr[mid-1] < arr[mid] > arr[mid+1]?) |       Action      |
    |-----------|------|------|------|------------|----------|------------|-------------------------------------------------|-------------------|
    | 1         | 1    | 8    | 4    | 4          |  5       | 6          |                 No                              | low = mid + 1 = 5 |
    | 2         | 5    | 8    | 6    | 6          |  7       | 8          |                 No                              | low = mid + 1 = 7 |
    | 3         | 7    | 8    | 7    | 7          |  8       | 5          |                 Yes                             | Return mid = 7    |

    Final Output: The peak index in the array [1, 2, 3, 4, 5, 6, 7, 8, 5, 1] is 7, which corresponds to the element 8.
*/

const findPeakElement = (arr) => {
    let n = arr.length;

    /* Edge cases */
    if (n === 1) return 0;
    if (arr[0] > arr[1]) return 0;
    if (arr[n - 1] > arr[n - 2]) return n - 1;

    let low = 1, high = n - 2;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        /* If arr[mid] is the peak */
        if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1])
            return mid;

        /* If we are in the left */
        if (arr[mid] > arr[mid - 1]) low = mid + 1;

        /* If we are in the right Or, arr[mid] is a common point */
        else high = mid - 1;
    }
    return -1;
};
console.log(findPeakElement([1, 2, 3, 4, 5, 6, 7, 8, 5, 1])); // Output: 7
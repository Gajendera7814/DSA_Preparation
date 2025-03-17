/*
    what is Binary Search ?
    <======================>

    Binary search is a search algorithm that efficiently finds the position of a target value within a sorted array. 
    
    It works by repeatedly dividing the array in half, comparing the target value to the middle element. 
        - If the target value is not equal to the middle element, it eliminates the half of the array where the 
          target cannot lie, and continues searching in the remaining half until the target is found. 


    Input: [2, 4, 6, 9, 11, 12, 14, 20, 36, 48], target = 36,  Output = 8

     0  1  2  3  4   5   6   7    8   9
    [2, 4, 6, 9, 11, 12, 14, 20, 36, 48]


    How to identify -

        1. Array is in sorted form
        2. Find the middle element
        3. target > mid ==> Search in the right else in the left.
        4. if middle element === target element (ans).


    How it is work ?

        Step - 1

            0  1  2  3  4   5   6   7    8   9
            [2, 4, 6, 9, 11, 12, 14, 20, 36, 48],  target = 36
            S           mid                  e

            mid = (start + (end - start) / 2); 
            mid = (0 + (9 - 0) / 2) = 4.

            check target element === mid element (NO)
            36 == 11 (NO)

            Then Search in the right half of the array.

        Step - 2

            5    6   7  8   9
            [12, 14, 20, 36, 48]
            s       mid     e
            
            mid = (5 + (9 - 5) / 2) = 7.

            check target element == mid element (NO)
            36 == 20 (NO)

            Then Search in the right half of the array.

        Step - 3

            8   9
            [36, 48]
            s,   e
            mid
            
            mid = (8 + (9 - 8) / 2) = 8

            check target element == mid element (Yes)
            36 == 36 (Yes) Ans
*/


/*
    How to find Time Complexity of Binary Search
    ---------------------------------------------

    [           |           ] --->  N
                [     |     ] --->  N/2
                [  |  ] --->  N/4
                   [ | ] --->  N/8
                    .
                    .
                    .
                    .
                    []

    
    1 = N / 2^K

    log(N) = log(2^k)
    log(N) = k * log(2)
    log(N) = k
    k = log(N)

    Time Complexity = log(n)
*/


/*<------------------------------------------- Binary Search Algorithm ---------------------------------------------->*/

/*
    - Return the target element index position.
    - If the target element is not found, return -1
*/

/*<--------------------------------------------- In ascending order ------------------------------------------------>*/

/*
    1. Initialize two pointers: start = 0 and end = arr.length - 1.
    2. Find the middle element: mid = Math.floor(start + (end - start) / 2).
    3. Compare arr[mid] with the target:
        - If arr[mid] == target, return mid (target found).
        - If arr[mid] > target, search the left half (end = mid - 1).
        - If arr[mid] < target, search the right half (start = mid + 1).
    4. Repeat until start exceeds end. If not found, return -1.

    Input: [2, 4, 6, 9, 11, 12, 14, 20, 36, 48],   target = 36

    | Iteration | start | end | mid  | arr[mid] |  Comparison                  |   New start / end    |
    |-----------|-------|-----|------|----------|------------------------------|----------------------|
    | 1         | 0     | 9   | 4    |  11      | 36 > 11 → Search right half  | start = 5            |
    | 2         | 5     | 9   | 7    |  20      | 36 > 20 → Search right half  | start = 8            |
    | 3         | 8     | 9   | 8    |  36      | 36 == 36 → Target found      | Return 8             |

    Output: 8 (Index of 36 in the array)

*/

const BinarySearch = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;

    while(start <= end){
        const mid = Math.floor(start + (end - start) / 2);
        
        if(target < arr[mid]){
            end = mid - 1;
        } else if(target > arr[mid]){
            start = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
};
console.log(BinarySearch([2, 4, 6, 9, 11, 12, 14, 20, 36, 48], 36)); // Output: 8

/*
    Time complexity = O(log n)
    Space complexity = O(1)
*/



/*<--------------------------------------------- In descending order ----------------------------------------------->*/

const BinarySearchInDes = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;

    while(start <= end){
        const mid = Math.floor(start + (end - start) / 2);
        
        if(target < arr[mid]){
            start = mid + 1;
        } else if(target > arr[mid]){
            end = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
};
console.log(BinarySearchInDes([48, 36, 20, 14, 12, 11, 9, 6, 4, 2], 9)); // Output: 6

/*
    Time complexity = O(log n)
    Space complexity = O(1)
*/
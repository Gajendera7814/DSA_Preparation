/*
    Bubble Sort
    <---------->

    Bubble sort is a simple sorting algorithm that sorts an array by comparing adjacent elements and swapping them 
    if they are not in the desired order.


    Input: nums = [29, 10, 56, 14, 37] ---->>>>>  Output: [10, 14, 29, 37, 56]

    Number of rounds = Total length - 1

    j < arr.length - 1 - i --->>> i is use because last element is not compair in each round

    Round - 1  [29, 10, 56, 14, 37]
        [29, 10, 56, 14, 37]  (compair 29 and 10) if 29 > 10 then swap
        [10, 29, 56, 14, 37]  (compair 29 and 56) if 29 >! 56 no swap
        [10, 29, 56, 14, 37]  (compair 56 and 14) if 56 > 14 then swap
        [10, 29, 14, 56, 37]  (compair 56 and 37) if 56 > 37 then swap
        [10, 29, 14, 37, 56]
    
    Round - 2  [10, 29, 14, 37, 56] 
        [10, 29, 14, 37, 56]  (compair 10 and 29) if 10 >! 29 no swap
        [10, 29, 14, 37, 56]  (compair 29 and 14) if 29 > 14 then swap
        [10, 14, 29, 37, 56]  (compair 29 and 37) if 29 >! 37 no swap
        [10, 14, 29, 37, 56]

    Round - 3  [10, 14, 29, 37, 56]
        [10, 14, 29, 37, 56]  (compair 10 and 14) if 10 >! 14 no swap
        [10, 14, 29, 37, 56]  (compair 14 and 29) if 14 >! 29 no swap
        [10, 14, 29, 37, 56]

    Round - 4  [10, 14, 29, 37, 56]
        [10, 14, 29, 37, 56]  (compair 10 and 14) if 10 >! 14 no swap
        [10, 14, 29, 37, 56]
        
        
    Final Output - [10, 14, 29, 37, 56]
*/


/*
    Dry Run :-
    
    Iteration - 1 
    i = 0, Inner Loop (j = 0 to 3) 
        - Compare arr[0] = 29 and arr[1] = 10: Since 29 > 10, swap them. arr = [10, 29, 56, 14, 37]
        - Compare arr[1] = 29 and arr[2] = 56: Since 29 < 56, no swap.
        - Compare arr[2] = 56 and arr[3] = 14: Since 56 > 14, swap them. arr = [10, 29, 14, 56, 37]
        - Compare arr[3] = 56 and arr[4] = 37: Since 56 > 37, swap them. arr = [10, 29, 14, 37, 56]

    Iteration - 2 
    i = 1, Inner Loop (j = 0 to 2)
        - Compare arr[0] = 10 and arr[1] = 29: Since 10 < 29, no swap.
        - Compare arr[1] = 29 and arr[2] = 14: Since 29 > 14, swap them. arr = [10, 14, 29, 37, 56]
        - Compare arr[2] = 29 and arr[3] = 37: Since 29 < 37, no swap.

    Iteration - 3 
    i = 2, Inner Loop (j = 0 to 1)
        - Compare arr[0] = 10 and arr[1] = 14: Since 10 < 14, no swap.
        - Compare arr[1] = 14 and arr[2] = 29: Since 14 < 29, no swap.

    Iteration - 4 
    i = 3, Inner Loop (j = 0)
        - Compare arr[0] = 10 and arr[1] = 14: Since 10 < 14, no swap.

    Final Result: [10, 14, 29, 37, 56]
*/

const bubbleSort = (arr) => {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++){
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
};
console.log(bubbleSort([29, 10, 56, 14, 37])); /* Output:- [ 10, 14, 29, 37, 56 ] */


/*
    Time Complexity = O(n^2)
    Space Complexity = O(1)
*/
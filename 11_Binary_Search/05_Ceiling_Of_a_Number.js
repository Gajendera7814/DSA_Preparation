/*
    Ceiling Of a Number
    <------------------>

    The ceiling of a number is the smallest integer that is greater than or equal to the target number.

    ceiling = smaller element in an array greater than or equal to target element

    Input: [2, 3, 5, 9, 14, 16, 18], target = 15, Output: 16

    ceiling(arr, target = 15) = 16
    ceiling(arr, target = 14) = 14
    ceiling(arr, target = 4) = 5
    ceiling(arr, target = 9) = 9
*/

/*
    Dry Run :-
    ------------

    Initial values :-

          0  1  2  3   4   5   6
    arr: [2, 3, 5, 9, 14, 16, 18], target = 15, 
    
    start = 0, end = 6

    First iteration :-

        mid = Math.floor(start + (end - start) / 2) = Math.floor(0 + (6 - 0) / 2) = 3
        Check condition => arr[mid] = arr[3] = 9, target = 15

        Since target > arr[mid], we update start = mid + 1 = 4

    Second iteration :-

        mid = Math.floor(start + (end - start) / 2) = Math.floor(4 + (6 - 4) / 2) = 5
        Check condition => arr[mid] = arr[5] = 16, target = 15
        
        Since target < arr[mid], we update end = mid - 1 = 4

    Third iteration :-

        mid = Math.floor(start + (end - start) / 2) = Math.floor(4 + (4 - 4) / 2) = 4
        Check condition => arr[mid] = arr[4] = 14, target = 15

        Since target > arr[mid], we update start = mid + 1 = 5

    Loop breaking condition :-

        - Now, start = 5 and end = 4
        - The loop condition is while (start <= end) At this point, start = 5 is greater than end = 4, so the loop terminates.

    Final result:

        - The loop exits, and the code returns arr[start] = arr[5] = 16

    Thus, the loop breaks when start > end, which happens after start becomes 5 and end becomes 4.
*/

/*
    Input: [2, 3, 5, 9, 14, 16, 18],  target = 15


    | Step | start | end |      mid (calculated)       | arr[mid] | Comparison (target = 15) |              Action              |
    |------|-------|-----|-----------------------------|----------|--------------------------|----------------------------------|
    | 1    | 0     | 6   | Math.floor(0 + (6-0)/2) = 3 |    9     |         15 > 9           | Move right (start = mid + 1 = 4) |
    | 2    | 4     | 6   | Math.floor(4 + (6-4)/2) = 5 |    16    |         15 < 16          | Move left (end = mid - 1 = 4)    |
    | 3    | 4     | 4   | Math.floor(4 + (4-4)/2) = 4 |    14    |         15 > 14          | Move right (start = mid + 1 = 5) |
    | 4    | 5     | 4   | - (loop terminates)         |     -    |            -             | Return arr[start] = arr[5] = 16  |

    Output: 16
*/

const ceiling = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;

    /* base condition if length of arr == 0 then return -1 */
    if (target > arr[arr.length - 1]) return -1;

    /* ceiling is smaller element in an array >= target */
    while(start <= end){
        const mid = Math.floor(start + (end - start) / 2);

        if(target < arr[mid]){
            end = mid - 1;
        } else if(target > arr[mid]){
            start = mid + 1;
        } else {
            return arr[mid];
        }
    }
    return arr[start];
};
console.log(ceiling([2, 3, 5, 9, 14, 16, 18], 15)); // Output: 16
console.log(ceiling([2, 3, 5, 9, 14, 16, 18], 14)); // Output: 14
console.log(ceiling([2, 3, 5, 9, 14, 16, 18], 9)); // Output: 9
console.log(ceiling([2, 3, 5, 9, 14, 16, 18], 4)); // Output: 5

/*
    Floor of a number
    <---------------->

    The floor of a number is the greatest integer that is less than or equal to the target number.

    Floor = greatest element in an array less than or equal to target element

    Input: [2, 3, 5, 9, 14, 16, 18], target = 15, Output: 14

    floor(arr, target = 15) = 14
    floor(arr, target = 14) = 14
    floor(arr, target = 4) = 3
    floor(arr, target = 9) = 9
*/

/*
    Dry Run :-
    -----------
    
    Initial values :-
    
        arr = [2, 3, 5, 9, 14, 16, 18],  target = 15,  start = 0,  end = 6 

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

    Final result :-

        - The loop exits, and the code returns arr[end] = arr[4] = 14

    Conclusion :-

        - The loop breaks when start > end, In this scenario, start becomes 5 and end becomes 4 after the third iteration, 
        so the loop terminates, and the function returns arr[end] = 14.
*/

/*
    Input: [2, 3, 5, 9, 14, 16, 18], 15)


    | Step | start | end |      mid (calculated)        |   arr[mid]   |  Comparison (target = 15)  |               Action              |
    |------|-------|-----|------------------------------|--------------|----------------------------|-----------------------------------|
    | 1    | 0     | 6   | Math.floor(0 + (6-0)/2) = 3  |       9      |            15 > 9          | Move right (start = mid + 1 = 4)  |
    | 2    | 4     | 6   | Math.floor(4 + (6-4)/2) = 5  |       16     |            15 < 16         | Move left (end = mid - 1 = 4)     |
    | 3    | 4     | 4   | Math.floor(4 + (4-4)/2) = 4  |       14     |            15 > 14         | Move right (start = mid + 1 = 5)  |
    | 4    | 5     | 4   | - (loop terminates)          |       -      |                -           | Return arr[end] = arr[4] = 14     |

    Output: 14

    - The function finds the greatest element in the array that is less than or equal to 15.
    - Since 14 is the largest number in the array that is ≤ 15, it correctly returns 14.
*/

const floor = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;

    /* floor is greatest element in an array <= target */
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
    return arr[end];
};
console.log(floor([2, 3, 5, 9, 14, 16, 18], 15)); // Output: 14
console.log(floor([2, 3, 5, 9, 14, 16, 18], 14)); // Output: 14
console.log(floor([2, 3, 5, 9, 14, 16, 18], 9)); // Output: 9
console.log(floor([2, 3, 5, 9, 14, 16, 18], 4)); // Output: 3
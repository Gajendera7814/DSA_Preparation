/*
    Move all Zeros to the end of the array   Leetcode Problem (Move Zeroes)
    <------------------------------------>   <---------------------------->

    Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the 
    non-zero elements.

    Note that you must do this in-place without making a copy of the array.


    Example 1:

        Input: [0, 1, 0, 3, 12],  Output: [1, 3, 12, 0, 0]
    
    Example 2:

        Input: [0],  Output: [0]

    Example 3: 
        
        Input: [0, 1, 2, 0, 4, 5, 0, 0, 9],  Output: [1, 2, 4, 5, 9, 0, 0, 0, 0]
*/


/*<--------------------------------------------- Brute Force Approach ---------------------------------------------->*/

/*
    Steps :-
        1. Initialize an Empty Temporary Array:
            - We create a temporary array temp to store the non-zero elements of the original array.
        
        2. Iterate Through the Original Array:
            - Traverse the array and check if each element is not zero.
            - If the element is not zero, add it to the temp array using push().
    
        3. Reassign Non-Zero Elements Back to the Original Array:
            - After the first loop, the temp array will hold all the non-zero elements of the original array.
            - We then copy these non-zero elements back to the beginning of the original array (arr) by assigning 
              them to the first temp.length positions.
        
        4. Fill the Rest of the Array with Zeros:
            - After copying the non-zero elements back to arr, we fill the remaining positions in the array 
            (from temp.length to n) with zeros.
    
        5. Return the Modified Array:
            - Finally, the modified array, with all zeros moved to the end, is returned.
*/

const moveZerosToEnd = (arr) => {
    let temp = [];
    let n = arr.length;

    /* Loop through the array and push non-zero elements to temp */
    for (let i = 0; i < n; i++) {
        if (arr[i] != 0) {
            temp.push(arr[i]);
        }
    }

    /* Get the length of the non-zero elements array (temp) */
    let x = temp.length;

    /* Move the non-zero elements from temp back to the original array (arr) */
    for (let i = 0; i < x; i++) {
        arr[i] = temp[i];
    }

    /* Fill the remaining positions in arr with zeros */
    for (let i = x; i < n; i++) {
        arr[i] = 0;
    }

    /* Return the modified array with zeros moved to the end */
    return arr;
};
console.log(moveZerosToEnd([0, 1, 0, 3, 12])); /* Output: [ 1, 3, 12, 0, 0 ] */

/*
    Time Complexity = O(n) + O(x) + O(n - x) = O(n + x + n - x) = O(2n) ~ O(n)
    Space Complexity = O(x), x is length of the non-zero elements
*/




/*<---------------------------------------------- Using 2 pointers ------------------------------------------------>*/

/*

    Input: 

         0  1  2  3  4  5  6  7  8  9
        [1, 0, 2, 3, 2, 0, 0, 4, 5, 1]
        
        j = -1, i starts from 0.

    First Loop - Finding the first zero (i.e., setting the initial position of j):  
    
        - Iteration starts, and j is set when the first 0 is found.  
   
        [1, 0, 2, 3, 2, 0, 0, 4, 5, 1]
            j
   

    Second Loop - Moving pointers and swapping elements:  
        - The second loop starts from i = j + 1 (where j = 1), and for each non-zero element, it swaps with j.
        
        Iteration 1: i = 2,
                   i
            [1, 0, 2, 3, 2, 0, 0, 4, 5, 1]
                j
            
            Swap arr[2] and arr[1] :-->> [1, 2, 0, 3, 2, 0, 0, 4, 5, 1]
            

        Iteration 2: i = 3,
                      i
            [1, 2, 0, 3, 2, 0, 0, 4, 5, 1]
                   j
            
            Swap arr[3] and arr[2] :-->>  [1, 2, 3, 0, 2, 0, 0, 4, 5, 1]
    

        Iteration 3: i = 4,
                         i
            [1, 2, 3, 0, 2, 0, 0, 4, 5, 1]
                      j

            Swap arr[4] and arr[3] :-->> [1, 2, 3, 2, 0, 0, 0, 4, 5, 1]


        Iteration 4: i = 5,
                            i
            [1, 2, 3, 2, 0, 0, 0, 4, 5, 1]
                         j
        
            No swap, as arr[5] is 0 :-->>  [1, 2, 3, 2, 0, 0, 0, 4, 5, 1]
   

        Iteration 5: i = 6,
                               i
            [1, 2, 3, 2, 0, 0, 0, 4, 5, 1]
                         j

            No swap, as arr[6] is 0 :-->>  [1, 2, 3, 2, 0, 0, 0, 4, 5, 1]
   

        Iteration 6: i = 7,
                                  i
            [1, 2, 3, 2, 0, 0, 0, 4, 5, 1]
                         j

            Swap arr[7] and arr[6] :-->>  [1, 2, 3, 2, 4, 0, 0, 0, 5, 1]
   

        Iteration 7: i = 8,
                                     i
            [1, 2, 3, 2, 4, 0, 0, 0, 5, 1]
                            j

            Swap arr[8] and arr[7] :-->>  [1, 2, 3, 2, 4, 5, 0, 0, 0, 1]
   

        Iteration 8: i = 9,
                                        i
            [1, 2, 3, 2, 4, 5, 0, 0, 0, 1]
                               j

        Swap arr[9] and arr[8] :-->>  [1, 2, 3, 2, 4, 5, 1, 0, 0, 0]
   

     Final Output: [1, 2, 3, 2, 4, 5, 1, 0, 0, 0]
*/


const moveZeros = (arr) => {
    let n = arr.length;
    let j = -1;

    /* Place the pointer j */
    for (let i = 0; i < n; i++) {
        if (arr[i] === 0) {
            j = i;
            break;
        }
    }

    /* No non-zero elements */
    if (j === -1) return arr;

    /* Move the pointers i and j and swap accordingly */
    for (let i = j + 1; i < n; i++) {
        if (arr[i] !== 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            j++;
        }
    }
    return arr;
};
console.log(moveZeros([1, 0, 2, 3, 2, 0, 0, 4, 5, 1])); /* Output: [1, 2, 3, 2, 4, 5, 1, 0, 0, 0] */

/*
    Time Complexity = O(x) + O(n - x) = O(n)
    Space Complexity = O(1)
*/
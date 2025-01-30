/*
    Left Rotate an array by K’th places (-----> Anticlock-wise start from index 0)
    <---------------------------------------------------------------------------->

    Given an array of size N and an integer K, the task is to rotate the array K places to the left.  

    - An integer N representing the size of the array.  
    - An integer K representing the number of positions to rotate the array.  
    - An array of N integers.  


    Given the Input: [1, 2, 3, 4, 5, 6, 7] and k = 3, the output after left rotation is [4, 5, 6, 7, 1, 2, 3].  

    The array length is 7.  

    - If k = 9, it can be rewritten as 7 + 2, meaning one full rotation (which brings the array back to its original state) 
      plus an additional 2-position left shift.

    - If k = 15, it can be expressed as 7 + 7 + 1, meaning two full rotations (returning the array to its original form 
      twice) plus a 1-position left shift.


    In such cases, we can say: K = K % N


     0   1   2   3   4   5   6
    [1,  2,  3,  4,  5,  6,  7]
    <--------->  <------------>
        1st           2nd

    1st one is store in temp variable.

    2nd one is shifting in left side.

            0  1  2
    Temp = [1, 2, 3]

    Index ----> i - k
      3   ---->   0
      4   ---->   1
      5   ---->   2
      6   ---->   3
*/

const rotateToLeft = (arr, k) => {
    if (arr.length === 0) return arr;
    
    let n = arr.length;
    
    k = k % n;

    /* Edge case where no rotation is needed */
    if (k === 0) return arr;

    let temp = [];

    /* Store first k elements in temp */
    for (let i = 0; i < k; i++) {
        temp[i] = arr[i];
    }

    /* Shift the rest of the array to the left */
    for (let i = k; i < n; i++) {
        arr[i - k] = arr[i];
    }

    /* Place the stored elements at the end */
    for (let i = 0; i < k; i++) {
        arr[n - k + i] = temp[i];
    }

    return arr;
};
console.log(rotateToLeft([1, 2, 3, 4, 5, 6, 7], 3)); /* Output: [4, 5, 6, 7, 1, 2, 3] */

/*
    Time Complexity = O(k) + O(n - k) + O(k) = O(k + n - k + k) = O(k + n)
    Space Complexity: O(k)
*/




/* <------------------------------ Left Rotate an Array using "Reversal Algorithm" ---------------------------------> */

/*
    Approach: 
    
    Given an array of size N and an integer K (rotation count), the goal is to left rotate the array by K 
    positions efficiently.

    Steps:-
    
    1. Divide the array into two parts at index K:
    
        Original Array:
        -------------------------------------------
        | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
        -------------------------------------------
        |-----------------||----------------------|
            Part-1 (K)           Part-2 (N-K)
    
    2. Reverse both parts separately:
    
        Reverse Part-1:        
        -------------------
        | 3   | 2   | 1   |     ----> reverse(arr, arr + k)
        -------------------

       Reverse Part-2:
       -------------------------
       | 7   | 6   | 5   | 4   |     ----> reverse(arr + k, arr + n)
       -------------------------
    
    3. Concatenate the reversed parts:
    
       Combined Array:
       -------------------------------------------
       | 3   | 2   | 1   | 7   | 6   | 5   | 4   |     ----> revese(arr, arr + n)
       -------------------------------------------

    4. Reverse the entire array to get the final result:
    
       Final Reversal:
       -------------------------------------------
       | 4   | 5   | 6   | 7   | 1   | 2   | 3   | 
       -------------------------------------------
    
    This results in the left-rotated array.
*/


const reverse = (arr, start, end) => {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
};

const leftRotate = (arr, k) => {
    let n = arr.length;

    /* Edge case where no rotation is needed */
    if (n === 0) return arr;

    k = k % n;

    /* Step 1: Reverse the first k elements */
    reverse(arr, 0, k - 1);

    /* Step 2: Reverse the remaining elements */
    reverse(arr, k, n - 1);

    /* Step 3: Reverse the entire array to complete the rotation */
    reverse(arr, 0, n - 1);

    /* return the rotated array */
    return arr;
};
console.log(leftRotate([1, 2, 3, 4, 5, 6, 7], 3)); /* Output: [4, 5, 6, 7, 1, 2, 3] */

/*
    Time Complexity = O(k) + O(n - k) + O(n) = O(k + n - k + n) = O(2n) ~ O(n)
    Space Complexity = O(1)
*/




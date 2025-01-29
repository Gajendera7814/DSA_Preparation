/*
    Left Rotate the Array by One
    <--------------------------->

    Problem Statement: Given an array of N integers, left rotate the array by one place.

    Input: [1, 2, 3, 4, 5],  Output: [2, 3, 4, 5, 1]
*/

/*<-------------------------------------- Approach - Brute force Approach ----------------------------------------->*/

/*
    Approach - We can take another dummy array of the same length and then shift all elements in the array toward the 
    left and then at the last element store the index of 0th index of the array and print it.
*/

const rotateLeft = (arr) => {
    let temp = arr[0];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        arr[i - 1] = arr[i];
    }

    arr[n - 1] = temp;
    
    return arr;
};
console.log(rotateLeft([1, 2, 3, 4, 5])); /* Output: [ 2, 3, 4, 5, 1 ] */

  
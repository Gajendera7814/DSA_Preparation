/*
    Check if an array is sorted or not.
    <--------------------------------->

    Input: [1, 2, 3, 4, 5],  Output: true

    Input: [1, 2, 7, 8, 3, 4],   Output: false
*/

/*<-------------------------------------------------- Approach 1 ---------------------------------------------------->*/

const isSorted = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[i]) return false;
      }
    }
    return true;
};
console.log(isSorted([1, 2, 3, 4, 5])); /* Output: true */
  
/*
    Time Complexity :- O(n^2)
    Space Complexity :- O(1)
*/



/*<------------------------------------------- Approach 2 - Ascending Order ---------------------------------------->*/

const isSortedAscending = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
};
console.log(isSortedAscending([1, 2, 3, 4])); /* Output: true */
console.log(isSortedAscending([1, 2, 7, 8, 3, 4])); /* Output: false */

/*
    Time Complexity :- O(n)
    Space Complexity :- O(1)
*/



/*<------------------------------------------ Approach 3 - Descending Order --------------------------------------->*/

const isSortedDescending = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }
    return true;
};
console.log(isSortedDescending([3, 2, 1])); /* Output: true */
console.log(isSortedDescending([8, 7, 6, 3, 4, 2, 1])); /* Output: false */

/*
    Time Complexity :- O(n)
    Space Complexity :- O(1)
*/
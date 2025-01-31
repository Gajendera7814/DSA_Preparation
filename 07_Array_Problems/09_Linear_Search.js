/*
    Linear Search
    <------------>

    Given an array of integers and a target number, implement a function that searches for the target number 
    in the array using the Linear Search algorithm. If the target number is found, return its index; 
    
    otherwise, return -1.

    Input: [6, 7, 8, 4, 1], num = 4, Output = 3 (return index)

    Input: [1, 2, 6, 9, 4, 5], num = 12, Output = -1 (num not found)
*/

const LinearSearch = (arr, num) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            return i;
        }
    }
    return -1;
};
console.log(LinearSearch([6, 7, 8, 4, 1], 4)); /* Output: 3 */

/*
    Time Complexity
    <-------------->

    - Best Case (O(1)): The target number is found at the first index.
    - Worst Case (O(n)): The target number is at the last index or not found at all.
    - Average Case (O(n)): The target number is somewhere in the middle.

    Space Complexity
    <--------------->
    
    Space Complexity: O(1) (Constant space) because we only use a few extra variables regardless of input size.
*/
/*
    Subsets     Leetcode Problem
    <------>    <--------------->

    Given an integer array of unique elements, return all possible subsets (the power set).

    The solution set must not contain duplicate subsets. Return the solution in any order.

    Input: arr = [1, 2, 3],  Output: [ [], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3] ]

    Input: arr = [0],  Output: [ [], [0] ]

*/
/* vIds - virtual index */

const subsets = (arr, vIds = 0, ans = []) => {
    /* Base case: if vIds reaches the length of the array */
    if (vIds === arr.length) {
        console.log(ans);
        return;
    }

    /* Include the current element in the subset */
    subsets(arr, vIds + 1, [...ans, arr[vIds]]);

    /* Exclude the current element from the subset */
    subsets(arr, vIds + 1, ans);
};
subsets([1, 2, 3]);

/*
    Output -

    [ 1, 2, 3 ]
    [ 1, 2 ]
    [ 1, 3 ]
    [ 1 ]   
    [ 2, 3 ]
    [ 2 ]
    [ 3 ]
    []
*/



/*<----------------------------------------------------------------------------------------------------------------------->*/

const Subsets = (arr, vIds = 0, ans = [], result = []) => {
    /* Base case: if vIds reaches the length of the array */
    if (vIds === arr.length) {
        result.push([...ans]); /* Add the current subset to the result */
        return result;
    }

    /* Include the current element in the subset */
    Subsets(arr, vIds + 1, [...ans, arr[vIds]], result);

    /* Exclude the current element from the subset */
    Subsets(arr, vIds + 1, ans, result);

    return result;
};
console.log(Subsets([1, 2, 3])); // Output: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []]
console.log(Subsets([0]));       // Output: [[0], []]

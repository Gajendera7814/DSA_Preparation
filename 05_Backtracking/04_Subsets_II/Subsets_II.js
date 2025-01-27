/*
    Subsets II    Leetcode Problem
    <--------->   <--------------->

    Given an integer array arr that may contain duplicates, return all possible subsets (the power set).

    The solution set must not contain duplicate subsets. Return the solution in any order.
 

    Example 1:

        Input: arr = [1, 2, 2]
        Output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
    
    Example 2:

        Input: arr = [0]
        Output: [[],[0]]
*/


/* Use a boolean value to indicate whether a recursive call includes the current element (true) or excludes it (false). */

const subsetsWithDup = (arr, vIds = 0, ans = [], flag = true) => {
    /* Sort the array initially to handle duplicates efficiently. */
    if (vIds === 0) arr.sort((a, b) => a - b);
        
    /* Base case: if vIds reaches the length of the array */
    if (vIds === arr.length) {
        console.log(ans);
        return;
    }

    /* Exclude the current element if it's a duplicate and the previous element was excluded. */
    if (!flag && vIds > 0 && arr[vIds] === arr[vIds - 1]) {
        subsetsWithDup(arr, vIds + 1, ans, false);
    } else {
        /* Include the current element in the subset */
        subsetsWithDup(arr, vIds + 1, [...ans, arr[vIds]], true);

        /* Exclude the current element from the subset */
        subsetsWithDup(arr, vIds + 1, ans, false);
    }
};
subsetsWithDup([1, 2, 2]);

/*
    Output:-

    [ 1, 2, 2 ]
    [ 1, 2 ]
    [ 1 ]
    [ 2, 2 ]
    [ 2 ]
    []
*/



/*<--------------------------------------------------------------------------------------------------------------->*/

const subsetsWithDups = (arr, vIds = 0, ans = [], flag = true, result = []) => {
    /* Sort the array initially to handle duplicates efficiently. */
    if (vIds === 0) arr.sort((a, b) => a - b);

    /* Base case: if vIds reaches the length of the array, add the current subset to the result. */
    if (vIds === arr.length) {
        result.push([...ans]); /* Add a copy of the current subset. */
        return;
    }

    /* Skip the current element if it's a duplicate and the previous element was excluded. */
    if (!flag && vIds > 0 && arr[vIds] === arr[vIds - 1]) {
        subsetsWithDups(arr, vIds + 1, ans, false, result);
    } else {
        /* Include the current element in the subset. */
        subsetsWithDups(arr, vIds + 1, [...ans, arr[vIds]], true, result);

        /* Exclude the current element from the subset. */
        subsetsWithDups(arr, vIds + 1, ans, false, result);
    }

    /* At the root level (vIds = 0), reverse the result to match the desired order. */
    if (vIds === 0) {
        console.log(result.reverse());
    }
};
subsetsWithDups([1, 2, 2]); /* Output :- [ [], [ 2 ], [ 2, 2 ], [ 1 ], [ 1, 2 ], [ 1, 2, 2 ] ] */

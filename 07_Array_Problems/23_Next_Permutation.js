/*
    Next Permutation    Leetcode Problem
    <-------------->    <--------------->

    A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

    For example: [1, 2, 3], 
    
    All the permutations of arr-
        [1, 2, 3], 
        [1, 3, 2], 
        [2, 1, 3], 
        [2, 3, 1], 
        [3, 1, 2], 
        [3, 2, 1]

    For example, the next permutation of arr = [1, 2, 3] is [1, 3, 2].
    
    - Similarly, the next permutation of arr = [2, 3, 1] is [3, 1, 2].
    - While the next permutation of arr = [3, 2, 1] is [1, 2, 3] because [3, 2, 1] does not have a lexicographical larger rearrangement.
    - Given an array of integers nums, find the next permutation of nums.

    The replacement must be in place and use only constant extra memory.


    Example 1:

        Input: nums = [1, 2, 3], Output: [1, 3, 2]
    
    Example 2:

        Input: nums = [3, 2, 1], Output: [1, 2, 3]

    Example 3:

        Input: nums = [1, 1, 5], Output: [1, 5, 1]
*/


/*
    Algorithm :-

    - Traverse the array from end and find the first index, index such that arr[i] < arr[i + 1].
    - Again traverse the array from the end and find the first index, ind such that arr[i] > arr[index].
    - Swap arr[index] and arr[index].
    - Reverse the array from index + 1 till N.
    - The base case would be, if the array is in decreasing order, no next permutation will be found, 
      hence return the array in sorted order.
*/

/*
    How the Algorithm Works -

    Step 1: Find the Breakpoint (ind)

        - Start from the rightmost side of the array.
        - Find the first index (ind) where arr[i] < arr[i + 1].
        - This index (ind) is the "breakpoint" where the order breaks from increasing to decreasing.

        Example: [1, 3, 2]

            - Check from right to left:
                - 3 > 2 → No breakpoint.
                - 1 < 3 → Breakpoint at index ind = 0.

        If there is no breakpoint (ind == -1), the array is in descending order, so we reverse the entire array and return.


    Step 2: Find the Smallest Greater Element and Swap

        - Look for the smallest element greater than arr[ind] on the right side.
        - Swap this element with arr[ind].

        Example: [1, 3, 2]

            - Breakpoint at index 0, i.e., arr[0] = 1.
            - Look for the smallest number greater than 1 on the right side: 2.
            - Swap 1 and 2 → [2, 3, 1].

    Step 3: Reverse the Right Part

        - Reverse everything right of ind to get the smallest next permutation.

        Example: [2, 3, 1]

            - Reverse [3, 1] ---→ [2, 1, 3].


    Final Output: [2, 1, 3]


    Example: [1, 3, 2]

    |  Step  |                             Action                     |    Array   |
    |--------|--------------------------------------------------------|------------|
    |   1    |    Find breakpoint (ind = 0) where 1 < 3               | [1, 3, 2]  |
    |   2    |    Find next greater (2 at index 2), swap 1 and 2      | [2, 3, 1]  |
    |   3    |    Reverse right part [3, 1] --→ [1, 3]                | [2, 1, 3]  |

    Final Output: [2, 1, 3]


*/

const nextPermutation = (arr) => {
    let n = arr.length;

    /* Step 1: Find the break point */
    let index = -1;
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] < arr[i + 1]) {
            index = i;
            break;
        }
    }

    /* If breakpoint does not exist */
    if (index == -1) {
        arr.reverse();
        return arr;
    }
    
    /* Step 2: Find the next greater element and swap it with ar[index] */
    for (let i = n - 1; i > index; i--) {
        if (arr[i] > arr[index]) {
            [arr[i], arr[index]] = [arr[index], arr[i]];
            break;
        }
    }

    /* Step 3: reverse the right half */
    arr.splice(index + 1, n - index - 1, ...arr.slice(index + 1).reverse());

    return arr;
};
console.log(nextPermutation([1, 3, 2])); // Output: [ 2, 1, 3 ]
console.log(nextPermutation([1, 1, 5])); // Output: [ 1, 5, 1 ]
console.log(nextPermutation([3, 2, 1])); // Output: [ 1, 2, 3 ]
console.log(nextPermutation([1, 2, 3])); // Output: [ 1, 3, 2 ]

/*
    Time Complexity: O(3n), Find breakpoint: O(n), Find swap: O(n), Reverse: O(n) -→ O(3n) total ~ O(n)
    Space Complexity: O(1), Modifies array in place
*/
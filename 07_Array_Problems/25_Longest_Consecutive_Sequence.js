/*
    Longest Consecutive Sequence in an Array    Leetcode Problem
    <--------------------------------------->   <--------------->

    You are given an array of N’ integers. You need to find the length of the longest sequence which 
    contains the consecutive elements.

    Example 1: 
        
        Input: [100, 200, 1, 3, 2, 4],  Output: 4

        Explanation: The longest consecutive subsequence is 1, 2, 3, and 4.

    Example 2: 
        
        Input: [3, 8, 5, 7, 6],   Output: 4

        Explanation: The longest consecutive subsequence is 5, 6, 7, and 8.
*/


/*<------------------------------------------- Brute Force Approach ------------------------------------------------>*/

/*
    Algorithm :-

        - To begin, we will utilize a loop to iterate through each element one by one.
        - Next, for every element x, we will try to find the consecutive elements like x+1, x+2, x+3, and so on using the linear search algorithm in the given array.
        
            Within a loop, our objective is to locate the next consecutive element x+1. 
            - If this element is found, we increment x by 1 and continue the search for x+2. 
            - Furthermore, we increment the length of the current sequence (cnt) by 1. 
        
        This process repeats until step 2.2 occurs.

        - If a specific consecutive element, for example, x+i, is not found, we will halt the search for subsequent 
          consecutive elements such as x+i+1, x+i+2, and so on. Instead, we will take into account the length of the 
          current sequence (cnt).

        - Among all the lengths we get for all the given array elements, the maximum one will be the answer.
*/

/*
    Input Array: [100, 200, 1, 2, 3, 4]

    |  Iteration (i)  | Current Element (x) |          Check x + 1 using linearSearch          | Consecutive Count (cnt) |  Longest Sequence (longest)  |
    |-----------------|---------------------|--------------------------------------------------|-------------------------|------------------------------|
    |       0         |         100         | linearSearch(arr, 101) → false                   |            1            |          1                   |
    |       1         |         200         | linearSearch(arr, 201) → false                   |            1            |          1                   |
    |       2         |         1           | linearSearch(arr, 2) → true → Increment x=2      |            2            |          1                   |
    |                 |                     | linearSearch(arr, 3) → true → Increment x=3      |            3            |          1                   |
    |                 |                     | linearSearch(arr, 4) → true → Increment x=4      |            4            |          1                   |
    |                 |                     | linearSearch(arr, 5) → false                     |            4            |          4                   |
    |       3         |         2           | linearSearch(arr, 3) → true, but already counted |            1            |          4                   |
    |       4         |         3           | linearSearch(arr, 4) → true, but already counted |            1            |          4                   |
    |       5         |         4           | linearSearch(arr, 5) → false                     |            1            |          4                   |

    Final Output: The longest consecutive sequence found is [1, 2, 3, 4], so the function returns 4.
*/

const linearSearch = (arr, num) => {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        if (arr[i] === num) {
            return true;
        }
    }
    return false;
};

const longestSuccessiveElements = (arr) => {
    let n = arr.length;
    let longest = 1;

    /* pick an element and search for its consecutive numbers */
    for (let i = 0; i < n; i++) {
        let x = arr[i];
        let cnt = 1;
        /* search for consecutive numbers using linear search */
        while (linearSearch(arr, x + 1) === true) {
            x += 1;
            cnt += 1;
        }

        longest = Math.max(longest, cnt);
    }
    return longest;
};
console.log(longestSuccessiveElements([100, 200, 1, 2, 3, 4])); /* Output: 4 */

/*
    Time Complexity: O(n ^ 2),  n = size of the given array.
        
        Reason: We are using nested loops each running for approximately n times.

    Space Complexity: O(1), as we are not using any extra space to solve this problem.
*/





/*<-------------------------------------------- Using Set data structure ------------------------------------------>*/

/*
    Algorithm :-

    We will declare 2 variables, 

    cnt ---→ (to store the length of the current sequence), 
    
    longest ---→ (to store the maximum length).

        - First, we will put all the array elements into the set data structure.
        - For every element, x, that can be a starting number(i.e. x - 1 does not exist in the set) we will do the following:
            - We will set the length of the current sequence(cnt) to 1.
            - Then, again using the set, we will search for the consecutive elements such as x + 1, x + 2, and so on, and 
              find the maximum possible length of the current sequence. This length will be stored in the variable cnt.

            - After that, we will compare cnt and longest and update the variable longest with the maximum value 
              (i.e. longest = max(longest, cnt)).
        
        Finally, we will have the answer i.e. longest.
*/

/*
    Input: [3, 8, 5, 7, 6]

    Step 1: Insert Elements into a Set

        After inserting all numbers into a Set, we get: st = {3, 8, 5, 7, 6}


    Step 2: Find the Longest Consecutive Sequence

        | Element (it)  | Is it - 1 in Set? |    Starting a Sequence?     |  Count Consecutive Numbers (cnt) | Longest Sequence (longest)  |
        |---------------|-------------------|-----------------------------|----------------------------------|-----------------------------|
        |       3       | ❌ (no 2 in Set) |   ✅ Start new sequence     |      3 → stop (length 1)         |           1                 |
        |       8       | ❌ (no 7 in Set) |   ✅ Start new sequence     |      8 → stop (length 1)         |           1                 |
        |       5       | ❌ (no 4 in Set) |   ✅ Start new sequence     |      5 → 6 → 7 → 8 (length 4)    |           4                 |
        |       7       | ✅ (5 is in Set) |   ❌ Skip (already counted) |      -                           |           4                 |
        |       6       | ✅ (5 is in Set) |   ❌ Skip (already counted) |      -                           |           4                 |


    Final longest sequence found: [5, 6, 7, 8] with length 4  
    
    Output: 4
*/

const longestSuccessiveElement = (arr) => {
    let n = arr.length;
    if (n === 0)
        return 0;

    let longest = 1;
    let st = new Set();
    
    /* put all the array elements into set */
    for (let i = 0; i < n; i++) {
        st.add(arr[i]);
    };

    /* Find the longest sequence */
    for (let it of st) {
        /* if 'it' is a starting number */
        if (!st.has(it - 1)) {
            /* find consecutive numbers */
            let cnt = 1;
            let x = it;
            while (st.has(x + 1)) {
                x = x + 1;
                cnt = cnt + 1;
            }
            longest = Math.max(longest, cnt);
        }
    }
    return longest;
};
console.log(longestSuccessiveElement([3, 8, 5, 7, 6])); /* Output: 4 */

/*
    Time Complexity: O(n) + O(2 * n) ~ O(3 * n), where n = size of the array.
    Space Complexity: O(n), as we are using the set data structure to solve this problem.
*/
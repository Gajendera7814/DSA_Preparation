/*
    Majority Element   Leetcode Problem
    <-------------->   <--------------->

    Find the Majority Element that occurs more than N/2 times.

    Given an array of N integers, write a program to return an element that occurs more than N/2 times in the given array. 
    You may consider that such an element always exists in the array.


    Example 1:

        Input: [3, 2, 3],  Output: 3

        Explanation :- When we just count the occurrences of each number and compare with half of the size of the array, 
        you will get 3 for the above solution. 

    Example 2:

        Input: [2, 2, 1, 1, 1, 2, 2],  Output: 2

        Explanation :- After counting the number of times each element appears and comparing it with half of array size, 
        we get 2 as result.

    Example 3:

        Input: [4, 4, 2, 4, 3, 4, 4, 3, 2, 4],  Output: 4
*/

/*<-------------------------------------------- Brute Force Approach ----------------------------------------------->*/

/*
    Approach :-

    - We will run a loop that will select the elements of the array one by one.
    - Now, for each element, we will run another loop and count its occurrence in the given array.
    - If any element occurs more than the floor of (N/2), we will simply return it.
*/


const majorityElement = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let cnt = 0;
        for (let j = 0; j < arr.length; j++) {
            /* Counting the frequency of arr[i] */
            if (arr[j] === arr[i]) {
                cnt++;
            }
        }

        /* Check if frequency is greater than n/2 */
        if (cnt > Math.floor(arr.length / 2)) {
            return arr[i];
        }
    }
    return -1;
};
console.log(majorityElement([3, 2, 3])); /* Output: 3 */

/*
    Time Complexity: O(n2), where n = size of the given array. 
    
    Reason: For every element of the array the inner loop runs for N times. And there are N elements in the array. 
   
    Space Complexity: O(1) as we use no extra space.
*/




/*<---------------------------------------------- Better Approach ------------------------------------------------->*/

/*
    Approach:-

    - Use a hashmap and store as (key, value) pairs. (Can also use frequency array based on the size of nums) 
    - Here the key will be the element of the array and the value will be the number of times it occurs. 
    - Traverse the array and update the value of the key. Simultaneously check if the value is greater than the floor of N/2. 
        - If yes, return the key 
        - Else iterate forward.
*/

/*
    Input: [2, 2, 1, 1, 1, 2, 2]

    Step 1: Initializing a Map

        - Create an empty Map() to store the count of each element.

    Step 2: Storing Elements with Their Occurrences

        | Iteration | Current Element (num)  | Map Before Update      | Map After Update |
        |-----------|------------------------|------------------------|------------------|
        | 1         | 2                      |   {}                   |   {2 → 1}        |
        | 2         | 2                      |   {2 → 1}              |   {2 → 2}        |
        | 3         | 1                      |   {2 → 2}              |   {2 → 2, 1 → 1} |
        | 4         | 1                      |   {2 → 2, 1 → 1}       |   {2 → 2, 1 → 2} |
        | 5         | 1                      |   {2 → 2, 1 → 2}       |   {2 → 2, 1 → 3} |
        | 6         | 2                      |   {2 → 2, 1 → 3}       |   {2 → 3, 1 → 3} |
        | 7         | 2                      |   {2 → 3, 1 → 3}       |   {2 → 4, 1 → 3} |


    Step 3: Finding the Majority Element

        - The majority condition is count > Math.floor(arr.length / 2).
        - Here, Math.floor(7 / 2) = 3, so the majority count must be greater than 3.

        | Number | Count | Majority Condition (count > 3) |  Result  |
        |--------|-------|--------------------------------|----------|
        | 2      | 4     | ✅ (Yes)                       | Return 2 |
        | 1      | 3     | ❌ (No)                        | Continue |

        The function returns 2, as it appears more than half the length of the array.
*/

const majorityElementUsingMap = (arr) => {
    const map = new Map();

    /* Storing the elements with their occurrences */
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        if (map.has(num)) {
            map.set(num, map.get(num) + 1);
        } else {
            map.set(num, 1);
        }
    }

    /* Searching for the majority element */
    for (const [num, count] of map) {
        if (count > Math.floor(arr.length / 2)) {
            return num;
        }
    }

    return -1;
};
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); /* Output: 2 */


/*
    Time Complexity Analysis

    1. Building the Map (First Loop - Storing Counts)
        - Iterates through the array once O(n)
        - Each operation (insertion or updating count) in a JavaScript Map takes O(1) on average.
        - So, this loop runs in O(n) time.

    2. Finding the Majority Element (Second Loop - Checking Counts)
        - Iterates through the unique keys in the map.
        - In the worst case (if all elements are unique), there are n keys.
        - Hence, this loop runs in O(n) time.

        Total Time Complexity: O(n) + O(n) = O(n)


    Space Complexity Analysis

    1. Map Storage
        - In the worst case (if all elements are unique), the map stores n elements.
        - Each key-value pair takes O(1) space, so the map uses O(n) extra space.

    2. Other Variables
        - We use a few extra variables (num, count), which take O(1) space.

        Total Space Complexity: O(n)


    Final Complexity
        - Time Complexity: O(n)
        - Space Complexity: O(n) (due to extra storage in the map)
*/




/*<----------------------------------------- Moore’s Voting Algorithm ---------------------------------------------->*/

/*
    Moore’s Voting Algorithm for Majority Element -

    Algorithm Steps
    
    1. Find a Candidate for Majority Element

        - Maintain two variables:  
            - candidate: The potential majority element.
            - count: The count of the candidate.

        - Traverse the array:
            - If count is 0, set candidate = arr[i] and count = 1.
            - If arr[i] === candidate, increase count.
            - Otherwise, decrease count.

    2. Verify the Candidate

        - The first pass finds a potential candidate.
        - The second pass checks whether it actually appears more than n/2 times.


    Dry Run (Step-by-Step Execution)

    Step 1: Finding the Candidate

        | Iteration |  num |  candidate |  count |                    Action                   |
        |-----------|------|------------|--------|---------------------------------------------|
        | 1         | 2    | 2          | 1      | Set candidate to 2                          |
        | 2         | 2    | 2          | 2      | Increase count                              |
        | 3         | 1    | 2          | 1      | Decrease count                              |
        | 4         | 1    | 2          | 0      | Decrease count (reset candidate next step)  |
        | 5         | 1    | 1          | 1      | Set candidate to 1                          |
        | 6         | 2    | 1          | 0      | Decrease count (reset candidate next step)  |
        | 7         | 2    | 2          | 1      | Set candidate to 2                          |

        Candidate after Step 1: 2

    Step 2: Verifying the Candidate

        Count occurrences of 2 in [2, 2, 1, 1, 1, 2, 2] --→ 4 times  
        
        Since 4 > Math.floor(7 / 2) = 3, 2 is the majority element.
*/


const majorityElementMoore = (arr) => {
    let candidate = null;
    let count = 0;

    /* Step 1: Find a candidate */
    for (let num of arr) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    /* Step 2: Verify the candidate */
    count = 0;
    for (let num of arr) {
        if (num === candidate) {
            count++;
        }
    }

    return count > Math.floor(arr.length / 2) ? candidate : -1;
};
console.log(majorityElementMoore([2, 2, 1, 1, 1, 2, 2])); /* Output: 2 */

/*
    Time Complexity: O(n) (two passes)
    Space Complexity: O(1) (only a few extra variables)
*/


/* OR */


const majorityElementMooreVoting = (arr) => {
    let n = arr.length;
    let cnt = 0;
    let el;

    for (let i = 0; i < n; i++) {
        if (cnt === 0) {
            cnt = 1;
            el = arr[i];
        } else if (el === arr[i]) {
            cnt++;
        } else {
            cnt--;
        }
    }

    /* Checking if the stored element is the majority element */
    let cnt1 = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] === el) {
            cnt1++;
        }
    }

    if (cnt1 > Math.floor(n / 2)) {
        return el;
    }

    return -1;
};
console.log(majorityElementMooreVoting([4, 4, 2, 4, 3, 4, 4, 3, 2, 4])); /* Output: 4 */


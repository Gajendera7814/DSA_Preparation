/*
    Intersection of Two Arrays (Leetcode Problem)  || Intersection of two Sorted Arrays
    <-------------------------------------------->    <-------------------------------->

    Given two integer arrays arr1 and arr2, return an array of their intersection. Each element in the result must 
    be unique and you may return the result in any order.

    Example 1:

        Input: arr1 = [1, 2, 2, 1],  arr2 = [2, 2]
        Output: [2]

    Example 2:

        Input: arr1 = [4, 9, 5],  arr2 = [9, 4, 9, 8, 4]
        Output: [9, 4]
        
        Explanation: [4, 9] is also accepted.

    Example 3:

        Input: arr1 = [1, 2, 3, 3, 4, 5, 6],  arr2 = [3, 3, 5]
        Output: [3, 3, 5]
    
    Example 4:
        Input: arr1 = [1, 2, 2, 3, 3, 4, 5, 6],  arr2 = [2, 3, 3, 5, 6, 6, 7]
        Output: [2, 3, 3, 5, 6] 
*/


/*<-------------------------------------------- Brute Force Approach ---------------------------------------------->*/

/*

    1. Initialize Required Variables:
        ans: An empty array to store the intersection elements.
        visited: An array of zeros (0s) with the same length as arr2, used to track which elements in arr2 have 
        already been added to ans.

    2. Loop Through arr1 and arr2:
        - The outer loop iterates through arr1, checking each element against arr2.
        - The inner loop iterates through arr2, comparing the current element of arr1 (arr1[i]) with each element 
          of arr2 (arr2[j]).

    3. Check for Matching Elements:
        - If arr1[i] === arr2[j] and visited[j] === 0, it means:
            - The element is present in both arrays.
            - The element at index j in arr2 hasn't been used yet.
            - It gets added to ans, and visited[j] is set to 1 to mark it as used.
            - Break the inner loop to move to the next element in arr1, ensuring each occurrence is only counted once.

    4. Optimization Check:
        - If arr2[j] > arr1[i], break out of the inner loop early. Since the arrays are expected to be sorted, there’s 
          no need to continue checking larger numbers in arr2 once arr1[i] is smaller.

 
    Input: arr1 = [1, 2, 3, 3, 4, 5, 6, 7],  arr2 = [3, 3, 4, 4, 5, 8];


    1. First Iteration (i = 0, arr1[i] = 1)  
        - Compare 1 with 3, 3 > 1, break the inner loop.
    
    2. Second Iteration (i = 1, arr1[i] = 2)  
        - Compare 2 with 3, 3 > 2, break the inner loop.

    3. Third Iteration (i = 2, arr1[i] = 3)  
        - Compare 3 with 3, match found, add 3 to ans, mark visited[0] = 1, break inner loop.

    4. Fourth Iteration (i = 3, arr1[i] = 3 again)  
        - Compare 3 with 3, skip visited[0] as it's already used.
        - Compare with next 3, match found, add 3 to ans, mark visited[1] = 1, break.

    5. Fifth Iteration (i = 4, arr1[i] = 4)  
        - Compare 4 with 3, move forward.
        - Compare 4 with 3, move forward.
        - Compare 4 with 4, match found, add 4 to ans, mark visited[2] = 1, break.

    6. Sixth Iteration (i = 5, arr1[i] = 5)  
        - Compare with elements in arr2, find match at arr2[4], add 5 to ans, mark visited[4] = 1, break.

    7. Remaining elements (6, 7) in arr1 do not exist in arr2, so they are skipped.


    Final Output: [3, 3, 4, 5]
*/

const interSection = (arr1, arr2) => {
    const ans = [];
    const visited = new Array(arr2.length).fill(0);

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j] && visited[j] === 0) {
                ans.push(arr1[i]);
                visited[j] = 1;
                break;
            } 
            
            if (arr2[j] > arr1[i]) break;
        }
    }
    return ans;
};
let arr1 = [1, 2, 3, 3, 4, 5, 6, 7];
let arr2 = [3, 3, 4, 4, 5, 8];
console.log(interSection(arr1, arr2)); /* Output: [ 3, 3, 4, 5 ] */


/*
    Time Complexity
    <------------->

    - The worst-case scenario is when every element in arr1 is compared to every element in arr2, leading to O(N × M) complexity.
    - However, the early breaking condition (if (arr2[j] > arr1[i]) break;) optimizes it slightly if arr2 is sorted.

    Space Complexity
    <--------------->

    - The visited array takes O(M) space.
    - The ans array stores the result, which can take up to O(min(N, M)) space in the worst case.
*/





/*<-------------------------------------------- Two Pointer approach ---------------------------------------------->*/

/*

    1. Sorting Both Arrays - The function first sorts both input arrays arr1 and arr2 in ascending order using:
        - arr1.sort((a, b) => a - b);
        - arr2.sort((a, b) => a - b);
        
        - Sorting ensures that we can traverse both arrays in a single pass using two pointers (i and j).

    2. Using Two Pointers to Find Intersection - Initialize two pointers:
        
        let i = 0, j = 0;
        
        - Use a while loop to traverse both arrays until one of them is fully traversed: while (i < n1 && j < n2)
        
        - Compare elements at arr1[i] and arr2[j]:  
            - If arr1[i] < arr2[j], move i forward (since arr1[i] is smaller, it cannot be in arr2 at that position).
            - If arr2[j] < arr1[i], move j forward (since arr2[j] is smaller, it cannot be in arr1 at that position).
            - If arr1[i] === arr2[j], we found a common element:
            - Add it to the result array ans.
            - Move both i and j forward to avoid duplicate counting.

    3. Returning the Result  
        - The ans array now contains all common elements in sorted order.


    Input: arr1 = [4, 9, 5], arr2 = [9, 4, 9, 8, 4];


    Step 1: Sort Both Arrays

        arr1 = [4, 5, 9];
        arr2 = [4, 4, 8, 9, 9];


    Step 2: Initialize i = 0, j = 0

        | i (arr1)   | j (arr2)   | Comparison |            Action           |
        |------------|------------|------------|-----------------------------|
        |     4      |      4     |   4 === 4  | Add 4 to ans, move i++, j++ |
        |     5      |      4     |   5 > 4    | Move j++                    |
        |     5      |      8     |   5 < 8    | Move i++                    |
        |     9      |      8     |   9 > 8    | Move j++                    |
        |     9      |      9     |   9 === 9  | Add 9 to ans, move i++, j++ |


        Result: ans = [4, 9]
*/

const InterSection = (arr1, arr2) => {
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    const ans = [];
    let i = 0;
    let j = 0;
    let n1 = arr1.length;
    let n2 = arr2.length;

    while (i < n1 && j < n2) {
        if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr2[j] < arr1[i]) {
            j++;
        } else {
            ans.push(arr1[i]);
            i++;
            j++;
        }
    }
    return ans;
};
console.log(InterSection([4, 9, 5], [9, 4, 9, 8, 4])); /* Output: [ 4, 9 ] */

/*

    Time Complexity
    <-------------->

        - Sorting both arrays: O(N log N + M log M)
        - Two-pointer traversal: O(N + M)
        - Overall Complexity: O(N log N + M log M)

    Space Complexity
    <--------------->
    
        - O(1) (only using a result array, no extra space for data structures)

*/




/*<----------------------------------------------- Using HashMap ------------------------------------------------->*/

/*

    Step 1: Use a HashMap to Store Frequencies of arr1
        - We first create a frequency map (freqMap) to count occurrences of elements in arr1.
        - Loop through arr1 and store the count of each element in the hashmap.

    Step 2: Check Elements in arr2
        - Loop through arr2, and for each element:
            - If it exists in freqMap and its count is greater than 0, add it to the result array.
            - Reduce the frequency count in freqMap to handle duplicates properly.

    Step 3: Return the Result
        - The ans array contains the intersection of arr1 and arr2 with duplicate elements properly handled.


    |<---------------------------------------------------------------------------------------------------->|
    
    Input: arr1 = [4, 9, 5], arr2 = [9, 4, 9, 8, 4];


    Step 1: Build freqMap from arr1
        After iterating over arr1, the freqMap is: { 4: 1, 9: 1, 5: 1 }


    Step 2: Process arr2 Now, iterate over arr2 and check each element in freqMap:

        | Element in arr2  | Exists in freqMap? | Frequency > 0? |    Action    | Updated freqMap | ans Array  |
        |------------------|--------------------|----------------|--------------|-----------------|------------|
        |        9         |     ✅ Yes         | ✅ Yes (1)    | Add 9 to ans | {4:1, 9:0, 5:1} | [9]        |
        |        4         |     ✅ Yes         | ✅ Yes (1)    | Add 4 to ans | {4:0, 9:0, 5:1} | [9, 4]     |
        |        9         |     ✅ Yes         | ❌ No (0)     | Skip         | {4:0, 9:0, 5:1} | [9, 4]     |
        |        8         |     ❌ No          | ❌ No         | Skip         | {4:0, 9:0, 5:1} | [9, 4]     |
        |        4         |     ✅ Yes         | ❌ No (0)     | Skip         | {4:0, 9:0, 5:1} | [9, 4]     |

    
    Step 3: Return Output [9, 4]

    Note: The order of elements in the result depends on the order of arr2.
*/

const interSectionHashMap = (arr1, arr2) => {
    let freqMap = new Map();
    let ans = [];

    for (let num of arr1) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    for (let num of arr2) {
        if (freqMap.get(num) > 0) {
            ans.push(num);
            freqMap.set(num, freqMap.get(num) - 1); /* Decrease frequency */
        }
    }
    return ans;
};
console.log(interSectionHashMap([4, 9, 5], [9, 4, 9, 8, 4])); /* Output: [9, 4] */


/*
    Time Complexity
    <-------------->

        1. Building freqMap (Step 1): O(N)  
            - Iterates through arr1 once.
        2. Checking arr2 (Step 2): O(M)  
            - Iterates through arr2 once.
        3. Overall Complexity: O(N + M)  
            - Much faster than sorting-based solutions (O(N log N + M log M)).

    Space Complexity
    <--------------->
    
        1. HashMap (freqMap) stores elements of arr1: O(N)
        2. Output array (ans) stores the intersection: O(min(N, M))
        3. Total Space Complexity: O(N) (excluding the output).

*/
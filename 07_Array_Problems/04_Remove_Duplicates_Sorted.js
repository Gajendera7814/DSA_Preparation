/*
    Remove Duplicates in place from Sorted Array
    <------------------------------------------->

    We need to remove duplicates from a sorted array in place (without using extra space) and return the new 
    length of the modified array. The relative order of unique elements must be maintained.

    Input: [1, 1, 2, 2, 2, 3, 3]

    Unique Value - [1, 2, 3],  Output: 3

*/

/*<------------------------------- Brute Force Approach - using set data structure ------------------------------->*/

const removeDuplicatesUsingSet = (arr) => {
    const uniqueSet = new Set(arr);

    return Array.from(uniqueSet).length;
};
console.log(removeDuplicatesUsingSet([1, 1, 2, 2, 2, 3, 3])); /* Output: 3 */

/*
    Time Complexity: O(n)

    - Creating a Set from the array: O(n) (Iterates through the array once to add elements to the set).
    - Converting the Set back to an array and getting its length: O(n) (Iterates through the set to create an array).

    Space Complexity: O(n)

    - The Set stores unique elements, so in the worst case (no duplicates), it holds O(n) elements.
    - The Array.from(uniqueSet) also takes O(n) space in the worst case.
*/



/*<------------------------------------------ Using Two Pointer Approach ----------------------------------------->*/

/*
    Two-Pointer Approach Explanation
    <------------------------------->

    Pointer i: Tracks the position of the last unique element in the array.  
    Pointer j: Iterates through the array to find new unique elements.  


    1. Initialize i = 0, assuming the first element is always unique.
    2. Iterate through the array using j (starting from index 1).
    3. If arr[j] is different from arr[i], it means we found a new unique element:
        - Move i forward (i++).
        - Copy arr[j] to arr[i].
    4. At the end, return i + 1 as the length of the unique part of the array.


    For input: [1, 1, 2, 2, 2, 3, 3, 4, 5]
    <------------------------------------->

    | Step                            |    i   |    j    |   arr (modified in place)    |
    |---------------------------------|--------|---------|------------------------------|
    | Start                           |    0   |    1    | [1, 1, 2, 2, 2, 3, 3, 4, 5]  |
    | arr[j] == arr[i] → skip         |    0   |    2    | [1, 1, 2, 2, 2, 3, 3, 4, 5]  |
    | Found unique 2, move i & update |    1   |    2    | [1, 2, 2, 2, 2, 3, 3, 4, 5]  |
    | arr[j] == arr[i] → skip         |    1   |    3    | [1, 2, 2, 2, 2, 3, 3, 4, 5]  |
    | arr[j] == arr[i] → skip         |    1   |    4    | [1, 2, 2, 2, 2, 3, 3, 4, 5]  |
    | Found unique 3, move i & update |    2   |    5    | [1, 2, 3, 2, 2, 3, 3, 4, 5]  |
    | arr[j] == arr[i] → skip         |    2   |    6    | [1, 2, 3, 2, 2, 3, 3, 4, 5]  |
    | Found unique 4, move i & update |    3   |    7    | [1, 2, 3, 4, 2, 3, 3, 4, 5]  |
    | Found unique 5, move i & update |    4   |    8    | [1, 2, 3, 4, 5, 3, 3, 4, 5]  |

    Final unique array: [1, 2, 3, 4, 5], with length 5.
*/

const removeDuplicatesUsing2Pointer = (arr) => {
    let i = 0; /* Assume first unique element */

    for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
            arr[i + 1] = arr[j];
            i++;
        }
    }
    return (i + 1);
};
console.log(removeDuplicatesUsing2Pointer([1, 1, 2, 2, 2, 3, 3, 4, 5])); /* Output: 5 */

/*
    Time Complexity: O(n) → We iterate through the array once.  
    Space Complexity: O(1) → We modify the array in place without extra storage.
*/

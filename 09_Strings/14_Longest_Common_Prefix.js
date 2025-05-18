/*
    Problem: Longest Common Prefix

    Input: ["flow", "flower", "flight"],  Output: "fl"

*/

/*

    Input - ["flow", "flower", "flight"]


    * First word: "flow"
    * Goal: Check each character of "flow" and see if same character is present in same position in all other words.

    🔁 Outer loop starts (goes character by character of "flow")


    ▶️ Step 1: i = 0

        * char = strs[0][0] = 'f'
        * Compare with:

        * "flower"[0] = 'f' ✅
        * "flight"[0] = 'f' ✅

        ✅ All match → continue to next character.


    ▶️ Step 2: i = 1

        * char = 'l'
        * Compare with:

        * "flower"[1] = 'l' ✅
        * "flight"[1] = 'l' ✅

        ✅ All match → continue to next character.


    ▶️ Step 3: i = 2

        * char = 'o'
        * Compare with:

        * "flower"[2] = 'o' ✅
        * "flight"[2] = 'i' ❌ (mismatch!)

        ❌ Characters don’t match → We stop here.


    return strs[0].slice(0, 2); // from index 0 to 2 => "fl"

    ✅ Final Output: "fl"


    | i | char |  "flower"[i] |  "flight"[i] | Match? |
    |---|------|--------------|--------------|--------|
    | 0 | 'f'  | 'f'          | 'f'          | ✅     |
    | 1 | 'l'  | 'l'          | 'l'          | ✅     |
    | 2 | 'o'  | 'o'          | 'i'          | ❌     |
*/

const longestCommonPrefix = (strs) => {
    if (!strs.length) return "";

    for (let i = 0; i < strs[0].length; i++) {
        let char = strs[0][i];

        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].slice(0, i);
            }
        }
    }

    return strs[0]; // all characters matched
};
console.log(longestCommonPrefix(["flow", "flower", "flight"]));



// JavaScript program to find the longest common prefix
// using Sorting

function longestCommonPrefix2(arr){

    // Sort the array of strings
    arr.sort();

    // Get the first and last strings after sorting
    let first = arr[0];
    let last = arr[arr.length - 1];
    let minLength = Math.min(first.length, last.length);

    let i = 0;
    
    // Find the common prefix between the first and 
    // last strings
    while (i < minLength && first[i] === last[i]) {
        i++;
    }

    // Return the common prefix
    return first.substring(0, i);
}

// Driver Code
let arr = ["geeksforgeeks", "geeks", "geek", "geezer"];
console.log(longestCommonPrefix2(arr) );

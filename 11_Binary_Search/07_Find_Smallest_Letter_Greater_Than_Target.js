/*
    Find Smallest Letter Greater Than Target    (Leetcode Problem)
    <-------------------------------------->    <---------------->

    You are given an array of characters letters that is sorted in non-decreasing order, and a character target. 
    There are at least two different characters in letters.

    Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist,
    return the first character in letters.

    Note - If such a character does not exist, return the first character in letters.

    Example 1 :-

        Input: letters = ["c", "f", "j"],  target = "a",  Output: "c"

        Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.

    Example 2 :-

        Input: letters = ["c","f","j"],  target = "c",  Output: "f"

        Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.
    
    Example 3 :-

        Input: letters = ["x","x","y","y"],  target = "z",  Output: "x"

        Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].
*/

/*
    Input: ["c", "f", "j"],  target = "a"

    | Step | start | end |      mid (calculated)        |  letters[mid] | Comparison (target = "a") |                       Action                              |
    |------|-------|-----|------------------------------|---------------|---------------------------|-----------------------------------------------------------|
    | 1    | 0     | 2   | Math.floor(0 + (2-0)/2) = 1  |       "f"     |       "a" < "f"           |       Move left (end = mid - 1 = 0)                       |
    | 2    | 0     | 0   | Math.floor(0 + (0-0)/2) = 0  |       "c"     |       "a" < "c"           |       Move left (end = mid - 1 = -1)                      |
    | 3    | 0     | -1  | - (loop terminates)          |        -      |          -                | Return letters[start % letters.length] = letters[0] = "c" |

    Output: "c"


    Explanation :-

    - The function finds the smallest letter greater than target in a sorted circular array.
    - Since "a" is smaller than all letters, the first letter in the array ("c") is returned.
    - The modulo operation (start % letters.length) ensures that if target is greater than all letters, 
      the function wraps around and returns the first letter in the array.
*/

const nextGreatestLetter = (letters, target) => {
    let start = 0;
    let end = letters.length - 1;

    while(start <= end){
        const mid = Math.floor(start + (end - start) / 2);

        if(target < letters[mid]){
            end = mid  - 1;
        } else {
            start = mid + 1;
        }
    }
    /* Use modulo to ensure circular behavior (if target is greater than all elements, return the first letter). */
    return letters[start % letters.length];
};
console.log(nextGreatestLetter(["c", "f", "j"], "a")); // Output: "c"
console.log(nextGreatestLetter(["c", "f", "j"], "c")); // Output: "f"
console.log(nextGreatestLetter(["x", "x", "y", "y"], "z")); // Output: "x"
/*
    Reverse a String
    <--------------->
    
    We have given an input string and the task is to reverse the input string in JavaScript.

    Input: "hello",  Output: "olleh"
*/

const reverseString = (str) => {
    /* Base case: If the string is empty or has one character, it's already reversed. */
    if (str === "") return "";

    /* Recursive case: Reverse the rest of the string and append the first character at the end. */
    return reverseString(str.substr(1)) + str.charAt(0);
};
console.log(reverseString("hello")); /* Output: "olleh" */


/*
    Time Complexity: O(n ^ 2), due to the combination of recursive calls and the cost of string slicing and concatenation.
    Space Complexity: O(n), due to the recursion call stack and space used by substrings.
*/



/*
    Recursion Diagram for reverseString("hello")
    <------------------------------------------>

    reverseString("hello")
    └── reverseString("ello") + "h"
        └── reverseString("llo") + "e"
            └── reverseString("lo") + "l"
                    └── reverseString("o") + "l"
                        └── reverseString("") + "o"
                            └── "" (Base case)
*/
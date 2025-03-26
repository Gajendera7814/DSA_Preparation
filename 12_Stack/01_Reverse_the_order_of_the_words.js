/*
    Why Do We Need to Use a Stack in JavaScript?
    
    A stack is a Last In, First Out (LIFO) data structure, meaning the last element added is the first to be removed.
    In JavaScript, stacks are often implemented using arrays because they provide built-in methods like push() and pop() 
    to easily manipulate data.
*/

/*
    Reverse Words in a String     Leetcode Problem
    <------------------------>    <--------------->

    Given an input string s, reverse the order of the words.

    A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

    Return a string of the words in reverse order concatenated by a single space.

    Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should 
    only have a single space separating the words. Do not include any extra spaces.


    Example 1:

        Input: s = "the sky is blue"
        Output: "blue is sky the"

    Example 2:

        Input: s = "  hello world  "
        Output: "world hello"

        Explanation: Your reversed string should not contain leading or trailing spaces.

    Example 3:

        Input: s = "a good   example"
        Output: "example good a"

        Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
*/


/*
    1. Split the String:- The input string is split into an array of words using split(" ").

    2. Push Each Word onto a Stack:- Iterate through the array and push each word onto a stack.

    3. Pop Words from the Stack:- Use pop() to remove words one by one from the stack and construct the reversed string.

    4. Trim Extra Spaces:- The result is trim()med to remove any leading or trailing spaces.


    Input: "the sky is blue"
    

    Step 1: Splitting the String

        splitStr = ["the", "sky", "is", "blue"]
    

    Step 2: Pushing Words onto Stack

        | Iteration |    Word   |         Stack After Push       |
        |-----------|-----------|--------------------------------|
        | 1         |   "the"   |   ["the"]                      |
        | 2         |   "sky"   |   ["the", "sky"]               |
        | 3         |   "is"    |   ["the", "sky", "is"]         |
        | 4         |   "blue"  |   ["the", "sky", "is", "blue"] |


    Step 3: Popping Words and Forming Output

        | Iteration |  Word Popped |  finalStr After Append |     Stack After Pop    |
        |-----------|--------------|------------------------|------------------------|
        | 1         |   "blue"     |    "blue"              |   ["the", "sky", "is"] |
        | 2         |   "is"       |    "blue is"           |   ["the", "sky"]       |
        | 3         |   "sky"      |    "blue is sky"       |   ["the"]              |
        | 4         |   "the"      |    "blue is sky the"   |   []                   |


    Step 4: Trim the Final String

        - finalStr.trim() removes the leading space.
        - Final output: "blue is sky the".


    Final Output:-  "blue is sky the"
*/

const reverseWords = (s) => {
    const splitStr = s.split(" ");
    const stack = [];
  
    for (let i of splitStr) {
        stack.push(i);
    }
  
    let finalStr = "";
  
    while (stack.length) {
        const current = stack.pop();
  
        if (current) {
            finalStr += " " + current;
        }
    }
  
    return finalStr.trim();
};
console.log(reverseWords("the sky is blue")); // Output: "blue is sky the"
console.log(reverseWords("  hello world  ")); // Output: "world hello"
console.log(reverseWords("a good   example")); // Output: "example good a"
  
/*
    Time Complexity: O(n)

        - Splitting: O(n) (where n is the length of s)
        - Pushing to Stack: O(n)
        - Popping from Stack: O(n)
        - Trimming: O(n)
        - Overall: O(n)  

    Space Complexity: O(n)

        - The stack stores all words, requiring O(n) extra space.
*/
  
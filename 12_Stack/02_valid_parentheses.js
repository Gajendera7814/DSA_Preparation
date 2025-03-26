/*
    Valid Parentheses     Leetcode Problem
    <---------------->    <--------------->

    Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

    An input string is valid if :

    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.
    3. Every close bracket has a corresponding open bracket of the same type.


    Example 1:

        Input: s = "()",  Output: true

    Example 2:

        Input: s = "()[]{}",  Output: true

    Example 3:

        Input: s = "(]",  Output: false

    Example 4:

        Input: s = "([])",  Output: true
*/


/*

    1. Initialize a Stack :- The stack stores opening brackets (, {, [
    
    2. Iterate Through the String:

        - If the character is an opening bracket, push it onto the stack.

        - If the character is a closing bracket, check the stack:

            - If the stack is empty, return false (no matching opening bracket).

            - Pop the top element and verify if it matches the corresponding opening bracket.
            
            - If not, return false.

    3. Final Check :- If the stack is empty at the end, return true; otherwise, return false.


    Input: "([{}])"
    

    Step 1: Iterating Through the String

        | Iteration | Character  |   Stack Before   |       Action      |    Stack After    |
        |-----------|------------|------------------|-------------------|-------------------|
        |   1       |   (        |  []              |   Push (          |   ["("]           |
        |   2       |   [        |  ["("]           |   Push [          |   ["(", "["]      |
        |   3       |   {        |  ["(", "["]      |   Push {          |   ["(", "[", "{"] |
        |   4       |   }        |  ["(", "[", "{"] |   Pop { (match)   |   ["(", "["]      |
        |   5       |   ]        |  ["(", "["]      |   Pop [ (match)   |   ["("]           |
        |   6       |   )        |  ["("]           |   Pop ( (match)   |   [] (empty)      |


    Step 2: Final Check - The stack is empty, so the function returns true.


    Final Output: true
*/

const validParentheses = (s) => {
    const stack = [];

    const isEmpty = (stack) => {
        return stack.length === 0;
    }
  
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
  
        if (char === "(" || char === "[" || char === "{") {
            stack.push(char);
        } else if (char === ")" || char === "]" || char === "}") {
            if (isEmpty(stack)) {
                return false;
            }
  
            const top = stack.pop();
            if ((char === ")" && top !== "(") || (char === "]" && top !== "[") || (char === "}" && top !== "{")) {
                return false;
            }
        }
    }
    return isEmpty(stack);
}
console.log(validParentheses("([{}])"));


/*
    Time Complexity: O(n) 

        - Each character is processed once.
        - Each operation (push/pop) is O(1).
        
    - Space Complexity: O(n)
*/



/*<--------------------------------------------------- Another way -------------------------------------------------->*/

/*

    1. Initialize a Counter:

        - Start with count = 0.
        - This counter keeps track of how many more ) are needed to balance the (.

    2. Iterate Through the String:
        
        - If the current character is "(", increase count (we expect a ) later).
        - If the current character is ")", decrease count (matching an earlier ().
        - If count goes negative, return false (means ")" appeared before its matching "(").

    3. Final Check:  

        - If count === 0, return true (balanced parentheses).
        - If count > 0, return false (too many ( without matching )).


    Input : "(()())"

        |     Step    |  Character | count Before |       Action        |  count After  | Valid? |
        |-------------|------------|--------------|---------------------|---------------|--------|
        |   1         |      (     |     0        | count++             |     1         |   ✅  |
        |   2         |      (     |     1        | count++             |     2         |   ✅  |
        |   3         |      )     |     2        | count--             |     1         |   ✅  |
        |   4         |      (     |     1        | count++             |     2         |   ✅  |
        |   5         |      )     |     2        | count--             |     1         |   ✅  |
        |   6         |      )     |     1        | count--             |     0         |   ✅  |
        | Final Check |      -     |     0        | return count === 0  |     true      |   ✅  |


    Since the final count is 0, the function returns true, meaning the parentheses are valid.
*/

const validSimpleParentheses = (s) => {
    let count = 0;
    for (let char of s) {
        if (char === "(") count++;
        else if (char === ")") count--;
        if (count < 0) return false; // More closing brackets than opening
    }
    return count === 0;
};
console.log(validSimpleParentheses("())")); // false
console.log(validSimpleParentheses("(()())")); // true
console.log(validSimpleParentheses("([{}])")); // true

/*
    Time Complexity: O(n) --→ We iterate through the string once.
    Space Complexity: O(1) --→ We only use a count variable (constant space).
*/


/*
    Reverse String   Leetcode Problem
    <------------>   <--------------->

    Write a function that reverses a string. The input string is given as an array of characters s.

    You must do this by modifying the input array in-place with O(1) extra memory.


    Input: s = ["h", "e", "l", "l", "o"]    Output: ["o", "l", "l", "e", "h"]
    
    Input: s = ["H", "a", "n", "n", "a", "h"]    Output: ["h", "a", "n", "n", "a", "H"]
*/


/*<--------------------------------------------- Two Pointers ----------------------------------------------------->*/

const reverseString = (chars) => {
    let left = 0; 
    let right = chars.length - 1;

    while (left < right) {
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }

    return chars
};
console.log(reverseString(["h", "e", "l", "l", "o"])); // Output: ["o", "l", "l", "e", "h"]

/*
    Time Complexity: O(n)
    Space Complexity: O(1)
*/



/*<--------------------------------------------- Using a Stack ----------------------------------------------------->*/

const reverseStringStack = (chars) => {
    const stack = [];

    for (const char of chars) {
        stack.push(char);
    }

    const reversed = [];
    while (stack.length > 0) {
        reversed.push(stack.pop());
    }
    return reversed;
};
console.log(reverseStringStack(["H", "a", "n", "n", "a", "h"])); // Output: ["h", "a", "n", "n", "a", "H"]

/*
    Time Complexity: O(n)
    Space Complexity: O(n)
*/

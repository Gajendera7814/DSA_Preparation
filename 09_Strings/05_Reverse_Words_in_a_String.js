/*
    Reverse Words in a String     Leetcode Problem
    <------------------------>    <--------------->

    Given an input string s, reverse the order of the words.

    A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

    Return a string of the words in reverse order concatenated by a single space.


    Note: that s may contain leading or trailing spaces or multiple spaces between two words. 
    The returned string should only have a single space separating the words. Do not include any extra spaces.


    Input: s = "the sky is blue",   Output: "blue is sky the"

    Input: s = "  hello world  ",   Output: "world hello"

    Explanation: Your reversed string should not contain leading or trailing spaces.

    Input: s = "a good   example",   Output: "example good a"

    Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
*/

/*<----------------------------------------- two-pointer approach -------------------------------------------------->*/

/*
    Explanation:
    
    1. Trim and Split:

        - Use trim() to remove leading and trailing spaces.
        - Use split(/\s+/) to split the string into words while handling multiple spaces.

    2. Reverse with Two Pointers:

        - Initialize left and right pointers at the start and end of the array.
        - Swap the words at the left and right indices and move the pointers toward each other.

    3. Join Words:
        - Use join(' ') to combine the words back into a single string separated by a single space.
*/

const reverseWords = (s) => {
    /* Trim leading and trailing spaces and split the words by spaces. */
    let words = s.trim().split(/\s+/);

    /* Use two pointers to reverse the array of words in-place */
    let left = 0; 
    let right = words.length - 1;

    while (left < right) {
        [words[left], words[right]] = [words[right], words[left]];
        left++;
        right--;
    }

    return words.join(' ');
};
console.log(reverseWords("the sky is blue")); // Output: "blue is sky the"
console.log(reverseWords("  hello world  ")); // Output: "world hello"
console.log(reverseWords("a good   example")); // Output: "example good a"

// OR 

const reverseWordsUsing2Pointer = (s) => {
    let words = s.split(' ').filter(word => word !== "");

    let left = 0;
    let right = words.length - 1;

    while (left < right) {
        [words[left], words[right]] = [words[right], words[left]];
        left++;
        right--;
    }

    return words.join(' ');
};
console.log(reverseWordsUsing2Pointer(" welcome   in     bihar   ")); // Output: bihar in welcome

/*
    Time Complexity: O(n)
    Space Complexity: O(n)
*/




/*<------------------------------------------- By using Inbuild methods -------------------------------------------->*/

const reverseWordsUsingInbuild = (s) => {
    let words = s.split(' ');
    let result = [];

    for (let i = words.length - 1; i >= 0; i--) {
        if (words[i]) {
            result.push(words[i]);
        }
    }

    return result.join(' ');
};
console.log(reverseWordsUsingInbuild("  hello    world     ")); // Output: world hello

/*
    Time Complexity:-

        - Splitting the String: The split(' ') method scans the entire string once to split it into words by spaces.
            
            Time Complexity: O(n), where n is the length of the input string.
        
        - Iterating Over the Words: The for loop iterates through the words array from the end to the start.
            - The if condition checks if each word is non-empty, which is a O(1) operation.
            
            Time Complexity: O(m), where m is the number of words in the array.
        
        - Joining the Result: The join(' ') method concatenates the words into a single string with spaces between them.
            
            Time Complexity: O(n), as it processes the total length of the final string.
        
        Overall, the time complexity is O(n + m + n) ≈ O(n), because m ≤ n.




    Space Complexity:-

        - Intermediate Array (Splitting): The split(' ') operation creates an array of words, requiring O(n) space.

        - Result Array: The res array holds the reversed words, which requires O(m) space.
        
        Final String: The join(' ') operation creates a new string to store the final result, which requires O(n) space.
        
        Overall, the space complexity is O(n + m + n) ≈ O(n), as the intermediate and result arrays are proportional 
        to the input size.

    Overall, the time complexity is O(n + m + n) ≈ O(n), because m ≤ n.
    Overall, the space complexity is O(n + m + n) ≈ O(n)
*/


const reverseWordsUsingFilter = (s) => {
    return s.split(' ').filter(word => word.length > 0).reverse().join(' ');
};
console.log(reverseWordsUsingFilter(" my    name  is   gajendera    ")); // Output: gajendera is name my

/*
    Time complexity: O(2n+k) → O(n)
        - n is the length of the string.
        - k is the number of words in the list.

    Overall, the time complexity is O(2n + k). Since k is at most n, so the time complexity simplifies to O(n)

    Space complexity: O(n)
*/